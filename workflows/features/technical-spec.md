# TEKNİK ŞARTNAME VE VERİ MODELLERİ

## 5. PRO / FREE AYRIMI

- Bazı kategoriler `isPro: true` → kilitli görünür
- Test listesinde: ilk 5 ücretsiz, `index >= 5` → kilitli
- Kilitli → "Ödüllü Reklam İzle" modal veya Paywall
- Pro üyede her şey açık
- Admin panelinden manuel Pro verilebilir

## 5.1 WEB AUTH VE OTURUM GÜVENLİĞİ

- Web auth token kalıcı `localStorage` yerine `sessionStorage` içinde tutulur; eski `localStorage.token` her API başlangıcında temizlenir.
- `401` veya askıya alınmış kullanıcı `403` cevabında token, kullanıcı ve son ziyaret kategori cache'i temizlenerek login ekranına dönülür.
- Hesap silme sayfası web token'ı `sessionStorage` üzerinden okur; başarılı silme sonrası `sessionStorage` ve `localStorage` oturum verilerini temizler.
- `api/index.js` 401 interceptor'ı (2026-07-04): token geçersizleşince localStorage/sessionStorage temizlemenin yanı sıra `useAuthStore.getState().logout()` çağrılarak Zustand store'daki `user` state'i de sıfırlanır.
- `authStore.js` `logout` action'ı (2026-07-04): sessionStorage ve localStorage temizliğini kapsar; tüm oturum verisi tek noktadan temizlenir.

## 5.2 BACKEND GÜVENLİK ALTYAPISI (2026-07-04)

- `app.js`: `helmet` güvenlik başlıkları, express-rate-limit, compression, CORS origin listesi ve JSON payload boyut sınırı (`10mb`) eklendi.
- `auth.js` middleware: `TokenExpiredError` için ayrı `401` mesajı (`Token süresi dolmuş`); `optionalAuth` ile korumasız route'larda token varsa decode edilir, yoksa devam edilir.
- `userController.js`: ad, soyad, e-posta arama alanlarında regex injection koruması için `$regex` sorguları `escapeRegex` ile sanitize edilir.
- `authController.js`: profil güncelleme izin verilen alan listesi (`allowedFields`) ile güçlendirildi; şifre değiştirme mevcut şifre doğrulaması zorunlu; avatar yükleme Cloudinary'ye doğrudan; hesap silme cascade temizlik yapar.
- `examResultController.js`: `score` alanı `correctCount/totalQuestions*100` olarak normalize edilir; eski `correctAnswers` legacy fallback korunur; liderboard `userId` alanıyla döner.
- `postController.js`: yeni gönderi kimliği oturumdaki kullanıcıdan alınır; etiket sayısı en fazla 10'dur; yeni yorum eklenince gönderi sahibine `feed` tipinde bildirim gönderilir.
- `notificationController.js`: broadcast geçmişi `BroadcastHistory` modeline kaydedilir; `POST /notifications/broadcast` gönderim sonucu `sentCount`, `tokenCount`, `pushSent`, `errorDetails` döndürür; geçersiz FCM token'lar otomatik temizlenir.
- `badgeAwardService.js`: her sınav sonrası `exam_count`, `question_count`, `correct_count`, `streak`, `daily_goal`, `success_rate` kriterleri kontrol edilir; kazanılan rozetler `User.earnedBadges` dizisine eklenir ve `achievement` tipinde bildirim gönderilir.

---

## 6. PUAN / LEVEL / ROZET SİSTEMİ

| Puan | Seviye | Renk |
|------|--------|------|
| 0–99 | Stajyer Sürücü | Cyan |
| 100–499 | Usta Adayı | Purple |
| 500–999 | İleri Seviye | Orange |
| 1000+ | Usta Sürücü | Gold |

- Profil header'ında dairesel progress bar
- Rozet sistemi: 2000 soruya kadar tanımlı
- Streak: üst üste çalışılan gün sayısı
- Günlük hedef: kullanıcı belirler (5-100 soru)

