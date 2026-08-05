# Sınav Sistemi — Flutter Referansı ve React Web Aktarım Sözleşmesi (2026-08-04)

Bu belge kısa test, deneme ve gerçek sınav sisteminin güncel ürün sözleşmesidir.
Flutter uygulaması mevcut davranış referansıdır. React web aynı iş kurallarını,
filtreleri, veri ilişkilerini ve kullanıcı geri bildirimlerini koruyarak kendi
responsive bileşenleriyle eşlemelidir.

## 0. Kesin yönetim kararı (2026-08-04)

Flutter ve React admin navigasyonları aynı veri sözleşmesini kullanır fakat ekran
yerleşimleri birebir aynı route ayrımına sahip olmak zorunda değildir:

- Flutter'da mevcut yapı korunur: kısa test ve deneme `İçerik > Soru` altında,
  gerçek sınav `Sınavlar` altında yönetilir.
- React web adminde ayrı bir İçerik alanına ihtiyaç duyulmaz. Kısa test, deneme ve
  gerçek sınavların tamamı tek **Sınav Yönetimi** route'u içinde yönetilir.
- React Sınav Yönetimi üç ana alt görünüm kullanır: `Kısa Test`, `Deneme`,
  `Gerçek Sınav`.
- Alt görünümler tek sayfada sekme/segment olarak bulunabilir; her biri kendi arama,
  B Sınıfı/İş Makinesi filtresi, sayaçları, boş/hata/yükleme durumu ve ekleme
  aksiyonlarına sahip olmalıdır.
- React'in mobil admin görünümü Flutter'ın renk, kart, segment, form, sayaç,
  bottom-sheet/modal ve taşmasız responsive davranışını birebir referans alır.
- “Birebir” yalnızca görsel benzerlik değildir: aynı veri filtresi, doğrulama,
  soru bağlantısı, süre, branş sayacı, yayınlama ve hata davranışı uygulanır.

Backend değişiklikleri `ehliyet-kurs-backend` reposundaki
`feature/exam-system-validation` branch'i ve `72b5d5e` commit'inde tutulur. Main'e
alınmadan önce PR ile birleştirilmelidir.

## 1. Değişmez tür sözleşmesi

| Ürün türü | API `testType` | Üst kayıt | Soru bağlantısı | Yönetim alanı |
|---|---|---|---|---|
| Kısa test | `short_test` | Ayrı `Exam` yok | `Question.category` | Flutter: İçerik > Soru; React: Sınav Yönetimi > Kısa Test |
| Deneme | `mock_exam` | `Exam` zorunlu | `Question.exam` | Flutter: İçerik > Soru; React: Sınav Yönetimi > Deneme |
| Gerçek sınav | `real_exam` | `Exam` zorunlu | `Question.exam` | Flutter/React: Sınav Yönetimi > Gerçek Sınav |
| Eski gerçek sınav | `exam` | `Exam` zorunlu | `Question.exam` | Yalnızca okuma/legacy fallback |

Yeni kayıtlar `exam` yazmamalıdır. Kısa test için `Exam` oluşturulmamalıdır.
Backend `isMiniTest: true` ile ayrı sınav oluşturma isteğini reddeder.

## 2. Kategori kapsamı

Sınav sistemi iki eğitim köküyle çalışır:

1. B Sınıfı Ehliyet
2. İş Makinesi / Operatör / İSG

Admin formu bütün konu ağacını sınav ana kategorisi olarak göstermemelidir. Deneme
ve gerçek sınav yalnızca bu iki kökten birine bağlanır. Kısa test ise kökün altındaki
en son konu başlığına bağlanır.

Kullanıcı tarafında seçili kategori katı kapsamdır:

- B Sınıfı seçen kullanıcı yalnızca B Sınıfı sınavlarını görür.
- İş Makinesi seçen kullanıcı yalnızca İş Makinesi sınavlarını görür.
- Boş veya başka kategoriye bağlı sınav kullanıcı listesine karışmaz.
- Admin liste ekranında B Sınıfı / İş Makinesi segmenti aynı kapsamı uygular.

## 3. Kısa test sözleşmesi

### 3.1 Ürün amacı

Kısa test, konu anlatımından sonra konuyu pekiştiren tek testtir. Aynı konu altında
birden fazla kısa test başlığı oluşturulmaz. Testin kimliği konu kategorisidir;
sorular `testType=short_test` ve aynı `category` ile gruplanır.

