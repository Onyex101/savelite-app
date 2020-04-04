import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingsPageRoutingModule } from './savings-routing.module';

import { SavingsPage } from './savings.page';
import { ComponentsModule } from './../../../components/components.module';
import { NewPlanComponent } from './../../../components/new-plan/new-plan.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  entryComponents: [NewPlanComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavingsPageRoutingModule,
    ComponentsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      showSubtitle: false,
      showInnerStroke: false,
      outerStrokeWidth: 16,
      outerStrokeColor: '#d19115',
      animationDuration: 500,
    })
  ],
  declarations: [SavingsPage]
})
export class SavingsPageModule { }