---

## 7. TEKNİK NOTLAR

- JWT: `Authorization: Bearer <token>` header
- Token: localStorage
- Admin kontrolü: `role === 'admin'`
- Online: son 5 dakika içinde aktif
- Markdown: `react-markdown` önerilir
- Medya depolama ana kaynağı Cloudinary'dir. Base URL: `https://res.cloudinary.com/drysbbsd1/image/upload/f_auto,q_auto`. Flutter `lib/core/utils/media_url.dart`, React web `src/utils/mediaUrl.js` üzerinden `assets/images/signs/...`, `images/signs/...` ve `signs/...` path'lerini Cloudinary `trafik-levhalari/...` klasörüne; `isg/...` path'lerini Cloudinary `isg/...` klasörüne çevirir.
- Yeni medya dosyaları uygulama repo asset/public klasörlerine eklenmez. Kullanıcı dosyaları `.agent/content/` altında ilgili inbox klasörüne bırakır; ajan dosyaları Cloudinary'ye yükleyip projede mantıksal path veya doğrudan URL ile kullanıma bağlar. Klasör notları: `.agent/content/README.md`.
- Cloudinary upload komutları backend projesinden çalışır: `npm run upload:cloudinary-traffic-signs`, `npm run upload:cloudinary-isg-signs` ve gerektiğinde `npm run upload:cloudinary-content`. Genel script `scripts/tools/uploadCloudinarySigns.js`, `CLOUDINARY_UPLOAD_FOLDER` ile farklı hedef klasörleri destekler.
- Cloudinary klasör standardı: `trafik-levhalari/...` B sınıfı trafik levhaları, `isg/...` iş makinesi / İSG levhaları, `content/...` konu görselleri, `animasyonlar/...` animasyon dosyaları.
- Levha kütüphanesi seçimi kullanıcı `selectedCategoryName` değerinden türetilir. Trafik/B sınıfı kategoriler `trafik-levhalari` setini; iş makinesi, operatör, forklift, vinç, kazıcı/yükleyici, kepçe, G sınıfı, İSG veya iş güvenliği ifadeleri `isg` setini kullanır.
- Flutter levha ekranı İSG SVG dosyalarını doğrudan asset olarak paketlemez; `resolveServerMediaUrl` üzerinden Cloudinary dönüşümlü remote görsel olarak gösterir. Web tarafı da aynı mantıksal path'leri `resolveMediaUrl` ile çözer.
- Günün sözü: mobilde söz metni 350 karakterle sınırlandı; web de aynı sınırı input `maxLength` ve görüntüleme kırpmasıyla uygulamalı. Kayan yazı/fade maskesi harfleri kırpmamalı, özellikle Türkçe karakterlerde kenar payı bırakılmalı.
- Konu anlatımı sesli okuma: React web `window.speechSynthesis` ile, Flutter ise `flutter_tts` ile aynı Markdown ders metninin temizlenmiş plain-text halini okur; sesli okuma yalnızca mevcut ders içeriği için çalışır, quiz ve admin metinlerine genişletilmez.
- Video eğitimleri için yeni backend endpoint eklenmedi; Flutter tarafı mevcut `Category` kaydını içerik marker'larıyla kullanır. Video kategorileri `content` içinde `@[video_category]`, video kayıtları `content` içinde `@[video](url)` marker'ı ve notlar taşır. Normal kategori listelerinde bu marker'lı kayıtlar filtrelenir.
- Ders içeriği taslak/yayın/sürüm geçmişi yönetimi React web admin akışıdır. Flutter kullanıcı tarafı yalnızca public kategori endpointlerinden yayınlanmış `content` alanını okur; Flutter admin tarafında taslak UI bilinçli olarak kapsam dışıdır.
- Sürükle-bırak: `@dnd-kit/sortable`
- Tarih: ISO 8601
- Sayfalama: `?page=1&limit=50`
- Profil açılışında backend'den reload yap (puan önbellek sorunu)
- Dark/Light tema: tüm ekranlarda uyumlu olmalı
- Uygulama açılışında `GET /auth/config` çağır → versiyon kontrolü + reklam config
- Flutter production/release APK uzak sunucuyu kullanır: `https://api.ehliyetyolu.com/api`. Emulator/local test için ayrıca `--dart-define=API_BASE_URL=http://10.0.2.2:3000/api` verilir; telefona production APK atarken bu define kullanılmaz.
- Bakım modu public kontrolü `GET /api/status` ile yapılır. Bakım aktifken admin token'ı middleware'den geçer; normal kullanıcılar `503` ve `{ maintenance: true }` cevabı alır. Admin maintenance endpoint cevaplarında uyumluluk için hem `isMaintenance` hem `enabled` döner.
- Flutter kullanıcı route'ları bakım modunu açılışta ve periyodik gate kontrolüyle okur; admin panele erişim bakım modunda kilitlenmez. Aktif API istekleri 503 alırsa ekranda snack/uyarı görülebilir.
- İşlem günlükleri ekranındaki "Düşük Skorlar" sekmesi crash log değildir; `GET /admin/user-logs` `ExamResult.score < 50` kayıtlarını sınav adı, kategori, doğru/yanlış ve skor ile döndürür.
- Gerçek mobil crash/error kayıtları `POST /logs` üzerinden `logs/mobile_errors.log` dosyasına yazılır; şu an admin log UI'da ayrı dosya okuyucu yoktur.
- WrongAnswers backend DB'de tutulur (localStorage değil)
- Akıllı yanlış tekrar sistemi `WrongAnswer.reviewStage`, `nextReviewAt`, `lastReviewedAt`, `masteredAt` ve `reviewHistory` alanlarını kullanır; `wrong_review` test türü doğru cevapları ileriki bir güne bırakıp yanlışları bugüne geri alır; aynı soru 4 kez doğru yapılınca otomatik `masteredAt` set edilerek normal tekrar listesinden çıkarılır
- Yanlış tekrar endpointi `questionId` üzerinden orijinal `Question` kaydını da okuyarak soru metni, şıklar, doğru cevap, açıklama ve `media` alanını tamamlar; eski yanlış kayıtları API'yi patlatmadan tekrar testinde görselli gelir
- Admin dönüşüm/yolculuk analitiği hibrit çalışır: temel huni `User`, `ExamResult`, `WrongAnswer` kayıtlarından türetilir; kaynak, paywall, bildirim, kohort ve kullanıcı timeline verileri `AnalyticsEvent` üzerinden hesaplanır. `GET /admin/stats/journey?days=&source=` kayıt, kategori seçimi, ilk test, yanlış havuzu, yanlış tekrar, paywall ve PRO adımlarını; drop-off segmentlerini, event hunisini, kaynak performansını, kohortları ve riskli kullanıcıları döndürür.
- Admin kullanıcı timeline endpoint'i canlı `AnalyticsEvent` kayıtlarını öncelikli kullanır; eski kullanıcılar için `User`, `ExamResult` ve `WrongAnswer` kayıtlarından kayıt, kategori, test, yanlış tekrar ve öğrenildi hareketlerini türetir. Bu türetilmiş kayıtlar admin web ve Flutter UI'da teknik kaynak olarak değil "Geçmiş veri" olarak gösterilir.
- Web ve Flutter admin timeline UI JSON metadata bloğu göstermez; eventleri okunur açıklama ve etiketlere çevirir. Örnek etiketler: kategori, test, puan, doğru, yanlış, süre, durum, tekrar sonucu.
- Web ve Flutter client-only temaslar `POST /analytics/events` ile `platform`, `source`, `sessionId` ve `metadata` gönderir; server-side akışlar aynı modeli `analyticsService.trackEvent` ile besler.
- Kampanya takibi UTM mantığıyla yapılır:
  - `utm_source`: ana kaynak. Admin panelindeki kaynak filtresi bu alanı kullanır. Örnek: `instagram`, `google`, `tiktok`, `qr_poster`.
  - `utm_medium`: kanal tipi. Örnek: `story`, `reels`, `bio`, `cpc`, `poster`.
  - `utm_campaign`: kampanya adı. Örnek: `mayis_pro`, `direksiyon_baslangic`, `yaz_kampanyasi`.
  - `utm_content`: aynı kampanya içindeki kreatif/varyant. Örnek: `video_1`, `story_a`, `mavi_gorsel`.
  - `utm_term`: ücretli arama anahtar kelimesi için opsiyonel.
