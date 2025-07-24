import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webview',
  standalone: true,
  templateUrl: 'webview.page.html',
  styleUrls: ['webview.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class WebviewPage implements OnInit {
  isLoading = true;
  hasError = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simulate loading time
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  refresh() {
    this.isLoading = true;
    this.hasError = false;
    
    // Force reload by navigating to the URL
    window.location.href = 'https://edupay-7m5a.onrender.com';
  }

  onLoadError() {
    this.isLoading = false;
    this.hasError = true;
  }
}