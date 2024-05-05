import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestInterceptor } from '../Utility/HttpRequestInterceptor';
import { SensorModel } from '../Interfaces/Models/SensorModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ISensorService } from '../Interfaces/Services/ISensorService';
import { ChangeSensorConfigurationRequest } from '../Interfaces/DTO/change-sensor-configuration-request';
import { UnassignSensorRequest } from '../Interfaces/DTO/unassign-sensor-request';
import { errorMsg } from '../Utility/GetErrorMessage';

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

  constructor(private httpRequest: HttpRequestInterceptor, private httpClient: HttpClient) { }

  getAllByHubId(hubId: number) {
    this.sensorsSubject$.next(this.sensors);

    this.httpClient.get<SensorModel[]>(this.url + 'GetAllByHubId/' + hubId, this.httpRequest.getHttpOptions()).subscribe(x => {
      this.sensorsSubject$.next(x);
    });
  }

  getUnassignedSensors(): void {
    this.unassignedSensorsSubject$.next(this.sensors);

    this.httpClient.get<SensorModel[]>(this.url + 'GetUnassignedSensors', this.httpRequest.getHttpOptions()).subscribe(x => {
      this.unassignedSensorsSubject$.next(x);
    });
  }

  assignSensor(sensor: SensorModel): void {
    this.httpClient.put<boolean>(this.url + 'UnassignSensor', sensor, this.httpRequest.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to assign sensor. " + errorMsg())
      }
    });
  }

  changeSensorConfiguration(request: ChangeSensorConfigurationRequest, hubId: number) {
    this.httpClient.put<boolean>(this.url + 'ChangeSensorConfiguration', request, this.httpRequest.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update sensor configuration. " + errorMsg())
      }

      this.getAllByHubId(hubId);
    });
  }

  unassignSensor(request: UnassignSensorRequest, hubId: number) {
    this.httpClient.put<boolean>(this.url + 'UnassignSensor', request, this.httpRequest.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update sensor. " + errorMsg())
      }

      this.getAllByHubId(hubId);
    });
  }
}
