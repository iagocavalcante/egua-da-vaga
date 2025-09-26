# Égua da Vaga

> A native mobile application built with NativeScript-Vue

## Prerequisites

Before running this project, ensure you have the following tools installed:

- **Node.js** (v18.20.4 recommended)
- **Java Development Kit (JDK)** (OpenJDK 11 required)
- **Android SDK** (for Android builds)
- **asdf** (recommended for version management)

### Setting up with asdf

This project includes a `.tool-versions` file for asdf users:

```bash
# Install required plugins (if not already installed)
asdf plugin-add java https://github.com/halcyon/asdf-java.git
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Install versions specified in .tool-versions
asdf install

# Set versions for this project
asdf local java temurin-11.0.21+9
asdf local nodejs 18.20.4
```

### Android Development Setup

For Android development, follow the [NativeScript Android setup guide](https://docs.nativescript.org/setup/macos#setting-up-macos-for-android).

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd egua-da-vaga

# Install dependencies
npm install

# Verify environment setup
npx tns doctor android
```

## Development

```bash
# Preview on device
npx tns preview

# Run on Android emulator/device
npx tns run android

# Run on iOS simulator/device (macOS only)
npx tns run ios

# Build, watch for changes and debug
npx tns debug <platform>
```

## Building for Production

```bash
# Build for Android
npx tns build android --env.production

# Build for iOS (macOS only)
npx tns build ios --env.production
```

## Project Structure

- `app/` - Application source code
- `app/components/` - Vue components
- `app/views/` - Application views/pages
- `webpack.config.js` - Webpack configuration
- `tsconfig.json` - TypeScript configuration

## Technologies Used

- **NativeScript** - Cross-platform mobile framework
- **Vue.js** - Progressive JavaScript framework
- **TypeScript** - Typed JavaScript
- **Apollo GraphQL** - GraphQL client
- **Socket.IO** - Real-time communication
- **Sass** - CSS preprocessor

## Troubleshooting

If you encounter build issues:

1. Ensure Java 11 is properly installed and configured
2. Verify Android SDK is set up correctly
3. Run `npx tns doctor` to check environment setup
4. Clear cache: `npm cache clean --force`
5. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
