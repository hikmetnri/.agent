# 3. DİĞER ÖZELLİKLER VE TEKNİK DETAYLAR

## 3.1 Ekstra Özellikler

### Trafik İşaretleri Kütüphanesi
- [x][F] [x][R] Kategorize edilmiş trafik işaretleri listesi
- [x][F] [x][R] Trafik levhaları Cloudinary `trafik-levhalari/...` klasöründen `f_auto,q_auto` ile yüklenir; Flutter `assets/images/signs/...` path'lerini resolver ile remote URL'ye çevirir, React web `resolveMediaUrl` ile Cloudinary kullanır
- [x][F] [x][R] Levha kütüphanesi seçili eğitim kategorisine göre değişir: B sınıfı / trafik kategorileri trafik levhalarını, iş makinesi / operatör / İSG / G sınıfı kategorileri `isg/...` iş sağlığı levhalarını gösterir
- [x][F] [x][R] İSG / iş makinesi levhaları Türkçe kategori ve başlıklarla listelenir; Flutter tarafında SVG dosyaları Cloudinary dönüşümüyle PNG olarak görüntülenir
- [x][F] [x][R] Web landing sayfasında levhalar giriş istemeden iki ana kaynak olarak listelenir: Trafik Levhaları ve İş Sağlığı / İş Makinesi Levhaları

### Kullanıcı Profil ve Kategori Yönetimi
- [x][F] [x][R] Kullanıcı ana sayfa / profil alanında seçili eğitim paketi görünür; PC web görünümünde kategori değiştirme butonu modal kategori seçimini tekrar açar
- [x][F] [x][R] PC web profil/ayarlar ekranı seçili eğitim, üyelik, konum, günlük hedef, sınav tarihi, profil kontrol listesi ve hızlı işlem kartlarıyla zenginleştirildi

### Medya Depolama / Cloudinary
- [x][F] [x][R] Konu görselleri Cloudinary `content/...` klasöründen yüklenir; Flutter paketinden `assets/content/` ve `assets/images/signs/` çıkarıldı, web build `dist/content` ve `dist/images/signs` klasörlerini temizler
- [x][F] [x][R] Yeni medya dosyaları proje asset/public klasörlerine değil `.agent/content/` inbox alanına bırakılır; ajan dosyayı uygun Cloudinary klasörüne yükleyip Flutter ve React resolver/veri akışına bağlar
- [x][F] [x][R] Cloudinary upload scripti backend içinde `scripts/tools/uploadCloudinarySigns.js`; `npm run upload:cloudinary-traffic-signs` trafik levhaları, `npm run upload:cloudinary-isg-signs` İSG/iş makinesi levhaları, `npm run upload:cloudinary-content` konu görselleri için kullanılır
- [x][F] [x][R] Cloudinary klasör hedefleri: trafik levhaları `trafik-levhalari/...`, ISG/iş makinesi levhaları `isg/...`, konu görselleri `content/...`, animasyon dosyaları `animasyonlar/...`; landing/web menülerinde trafik ve ISG iki ana liste kaynağı olarak kullanılacak

### Video Eğitimler
- [x][F] [x][R] Video ders listesi ve detay sayfası (Markdown içinde video desteği mevcut)
- [x][F] [x][R] Flutter video eğitimleri admin paneldeki video kategorilerine göre gruplanır; kullanıcı önce kategori kartlarını, sonra seçili kategori videolarını görür
- [x][F] [x][R] Flutter video detayında doğrudan dosya linkleri (`.mp4`, `.m3u8`, `.mov`, `.m4v`, `.webm`) uygulama içinde oynatılır; YouTube/Vimeo/Google Drive linkleri `webview_flutter` ile uygulama içi embed olarak oynatılır
- [x][F] [x][R] React web video detayında YouTube/Vimeo/Google Drive linkleri `iframe` embed olarak oynatılır; `getEmbedUrl` helper fonksiyonu URL parse işlemi yapar
- [x][F] [x][R] Video kategori kaydı yoksa mevcut/kategorisiz videolar eski davranışla listelenmeye devam eder
- [ ][F] [-][R] Canlı ders entegrasyonu (Kapsam Dışı)

### Pazarlama Araçları
- [x][F] [x][R] Marketing QR kodu oluşturma ve paylaşma
- [ ][F] [ ][R] QR tarama istatistikleri (Gelecek faz)
- [ ][F] [ ][R] Sürücü kursu başvuru/lead sistemi (Gelecek faz; uygulama kullanıcı trafiği artınca değerlendirilecek)

### Sistem Güvenliği ve Bakım
- [x][F] [x][R] Bakım Modu: Admin toggle → kullanıcılar erişemez, bakım mesajı görür
- [x][F] [x][R] Bakım modu API davranışı: `/api/status` public kalır, admin token'ı bakım modunda middleware'den geçer, kullanıcılar 503 + bakım mesajı alır
- [x][F] [-][R] Flutter bakım modu route gate'i: açılışta ve ana kullanıcı route'larında `/status` kontrolü yapılır; admin bakım modundayken panele erişmeye devam eder
- [x][F] [x][R] Veri Yedekleme: JSON export (admin panelinden)
- [x][F] [x][R] Açılışta versiyon kontrolü, güncelleme zorunlu kılınabilir

---

## 3.2 Akıllı Sistemler (Planlanan / Kısmi)

### Yapay Zeka Analizi
- [x][F] [x][R] Zayıf konulara özel sınav önerisi (Admin Dashboard stats bazlı öneri)
- [x][F] [x][R] Adaptif öğrenme: Yanlış yapılan sorulara göre tekrar algoritması
- [x][F] [x][R] Aralıklı tekrar listesi: `WrongAnswer.reviewStage`, `nextReviewAt`, review geçmişi, 4 doğru sonrası otomatik tamamlandı ve "Öğrendim" akışı
- [x][F] [x][R] Yapay Zeka Danışmanı: DeepSeek entegrasyonu. Standart kullanıcılar için günlük 20 soru kotası, PRO üyeler için sınırsız sohbet imkanı. Limit dolduğunda PRO üyelik veya video izleme (kredi kazanma) teşviki yapar. Chat geçmişi mobil SharedPreferences veya tarayıcı oturumu bazlı saklanır.
- [x][F] [x][R] Buzlu Cam & Alt Kayar Panel: Mobil platformda AI sohbet ekranı tüm ekranı kaplamak yerine ekranın %65'i yüksekliğinde şık ve buzlu cam (BackdropFilter) efektli bir alt kayar panel olarak açılır. Açıkken buton kapatma (X) simgesine dönüşür.
