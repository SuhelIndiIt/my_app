git remote add origin https://github.com/SuhelIndiIt/my_app.git# Omni Cave

A modern task management and activity tracking application built with React Native. Omni Cave helps you organize your tasks, track your activities, and stay productive with a clean, intuitive interface.

## 🚀 Features

- **Task Management** - Create, update, and organize your tasks with ease
- **Activity Logging** - Track your activities and productivity over time
- **Offline-First** - Work seamlessly with or without internet connection
- **Dark/Light Mode** - Built-in theme support for comfortable viewing
- **Cross-platform** - Works on both iOS and Android
- **Data Persistence** - Your data is saved locally and synced when online
- **Responsive Design** - Optimized for various screen sizes and devices

## 🛠️ Tech Stack

- **Framework**: React Native
- **Language**: JavaScript
- **State Management**: React Context API
- **Navigation**: React Navigation
- **Storage**: AsyncStorage for local data persistence
- **UI**: Custom components with native styling
- **Theming**: Built-in light/dark theme support
- **Date Handling**: date-fns and moment.js
- **Build Tools**: Metro bundler, Babel
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **React Native development environment**
  - For iOS: Xcode (macOS only)
  - For Android: Android Studio and Android SDK
- **Java Development Kit (JDK)** 11 or higher
- **CocoaPods** (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/REX-Indiit/omni-cave-FE.git
   cd omni-cave-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

## 🚀 Getting Started

### Running the App

1. **Start the Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on iOS (macOS only)**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

3. **Run on Android**
   ```bash
   npm run android
   # or
   yarn android
   ```

## 📁 Project Structure

```
src/
├── assets/             # Images, fonts, and static files
├── components/         # Reusable UI components
├── constants/          # App constants and configuration
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   ├── TasksContext.js # Tasks and activities state
│   └── ThemeContext.js # Theme management
├── navigation/         # Navigation configuration
├── screens/            # Screen components
│   ├── ActivityLogScreen.js
│   └── SettingsScreen.js
└── utils/              # Helper functions and utilities
```

## 🔧 Available Scripts

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run tests
npm test

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using React Native:**
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
