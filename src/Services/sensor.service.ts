import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SensorModel } from '../Interfaces/Models/SensorModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ISensorService } from '../Interfaces/Services/ISensorService';
import { ChangeSensorConfigurationRequest } from '../Interfaces/DTO/change-sensor-configuration-request';
import { UnassignSensorRequest } from '../Interfaces/DTO/unassign-sensor-request';
import { errorMsg } from '../Utility/GetErrorMessage';
import { AssignSensorRequest } from '../Interfaces/DTO/assign-sensor-request';
import { UpdateSensorRequest } from '../Interfaces/DTO/update-sensor-request';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService implements ISensorService {
  url: string = 'https://localhost:7129/api/Sensors/';

  private sensors: Array<SensorModel> = [];

  private sensorsSubject$: Subject<SensorModel[]> = new BehaviorSubject<SensorModel[]>(this.sensors);
  sensors$: Observable<SensorModel[]> = this.sensorsSubject$.asObservable();

  private unassignedSensorsSubject$: Subject<SensorModel[]> = new BehaviorSubject<SensorModel[]>(this.sensors);
  unassignedSensors$: Observable<SensorModel[]> = this.unassignedSensorsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  updateSensor(request: UpdateSensorRequest): void {
    this.httpClient.put<boolean>(this.url + 'UpdateSensor', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update sensor. " + errorMsg())
      }
    });
  }

  getAllByHubId(hubId: number) {
    this.sensorsSubject$.next(this.sensors);

    this.httpClient.get<SensorModel[]>(this.url + 'GetAllByHubId/' + hubId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.sensorsSubject$.next(x);
    });
  }

  getUnassignedSensors(): void {
    this.unassignedSensorsSubject$.next(this.sensors);

    this.httpClient.get<SensorModel[]>(this.url + 'GetUnassignedSensors', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.unassignedSensorsSubject$.next(x);
    });
  }

  assignSensor(request: AssignSensorRequest): void {
    this.httpClient.put<boolean>(this.url + 'UnassignSensor', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to assign sensor. " + errorMsg())
      }
    });
  }

  changeSensorConfiguration(request: ChangeSensorConfigurationRequest, hubId: number) {
    this.httpClient.put<boolean>(this.url + 'ChangeSensorConfiguration', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update sensor configuration. " + errorMsg())
      }

      this.getAllByHubId(hubId);
    });
  }

  unassignSensor(request: UnassignSensorRequest, hubId: number) {
    this.httpClient.put<boolean>(this.url + 'UnassignSensor', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update sensor. " + errorMsg())
      }

      this.getAllByHubId(hubId);
    });
  }
}
