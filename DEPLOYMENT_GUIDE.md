# 🚀 Ehliyet Kurs - Production Deployment Guide

**Version:** 26.7.0+32  
**Status:** ✅ Security & Bug Testing Complete  
**Date:** August 5, 2026

---

## 📋 Pre-Deployment Checklist

### ✅ Completed Tasks
- [x] Security testing (6 critical issues resolved)
- [x] Bug testing (Web: 33 issues, Flutter: 20+ issues documented)
- [x] Version bumped (26.6.2 → 26.7.0)
- [x] Flutter App Bundle built (63.0MB signed)
- [x] CSRF protection implemented
- [x] Rate limiting configured
- [x] XSS prevention active
- [x] Token security hardened
- [x] All changes pushed to GitHub

### ⏳ Pending (Deadline: August 31, 2026)
- [ ] Google Play Billing Update (in_app_purchase v3.3.0 → v4.1.0)

---

## 🏗️ Deployment Architecture

### Backend (Node.js + Express)
- **Location:** `/Users/hikmet/Desktop/Proje/ehlihet-kurs-backend-main`
- **Branch:** `feature/exam-system-validation`
- **Last Commit:** `acbde9b` (Final security test report)
- **Security:** CSRF, Rate Limiting, Path Traversal Protection ✓

### Web (React + Vite)
- **Location:** `/Users/hikmet/Desktop/Proje/ehliyet-kurs-webpage-main`
- **Branch:** `feature/web-exam-management-flutter-parity`
- **Last Commit:** `be8b83c` (Final security test report)
- **Security:** XSS Prevention, CSRF Token Support ✓

### Mobile (Flutter)
- **Location:** `/Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main`
- **Branch:** `feature/flutter-user-panel-fixes`
- **Last Commit:** `e129fc6` (Keychain accessibility fix)
- **Version:** 26.7.0+32
- **App Bundle:** `/Users/hikmet/Desktop/Proje/surumler/app-release-v26.7.0-signed.aab` (60MB)
- **Security:** Token security, Secure Storage ✓

---

## 📦 Build & Release Steps

### 1️⃣ Flutter Mobile (Google Play Store)

#### Prerequisites
- Xcode 14+ (macOS)
- Android Studio 2022+
- Flutter SDK 3.11.0+
- Signed keystore (.jks file)

#### Build Commands
```bash
cd /Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main

# Clean previous builds
flutter clean

# Get dependencies
flutter pub get

# Build APK (for testing)
flutter build apk --release
# Output: build/app/outputs/apk/release/app-release.apk

# Build App Bundle (for Google Play)
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

#### Deployment to Google Play Store
1. Sign in to [Google Play Console](https://play.google.com/console)
2. Select app: **Ehliyet Yolu** (com.example.machxacademy)
3. Navigate to **Release** → **Production**
4. Upload signed `.aab` file from `surumler/app-release-v26.7.0-signed.aab`
5. Review release notes
6. Submit for review (24-48 hour approval time)

#### Version Info to Set
- **Version name:** 26.7.0
- **Version code:** 32
- **Minimum API:** 21
- **Target API:** 34+

---

### 2️⃣ React Web (Netlify / Vercel)

#### Prerequisites
- Node.js 18+
- npm 9+

#### Build Commands
```bash
cd /Users/hikmet/Desktop/Proje/ehliyet-kurs-webpage-main

# Install dependencies
npm install

# Build for production
npm run build
# Output: dist/

# Preview build locally
npm run preview
```

#### Deployment
```bash
# Option A: Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Option B: Vercel CLI
npm install -g vercel
vercel --prod

# Option C: Manual upload to hosting provider
# Upload contents of dist/ folder
```

#### Environment Variables
- `VITE_API_URL`: https://api.ehliyetyolu.com/api
- `VITE_FIREBASE_CONFIG`: Set production Firebase config
- `NODE_ENV`: production

---

### 3️⃣ Node.js Backend (AWS / Heroku / VPS)

#### Prerequisites
- Node.js 18+ LTS
- npm 9+
- MongoDB 5.0+
- Firebase Admin SDK

#### Build Commands
```bash
cd /Users/hikmet/Desktop/Proje/ehlihet-kurs-backend-main

# Install dependencies
npm install

# Run tests (if available)
npm test

# Start production server
NODE_ENV=production npm start
```

#### Environment Setup (.env)
```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://ehliyetyolu.com,https://www.ehliyetyolu.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ehliyet-db
JWT_SECRET=<32+ character random string>
JWT_REFRESH_SECRET=<32+ character random string>
FIREBASE_PROJECT_ID=<firebase-project>
FIREBASE_PRIVATE_KEY=<firebase-key>
FIREBASE_CLIENT_EMAIL=<firebase-email>
```

#### Deployment Options

**Option A: AWS EC2**
```bash
# SSH into server
ssh -i key.pem ubuntu@your-server-ip

