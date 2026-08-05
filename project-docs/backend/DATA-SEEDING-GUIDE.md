# Backend - Data Seeding & Maintenance Guide

Bu belge, backend'de veri yükleme (seeding), migration ve maintenance işlemlerinin nasıl yapıldığını anlatır.

---

## 📋 Veri Yükleme (Seeding) Nedir?

Veritabanına ilk veriler yüklemek veya mevcut verileri güncellemek için yazılan scriptler.

### Seed Script'leri (`scripts/seed/`)

#### 1. **seedContentImages.js**
- **Amaç:** Ders içerik görsellerini kategori içeriklerine bağlar
- **Kullanım:** Yeni içerik görseli eklendikten sonra çalıştırılır
- **Çıktı:** Content koleksiyonunda imageUrl güncellemesi

#### 2. **embedRecentContentImages.js**
- **Amaç:** Son eklenen/güncellenen içerik görsellerini ilgili kayıtlara işler
- **Kullanım:** Görsel upload sisteminden sonra
- **Özellik:** Incremental - sadece yeni görselleri işler

#### 3. **seedOfficialShortTests.js**
- **Amaç:** Resmi kısa test sorularını ekler/günceller
- **Kullanım:** Sınav soruları güncellendiğinde
- **Veri Kaynağı:** İş makinesi operatörü resmi eğitim materyali

#### 4. **seedBClassExams.js**
- **Amaç:** B sınıfı sınav soru bankası seed verilerini ekler
- **Kullanım:** Ehliyet sınav soruları yönetimine ait
- **Veri Kaynağı:** MEB resmi sınav sorularından

#### 5. **seedWorkMachineCategoryTree.js**
- **Amaç:** İş Makinesi Operatörü Eğitimi kategori ağacını oluşturur
- **Yapı:** 8 ana konu + alt konular (hierarchical)
- **İşlemi:** 
  - Varsayılan: dry-run (ne yapacağını gösterir)
  - `--apply` flag: gerçek uygulama
  - `--apply` sırasında otomatik backup yapılır
- **Konular:** 
  - İş ve İşyeri ile İlgili Tanımlar
  - İş Sağlığı ve Güvenliği Mevzuatı
  - İş Makinesi Tür ve Çeşitleri
  - İşyerinde Temel İlk Yardım
  - Yangın Eğitimi
  - Meslek Adabı
  - Mesleki Gelişim
  - İşyeri Çalışma Talimatı

#### 6. **seedTrafficSignImageQuestions.js**
- **Amaç:** Trafik levhası görsel soruları ekler
- **Veri:** Trafik levhası resmi + soru seçenekleri
- **Çıktı:** Question koleksiyonunda görsel soru kaydı

#### 7. **seedMtskDrivingSchools.js**
- **Amaç:** Türkiye geneli sürücü kurslarını ekler
- **Veri Kaynağı:** MTSK (Motorlu Taşıt Sürücüleri Kurumu) web sayfaları
- **Modu:**
  - Default: Liste verisini çeker
  - `--details`: İlçe detayları ve telefon numaraları da çeker
- **İçerik:** İl, ilçe, kurs adı, telefon, ehliyet sınıfı

#### 8. **seedTarsusDrivingSchools.js**
- **Amaç:** Mersin/Tarsus bölgesi sürücü kurslarını ekler
- **Veri:** Local veya web scraping

#### 9. **seedExtras.js**
- **Amaç:** Ek/yardımcı seed verileri için generic araç
- **Kullanım:** Diğer kategoriler için custom veri yüklemeleri

---

## 🔧 Maintenance Tools (`scripts/tools/`)

#### 1. **auditShortTests.js**
- **Amaç:** Kısa test verilerini kontrol eder (data integrity)
- **Kontroller:**
  - Soruların eksiksiz olması (başlık, seçenekler, cevap)
  - Seçenek sayısı doğruluğu
  - Zorluk seviyesi validasyonu
- **Çıktı:** Hata raporları ve uyarılar

#### 2. **checkDB.js**
- **Amaç:** Veritabanı bağlantısını ve temel kayıt durumunu kontrol eder
- **Kontroller:**
  - MongoDB bağlantı sağlıklı mı?
  - Koleksiyonlar var mı?
  - Temel kayıt sayıları
- **Kullanım:** Deployment sonrası kontrol

#### 3. **testAggregate.js**
- **Amaç:** MongoDB aggregation sorgularını test/debug etmek
- **Kullanım:** Karmaşık query geliştirirken
- **Çıktı:** Query sonuçları ve performance metrikleri

