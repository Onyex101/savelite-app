import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  async loadingPresent() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      translucent: true,
      backdropDismiss: false
    });
    return await loading.present();
  }

  async loadingDismiss() {
    setTimeout(() => {
      return this.loadingController.dismiss();
    }, 500);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    await toast.present();
  }
}
