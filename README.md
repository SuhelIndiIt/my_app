# Omni Cave Frontend

A comprehensive React Native application for the Omni Cave platform, providing a modern and intuitive user experience for cave exploration and management.

## 🚀 Features

- **Cross-platform compatibility** - iOS and Android support
- **Modern UI/UX** - Built with React Native and custom components
- **Authentication system** - Secure user login and registration
- **Real-time notifications** - Push notification support
- **Payment integration** - Stripe payment processing
- **Social features** - User profiles and social interactions
- **Responsive design** - Optimized for various screen sizes

## 📱 Screenshots

_Add screenshots of your app here_

## 🛠️ Tech Stack

- **Framework**: React Native 0.76.1
- **Language**: JavaScript
- **State Management**: React Context API
- **Navigation**: React Navigation
- **UI Components**: Custom components with native styling
- **Payment**: Stripe SDK
- **Authentication**: Firebase Auth
- **Push Notifications**: Firebase Cloud Messaging
- **Build Tools**: Metro bundler, Babel
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **Java Development Kit (JDK)** 11 or higher
- **CocoaPods** (for iOS dependencies)

### Environment Setup

1. **Install React Native CLI globally:**

   ```bash
   npm install -g @react-native-community/cli
   ```

2. **Install iOS dependencies (macOS only):**

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Install project dependencies:**
   ```bash
   npm install
   ```

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/REX-Indiit/omni-cave-FE.git
cd omni-cave-FE
```

### Step 2: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### Step 3: Environment Configuration

1. **Copy environment variables:**

   ```bash
   cp .env.example .env
   ```

2. **Configure your environment variables:**
   - `API_BASE_URL`: Your backend API URL
   - `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
   - `FIREBASE_CONFIG`: Firebase configuration

### Step 4: Start Metro Bundler

```bash
# Start Metro bundler
npm start

# OR using Yarn
yarn start
```

### Step 5: Run the Application

#### For iOS (macOS only)

```bash
# Start iOS simulator
npm run ios

# OR using Yarn
yarn ios
```

#### For Android

```bash
# Start Android emulator
npm run android

# OR using Yarn
yarn android
```

## 📁 Project Structure

```
src/
├── appContext/          # React Context providers
├── assets/             # Images, fonts, and static files
├── constants/          # App constants and configuration
├── hooks/              # Custom React hooks
├── routers/            # Navigation configuration
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── components/    # Reusable components
│   ├── customcomponents/ # Custom UI components
│   └── tabs/          # Tab screen components
├── services/           # API services and utilities
└── utils/              # Helper functions and utilities
```

## 🔧 Available Scripts

```bash
# Development
npm start              # Start Metro bundler
npm run android        # Run Android app
npm run ios           # Run iOS app
npm run test          # Run tests
npm run lint          # Run ESLint

# Building
npm run build:android # Build Android APK
npm run build:ios     # Build iOS app

# Utilities
npm run clean         # Clean build artifacts
npm run rebuild       # Rebuild native modules
```

## 📱 Platform-Specific Setup

### iOS Setup

1. **Install Xcode** from the Mac App Store
2. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```
3. **Install iOS dependencies:**
   ```bash
   cd ios && pod install && cd ..
   ```

### Android Setup

1. **Install Android Studio**
2. **Configure Android SDK:**
   - Android SDK Platform 33 (API level 33)
   - Android SDK Build-Tools 33.0.0
   - Android SDK Command-line Tools
3. **Set environment variables:**
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## 🔐 Authentication

The app uses Firebase Authentication for user management. Users can:

- Sign up with email/password
- Sign in with existing credentials
- Reset passwords
- Maintain session state

## 💳 Payment Integration

Stripe is integrated for payment processing:

- Secure payment processing
- Multiple payment methods
- Subscription management
- Payment history

## 📣 Push Notifications

Firebase Cloud Messaging is configured for:

- Real-time notifications
- Background message handling
- Custom notification sounds
- Badge management

## 📝 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Android

1. **Generate signed APK:**

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **Generate signed AAB:**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

### iOS

1. **Archive in Xcode:**

   - Open `ios/omnicave.xcworkspace` in Xcode
   - Select "Any iOS Device" as target
   - Product → Archive

2. **Upload to App Store Connect**

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues:**

   ```bash
   npm start -- --reset-cache
   ```

2. **iOS build issues:**

   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

3. **Android build issues:**

   ```bash
   cd android && ./gradlew clean && cd ..
   ```

4. **Node modules issues:**
   ```bash
   rm -rf node_modules && npm install
   ```

### Debug Mode

- **iOS**: Shake device or press Cmd+D in simulator
- **Android**: Shake device or press Cmd+M (macOS) / Ctrl+M (Windows/Linux)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [React Native Docs](https://reactnative.dev/docs/getting-started)
- **Issues**: [GitHub Issues](https://github.com/REX-Indiit/omni-cave-FE/issues)
- **Discussions**: [GitHub Discussions](https://github.com/REX-Indiit/omni-cave-FE/discussions)

## 🎉 Acknowledgments

- React Native community
- Contributors and maintainers
- Open source libraries used in this project

---

**Made with ❤️ by the Omni Cave Team**
