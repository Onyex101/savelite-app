import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    public toastController: ToastController
  ) {
    this.initializeApp();
    this.watchNetwork();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  watchNetwork() {
    this.network.onDisconnect().subscribe(() => {
      console.log('network disconnected');
      setTimeout(async () => {
        const toast = await this.toastController.create({
          message: 'Network disconnected.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
}
