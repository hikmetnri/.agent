# Ehliyet Kurs — React Web: Referans ve Özellik Listesi

Son güncelleme: 2026-06-07

Bu döküman, Flutter + Node.js ile geliştirilmiş "Ehliyet Kurs" uygulamasının React web versiyonu için ana referans noktasıdır. Dosya boyutu ve okunabilirlik için modüler hale getirilmiştir.

---

## 📑 İçindekiler

### 1. [Admin Paneli Özellikleri](file:///Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main/.agent/workflows/features/admin-panel.md)
*   Navigasyon, Dashboard (Akış & Destek), İçerik Yönetimi (Kategoriler, Sorular, Sözler), Sınav Yönetimi, İstatistikler ve Profil/Yönetim Merkezi.

### 2. [Kullanıcı Paneli Özellikleri](file:///Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main/.agent/workflows/features/user-panel.md)
*   Auth (Giriş/Kayıt), Ana Sayfa (Widgetlar & Grid), İçerik Okuma, Kısa Testler, Sınavlar, Topluluk Akışı ve Profil Ayarları.

### 3. [Diğer Özellikler](file:///Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main/.agent/workflows/features/other-features.md)
*   Trafik İşaretleri, Video Dersler, QR Pazarlama, Bakım Modu, Yedekleme ve Versiyon Kontrolü.

### 4. [Backend API Referansı](file:///Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main/.agent/workflows/features/api-reference.md)
*   Tüm API endpoint listesi (Auth, Users, Categories, Questions, Exams, vb.).

### 5. [Teknik Şartname ve Veri Modelleri](file:///Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main/.agent/workflows/features/technical-spec.md)
*   Pro/Free ayrımı kuralları, Puan & Seviye sistemi, Teknik uygulama notları ve DB Veri Modelleri.

---

## 🛠 Genel Mimari Özeti

- **Backend:** Node.js + Express (Mevcut)
- **Frontend:** React (Yeni)
- **Auth:** JWT + localStorage
- **Styling:** Tailwind CSS
- **State:** Zustand / React Context
- **Görselleştirme:** Recharts / Chart.js
- **İçerik:** React Markdown

## Son Notlar

- 2026-06-07: Cloudinary medya depolama entegrasyonu tamamlandı. Local traffic signs ve content resimleri Flutter ile React projelerinden kaldırıldı; tüm görsel kaynakları Cloudinary sunucularına taşındı ve URL çözücüler (resolvers) üzerinden dinamik hale getirildi. Backend projesine Cloudinary toplu yükleme (bulk upload) araçları eklendi. Ayrıca İSG (İş Sağlığı ve Güvenliği) levha kütüphanesi veri modeli ve listeleme desteği eklendi.
- 2026-05-21: Admin panel ve Flutter admin ekranları için mevcut akışlar güncellendi: deneme/gerçek sınav ayrımı, soru yönetimi buton taşmaları, sınav/istatistik/rapor/kullanıcı/duyuru/destek ekran polish'leri.
- 2026-05-21: Bakım modu dokümante edildi: Flutter production APK uzak API kullanır, local emulator build için `API_BASE_URL=http://10.0.2.2:3000/api` ayrı verilir; admin bakımda panele erişmeye devam eder.
- 2026-05-21: İşlem günlükleri notu netleştirildi: "Düşük Skorlar" sekmesi crash log değil, `%50` altı `ExamResult` kayıtlarıdır; gerçek mobil hata logları `/logs` ile dosyaya yazılır.
