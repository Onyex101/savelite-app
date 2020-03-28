import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBudgetPageRoutingModule } from './new-budget-routing.module';

import { NewBudgetPage } from './new-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewBudgetPageRoutingModule
  ],
  declarations: [NewBudgetPage]
})
export class NewBudgetPageModule {}
