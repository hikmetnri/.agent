# Cloudinary Klasör Yapısı (Birebir Eşleşme Rehberi)

Bu klasör, Cloudinary'deki (`drysbbsd1`) **medya klasör yapısının birebir kopyasıdır**.

> 🎯 **Amaç:** Yeni bir konu / resim / animasyon / levha ekleyeceğin zaman dosyayı **buradaki doğru klasöre** at. Böylece Cloudinary'e yüklerken klasör adı aynı olur, her şey otomatik eşleşir.

---

## 📁 Yapı Özeti

```
cloudinary-yapisi/
├── animasyonlar/          → Cloudinary: animasyonlar/       (0 dosya — boş, hazır)
├── content/               → Cloudinary: content/            (51 konu resmi)
│   ├── trafik_gorevlisi/  → Cloudinary: content/trafik_gorevlisi/ (7 resim)
│   └── b-class-questions/ → Cloudinary: content/b-class-questions/ (108 soru resmi)
│       ├── 7-haziran-2026/
│       ├── 8-haziran-2026/
│       ├── deneme-1/ … deneme-5/
│       ├── sinav-1/
│       └── sinav-2/
├── isg/                   → Cloudinary: isg/                (296 levha)
│   ├── 01-zorunlu-talimatlar/        (70)
│   ├── 02-uyari-ve-tehlike/          (50)
│   ├── 03-yasak-isaretleri/          (79)
│   ├── 04-acil-durum-ve-ilk-yardim/  (77)
│   └── 05-yangin-guvenligi/          (20)
└── trafik-levhalari/      → Cloudinary: trafik-levhalari/    (269 levha)
    ├── Bilgi_B/   (118)
    ├── Park_P/    (6)
    ├── Tanzim_TT/ (91)
    └── Tehlike_T/ (54)
```

**Toplam: 731 medya dosyası** (2026-08-02 tarihli Cloudinary anlık görüntüsü)

---

## 🗂️ Her Klasörde Ne Var?

Her klasörün içinde `MEVCUT_DOSYALAR.md` dosyası var. O dosya, o klasörde **Cloudinary'de şu anda hangi dosyaların olduğunu** listeler. Yeni dosya eklerken:
1. İlgili klasöre gir
2. `MEVCUT_DOSYALAR.md`'ye bak — isimlendirme kuralını gör
3. Aynı kurala uyarak dosyayı klasöre at
4. Codex'e: "`.agent/content/cloudinary-yapisi/<klasör>` içine X dosyasını koydum, Cloudinary'ye yükle"

---

## 📝 İsimlendirme Kuralları

| Klasör | Kural | Örnek |
|---|---|---|
| `content/` (konu resimleri) | küçük harf + alt çizgi | `aktif_pasif_guvenlik.png` |
| `content/trafik_gorevlisi/` | küçük harf | `dur.png`, `gec.png` |
| `content/b-class-questions/…` | `soru-NN` | `soru-13` |
| `trafik-levhalari/*` | resmi levha kodu | `b-1`, `tt-1`, `t-1`, `p-1` |
| `isg/*` | ISO 7010 kodu | `M001`, `W073`, `P074`, `E001`, `F001` |
| `animasyonlar/` | konu adı | (yeni — sen belirle) |

---

## 🔄 Nasıl Kullanılır?

### Yeni konu resmi eklerken
```
.agent/content/cloudinary-yapisi/content/yeni_konu_resmi.png
```
→ Cloudinary'e `content/yeni_konu_resmi` olarak yüklenir.

### Yeni trafik levhası eklerken
```
.agent/content/cloudinary-yapisi/trafik-levhalari/Tanzim_TT/tt-100.png
```
→ Cloudinary'e `trafik-levhalari/Tanzim_TT/tt-100` olarak yüklenir.

### Yeni ISG levhası eklerken
```
.agent/content/cloudinary-yapisi/isg/03-yasak-isaretleri/genel-yasaklar/P100.png
```
→ Cloudinary'e `isg/03-yasak-isaretleri/genel-yasaklar/P100` olarak yüklenir.

### Animasyon eklerken
```
.agent/content/cloudinary-yapisi/animasyonlar/ motor_calisma.gif
```
→ Cloudinary'e `animasyonlar/motor_calisma` olarak yüklenir.

---

## ⚠️ Notlar

- **Yeni konu / kategori eklersen** bu klasör ağacına da aynı isimle klasör aç — Cloudinary'deki ile eşleşsin.
- Bu klasör **yapı rehberidir**; gerçek yedek görseller `content-images/`, `signs/` klasörlerinde durur.
- Listeler güncel olmayabilir → güncel durumu Cloudinary'den çekmek için Codex'e sor.
