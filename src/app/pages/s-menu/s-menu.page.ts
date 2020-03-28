import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s-menu',
  templateUrl: './s-menu.page.html',
  styleUrls: ['./s-menu.page.scss'],
})
export class SMenuPage implements OnInit {
  activePath = '';
  pages = [
    {
      name: 'Dash',
      icon: 'home',
      path: '/s-menu/s-menu/dash'
    },
    {
      name: 'New Budget',
      icon: 'wallet',
      path: '/s-menu/s-menu/new-budget'
    },
    {
      name: 'All Plans',
      icon: 'albums',
      path: '/s-menu/s-menu/plans'
    },
    {
      name: 'Plan',
      icon: 'reader',
      path: '/s-menu/s-menu/plan'
    }
  ];

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url;
    });
  }

  ngOnInit() {
  }

}
