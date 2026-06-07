const fs = require('fs/promises');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'signs/isg-wikimedia-all');
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const args = process.argv.slice(2);
const delayArg = args.find((arg) => arg.startsWith('--delay-ms='));
const retryCountArg = args.find((arg) => arg.startsWith('--retry-count='));
const retryDelayArg = args.find((arg) => arg.startsWith('--retry-delay-ms='));
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const startArg = args.find((arg) => arg.startsWith('--start='));
const groupsArg = args.find((arg) => arg.startsWith('--groups='));
const listOnly = args.includes('--list-only');

const delayMs = delayArg ? Number(delayArg.split('=')[1]) : 60000;
const retryCount = retryCountArg ? Number(retryCountArg.split('=')[1]) : 120;
const retryDelayMs = retryDelayArg ? Number(retryDelayArg.split('=')[1]) : 300000;
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;
const start = startArg ? Number(startArg.split('=')[1]) : 0;

const categories = [
  {
    group: 'mandatory',
    title: 'Category:ISO 7010 mandatory action signs',
  },
  {
    group: 'warning',
    title: 'Category:ISO 7010 warning signs',
  },
  {
    group: 'prohibition',
    title: 'Category:ISO 7010 prohibition signs',
  },
  {
    group: 'safe-condition',
    title: 'Category:ISO 7010 safe condition signs',
  },
  {
    group: 'fire-safety',
    title: 'Category:ISO 7010 fire safety signs',
  },
];

const selectedGroups = groupsArg
  ? new Set(groupsArg.split('=')[1].split(',').map((item) => item.trim()))
  : null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeName(value) {
  return value
    .replace(/^File:/, '')
    .replace(/\.svg$/i, '')
    .replace(/^ISO 7010 /i, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function codeFromTitle(title) {
  return title.match(/ISO 7010 ([EFMPW]\d{3})/i)?.[1]?.toUpperCase() || 'unknown';
}

async function fetchWithRetry(url, options = {}, attempt = 1) {
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        'User-Agent': 'EhliyetYoluISGMediaImporter/1.0 (slow Wikimedia Commons asset attribution)',
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    if (attempt <= retryCount) {
      console.log(
        `Network error, retrying in ${Math.round(retryDelayMs / 1000)}s (${attempt}/${retryCount}): ${error.message}`
      );
      await sleep(retryDelayMs);
      return fetchWithRetry(url, options, attempt + 1);
    }
    throw error;
  }

  if (response.status === 429 && attempt <= retryCount) {
    const retryAfter = Number(response.headers.get('retry-after'));
    const waitMs = Number.isFinite(retryAfter) ? retryAfter * 1000 : retryDelayMs;
    console.log(`Rate limited, retrying in ${Math.round(waitMs / 1000)}s (${attempt}/${retryCount})...`);
    await sleep(waitMs);
    return fetchWithRetry(url, options, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  return response;
}

async function fetchJson(url) {
  const response = await fetchWithRetry(url);
  return response.json();
}

async function listCategoryFiles(category) {
  const files = [];
  let cmcontinue;

  do {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'categorymembers',
      cmtitle: category.title,
      cmtype: 'file',
      cmlimit: '500',
      origin: '*',
    });
    if (cmcontinue) params.set('cmcontinue', cmcontinue);

    const data = await fetchJson(`${COMMONS_API}?${params.toString()}`);
    files.push(
      ...data.query.categorymembers
        .filter((member) => /\.svg$/i.test(member.title))
        .map((member) => ({
          group: category.group,
          title: member.title,
          code: codeFromTitle(member.title),
        }))
    );
    cmcontinue = data.continue?.cmcontinue;
  } while (cmcontinue);

  return files;
}

async function getImageInfo(title) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    titles: title,
    iiprop: 'url|extmetadata|mime',
    origin: '*',
  });
  const data = await fetchJson(`${COMMONS_API}?${params.toString()}`);
  const page = Object.values(data.query.pages)[0];
  if (!page || page.missing !== undefined) return null;
  return page.imageinfo?.[0] || null;
}

async function download(url, outputPath) {
  const response = await fetchWithRetry(url);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

async function main() {
  const activeCategories = categories.filter((category) => !selectedGroups || selectedGroups.has(category.group));
  const allFiles = (await Promise.all(activeCategories.map(listCategoryFiles))).flat();
  const uniqueFiles = [...new Map(allFiles.map((file) => [file.title, file])).values()].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const selected = uniqueFiles.slice(start, Number.isFinite(limit) ? start + limit : undefined);

  console.log(`Found ${uniqueFiles.length} ISO 7010 SVG file(s). Selected ${selected.length}, start=${start}.`);

  if (listOnly) {
    const counts = activeCategories.map((category) => ({
      group: category.group,
      count: uniqueFiles.filter((file) => file.group === category.group).length,
    }));
    console.log(JSON.stringify(counts, null, 2));
    return;
  }

  const manifest = [];
  const missing = [];

  for (const [localIndex, file] of selected.entries()) {
    const index = start + localIndex;
    await sleep(delayMs);

    const info = await getImageInfo(file.title);
    if (!info?.url) {
      missing.push(file);
      console.log(`[${index + 1}/${uniqueFiles.length}] MISSING ${file.title}`);
      continue;
    }

    const outputRelative = `${file.group}/${file.code}--${sanitizeName(file.title)}.svg`;
    const outputPath = path.join(OUTPUT_DIR, outputRelative);
    try {
      await fs.access(outputPath);
    } catch {
      await download(info.url, outputPath);
    }

    const metadata = info.extmetadata || {};
    manifest.push({
      ...file,
      outputRelative,
      sourceUrl: info.descriptionurl,
      fileUrl: info.url,
      license: metadata.LicenseShortName?.value || metadata.License?.value || '',
      attribution: metadata.Attribution?.value || metadata.Artist?.value || '',
      credit: metadata.Credit?.value || '',
      mime: info.mime,
    });
    console.log(`[${index + 1}/${uniqueFiles.length}] OK ${file.title}`);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUTPUT_DIR, `manifest-${start}-${start + selected.length}.json`),
    JSON.stringify({ downloadedAt: new Date().toISOString(), count: manifest.length, files: manifest }, null, 2)
  );
  await fs.writeFile(
    path.join(OUTPUT_DIR, `missing-${start}-${start + selected.length}.json`),
    JSON.stringify({ count: missing.length, files: missing }, null, 2)
  );
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'SOURCES.md'),
    [
      '# Wikimedia Commons ISO 7010 Category Download',
      '',
      'Source categories:',
      '',
      ...activeCategories.map((category) => `- ${category.title}`),
      '',
      'Downloads are intentionally slow. Default rule: 1 file per minute, with long retry backoff on Wikimedia 429 responses.',
      '',
    ].join('\n')
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
