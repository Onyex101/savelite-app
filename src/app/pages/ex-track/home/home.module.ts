import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from './../../../components/components.module';
import { BudgetModalComponent } from './../../../components/budget-modal/budget-modal.component';
import { DetailsComponent } from './../../../components/details/details.component';
import { AddExpenseComponent } from './../../../components/add-expense/add-expense.component';

@NgModule({
  entryComponents:[
    BudgetModalComponent,
    DetailsComponent,
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MaterialModule,
    ComponentsModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