# Clone repo & deploy
git clone https://github.com/hikmetnri/ehliyet-kurs-backend.git
cd ehliyet-kurs-backend
npm install
npm start
```

**Option B: Heroku**
```bash
heroku login
heroku create ehliyet-kurs-api
git push heroku feature/exam-system-validation:main
```

**Option C: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔒 Security Verification (Pre-Deployment)

### Backend
- [x] CSRF middleware active (`/src/middleware/csrfProtection.js`)
- [x] Rate limiting configured (auth: 5/15min, API: 500/15min)
- [x] Path traversal protection active
- [x] Helmet headers configured
- [x] Helmet CSP directives set
- [x] HTTPS redirect enabled
- [x] JWT secrets configured

### Web
- [x] XSS prevention utilities active
- [x] CSRF token interceptor configured
- [x] Token stored in sessionStorage (not localStorage)
- [x] Secure cookie flags set
- [x] Firebase initialized with production config

### Mobile
- [x] Secure storage configured (Android: EncryptedSharedPreferences, iOS: Keychain)
- [x] Token migration from SharedPreferences complete
- [x] Session expiration stream implemented
- [x] API error handling configured

---

## 📊 Testing Checklist (Before Production)

### Functional Tests
- [ ] User registration & login flow
- [ ] JWT token generation & refresh
- [ ] CSRF token validation
- [ ] Question exam functionality
- [ ] Payment flow (IAP)
- [ ] Notifications (FCM)
- [ ] File upload functionality

### Security Tests
- [ ] CSRF token rejection without valid token
- [ ] XSS attack vectors blocked
- [ ] Rate limiting triggered at threshold
- [ ] Path traversal attempts blocked
- [ ] SQL injection attempts blocked
- [ ] Token expiration handled correctly

### Performance Tests
- [ ] Backend response time < 200ms
- [ ] Web page load time < 2s
- [ ] Mobile app startup time < 3s
- [ ] Database query optimization verified

### Cross-Browser Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Device Tests
- [ ] Android 7.0+ (minimum API 21)
- [ ] iOS 11.0+
- [ ] Various screen sizes (4.5" - 6.7")

---

## ⚠️ Critical Updates (Deadline: August 31, 2026)

### Google Play Billing Update
**Current:** `in_app_purchase: ^3.3.0`  
**Required:** `in_app_purchase: ^4.1.0`  
**Reason:** Google Play Store enforces v4.1.0+ after August 31, 2026

```bash
cd /Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main
flutter pub upgrade in_app_purchase
# Verify in pubspec.yaml: in_app_purchase: ^4.1.0
flutter pub get
flutter build appbundle --release
```

---

## 📱 App Store Submission (iOS)

1. Build for App Store:
```bash
flutter build ios --release
```

2. Archive in Xcode:
   - Open `ios/Runner.xcworkspace`
   - Select "Generic iOS Device"
   - Product → Archive
   - Validate & Upload

3. Submit through [App Store Connect](https://appstoreconnect.apple.com)

---

## 🔄 Post-Deployment Tasks

### Monitoring
- [ ] Set up error tracking (Sentry/Firebase Crashlytics)
- [ ] Monitor backend logs
- [ ] Monitor API response times
- [ ] Track user analytics

### Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Update security guidelines
- [ ] Record deployment runbook

### Communication
- [ ] Notify stakeholders of deployment
- [ ] Update support team on new features
- [ ] Send release notes to users
- [ ] Monitor user feedback

---

## 🆘 Rollback Plan

If critical issues occur after deployment:

```bash
# Revert to previous working version
cd /Users/hikmet/Desktop/Proje/ehliyet-kurs-backend-main
git checkout <previous-commit>
npm install
npm start

# For mobile: revert to previous app version on stores
# For web: revert to previous build in hosting provider
```

---

## 📞 Support & Escalation

| Component | Contact | Escalation |
|-----------|---------|-----------|
| Backend API | Backend Team | CTO |
| Web Platform | Frontend Team | Tech Lead |
| Mobile App | Mobile Team | Mobile Lead |
| Infrastructure | DevOps Team | Infrastructure Lead |

---

## ✅ Final Sign-Off

- [ ] All tests passed
- [ ] Security verification complete
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Team trained on new features
- [ ] Go/No-Go decision: **________**

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Reviewed By:** _______________

---

**🎉 Ready for Production Deployment!**
