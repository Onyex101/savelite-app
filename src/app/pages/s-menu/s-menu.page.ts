import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { IUser } from './../../interface/dto';

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
    {
      name: 'Settings',
      icon: 'settings',
      path: '/s-menu/s-menu/settings'
    },
  ];
  user: IUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url === '/s-menu') {
        event.url = '/s-menu/s-menu/tabs/tabs/home';
        this.activePath = event.url;
      } else {
        this.activePath = event.url;
      }
    });
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user);
      }
    });
  }

  ngOnInit() {
  }

  logout(): void {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
