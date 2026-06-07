# 3. DİĞER ÖZELLİKLER VE TEKNİK DETAYLAR

## 3.1 Ekstra Özellikler

### Trafik İşaretleri Kütüphanesi
- [x][F] [x][R] Kategorize edilmiş trafik işaretleri listesi
- [x][F] [x][R] Trafik levhaları Cloudinary `trafik-levhalari/...` klasöründen `f_auto,q_auto` ile yüklenir; Flutter `assets/images/signs/...` path'lerini resolver ile remote URL'ye çevirir, React web `resolveMediaUrl` ile Cloudinary kullanır

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
