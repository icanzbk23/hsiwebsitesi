#!/usr/bin/env node
/**
 * scripts/refresh.js
 * ─────────────────────────────────────────────────────────────────────
 * Apify API üzerinden günlük Instagram veri tazelemesi.
 * GitHub Actions tarafından her gün 06:00 UTC (09:00 TR) çalışır.
 *
 * Güncellenenler → hsi-medya/data/mekanlar.json:
 *   reels[shortcode]  : views, likes, caption, thumb
 *   profiles[mekanId] : followers, followersRaw
 *
 * Bağımlılık yok — yalnızca Node.js built-in modüller kullanılır.
 * ─────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs    = require('fs');
const path  = require('path');
const https = require('https');
const http  = require('http');

// ── Token ─────────────────────────────────────────────────────────────
const TOKEN = process.env.APIFY_TOKEN;
if (!TOKEN) {
  console.error('❌  APIFY_TOKEN ortam değişkeni eksik.');
  console.error('    GitHub → Repo Settings → Secrets → Actions → New secret');
  console.error('    Name: APIFY_TOKEN   Value: apify_api_...');
  process.exit(1);
}

// ── 33 Reel URL ───────────────────────────────────────────────────────
const REEL_URLS = [
  'https://www.instagram.com/reel/DT7rOvsjLNI/',
  'https://www.instagram.com/reel/DUK4azFCPCf/',
  'https://www.instagram.com/reel/DViXH58CCOB/',
  'https://www.instagram.com/reel/DDAS396iiPu/',
  'https://www.instagram.com/reel/DTXkaPKjFI8/',
  'https://www.instagram.com/reel/DQT60FdDAzR/',
  'https://www.instagram.com/reel/DU0UTRgjGRT/',
  'https://www.instagram.com/reel/DT2y4waDBx4/',
  'https://www.instagram.com/reel/DTNc9CUDFBj/',
  'https://www.instagram.com/reel/DVYfGqdDVZB/',
  'https://www.instagram.com/reel/DVx2zyrjf1z/',
  'https://www.instagram.com/reel/DTr9HglDfmd/',
  'https://www.instagram.com/reel/DVvca6zDKZk/',
  'https://www.instagram.com/reel/DU5YOxCjDUb/',
  'https://www.instagram.com/reel/DRpMG0kDLiO/',
  'https://www.instagram.com/reel/DVOEFK7DbBJ/',
  'https://www.instagram.com/reel/DUfzj5iDb9q/',
  'https://www.instagram.com/reel/DQtebj7DXRP/',
  'https://www.instagram.com/reel/DVELpx2gotb/',
  'https://www.instagram.com/reel/DTNNfbVgmZF/',
  'https://www.instagram.com/reel/DOYKtV2jTE4/',
  'https://www.instagram.com/reel/DVODayZiMR1/',
  'https://www.instagram.com/reel/DUvDpWTiLEr/',
  'https://www.instagram.com/reel/DTC9Z2pCPwG/',
  'https://www.instagram.com/reel/DVnqE1EDWo6/',
  'https://www.instagram.com/reel/DVda4LrjXYD/',
  'https://www.instagram.com/reel/DVOC8GrjZBK/',
  'https://www.instagram.com/reel/DV817k8jA0t/',
  'https://www.instagram.com/reel/DWB993zjM7X/',
  'https://www.instagram.com/reel/DWBVE_WjISj/',
  'https://www.instagram.com/reel/DTcneytjb_j/',
  'https://www.instagram.com/reel/DTr-MYvjLSh/',
  'https://www.instagram.com/reel/DTzmvK5jOsz/',
  'https://www.instagram.com/reel/DWbEbIKDG1J/',
  'https://www.instagram.com/reel/DWRMIALDHCa/',
  'https://www.instagram.com/reel/DWOmkshjMPY/',
];

// ── 11 Profil URL ─────────────────────────────────────────────────────
const PROFILE_URLS = [
  'https://www.instagram.com/restaurantmikado/',
  'https://www.instagram.com/donerci.suleymanusta/',
  'https://www.instagram.com/hatay_sultan_sofrasi/',
  'https://www.instagram.com/steakharveybrg.iskenderun/',
  'https://www.instagram.com/sutlukavurma/',
  'https://www.instagram.com/egedonerrr/',
  'https://www.instagram.com/kubankuruyemis/',
  'https://www.instagram.com/isteciftlik/',
  'https://www.instagram.com/kebapci.sezaiusta/',
  'https://www.instagram.com/sinanozdemir023/',
  'https://www.instagram.com/mustadoner/',
  'https://www.instagram.com/egebufee/',
];

// ── Shortcode → Mekan ID ──────────────────────────────────────────────
const SC_MAP = {
  'DT7rOvsjLNI':'mikado',        'DUK4azFCPCf':'mikado',        'DViXH58CCOB':'mikado',
  'DDAS396iiPu':'suleymanusta',  'DTXkaPKjFI8':'suleymanusta',  'DQT60FdDAzR':'suleymanusta',
  'DU0UTRgjGRT':'sultansofrasi', 'DT2y4waDBx4':'sultansofrasi', 'DTNc9CUDFBj':'sultansofrasi',
  'DVYfGqdDVZB':'harveyburger',  'DVx2zyrjf1z':'harveyburger',  'DTr9HglDfmd':'harveyburger',
  'DVvca6zDKZk':'sutlukavurma',  'DU5YOxCjDUb':'sutlukavurma',  'DRpMG0kDLiO':'sutlukavurma',
  'DVOEFK7DbBJ':'egedoner',      'DUfzj5iDb9q':'egedoner',      'DQtebj7DXRP':'egedoner',
  'DVELpx2gotb':'kubankuruyemis','DTNNfbVgmZF':'kubankuruyemis','DOYKtV2jTE4':'kubankuruyemis',
  'DVODayZiMR1':'isteciftlik',   'DUvDpWTiLEr':'isteciftlik',   'DTC9Z2pCPwG':'isteciftlik',
  'DVnqE1EDWo6':'sezaiusta',     'DVda4LrjXYD':'sezaiusta',     'DVOC8GrjZBK':'sezaiusta',
  'DV817k8jA0t':'sinanozdemir',  'DWB993zjM7X':'sinanozdemir',  'DWBVE_WjISj':'sinanozdemir',
  'DTcneytjb_j':'mustadoner',    'DTr-MYvjLSh':'mustadoner',    'DTzmvK5jOsz':'mustadoner',
  'DWbEbIKDG1J':'egebufe',       'DWRMIALDHCa':'egebufe',       'DWOmkshjMPY':'egebufe',
};

// ── Instagram kullanıcı adı → Mekan ID ───────────────────────────────
const PROFILE_MAP = {
  'restaurantmikado':          'mikado',
  'donerci.suleymanusta':      'suleymanusta',
  'hatay_sultan_sofrasi':      'sultansofrasi',
  'steakharveybrg.iskenderun': 'harveyburger',
  'sutlukavurma':              'sutlukavurma',
  'egedonerrr':                'egedoner',
  'kubankuruyemis':            'kubankuruyemis',
  'isteciftlik':               'isteciftlik',
  'kebapci.sezaiusta':         'sezaiusta',
  'sinanozdemir023':           'sinanozdemir',
  'mustadoner':                'mustadoner',
  'egebufee':                  'egebufe',
};

// ── Apify API yardımcıları ────────────────────────────────────────────

function apifyReq(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'api.apify.com',
      port: 443,
      path: `/v2${urlPath}?token=${TOKEN}`,
      method,
      headers: payload
        ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
        : {},
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch (e) { reject(new Error('Apify yanıtı parse hatası: ' + Buffer.concat(chunks).toString().slice(0, 300))); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runActor(input, label, actorId = 'apify~instagram-api-scraper') {
  console.log(`\n▶  ${label} başlatılıyor...`);
  const res = await apifyReq('POST', `/acts/${actorId}/runs`, input);
  if (!res.data?.id) {
    throw new Error(`Actor başlatılamadı: ${JSON.stringify(res).slice(0, 300)}`);
  }
  const runId = res.data.id;
  console.log(`   Run ID: ${runId}`);

  // Tamamlanana kadar her 10 saniyede bir kontrol et (maks 10dk)
  for (let i = 1; i <= 60; i++) {
    await sleep(10000);
    const poll   = await apifyReq('GET', `/actor-runs/${runId}`);
    const status = poll.data?.status ?? 'UNKNOWN';
    process.stdout.write(`   [${i * 10}s] ${status}        \r`);
    if (status === 'SUCCEEDED') {
      console.log(`\n✅ ${label} tamamlandı`);
      return poll.data.defaultDatasetId;
    }
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) {
      throw new Error(`${label} başarısız: ${status}`);
    }
  }
  throw new Error(`${label} zaman aşımına uğradı (10 dk)`);
}

async function getItems(datasetId) {
  const res = await apifyReq('GET', `/datasets/${datasetId}/items`);
  return Array.isArray(res) ? res : (res.items || []);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Sayı formatlama ───────────────────────────────────────────────────

function fmtNum(n) {
  n = Number(n) || 0;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1_000)     return Math.round(n / 1_000) + 'K';
  return n ? String(n) : '';
}

function fmtFollowers(n) {
  n = Number(n) || 0;
  if (!n) return '';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M takipçi';
  if (n >= 1_000)     return n.toLocaleString('tr-TR') + ' takipçi';
  return n + ' takipçi';
}

// ── Görsel indirici ───────────────────────────────────────────────────

function downloadImage(url, dest) {
  return new Promise(resolve => {
    if (!url) return resolve(false);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) return resolve(true); // zaten var
    const proto = url.startsWith('https') ? https : http;
    const file  = fs.createWriteStream(dest);
    const req   = proto.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); try { fs.unlinkSync(dest); } catch {}
        return downloadImage(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close(); try { fs.unlinkSync(dest); } catch {}
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    });
    req.on('error', () => { try { fs.unlinkSync(dest); } catch {} resolve(false); });
    req.setTimeout(20000, () => { req.destroy(); resolve(false); });
  });
}

// ── Ana fonksiyon ─────────────────────────────────────────────────────

async function main() {
  const ROOT     = path.join(__dirname, '..');
  const jsonPath = path.join(ROOT, 'data', 'mekanlar.json');
  const reelsDir = path.join(ROOT, 'img', 'reels');

  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.mkdirSync(reelsDir, { recursive: true });

  // Mevcut JSON'u oku (varsa koru, yoksa sıfırla)
  const data = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    : {};
  data.reels    = data.reels    || {};
  data.profiles = data.profiles || {};

  // ── 1. Reel verisi ────────────────────────────────────────────────
  const reelDatasetId = await runActor(
    { directUrls: REEL_URLS, resultsType: 'posts', resultsLimit: 1 },
    'Reel Scraper (33 video)'
  );
  const reelItems = await getItems(reelDatasetId);
  console.log(`   ${reelItems.length} reel verisi alındı`);

  let reelOk = 0;
  for (const item of reelItems) {
    // Shortcode'u bul
    const sc = item.shortCode || item.shortcode
      || (item.url  || '').match(/\/reel\/([^/?]+)/)?.[1]
      || (item.link || '').match(/\/reel\/([^/?]+)/)?.[1];
    if (!sc || !SC_MAP[sc]) continue;

    // Thumbnail indir
    const thumbUrl  = item.displayUrl || item.thumbnailUrl || item.previewUrl || item.imageUrl || '';
    const localFile = path.join(reelsDir, `${sc}.jpg`);
    let   thumb     = data.reels[sc]?.thumb || '';

    if (thumbUrl) {
      const ok = await downloadImage(thumbUrl, localFile);
      thumb = ok ? `img/reels/${sc}.jpg` : (data.reels[sc]?.thumb || thumbUrl);
    } else if (fs.existsSync(localFile) && fs.statSync(localFile).size > 1024) {
      thumb = `img/reels/${sc}.jpg`;
    }

    const viewsRaw = item.videoPlayCount ?? item.playCount ?? item.videoViewCount ?? 0;
    const likesRaw = item.likesCount ?? item.likes_count ?? item.likeCount ?? 0;
    const caption  = (item.caption || item.text || '').replace(/\n/g, ' ').slice(0, 100).trim();

    data.reels[sc] = {
      mekan:   SC_MAP[sc],
      thumb,
      views:   fmtNum(viewsRaw),
      likes:   fmtNum(likesRaw),
      caption,
    };
    reelOk++;
  }
  console.log(`   ✓ ${reelOk} / ${reelItems.length} reel güncellendi`);

  // ── 2. Profil verisi ──────────────────────────────────────────────
  const profDatasetId = await runActor(
    { usernames: Object.keys(PROFILE_MAP) },
    'Profil Scraper (12 hesap)',
    'apify~instagram-profile-scraper'
  );
  const profItems = await getItems(profDatasetId);
  console.log(`   ${profItems.length} profil verisi alındı`);

  let profOk = 0;
  for (const item of profItems) {
    const username = item.username || item.userName || item.login;
    if (!username) continue;
    const mekanId = PROFILE_MAP[username];
    if (!mekanId) { console.log(`   ⚠ Bilinmeyen kullanıcı: ${username}`); continue; }
    const followersRaw = item.followersCount
      ?? item.followers_count
      ?? item.edge_followed_by?.count
      ?? 0;
    data.profiles[mekanId] = {
      followers:    fmtFollowers(followersRaw),
      followersRaw: followersRaw,
    };
    console.log(`   ${username} → ${fmtFollowers(followersRaw)}`);
    profOk++;
  }
  console.log(`   ✓ ${profOk} / ${profItems.length} profil güncellendi`);

  // ── 3. Kaydet ─────────────────────────────────────────────────────
  data.last_updated = new Date().toISOString().split('T')[0];
  data.note = 'Bu dosya hsi-medya/scripts/refresh.js tarafından otomatik güncellenir.';
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n📄 data/mekanlar.json güncellendi — ${data.last_updated}`);
  console.log('   Vercel push → otomatik deploy başlayacak.\n');
}

main().catch(e => {
  console.error('\n❌ Hata:', e.message);
  process.exit(1);
});
