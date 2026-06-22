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
- [ ][F] [ ][R] Sürücü kursu başvuru/lead sistemi (Gelecek faz; kullanıcılar kurs kartlarındaki formdan "Başvuru Yap" veya "Bilgi Al" talebi gönderir, veriler user/kurs/ehliyet sınıfı/mesaj ile `DrivingSchoolLead` tablosuna kaydedilir ve admin panelinde durumu yönetilir. Gelir modeli olarak kayıt başı komisyon veya lead satışı hedeflenir).

### Sistem Güvenliği ve Bakım
- [x][F] [x][R] Bakım Modu: Admin toggle → kullanıcılar erişemez, bakım mesajı görür
- [x][F] [x][R] Bakım modu API davranışı: `/api/status` public kalır, admin token'ı bakım modunda middleware'den geçer, kullanıcılar 503 + bakım mesajı alır
- [x][F] [-][R] Flutter bakım modu route gate'i: açılışta ve ana kullanıcı route'larında `/status` kontrolü yapılır; admin bakım modundayken panele erişmeye devam eder
- [x][F] [x][R] Veri Yedekleme: JSON export (admin panelinden)
- [x][F] [x][R] Açılışta versiyon kontrolü, güncelleme zorunlu kılınabilir

### Premium Özellikler & Tema ve Ses Yönetimi
- [x][F] [x][R] **PRO Premium Sistem Temaları:** PRO kullanıcılar için Zümrüt Yeşili (`emerald`), Gece Mavisi (`midnight`), Obsidyen AMOLED (`obsidian`), Gün Batımı (`sunset`), Lavanta Rüyası (`lavender`), Yakut Kırmızısı (`ruby`), Kutup Ayazı (`arctic`) ve Ametist (`amethyst`) premium tema renkleri eklendi. PRO üye olmayanlar için paywall uyarısı tetiklenir (Web'de toast bildirimi, Mobil'de paywall ekranı açılır).
- [x][F] [x][R] **Tema Kilitleme Mekanizması:** Özel bir sistem teması aktifken, standart Açık/Koyu mod toggle switch'leri asma kilit simgesi alarak kilitlenir ve renk modu değiştirilemez hale gelir.
- [x][F] [x][R] **Sistem/Cihaz Teması Desteği:** Açık ve Koyu modların yanına Sistem (System Auto) seçeneği eklenerek cihazın aktif işletim sistemi temasının otomatik olarak takip edilmesi sağlandı. Web tarafında üçlü segment seçici arayüzü kuruldu, Flutter tarafında sürgülü switch 3 pozisyonlu tasarıma güncellendi.
- [x][F] [x][R] **Beyaz/Açık Tema Tasarım İyileştirmeleri:** Web tarafında beyaz temadaki kontrast sorunları giderildi. Sabit koyu renkli kartlar, hafif geçirgen açık kenarlıklar ve beyaz renkli yazılar akıllıca açık temaya uygun hale getirildi; solid koyu butonların (`bg-primary`) ve alert rozetlerinin metin renkleri ise kontrastını koruyacak şekilde izole edildi.
- [x][F] [x][R] **Premium Ses Efektleri:** Arayüzdeki kaydetme/tamamlama bildirim sesi (`save.mp3`) macOS **Complete.mp3** chime sesi ile güncellendi. Ek olarak **Note.mp3** (`note.mp3`) ve **Chord.mp3** (`chord.mp3`) alternatifleri web ve mobil dizinlerine eklenerek arayüzün ses kalitesi premium seviyeye çıkarıldı.

---

## 3.2 Akıllı Sistemler (Planlanan / Kısmi)

### Yapay Zeka Analizi
- [x][F] [x][R] Zayıf konulara özel sınav önerisi (Admin Dashboard stats bazlı öneri)
- [x][F] [x][R] Adaptif öğrenme: Yanlış yapılan sorulara göre tekrar algoritması
- [x][F] [x][R] Aralıklı tekrar listesi: `WrongAnswer.reviewStage`, `nextReviewAt`, review geçmişi, 4 doğru sonrası otomatik tamamlandı ve "Öğrendim" akışı
- [x][F] [x][R] **Yolla AI Yapay Zeka Asistanı:** DeepSeek entegrasyonu. Yapay zekanın adı **Yolla AI** olarak güncellendi ve *"Anlamadığınız yerde Yolla AI'a yollayın, o cevaplasın! 🚀"* sloganı eklendi. Standart kullanıcılar için günlük 20 soru kotası, PRO üyeler için sınırsız sohbet imkanı sunar. Limit dolduğunda PRO üyelik veya video izleme (kredi kazanma) teşviki yapar. Chat geçmişi mobil SharedPreferences veya tarayıcı oturumu bazlı saklanır.
- [x][F] [x][R] Buzlu Cam & Alt Kayar Panel: Mobil platformda AI sohbet ekranı tüm ekranı kaplamak yerine ekranın %65'i yüksekliğinde şık ve buzlu cam (BackdropFilter) efektli bir alt kayar panel olarak açılır. Açıkken buton kapatma (X) simgesine dönüşür.
- [x][F] [x][R] AI Typewriter & Otomatik Kaydırma: Yapay zeka asistanının verdiği yeni yanıtlar harf harf yazılma (typewriter) efektiyle gösterilir ve yazma esnasında sohbet ekranı otomatik olarak en aşağı kaydırılır. Yazım işlemi bittiğinde yanıp sönen `▎` imleci gizlenir ve sayfa/klavye değişimlerinde animasyonun tekrar oynamaması için durum takibi yapılır.
- [x][F] [x][R] AI Butonu Konumlandırması: Test/Sınav çözme ekranlarında sağ alttaki kontrol ve onaylama butonlarıyla (Sonraki Soru, Sınavı Teslim Et vb.) çakışmayı önlemek amacıyla AI sohbet butonu alt hizalaması yukarı kaydırılmıştır (Flutter'da `bottom: 130`, Web'de sınav sayfalarında `bottom: 84px` / `88px` olarak dinamikleşir).
