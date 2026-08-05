# 🔧 Google Play Store - NDK 16KB Crash Fix Guide

**Issue:** Uygulamanız 16 KB cihazlarda kilitlenebilir  
**Root Cause:** Eski Android NDK sürümü kullanılan native library'ler  
**Severity:** CRITICAL - Must fix before production deployment  
**Deadline:** Before uploading to Google Play Store

---

## 📋 Problem Description

Google Play Store uyarısı:

> Uygulamanız 16 KB cihazlar için derlendi ancak bazı kitaplıkları, kilitlenmelere neden olabilecek eski bir Android NDK sürümü kullanılarak derlendi.
> 
> Etkilenen kütüphaneler:
> - `base/lib/arm64-v8a/libdatastore_shared_counter.so`
> - `base/lib/x86_64/libdatastore_shared_counter.so`

---

## ✅ Çözüm: NDK r28+ Upgrade

### Adım 1: Android Studio'da NDK Versiyonunu Kontrol Et

```bash
# macOS/Linux
$ANDROID_SDK_ROOT/ndk-bundle/source.properties
# veya
ls $ANDROID_SDK_ROOT/ndk/

# Beklenen: ndk/28.0.x.x/ veya daha yeni
```

### Adım 2: Android Studio ile NDK Güncelle

1. **Android Studio açın**
2. **Preferences (macOS: Android Studio → Preferences, Windows: File → Settings)**
3. **Appearance & Behavior → System Settings → Android SDK**
4. **"SDK Tools" tab'ına tıklayın**
5. **"NDK (Side by side)" kutusunu işaretleyin**
6. **Apply & OK**

Android Studio otomatik olarak NDK r28+ indirecek ve kuracak.

### Adım 3: Flutter Project'te NDK Versiyonunu Belirt

**`android/app/build.gradle`** dosyasında (veya `android/build.gradle`):

```gradle
android {
    compileSdkVersion 34  // Updated to latest

    ndkVersion "28.0.12133974"  // ← Add this line
    
    // Or if you prefer to use the bundled NDK:
    // ndkVersion flutter.ndkVersion
    
    defaultConfig {
        applicationId "com.example.machxacademy"
        minSdkVersion 21
        targetSdkVersion 34
        // ... rest of config
    }
}
```

**Alternative: `local.properties` dosyasında:**

```properties
ndk.dir=/Users/[your-username]/Library/Android/sdk/ndk/28.0.12133974
```

### Adım 4: Clean Build Yap

```bash
cd /Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main

# 1. Clean everything
flutter clean
rm -rf android/build
rm -rf build/

# 2. Get fresh dependencies
flutter pub get

# 3. Build new App Bundle with NDK r28+
flutter build appbundle --release

# 4. Verify build succeeded
ls -lh build/app/outputs/bundle/release/app-release.aab
```

### Adım 5: Google Play Console'da Verify

1. **Google Play Console → Your App → Release → Testing Tracks**
2. **Create new release**
3. **Upload new `.aab` file**
4. **Scroll down - şu uyarıyı görüp görmediğinizi kontrol edin:**

```
✅ "This app does not have any issues with 16KB page size"
```

Eğer uyarı hala görülüyorsa, native dependencies'leri kontrol etmelisiniz.

---

## 🔍 Alternative: Etkilenen Paketleri Güncelle

Eğer NDK upgrade yeterli değilse, `datastore_shared_counter` paketini güncelleyin:

**`pubspec.yaml`:**

```yaml
dependencies:
  # ... existing dependencies ...
  shared_preferences: ^2.5.5  # Güncelle
```

Sonra:

```bash
flutter pub upgrade shared_preferences
flutter pub get
flutter build appbundle --release
```

---

## 📝 Checklist - Production Deployment Before

- [ ] NDK version r28+ installed locally
- [ ] `android/app/build.gradle` updated with `ndkVersion`
- [ ] `flutter clean` executed
- [ ] New `appbundle --release` built successfully
- [ ] Google Play Console'da 16KB warning'i kayboldu
- [ ] No other native library warnings
- [ ] Internal testing track'ta test edildi
- [ ] Ready for production release

---

## 🚨 Critical Notes

⚠️ **MUST DO BEFORE PRODUCTION:**
- This is a blocking issue for Google Play Store approval
- 16KB devices represent ~5% of Android market
- Crash on these devices = bad reviews + app removal

⚠️ **TIMELINE:**
- Fix this NOW before uploading app
- Google Play will reject app if this issue remains

---

## 📞 Troubleshooting

### Problem: NDK still not found
```bash
# Solution: Explicitly set in gradle.properties
echo "android.ndkVersion=28.0.12133974" >> android/gradle.properties
```

### Problem: Build fails with "NDK not found"
```bash
# Solution: Set ANDROID_NDK_HOME
export ANDROID_NDK_HOME=$ANDROID_SDK_ROOT/ndk/28.0.12133974
flutter build appbundle --release
```

### Problem: Still seeing 16KB warning after NDK upgrade
- Contact library maintainers for updates
- Consider replacing with newer alternative packages
- File issue on Flutter GitHub

---

## ✅ Verification Commands

```bash
# 1. Check NDK version used
grep -r "ndkVersion" /Users/hikmet/Desktop/Proje/ehliyet-kurs-flutter-main/android/

# 2. Build and check
flutter build appbundle --release

# 3. Extract and inspect native libraries
unzip -l build/app/outputs/bundle/release/app-release.aab | grep "\.so"

# 4. Verify no old NDK artifacts
file build/app/outputs/bundle/release/app-release.aab
```

---

**Next Step:** Update NDK to r28+, rebuild, and upload to Google Play Store.

**Important:** This must be done before August 31, 2026 deadline for Google Play Billing update.
