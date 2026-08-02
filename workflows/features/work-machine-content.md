# İş Makinesi Kitap İçeriği

## Kaynak ve kapsam

- Tam kaynak: `CamScanner 31.07.2026 17.18.pdf`
- Dosya 167 PDF sayfası / kitapta 170. sayfaya kadar içerik ve sorular içerir.
- Kaynak 1 Ağustos 2026 tarihinde Türkçe OCR ile baştan sona incelendi.
- Kitabın sekiz ana konusu İş Makinesi kökünün doğrudan çocuklarıdır.
- Ana konular yalnızca bölüm/klasör görevi görür: `content` alanları boştur ve doğrudan
  `short_test` sorusu taşımazlar.
- Konu anlatımları ile konu sonu kısa testleri yalnızca yaprak alt kategorilere bağlıdır.

## Ana konular

1. İş ve İşyeri ile İlgili Tanımlar
2. İş Sağlığı ve Güvenliği Mevzuatı
3. İş Makinesi Tür ve Çeşitleri
4. İşyerinde Temel İlk Yardım Bilgisi
5. Yangın Eğitimi
6. Meslek Adabı
7. Mesleki Gelişim
8. İşyeri Çalışma Talimatı

## Uygulanan yapı

- [x][B] Sekiz ana konu korundu.
- [x][B] Kitabın gerçek içeriğine göre 40 aktif yaprak konu oluşturuldu.
- [x][B] Her yaprak konuya Markdown biçiminde özet konu anlatımı eklendi.
- [x][B] Her yaprak konuya en az sekiz aktif `short_test` sorusu bağlandı.
- [x][B] Daha önce ana konulara bağlı 134 aktif kısa test, içeriklerine göre yaprak
  konulara taşındı.
- [x][B] Ana konularda konu anlatımı ve aktif kısa test kalmadığı doğrulandı.
- [x][B] Eski yapıyla çakışan sekiz alt kategori pasifleştirildi; veri silinmedi.
- [x][B] Kitaptaki tek levhalı sorulardan 25 tanesi Cloudinary `isg` klasöründeki
  gerçek varlıklarla eşleştirildi.
- [x][B] Yanlış `res.cloudinary.com/ehliyet-kurs/...` adreslerini kullanan 36 eski
  görsel soru silinmeden pasifleştirildi.

## Güncel yaprak konu dağılımı

- İş ve İşyeri ile İlgili Tanımlar: 3 konu
- İş Sağlığı ve Güvenliği Mevzuatı: 7 konu
- İş Makinesi Tür ve Çeşitleri: 7 konu
- İşyerinde Temel İlk Yardım Bilgisi: 4 konu
- Yangın Eğitimi: 5 konu
- Meslek Adabı: 3 konu
- Mesleki Gelişim: 3 konu
- İşyeri Çalışma Talimatı: 8 konu

Toplam: **40 aktif yaprak konu**.

## Kod ve komutlar

- Müfredat verisi:
  `scripts/seed/data/workMachineBookCurriculum.js`
- İdempotent kitap seed'i:
  `scripts/seed/seedWorkMachineBookCurriculum.js`
- İdempotent kısa test + sınav paketi seed'i:
  `scripts/seed/seedWorkMachineAssessmentPack.js`
- Salt-okunur yapı raporu:
  `scripts/tools/auditWorkMachineBookData.js`
- Önizleme:
  `npm run seed:work-machine-book`
- Kalıcı uygulama:
  `npm run seed:work-machine-book -- --apply`
- Kısa test ve sınav paketi önizleme:
  `npm run seed:work-machine-assessments`
- Kısa test ve sınav paketini uygulama:
  `npm run seed:work-machine-assessments -- --apply`
- Kitap yapısı ile sınav paketini birlikte uygulama:
  `npm run seed:work-machine-all`
- Denetim:
  `npm run audit:work-machine-book`

Seed varsayılan olarak dry-run çalışır. `--apply` kullanıldığında önce kategori ve soru
alt ağacını `scripts/backups/work-machine-book-*.json` dosyasına yedekler.

1 Ağustos 2026 uygulama yedeği:

`scripts/backups/work-machine-book-2026-08-01T18-16-34-923Z.json`

## Kısa test ve sınav paketi

- Kitap özetlerindeki doğrulanmış bilgilerden 40 yaprak konuya yedişer adet olmak
  üzere **280 ek kısa test sorusu** üretildi.
- Soru metinlerinde `kitapta verilen`, `anlatımına göre`, `konu özetine uygun` gibi
  kullanıcının kaynak kitabı okuduğunu varsayan kalıplar kullanılmaz. Bu kalıplarla
  oluşturulmuş 280 eski soru silinmeden pasifleştirildi ve bilgiler doğrudan ölçülen
  doğal soru cümleleriyle yeniden oluşturuldu.
- Açıklamalar yalnızca doğru bilginin öğretici gerekçesini içerir; kullanıcıya kaynak
  kitap adı veya `[Kaynak: ...]` etiketi gösterilmez.
- Önceden az sorusu bulunan konular dahil tüm aktif yapraklarda en az sekiz kısa test
  sorusu olduğu doğrulandı.