### 3.2 Soru sayısı

- Önerilen tipik sayı 8–10 olabilir fakat teknik üst sınır değildir.
- Trafik levhaları veya uzun İş Makinesi/İSG konularında daha fazla soru olabilir.
- UI sabit “10 soru” varsayımı yapmaz; gerçek soru sayısını gösterir.
- Konu ağacında her yaprak konu için `Kısa test: N soru` sayacı gösterilir.
- Soru sayısı sıfırsa test başlatma CTA'sı gösterilmez.

### 3.3 Admin Flutter akışı

1. İçerik > Soru > Kısa Test açılır.
2. B Sınıfı veya İş Makinesi seçilir.
3. Yalnızca seçilen kökün konu başlıkları listelenir.
4. Yaprak konu açılır; bağlı soru sayısı ve mevcut sorular görünür.
5. `Kısa Test Sorusu` ile soru eklenir; seçilen konu zorunludur.
6. İş Makinesi seçiliyken İSG/levha içeriği İş Makinesi ağacından seçilir; B Sınıfı
   trafik başlıkları karışmaz.
7. Soru ekleme, düzenleme ve silme aynı konu bağlantısını korur.

### 3.4 Kullanıcı davranışı

- Konu anlatımında soru varsa `Konu Testini Çöz` gösterilir.
- Şık seçildiğinde doğru/yanlış anında gösterilir.
- Yanlış cevapta doğru cevap ve açıklama görünür.
- Sonuç doğru, yanlış, skor ve başarı yüzdesini gösterir.
- `%70+` başarı `completed_category_<categoryId>` olarak tamamlanır.
- Başarılı test hızlı test havuzundan çıkarılır.
- Devam kartı önce sıradaki tamamlanmamış kısa testi, yoksa sıradaki konuyu açar.

### 3.5 React web aktarım durumu

- [x][F] [x][R] Ayrı `Exam` oluşturmadan konuya bağlı tek kısa test modeli.
- [x][F] [x][R] B Sınıfı / İş Makinesi segmentine göre konu ağacı filtresi.
- [x][F] [x][R] Yaprak konuda bağlı kısa test soru sayacı.
- [x][F] [x][R] Soru sayısında 10 üst sınırı kullanmama ve gerçek sayıyı gösterme.
- [x][F] [ ][R] Konu düzenleme/ağaç görünümünde bağlı test durumunu görünür kılma.

## 4. Deneme sınavı sözleşmesi

### 4.1 Oluşturma sırası

1. İçerik > Soru > Deneme açılır.
2. B Sınıfı veya İş Makinesi segmenti seçilir.
3. Önce `Sınav` butonuyla `mock_exam` kaydı oluşturulur.
4. Ardından `Soru` veya CSV ile seçilen sınava sorular eklenir.
5. Sınav seçmeden deneme sorusu kaydedilemez.
6. Sorunun `testType` değeri seçilen sınavın türüyle eşleşmelidir.

### 4.2 Liste ve sayaçlar

- Denemeler konu accordion'una gömülmez; seçili eğitim kökünde doğrudan listelenir.
- Kartta isim, soru sayısı, süre, geçme notu ve yayın durumu gösterilir.
- Her branşın yanında o sınavdaki gerçek soru sayısı gösterilir.
- CSV yüklemede sınav ve branş zorunludur.

### 4.3 Çözüm davranışı

- Deneme yalnızca kendi `examId` ve `mock_exam` sorularını çeker.
- Gerçek sınav listesine karışmaz.
- Sorular oturum başlangıcında karıştırılır.
- Sonuç gerçek sınav kaydına ve kategoriye bağlanır.

### 4.4 React web aktarım durumu

- [x][F] [x][R] Flutter ile aynı B Sınıfı / İş Makinesi deneme segmenti.
- [x][F] [x][R] Önce sınav oluştur, sonra sınava soru ekle akışı.
- [x][F] [x][R] Sınav kartında dinamik branş soru sayaçları.
- [x][F] [ ][R] Oturum başına soru karıştırma ve `examId` kapsam kontrolü.

## 5. Gerçek sınav sözleşmesi

### 5.1 Admin oluşturma

Sınavlar bölümü yalnızca `real_exam` oluşturur. Form alanları:

