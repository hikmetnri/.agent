# 1. ADMIN PANELİ

## 1.1 Navigasyon
- [x][F] [x][R] Sol sidebar navigasyon (web'de bottom nav yerine)
   - Ana Sayfa (Akış + Destek)
   - İçerik (Kategoriler + Sorular + Sözler)
   - Sınavlar
   - İstatistik
   - Hesap / Admin Araçları
- [x][F] [-][R] Flutter admin alt navigasyonda `Profil` etiketi `Hesap` olarak netleştirildi; hesap ekranındaki `Yönetim Merkezi` bölümü `Admin Araçları` diline çekildi

---

## 1.2 Ana Sayfa (Dashboard)

### İstatistikler ve Grafikler
- [x][F] [x][R] Flutter ile eşleşen 4 kompakt ana KPI: Toplam Kullanıcı, PRO Üyeler, Aktif Sınavlar, Soru Bankası
- [x][F] [x][R] Rapor, gönderi onayı ve destek sayaçları ayrı kompakt İşlem Merkezi satırlarında gerçek kuyruk verisiyle gösterilir
- [x][F] [x][R] Dinamik Kayıt Trendi Grafiği (Son 7 Gün - Area Chart)
- [x][F] [x][R] Kategori Başarı Oranları (Bar Chart)
- [x][F] [x][R] Web dashboard yükleme skeleton'u, kısmi API hata bandı + tekrar dene ve grafik boş durumlarını destekler

### Kısayollar ve Araçlar
- [x][F] [x][R] Hızlı İşlem Butonları (Sınav Ekle, Duyuru Gönder, Ayarlar)
- [x][F] [x][R] Hızlı Not Defteri (Admin içi lokal kayıtlı mini notlar)
- [x][F] [x][R] Sistem Aktiviteleri Zaman Çizelgesi (Loglar - Timeline)
- [x][F] [-][R] Flutter admin hesap/profil header'ı kompaktlaştırıldı; admin araç kartları daha sıkı iki sütunlu satır düzenine yaklaştırıldı
- [x][F] [x][R] Web admin dashboard Flutter tasarım tokenlarına (`#080D18`, `#101725`, `#243044`, mor/cyan/amber vurgu) geçirildi; mobilde beşli alt navigasyon, masaüstünde sidebar kullanır
- [x][F] [x][R] Dashboard hızlı aksiyonları Kullanıcılar, Sınavlar, Analitik, Duyuru, Abonelik ve Reklamlar olarak 3/6 kolon responsive düzende eşitlendi
- [x][F] [x][R] Web'e özgü hızlı moderasyon, lokal not ve işlem geçmişi ana mobil akışı bozmayan açılır detay alanında korunur

### Hızlı Aksiyon Kutuları (Quick Actions)
- [x][F] [x][R] Bekleyen Gönderiler (Hızlı onay/reddet butonları)
- [x][F] [x][R] Destek Talepleri özeti (Okundu/Yeni/Yanıtlandı/Kapatıldı durumu)
- [x][F] [x][R] Destek mesajlaşmasında kullanıcıdan gelen yeni talep ve yanıtlar adminlere in-app + FCM push olarak gider
- [x][F] [-][R] Flutter destek merkezi yanıt bekleyen/açık talep sayısını başlıkta daha net gösterir; destek kartları daha kompakt ve mobil taşmaya dayanıklı hale getirildi
- [x][F] [x][R] Destek merkezi web admin: header'a yeni/toplam sayaç kartları, chat balonları yeniden tasarlandı, yeniden açma butonu ve silme özelliği eklendi
- [x][F] [x][R] Şikayetler/Raporlar özeti (Hızlı kapatma eylemi)
- [x][F] [x][R] Her panel için "Tümü" kısayol navigasyonu

---

## 1.3 İçerik Yönetimi

### Kategoriler
- [x][F] [x][R] Kategori listesi (Tree View yapısı)
- [x][F] [x][R] İş Makinesi kökü altında operatörlük kitabına göre 8 ana konu ve 39 alt
  konu veritabanına idempotent seed ile eklendi; mevcut ağaç kalıcı işlem öncesi yedeklenir
- [x][F] [-][R] Flutter içerik yönetimi üst tabları ikonlu, kısa ve yatay kaydırılabilir hale getirildi: Kategori, Soru, Söz, Video
- [x][F] [-][R] Flutter kategori yönetimine `Kategori Ağacı` özet kartı, boş durumda ilk kategori CTA'sı, uzun isim ellipsis'i ve `PRO`/`İçerik var` rozetleri eklendi
- [x][F] [x][R] Sürükle-bırak sıralama (Framer Motion Reorder)
- [x][F] [x][R] Ana kategoriler (ehliyet türleri: A, B, C...)
- [x][F] [x][R] Alt kategori ekleme
- [x][F] [x][R] Her kategori: isim, renk seçici, ikon seçici, Pro toggle
- [x][F] [x][R] Markdown içerik editörü (H1/H2/H3 toolbar, kalın/italik, liste, ayraç, kelime sayacı)
- [x][F] [-][R] Flutter içerik editörü uzun kategori adlarında başlık ellipsis'i kullanır; markdown toolbar yatay kaydırılabilir kalır
- [x][F] [x][R] İçerikte görsel/video URL desteği
- [x][F] [x][R] Kaydedilmemiş değişiklik uyarısı
- [-][F] [x][R] Taslak / yayın / sürüm geçmişi akışı: React admin içerik editöründe taslak kaydet, yayınla ve eski yayınlanmış sürümü yükle; Flutter admin için kapsam dışı bırakıldı, içerik yayın akışı web adminden yönetilecek; backend public kategori endpointleri taslak kayıtları göstermez
- [x][F] [x][R] Düzenle / Sil

### Sorular — Kısa Testler
- [x][F] [x][R] 3 seviyeli accordion: Ana kategori → Alt kategori → Konu
- [x][F] [ ][R] Kısa test ayrı `Exam` kaydı değildir; aynı yaprak konu altındaki
  `short_test` soruları o konunun tek pekiştirme testini oluşturur
- [x][F] [ ][R] B Sınıfı / İş Makinesi segmenti konu listesini seçilen eğitim
  köküyle sınırlar; iki eğitim ağacının başlıkları birbirine karışmaz
- [x][F] [ ][R] Yaprak konu başlığında bağlı kısa test soru sayısı gösterilir;
  konu ağacından hangi testin hazır/eksik olduğu saymadan anlaşılır
- [x][F] [ ][R] Kısa test soru sayısında 8/10 üst sınırı yoktur; trafik levhaları
  gibi uzun konular gerçek soru sayısıyla listelenir
- [x][F] [-][R] Flutter soru yönetimi alt tabları emoji yerine ikonlu kısa etiketlere çekildi; kontrol satırı küçük ekranda wrap davranışı kazanır
- [x][F] [-][R] Flutter soru kartları kompakt aksiyon satırlı düzene alındı; doğru/yanlış/başarı rozetleri kısa etiketlerle taşmasız gösterilir
- [x][F] [x][R] Her konunun altında soru listesi
- [x][F] [x][R] Soru arama (metin bazlı)
- [x][F] [x][R] Her soru: metin, şıklar (A/B/C/D), doğru cevap, açıklama, görsel URL
- [x][F] [x][R] "Bu Kategoriye Soru Ekle" butonu
- [x][F] [x][R] Ekle / Düzenle / Sil

### Sorular — Sınav Soruları
- [x][F] [x][R] Sınav bazlı accordion (her sınav bir grup)
- [x][F] [x][R] Sınav başlığında: kategori adı, soru sayısı, süre, düzenle/sil
- [x][F] [x][R] Her sınavın altında soru listesi + "Bu Sınava Soru Ekle"
- [x][F] [x][R] Sınav oluştur: başlık, açıklama, süre (dk), kategori, Pro toggle
- [x][F] [x][R] CSV import ile toplu soru ekleme
- [x][F] [x][R] Sınav atanmamış sorular ayrı grupta
- [x][F] [x][R] Deneme ve gerçek sınav soruları ayrı `testType` ile tutulur: `mock_exam`, `real_exam` (`exam` legacy fallback)
- [x][F] [x][R] Sınav sorularında konu ayrımı zorunlu veri alanı olarak kullanılır: `trafik`, `ilkyardim`, `motor`, `adabi`
- [x][F] [ ][R] Denemede önce sınav oluşturulur, sonra soru/CSV seçilen `examId`
  kaydına bağlanır; sınav seçmeden soru kaydedilemez
- [x][F] [ ][R] Sınav kartında toplam soruya ek olarak branş başına bağlı soru
  sayısı gösterilir ve ekleme/silme sonrası yeniden hesaplanır
- [x][F] [ ][R] Soru formundaki branş seçenekleri B Sınıfı ve İş Makinesi için
  dinamik sözlükten gelir; İş Makinesi seçiliyken B Sınıfı etiketi gösterilmez
- [x][F] [ ][R] Sınav soru yönetimi uzun başlıkta ellipsis ve ayrılmış aksiyon
  alanı kullanır; CSV/yenile/sıralama kontrolleri dar ekranda taşmaz

### Sözler (Motivasyon)
- [x][F] [x][R] Söz listesi: yazar + söz metni
- [x][F] [x][R] Aktif / Pasif toggle
- [x][F] [x][R] Söz metni ekleme/düzenleme alanı 350 karakterle sınırlandı; liste ve dashboard eski uzun kayıtları da 350 karaktere kırparak gösterir
- [x][F] [-][R] Flutter söz yönetiminde ekleme/düzenleme modalı klavye ve küçük ekran yüksekliğine karşı scroll güvenli; liste aksiyonları Wrap ile taşmasızdır
- [x][F] [x][R] Ekle / Düzenle / Sil

### Videolar
- [x][F] [x][R] İçerik yönetimine "Videolar" sekmesi eklendi; Kategoriler, Sorular ve Sözler sekmeleriyle aynı içerik modülünde yer alır
- [x][F] [x][R] Video kategorisi oluşturma/düzenleme/silme: kategori adı, açıklama ve PRO toggle desteklenir
- [x][F] [x][R] Video ekleme/düzenleme/silme: başlık, açıklama, kategori seçimi, online video bağlantısı/URL, notlar ve PRO toggle desteklenir
- [x][F] [x][R] Video listesi kategoriye göre gruplanır; kategori oluşturulmadıysa/kategori seçilmediyse videolar "Kategorisiz" altında gösterilir
- [x][F] [x][R] Doğrudan oynatılabilir video linkleri uygulama içinde açılır; YouTube/Vimeo gibi harici bağlantılar dış uygulama/tarayıcı ile açılır

---

## 1.4 Sınav Yönetimi
- [x][F] [ ][R] Kesin React web bilgi mimarisi: ayrı İçerik alanı kullanılmadan
  Kısa Test, Deneme ve Gerçek Sınav tek `Sınav Yönetimi` route'unda üç alt
  görünüm/sekme olarak yönetilecek
- [x][F] [ ][R] React mobil admin Sınav Yönetimi; Flutter'daki segment, kart,
  sayaç, form, modal ve responsive taşma davranışını birebir referans alacak;
  masaüstü aynı veriyi geniş grid/tablo düzeninde gösterebilecek
- [x][F] [x][R] Sınav listesi
- [x][F] [x][R] Deneme sınavları ve gerçek sınavlar admin arayüzünde ayrı yönetilir; `mock_exam` ve `real_exam` `testType` değerleri korunur
- [x][F] [x][R] Sınav Yönetimi yalnızca `real_exam` oluşturur; `mock_exam` İçerik > Deneme, `short_test` İçerik > Kısa Test altında yönetilir
- [x][F] [x][R] Sınav oluşturma ve liste filtreleri yalnızca B Sınıfı ile İş Makinesi/Operatör/İSG köklerini gösterir
- [x][F] [x][R] Soru branşları seçilen sınav sınıfına göre dinamik değişir:
  B Sınıfı `trafik|ilkyardim|motor|adabi`; İş Makinesi
  `operator_isg|operator_machines|operator_transport|operator_ethics`
- [x][F] [x][R] Web Sınav Merkezi B Sınıfı / İş Makinesi segmentleri, kategoriye özel sınav sayaçları ve dinamik branş dağılım kartları kullanır
- [x][F] [-][R] Flutter admin sınav ekranı modern yönetim görünümüne çekildi: kompakt arama/filtre, özet kartları, inline soru yönetimi, düzenle/sil aksiyonları
- [x][F] [-][R] Flutter sınav yönetimi başlığı, branş dağılımı ve aksiyon satırları küçük ekranda taşma riskine karşı sıkılaştırıldı
- [x][F] [x][R] Yeni sınav oluştur: isim, süre, kategori, Pro toggle
- [x][F] [ ][R] Gerçek sınav oluştururken B Sınıfı süre varsayılanı 45 dakika,
  İş Makinesi süre varsayılanı 50 dakikadır; süre 1–180, geçme notu 0–100 doğrulanır
- [x][F] [ ][R] Gerçek sınav kartı kayıttaki gerçek süreyi, geçme notunu ve
  branş dağılımını gösterir; sabit 45 dakika/50 soru varsayımı yapmaz
- [x][F] [ ][R] Aktif kategorisi veya aktif sorusu olmayan sınav yayınlanamaz;
  soru türü bağlı sınavın `testType` değeriyle eşleşmek zorundadır
- [x][F] [x][R] Sınava soru ekle/çıkar
- [x][F] [x][R] Sınav sonuçlarını görüntüle
- [x][F] [ ][R] Sınav yayınlandığında uygulama içi bildirim + FCM öncelikle
  sınavın kategorisini seçmiş aktif kullanıcılara gönderilir; kategori tercihi boş
  eski kullanıcılar geriye uyumluluk için hedeflenebilir
- [x][F] [ ][R] Sınav silme fiziksel silme yapmaz; sınavı ve bağlı aktif soruları
  pasife alarak geçmiş sonuçların referansını korur
- [x][F] [x][R] Sınav bildirimi gönderiminde geçersiz FCM token'lar otomatik temizlenir
- [x][F] [x][R] Bildirim gönder (Duyuru modülü üzerinden)

Sınav sisteminin tam Flutter davranış ve React aktarım sözleşmesi:
`exam-system-flutter-reference-2026-08-04.md`.

---

## 1.5 İstatistik

### Platform Sekmesi
- [x][F] [x][R] Toplam kullanıcı sayısı
- [x][F] [x][R] Aktif kullanıcı (bugün giriş yapan)
- [x][F] [x][R] Toplam soru çözümü
- [x][F] [x][R] Genel başarı oranı (%)
- [x][F] [x][R] Premium (Pro) üye sayısı
- [x][F] [x][R] Yeni kayıtlar (bu hafta)
- [x][F] [x][R] Günlük hedef dağılımı grafiği
- [x][F] [x][R] Bildirim saat analizi grafiği
- [x][F] [x][R] Bildirim açık/kapalı kullanıcı sayısı
- [-][F] [x][R] Sabit QR tıklanma istatistikleri: toplam, son tıklama ve günlük grafik
- [x][F] [x][R] Dönüşüm hunisi: kayıt, kategori seçimi, ilk test, yanlış havuzu, yanlış tekrar, PRO
- [x][F] [x][R] Kullanıcı yolculuğu trendi: günlük kayıt, ilk test ve yanlış tekrar hareketi
- [x][F] [x][R] Aksiyon segmentleri: kategori seçmeyen, kategori seçip test çözmeyen, yanlışı olup tekrar çözmeyen, aktif Free PRO adayları
- [x][F] [x][R] Son kayıtların yolculuk listesi: kategori, test sayısı, due yanlış, tekrar sayısı ve durum etiketi
- [x][F] [x][R] Tarih ve kaynak filtresi: 7/30/90 gün ve acquisition source kırılımı
- [x][F] [x][R] Kampanya altyapısı: `utm_source` filtreye, `utm_campaign/medium/content` event metadata'sına yazılır
- [x][F] [x][R] Event bazlı huni: kayıt, kategori, ilk test, yanlış tekrar, paywall, PRO tıklama ve satın alma
- [x][F] [x][R] Kaynak performansı: kaynağa göre kayıt, ilk test, PRO ve aktivasyon oranı
- [x][F] [x][R] Kohort aktivasyonu: kayıt gününe göre ilk test ve yanlış tekrar geçişi
- [x][F] [x][R] Bildirim ve paywall etkisi: kampanya, in-app/push, açılma, paywall görme/tıklama/satın alma
- [x][F] [x][R] Riskli kullanıcılar ve kullanıcı timeline modalı
- [x][F] [x][R] İstatistik sayfası sekmeli yapıya ayrıldı: Genel, Yolculuk, Etkileşim, Konu, Zorluk, Rozetler
- [x][F] [x][R] Kullanıcı timeline modalı eski event kaydı olmayan kullanıcılar için kayıt/test/yanlış tekrar geçmişini backend verisinden "Geçmiş veri" olarak gösterir
- [x][F] [x][R] Timeline detayları JSON yerine okunur metin ve etiketlerle gösterilir: kategori, test, puan, doğru/yanlış, süre, durum, tekrar sonucu
- [x][F] [-][R] Flutter istatistik sayfası modern bölüm rayına taşındı: Genel, Yolculuk, Etkileşim, Konu, Zorluk, Rozetler kartları
- [x][F] [-][R] Flutter admin istatistik bölüm rayı, yolculuk/kampanya filtre barı ve KPI kartları küçük ekran taşmasına karşı kompaktlaştırıldı
- [x][F] [-][R] Flutter Genel istatistik sekmesinde karar/komuta özeti eklendi: aktiflik, PRO oranı, bildirim, yeni üye sinyalleri

### Konu Sekmesi
- [x][F] [x][R] Kategori bazlı başarı oranları

### Zorluk Sekmesi
- [x][F] [x][R] En çok yanlış yapılan sorular

### Rozetler Sekmesi
- [x][F] [x][R] Rozet listesi
- [x][F] [x][R] Ekle / Düzenle / Sil / Dinamik İkon Seçici (Award, Trophy vb.)
- [x][F] [x][R] Rozet kazanım kriterleri admin panelinden yönetilir: `exam_count`, `question_count`, `correct_count`, `streak`, `daily_goal`, `success_rate`
- [x][F] [x][R] Rozet kartlarında hedef değeri ve rozeti kazanan kullanıcı sayısı (`earnedCount`) gösterilir
- [x][F] [x][R] "Kimlerin Aldığını Gör" aksiyonu ile rozeti kazanan kullanıcılar modalda ad, e-posta ve kazanım tarihiyle listelenir
- [x][F] [x][R] Flutter admin rozet yönetimi React web ile aynı kazanım görünürlüğünü kullanır: satırda `earnedCount`, tıklanınca `/badges/:id/earned-users` modalı
- [-][F] [x][R] Web admin rozet sayfası: arama kutusu, refresh butonu, boş durum ekranı ve glow efektli kart tasarımı eklendi; oluşturma/düzenleme modalı grid layout'a taşındı
- [-][F] [x][R] Web admin rozet sayfası tam yeniden tasarım (2026-07-04): `AdminBadges.jsx` ~654 satıra yeniden yazıldı; rozet listesi, oluşturma/düzenleme/silme modal akışları modernize edildi.

---

## 1.6 Profil / Yönetim Merkezi

### Profil Bilgileri
- [x][F] [x][R] Avatar yükleme (Edit Profile)
- [x][F] [x][R] Ad, soyad, e-posta, telefon
- [x][F] [x][R] Şifre değiştirme — şifre güç göstergesi (StrengthBar) ve göster/gizle toggle eklendi
- [x][F] [x][R] Profil düzenleme

### Kullanıcı Yönetimi
- [x][F] [x][R] Özet kartlar: Toplam, Admin, Pro sayısı, askıdaki kullanıcı sayısı
- [x][F] [x][R] Kullanıcı listesi sunucu tabanlı sayfalama kullanır (Flutter varsayılan 20, React varsayılan 50)
- [x][F] [x][R] Arama: ad, soyad, e-posta
- [x][F] [x][R] Filtre: Tümü / Kullanıcı / Admin / Pro / Aktif / Askıda / Online
- [x][F] [x][R] Sıralama: en yeni, son aktif, alfabetik, puan, seviye, PRO, admin, askıda, online
- [x][F] [x][R] Kullanıcı kartı: avatar, isim, e-posta, level, puan, son aktif, online badge
- [x][F] [x][R] Detay modal: bilgiler, istatistikler, rol değiştir, Pro ver/kaldır, askıya al/aktif et, sil
- [x][F] [x][R] Kullanıcı detayındaki son sınav sonuçları `score` alanını ondalıklı sayılara duyarlı okur; eski kayıtlar için `correctCount` / `correctAnswers` fallback'i vardır
- [x][F] [x][R] Kullanıcı özellerine bildirim gönderme (Tekli ve Çoklu Seçim)
- [x][F] [ ][R] Flutter kullanıcı listesi server-side `page/limit/search/filter/sort` kullanır; global sayaçlar API `summary` alanından gelir ve geç dönen arama istekleri yeni sonucu ezmez
- [x][F] [ ][R] Adminin kendi admin rolünü kaldırması backend tarafından engellenir

### Rapor Yönetimi
- [x][F] [x][R] Şikayet edilen içerikler listesi
- [x][F] [x][R] Her rapor: şikayet eden, içerik, sebep, tarih
- [x][F] [x][R] İçeriği görüntüle / sil, raporu kapat
- [x][F] [x][R] Filtre: açık / çözüldü / reddedildi
- [x][F] [ ][R] Rapor hedefi soru veya gönderi olabilir (`targetType: question|post`); soru düzenleme ve gönderiyi görüntüleme/silme aksiyonları hedefe göre ayrılır
- [x][F] [-][R] Flutter rapor ekranı özet strip + segment filtre + taşma güvenli pill yapısına taşındı
- [x][F] [x][R] Web admin rapor ekranı sayaç kartları (açık/çözüldü/toplam), raporlayan e-posta ve tarih gösterimi, hedef tipi renk kodlaması eklendi
- [-][F] [x][R] Web admin rapor ekranı tam yeniden tasarım (2026-07-04): `AdminReports.jsx` ~525 satıra yeniden yazıldı; filtre, sayaç ve içerik akışı modernize edildi.

### Akış (Feed) Yönetimi
- [-][F] [x][R] Web admin akış ekranı: bekleyen/onaylı/reddedilen sayaç kartları, gönderi listesinde beğeni+yorum sayaçları, ek görsel gösterimi, inline action bar iyileştirildi
- [-][F] [x][R] Web admin akış ekranı tam yeniden tasarım (2026-07-04): `AdminFeed.jsx` ~535 satıra yeniden yazıldı.

### Bildirim Yönetimi (Broadcast)
- [x][F] [x][R] Hedef kitle: Herkes / Pro Üyeler / Ücretsiz / Seçili Kişiler
- [x][F] [ ][R] Flutter hedef kitleye `İlk sınavını bekleyenler` segmenti eklendi; `all|pro|free|waiting_first_test` sayıları backend `audience` alanından okunur
- [x][F] [ ][R] Broadcast normal kullanıcı ve aktif hesaplarla sınırlıdır; admin ve askıdaki hesaplar hedeflenmez
- [x][F] [x][R] Form: başlık + mesaj + görsel URL
- [-][F] [x][R] Web admin bildirim ekranı: hedef kitle seçimi grid layout'a taşındı, dinleyici sayacı eklendi, geçmiş tabloları kompaktlaştırıldı
- [-][F] [x][R] Web admin bildirim ekranı bağımsız sayfa olarak ayrıldı (2026-07-04): `AdminNotifications.jsx` ~506 satır yeni dosya olarak oluşturuldu; `AdminSettings.jsx`'ten taşındı, sol sidebar menüsüne bağımsız link eklendi.
- [x][F] [-][R] Flutter duyuru oluşturma formunda gönderim aksiyonu tam genişlik butona taşındı; küçük ekran taşmaları azaltıldı
- [x][F] [-][R] Flutter duyuru hedef kitle seçimi kompakt segmente çekildi; duyuru geçmişi uzun başlık/gövde için ellipsis kullanır
- [x][F] [x][R] Duyuru geçmişi: başlık, hedef, kaç kişi, tarih, sil
- [x][F] [x][R] Broadcast gönderimi hem uygulama içi bildirim oluşturur hem FCM push yollar
- [x][F] [x][R] Gönderim sonucu: toplam kullanıcı, token sayısı, başarılı push sayısı ve push uyarısı admin panelinde gösterilir
- [x][F] [x][R] Bildirim tipleri: `broadcast`, `targeted`, `system`, `exam`, `alert`, `chat_message`
- [x][F] [x][R] FCM token debug endpoint'i ile token istatistikleri kontrol edilebilir
- [x][F] [x][R] Gizlilik politikası ve KVKK metinleri Markdown/GFM olarak kaydedilip public sayfada Markdown renderer ile gösterilir
- [-][F] [x][R] Admin web sol sidebar menüsüne Bildirim Yönetimi bağlantısı eklendi; ayarlar altındaki gizli sayfadan bağımsız menü öğesine taşındı
- [x][F] [ ][R] Güncel broadcast sonucu `sentCount`, `tokenCount`, `pushSent`, `errorDetails` alanlarıyla gösterilir; React webdeki legacy `totalUsers/tokensFound/successCount` okuması güncellenmelidir

### Abonelik Yönetimi
- [x][F] [x][R] Abonelik satış durumu admin pazarlama ekranından açılıp kapatılabilir; mobil uygulamadaki PRO satış ekranı ve plan görünürlüğünü etkiler
- [x][F] [x][R] Satın alma doğrulaması aktif/pasif durumu admin ekranında bilgilendirme olarak gösterilir
- [x][F] [ ][R] Plan yönetimi: Haftalık / 2 Haftalık / Aylık / Yıllık plan oluşturma ve düzenleme
- [ ][F] [ ][R] Aktif kullanıcı abonelikleri listesi (şimdilik kapsam dışı)
- [x][F] [x][R] Kupon yönetimi: kupon oluşturma (kod, % veya ₺ indirim, kullanım limiti, kullanıcı başına limit, son tarih, açıklama), düzenleme, aktif/pasif toggle, silme ve kullanım istatistikleri (`usedCount` gösterimi). `GET/POST/PUT/DELETE /api/subscriptions/coupons` endpoint'leri kullanılır.
- [x][F] [ ][R] Flutter abonelik satış ayarı, plan ve kupon listeleri yükleme hatasını boş liste gibi göstermez; her bölüm ayrı hata ve tekrar dene durumu kullanır
- ⚠️ Plan, satış ekranı ve kupon yönetimi aktiftir; kullanıcı bazlı aktif abonelik listesi henüz uygulanmamıştır.

### Profil Bilgileri (güncelleme 2026-07-04)
- [-][F] [x][R] `AdminProfile.jsx` tam yeniden tasarım (2026-07-04): ~436 satıra yeniden yazıldı; profil düzenleme, şifre değiştirme ve avatar yükleme akışları modernize edildi.

### Reklam ve Pazarlama Yönetimi
- [x][F] [x][R] Google AdMob Reklam Yönetimi (Banner / Interstitial / Rewarded)
- [x][F] [x][R] Reklamlar Aktif/Pasif toggle, reklam birim ID yönetimi
- [x][F] [x][R] QR Kod Oluşturucu: sabit takip URL'si ile Play Store yönlendirme, indirme ve tarama sayımı
- [x][F] [ ][R] Flutter reklam yönetimi aktif reklam türünde birim ID zorunlu tutar; backend kaydı başarısızsa yerel ayarı yazmaz ve yanlış başarı mesajı göstermez
- [x][F] [ ][R] Flutter reklam config ve QR istatistik yükleme hataları görünür tekrar dene durumuna sahiptir
- [-][F] [x][R] Pazarlama ekranı AdMob bilgilerini veritabanındaki `ad_config` kaydından okur ve günceller
- [-][F] [x][R] Pazarlama ekranı bağımsız sayfa olarak ayrıldı (2026-07-04): `AdminMarketing.jsx` ~411 satır yeni dosya olarak oluşturuldu; `AdminSettings.jsx`'ten taşındı.

### Sürücü Kursları ve Başvurular Yönetimi
- [-][F] [x][R] Admin Panelinde Sürücü Kursları sekmesi: tüm kursları listeleme, ekleme, düzenleme, silme ve aktif/pasif yapma.
- [-][F] [x][R] Sponsor Yönetimi: şehir bazlı sponsor ekleme, süre belirleme (başlangıç/bitiş), sponsor notu/etiketi düzenleme ve süre dolunca otomatik pasifleşme entegrasyonu.
- [-][F] [x][R] Başvuru Yönetimi: gelen tüm kayıt başvurularını listeleme, arama (`q`), durum filtresi (`pending|contacted|cancelled`), durum güncelleme ve başvuru silme.
- [-][F] [x][R] E-posta Entegrasyonu: başvuru e-posta adresini (`contact_email`) dinamik ayarlama ve başvurunun ilgili sürücü kursunun mail adresine de iletilmesi.
- [-][F] [x][R] Web admin sürücü kursları sayfası header'ına toplam/aktif/sponsorlu/şehir sayaç kartları eklendi; header section wrapper ile tutarlı hale getirildi

### Destek Yönetimi (güncelleme 2026-07-04)
- [-][F] [x][R] Web admin destek ekranı tam yeniden tasarım (2026-07-04): `AdminSupport.jsx` ~559 satıra yeniden yazıldı; chat UI, yeniden açma butonu ve silme özelliği modernize edildi.
- [x][F] [ ][R] Flutter destek ekranı `data` response alanını kullanır; yeni/açık/kapalı sayaçları, arama/filtre, konuşma sheet'i, admin cevabı, kapat ve yeniden aç akışları tamamlandı

### Sistem Araçları
- [x][F] [x][R] İşlem günlükleri (Admin Dashboard özetleri)
- [x][F] [x][R] İşlem günlükleri ikinci sekmesi gerçek crash log değil, `ExamResult.score < 50` kayıtlarından oluşan "Düşük Skorlar" listesidir
- [x][F] [x][R] Bakım modu toggle
- [x][F] [x][R] Bakım modu durumu hem `isMaintenance` hem `enabled` alanlarıyla okunur; admin bakım modunda panele erişmeye devam eder
- [x][F] [x][R] Veri yedekleme (JSON export)

---

## Backend Güvenlik ve Altyapı Güncellemeleri (2026-07-04)

### Güvenlik (c5fc187)
- [x][F] [x][R] `app.js`: Helmet güvenlik başlıkları, rate limiting, compression middleware, CORS iyileştirmeleri ve payload boyut sınırı eklendi
- [x][F] [x][R] `auth.js` middleware: `TokenExpiredError` için özel hata mesajı, opsiyonel koruma modu eklendi
- [x][F] [x][R] `userController.js`: rol/pro/durum toggle regex injection koruması eklendi

### Controller Güncellemeleri (c5fc187)
- [x][F] [x][R] `authController.js`: profil güncelleme, şifre değiştirme, avatar yükleme ve hesap silme güçlendirildi
- [x][F] [x][R] `examResultController.js`: skor normalizasyonu, kategori bazlı istatistikler ve liderboard güncellendi
- [x][F] [x][R] `postController.js`: gövde doğrulama, etiket limitleri ve yorum bildirimleri eklendi
- [x][F] [x][R] `notificationController.js`: broadcast geçmişi ve FCM push entegrasyonu genişletildi
- [x][F] [x][R] `adminController.js`: bakım modu, log, yedekleme ve ayarlar endpoint'leri güncellendi
- [x][F] [x][R] `subscriptionController.js`: kupon + plan yönetimi endpoint'leri genişletildi
- [x][F] [x][R] `rewardController.js`: reklam ödül sistemi güncellendi
- [x][F] [x][R] `examController.js`: soru yönetimi ve sınav güvenlik kontrolleri güncellendi
- [x][F] [x][R] `questionController.js`: soru doğrulama ve aktiflik kontrolleri güçlendirildi
- [x][F] [x][R] `badgeAwardService.js`: rozet kazanım kriteri kontrolleri (`exam_count`, `question_count`, `correct_count`, `streak`, `daily_goal`, `success_rate`) genişletildi
