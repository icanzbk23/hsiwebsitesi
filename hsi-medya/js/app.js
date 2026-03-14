// js/app.js
// Thumbnail yükleme, render, filtre, popup

// ── THUMBNAIL YÜKLE ──────────────────────────────────────────────
// data/mekanlar.json'dan Apify ile doldurulan thumbnail'ları çek,
// MEKANLAR dizisine patch'le, sonra grid'i yeniden çiz.
async function loadThumbnails() {
  try {
    const res = await fetch('data/mekanlar.json');
    if (!res.ok) throw new Error('JSON yok');
    const json = await res.json();
    const map = json.reels || {};

    MEKANLAR.forEach(m => {
      m.reels.forEach(r => {
        const entry = map[r.sc];
        if (!entry) return;
        if (entry.thumb)   r.thumb   = entry.thumb;
        if (entry.caption) r.caption = entry.caption;
        if (entry.likes)   r.likes   = entry.likes;
      });
    });

    renderCards(currentFilter); // thumbnail gelince yenile
    console.log('✅ Thumbnails yüklendi');
  } catch {
    console.log('ℹ️  data/mekanlar.json bulunamadı — placeholder kullanılıyor');
  }
}

// ── CARD RENDER ───────────────────────────────────────────────────
let currentFilter = 'hepsi';

function renderCards(filter) {
  currentFilter = filter;
  const list = filter === 'hepsi' ? MEKANLAR : MEKANLAR.filter(m => m.cat === filter);
  document.getElementById('mekan-grid').innerHTML = list.map(m => {
    const topViews = m.reels[0].views;
    const thumb    = m.reels[0].thumb;
    return `
    <div class="mekan-card" onclick="openPopup('${m.id}')">
      <div class="card-cover">
        ${thumb
          ? `<img src="${thumb}" alt="${m.name}" loading="lazy">`
          : `<div class="card-cover-placeholder">${m.emoji}</div>`}
        <div class="card-cover-overlay"></div>
        <div class="card-viral">▶ ${topViews} izlenme</div>
        <div class="card-arrow">→</div>
        ${m.logo ? `<div class="card-logo-wrap"><img class="card-logo" src="${m.logo}" alt="${m.name} logo"></div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-cat">${m.catLabel}</div>
        <div class="card-name">${m.name}</div>
        <div class="card-loc">📍 ${m.loc}</div>
        <div class="card-stats">
          <span class="card-stat">👥 ${m.followers}</span>
          <span class="card-stat">📹 3 Viral Video</span>
        </div>
        <div class="card-hsi">✦ HSİ Medya Partneri</div>
      </div>
    </div>`;
  }).join('');
}

// ── FİLTRE ────────────────────────────────────────────────────────
function doFilter(btn, cat) {
  document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCards(cat);
}

// ── POPUP ─────────────────────────────────────────────────────────
function openPopup(id) {
  const m = MEKANLAR.find(x => x.id === id);
  if (!m) return;

  document.getElementById('pop-cat').textContent       = m.catLabel;
  document.getElementById('pop-name').textContent      = m.name;
  document.getElementById('pop-loc').textContent       = m.loc;
  document.getElementById('pop-hours').textContent     = m.hours;
  document.getElementById('pop-followers').textContent = '👥 ' + m.followers;
  document.getElementById('pop-about').textContent     = m.about;
  document.getElementById('pop-hsi').innerHTML         = '✦ ' + m.hsi;

  // Profil fotoğrafı popup başlığında
  const popLogoWrap = document.getElementById('pop-logo-wrap');
  if (m.logo) {
    popLogoWrap.innerHTML = `<img class="pop-logo" src="${m.logo}" alt="${m.name}">`;
    popLogoWrap.style.display = 'block';
  } else {
    popLogoWrap.innerHTML = `<div class="pop-logo-emoji">${m.emoji}</div>`;
    popLogoWrap.style.display = 'block';
  }

  const igLink = document.getElementById('pop-ig-link');
  igLink.href      = m.ig;
  igLink.innerHTML = '📸 ' + m.igHandle;

  // Reels
  document.getElementById('pop-reels').innerHTML = m.reels.map(r => `
    <a class="reel-card" href="${r.url}" target="_blank" rel="noopener">
      <div class="reel-thumb">
        ${r.thumb
          ? `<img src="${r.thumb}" alt="${r.caption || m.name}" loading="lazy">`
          : `<div class="reel-placeholder">${m.emoji}</div>`}
      </div>
      <div class="reel-gradient"></div>
      <div class="reel-play">▶</div>
      <div class="reel-stats-top">
        <div class="reel-pill">👁 ${r.views}</div>
        ${r.likes ? `<div class="reel-pill">❤️ ${r.likes}</div>` : ''}
      </div>
      <div class="reel-bottom">
        <div class="reel-views">${r.views} görüntüleme</div>
        <div class="reel-caption">${r.caption || 'İzlemek için tıkla'}</div>
      </div>
      <div class="reel-bar"></div>
    </a>
  `).join('');

  // Info kartları
  document.getElementById('pop-infos').innerHTML = m.infos.map(i => `
    <div class="pop-info-card">
      <div class="pop-info-label">${i.label}</div>
      <div class="pop-info-val">${i.val}</div>
      <div class="pop-info-sub">${i.sub}</div>
    </div>
  `).join('');

  document.getElementById('popup').classList.add('open');
  document.getElementById('popupBox').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popup').classList.remove('open');
  document.body.style.overflow = '';
}

function closeOutside(e) {
  if (e.target.id === 'popup') closePopup();
}

// ── TAB ───────────────────────────────────────────────────────────
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

// ── BAŞLAT ────────────────────────────────────────────────────────
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });
renderCards('hepsi');   // önce emoji ile hızlı render
loadThumbnails();       // sonra JSON'dan thumbnail patch