- Örnek Instagram story linki: `https://ehliyetyolu.com/register?utm_source=instagram&utm_medium=story&utm_campaign=mayis_pro&utm_content=story_a`
- Web helper bu değerleri `analytics_acquisition_context` olarak localStorage'a yazar; kayıt/giriş event'lerinde `metadata.acquisition` içinde backend'e gider. Admin kaynak filtresi şimdilik `source` kırılımını gösterir; kampanya bazlı rapor istendiğinde `AnalyticsEvent.metadata.acquisition.campaign` üzerinden group yapılmalıdır.
- selectedCategoryId hem localStorage hem backend DB'de saklanır
- Kişisel günlük çalışma planı `GET /stats/daily-plan` ile üretilir. Endpoint kullanıcının sınav tarihini, günlük hedefini, bugünkü soru sayısını, zamanı gelen yanlışlarını ve konu bazlı başarı oranlarını okuyarak dashboard için `title`, `subtitle`, `primaryAction`, `progress`, `dueWrong`, `weakTopics` ve sıralı `tasks[]` döndürür. Öncelik sırası: sınıf seçimi, zamanı gelen yanlışlar, zayıf konu, günlük hedef, yakın sınav için deneme sınavı.
- Flutter `SharedPreferences` ilerleme anahtarları:
  - `completed_category_<categoryId>`: kısa test `%70+` başarıyla geçildiğinde `true`
  - `last_visited_id`, `last_visited_name`, `last_visited_icon`: devam kartının hedefi
  - `last_visited_type`: `content` veya `short_test`; dashboard devam kartı konu/test ayrımını bununla yapar
  - `last_visited_ts`: son ziyaret zamanı
