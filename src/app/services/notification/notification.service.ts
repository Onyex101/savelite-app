import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private platform: Platform,
    private localNotification: LocalNotifications
  ) {
    this.platform.ready().then(() => {
      // this.localNotification.on('click').subscribe(res => {

      // });
      // this.localNotification.on('trigger').subscribe(res => {

      // });
    });
  }

  scheduleNotification(id: number) {
  }

  recurringNotification() {
  }

  repeatingDaily() {
  }
}
