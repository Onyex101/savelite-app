import { Component, OnInit } from '@angular/core';
import { MenuDataService } from './../../../services/data/menu.data.service';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  appName;
  versionNumber;
  description: string;
  constructor(
    private userData: MenuDataService,
    private appVersion: AppVersion
  ) {
    this.getInfo();
    this.description = 'Expense Tracker/Savings mobile app';
  }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      console.log('about', user);
    });
  }

  async getInfo() {
    this.appName = await this.appVersion.getAppName();
    this.versionNumber = await this.appVersion.getVersionNumber();
  }

}
