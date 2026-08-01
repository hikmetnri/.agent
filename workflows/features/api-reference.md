# 4. BACKEND API NOTLARI

Base URL: `/api`

```
# Public/System
GET    /status                   ← public: bakım modu durumu (`maintenance`)
POST   /logs                     ← mobil Flutter crash/error loglarını `logs/mobile_errors.log` dosyasına yazar

# Auth
POST   /auth/register
POST   /auth/login
POST   /auth/google
POST   /auth/forgot-password
GET    /auth/config              ← uygulama açılışında versiyon + reklam config
PUT    /auth/config              ← admin: reklam config güncelle
GET    /auth/me
PUT    /auth/profile
PUT    /auth/change-password
POST   /auth/avatar
DELETE /auth/me                  ← hesap sil
GET    /auth/admin-stats

# Users
GET    /users?page=&limit=&search=&filter=&sort=
       filter: all|user|admin|pro|active|suspended|online|waiting_first_test
       response: { users, total, page, pages, summary: { totalUsers, adminCount, proCount, suspendedCount } }
GET    /users/:id
PUT    /users/:id/role
PUT    /users/:id/pro
PUT    /users/:id/status            ← admin: kullanıcıyı askıya al / aktif et (`isActive`)
DELETE /users/:id
GET    /users/me                    ← kullanıcının profil/ödül özet alanları
GET    /users/settings              ← kullanıcı: günlük hedef + bildirim ayarları
PUT    /users/settings              ← kullanıcı: dailyGoal, notifEnabled, notifHour, notifMinute
GET    /users/favorites
POST   /users/favorites/:questionId
DELETE /users/favorites/:questionId

# Categories
GET    /categories
GET    /categories/all
GET    /categories/admin/all        ← admin: taslak/gizli dahil tüm kategori listesi
POST   /categories
PUT    /categories/:id
DELETE /categories/:id
       Not: Flutter video eğitimleri şimdilik Category üzerinden tutulur.
       content marker'ları: "@[video_category]" ve "@[video](url)".
       `publicationAction=save_draft|publish` ile ders içeriği taslak/yayın akışı yönetilir.

# Questions
GET    /questions
POST   /questions
PUT    /questions/:id
DELETE /questions/:id
POST   /questions/bulk-csv          ← admin: CSV toplu soru ekleme

# Exams
GET    /exams?categoryId=&testType= ← `testType`: short_test | mock_exam | real_exam | exam
POST   /exams
PUT    /exams/:id
DELETE /exams/:id

# ExamResults
GET    /exam-results
POST   /exam-results
GET    /exam-results/stats
GET    /exam-results/leaderboard?period=daily|weekly|monthly|all
GET    /exam-results/user/:userId/stats        ← admin
GET    /exam-results/analytics/:examId         ← admin

# Study Plan / User Stats
GET    /stats/daily-plan                       ← kullanıcı: günlük çalışma planı
       response.data: { title, subtitle, primaryAction, progress, exam, dueWrong, weakTopics, tasks[] }
       tasks[].type: select_category | wrong_review | weak_topic | daily_goal | mock_exam
       primaryAction.type: select_category | wrong_review | lesson | short_test | mock_exam

# Analytics
POST   /analytics/events                       ← kullanıcı: client event kaydı
       body: { eventType, metadata?, source?, platform?, sessionId? }
       campaign metadata önerisi:
       {
         "eventType": "paywall_seen",
         "source": "instagram",
         "platform": "web",
         "sessionId": "...",
         "metadata": {
           "surface": "lesson_lock",
           "acquisition": {
             "source": "instagram",
             "medium": "story",
             "campaign": "mayis_pro",
             "content": "story_a",
             "term": "",
             "landingPath": "/register"
           }
         }
       }
GET    /analytics/users/:userId/timeline       ← admin: kullanıcı event timeline'ı
       Canlı `AnalyticsEvent` kayıtlarını döndürür; eski kullanıcılar için `User`, `ExamResult`
       ve `WrongAnswer` kayıtlarından türetilmiş geçmiş hareketleri de ekleyebilir.
       Türetilmiş kayıtlar UI'da "Geçmiş veri" olarak gösterilir, JSON metadata doğrudan
       admin kullanıcıya gösterilmez.

# WrongAnswers
GET    /wrong-answers
POST   /wrong-answers
POST   /wrong-answers/bulk
       wrong_review cevabında `summary: { correctCount, masteredCount, postponedCount, wrongCount }` döner
GET    /wrong-answers/review-due?limit=&categoryId=&subject=       ← kullanıcı: bugün tekrar edilmesi gereken yanlışlar (`count` toplam due, `returnedCount` dönen liste)
POST   /wrong-answers/:questionId/review                           ← kullanıcı: tekrar sonucu (`correct|wrong|skip`)
POST   /wrong-answers/:questionId/mastered                         ← kullanıcı: soruyu öğrendim olarak işaretle
DELETE /wrong-answers/:questionId

# AI (Yapay Zeka)
POST   /ai/chat                      ← kullanıcı: DeepSeek ile chatleşme (Giriş zorunlu, standart üye için günlük limit: 20)

# Rewards & Ads
GET    /rewards/me                   ← kullanıcı: reklam/ödül durumunu getir (AI kredileri, reklam izleme sayısı vb.)
POST   /rewards/ad-completed         ← kullanıcı: izlenen reklamı bildir ve ödül al; body: { rewardType: 'ai'|'premium_question', examId? }


# Posts (Feed)
GET    /posts?page=&limit=&type=               ← kullanıcı: yalnızca onaylı akış
POST   /posts                                  ← kullanıcı: pending gönderi oluşturur
GET    /posts/user/:userId
GET    /posts/:id
POST   /posts/:id/like
POST   /posts/:id/comment
POST   /posts/:id/comment/:commentId/like
GET    /posts/admin/all?status=                ← admin
GET    /posts/admin/pending                    ← admin
PATCH  /posts/:id/approve                      ← admin
PATCH  /posts/:id/reject                       ← admin
DELETE /posts/:id                              ← admin

# Contact (Destek)
GET    /contact                      ← admin: tüm talepler
GET    /contact/my                   ← kullanıcı: kendi talepleri
POST   /contact
GET    /contact/:id                  ← admin: tekil talep
POST   /contact/:id/reply            ← admin yanıtı
POST   /contact/:id/user-reply       ← kullanıcı yanıtı
PUT    /contact/:id                  ← durum güncelle (kapat)

# Quotes
GET    /quotes
POST   /quotes
PUT    /quotes/:id
DELETE /quotes/:id
       Client kuralı: text max 350 karakter.

# Badges
GET    /badges
POST   /badges
PUT    /badges/:id
DELETE /badges/:id
GET    /badges/:id/earned-users     ← rozeti kazanan kullanıcılar

# Subscriptions
GET    /subscriptions/settings       ← admin/web: abonelik satış ve satın alma doğrulama ayarları
PUT    /subscriptions/settings       ← admin/web: `{ enabled }` ile satış ekranı aç/kapat

# Stats
GET    /stats/overview               ← admin: genel özet
GET    /stats/categories             ← admin: kategori bazlı
GET    /stats/daily-goals            ← admin: günlük hedef dağılımı
GET    /stats/difficult-questions    ← admin: en çok yanlış sorular
GET    /stats/qr                     ← admin: QR tarama istatistikleri
GET    /stats/journey?days=&source=  ← admin: dönüşüm hunisi + event/kohort/kaynak analitiği
       `source=instagram` gibi kullanılır; ileride kampanya filtresi için `metadata.acquisition.campaign` kırılımı eklenebilir.
GET    /stats/my-categories          ← kullanıcı: kendi kategori istatistikleri
GET    /stats/user-categories/:id    ← admin: belirli kullanıcının istatistikleri
GET    /stats/qr/track               ← public: QR tarama kaydı

# Notifications
GET    /notifications
PUT    /notifications/mark-all-read
PUT    /notifications/:id/read
DELETE /notifications/:id
DELETE /notifications
POST   /notifications/fcm-token
POST   /notifications/send-global              ← admin: tüm kullanıcılara sistem bildirimi
POST   /notifications/broadcast              ← admin
       body: { title, body, target: all|pro|free|waiting_first_test, imageUrl? }
       response: { success, sentCount, tokenCount, pushSent, errorDetails, data }
POST   /notifications/targeted               ← admin: seçili kullanıcılara bildirim
GET    /notifications/broadcast-history      ← admin: `{ data, audience: { all, pro, free, waiting_first_test } }`
DELETE /notifications/broadcast-history/:id  ← admin
GET    /notifications/debug-tokens            ← admin: FCM token istatistikleri

# Upload (Admin only)
POST   /upload

# Admin
GET    /admin/maintenance-status    ← admin: `{ isMaintenance, enabled }`
POST   /admin/maintenance           ← admin: bakım modu aç/kapat; `{ isMaintenance, enabled }`
GET    /admin/backup
GET    /admin/logs                  ← admin işlem logları
GET    /admin/user-logs             ← düşük skor logları; `ExamResult.score < 50`, `{ logs, total, page, pages }`

# Subscriptions
GET    /subscriptions/plans
GET    /subscriptions/admin/plans        ← admin: pasifler dahil
POST   /subscriptions/plans              ← admin
PUT    /subscriptions/plans/:planId      ← admin
DELETE /subscriptions/plans/:planId      ← admin
GET    /subscriptions/info
POST   /subscriptions/verify
POST   /subscriptions/validate-coupon
GET    /subscriptions/coupons            ← admin
POST   /subscriptions/coupons            ← admin
PUT    /subscriptions/coupons/:id        ← admin
DELETE /subscriptions/coupons/:id        ← admin

# Reports
POST   /reports                         ← kullanıcı: soru veya gönderi raporla
       body: { questionId?, postId?, reason, description? }; hedeflerden yalnızca biri zorunlu
GET    /reports?status=&targetType=     ← admin
       questionId ve postId hedefe göre populate edilir
PUT    /reports/:id/status             ← admin: open|resolved|rejected
DELETE /reports/:id                    ← admin

# Driving Schools & Applications
GET    /driving-schools                          ← public: list active schools, supports ?city=&district=&q=&isSponsored=
GET    /driving-schools/:id                      ← public: get school details
POST   /driving-schools                          ← admin: create driving school
PUT    /driving-schools/:id                      ← admin: update driving school / sponsor status
DELETE /driving-schools/:id                      ← admin: delete driving school
POST   /driving-schools/:id/apply                ← user: apply to driving school
GET    /driving-schools/applications             ← admin: get all applications, supports filters ?status=&q=
PUT    /driving-schools/applications/:id         ← admin: update application status
DELETE /driving-schools/applications/:id         ← admin: delete application
```
