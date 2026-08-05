# Features Hafizasi

Bu klasor Ehliyet Yolu projesinin kalici feature hafizasidir.

Son kapsam denetimi: 2026-08-04 — Kisa test, deneme ve gercek sinav sistemi
Flutter referansina gore yeniden tanimlandi; backend kurallari ve React web aktarim
aciklari ayrintili esleme belgesine islendi. React admin icin tum sinav turlerinin
tek Sinav Yonetimi route'unda toplanmasi kesin urun karari olarak kaydedildi.

Ana kaynak:

`/Users/hikmet/Desktop/Proje/.agent/workflows/features`

## Ne Icin Kullanilir?

- Hangi ozellikler yapildi?
- Hangi ozellikler planlandi?
- Webde olup Flutter'da olmayanlar neler?
- Flutter'da olup webde olmayanlar neler?
- Backend/API hazir ama UI tarafinda eksik kalanlar neler?
- Bir sonraki ajan veya gelistirme turu nereden devam etmeli?

## Her Gelistirme Sonunda Kontrol

Ajan her kod degisikliginden sonra bu klasoru kontrol eder.

Guncelleme gerekir:

- Yeni ekran, modal, form, filtre, yonetim aksiyonu veya kullanici akisi eklendiyse.
- Yeni API endpoint'i veya veri modeli alani eklendiyse.
- React web ve Flutter arasinda yeni fark olustuysa.
- Bir platformdaki eksik ozellik tamamlandiysa.
- Daha once planlanan bir madde gerceklestiyse.

Guncelleme gerekmeyebilir:

- Sadece gorsel renk, spacing, typography veya kart tasarimi degistiyse.
- Davranis, veri, API, navigasyon veya platform kapsami degismediyse.

Bu durumda final cevapta "features guncellemesi gerekmedi" diye belirtilir.

## Isaretleme

- `[x][F] [x][R]`: Flutter ve React web tamam.
- `[x][F] [ ][R]`: Flutter tamam, React web eksik.
- `[ ][F] [x][R]`: React web tamam, Flutter eksik.
- `[-][F]` veya `[-][R]`: Bilincli olarak kapsam disi.

## Dosya Haritasi

- `admin-panel.md`: Admin ekranlari ve admin aksiyonlari.
- `user-panel.md`: Kullanici ekranlari ve kullanici akislari.
- `api-reference.md`: Backend endpointleri.
- `technical-spec.md`: Veri modelleri, teknik kurallar ve sistem davranislari.
- `other-features.md`: Trafik isaretleri, video, pazarlama ve genel ek ozellikler.
- `github-audit-*.md`: GitHub commit gecmisiyle feature hafizasi karsilastirmalari.
- `mobile-admin-sync-2026-07-29.md`: Flutter admin panelindeki son sinav, icerik,
  istatistik, profil ve yonetim araci davranislarinin React web esleme sozlesmesi.
- `exam-system-flutter-reference-2026-08-04.md`: Kisa test, deneme ve gercek sinav
  sisteminin Flutter referansi; backend kurallari, kullanici akisi ve React web'e
  birebir aktarim kontrol listesi.
