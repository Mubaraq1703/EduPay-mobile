import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private readonly EDUPAY_URL = 'https://edupay-7m5a.onrender.com';

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  /**
   * Opens EduPay website in in-app browser
   */
  async openEduPay(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Loading EduPay...',
      duration: 2000
    });
    
    try {
      await loading.present();
      
      await Browser.open({
        url: this.EDUPAY_URL,
        windowName: '_self',
        presentationStyle: 'popover',
        width: window.innerWidth,
        height: window.innerHeight,
        toolbarColor: '#1976d2'
      });
      
      await loading.dismiss();
      
    } catch (error) {
      await loading.dismiss();
      await this.showError('Failed to open EduPay. Please check your internet connection.');
      console.error('Browser open error:', error);
    }
  }

  /**
   * Opens a custom URL in in-app browser
   */
  async openCustomUrl(url: string, title?: string): Promise<void> {
    if (!this.isValidUrl(url)) {
      await this.showError('Invalid URL provided');
      return;
    }

    const loading = await this.loadingController.create({
      message: `Loading ${title || 'website'}...`,
      duration: 2000
    });

    try {
      await loading.present();
      
      await Browser.open({
        url: url,
        windowName: '_self',
        presentationStyle: 'popover',
        toolbarColor: '#1976d2'
      });
      
      await loading.dismiss();
      
    } catch (error) {
      await loading.dismiss();
      await this.showError('Failed to open website');
      console.error('Custom URL open error:', error);
    }
  }

  /**
   * Closes the in-app browser
   */
  async closeBrowser(): Promise<void> {
    try {
      await Browser.close();
    } catch (error) {
      console.error('Browser close error:', error);
    }
  }

  /**
   * Validates URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Shows error message to user
   */
  private async showError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }

  /**
   * Shows success message to user
   */
  async showSuccess(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}