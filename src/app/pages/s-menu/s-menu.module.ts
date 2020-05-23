import { MenuShareModule } from './menu.share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SMenuPageRoutingModule } from './s-menu-routing.module';

import { SMenuPage } from './s-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SMenuPageRoutingModule,
    MenuShareModule.forRoot(),
  ],
  declarations: [SMenuPage]
})
export class SMenuPageModule {}
