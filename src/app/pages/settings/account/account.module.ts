import { ComponentsModule } from './../../../components/components.module';
import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditAccComponent } from './../../../components/edit-acc/edit-acc.component';
import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';

@NgModule({
  entryComponents: [
    EditAccComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    MaterialModule,
    ComponentsModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
