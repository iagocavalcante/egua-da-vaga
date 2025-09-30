# App Store Publishing Setup Guide

This guide explains how to set up automated publishing to Google Play Store and Apple App Store.

## 📱 Google Play Store Setup

### Prerequisites
1. Google Play Console account ($25 one-time fee)
2. App created in Google Play Console
3. At least one manual release uploaded (for first-time setup)

### Step 1: Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **IAM & Admin > Service Accounts**
4. Click **Create Service Account**
   - Name: `github-actions-play-store`
   - Description: `Service account for GitHub Actions to publish to Play Store`
5. Click **Create and Continue**
6. Grant the role: **Service Account User**
7. Click **Done**

### Step 2: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key > Create new key**
4. Select **JSON** format
5. Click **Create** - the JSON file will download

### Step 3: Link Service Account to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Go to **Setup > API access**
4. Click **Link** on the service account you created
5. Grant the following permissions:
   - **Releases**: Create and edit releases
   - **App access**: View app information
6. Click **Invite user** and **Send invite**

### Step 4: Add GitHub Secret

1. Copy the entire contents of the downloaded JSON file
2. Go to your GitHub repository **Settings > Secrets and variables > Actions**
3. Click **New repository secret**
4. Name: `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`
5. Value: Paste the entire JSON content
6. Click **Add secret**

### Step 5: First Manual Upload (Required)

Before automation works, you must manually upload at least one release:

1. Build AAB locally: `npm run build:android`
2. Go to Google Play Console > Your App > **Production > Create new release**
3. Upload the AAB from `platforms/android/app/build/outputs/bundle/release/`
4. Complete the required information
5. Save (don't publish yet if not ready)

### Release Tracks

The workflow publishes to the **internal** track by default. You can change this in `.github/workflows/android-build.yml`:

- `internal` - Internal testing (up to 100 testers)
- `alpha` - Closed alpha testing
- `beta` - Open or closed beta testing
- `production` - Production release

---

## 🍎 Apple App Store Setup

### Prerequisites
1. Apple Developer account ($99/year)
2. App created in App Store Connect
3. Valid distribution certificate and provisioning profile

### Step 1: Create App Store Connect API Key

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Go to **Users and Access > Keys**
3. Click the **+** button to create a new key
4. Name: `GitHub Actions API Key`
5. Access: Select **Developer** role
6. Click **Generate**
7. **Download the API Key** (.p8 file) - you can only download it once!
8. Note down:
   - **Key ID** (e.g., `ABC123DEFG`)
   - **Issuer ID** (UUID at top of page)

### Step 2: Add GitHub Secrets

Add these three secrets to your GitHub repository:

1. **APP_STORE_CONNECT_API_KEY_ID**
   - Value: Your Key ID (e.g., `ABC123DEFG`)

2. **APP_STORE_CONNECT_API_ISSUER_ID**
   - Value: Your Issuer ID (UUID format)

3. **APP_STORE_CONNECT_API_KEY_CONTENT**
   - Value: Contents of your .p8 file
   - Open the .p8 file in a text editor and copy everything:
     ```
     -----BEGIN PRIVATE KEY-----
     [base64 content]
     -----END PRIVATE KEY-----
     ```

### Step 3: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click **My Apps > +** button
3. Select **New App**
4. Fill in:
   - Platform: iOS
   - Name: Egua Da Vaga
   - Primary Language: Portuguese (Brazil)
   - Bundle ID: `dev.iagocavalcante.eguadavaga`
   - SKU: `eguadavaga001`
5. Click **Create**

### Step 4: Export Certificates and Provisioning Profiles

#### Export Distribution Certificate (.p12)

1. Open **Keychain Access** on macOS
2. Go to **Certificates** category
3. Find your **Apple Distribution** certificate
4. Right-click > **Export**
5. Save as: `distribution.p12`
6. Set a password when prompted (remember this!)
7. Convert to base64:
   ```bash
   base64 -i distribution.p12 | pbcopy
   ```
8. Add to GitHub Secret: `IOS_CERTIFICATE_BASE64`
9. Add password to GitHub Secret: `IOS_CERTIFICATE_PASSWORD`

#### Export Provisioning Profile

1. Go to [Apple Developer Portal](https://developer.apple.com/account/resources/profiles/list)
2. Click **+** to create new provisioning profile
3. Select **App Store** distribution
4. Select your App ID
5. Select your distribution certificate
6. Name it: `Egua Da Vaga App Store`
7. Download the `.mobileprovision` file
8. Convert to base64:
   ```bash
   base64 -i YourProfile.mobileprovision | pbcopy
   ```
9. Add to GitHub Secret: `IOS_PROVISIONING_PROFILE_BASE64`

10. Get the UUID:
    ```bash
    grep -A 1 UUID YourProfile.mobileprovision | grep string | sed 's/<[^>]*>//g' | xargs
    ```
11. Add to GitHub Secret: `IOS_PROVISIONING_PROFILE_UUID`

### Step 5: TestFlight vs Production

The workflow publishes to **TestFlight** by default (internal testing). To release to production:

1. Build and upload via GitHub Actions (goes to TestFlight)
2. Go to App Store Connect > TestFlight
3. Test your build with internal testers
4. Once ready, go to **App Store** tab
5. Select your build and submit for review

---

## 🚀 Publishing Workflow

### How it works:

**Android:**
- Push to `main` branch → Builds APK + AAB → Uploads to Google Play Internal Track
- Push to `develop` branch → Builds APK only (artifact)
- Pull Request → Builds debug APK (artifact)

**iOS:**
- Push to `main` branch → Builds IPA → Uploads to TestFlight
- Push to `develop` branch → Builds IPA (artifact)
- Pull Request → Builds debug (artifact)

### Manual Trigger

You can manually trigger builds from GitHub:
1. Go to **Actions** tab
2. Select **Android Build** or **iOS Build**
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow**

---

## 📋 Complete GitHub Secrets Checklist

### Android (5 secrets)
- [ ] `ANDROID_KEYSTORE_BASE64`
- [ ] `ANDROID_KEYSTORE_PASSWORD`
- [ ] `ANDROID_KEY_ALIAS`
- [ ] `ANDROID_KEY_PASSWORD`
- [ ] `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`

### iOS (7 secrets)
- [ ] `IOS_CERTIFICATE_BASE64`
- [ ] `IOS_CERTIFICATE_PASSWORD`
- [ ] `IOS_PROVISIONING_PROFILE_BASE64`
- [ ] `IOS_PROVISIONING_PROFILE_UUID`
- [ ] `APP_STORE_CONNECT_API_KEY_ID`
- [ ] `APP_STORE_CONNECT_API_ISSUER_ID`
- [ ] `APP_STORE_CONNECT_API_KEY_CONTENT`

---

## 🔧 Troubleshooting

### Google Play: "You cannot use a standard personal account..."
- You need a service account, not a personal account
- Follow Step 1-3 above to create a service account

### Google Play: "Package not found"
- Upload at least one release manually first (Step 5)
- Ensure the package name matches: `dev.iagocavalcante.eguadavaga`

### iOS: "Authentication failed"
- Verify API Key ID and Issuer ID are correct
- Check that API Key content includes the full .p8 file with header/footer

### iOS: "Code signing failed"
- Ensure provisioning profile UUID is correct
- Verify certificate and provisioning profile match
- Check that provisioning profile includes your device UDID (for development)

### General: "Build failed"
- Check the Actions logs for detailed error messages
- Verify all secrets are set correctly
- Ensure local builds work first

---

## 📚 Additional Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [NativeScript Documentation](https://docs.nativescript.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)