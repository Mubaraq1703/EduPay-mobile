import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import services
import { BrowserService } from './services/browser.service';
import { FileManagerService } from './services/file-manager.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'ios', // Consistent UI across platforms
      rippleEffect: false,
      animated: true
    }), 
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BrowserService,
    FileManagerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}