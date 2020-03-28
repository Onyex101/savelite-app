import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.page.html',
  styleUrls: ['./mode.page.scss'],
})
export class ModePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  expense(): void {
    this.router.navigateByUrl('/tabs');
  }

  savings(): void {
    this.router.navigateByUrl('/s-menu');
  }
}
