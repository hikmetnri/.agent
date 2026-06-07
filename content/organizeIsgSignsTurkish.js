const fs = require('fs/promises');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, 'signs/isg-wikimedia-all');
const OUTPUT_DIR = path.join(__dirname, 'signs/isg-turkce-kategorili');

const groupFolders = {
  mandatory: '01-zorunlu-talimatlar',
  warning: '02-uyari-ve-tehlike',
  prohibition: '03-yasak-isaretleri',
  'safe-condition': '04-acil-durum-ve-ilk-yardim',
  'fire-safety': '05-yangin-guvenligi',
};

const knownNames = {
  M003: 'kulak-koruyucu-kullan',
  M004: 'goz-koruyucu-kullan',
  M008: 'is-guvenlik-ayakkabisi-giy',
  M009: 'koruyucu-eldiven-kullan',
  M010: 'koruyucu-giysi-giy',
  M011: 'ellerini-yika',
  M012: 'tutunma-korkulugu-kullan',
  M013: 'yuz-koruyucu-kullan',
  M014: 'baret-tak',
  M015: 'fosforlu-yelek-giy',
  M016: 'maske-kullan',
  M017: 'solunum-koruyucu-kullan',
  M018: 'emniyet-kemeri-kullan',
  M019: 'kaynak-maskesi-kullan',
  M027: 'koruyucu-kapak-kontrol-et',
  M028: 'kilitleri-tak-ve-kilitli-tut',
  M029: 'korna-cal',
  M031: 'testere-koruyucusu-kullan',
  M032: 'antistatik-ayakkabi-giy',
  M046: 'gaz-tuplerini-sabitle',
  M047: 'solunum-cihazi-kullan',

  W001: 'genel-uyari',
  W008: 'elektrik-tehlikesi',
  W011: 'kaygan-zemin',
  W012: 'takilma-engel-tehlikesi',
  W014: 'forklift-is-makinesi-cikabilir',
  W015: 'asili-yuk-tehlikesi',
  W016: 'toksik-madde-tehlikesi',
  W017: 'sicak-yuzey',
  W020: 'bas-carpma-tehlikesi',
  W021: 'yanici-madde',
  W022: 'kesici-madde',
  W024: 'el-ezilme-tehlikesi',
  W026: 'aku-sarj-tehlikesi',
  W029: 'basincli-tup',
  W035: 'dusme-yuk-cisim-tehlikesi',

  P002: 'sigara-icilmez',
  P003: 'atesle-yaklasma',
  P004: 'gecis-yasak',
  P006: 'forklift-giremez',
  P010: 'dokunmak-yasak',
  P013: 'cep-telefonu-yasak',
  P019: 'yetkisiz-giris-yasak',
  P023: 'engellemek-yasak',

  E001: 'acil-cikis-sol',
  E002: 'acil-cikis-sag',
  E003: 'ilk-yardim',
  E004: 'acil-telefon',
  E007: 'toplanma-noktasi',
  E011: 'goz-dusu',
  E012: 'acil-dus',
  E013: 'sedye',

  F001: 'yangin-sondurucu',
  F002: 'yangin-hortumu',
  F003: 'yangin-merdiveni',
  F004: 'yangin-ekipmani',
  F005: 'yangin-alarmi',
};

function codeFromName(fileName) {
  return fileName.match(/^([EFMPW]\d{3})--/)?.[1] || 'unknown';
}

function groupFromPath(relativePath) {
  return relativePath.split(path.sep)[0];
}

