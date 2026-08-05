# Mobil Admin → React Web Eşleme Notları (2026-07-29)

Bu belge, Flutter admin panelinde yapılan son davranış ve arayüz değişikliklerini React web
admin paneline taşımak için uygulama sözleşmesidir. Kaynak gerçeklik Node.js API'dir; web
tarafı burada yazan iş kurallarını koruyup kendi bileşen sistemine uyarlamalıdır.

## 1. Genel tasarım ve durum yönetimi

- Koyu temada yüzeyler beyaz kullanılmaz. Form, arama, dialog ve bottom-sheet alanları koyu
  yüzey; ana metin açık, ikincil metin en az okunabilir kontrastta olmalıdır.
- Her veri ekranında dört ayrı durum bulunur: yükleniyor, hata + tekrar dene, boş durum ve
  dolu liste.
- Arama alanları debounce kullanır; geç dönen eski istek yeni sonucu ezemez.
- Silme, toplu bildirim, rol değiştirme gibi etkili işlemler onay ister.
- API hatası alınmışsa başarı mesajı gösterilmez.

## 2. Dashboard

- [x][F] [x][R] Kompakt KPI kartları ve bekleyen işlem merkezi.
- [x][F] [x][R] Bekleyen gönderi, açık destek ve açık rapor sayıları gerçek endpointlerden gelir.
- [x][F] [x][R] Son 7 gün kayıt trendi ve kategori performans özetleri.
- [x][F] [x][R] Kullanıcılar, sınavlar, analitik, duyuru, abonelik ve reklamlar hızlı aksiyonları.
- [x][F] [x][R] Mobil web admin kabuğu Flutter renk tokenlarını, kompakt üst barı ve beşli
  alt navigasyonu kullanır; masaüstünde aynı route yapısı sol sidebar ile devam eder.
- [x][F] [x][R] Dashboard yükleme, kısmi endpoint hatası + tekrar dene, grafik boş durumu
  ve dolu veri durumlarını birbirinden ayırır.

## 3. Sınav ve soru yönetimi

### 3.1 Sorumluluk ayrımı

- **Flutter Sınav Yönetimi** yalnızca gerçek sınav (`real_exam`) oluşturur ve yönetir.
- **Flutter İçerik > Deneme** yalnızca deneme (`mock_exam`) sınavlarını/sorularını yönetir.
- **Flutter İçerik > Kısa Test** yalnızca kısa test (`short_test`) sorularını yönetir.
- **React web Sınav Yönetimi** ayrı İçerik route'u kullanmadan `Kısa Test`,
  `Deneme` ve `Gerçek Sınav` alt görünümlerinin tamamını tek merkezde yönetir.
- React mobil görünüm aynı tek merkez yapısını korurken Flutter'ın görsel bileşen,
  segment, kart, form ve responsive davranışlarını birebir referans alır.
- Legacy `exam` değeri okunabilir; yeni kayıtlar `real_exam` veya `mock_exam` yazmalıdır.

### 3.2 Sınav ana kategorileri

Gerçek sınav ve deneme oluştururken tüm konu ağacı gösterilmez. Yalnızca şu iki kök sınıf
seçilebilir:

1. B Sınıfı
2. İş Makinesi / Operatör / İSG kökü

Kök bulma Türkçe karakterlerden bağımsız normalize edilir. İş makinesi eşleşmeleri:
`iş makinesi`, `operatör`, `forklift`, `ekskavatör`, `vinç`, `kepçe`, `beko`, `dozer`,
`İSG`, `iş sağlığı`, `iş güvenliği`.

### 3.3 Branş sözlüğü

**B Sınıfı**

| API `subject` | UI etiketi |
|---|---|
| `trafik` | Trafik ve Çevre |
| `ilkyardim` | İlk Yardım |
| `motor` | Motor ve Araç Bilgisi |
| `adabi` | Trafik Adabı |

**İş Makinesi**

