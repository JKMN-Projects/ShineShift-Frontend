import { Component, ViewChild } from '@angular/core';
import { UpsertSensorComponent } from '../Modals/upsert-sensor/upsert-sensor.component';
import { SensorModel } from '../../Interfaces/SensorModel';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hub-details',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatMenuModule, MatIcon, MatButtonModule],
  templateUrl: './hub-details.component.html',
  styleUrl: './hub-details.component.scss'
})
export class HubDetailsComponent {
  displayedColumns: string[] = ['id', 'mac', 'typeName', 'options'];
  dataSource = new MatTableDataSource<SensorModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  name = "";
  hubId = "";

  constructor(private matDialog: MatDialog, private router: Router, private location: Location) {
    this.name = (this.location.getState() as any).data;
    this.hubId = (this.location.getState() as any).hubId;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  assignSensor(row: SensorModel) {
    this.matDialog.open(UpsertSensorComponent, {
      disableClose: true,
      data: {
        sensor: row,
        hubId: this.hubId,
        isAssign: true
      }
    });
  }

  updateSensor(row: SensorModel) {
    this.matDialog.open(UpsertSensorComponent, {
      disableClose: true,
      data: {
        sensor: row,
        hubId: this.hubId,
        isAssign: false
      }
    });
  }

  viewSensorReadings(row: SensorModel) {
    // Call service to get sensor reading before redirecting
    this.router.navigateByUrl("SensorReading", {state: {data: this.name + " sensor " + row.id}});
  }

  goBack() {
    this.router.navigateByUrl("MyHubs")
  }
}

const ELEMENT_DATA: SensorModel[] = [
  {id: 1, mac: '00:0a:95:9d:68:16', typeName: 'Photoresistor'},
  {id: 2, mac: '00:24:d7:1f:9b:42', typeName: 'Photoresistor'},
  {id: 3, mac: '00:1e:8f:45:af:cd', typeName: 'Photoresistor'},
];
