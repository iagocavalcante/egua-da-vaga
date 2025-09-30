# GitHub Actions CI/CD Setup

This project uses GitHub Actions to automate Android and iOS builds.

## Workflows

- **android-build.yml**: Builds Android APK
- **ios-build.yml**: Builds iOS IPA

## Required GitHub Secrets

Go to your repository **Settings > Secrets and variables > Actions** and add these secrets:

### Android Secrets

1. **ANDROID_KEYSTORE_BASE64**
   - Your Android keystore file encoded in base64
   - Generate: `base64 -i your-keystore.keystore | pbcopy` (macOS) or `base64 -w 0 your-keystore.keystore` (Linux)

2. **ANDROID_KEYSTORE_PASSWORD**
   - Password for your keystore

3. **ANDROID_KEY_ALIAS**
   - Alias name of your key in the keystore

4. **ANDROID_KEY_PASSWORD**
   - Password for the key alias

#### Creating an Android Keystore

If you don't have a keystore yet:

```bash
keytool -genkey -v -keystore egua-release-key.keystore -alias egua-key -keyalg RSA -keysize 2048 -validity 10000
```

### iOS Secrets

1. **IOS_CERTIFICATE_BASE64**
   - Your .p12 certificate file encoded in base64
   - Generate: `base64 -i YourCertificate.p12 | pbcopy`

2. **IOS_CERTIFICATE_PASSWORD**
   - Password for the .p12 certificate

3. **IOS_PROVISIONING_PROFILE_BASE64**
   - Your provisioning profile encoded in base64
   - Generate: `base64 -i YourProfile.mobileprovision | pbcopy`

4. **IOS_PROVISIONING_PROFILE_UUID**
   - UUID of your provisioning profile
   - Find it: `grep -A 1 UUID YourProfile.mobileprovision`

#### Creating iOS Certificates

1. In Xcode, go to **Preferences > Accounts**
2. Select your Apple ID and download certificates
3. Export certificate as .p12 from **Keychain Access**
4. Download provisioning profile from Apple Developer portal

## Triggering Builds

Builds are triggered on:
- Push to `main` or `develop` branches (creates release builds)
- Pull requests to `main` (creates debug builds)
- Manual trigger via **Actions** tab > **Run workflow**

## Downloading Artifacts

After a successful build:
1. Go to **Actions** tab
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download `android-apk` or `ios-ipa`

## Build Artifacts Retention

Artifacts are kept for 30 days by default.