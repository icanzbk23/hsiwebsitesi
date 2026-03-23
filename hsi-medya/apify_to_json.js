/**
 * apify_to_json.js
 * ─────────────────────────────────────────────────────
 * Apify'dan indirilen dataset.json'u → data/mekanlar.json'a dönüştürür.
 * Thumbnail'ları img/reels/ klasörüne İNDİRİR (CDN expire sorununu çözer).
 *
 * Kurulum:
 *   npm install node-fetch   (Node 18 altındaysa)
 *
 * Kullanım:
 *   node apify_to_json.js apify_dataset.json
 * ─────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');
const http  = require('http');

// ── Apify input JSON (doğru actor için) ──────────────────
// Apify'da şu actor'ı kullanın:
//   apify/instagram-api-scraper
//
// Input (JSON sekmesi):
// {
//   "directUrls": [
//     "https://www.instagram.com/reel/DT7rOvsjLNI/",
//     "https://www.instagram.com/reel/DUK4azFCPCf/",
//     ... (33 reel URL'si)
//   ],
//   "resultsType": "posts",
//   "resultsLimit": 1
// }
//
// NOT: "username" field hatası alıyorsanız apify/instagram-reel-scraper
// yerine apify/instagram-api-scraper kullanın. O actor directUrls kabul eder.

// ── Shortcode → mekan eşlemesi ───────────────────────────
const SC_MAP = {
  'DT7rOvsjLNI':'mikado',        'DUK4azFCPCf':'mikado',        'DViXH58CCOB':'mikado',
  'DDAS396iiPu':'suleymanusta',  'DTXkaPKjFI8':'suleymanusta',  'DQT60FdDAzR':'suleymanusta',
  'DU0UTRgjGRT':'sultansofrasi', 'DT2y4waDBx4':'sultansofrasi', 'DTNc9CUDFBj':'sultansofrasi',
  'DV817k8jA0t':'sinanozdemir', 'DWB993zjM7X':'sinanozdemir', 'DWBVE_WjISj':'sinanozdemir',
  'DVYfGqdDVZB':'harveyburger',  'DVx2zyrjf1z':'harveyburger',  'DTr9HglDfmd':'harveyburger',
  'DVvca6zDKZk':'sutlukavurma',  'DU5YOxCjDUb':'sutlukavurma',  'DRpMG0kDLiO':'sutlukavurma',
  'DVOEFK7DbBJ':'egedoner',      'DUfzj5iDb9q':'egedoner',      'DQtebj7DXRP':'egedoner',
  'DVELpx2gotb':'kubankuruyemis','DTNNfbVgmZF':'kubankuruyemis','DOYKtV2jTE4':'kubankuruyemis',
  'DVODayZiMR1':'isteciftlik',   'DUvDpWTiLEr':'isteciftlik',   'DTC9Z2pCPwG':'isteciftlik',
  'DVnqE1EDWo6':'sezaiusta',     'DVda4LrjXYD':'sezaiusta',     'DVOC8GrjZBK':'sezaiusta',
  'DTcneytjb_j':'mustadoner',    'DTr-MYvjLSh':'mustadoner',    'DTzmvK5jOsz':'mustadoner',
};

// ── Yardımcı: sayı formatı ───────────────────────────────
function fmt(n) {
  if (!n) return '';
  if (n >= 1000000) return (n/1000000).toFixed(1).replace('.0','') + 'M';
  if (n >= 1000)    return Math.round(n/1000) + 'K';
  return String(n);
}

// ── Yardımcı: URL'den shortcode çıkar ───────────────────
function extractSC(item) {
  return item.shortCode
    || item.shortcode
    || (item.url && item.url.match(/\/reel\/([^/?]+)/)?.[1])
    || (item.url && item.url.match(/\/p\/([^/?]+)/)?.[1])
    || null;
}

// ── Yardımcı: görsel indir ───────────────────────────────
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url) return resolve(false);
    if (fs.existsSync(dest)) return resolve(true); // zaten indirilmiş

    const proto = url.startsWith('https') ? https : http;
    const file  = fs.createWriteStream(dest);

    const req = proto.get(url, res => {
      // Redirect takip et
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    });
    req.on('error', () => { fs.existsSync(dest) && fs.unlinkSync(dest); resolve(false); });
    req.setTimeout(15000, () => { req.destroy(); resolve(false); });
  });
}

// ── ANA FONKSİYON ────────────────────────────────────────
async function main() {
  const inputFile = process.argv[2] || 'apify_dataset.json';

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Dosya bulunamadı: ${inputFile}`);
    console.log('Kullanım: node apify_to_json.js apify_dataset.json');
    process.exit(1);
  }

  // Klasörleri oluştur
  ['data', 'img/reels'].forEach(d => fs.mkdirSync(d, { recursive: true }));

  const apifyData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const jsonPath  = 'data/mekanlar.json';
  const existing  = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    : { reels: {} };

  let filled = 0, downloaded = 0, skipped = [];
  const items = Array.isArray(apifyData) ? apifyData : (apifyData.items || []);

  console.log(`\n📦 ${items.length} item işleniyor...\n`);

  for (const item of items) {
    const sc = extractSC(item);
    if (!sc || !SC_MAP[sc]) { skipped.push(sc || '?'); continue; }

    // Thumbnail URL (Apify farklı fieldlar döndürebilir)
    const thumbUrl = item.displayUrl
      || item.thumbnailUrl
      || item.thumbnail_url
      || item.previewUrl
      || item.imageUrl
      || '';

    // Yerel dosya yolu
    const localFile = `img/reels/${sc}.jpg`;
    const localPath = `img/reels/${sc}.jpg`;

    // İndir
    let thumbLocal = '';
    if (thumbUrl) {
      process.stdout.write(`  ⬇  ${sc} ... `);
      const ok = await downloadImage(thumbUrl, localFile);
      if (ok) {
        thumbLocal = localPath;
        downloaded++;
        console.log('✓');
      } else {
        thumbLocal = thumbUrl; // indirilemezhse URL'yi kullan
        console.log('URL kullanılacak');
      }
    }

    // Caption
    const rawCap = item.caption || item.text || item.description || '';
    const caption = rawCap.replace(/\n/g,' ').substring(0, 100).trim();

    // Beğeni
    const likes = fmt(item.likesCount || item.likes_count || item.likeCount || item.edge_media_preview_like?.count || 0);

    // JSON'u güncelle
    existing.reels[sc] = {
      mekan:   SC_MAP[sc],
      thumb:   thumbLocal,
      caption: caption,
      likes:   likes,
    };
    filled++;
  }

  existing.last_updated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(jsonPath, JSON.stringify(existing, null, 2), 'utf8');

  console.log(`\n✅ Tamamlandı!`);
  console.log(`   ${filled} reel güncellendi`);
  console.log(`   ${downloaded} thumbnail indirildi → img/reels/`);
  if (skipped.filter(Boolean).length)
    console.log(`   ⚠️  Atlanılan (shortcode bulunamadı): ${skipped.filter(Boolean).join(', ')}`);
  console.log(`   📄 data/mekanlar.json güncellendi`);
  console.log(`\n→ Sayfayı tarayıcıda açın — thumbnails otomatik yüklenecek.\n`);
}

main().catch(e => { console.error('❌ Hata:', e.message); process.exit(1); });
