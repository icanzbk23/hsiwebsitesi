// js/app.js
// Thumbnail yükleme, render, filtre, popup, hash routing

// ── THUMBNAIL YÜKLE ──────────────────────────────────────────────
async function loadThumbnails() {
  try {
    const res = await fetch('data/mekanlar.json');
    if (!res.ok) throw new Error('JSON yok');
    const json = await res.json();
    const reelMap    = json.reels    || {};
    const profileMap = json.profiles || {};

    MEKANLAR.forEach(m => {
      // Takipçi sayısını güncelle (günlük refresh tarafından yazılır)
      if (profileMap[m.id]?.followers) m.followers = profileMap[m.id].followers;

      // Reel verilerini güncelle
      m.reels.forEach(r => {
        const entry = reelMap[r.sc];
        if (!entry) return;
        if (entry.thumb)   r.thumb   = entry.thumb;
        if (entry.caption) r.caption = entry.caption;
        if (entry.likes)   r.likes   = entry.likes;
        if (entry.views)   r.views   = entry.views;   // izlenme güncellemesi
      });
    });

    renderCards(currentFilter);
    console.log('✅ Veriler güncellendi —', json.last_updated || '');
  } catch {
    console.log('ℹ️  data/mekanlar.json bulunamadı — varsayılan değerler kullanılıyor');
  }
}

// ── CARD RENDER ───────────────────────────────────────────────────
let currentFilter = 'hepsi';
let currentSearch = '';

const SVG_PIN  = `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const SVG_USER = `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const SVG_PLAY = `<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`;

function getFilteredList() {
  let list = currentFilter === 'hepsi'
    ? AKTIF_MEKANLAR
    : AKTIF_MEKANLAR.filter(m => m.cat === currentFilter);
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(m => m.name.toLowerCase().includes(q) || (m.loc||'').toLowerCase().includes(q));
  }
  return list;
}

function renderCards(filter) {
  currentFilter = filter;
  const list = getFilteredList();
  document.getElementById('mekan-grid').innerHTML = list.length === 0
    ? `<div class="empty-state"><div class="empty-icon">◎</div><div class="empty-title">Sonuç bulunamadı</div><div class="empty-sub">Farklı bir arama terimi veya filtre deneyin</div></div>`
    : list.map((m, i) => {
    const topViews  = m.reels[0].views;
    const thumb     = m.reels[0].thumb;
    const profileEl = m.logo
      ? `<img class="card-profile-img" src="${m.logo}" alt="${m.name}">`
      : `<div class="card-profile-img-empty">${(m.name||'?')[0]}</div>`;
    return `
    <div class="mekan-card" data-id="${m.id}" role="button" tabindex="0" onclick="openPopup('${m.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openPopup('${m.id}')}" style="animation-delay:${i * 0.05}s">
      <div class="card-cover">
        ${thumb
          ? `<img src="${thumb}" alt="${m.name}" loading="lazy" style="${m.coverPos ? 'object-position:'+m.coverPos : ''}">`
          : `<div class="card-cover-placeholder">${m.emoji}</div>`}
        <div class="card-cover-overlay"></div>
        <div class="card-viral">▶ ${topViews}</div>
        <div class="card-arrow">→</div>
      </div>
      <div class="card-body">
        <div class="card-top-row">
          <span class="card-cat">${m.catLabel}</span>
          <span class="card-handle">${m.igHandle||''}</span>
        </div>
        <div class="card-name-row">
          ${profileEl}
          <div class="card-name">${m.name}</div>
        </div>
        <div class="card-loc">${SVG_PIN} ${m.loc}</div>
        <div class="card-divider"></div>
        <div class="card-stats">
          <span class="card-stat">${SVG_USER} ${m.followers||'—'}</span>
          <span class="card-stat">${SVG_PLAY} ${m.reels.length} video</span>
        </div>
        <div class="card-hsi">HSİ Medya Partneri</div>
      </div>
    </div>`;
  }).join('');
}

// ── FİLTRE SAYILARI ───────────────────────────────────────────────
function updateFilterCounts() {
  const counts = {
    hepsi:    AKTIF_MEKANLAR.length,
    kebap:    AKTIF_MEKANLAR.filter(m => m.cat === 'kebap').length,
    restoran: AKTIF_MEKANLAR.filter(m => m.cat === 'restoran').length,
    kafe:     AKTIF_MEKANLAR.filter(m => m.cat === 'kafe').length,
    yoresel:  AKTIF_MEKANLAR.filter(m => m.cat === 'yoresel').length,
  };
  document.querySelectorAll('.filt[data-cat]').forEach(btn => {
    const cat   = btn.dataset.cat;
    const label = btn.dataset.label || btn.textContent.replace(/\s*\(\d+\)/, '').trim();
    btn.dataset.label = label;
    const n = counts[cat];
    btn.textContent = (n !== undefined && n > 0) ? `${label} (${n})` : label;
  });
}