function subcategoryFor(group, code, fileName) {
  if (group === 'mandatory') {
    if (['M003', 'M004', 'M008', 'M009', 'M010', 'M013', 'M014', 'M015', 'M016', 'M017', 'M018', 'M019', 'M032', 'M047', 'M049', 'M053'].includes(code)) {
      return 'kisisel-koruyucu-donanim';
    }
    if (['M027', 'M028', 'M029', 'M031', 'M046'].includes(code)) return 'makine-ekipman-ve-tesisat';
    if (/lifeboat|rescue|floatation|water|aquatic|sled|ski|toboggan/i.test(fileName)) return 'deniz-spor-ve-ozel-alan';
    return 'genel-zorunlu-talimatlar';
  }

  if (group === 'warning') {
    if (['W014', 'W015', 'W024', 'W026', 'W029', 'W035'].includes(code)) return 'is-makinesi-yuk-ve-ekipman';
    if (['W008', 'W021', 'W022', 'W023', 'W025'].includes(code)) return 'elektrik-yangin-kimyasal';
    if (/shark|tsunami|current|boating|sand|tide|mud|surf|wind|water|crocodile|alligator/i.test(fileName)) return 'su-deniz-ve-doga-tehlikeleri';
    return 'genel-fiziksel-tehlikeler';
  }

  if (group === 'prohibition') {
    if (['P002', 'P003', 'P013'].includes(code)) return 'davranis-yasaklari';
    if (['P004', 'P006', 'P019', 'P023'].includes(code)) return 'giris-gecis-ve-alan-yasaklari';
    if (['P010'].includes(code)) return 'makine-ekipman-yasaklari';
    return 'genel-yasaklar';
  }

  if (group === 'safe-condition') {
    if (/arrow/i.test(fileName) || ['E001', 'E002'].includes(code)) return 'acil-cikis-ve-yonlendirme';
    if (['E003', 'E004', 'E011', 'E012', 'E013'].includes(code)) return 'ilk-yardim-ve-saglik';
    return 'acil-durum-ekipmanlari';
  }

  if (group === 'fire-safety') {
    if (/arrow/i.test(fileName)) return 'yangin-yonlendirme';
    return 'yangin-ekipmanlari';
  }

  return 'diger';
}

function outputFileName(code, fileName) {
  const suffix = knownNames[code] || fileName.replace(/\.svg$/i, '').replace(/^[^-]+--/, '');
  return `${code}--${suffix}.svg`;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      if (entry.isFile() && entry.name.endsWith('.svg')) return [fullPath];
      return [];
    })
  );
  return files.flat();
}

async function main() {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  const sourceFiles = await walk(SOURCE_DIR);
  const manifest = [];
  const usedTargets = new Map();

  for (const sourcePath of sourceFiles) {
    const relativePath = path.relative(SOURCE_DIR, sourcePath);
    const group = groupFromPath(relativePath);
    const fileName = path.basename(sourcePath);
    const code = codeFromName(fileName);
    const category = groupFolders[group] || '99-diger';
    const subcategory = subcategoryFor(group, code, fileName);
    const baseTargetRelative = path.join(category, subcategory, outputFileName(code, fileName));
    const usedCount = usedTargets.get(baseTargetRelative) || 0;
    usedTargets.set(baseTargetRelative, usedCount + 1);
    const targetRelative =
      usedCount === 0
        ? baseTargetRelative
        : baseTargetRelative.replace(/\.svg$/i, `--varyant-${usedCount + 1}.svg`);
    const targetPath = path.join(OUTPUT_DIR, targetRelative);

    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.copyFile(sourcePath, targetPath);
    manifest.push({
      code,
      original: relativePath.split(path.sep).join('/'),
      target: targetRelative.split(path.sep).join('/'),
    });
  }

  manifest.sort((a, b) => a.target.localeCompare(b.target));
  await fs.writeFile(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'README.md'),
    [
      '# Turkce Kategorili ISO 7010 ISG Levhalari',
      '',
      'Bu klasor, `isg-wikimedia-all` kaynak setinin uygulamada daha kolay secilebilmesi icin Turkce kategori basliklariyla duzenlenmis kopyasidir.',
      '',
      'Kaynak klasor silinmedi:',
      '',
      '- `.agent/content/signs/isg-wikimedia-all`',
      '',
      'Ana kategoriler:',
      '',
      '- `01-zorunlu-talimatlar`',
      '- `02-uyari-ve-tehlike`',
      '- `03-yasak-isaretleri`',
      '- `04-acil-durum-ve-ilk-yardim`',
      '- `05-yangin-guvenligi`',
      '',
      'Dosyalar kodlari korunarak adlandirildi. Ornek: `W014--forklift-is-makinesi-cikabilir.svg`.',
      '',
    ].join('\n')
  );

  console.log(`${manifest.length} SVG Turkce kategori klasorlerine yerlestirildi.`);
  console.log(OUTPUT_DIR);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
