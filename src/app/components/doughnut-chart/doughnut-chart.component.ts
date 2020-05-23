import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data/data.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Health', 'Food', 'Education', 'Transport', 'Entertainment', 'Shopping', 'Others'];
  public doughnutChartData: MultiDataSet = [
    [0, 0, 0, 0, 0, 0, 0],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private share: DataService
  ) { }

  ngOnInit() {
    this.share.currentbarData.subscribe((data) => {
      this.doughnutChartData[0] = data;
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
