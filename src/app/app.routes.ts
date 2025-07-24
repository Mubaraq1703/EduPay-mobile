import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'webview',
    loadComponent: () => import('./webview/webview.page').then((m) => m.WebviewPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];