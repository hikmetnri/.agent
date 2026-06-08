# Kategori Bazlı Analiz ve İstatistik Görevleri

Amaç: Kullanıcı hesabı, PRO durumu, XP/seviye ve günlük hedef gibi üst seviye metrikler ortak kalacak; ders ilerlemesi, test sonuçları, yanlışlar, zayıf konular, levha çalışma mantığı ve analizler seçili eğitim kategorisine göre ayrı gösterilecek.

## Faz 1 - Flutter

- [x] Sınav istatistiklerini seçili ana kategori ağacına göre filtrele.
  - B sınıfı seçiliyken B sınıfı ve alt kategori sonuçları görünsün.
  - İş makinesi / İSG seçiliyken iş makinesi kategori ağacı sonuçları görünsün.
  - Genel XP, seviye ve kullanıcı profili ortak kalabilir.
- [x] Analiz ekranında kategori filtresi davranışını netleştir.
  - Varsayılan: seçili eğitim paketi.
  - Opsiyonel görünüm: Tümü / Seçili eğitim ileride ayrıca switch olarak eklenebilir.
- [x] Yanlışlar ve zamanı gelen tekrarların mevcut scoped davranışını doğrula.
  - Yanlış tekrar ana çalışma planını seçili kategoriye göre beslemeli.
  - “Tüm yanlışlar” ileride ayrı filtre olarak eklenebilir.
- [ ] Flutter cihaz testi.
  - B sınıfı seçiliyken trafik istatistikleri / yanlışları / levhaları.
  - İş makinesi seçiliyken İSG istatistikleri / yanlışları / levhaları.

## Faz 2 - Web

- [x] Web dashboard istatistik kartlarını seçili kategoriye göre filtrele.
- [x] Web analiz/istatistik sayfasını varsayılan seçili eğitim paketine göre filtrele.
  - Tümü / Seçili eğitim switch'i ileride görünür kontrol olarak eklenebilir.
- [x] Web yanlış tekrar akışını seçili kategoriye göre filtrele.
  - Dashboard, sınav merkezi, yanlışlar sayfası ve yanlış tekrar çözümü aynı kategori ağacını kullanır.
- [x] Web zayıf konu / çalışma planı önerilerini seçili kategoriye göre ayrıca sıkılaştır.
  - Backend günlük plan cevabı `categoryId` ile kategori ağacına göre filtrelenir.
  - UI yanlış tekrar tarafı da aynı seçili kategori ağacını kullanır.
- [x] Admin kullanıcı detaylarında kategori bazlı analiz gösterimini ekle.
  - Kullanıcı analiz modalında kategori performans kırılımı görünür.

## Kalıcı Kural

- Backend kayıtlarında `categoryId` ve `categoryName` korunur.
- UI varsayılan olarak seçili eğitim paketinin verisini gösterir.
- “Tümü” görünümü genel kullanıcı özetidir; çalışma planı ve yanlış tekrar gibi yönlendirici akışlar kategori karıştırmaz.
