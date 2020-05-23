import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationExtras, ActivatedRoute } from '@angular/router';
import { IUser } from './../../interface/dto';
import { MenuDataService } from './../../services/data/menu.data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: IUser;
  pages = [
    {
      name: 'Account',
      icon: 'person-outline',
      path: 'account'
    },
    {
      name: 'Appearance',
      icon: 'eye-outline',
      path: 'appearance'
    },
    {
      name: 'Notification',
      icon: 'notifications-outline',
      path: 'notifications'
    },
    {
      name: 'About',
      icon: 'help-circle-outline',
      path: 'about'
    },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userData: MenuDataService
  ) {}

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      console.log('user', user);
    });
  }

}
