# EduPay Mobile

A modern hybrid mobile application built with Ionic Angular that serves as a companion app for the EduPay educational payment platform.

## 🌟 Features

- **EduPay Platform Integration**: Seamless access to the EduPay educational payment platform
- **In-App Browser**: Enhanced browsing experience with custom styling and loading states
- **File Management**: Comprehensive file handling with download, share, and delete capabilities
- **Modern UI/UX**: Futuristic design with glass-morphism effects and neon color schemes
- **Cross-Platform**: Runs on web browsers and native Android devices
- **PWA Support**: Progressive Web App capabilities for enhanced mobile experience

## 🚀 Tech Stack

- **Frontend**: Angular 20.0.0 with TypeScript 5.8.0
- **Mobile Framework**: Ionic Framework 8.0.0
- **Native Integration**: Capacitor 7.4.2
- **Testing**: Jasmine & Karma
- **Code Quality**: ESLint with Angular ESLint

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- Ionic CLI (`npm install -g @ionic/cli`)
- Angular CLI (`npm install -g @angular/cli`)

For mobile development:
- Android Studio (for Android builds)
- Xcode (for iOS builds - macOS only)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd edupay-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ionic serve
   ```

## 📱 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint

### Development Server

Run the development server:
```bash
ionic serve
```

The app will open in your browser at `http://localhost:8100` with live reload enabled.

### Building for Production

```bash
ionic build --prod
```

## 📦 Capacitor Integration

### Add Platforms

```bash
# Add Android platform
ionic capacitor add android

# Add iOS platform (macOS only)
ionic capacitor add ios
```

### Build and Sync

```bash
# Build the app and sync with native projects
ionic capacitor build android
ionic capacitor build ios
```

### Run on Device

```bash
# Run on Android device/emulator
ionic capacitor run android

# Run on iOS device/simulator (macOS only)
ionic capacitor run ios
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── home/              # Home page component
│   ├── services/          # Application services
│   │   ├── browser.service.ts     # In-app browser functionality
│   │   └── file-manager.service.ts # File management operations
│   ├── webview/           # WebView component
│   ├── app.component.ts   # Root component
│   └── app.routes.ts      # Application routing
├── assets/                # Static assets
├── theme/                 # Global theme styles
├── global.scss           # Global styles
└── index.html            # Main HTML file
```

## 🎨 Styling

The application features a modern design with:
- Glass-morphism effects
- Neon color schemes
- Responsive layouts
- Dark/light theme support

Global styles are located in:
- `src/global.scss` - Global application styles
- `src/theme/` - Theme-specific styles

## 🔧 Services

### BrowserService
Handles in-app browser functionality:
- Opening EduPay platform
- Custom URL navigation
- Browser lifecycle management

### FileManagerService
Manages file operations:
- File downloads
- File sharing
- Local storage management
- File deletion with confirmation

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The project uses:
- **Jasmine** for test framework
- **Karma** for test runner
- Component and service unit tests

## 📝 Code Quality

The project enforces code quality through:
- **ESLint** with Angular-specific rules
- **TypeScript** strict mode
- Consistent code formatting
- Import organization

Run linting:
```bash
npm run lint
```

## 🌐 Deployment

### Web Deployment
Build the project and deploy the `dist/` folder to your web server:
```bash
npm run build
```

### Mobile App Stores
1. Build the native projects
2. Follow platform-specific guidelines for app store submission
3. Use Android Studio for Google Play Store
4. Use Xcode for Apple App Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**App not loading on device:**
- Ensure Capacitor is properly synced: `ionic capacitor sync`
- Check native project configuration in Android Studio/Xcode

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update Ionic and Angular CLI to latest versions

**Platform-specific issues:**
- Android: Check Android SDK and build tools are installed
- iOS: Ensure Xcode command line tools are installed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the [Ionic Documentation](https://ionicframework.com/docs)
- Review [Angular Documentation](https://angular.io/docs)
- Open an issue in this repository

## 🎯 Roadmap

- [ ] iOS platform support
- [ ] Push notifications
- [ ] Offline functionality
- [ ] Enhanced file management features
- [ ] Multi-language support
