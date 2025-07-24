import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { AlertController, ToastController } from '@ionic/angular';

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  type: string;
  modifiedTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  /**
   * Downloads a file from URL and saves it locally
   */
  async downloadFile(url: string, fileName: string): Promise<boolean> {
    try {
      // Fetch the file
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const base64Data = await this.blobToBase64(blob);
      
      // Save to device
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents
      });

      await this.showSuccess(`File downloaded: ${fileName}`);
      return true;

    } catch (error) {
      console.error('Download error:', error);
      await this.showError('Failed to download file');
      return false;
    }
  }

  /**
   * Lists all files in the documents directory
   */
  async listFiles(): Promise<FileInfo[]> {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents
      });

      const fileInfos: FileInfo[] = [];

      for (const file of result.files) {
        try {
          const stat = await Filesystem.stat({
            path: file.name,
            directory: Directory.Documents
          });

          fileInfos.push({
            name: file.name,
            path: stat.uri,
            size: stat.size,
            type: file.type,
            modifiedTime: stat.mtime
          });
        } catch (statError) {
          console.warn(`Failed to get stats for ${file.name}:`, statError);
        }
      }

      return fileInfos.sort((a, b) => b.modifiedTime - a.modifiedTime);

    } catch (error) {
      console.error('List files error:', error);
      await this.showError('Failed to list files');
      return [];
    }
  }

  /**
   * Shares a file using native share functionality
   */
  async shareFile(fileName: string, title?: string): Promise<boolean> {
    try {
      const fileUri = await this.getFileUri(fileName);
      
      await Share.share({
        title: title || 'Share File',
        text: `Sharing ${fileName}`,
        url: fileUri,
        dialogTitle: 'Share via...'
      });

      return true;

    } catch (error) {
      console.error('Share error:', error);
      await this.showError('Failed to share file');
      return false;
    }
  }

  /**
   * Deletes a file from local storage
   */
  async deleteFile(fileName: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${fileName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              await Filesystem.deleteFile({
                path: fileName,
                directory: Directory.Documents
              });

              await this.showSuccess(`${fileName} deleted successfully`);
              return true;

            } catch (error) {
              console.error('Delete error:', error);
              await this.showError('Failed to delete file');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
    return true;
  }

  /**
   * Gets the URI of a file for sharing
   */
  private async getFileUri(fileName: string): Promise<string> {
    const result = await Filesystem.getUri({
      directory: Directory.Documents,
      path: fileName
    });
    return result.uri;
  }

  /**
   * Converts blob to base64 string
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Remove data URL prefix
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Shows error message
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
   * Shows success message
   */
  private async showSuccess(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  /**
   * Gets storage info
   */
  async getStorageInfo(): Promise<{available: number, used: number}> {
    try {
      // This is a simplified implementation
      // In a real app, you might want to calculate actual usage
      return {
        available: 1000000000, // 1GB placeholder
        used: 50000000 // 50MB placeholder
      };
    } catch (error) {
      console.error('Storage info error:', error);
      return { available: 0, used: 0 };
    }
  }
}