- Sınav adı: zorunlu
- Açıklama
- Kategori: B Sınıfı veya İş Makinesi, zorunlu
- Süre: B Sınıfında varsayılan 45 dakika; İş Makinesinde 50 dakika
- Geçme notu: varsayılan `%70`, aralık 0–100
- PRO/ücretsiz durumu
- Yayın durumu

Süre 1–180 dakika arasında olmalıdır. Kullanıcı/admin süreyi değiştirebilir; kullanıcı
ekranı sabit 45/50 yazmak yerine kayıttaki gerçek süreyi kullanır.

### 5.2 Branş sözlüğü

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

Soru formu ve kart sayaçları seçilen köke göre aynı sözlüğü kullanır. İş Makinesi
sınavında B Sınıfı etiketi gösterilmez.

### 5.3 Yayınlama ve silme

- Geçerli kategori bulunmayan sınav yayınlanamaz.
- Aktif sorusu olmayan sınav yayınlanamaz.
- Yayınlanan sınav için uygulama içi bildirim ve FCM gönderilir.
- Hedef öncelikle sınav kategorisini seçmiş aktif kullanıcılardır; kategori tercihi
  boş/eski kullanıcılar geriye uyumluluk için dahil edilebilir.
- Geçersiz FCM token'lar temizlenir.
- Sınav silme fiziksel silme değildir; sınav ve bağlı aktif sorular pasife alınır.

### 5.4 Kullanıcı listesi

- Yalnızca `real_exam` ve legacy `exam` kayıtları listelenir.
- İsimde “deneme” aramak yerine `testType` kullanılır.
- Seçili kullanıcı kategorisi zorunlu kapsamdır.
- Üst karttaki süre gerçek sınav kaydından gelir; farklı süreler varsa “Sınava göre”
  ifadesi kullanılır.
- Kartta sınav adı, süre ve karma test bilgisi gösterilir.
- Hiç sınav yoksa açıklayıcı boş durum gösterilir; sınav başlatılmaz.

### 5.5 Sınav başlangıcı ve çözüm ekranı

- Başlangıç sheet'i süreyi, anlık doğru/yanlış gösterilmeyeceğini ve sonucun sınav
  sonunda açıklanacağını söyler.
- Sorular başarıyla yüklendikten sonra timer başlar.
- Sorular her oturumda karıştırılır; veritabanı ekleme sırası kullanıcıya taşınmaz.
- Şıklar seçilebilir ve sınav bitene kadar değiştirilebilir.
- Doğru seçenek sınav sırasında renk/metin ile açıklanmaz.
- Cevaplanan soru sayısı ayrıca, mevcut soru konumu ayrıca gösterilir.
- Soru listesi sheet'inde aktif, cevaplandı ve boş durumları ayrılır.
- Kullanıcı listeden herhangi bir soruya atlayabilir.
- Geri/X çıkışında ilerlemenin kaybolacağı onayı gösterilir.
- Son soruda `Sınavı Tamamla` aksiyonu gösterilir.
- Boş soru varsa `N boş soru yanlış kabul edilecek` uyarısı gösterilir.
- Kullanıcı `Sorulara Dön` veya `Sınavı Bitir` seçebilir.

### 5.6 Sonuç

- `score = correctCount / totalQuestions * 100` olarak hesaplanır.
- `passed`, sınavın `passingScore` değerine göre belirlenir; sabit 70 varsayılmaz.
- Sonuçta `examId`, `examName`, `testType`, kategori, toplam/doğru/yanlış, skor,
  geçen süre ve yanlış soru detayları backend'e gönderilir.
- Backend istemcinin sınav adı, kategori veya geçme kararına körü körüne güvenmez;
  `examId` ile aktif sınavı okuyup tür ve geçme notunu doğrular.
- İnternet yoksa Flutter sonucu kuyruğa alır ve sonraki açılışta gönderir.

### 5.7 React web aktarım durumu

- [x][F] [ ][R] Seçili kullanıcı kategorisine katı gerçek sınav filtresi.
- [x][F] [ ][R] Sınav adı yerine `testType` tabanlı gerçek/deneme ayrımı.
- [x][F] [ ][R] Kayıttaki gerçek süre ve `passingScore` kullanımı.
- [x][F] [ ][R] Soruları her oturumda karıştırma.
- [x][F] [ ][R] Yükleme sonrasında başlayan güvenli geri sayım.
- [x][F] [ ][R] Anlık doğru/yanlış göstermeyen seçilebilir/değiştirilebilir şıklar.
- [x][F] [ ][R] Soru listesi, hızlı geçiş ve cevap durumları.
- [x][F] [ ][R] Boş soru sayılı teslim uyarısı ve sınavdan çıkış koruması.
- [x][F] [ ][R] Dinamik geçme notu ve eksiksiz sonuç payload'ı.