#### 4. **migrate_questions.js**
- **Amaç:** Eski soru verilerini yeni yapıya taşır
- **Kullanım:** Schema migration sırasında
- **İşlem:** Version-based migration

#### 5. **shuffleCorrectAnswers.js**
- **Amaç:** Soru şıklarını karıştırır ve correctAnswer indeksini günceller
- **Modu:**
  - Default: dry-run (ne yapacağını gösterir)
  - `--apply`: gerçek uygulanır
  - `--apply` sırasında `scripts/backups/` altına yedek yapılır
- **Kullanım:** Sınav güvenliği için sorular karışık tutmak

---

## 📊 Veri Seeding Geçmişi

### İş Makinesi Operatörü Eğitimi (İSG)

**Aşama 1: Temel Soru Bankası Oluşturma**
- Kısa testler: 37 soru
- Mock examlar: 20 soru
- Resmi sınavlar: 20 soru

**Aşama 2: Soru Genişletme**
- Kısa testler: 37 → 57 (+20 benzer varyasyon)
- Mock examlar: 20 → 27 (+7 medium zorluk)
- Resmi sınavlar: 20 → 27 (+7 hard zorluk)
- **Metodoloji:** Mevcut soruları analiz edip benzer ve farklı varyasyonlar oluşturma

**Aşama 3: Kategori Ağacı**
- 8 ana başlık altında hierarchical kategori yapısı
- Her kategorinin alt konuları tanımlandı

### Trafik Levhaları & Sürücü Kursları

**Trafik Levhaları:**
- Tehlike işaretleri (T)
- Yasaklama işaretleri (Y)
- Bilgi işaretleri (B)
- Tanzim işaretleri (TT)
- Her işaret için görsel + açıklama

**Sürücü Kursları:**
- MTSK veritabanından çekilen il/ilçe bazında kurslar
- Telefon ve ehliyet sınıfı bilgileri
- Regional scraping (Tarsus, İstanbul vb.)

---

## 🔄 Seed Script Çalıştırma

### Pre-requisites
```bash
# Backend klasörüne git
cd ehlihet-kurs-backend-main

# Bağımlılıklar yüklü mı kontrol et
npm install

# .env dosyasını kontrol et (DB_URI set mi?)
cat .env.example
```

### Dry-run (Güvenli - Ne yapacağını göster)
```bash
node scripts/seed/seedWorkMachineCategoryTree.js
# veya
node scripts/tools/shuffleCorrectAnswers.js
```

### Gerçek Uygulama
```bash
node scripts/seed/seedWorkMachineCategoryTree.js --apply
# veya
node scripts/tools/shuffleCorrectAnswers.js --apply
```

### Audit/Check
```bash
node scripts/tools/checkDB.js
node scripts/tools/auditShortTests.js
```

---

## ⚠️ Önemli Notlar

1. **Backup Stratejisi:**
   - `--apply` ile çalışan scriptler otomatik backup yapılır
   - `scripts/backups/` klasörüne yedek yazılır
   - Tarih ve timestamp ile adlandırılır

2. **Idempotency:**
   - Çoğu seed scripti idempotent (aynı scripti iki kez çalıştırmak güvenli)
   - Çift ekleme riski yoktur

3. **Veri Kaynakları:**
   - Resmi eğitim materyalleri (MEB, MTSK)
   - Web scraping (sürücü kursları)
   - Manuel giriş (kategori tanımlamaları)

4. **Maintenance Window:**
   - Production'da seed/maintenance scriptleri low-traffic saatlerinde çalıştırılmalı
   - Health check (`checkDB.js`) sonrası yapılmalı

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: Yeni Sürücü Kursu Eklemek
```bash
node scripts/seed/seedMtskDrivingSchools.js --details
```

### Senaryo 2: Kategori Ağacını Yeniden Oluşturmak
```bash
# İlk olarak dry-run
node scripts/seed/seedWorkMachineCategoryTree.js

# Sonra gerçek uygulama
node scripts/seed/seedWorkMachineCategoryTree.js --apply
```

### Senaryo 3: Sınav Sorularını Karıştırmak
```bash
# Kontrol
node scripts/tools/shuffleCorrectAnswers.js

# Uygula
node scripts/tools/shuffleCorrectAnswers.js --apply
```

### Senaryo 4: Veri İntegriti Kontrolü
```bash
node scripts/tools/checkDB.js
node scripts/tools/auditShortTests.js
```

---

## 📝 Notlar

- Bu scriptler **production'da kullanılmamak** için tasarlanmıştır
- Development ve maintenance amaçlıdır
- Alternatif: Admin API endpoints'i oluşturulabilir (GUI'den veri yönetimi)
- Scriptler idempotenttir (tekrar çalıştırılabilir)