- FCM token: giriş sonrası `POST /notifications/fcm-token` ile kaydet
- FCM token: uygulama zaten login halde açılırsa da tekrar kaydedilir; token yenilenirse backend'e yazılır
- Günlük hatırlatıcı: kullanıcı `notifEnabled`, `notifHour`, `notifMinute` değerlerini kaydeder; backend cron Türkiye saatiyle her dakika kontrol edip seçilen saatte push + in-app bildirim gönderir
- Lokal günlük hatırlatıcılar çift bildirim riski nedeniyle temizlenir; ana kaynak backend cron'dur
- Admin broadcast / hedefli bildirim / yeni sınav / destek mesajı akışları hem `Notification` kaydı hem FCM push üretir
- Web push için FCM web SDK kullanılacak
- Rate limiting: backend'de mevcut, 429 hatalarını handle et
- Gönderi formu için etkin Mongo model sınırı başlıkta 200, içerikte 2000 karakterdir. Controller sabitleri şu an daha yüksek (`300/5000`) olduğundan web ve Flutter formları backend katmanları eşitlenene kadar düşük model sınırını esas almalıdır.
- İçerik raporunda `questionId` ve `postId` alanlarından yalnızca biri bulunur. Kullanıcı aynı hedef için birden fazla açık rapor oluşturamaz ve kendi gönderisini raporlayamaz.

---

## 8. VERİ MODELLERİ (Gerçek Backend Alanları)