## 6. Veri doğrulama kuralları

### Question

- En az iki şık olmalıdır.
- `correctAnswer` sıfır tabanlı bir indeksdir ve `options` sınırında olmalıdır.
- `short_test` için aktif konu `category` bağlantısı zorunludur, `exam` kullanılmaz.
- `mock_exam`, `real_exam` ve legacy `exam` için aktif `exam` bağlantısı zorunludur.
- Sorunun `testType` değeri bağlı sınavın `testType` değeriyle eşleşmelidir.
- `subject`, deneme/gerçek sınav sorusunda seçilen sınıfın branş sözlüğünden gelir.
- `media` URL'si mobil ve webde aynı güvenli URL çözümleme kuralından geçmelidir.

### Exam

- `categoryId` zorunludur ve aktif kategori olmalıdır.
- `duration`: 1–180 dakika.
- `passingScore`: 0–100.
- `testType`: `mock_exam|real_exam|exam`; yeni kısa test sınav kaydı yasaktır.
- Public kullanıcı yalnızca aktif ve yayınlanmış sınavı okuyabilir.
- Admin taslakları görebilir.

### ExamResult

- `examId` verilmişse geçerli Mongo kimliği ve aktif sınav olmalıdır.
- İstek `testType` değeri sınav türüyle eşleşmelidir.
- Sınav adı, kategori ve geçme notu mümkün olduğunda sınav kaydından alınır.
- Ondalıklı skor korunur; eski `correctAnswers` alanı legacy fallback olarak okunur.

## 7. Web uygulama sırası

1. Mevcut React admin `Sınav Yönetimi` route'unu üç alt görünümlü kabuğa dönüştür:
   Kısa Test, Deneme, Gerçek Sınav.
2. Ortak enum, kategori kökü ve branş yardımcılarını tek modüle çıkar.
3. Aynı route içindeki Kısa Test görünümünü konu bağlantısı ve sayaçlarla eşle.
4. Aynı route içindeki Deneme görünümünü sınav oluşturma + soru ekleme sırasıyla eşle.
5. Aynı route içindeki Gerçek Sınav görünümünü otomatik süre, sayaç ve yayın
   kurallarıyla eşle.
6. React mobil admin görünümünü Flutter kart/segment/form düzenine birebir yaklaştır;
   masaüstünde aynı bileşenleri daha geniş grid/tablo düzenine aç.
7. Kullanıcı listelerinde kategori ve `testType` filtrelerini eşle.
8. Deneme/gerçek çözüm ekranında karıştırma, timer, soru listesi ve çıkış korumasını eşle.
9. Sonuç payload'ı ve dinamik geçme notunu eşle.
10. Mobil ve masaüstü responsive görünümü ayrı ayrı kullanıcı gibi test et.

## 8. React web kabul testleri

- [ ] Admin `Sınav Yönetimi` içinde Kısa Test, Deneme ve Gerçek Sınav alt
  görünümlerinin üçüne de başka ana menüye gitmeden ulaşılır.
- [ ] Mobil React admin görünümü Flutter ile aynı segment sırası, kart bilgileri,
  birincil aksiyonlar ve taşmasız form davranışını kullanır.
- [ ] B Sınıfı kullanıcı İş Makinesi sınavı göremez.
- [ ] İş Makinesi kullanıcı B Sınıfı sınavı göremez.
- [ ] Deneme gerçek sınav listesine, gerçek sınav deneme listesine karışmaz.
- [ ] Aynı konu için ikinci kısa test başlığı oluşturulmaz; yeni sorular mevcut konu
  testine eklenir.
