// js/mekanlar-data.js
// Tüm mekan verisi burada.
// status:'aktif'   → mekanlar gridinde görünür
// status:'yakinda' → yakında tabında görünür
// Aktif yapmak için sadece status:'yakinda' → status:'aktif' yap, başka dokunma.

const MEKANLAR = [
  {
    id:'mikado', cat:'restoran', catLabel:'Restoran',
    status:'aktif',
    name:'Mikado Restaurant', loc:'Antakya, Hatay', hours:'11:00 – 23:00',
    ig:'https://www.instagram.com/restaurantmikado/', igHandle:'@restaurantmikado',
    logo:'img/profiles/restaurantmikado.jpg',
    followers:'6.235 takipçi', emoji:'🍽️',
    about:'Antakya\'nın kalbinde otantik Hatay mutfağını modern bir dokunuşla sunan Mikado Restaurant, taze malzeme ve ustalıkla hazırladığı lezzetlerle hem yerel halkın hem turistlerin gözdesi.',
    reels:[
      {sc:'DT7rOvsjLNI', url:'https://www.instagram.com/reel/DT7rOvsjLNI/', views:'2.3M', likes:'85',   caption:'Tavada birleşen efsane lezzet 🔥🍳 Mikado Tava, yumuşacık et, kırmızı biber, yeşil biber, soğan ve s', thumb:'img/reels/DT7rOvsjLNI.jpg'},
      {sc:'DUK4azFCPCf', url:'https://www.instagram.com/reel/DUK4azFCPCf/', views:'1.2M', likes:'123',  caption:'Tavada ustalık, tabakta lezzet 🔥🍳 Belen tava, Yumuşacık et, sebzeler ve baharatlarla Ağır ateşte p', thumb:'img/reels/DUK4azFCPCf.jpg'},
      {sc:'DViXH58CCOB', url:'https://www.instagram.com/reel/DViXH58CCOB/', views:'580K', likes:'3K',   caption:'Közün kokusu, mezeye karakter katar 🔥🍆 Mütebbel, közlenmiş patlıcanın tahin, sarımsak ve özel dok', thumb:'img/reels/DViXH58CCOB.jpg'},
    ],
    infos:[
      {label:'Kategori',    val:'Restoran',         sub:'Hatay Mutfağı'},
      {label:'Instagram',   val:'@restaurantmikado',sub:'6.235 takipçi'},
      {label:'En Viral',    val:'2.3M',             sub:'Görüntüleme'},
      {label:'Konum',       val:'Antakya',          sub:'Hatay, Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong> & <strong>Eser Bilen</strong>'
  },
  {
    id:'suleymanusta', cat:'kebap', catLabel:'Dönerci',
    status:'aktif', coverPos:'center 20%',
    name:'Süleyman Usta', loc:'Hatay', hours:'10:00 – 22:00',
    ig:'https://www.instagram.com/donerci.suleymanusta/', igHandle:'@donerci.suleymanusta',
    logo:'img/profiles/donerci.suleymanusta.jpg',
    followers:'72.000 takipçi', emoji:'🥙',
    about:'Hatay\'da yıllardır döner sanatını icra eden Süleyman Usta, 72 bin takipçisiyle sosyal medyanın da gözdesi. Viral içerikleriyle döner kültürünü milyonlara taşıdı.',
    reels:[
      {sc:'DDAS396iiPu', url:'https://www.instagram.com/reel/DDAS396iiPu/', views:'3.8M', likes:'65K', caption:'"6 ekmekli Dev Tavuk Döner! Bu lezzet efsanesi, Süleyman Usta\'nın ellerinden geliyor! Her katında bo', thumb:'img/reels/DDAS396iiPu.jpg'},
      {sc:'DTXkaPKjFI8', url:'https://www.instagram.com/reel/DTXkaPKjFI8/', views:'1.2M', likes:'18K', caption:'Dönerci Süleyman Usta\'nın 4 Isırık Akımı…🔥🌯 Kendine güveniyorsan sahne senin…🎥 Döneri 4 ısırıkta', thumb:'img/reels/DTXkaPKjFI8.jpg'},
      {sc:'DQT60FdDAzR', url:'https://www.instagram.com/reel/DQT60FdDAzR/', views:'1.3M', likes:'23K', caption:'Full+Full döner yedikçe daha çok istiyorsan yalnız değilsin 😋 Bu döner "bitmesin" dedirten cinsten!', thumb:'img/reels/DQT60FdDAzR.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Dönerci',             sub:'Hatay Usulü'},
      {label:'Instagram', val:'@suleymanustadoner',   sub:'72.000 takipçi'},
      {label:'En Viral',  val:'3.8M',                sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',               sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'sultansofrasi', cat:'restoran', catLabel:'Restoran',
    status:'aktif',
    name:'Sultan Sofrası', loc:'Hatay', hours:'11:00 – 23:00',
    ig:'https://www.instagram.com/hatay_sultan_sofrasi/', igHandle:'@hatay_sultan_sofrasi',
    logo:'img/profiles/hatay_sultan_sofrasi.jpg',
    followers:'124.000 takipçi', emoji:'👑',
    about:'124 bin takipçisiyle Hatay\'ın en büyük restoran Instagram hesaplarından biri. Sultan Sofrası, geleneksel Hatay sofra kültürünü görkemli sunumlarla yaşatıyor.',
    reels:[
      {sc:'DU0UTRgjGRT', url:'https://www.instagram.com/reel/DU0UTRgjGRT/', views:'1.4M', likes:'28K', caption:'Taş fırından yeni çıkan sıcacık lahmacun… İncecik hamur, bol harç ve o bildiğin Hatay kokusu 🤌', thumb:'img/reels/DU0UTRgjGRT.jpg'},
      {sc:'DT2y4waDBx4', url:'https://www.instagram.com/reel/DT2y4waDBx4/', views:'2.8M', likes:'11K', caption:'Hatay Sultan Sofrasında Ispanaklı Gül Böreği 🌿 Taptaze ıspanak, özel iç harcı ve incecik açılan yu', thumb:'img/reels/DT2y4waDBx4.jpg'},
      {sc:'DTNc9CUDFBj', url:'https://www.instagram.com/reel/DTNc9CUDFBj/', views:'1.9M', likes:'15K', caption:'Hatay Sultan Sofrası\'nda Tappuş Oruk 🤍 Dışı çıtır, içi tam Hatay usulü… Anne eli değmiş gibi, özle', thumb:'img/reels/DTNc9CUDFBj.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Restoran',       sub:'Hatay Mutfağı'},
      {label:'Instagram', val:'@sultansofrasi', sub:'124.000 takipçi'},
      {label:'En Viral',  val:'2.8M',           sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',          sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'harveyburger', cat:'kafe', catLabel:'Burger',
    status:'aktif',
    name:'Harvey Burger', loc:'Hatay', hours:'11:00 – 24:00',
    ig:'https://www.instagram.com/steakharveybrg.iskenderun/', igHandle:'@steakharveybrg.iskenderun',
    logo:'img/profiles/steakharveybrg.iskenderun.jpg',
    followers:'2.300 takipçi', emoji:'🍔',
    about:'Harvey Burger, 6 milyon izlenmeyle Hatay\'ın en viral burger mekanı unvanını kazandı. Özel sosları ve el yapımı burgerleriyle şehrin burger haritasını yeniden çizdi.',
    reels:[
      {sc:'DVYfGqdDVZB', url:'https://www.instagram.com/reel/DVYfGqdDVZB/', views:'6M',   likes:'209K', caption:'Sadelikte iddia 🍔🔥 Cheese Burger, dinlenmiş etin güçlü lezzeti ve eriyen double cheddar peyniriyl', thumb:'img/reels/DVYfGqdDVZB.jpg'},
      {sc:'DVx2zyrjf1z', url:'https://www.instagram.com/reel/DVx2zyrjf1z/', views:'310K', likes:'6K',   caption:'Meşe ateşinde pişen burgerlerimiz 🔥🍔 ateşin verdiği o duman aromasıyla hazırlanır… Yanında çıtır', thumb:'img/reels/DVx2zyrjf1z.jpg'},
      {sc:'DTr9HglDfmd', url:'https://www.instagram.com/reel/DTr9HglDfmd/', views:'120K', likes:'307',  caption:'Lezzetin lüks hali 🍔✨ Cheddar\'lı, trüf soslu Trüf Burger masada! Yoğun aroma, akışkan cheddar ve tr', thumb:'img/reels/DTr9HglDfmd.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Burger',        sub:'Fast Casual'},
      {label:'Instagram', val:'@harveyburger', sub:'2.300 takipçi'},
      {label:'En Viral',  val:'6M',            sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',         sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'sutlukavurma', cat:'yoresel', catLabel:'Kavurmacı',
    status:'aktif',
    name:'Sütlü Kavurma', loc:'Hatay', hours:'09:00 – 22:00',
    ig:'https://www.instagram.com/sutlukavurma/', igHandle:'@sutlukavurma',
    logo:'img/profiles/sutlukavurma.jpg',
    followers:'138.000 takipçi', emoji:'🫕',
    about:'Hatay\'ın en ikonik lezzeti sütlü kavurmanın ustası. 21.9 milyon izlenmeyle sosyal medyayı kasıp kavurdu. 138 bin takipçisiyle Hatay mutfağının dijital yüzü.',
    reels:[
      {sc:'DRpMG0kDLiO', url:'https://www.instagram.com/reel/DRpMG0kDLiO/', views:'21.9M', likes:'203K', caption:'ACILI SARIMSAKLI PİDE DÜRÜM… 🔥🔥🔥 #sütlükavurma #kavurma #iskenderun #hatay #yemek', thumb:'img/reels/DRpMG0kDLiO.jpg'},
      {sc:'DU5YOxCjDUb', url:'https://www.instagram.com/reel/DU5YOxCjDUb/', views:'2.1M',  likes:'26K',  caption:'SARIMSAKLI PİDE DÜRÜMÜMÜZ…🔥 #sütlükavurma #kavurma #yemek #iskenderun #hatay', thumb:'img/reels/DU5YOxCjDUb.jpg'},
      {sc:'DVvca6zDKZk', url:'https://www.instagram.com/reel/DVvca6zDKZk/', views:'1M',    likes:'5K',   caption:'Sarımsaklı İlikli Kemik Sulu Kavurmalı Mercimek Çorbası…💛 #sütlükavurma #iskenderun #kavurma #hata', thumb:'img/reels/DVvca6zDKZk.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Kavurmacı',      sub:'Hatay Mutfağı'},
      {label:'Instagram', val:'@sutlukavurma',  sub:'138.000 takipçi'},
      {label:'En Viral',  val:'21.9M',          sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',          sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong> & <strong>Hatay Sandık İçi</strong>'
  },
  {
    id:'egedoner', cat:'kebap', catLabel:'Dönerci',
    status:'aktif',
    name:'Ege Döner', loc:'Hatay', hours:'10:00 – 23:00',
    ig:'https://www.instagram.com/egedonerrr/', igHandle:'@egedonerrr',
    logo:'img/profiles/egedonerrr.jpg',
    followers:'11.000 takipçi', emoji:'🥙',
    about:'Ege Döner, 6.3 milyon izlenmeyle Hatay\'ın en viral döner mekanı. Özenle hazırlanan dönerleri ve çıtır ekmeğiyle kısa sürede şehrin ikonu haline geldi.',
    reels:[
      {sc:'DVOEFK7DbBJ', url:'https://www.instagram.com/reel/DVOEFK7DbBJ/', views:'6.3M', likes:'197K', caption:'Bazı lezzetler unutulmazdır... 👨‍🍳🔥 Ege Döner olarak bizim sırrımız; işimize duyduğumuz sevgi ve', thumb:'img/reels/DVOEFK7DbBJ.jpg'},
      {sc:'DUfzj5iDb9q', url:'https://www.instagram.com/reel/DUfzj5iDb9q/', views:'5M',   likes:'66K',  caption:'Ege Döner\'in el yapımı sarımsaklı mayonezi 🧄🤍 Her gün taze hazırlanan, kıvamı tam yerinde, kokusuy', thumb:'img/reels/DUfzj5iDb9q.jpg'},
      {sc:'DQtebj7DXRP', url:'https://www.instagram.com/reel/DQtebj7DXRP/', views:'3.1M', likes:'37K',  caption:'"Ege Döner\'de her an ayrı bir keyif! 😄 Eğlence bizde, lezzet bizde! 🌯🔥', thumb:'img/reels/DQtebj7DXRP.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Dönerci',   sub:'Hatay Usulü'},
      {label:'Instagram', val:'@egedoner', sub:'11.000 takipçi'},
      {label:'En Viral',  val:'6.3M',      sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',     sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'kubankuruyemis', cat:'kafe', catLabel:'Kuruyemiş',
    status:'aktif',
    name:'Kuban Kuruyemiş', loc:'Hatay', hours:'09:00 – 22:00',
    ig:'https://www.instagram.com/kubankuruyemis/', igHandle:'@kubankuruyemis',
    logo:'img/profiles/kubankuruyemis.jpg',
    followers:'13.000 takipçi', emoji:'🥜',
    about:'Hatay\'ın köklü kuruyemiş ustası Kuban, geleneksel kavurma teknikleri ve özel karışımlarıyla 1 milyon izlenmeye ulaştı. Şehrin lezzet haritasının vazgeçilmezi.',
    reels:[
      {sc:'DOYKtV2jTE4', url:'https://www.instagram.com/reel/DOYKtV2jTE4/', views:'1M',    likes:'4K',  caption:'Reklam Odun ateşinde pişen ballı kajun baharatlı kajuyu @kubankuruyemis\'te denedim, tadı gerçekten', thumb:'img/reels/DOYKtV2jTE4.jpg'},
      {sc:'DVELpx2gotb', url:'https://www.instagram.com/reel/DVELpx2gotb/', views:'580K',  likes:'4K',  caption:'Patron "Her şeyi kafanızı kullanarak yapın" dediğinde biz yanlış anladık sanırım... Ama sonuçlar ort', thumb:'img/reels/DVELpx2gotb.jpg'},
      {sc:'DTNNfbVgmZF', url:'https://www.instagram.com/reel/DTNNfbVgmZF/', views:'162K',  likes:'999', caption:'Kaliteye ulaşmak hiç bu kadar keyifli olmamıştı! ☕️✨ Kuban kalitesini bilenler bilir; o eşsiz aroma', thumb:'img/reels/DTNNfbVgmZF.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Kuruyemiş',       sub:'Geleneksel Kavurma'},
      {label:'Instagram', val:'@kubankuruyemis', sub:'13.000 takipçi'},
      {label:'En Viral',  val:'1M',              sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',           sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'isteciftlik', cat:'yoresel', catLabel:'Yöresel Lezzetler',
    status:'aktif',
    name:'İste Çiftlik', loc:'Hatay', hours:'10:00 – 22:00',
    ig:'https://www.instagram.com/isteciftlik/', igHandle:'@isteciftlik',
    logo:'img/profiles/isteciftlik.jpg',
    followers:'132.000 takipçi', emoji:'🌿',
    about:'Hatay yöresel lezzetlerini çiftlikten sofranıza taşıyan İste Çiftlik, 7.5 milyon izlenmeyle viral oldu. 132 bin takipçisiyle Hatay\'ın doğal ve organik mutfağının en büyük temsilcisi.',
    reels:[
      {sc:'DVODayZiMR1', url:'https://www.instagram.com/reel/DVODayZiMR1/', views:'7.5M', likes:'120K', caption:'🍊 Sabırla Gelen Lezzet: Turunç Reçeli Günlerce suda bekleterek acısını aldığımız turunç kabuklarını', thumb:'img/reels/DVODayZiMR1.jpg'},
      {sc:'DUvDpWTiLEr', url:'https://www.instagram.com/reel/DUvDpWTiLEr/', views:'5.5M', likes:'50K',  caption:'Bazı lezzetler vardır, sofraya geldiği an sohbeti güzelleştirir... ✨ İste Çiftlik sosunun o taptaze', thumb:'img/reels/DUvDpWTiLEr.jpg'},
      {sc:'DTC9Z2pCPwG', url:'https://www.instagram.com/reel/DTC9Z2pCPwG/', views:'3.4M', likes:'15K',  caption:'İşte Çiftlik\'te sabırla pişen lezzet: Hurma Reçeli! 🍯✨ Güneşin tadını taşıyan hurmalarımızı tek te', thumb:'img/reels/DTC9Z2pCPwG.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Yöresel Lezzetler', sub:'Çiftlik & Organik'},
      {label:'Instagram', val:'@isteciftlik',       sub:'132.000 takipçi'},
      {label:'En Viral',  val:'7.5M',              sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',             sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong> & <strong>Eser Bilen</strong>'
  },
  {
    id:'sezaiusta', cat:'kebap', catLabel:'Kebapçı',
    status:'aktif',
    name:'Sezai Usta', loc:'Hatay', hours:'11:00 – 23:00',
    ig:'https://www.instagram.com/kebapci.sezaiusta/', igHandle:'@kebapci.sezaiusta',
    logo:'img/profiles/kebapci.sezaiusta.jpg',
    followers:'18.700 takipçi', emoji:'🔥',
    about:'Sezai Usta, geleneksel Hatay kebap geleneğini yaşatan usta bir isim. 18.7 bin takipçisiyle büyüyen topluluğu ve 2.2 milyon izlenmeyle kebap kültürünün en güçlü temsilcilerinden.',
    reels:[
      {sc:'DVnqE1EDWo6', url:'https://www.instagram.com/reel/DVnqE1EDWo6/', views:'2.2M', likes:'22K', caption:'Dışı Susamlı, İçi Kat Kat Lezzet! ✨ Susamın o efsane kokusu, nar gibi kızarmış lavaşla birleşti.', thumb:'img/reels/DVnqE1EDWo6.jpg'},
      {sc:'DVda4LrjXYD', url:'https://www.instagram.com/reel/DVda4LrjXYD/', views:'1.9M', likes:'27K', caption:'Sezai Usta\'da Lezzet Durakları: Çam Fıstıklı Köz Mantar! 🔥 Bazı lezzetler anlatılmaz, tadınca anlaş', thumb:'img/reels/DVda4LrjXYD.jpg'},
      {sc:'DVTH7SZjfd3', url:'https://www.instagram.com/reel/DVTH7SZjfd3/', views:'535K', likes:'3.8K', caption:'Günün en güzel saati, Sezai Usta\'nın Kanat & But tabağıyla buluştuğunuz o andır!', thumb:'img/reels/DVTH7SZjfd3.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Kebapçı',          sub:'Geleneksel Hatay'},
      {label:'Instagram', val:'@sezaiustakebap',  sub:'18.700 takipçi'},
      {label:'En Viral',  val:'2.2M',             sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',            sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'sinanozdemir', cat:'yoresel', catLabel:'Unlu Mamüller',
    status:'aktif',
    coverPos:'center 20%',
    name:'Sinan Özdemir', loc:'Hatay', hours:'07:00 – 21:00',
    ig:'https://www.instagram.com/sinanozdemir023/', igHandle:'@sinanozdemir023',
    logo:'img/profiles/sinanozdemir023.jpg',
    followers:'22.7K takipçi', emoji:'🥐',
    about:'Doğu Unlu Mamülleri\'nin ustası Sinan Özdemir, geleneksel Hatay fırıncılık kültürünü yaşatıyor. Taze unlu mamülleri ve özgün içerikleriyle viral oldu.',
    reels:[
      {sc:'DV817k8jA0t', url:'https://www.instagram.com/reel/DV817k8jA0t/', views:'378K', likes:'', caption:'TÜM HATAY DUYSUN! DOĞU FIRINI BAYRAM BOYUNCA HİZMETİNİZDE.', thumb:'img/reels/DV817k8jA0t.jpg'},
      {sc:'DWB993zjM7X', url:'https://www.instagram.com/reel/DWB993zjM7X/', views:'191K', likes:'', caption:'İyi ki varsınız', thumb:'img/reels/DWB993zjM7X.jpg'},
      {sc:'DWT7ZUXDErw', url:'https://www.instagram.com/reel/DWT7ZUXDErw/', views:'', likes:'', caption:'', thumb:'img/reels/DWT7ZUXDErw.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Unlu Mamüller',    sub:'Doğu Fırını'},
      {label:'Instagram', val:'@sinanozdemir023', sub:'22.700 takipçi'},
      {label:'En Viral',  val:'378K',             sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',            sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'mustadoner', cat:'kebap', catLabel:'Dönerci',
    status:'aktif',
    name:'Musta Döner', loc:'Hatay', hours:'10:00 – 22:00',
    ig:'https://www.instagram.com/mustadoner/', igHandle:'@mustadoner',
    logo:'img/profiles/mustadoner.jpg',
    followers:'11.000 takipçi', emoji:'🥙',
    about:'18.6 milyon izlenmeyle Hatay\'ın en viral döner videosu Musta Döner\'e ait. 11 bin takipçisinin çok ötesinde bir etki yaratan, adından söz ettiren efsanevi bir lezzet durağı.',
    reels:[
      {sc:'DTcneytjb_j', url:'https://www.instagram.com/reel/DTcneytjb_j/', views:'18.6M', likes:'445K', caption:'Lezzet emekle başlar 🔥 Tavuğun seçilmesinden marinasyonuna, şişe dizimden ağır ateşte pişmesine kad', thumb:'img/reels/DTcneytjb_j.jpg'},
      {sc:'DTr-MYvjLSh', url:'https://www.instagram.com/reel/DTr-MYvjLSh/', views:'2M',    likes:'23K',  caption:'Lezzetin temeli doğru marinasyonda başlar 🔥 MUSTA Döner\'de tavuklar özenle seçilir, özel baharatlar', thumb:'img/reels/DTr-MYvjLSh.jpg'},
      {sc:'DTzmvK5jOsz', url:'https://www.instagram.com/reel/DTzmvK5jOsz/', views:'1.6M',  likes:'12K',  caption:'Hazır değil, ev yapımı lezzet 🔥🍟 MUSTA Döner\'de patatesler soyulur, doğranır, başından sonuna mutf', thumb:'img/reels/DTzmvK5jOsz.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Dönerci',    sub:'Hatay Usulü'},
      {label:'Instagram', val:'@mustadoner',sub:'11.000 takipçi'},
      {label:'En Viral',  val:'18.6M',      sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',      sub:'Türkiye'},
    ],
    hsi:'HSİ Medya\'nın en viral içeriği — <strong>Hatay Mekanları</strong> & <strong>Hatay Sandık İçi</strong>'
  },

  {
    id:'egebufe', cat:'kafe', catLabel:'Büfe & Atıştırmalık',
    status:'aktif',
    coverPos:'center 30%',
    name:'Ege Büfe', loc:'Hatay', hours:'09:00 – 24:00',
    ig:'https://www.instagram.com/egebufee/', igHandle:'@egebufee',
    logo:'img/profiles/egebufee.jpg', emoji:'🥤',
    followers:'1.418 takipçi',
    about:'Hatay\'ın taze meyve suları ve el yapımı büfe lezzetleriyle öne çıkan Ege Büfe, kısa sürede viral içerikleriyle dikkat çekti. Renkli sunumları ve özgün tarifleriyle şehrin yeni gözdesi.',
    reels:[
      {sc:'DWbEbIKDG1J', url:'https://www.instagram.com/reel/DWbEbIKDG1J/', views:'342K', likes:'', caption:'', thumb:''},
      {sc:'DWRMIALDHCa', url:'https://www.instagram.com/reel/DWRMIALDHCa/', views:'100K', likes:'', caption:'', thumb:''},
      {sc:'DWOmkshjMPY', url:'https://www.instagram.com/reel/DWOmkshjMPY/', views:'81K',  likes:'', caption:'', thumb:''},
    ],
    infos:[
      {label:'Kategori',  val:'Büfe & Atıştırmalık', sub:'Taze & El Yapımı'},
      {label:'Instagram', val:'@egebufee',            sub:'1.418 takipçi'},
      {label:'En Viral',  val:'342K',                 sub:'Görüntüleme'},
      {label:'Konum',     val:'Hatay',                sub:'Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },

  // ── YAKINDA ── status:'yakinda' → aktif yapmak için sadece bu satırı değiştir
  {
    id:'senoz', cat:'yoresel', catLabel:'Hatay Mutfağı',
    status:'yakinda',
    name:'Şenöz', loc:'Hatay',
    ig:'#', igHandle:'—',
    logo:null, emoji:'🫕',
    reels:[], infos:[],
    about:'', hsi:'', hours:'', followers:''
  },
  {
    id:'ysantiochia', cat:'kebap', catLabel:'Döner',
    status:'aktif',
    name:'Ysantiochia', loc:'Antakya, Hatay', hours:'11:00 – 23:00',
    ig:'https://www.instagram.com/ysantiochia/', igHandle:'@ysantiochia',
    logo:'img/profiles/ysantiochia.jpg', emoji:'🥙',
    followers:'',
    about:'Antakya\'nın kadim adını taşıyan Ysantiochia, tarihi şehrin ruhunu modern bir döner deneyimiyle buluşturuyor. Özgün tarifleri ve samimi atmosferiyle Hatay mutfak sahnesinin yeni ismi.',
    reels:[
      {sc:'DWlYEmTjFHG', url:'https://www.instagram.com/reel/DWlYEmTjFHG/', views:'',      likes:'', caption:'', thumb:''},
      {sc:'DWbW18hDBk1', url:'https://www.instagram.com/p/DWbW18hDBk1/',    views:'37.7K', likes:'', caption:'', thumb:''},
      {sc:'DWvyku5DHjK', url:'https://www.instagram.com/reel/DWvyku5DHjK/', views:'',     likes:'', caption:'', thumb:'img/reels/DWvyku5DHjK.jpg'},
    ],
    infos:[
      {label:'Kategori',  val:'Döner',         sub:'Hatay Usulü'},
      {label:'Instagram', val:'@ysantiochia',  sub:'takipçi'},
      {label:'En Viral',  val:'37.7K',          sub:'Görüntüleme'},
      {label:'Konum',     val:'Antakya',        sub:'Hatay, Türkiye'},
    ],
    hsi:'HSİ Medya partneri — <strong>Hatay Mekanları</strong>'
  },
  {
    id:'saudadearsuz', cat:'kafe', catLabel:'Kafe & Brunch',
    status:'yakinda',
    name:'Saudade Arsuz', loc:'Arsuz, Hatay',
    ig:'https://www.instagram.com/saudadearsuz/', igHandle:'@saudadearsuz',
    logo:'img/profiles/saudadearsuz.jpg', emoji:'☕',
    reels:[], infos:[],
    about:'', hsi:'', hours:'', followers:''
  },
];

// ── SABİT FİLTRELER ───────────────────────────────────────────────
const AKTIF_MEKANLAR  = MEKANLAR.filter(m => m.status === 'aktif');
const YAKINDA_MEKANLAR = MEKANLAR.filter(m => m.status === 'yakinda');
