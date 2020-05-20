import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';

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
    public toastController: ToastController,
    private backgroundMode: BackgroundMode,
    private fcm: FCM,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        console.log(token);
        this.storage.set('FIREBASE_TOKEN', token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.storage.set('FIREBASE_TOKEN', token);
      });

      // unsubscribe from a topic
      // this.fcm.unsubscribeFromTopic('offers');

    });
    this.watchNetwork();
    this.backgroundMode.enable();
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
    }, 2000);
  });
}
}
