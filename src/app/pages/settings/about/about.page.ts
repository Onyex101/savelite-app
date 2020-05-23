import { Component, OnInit } from '@angular/core';
import { MenuDataService } from './../../../services/data/menu.data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private userData: MenuDataService
  ) { }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      console.log('about', user);
    });
  }

}
