import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class HomePage {
  isLoading = false;

  // Method 1: Open in system browser but with better UX
  async openEduPayExternal() {
    this.isLoading = true;
    
    try {
      await Browser.open({ 
        url: 'https://edupay-7m5a.onrender.com',
        windowName: '_self' // This attempts to open in the same window/tab
      });
    } catch (error) {
      console.error('Error opening EduPay:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Method 2: Use Capacitor's native webview (recommended)
  async openEduPay() {
    this.isLoading = true;
    
    try {
      // For web, this will open in same tab
      // For mobile, this will open in the app's webview
      window.open('https://edupay-7m5a.onrender.com', '_self');
    } catch (error) {
      console.error('Error opening EduPay:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Method 3: Use location.href for same-tab navigation
  navigateToEduPay() {
    this.isLoading = true;
    
    // Show loading for better UX
    setTimeout(() => {
      window.location.href = 'https://edupay-7m5a.onrender.com';
    }, 500);
  }

  // Method 4: Create a webview page within your app
  goToWebviewPage() {
    // You would create a separate page with a webview
    // This requires routing to a new page
    console.log('Navigate to webview page');
  }
}