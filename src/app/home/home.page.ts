import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class HomePage {
  isLoading = false;

  constructor(private alertController: AlertController) {}

  async openEduPay() {
    this.isLoading = true;
    
    try {
      await Browser.open({ 
        url: 'https://edupay-7m5a.onrender.com',
        windowName: '_self'
      });
    } catch (error) {
      console.error('Error opening EduPay:', error);
    } finally {
      this.isLoading = false;
    }
  }

  goToWebviewPage() {
    console.log('Navigate to webview page');
  }

  async openResultPortalModal() {
    const alert = await this.alertController.create({
      header: 'Coming Soon',
      message: 'The Result Portal is currently under development and will be available soon!',
      buttons: ['OK'],
      cssClass: 'futuristic-alert'
    });

    await alert.present();
  }

}