const fs = require('fs/promises');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'signs/isg-wikimedia');
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const args = process.argv.slice(2);
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const startArg = args.find((arg) => arg.startsWith('--start='));
const delayArg = args.find((arg) => arg.startsWith('--delay-ms='));
const retryCountArg = args.find((arg) => arg.startsWith('--retry-count='));
const retryDelayArg = args.find((arg) => arg.startsWith('--retry-delay-ms='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : 10;
const start = startArg ? Number(startArg.split('=')[1]) : 0;
const delayMs = delayArg ? Number(delayArg.split('=')[1]) : 60000;
const retryCount = retryCountArg ? Number(retryCountArg.split('=')[1]) : 120;
const retryDelayMs = retryDelayArg ? Number(retryDelayArg.split('=')[1]) : 300000;

const targets = [
  // PDF: baret, gozluk, eldiven, ayakkabi, fosforlu yelek, emniyet kemeri, kulaklik, maske, yuz/kaynak koruma.
  { group: 'mandatory', code: 'M014', slug: 'baret-tak', tr: 'Baret tak / bas koruyucu kullan' },
  { group: 'mandatory', code: 'M004', slug: 'gozluk-kullan', tr: 'Is gozluk kullan' },
  { group: 'mandatory', code: 'M009', slug: 'eldiven-kullan', tr: 'Koruyucu eldiven kullan' },
  { group: 'mandatory', code: 'M008', slug: 'is-ayakkabisi-giy', tr: 'Emniyet ayakkabisi giy' },
  { group: 'mandatory', code: 'M015', slug: 'fosforlu-yelek-giy', tr: 'Yuksek gorunurluklu yelek giy' },
  { group: 'mandatory', code: 'M018', slug: 'emniyet-kemeri-kullan', tr: 'Emniyet kemeri / dusme onleyici kullan' },
  { group: 'mandatory', code: 'M003', slug: 'kulak-koruyucu-kullan', tr: 'Kulak koruyucu kullan' },
  { group: 'mandatory', code: 'M013', slug: 'yuz-koruyucu-kullan', tr: 'Yuz siperi kullan' },
  { group: 'mandatory', code: 'M019', slug: 'kaynak-maskesi-kullan', tr: 'Kaynak maskesi kullan' },
  { group: 'mandatory', code: 'M016', slug: 'maske-kullan', tr: 'Maske kullan' },
  { group: 'mandatory', code: 'M017', slug: 'solunum-koruyucu-kullan', tr: 'Solunum koruyucu kullan' },
  { group: 'mandatory', code: 'M010', slug: 'koruyucu-giysi-giy', tr: 'Koruyucu giysi giy' },
  { group: 'mandatory', code: 'M011', slug: 'ellerini-yika', tr: 'Ellerini yika' },
  { group: 'mandatory', code: 'M012', slug: 'tutunma-korkulugu-kullan', tr: 'Tutunma korkulugu kullan' },

  // PDF: elektrik, is makinasi/forklift, asili yuk, kaygan zemin, yuksekten dusme, sicak yuzey, yanici/patlayici vb.
  { group: 'warning', code: 'W001', slug: 'genel-uyari', tr: 'Genel uyari / dikkat' },
  { group: 'warning', code: 'W008', slug: 'elektrik-tehlikesi', tr: 'Elektrik carpma riski' },
  { group: 'warning', code: 'W011', slug: 'kaygan-zemin', tr: 'Kaygan zemin' },
  { group: 'warning', code: 'W012', slug: 'engel-tehlikesi', tr: 'Engel / takilma tehlikesi' },
  { group: 'construction-machinery', code: 'W014', slug: 'forklift-cikabilir', tr: 'Forklift / is makinasi cikabilir' },
  { group: 'construction-machinery', code: 'W015', slug: 'asili-yuk-tehlikesi', tr: 'Asili yuk tehlikesi' },
  { group: 'warning', code: 'W016', slug: 'toksik-madde', tr: 'Toksik madde tehlikesi' },
  { group: 'warning', code: 'W017', slug: 'sicak-yuzey', tr: 'Sicak yuzey' },
  { group: 'warning', code: 'W020', slug: 'bas-carpma-tehlikesi', tr: 'Bas carpma / alcak gecit tehlikesi' },
  { group: 'warning', code: 'W021', slug: 'yanici-madde', tr: 'Yanici madde tehlikesi' },
  { group: 'warning', code: 'W022', slug: 'kesici-madde', tr: 'Kesici madde / kesilme tehlikesi' },
  { group: 'warning', code: 'W024', slug: 'el-ezilme-tehlikesi', tr: 'El ezilme tehlikesi' },
  { group: 'warning', code: 'W026', slug: 'aku-sarj-tehlikesi', tr: 'Aku sarj tehlikesi' },
  { group: 'warning', code: 'W029', slug: 'basincli-tup', tr: 'Basincli tup / gaz silindiri' },
  { group: 'construction-machinery', code: 'W035', slug: 'dusme-yuk-cisim-tehlikesi', tr: 'Yuk/dusen cisim tehlikesi' },
  { group: 'warning', code: 'W042', slug: 'ark-parlamasi-tehlikesi', tr: 'Ark parlamasi tehlikesi' },

  // PDF: sigara icmek yasak, atesle yaklasma, izinsiz girme, dokunma vb.
  { group: 'prohibition', code: 'P002', slug: 'sigara-icilmez', tr: 'Sigara icmek yasaktir' },
  { group: 'prohibition', code: 'P003', slug: 'atesle-yaklasma', tr: 'Atesle yaklasma / acik alev yasaktir' },
  { group: 'prohibition', code: 'P004', slug: 'gecis-yasak', tr: 'Gecis yasaktir' },
  { group: 'prohibition', code: 'P006', slug: 'forklift-giremez', tr: 'Forklift / is makinasi giremez' },
  { group: 'prohibition', code: 'P010', slug: 'dokunmak-yasak', tr: 'Dokunmak yasaktir' },
  { group: 'prohibition', code: 'P013', slug: 'cep-telefonu-yasak', tr: 'Cep telefonu kullanmak yasaktir' },
  { group: 'prohibition', code: 'P019', slug: 'yetkisiz-giris-yasak', tr: 'Yetkisiz giris yasaktir' },
  { group: 'prohibition', code: 'P023', slug: 'engelleme-yasak', tr: 'Engellemek yasaktir' },

  // PDF: yangin cikisi, ilk yardim, acil yonlendirme.
  { group: 'safe-condition', code: 'E001', slug: 'acil-cikis-sol', tr: 'Acil cikis / yangin cikisi sol' },
  { group: 'safe-condition', code: 'E002', slug: 'acil-cikis-sag', tr: 'Acil cikis / yangin cikisi sag' },
  { group: 'safe-condition', code: 'E003', slug: 'ilk-yardim', tr: 'Ilk yardim' },
  { group: 'safe-condition', code: 'E004', slug: 'acil-telefon', tr: 'Acil telefon' },
  { group: 'safe-condition', code: 'E007', slug: 'toplanma-noktasi', tr: 'Acil toplanma noktasi' },
  { group: 'safe-condition', code: 'E011', slug: 'goz-dusu', tr: 'Goz dusu' },
  { group: 'safe-condition', code: 'E012', slug: 'acil-dus', tr: 'Acil dus' },
  { group: 'safe-condition', code: 'E013', slug: 'sedye', tr: 'Sedye' },

  // PDF: yangin ekipmanlari.
  { group: 'fire-safety', code: 'F001', slug: 'yangin-sondurucu', tr: 'Yangin sondurucu' },
  { group: 'fire-safety', code: 'F002', slug: 'yangin-hortumu', tr: 'Yangin hortumu' },
  { group: 'fire-safety', code: 'F003', slug: 'yangin-merdiveni', tr: 'Yangin merdiveni' },
  { group: 'fire-safety', code: 'F004', slug: 'yangin-ekipmani', tr: 'Yangin ekipmani' },
  { group: 'fire-safety', code: 'F005', slug: 'yangin-alarmi', tr: 'Yangin alarmi' },
];

function titleFor(code) {
  return `File:ISO 7010 ${code}.svg`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}, attempt = 1) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'EhliyetYoluISGMediaImporter/1.0 (slow Wikimedia Commons asset attribution)',
      ...(options.headers || {}),
    },
  });
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
  const selected = targets.slice(start, start + limit);
  const manifest = [];
  const missing = [];

  console.log(
    `ISG slow mode: ${selected.length} file(s), start=${start}, limit=${limit}, delay=${delayMs}ms, retryDelay=${retryDelayMs}ms.`
  );

  for (const [localIndex, target] of selected.entries()) {
    const index = start + localIndex;
    const title = titleFor(target.code);
    await sleep(delayMs);

    const info = await getImageInfo(title);
    if (!info?.url) {
      missing.push({ ...target, commonsTitle: title });
      console.log(`[${index + 1}/${targets.length}] MISSING ${title}`);
      continue;
    }

    const outputRelative = `${target.group}/${target.slug}--${target.code}.svg`;
    const outputPath = path.join(OUTPUT_DIR, outputRelative);
    try {
      await fs.access(outputPath);
    } catch {
      await download(info.url, outputPath);
    }

    const metadata = info.extmetadata || {};
    manifest.push({
      ...target,
      commonsTitle: title,
      outputRelative,
      sourceUrl: info.descriptionurl,
      fileUrl: info.url,
      license: metadata.LicenseShortName?.value || metadata.License?.value || '',
      attribution: metadata.Attribution?.value || metadata.Artist?.value || '',
      credit: metadata.Credit?.value || '',
      mime: info.mime,
    });
    console.log(`[${index + 1}/${targets.length}] OK ${title}`);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const manifestPath = path.join(OUTPUT_DIR, `manifest-${start}-${start + selected.length}.json`);
  const missingPath = path.join(OUTPUT_DIR, `missing-${start}-${start + selected.length}.json`);
  await fs.writeFile(
    manifestPath,
    JSON.stringify({ downloadedAt: new Date().toISOString(), count: manifest.length, files: manifest }, null, 2)
  );
  await fs.writeFile(missingPath, JSON.stringify({ count: missing.length, files: missing }, null, 2));

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'SOURCES.md'),
    [
      '# Wikimedia Commons ISO 7010 ISG Signs',
      '',
      'Primary source category: https://commons.wikimedia.org/wiki/Category:ISO_7010_safety_signs',
      '',
      'These files are selected to match common Turkish ISG / iş makinesi warning signs from the MEB-hosted occupational safety sign catalogue PDF.',
      '',
      'Folders:',
      '',
      '- `mandatory/`: mandatory PPE/action signs',
      '- `warning/`: warning and hazard signs',
      '- `prohibition/`: prohibition signs',
      '- `safe-condition/`: emergency exits and first aid',
      '- `fire-safety/`: fire safety equipment signs',
      '- `construction-machinery/`: forklift, suspended load and construction machinery related signs',
      '',
      'Per-file source URL and license metadata is stored in each `manifest-*.json` file.',
      'Download rule: default 1 file per minute, with long retry backoff on Wikimedia 429 responses.',
      '',
    ].join('\n')
  );

  console.log(`Batch downloaded ${manifest.length}/${selected.length}. Missing in batch: ${missing.length}`);
  console.log(
    `Next batch command: node .agent/content/downloadWikimediaIsgSigns.js --start=${start + limit} --limit=${limit} --delay-ms=${delayMs}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
