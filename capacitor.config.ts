import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.edupay.mobile',
  appName: 'EduPay Mobile',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Browser: {
      presentationStyle: 'popover'
    },
    Filesystem: {
      iosDatabaseLocation: 'Documents'
    },
    Share: {
      subject: 'EduPay File Share',
      dialogTitle: 'Share via...'
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true
  }
};

export default config;
