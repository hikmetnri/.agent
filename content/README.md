# Media Inbox

Bu klasor uygulamaya eklenecek medya dosyalari icin gecici alandir. Dosyalari Flutter/Web projesinin `assets` veya `public` klasorlerine koyma; buraya birak, sonra Codex'e hangi ekranda/kategoride kullanilacagini soyle.

## Klasorler

- `content-images/`: Konu kapaklari, ders ici gorseller, thumbnail gorselleri.
- `signs/`: Trafik, ISG, is makinesi veya benzeri levha gorselleri.
- `videos/`: Uygulamada kullanilacak video dosyalari veya YouTube link notlari.

## Codex'e Soylenecek Ornekler

- `.agent/content/signs` icine yeni ISG levhalari koydum, `isg` klasorune Cloudinary'ye yukle ve uygulamada ISG levhalari olarak kullan.
- `.agent/content/content-images/motor_yeni.png` dosyasini Motor dersi kapagi yap.
- `.agent/content/videos/video-listesi.txt` icindeki YouTube linklerini video derslere bagla.

## Hedef Cloudinary Klasorleri

- Trafik levhalari: `trafik-levhalari/...`
- Konu gorselleri: `content/...`
- ISG / is makinesi levhalari: `isg/...`
- Animasyonlar: `animasyonlar/...`
- Thumbnail gorselleri: `thumbnails/...`
