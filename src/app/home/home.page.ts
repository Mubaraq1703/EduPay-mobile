import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { BrowserService } from '../services/browser.service';
import { FileManagerService, FileInfo } from '../services/file-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  files: FileInfo[] = [];
  isLoading = false;
  storageInfo = { available: 0, used: 0 };

  constructor(
    private browserService: BrowserService,
    private fileManagerService: FileManagerService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.loadFiles();
    await this.loadStorageInfo();
  }

  /**
   * Opens EduPay website
   */
  async openEduPay() {
    await this.browserService.openEduPay();
  }

  /**
   * Opens custom URL input dialog
   */
  async openCustomUrl() {
    const alert = await this.alertController.create({
      header: 'Open Website',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'Enter website URL',
          value: 'https://'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Open',
          handler: async (data) => {
            if (data.url) {
              await this.browserService.openCustomUrl(data.url);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Shows download file dialog
   */
  async showDownloadDialog() {
    const alert = await this.alertController.create({
      header: 'Download File',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'File URL',
          value: 'https://'
        },
        {
          name: 'filename',
          type: 'text',
          placeholder: 'File name (optional)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Download',
          handler: async (data) => {
            if (data.url) {
              this.isLoading = true;
              const filename = data.filename || this.extractFilenameFromUrl(data.url);
              const success = await this.fileManagerService.downloadFile(data.url, filename);
              if (success) {
                await this.loadFiles();
              }
              this.isLoading = false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Loads files from storage
   */
  async loadFiles() {
    this.isLoading = true;
    this.files = await this.fileManagerService.listFiles();
    this.isLoading = false;
  }

  /**
   * Loads storage information
   */
  async loadStorageInfo() {
    this.storageInfo = await this.fileManagerService.getStorageInfo();
  }

  /**
   * Shows file action sheet
   */
  async showFileActions(file: FileInfo) {
    const actionSheet = await this.actionSheetController.create({
      header: file.name,
      buttons: [
        {
          text: 'Share',
          icon: 'share-outline',
          handler: async () => {
            await this.fileManagerService.shareFile(file.name);
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          role: 'destructive',
          handler: async () => {
            const success = await this.fileManagerService.deleteFile(file.name);
            if (success) {
              await this.loadFiles();
            }
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  /**
   * Formats file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Formats date for display
   */
  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }

  /**
   * Extracts filename from URL
   */
  private extractFilenameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split('/').pop() || 'downloaded_file';
      return filename.includes('.') ? filename : `${filename}.txt`;
    } catch {
      return `file_${Date.now()}.txt`;
    }
  }

  /**
   * Refreshes the page data
   */
  async doRefresh(event: any) {
    await Promise.all([
      this.loadFiles(),
      this.loadStorageInfo()
    ]);
    event.target.complete();
  }
}