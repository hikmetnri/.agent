# Proje Belgelendirmesi Arşivi

Bu klasör, projelerin tasarım özeti, refactor planları, veri yönetimi ve yapılan değişikliklerin belgelendirmesini içerir.

## 📁 Klasör Yapısı

### flutter/
Flutter mobil uygulaması için UI/UX redesign belgeleri:
- `ADMIN_DASHBOARD_REDESIGN.md` - Admin paneli modern tasarım özeti
- `PROJECT_SUMMARY.md` - Sınav yönetimi UI redesign detayları (443 satır)
- `ADMIN_EXAM_UI_REDESIGN.md` - Exam management UI bileşenleri

### web/
Web platformu için refactor ve admin panel belgeleri:
- `ADMIN_REVISION_PHASE1_SUMMARY.md` - Admin panel revision (ErrorBoundary, validation)
- `REFACTOR_PLAN.md` - AdminExams.jsx refactor planı (7 problem çözümü)
- `REFACTOR_COMPLETION_SUMMARY.md` - Refactor tamamlama özeti
- `OZET_DETAYLI.md` - Detaylı Türkçe özet
- `OZET_TURKCE.md` - Kısa Türkçe özet

### backend/
Backend veri yönetimi ve maintenance belgeleri:
- `DATA-SEEDING-GUIDE.md` - Veri yükleme (seeding) ve maintenance scriptleri rehberi
  - Seed scriptleri açıklaması (9 script)
  - Maintenance tools rehberi (5 tool)
  - Veri seeding geçmişi (İSG, Trafik levhaları, Sürücü kursları)
  - Script çalıştırma örnekleri

## 🎯 Amaç

- **Referans Belgelendirmesi:** Geçmiş tasarım kararları ve implementasyon detayları
- **Veri Yönetimi Rehberi:** Backend seed/migration scriptleri nasıl kullanılır
- **Proje Tarihi:** Yapılan değişikliklerin kaydı
- **Maintenance:** Tekrar veri yükleme, bugfix veya migration işlemleri için rehber

## ⚠️ Notlar

- Ana projede tutulması gereken `README.md` dosyaları (`ehliyet-kurs-webpage-main/README.md`, `ehlihet-kurs-backend-main/scripts/README.md`) yerlerinde kalmıştır
- Bu dosyalar **arşiv ve referans** amaçlıdır
- Aktif kod geliştirmesi için gerekli değil ancak maintenance ve debugging'de faydalı
