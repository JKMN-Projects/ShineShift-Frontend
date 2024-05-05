import { Component, ViewChild } from '@angular/core';
import { UpsertSensorComponent } from '../../Modals/upsert-sensor/upsert-sensor.component';
import { SensorModel } from '../../../Interfaces/Models/SensorModel';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SensorService } from '../../../Services/sensor.service';
import { AssignSensorComponent } from '../../Modals/assign-sensor/assign-sensor.component';
import { UnassignSensorRequest } from '../../../Interfaces/DTO/unassign-sensor-request';
import { DeleteConfirmationComponent } from '../../Modals/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-hub-details',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatMenuModule, MatIcon, MatButtonModule],
  templateUrl: './hub-details.component.html',
  styleUrl: './hub-details.component.scss'
})
export class HubDetailsComponent {
  displayedColumns: string[] = ['id', 'mac', 'typeName', 'options', 'delete'];
  dataSource = new MatTableDataSource<SensorModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  name = "";
  hubId = 0;

  constructor(private matDialog: MatDialog, private router: Router, private location: Location, private sensorService: SensorService) {
    this.name = (this.location.getState() as any).data;
    this.hubId = (this.location.getState() as any).hubId;

    this.sensorService.getAllByHubId(this.hubId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  assignSensor() {
    this.matDialog.open(AssignSensorComponent, {
      disableClose: true,
      data: {
        hubId: this.hubId
      }
    });
  }

  updateSensor(row: SensorModel) {
    this.matDialog.open(UpsertSensorComponent, {
      disableClose: true,
      data: {
        sensor: row
      }
    });
  }

  unassignSensor(row: SensorModel) {
    this.matDialog.open(DeleteConfirmationComponent, {
      data: {
        msg: "Are you sure you want to unassign this sensor?"
      }
    }).afterClosed().subscribe(x => {
      if (x) {
        let temp: UnassignSensorRequest = {sensorId: row.id};
        this.sensorService.unassignSensor(temp, this.hubId);
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