// ── YAKINDA RENDER ────────────────────────────────────────────────
function renderYakinda() {
  const grid = document.getElementById('yakinda-grid');
  if (!grid) return;

  const lockSvg = `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;

  grid.innerHTML = YAKINDA_MEKANLAR.map(m => {
    const logoEl = m.logo
      ? `<div class="yakinda-logo"><img src="${m.logo}" alt="${m.name}"></div>`
      : `<div class="yakinda-logo-empty">${(m.name||'?')[0]}</div>`;
    return `
      <div class="yakinda-card">
        <span class="soon-dot">Yakında</span>
        <div class="yakinda-logo-row">
          ${logoEl}
          <div>
            <div class="yakinda-name">${m.name}</div>
            <div class="yakinda-sub">${m.catLabel}</div>
          </div>
        </div>
        <div class="yakinda-week">HSİ Medya'da yakında</div>
        <div class="yakinda-lock">${lockSvg}</div>
      </div>`;
  }).join('');

  // Yakında tab badge sayısını otomatik güncelle
  const badge = document.querySelector('.soon-badge');
  if (badge) badge.textContent = YAKINDA_MEKANLAR.length + ' YENİ';
}

// ── FİLTRE ────────────────────────────────────────────────────────
function doFilter(btn, cat) {
  document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = cat;
  renderCards(cat);
}

// ── ARAMA ─────────────────────────────────────────────────────────
function doSearch(val) {
  currentSearch = val.trim();
  renderCards(currentFilter);
}

// ── POPUP ─────────────────────────────────────────────────────────
function openPopup(id) {
  const m = AKTIF_MEKANLAR.find(x => x.id === id);
  if (!m) return;

  document.getElementById('pop-cat').textContent       = m.catLabel;
  document.getElementById('pop-name').textContent      = m.name;
  document.getElementById('pop-loc').textContent       = m.loc;
  document.getElementById('pop-hours').textContent     = m.hours;
  document.getElementById('pop-followers').textContent = '👥 ' + m.followers;
  document.getElementById('pop-about').textContent     = m.about;
  document.getElementById('pop-hsi').innerHTML         = '✦ ' + m.hsi;

  const popLogoWrap = document.getElementById('pop-logo-wrap');
  if (m.logo) {
    popLogoWrap.innerHTML    = `<img class="pop-logo" src="${m.logo}" alt="${m.name}">`;
    popLogoWrap.style.display = 'block';
  } else {
    popLogoWrap.innerHTML    = `<div class="pop-logo-emoji">${m.emoji}</div>`;
    popLogoWrap.style.display = 'block';
  }

  const igLink     = document.getElementById('pop-ig-link');
  igLink.href      = m.ig;
  igLink.innerHTML = '📸 ' + m.igHandle;

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

  // Hash routing: URL güncelle
  history.pushState({ popup: id }, '', '#' + id);
}

function closePopup() {
  document.getElementById('popup').classList.remove('open');
  document.body.style.overflow = '';
  // Hash'i temizle (geri tuşuyla da çalışır)
  if (location.hash) history.pushState(null, '', location.pathname + location.search);
}

function closeOutside(e) {
  if (e.target.id === 'popup') closePopup();
}

// Tarayıcı geri tuşu popup'ı kapat
window.addEventListener('popstate', () => {
  const popup = document.getElementById('popup');
  if (popup && popup.classList.contains('open')) {
    document.getElementById('popup').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── TAB ───────────────────────────────────────────────────────────
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

// ── BAŞLAT ────────────────────────────────────────────────────────
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

renderCards('hepsi');   // önce hızlı render
loadThumbnails();       // sonra JSON'dan thumbnail patch
updateFilterCounts();   // filtre buton sayılarını güncelle
renderYakinda();        // yakında tabını JS ile doldur

// Sayfa yüklenince hash varsa popup aç
const _initHash = location.hash.slice(1);
if (_initHash && AKTIF_MEKANLAR.find(m => m.id === _initHash)) {
  openPopup(_initHash);
}
