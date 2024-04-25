import { Component, ViewChild } from '@angular/core';
import { SensorReadingModel } from '../../Interfaces/SensorReadingModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sensor-reading-view',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIcon, MatButtonModule],
  templateUrl: './sensor-reading-view.component.html',
  styleUrl: './sensor-reading-view.component.scss'
})
export class SensorReadingViewComponent {
  displayedColumns: string[] = ['id', 'startTime', 'readingTime', 'timeSinceStart', 'value'];
  dataSource = new MatTableDataSource<SensorReadingModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  name = "";

  constructor(private location: Location) {
    this.name = (this.location.getState() as any).data;
  }
}

const ELEMENT_DATA: SensorReadingModel[] = [
  {id: 1, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 2, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 3, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 4, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 5, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 6, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 7, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 8, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 9, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 10, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 11, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 12, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 13, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 14, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 15, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 16, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 17, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 18, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 19, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 20, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 21, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 22, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 23, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 24, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 25, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 26, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 27, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 28, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 29, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 30, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 31, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 32, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 33, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 34, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 35, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 36, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 37, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 38, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 39, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 40, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 41, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 42, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 43, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 44, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 45, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 46, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 47, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 48, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 49, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1},
  {id: 50, startTime: new Date(), readingTime: new Date(), timeSinceStart: new Date().getTime(), value: Math.random() * 1000, sensorId: 1}
]
