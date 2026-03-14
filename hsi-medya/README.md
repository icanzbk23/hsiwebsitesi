# HSİ Medya — Kurulum & Kullanım Kılavuzu

## Proje Yapısı

```
hsi-medya/
├── mekanlar.html          ← Ana sayfa (Mekanlar + Yakında tabları)
├── index.html             ← Ana site (buraya bağlantı ver)
├── apify_to_json.js       ← Thumbnail indirme scripti
├── js/
│   ├── mekanlar-data.js   ← 11 mekan verisi (düzenlenebilir)
│   └── app.js             ← Render, popup, filtre, thumbnail yükleme
├── data/
│   └── mekanlar.json      ← Apify'dan gelen thumbnail verileri
└── img/
    └── reels/             ← İndirilen thumbnail görselleri
```

---

## Antigravity'e Kurulum

1. Tüm dosyaları projeye yükle
2. `mekanlar.html` → sitenin mekanlar sayfası
3. Ana sayfadaki "Mekanları Keşfet" butonunu `mekanlar.html`'e bağla

---

## Apify Kurulumu (Thumbnail Çekme)

### 1. Apify Hesabı
→ https://apify.com/sign-up (ücretsiz, kredi kartı yok)

### 2. Doğru Actor
**`apify/instagram-api-scraper`** kullan — bu actor reel URL'lerini direkt kabul eder.
URL: https://apify.com/apify/instagram-api-scraper

> ⚠️ `apify/instagram-reel-scraper` kullanma — o "username" field'ı zorunlu tutuyor.

### 3. Input (JSON sekmesine yapıştır)

```json
{
  "directUrls": [
    "https://www.instagram.com/reel/DT7rOvsjLNI/",
    "https://www.instagram.com/reel/DUK4azFCPCf/",
    "https://www.instagram.com/reel/DViXH58CCOB/",
    "https://www.instagram.com/reel/DDAS396iiPu/",
    "https://www.instagram.com/reel/DTXkaPKjFI8/",
    "https://www.instagram.com/reel/DQT60FdDAzR/",
    "https://www.instagram.com/reel/DU0UTRgjGRT/",
    "https://www.instagram.com/reel/DT2y4waDBx4/",
    "https://www.instagram.com/reel/DTNc9CUDFBj/",
    "https://www.instagram.com/reel/DVtIGHHiAsY/",
    "https://www.instagram.com/reel/DU0Nr22CKrS/",
    "https://www.instagram.com/reel/DSVrJHxCMcQ/",
    "https://www.instagram.com/reel/DVYfGqdDVZB/",
    "https://www.instagram.com/reel/DVx2zyrjf1z/",
    "https://www.instagram.com/reel/DTr9HglDfmd/",
    "https://www.instagram.com/reel/DVvca6zDKZk/",
    "https://www.instagram.com/reel/DU5YOxCjDUb/",
    "https://www.instagram.com/reel/DRpMG0kDLiO/",
    "https://www.instagram.com/reel/DVOEFK7DbBJ/",
    "https://www.instagram.com/reel/DUfzj5iDb9q/",
    "https://www.instagram.com/reel/DQtebj7DXRP/",
    "https://www.instagram.com/reel/DVELpx2gotb/",
    "https://www.instagram.com/reel/DTNNfbVgmZF/",
    "https://www.instagram.com/reel/DOYKtV2jTE4/",
    "https://www.instagram.com/reel/DVODayZiMR1/",
    "https://www.instagram.com/reel/DUvDpWTiLEr/",
    "https://www.instagram.com/reel/DTC9Z2pCPwG/",
    "https://www.instagram.com/reel/DVnqE1EDWo6/",
    "https://www.instagram.com/reel/DVda4LrjXYD/",
    "https://www.instagram.com/reel/DVOC8GrjZBK/",
    "https://www.instagram.com/reel/DTcneytjb_j/",
    "https://www.instagram.com/reel/DTr-MYvjLSh/",
    "https://www.instagram.com/reel/DTzmvK5jOsz/"
  ],
  "resultsType": "posts",
  "resultsLimit": 1
}
```

### 4. Çalıştır
"Save & Start" → 3-5 dakika bekle → "Export results → JSON" → `apify_dataset.json` olarak kaydet

### 5. Script Çalıştır
```bash
node apify_to_json.js apify_dataset.json
```

Bu script:
- `data/mekanlar.json` dosyasını doldurur
- Thumbnail görsellerini `img/reels/` klasörüne indirir (CDN expire sorununu çözer)

### 6. Bitişti
Sayfayı aç — thumbnails otomatik yüklenir. 🎉

---

## Thumbnail Çalışma Mantığı

```
mekanlar.html yüklenir
    │
    ├─ İlk render: emoji placeholder ile hızlı gösterim
    │
    └─ data/mekanlar.json fetch edilir
           │
           ├─ JSON varsa: thumb URL'leri mekan verilerine patch'lenir
           │              Grid yeniden render edilir (gerçek görsel)
           │
           └─ JSON yoksa: emoji placeholder kalır (site yine çalışır)
```

---

## Yeni Mekan Eklemek

`js/mekanlar-data.js` dosyasındaki `MEKANLAR` dizisine yeni obje ekle:

```javascript
{
  id:'yeni-mekan', cat:'kebap', catLabel:'Kebap & Döner',
  name:'Mekan Adı', loc:'İlçe, Hatay', hours:'11:00 – 23:00',
  ig:'https://www.instagram.com/handle/', igHandle:'@handle',
  followers:'X.XXX takipçi', emoji:'🔥',
  about:'Mekan hakkında kısa açıklama.',
  reels:[
    {sc:'SHORTCODE1', url:'https://www.instagram.com/reel/SHORTCODE1/', views:'1M', likes:'', caption:'', thumb:''},
    {sc:'SHORTCODE2', url:'https://www.instagram.com/reel/SHORTCODE2/', views:'500K', likes:'', caption:'', thumb:''},
    {sc:'SHORTCODE3', url:'https://www.instagram.com/reel/SHORTCODE3/', views:'200K', likes:'', caption:'', thumb:''},
  ],
  infos:[
    {label:'Kategori',  val:'Kebap & Döner', sub:'Hatay Usulü'},
    {label:'Instagram', val:'@handle',       sub:'X.XXX takipçi'},
    {label:'En Viral',  val:'1M',            sub:'Görüntüleme'},
    {label:'Konum',     val:'İlçe',          sub:'Hatay, Türkiye'},
  ],
  hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
}
```

Sonra `apify_to_json.js` içindeki `SC_MAP`'e de yeni shortcode'ları ekle.

---

## Yakında Sekmesini Güncelleme

`mekanlar.html` dosyasında `tab-yakinda` div'ini bul.
Her `.yakinda-card` için `blur-name`, `yakinda-sub` alanlarını güncelle.

Mekan hazır olunca:
1. `MEKANLAR` dizisine taşı
2. Yakında kartını sil
3. `soon-badge` sayısını güncelle (4 YENİ → 3 YENİ vb.)

---

## Filtre Sayısını Güncelleme

`mekanlar.html` içinde:
```html
<button class="filt active" onclick="doFilter(this,'hepsi')">Tümü (11)</button>
```
Sayıyı manuel güncelle.

---

*HSİ Medya — v1.0*
