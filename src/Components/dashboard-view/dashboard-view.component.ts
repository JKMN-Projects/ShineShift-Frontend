import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent implements OnInit {
  option!: EChartsOption;

  constructor() {
  }

  ngOnInit(): void {
    this.setBarChartOptions();
  }

  setBarChartOptions() {
    const totalData: number[] = [];
    for (let i = 0; i < rawData[0].length; ++i) {
      let sum = 0;
      for (let j = 0; j < rawData.length; ++j) {
        sum += rawData[j][i];
      }
      totalData.push(sum);
    }

    const grid = {
      left: 100,
      right: 100,
      top: 50,
      bottom: 50
    };

    const series: echarts.BarSeriesOption[] = [
      '(0-400)',
      '(401-800)',
      '(801-1200)'
    ].map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
          formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
        },
        data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        )
      };
    });

    this.option = {
      legend: {
        selectedMode: false
      },
      grid,
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series
    };
  }
}

const rawData = [[172, 123, 109, 192, 154, 136, 188], [234, 201, 256, 274, 288, 219, 220], [97, 88, 91, 76, 78, 93, 85]];
