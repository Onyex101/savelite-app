import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { DataService } from './../../services/data/data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Health', 'Food', 'Education', 'Transport', 'Entertainment', 'Shopping', 'Others'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Category' }
  ];
  public barChartColors = [
    { backgroundColor: '#222831' },
  ];

  constructor(
    private share: DataService
  ) { }

  ngOnInit() {
    this.share.currentbarData.subscribe((data) => {
      this.barChartData[0].data = data;
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 2 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      (Math.random() * 100),
      25,
      (Math.random() * 100),
      80,
      (Math.random() * 100),
      ];
    this.barChartData[0].data = data;
  }

}