| API `subject` | UI etiketi |
|---|---|
| `operator_isg` | İSG, Çevre ve Kalite |
| `operator_machines` | İş Makinesi Türleri |
| `operator_transport` | Nakil ve Trafik Güvenliği |
| `operator_ethics` | Meslek Etiği ve Gelişim |

Soru formundaki branşlar seçilen sınavın kök kategorisine göre değişir. Sınav kartı ve branş
istatistikleri de aynı sözlüğü kullanmalıdır; İş Makinesi sınavında B Sınıfı başlıkları
gösterilmemelidir.

### 3.4 İçerik ekranı

- [x][F] [ ][R] Denemeler B Sınıfı / İş Makinesi segmentiyle filtrelenir.
- [x][F] [ ][R] Kısa testte eski `Eğitim 1` kategorisi UI listesinden çıkarılır.
- [x][F] [ ][R] Soru ekleme sınav seçimi olmadan kaydedilemez; sınava göre branş zorunludur.
- [x][F] [ ][R] Soru/sınav ekleme butonları gerçek formları açar.

### 3.5 Web Sınav Merkezi eşlemesi

- [x][F] [x][R] Sınav Merkezi yalnızca gerçek sınavları listeler ve oluşturur.
- [x][F] [x][R] Üst segment yalnızca B Sınıfı ve İş Makinesi seçeneklerinden oluşur.
- [x][F] [x][R] Sınav/soru sayaçları, branş filtresi ve sınav kartı dağılımı aktif
  sınıfa göre yeniden hesaplanır.

### 3.6 2026-08-04 Flutter sınav farkları

Aşağıdaki maddeler mevcut genel web sınav ekranından daha yeni Flutter davranışlarıdır.
React tarafı ancak `exam-system-flutter-reference-2026-08-04.md` kabul testleriyle
birlikte tamamlandığında işaretlenmelidir.

- [x][F] [ ][R] Kısa test ayrı sınav kaydı değildir; yaprak konuya bağlı tek test
  ve sınırsız gerçek soru sayısı modeli kullanır.
- [x][F] [ ][R] Konu ağacı bağlı kısa test soru sayısını gösterir.
- [x][F] [ ][R] Deneme/gerçek sınav kartları branş başına soru sayısını canlı gösterir.
- [x][F] [ ][R] B Sınıfı 45, İş Makinesi 50 dakika varsayılanıyla açılır; gerçek
  süre ve dinamik geçme notu bütün ekranlarda korunur.
- [x][F] [ ][R] Kullanıcı gerçek sınav listesi seçili kategori + `testType`
  birleşimiyle katı filtrelenir.
- [x][F] [ ][R] Deneme/gerçek sınav soruları oturum başında karıştırılır.
- [x][F] [ ][R] Gerçek sınav timer'ı soru yüklemeden sonra başlar; doğru/yanlış
  sınav bitmeden açıklanmaz.
- [x][F] [ ][R] Soru listesi, cevap durumu, boş soru sayılı teslim uyarısı ve
  çıkış koruması Flutter ile aynı davranır.
- [x][F] [ ][R] Sonuç payload'ı gerçek sınav kimliği, türü, kategorisi, süresi,
  geçme notu ve yanlış soru detaylarıyla backend doğrulamasına gider.

## 4. İstatistik ve profil

- [x][F] [ ][R] İstatistik ekranı B Sınıfı / İş Makinesi kategori kapsam filtresi kullanır.
- [x][F] [ ][R] Genel, Yolculuk, Etkileşim, Konu, Zorluk ve Rozet bölümleri.
- [x][F] [ ][R] Profil form alanları koyu temada okunur; admin araçlarına kompakt erişim.

## 5. Yönetim araçları

### 5.1 Kullanıcılar

- [x][F] [ ][R] Sunucu tabanlı sayfalama, arama, filtre ve sıralama.
- [x][F] [ ][R] Toplam/Admin/PRO/Askıda özetleri filtreli sayfadan değil global `summary`den gelir.
- [x][F] [ ][R] `waiting_first_test` filtresi gerçek sınav sonucu olmayan normal kullanıcıları getirir.
- [x][F] [ ][R] Admin kendi admin rolünü kaldıramaz.

