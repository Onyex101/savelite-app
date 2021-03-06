import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { IUser } from './../../interface/dto';
import { NavController } from '@ionic/angular';
import { MenuDataService } from './../../services/data/menu.data.service';

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
    // {
    //   name: 'Settings',
    //   icon: 'settings',
    //   path: '/s-menu/s-menu/settings'
    // },
  ];
  user: IUser;
  profileImage = 'assets/images/avatar1.png';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private navCtrl: NavController,
    private userData: MenuDataService
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
        this.userData.emitUserEvent(this.user);
      }
    });
  }

  ngOnInit() {
    this.userData.currentUserDetails.subscribe((user) => {
      this.user = user;
    });
  }

  settings() {
    this.router.navigateByUrl('/s-menu/s-menu/settings');
  }

  logout(): void {
    this.auth.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
    });
  }
}
