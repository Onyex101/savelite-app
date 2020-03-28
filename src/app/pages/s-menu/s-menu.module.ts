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
  ],
  declarations: [SMenuPage]
})
export class SMenuPageModule {}