```
User {
  _id, email, firstName, lastName, phone, role (user|admin),
  proStatus, totalScore, level, avatarUrl, bio,
  fcmToken, isActive, selectedCategoryId, selectedCategoryName,
  lastActiveAt, dailyGoal, notifEnabled, notifHour, notifMinute,
  theme (default|emerald|midnight|obsidian|sunset|lavender|ruby|arctic|amethyst),
  earnedBadges[{ badgeId, earnedAt }],
  aiPromptCount, lastAiPromptAt, aiRewardCredits, premiumQuestionCredits,
  adUnlockedExamIds[], rewardedAdWatchCount
}

Category {
  _id, name, color, icon, isPro, content (markdown),
  draftContent, publicationStatus (draft|published|published_with_draft),
  publishedAt, lastDraftSavedAt, contentVersions[],
  order, parentId (null = ana kategori), description
  # video marker kullanımı:
  # content contains "@[video_category]" => video kategori kaydı
  # content contains "@[video](url)" => video ders kaydı
}

Question {
  _id, text, options[], correctAnswer (index),
  testType (short_test|mock_exam|real_exam|exam),
  subject (B: trafik|ilkyardim|motor|adabi; İş Makinesi:
  operator_isg|operator_machines|operator_transport|operator_ethics|''),
  media (URL), explanation,
  difficulty (easy|medium|hard), coefficient,
  category (ref), exam (ref),
  correctCount, wrongCount, isActive
}

- Görsel ağırlıklı eski kayıtlar için `options[]` bazen boş gelebilir; UI ve seed akışı boş şıkları `A/B/C/D` fallback ile normalize eder, yeni kayıtlarda boş seçenek kabul edilmez.

Exam {
  _id, name, description, duration (dk), categoryId,
  isPro, isActive, isPublished, isMiniTest,
  testType (short_test|mock_exam|real_exam|exam),
  passingScore (0..100, varsayılan 70), order
}

- Yeni sınav kaydı için Flutter admin iş bölümü: `real_exam` Sınav Yönetimi;
  `mock_exam` İçerik > Deneme; `short_test` İçerik > Kısa Test. React admin bu üç
  türü tek Sınav Yönetimi route'undaki Kısa Test / Deneme / Gerçek Sınav alt
  görünümlerinde yönetir. Kısa test hiçbir platformda ayrı `Exam` kaydı oluşturmaz;
  yaprak konuya bağlı `Question.category` grubu testtir.
- Gerçek sınav/deneme ana kategorisi yalnızca B Sınıfı veya İş Makinesi/Operatör/İSG kökü olabilir.
- Branş etiketi sınavın kategori üst zincirinden türetilir; İş Makinesi sınavında B Sınıfı branş etiketleri kullanılmaz.
- Yeni sınavda kategori zorunludur. Süre 1–180 dakika, geçme notu 0–100
  aralığında doğrulanır. Süre verilmezse B Sınıfı 45, İş Makinesi 50 dakikadır.
- Sınav aktif kategoriye bağlı değilse veya kendi `testType` değerinde aktif sorusu
  yoksa yayınlanamaz. Public kullanıcı yalnızca aktif ve yayınlanmış sınavı okuyabilir.
- Sınav silme soft-delete davranışıdır: sınav ve bağlı aktif sorular pasife alınır;
  geçmiş `ExamResult` referansları korunur.

Question bağlantı değişmezleri:

- `short_test`: aktif yaprak `category` zorunlu, ayrı `exam` kullanılmaz.
- `mock_exam|real_exam|exam`: aktif `exam` zorunlu ve soru/sınav `testType`
  değerleri birebir eşleşmelidir.
- Yeni soruda en az iki seçenek bulunmalı; `correctAnswer` sıfır tabanlı geçerli
  `options[]` indeksi olmalıdır.
- Deneme ve gerçek sınav soruları kullanıcı oturumu başlarken istemci tarafında
  karıştırılır; veritabanı sırası cevap ezberine dönüşmez.

ExamResult {
  _id, user (ref), examId, examName, testType,
  categoryId, categoryName,
  totalQuestions, correctCount, wrongCount,
  score, passed, duration (saniye),
  wrongQuestions[{ questionId, questionText, userAnswer, correctAnswer, options, explanation, media }]
}

- `score` yüzde olarak tutulur (`correctCount / totalQuestions * 100`), ondalıklı olabilir; admin ve kullanıcı ekranları bunu `num/double` olarak okumalıdır.
- Eski sonuçlarda doğru cevap alanı `correctAnswers` adıyla gelebilir; backend/UI katmanları `correctCount` öncelikli, legacy fallback destekli olmalıdır.
- `examId` içeren sonuçta backend aktif sınavı yeniden okur; `examName`, kategori,
  `testType` ve `passingScore` için sınav kaydı otoritedir. İstemcinin geçti/kaldı
  kararı tek başına güvenilir kabul edilmez.
- `passed`, sınavın `passingScore` değerine göre hesaplanır. `duration` sonuçta
  saniye, `Exam.duration` alanında dakika cinsindedir.

WrongAnswer {
  _id, user (ref), questionId, questionText,
  options[], correctAnswer, userAnswer, explanation,
  categoryId, categoryName, testType,
  wrongCount, lastWrongAt,
  reviewStage, nextReviewAt, lastReviewedAt, masteredAt,
  reviewHistory[{ result, reviewedAt, stageBefore, stageAfter }],
  media
}

AnalyticsEvent {
  _id, user (ref|null), eventType,
  source, platform, sessionId,
  metadata, ip, userAgent,
  createdAt, updatedAt
}

Post {
  _id, userId, userName, type (discussion|question|exam_share|tip),
  title, content, tags[], status (pending|approved|rejected),
  likes[], comments[{ userId, userName, text }]
}

Report {
  _id, targetType (question|post),
  questionId (ref|null), postId (ref|null), userId (ref),
  reason (wrong_answer|wrong_question|typo|inappropriate|spam|harassment|misinformation|copyright|other),
  description, status (open|resolved|rejected),
  createdAt, updatedAt
}

ContactMessage {
  _id, userId, subject,
  messages[{ sender (user|admin), text, sentAt }],
  status (new|read|replied|closed)
}

Quote { _id, text, author, isActive }
# Client kuralı: text max 350 karakter

Badge {
  _id, name, description, icon, color,
  type (exam_count|question_count|correct_count|streak|daily_goal|success_rate),
  requiredValue, earnedCount, isActive
}

Notification {
  _id, user (ref), title, message,
  type (system|social|achievement|alert|feed|exam|broadcast|targeted|chat_message|support),
  isRead, data, createdAt
}

BroadcastHistory {
  _id, title, body, target (all|pro|free|waiting_first_test),
  sentCount, createdBy
}

SubscriptionPlan {
  _id, planId, name, description, price, currency,
  period (monthly|yearly|lifetime|biweekly),
  discountPercent, isActive, features[], sortOrder
}

Coupon {
  _id, code, discountType (percent|fixed), discountValue,
  applicablePlans[], maxUsage, usedCount,
  maxUsagePerUser, expiresAt, isActive, description
}

DrivingSchool {
  _id, name, city, district, neighborhood, address, phone,
  locationUrl, websiteUrl, contactEmail, licenseClasses[],
  description, isSponsored, sponsorLabel, sponsorPriority,
  sponsorStartAt, sponsorEndAt, sponsorNote, isActive,
  source, sourceUrl, lastSyncedAt
}

SchoolApplication {
  _id, schoolId, schoolName, schoolCity, schoolDistrict,
  schoolContactEmail, userId, userName, userEmail, userPhone,
  userCity, message, adminMailSent, schoolMailSent, status (pending|contacted|cancelled),
  requestedLicenseClass, preferredPeriod
}
```
