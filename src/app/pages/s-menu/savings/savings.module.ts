import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingsPageRoutingModule } from './savings-routing.module';

import { SavingsPage } from './savings.page';
import { ComponentsModule } from './../../../components/components.module';
import { PlanDetailComponent } from './../../../components/plan-detail/plan-detail.component';

@NgModule({
  entryComponents: [PlanDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavingsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SavingsPage]
})
export class SavingsPageModule {}