- [ ] 10'dan fazla kısa test sorusu listelenir ve çözülebilir.
- [ ] Sınav seçmeden deneme/gerçek sınav sorusu kaydedilemez.
- [ ] Soru türü ile sınav türü uyuşmazsa API hatası kullanıcıya gösterilir.
- [ ] B Sınıfı sınav formu 45, İş Makinesi formu 50 dakika ile açılır.
- [ ] Branş sayaçlarının toplamı karttaki toplam soru sayısıyla tutarlıdır.
- [ ] Aynı sınav iki kez başlatıldığında soru sırası değişebilir.
- [ ] Gerçek sınavda şık seçilince doğru cevap açıklanmaz.
- [ ] Seçilen cevap soru değiştirip geri dönünce korunur.
- [ ] Boş soruyla teslimde doğru boş soru sayısı gösterilir.
- [ ] Çıkışta ilerleme kaybı onayı gösterilir.
- [ ] Sınavın özel `passingScore` değeri geçti/kaldı sonucunu değiştirir.
- [ ] Soru görseli olan kayıtta görsel hem admin hem kullanıcı ekranında açılır.
- [ ] Dar mobil genişlikte başlık, branş dağılımı ve aksiyonlar taşmaz.

### 8.1 React admin uygulama kaydı (2026-08-04)

`ehliyet-kurs-webpage-main/src/pages/admin/AdminExams.jsx` ve
`src/utils/formValidation.js` üzerinde şu sağlamlaştırmalar uygulandı:

- Kısa testte ayrı `Exam/isMiniTest` oluşturma aksiyonu kaldırıldı; soru yalnızca
  seçilen yaprak konuya bağlanıyor.
- Kısa test görünümüne B Sınıfı / İş Makinesi segmenti ve segmente özel gerçek
  soru sayıları eklendi. Üst konu sayacı tüm alt seviyeleri özyinelemeli topluyor.
- Deneme/gerçek soru formunda sınav ve branş zorunlu hale getirildi; aktif sekmenin
  `testType` değeri form içinde değiştirilemiyor.
- CSV içe aktarmada sınav ve branş zorunlu; branş listesi seçilen sınavın B Sınıfı
  veya İş Makinesi kategorisine göre değişiyor.
- Yeni sınav süresi B Sınıfında 45, İş Makinesinde 50 dakika geliyor; süre 1–180,
  geçme notu 0–100 aralığında doğrulanıyor.
- Legacy `exam` okuma fallback'i gerçek sınav olarak ele alınıyor.
- Yayınlama ve kaldırma onay metinleri backend'in kategori hedefleme ve soft-delete
  davranışıyla eşlendi.
- Veri yükleme hatası artık boş liste gibi görünmüyor; hata açıklaması ve yeniden
  deneme aksiyonu gösteriliyor.
- İç içe `button` üreten kategori/sınav accordion başlıkları geçerli etkileşimli
  kapsayıcıya dönüştürüldü; mobil özet kontrolleri dar ekranda alt alta açılıyor.

Doğrulama: `npm run build` başarılıdır. Değiştirilen iki dosyanın ESLint kontrolü
hatasızdır. Proje geneli `npm run lint`, bu çalışma dışındaki mevcut 13 hata ve 5
uyarı nedeniyle henüz temiz değildir; bu durum sınav yönetimi aktarımının ayrı
teknik borcu olarak izlenmelidir. Görsel/mobil kabul maddeleri gerçek tarayıcıda
etkileşimli test yapılmadan işaretlenmemelidir.

Git kaydı ve ek testler (2026-08-04):

- Repo: `ehliyet-kurs-webpage-main`
- Branch: `feature/web-exam-management-flutter-parity`
- Commit: `c3c0771 feat: web sınav yönetimini Flutter akışıyla eşle`
- GitHub branch push işlemi başarılıdır; doğrudan `main` yerine incelemeye uygun
  feature branch kullanılmıştır.
- `validateQuestionForm` için kısa test geçerli/konusuz, deneme geçerli/sınavsız ve
  gerçek sınav branşsız olmak üzere 5 pozitif/negatif senaryo geçmiştir.
- Kısa testte ayrı sınav oluşturmama, kategori segmenti, 45/50 dakika varsayılanı,
  CSV sınav zorunluluğu, yeniden deneme durumu ve legacy tür fallback'i için 6 kaynak
  sözleşmesi kontrolü geçmiştir.
- Yerel Vite sunucusunda `/admin/exams` route'u HTTP olarak başarıyla yanıt vermiştir.

## 9. Tamamlanma ölçütü

React web aktarımı ancak yukarıdaki bütün `[ ][R]` maddeleri uygulandığında ve kabul
testleri geçtiğinde tamamlanmış sayılır. Sadece görsel benzerlik yeterli değildir;
API enumları, kategori kapsamı, soru bağlantıları, timer, karıştırma, sonuç ve hata
durumları Flutter ile davranışsal olarak eşleşmelidir.
