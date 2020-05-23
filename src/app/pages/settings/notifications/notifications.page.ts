import { Component, OnInit } from '@angular/core';
import { MenuDataService } from './../../../services/data/menu.data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notification = true;
  constructor(
    private userData: MenuDataService
  ) { }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      console.log('notification', user);
    });
  }

}
