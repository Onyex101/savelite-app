import { Component, OnInit } from '@angular/core';
import { MenuDataService } from './../../../services/data/menu.data.service';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
})
export class AppearancePage implements OnInit {
  darkMode = false;
  constructor(
    private userData: MenuDataService
  ) { }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      console.log('appearance', user);
    });
  }

}
