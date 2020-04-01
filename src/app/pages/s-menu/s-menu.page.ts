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
      name: 'Home',
      icon: 'home',
      path: '/s-menu/s-menu/tabs/tabs/home'
    },
    {
      name: 'Savings',
      icon: 'wallet',
      path: '/s-menu/s-menu/savings'
    },
  ];

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url === '/s-menu') {
        event.url = '/s-menu/s-menu/tabs/tabs/home';
        this.activePath = event.url;
      } else {
        this.activePath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}
