import { MaterialModule } from './../material.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BudgetModalComponent } from './budget-modal/budget-modal.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { DetailsComponent } from './details/details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import 'chartjs-plugin-zoom';
import { ChartsModule } from 'ng2-charts';
import { DataService } from './../services/data/data.service';

@NgModule({
  declarations: [
    BudgetModalComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    DetailsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    ChartsModule
  ],
  exports: [
    BudgetModalComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    DetailsComponent,
    ForgotPasswordComponent
  ],
  providers: [DataService]
})
export class ComponentsModule { }