`GET /users` parametreleri: `page`, `limit`, `search`, `filter`, `sort`.

### 5.2 Duyurular

- [x][F] [ ][R] Hedefler: `all`, `pro`, `free`, `waiting_first_test`.
- [x][F] [ ][R] Hedef sayıları `GET /notifications/broadcast-history` içindeki `audience` alanından gelir.
- [x][F] [ ][R] Admin ve askıdaki kullanıcılar toplu hedefe dahil edilmez.
- [x][F] [ ][R] Başlık 100, mesaj 500 karakter; görsel URL varsa `http/https` olmalıdır.
- [x][F] [ ][R] Gönderme ve geçmiş silme işlemleri onay ister.

### 5.3 İçerik onayları

- [x][F] [ ][R] Bekleyen/onaylı/reddedilen gönderiler ayrı segmentlerde listelenir.
- [x][F] [ ][R] Tür ve metin araması birlikte çalışır.
- [x][F] [ ][R] Onayla, reddet, görüntüle ve sil aksiyonları sonuç mesajı gösterir.

### 5.4 İçerik raporları

- [x][F] [ ][R] Açık/çözüldü/reddedildi listeleri beraber yüklenir; sayaçlar globaldir.
- [x][F] [ ][R] Soru raporunda soruyu düzenleyip raporu çözme akışı.
- [x][F] [ ][R] Gönderi raporunda gönderiyi görüntüleme, silme veya raporu çözme akışı.
- Rapor hedefi `targetType: question|post`; ilgili `questionId` veya `postId` populate edilir.

### 5.5 Destek

- [x][F] [ ][R] Backend liste cevabı `data` alanından okunur.
- [x][F] [ ][R] Yeni/açık/kapalı sayaçları, arama ve durum filtresi.
- [x][F] [ ][R] Konuşma geçmişi, admin cevabı, kapat ve yeniden aç.
- [x][F] [ ][R] Boş cevap gönderilemez.

### 5.6 Abonelik ve reklamlar

- [x][F] [ ][R] Abonelik ayarı, planlar ve kuponlar ayrı yükleme/hata/tekrar dene durumlarına sahiptir.
- [x][F] [ ][R] Aktif edilen reklam türünde AdMob birim ID zorunludur.
- [x][F] [ ][R] Reklam config backend'e kaydedilmeden yerel ayar güncellenmez ve başarı mesajı gösterilmez.
- [x][F] [ ][R] QR istatistik isteği başarısızsa `0` gerçek değer gibi sunulmaz; tekrar dene gösterilir.

## 6. React web geçiş kontrolü

- [ ] Sınav Yönetimi route'una Kısa Test / Deneme / Gerçek Sınav üçlü alt görünümünü ekle.
- [ ] Mobil React görünümünü Flutter sınav yönetimi kartları, filtreleri, formları ve
  alt aksiyonlarıyla birebir görsel/davranışsal eşle.
- [ ] Bu dosyadaki `[ ][R]` maddelerini mevcut React ekranlarıyla tek tek karşılaştır.
- [ ] Aynı endpoint ve enum değerlerini kullan; Flutter etiketlerini API değeri olarak yazma.
- [x] Dashboard için mobildeki gerçek davranışı webdeki responsive bileşen sistemine taşı.
- [x] Dashboard sayaçlarını istemci tarafında ilk sayfadan hesaplama; overview ve kuyruk
  endpointlerinin tam yanıtlarını kullan.
- [ ] Form ve modal hata durumlarını sessizce yutma.
- [ ] Sınav/branş eşlemesini isimden tahmin etmek zorunda kalındığında kategori üst zincirini de tara.
- [ ] Broadcast sonuç alanlarını legacy `totalUsers/tokensFound/successCount` yerine `sentCount/tokenCount/pushSent/errorDetails` olarak oku.
- [ ] Admin rapor kartında `targetType=post` için `postId`; `targetType=question` için `questionId` kullan.
