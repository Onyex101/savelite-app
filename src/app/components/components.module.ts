import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BudgetModalComponent } from './budget-modal/budget-modal.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { DetailsComponent } from './details/details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ImageComponent } from './image/image.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

// plugins
import 'chartjs-plugin-zoom';
import { ChartsModule } from 'ng2-charts';

// Providers/Service
import { DataService } from './../services/data/data.service';

@NgModule({
  declarations: [
    BudgetModalComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    DetailsComponent,
    ForgotPasswordComponent,
    NewPlanComponent,
    PlanDetailComponent,
    AddExpenseComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    ChartsModule,
  ],
  exports: [
    BudgetModalComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    DetailsComponent,
    ForgotPasswordComponent,
    NewPlanComponent,
    PlanDetailComponent,
    AddExpenseComponent,
    ImageComponent
  ],
  providers: [DataService]
})
export class ComponentsModule { }
