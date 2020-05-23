import { Component, OnInit } from '@angular/core';
import { MenuDataService } from './../../../services/data/menu.data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
})
export class AppearancePage implements OnInit {
  darkMode = false;
  chart;
  constructor(
    private userData: MenuDataService,
    private storage: Storage,
  ) {
    this.storage.get('chartTYPE').then((res) => {
      this.chart = res;
    });
  }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      console.log('appearance', user);
    });
  }

  updateChart() {
    this.storage.set('chartTYPE', this.chart);
    this.userData.emitChartEvent(this.chart);
    console.log('chart type', this.chart);
  }

}
