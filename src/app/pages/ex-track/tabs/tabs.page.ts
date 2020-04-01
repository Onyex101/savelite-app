import { Component, OnInit } from '@angular/core';

interface ITabs {
  tab: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  tabs: ITabs[];
  constructor() {
    this.tabs = [
      {tab: 'home', icon: 'home', name: 'Home'},
      {tab: 'add-expense', icon: 'wallet', name: 'Add Expense'},
      {tab: 'gallery', icon: 'image', name: 'Gallery'},
      {tab: 'ocr', icon: 'camera', name: 'OCR'},
    ];
  }

  ngOnInit() {
  }

}