- Üç yayınlanmış deneme oluşturuldu: `İş Makinesi Deneme Sınavı 1–3`.
- Beş yayınlanmış gerçek sınav oluşturuldu: `İş Makinesi Gerçek Sınavı 1–5`.
- Her sınav 25 soru, 50 dakika, yüzde 70 geçme puanı ve tam 3 Cloudinary levha
  sorusu içerir. 25 soruda her soru 4 puandır; en az 18 doğru 72 puanla geçer.
- Aynı türdeki sınavlar arasında kaynak soru veya levha tekrarı yoktur: üç deneme
  kendi içinde, beş gerçek sınav da kendi içinde tamamen farklı sorulardan oluşur.
- Eski iş makinesi denemeleri ve geçersiz/eksik gerçek sınav taslakları silinmeden
  pasifleştirilir.
- Yeni sekiz sınava bağlı olmayan eski/bağlantısız sınav soruları da admin
  toplamlarını bozmaması için silinmeden pasifleştirildi.
- Sınav soruları kısa test kayıtlarını değiştirmez; `sourceQuestion` ile kaynak kısa
  testten ayrı bir sınav kopyası olarak tutulur.

Kitaptaki sekiz bölüm içerik ağacıdır; sınav branşı değildir. Sınav branşları MEB'in
ortak teorik ünitelerine göre dört tanedir. Dayanaklar:

- `https://ookgm.meb.gov.tr/meb_iys_dosyalar/2020_03/16160805_Greyder_Operatoru_Kurs_ProgramY.pdf`
- `https://ookgm.meb.gov.tr/www/yeni-is-makineleri-operatoru-kursu-programi/icerik/497`
- `https://ookgm.meb.gov.tr/meb_iys_dosyalar/2023_11/21134927_02155342_yy_makineleri_yonergesi_guncel.pdf`

Sınav başına konu dağılımı:

| Ana konu | Soru | Sistem değeri |
| --- | ---: | --- |
| İSG, Çevre Koruma ve Kalite Önlemleri | 16 | `operator_isg` |
| İş Makinesi Türleri ve Kullanım Alanları | 3 | `operator_machines` |
| Makine Nakil ve Trafik Güvenliği Mevzuatı | 3 | `operator_transport` |
| Meslek Etiği ve Mesleki Gelişim Faaliyetleri | 3 | `operator_ethics` |

Bu dört değer içerik ağacını değiştirmek için değil, admin soru ekleme ekranında
sorunun sınav branşını seçmek ve 25 soruluk sınavları MEB programındaki
`24 / 4 / 4 / 4` saatlik teorik eğitim ağırlığına yakın hazırlamak için kullanılır. Güncel
MEB yönergesindeki gerçek teorik sınav da 25 sorudur; `16 / 3 / 3 / 3` dağılımı ders
sürelerinden en yakın tam sayılara orantılanmıştır.

Değerlendirme davranışı:

- Kısa testte doğru cevapta açıklama açılmaz; yanlış cevapta doğru seçenek ve öğretici
  açıklama hemen gösterilir.
- Deneme ve gerçek sınavda işaretleme sırasında doğru/yanlış veya açıklama gösterilmez;
  cevaplar sınav teslim edildiğinde topluca değerlendirilir.

Son değerlendirme paketi yedeği:

`scripts/backups/work-machine-assessments-2026-08-01T19-14-16-994Z.json`

Web ve Flutter yönetim panellerindeki iş makinesi soru formu da aynı dört resmî teorik
branşı gösterir. B sınıfının dört branşı değiştirilmemiştir.

## Cloudinary levhaları

- Kaynak metadata: `exports/cloudinary-sign-metadata.json`
- Kullanılan bulut adı: `drysbbsd1`
- Kullanılan klasörler: `isg/01-*`, `isg/02-*`, `isg/03-*`, `isg/04-*`, `isg/05-*`
- Görsel sorular doğrudan `secure_url` kullanır ve erişilebilirlik açıklaması
  `mediaDescription` alanına yazılır.
- Dört resimli seçenek gerektiren kitap soruları mevcut soru modelinde seçenek görseli
  alanı bulunmadığı için tek levhalı soru biçimine dönüştürülmedi. Model genişletilirse
  bu sorular ayrıca eklenebilir.

## Doğrulanan sonuç

- Ana kategori içerik sayısı: `0`
- Ana kategori aktif kısa test sayısı: `0`
- Aktif yaprak kategori sayısı: `40`
- Sekizden az kısa testi olan aktif yaprak kategori: `0`
- Kitap seed'iyle eklenen temel konu sorusu: `40`
- Ek kısa test sorusu: `280`
- Pasifleştirilen kitap-referanslı eski kısa test sorusu: `280`
- Kaynak etiketi temizlenen açıklama: `764`
- Cloudinary ile eklenen tek levhalı soru: `25`
- Yayındaki deneme: `3 × 25 soru` (her birinde `3` farklı görsel ve `16 / 3 / 3 / 3` dağılımı)
- Yayındaki gerçek sınav: `5 × 25 soru` (her birinde `3` farklı görsel ve `16 / 3 / 3 / 3` dağılımı)
- Aynı tür içindeki yinelenen kaynak soru: `0`
- Aynı tür içindeki yinelenen levha: `0`
