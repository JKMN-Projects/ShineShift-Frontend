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
import { SensorReadingModel } from '../Interfaces/Models/SensorReadingModel';

@Injectable({
  providedIn: 'root'
})
export class SensorService implements ISensorService {
  url: string = 'https://ShineShiftAPI.bm-vault.com/api/Sensors/';
  readingsUrl: string = 'https://ShineShiftAPI.bm-vault.com/api/SensorReadings/';
  localUrl: string = 'https://localhost:7129/api/Sensors/';
  localReadingsUrl: string = 'https://localhost:7129/api/SensorReadings/';

  private sensors: Array<SensorModel> = [];
  private sensorReading: Array<SensorReadingModel> = [];

  private sensorsSubject$: Subject<SensorModel[]> = new BehaviorSubject<SensorModel[]>(this.sensors);
  sensors$: Observable<SensorModel[]> = this.sensorsSubject$.asObservable();

  private unassignedSensorsSubject$: Subject<SensorModel[]> = new BehaviorSubject<SensorModel[]>(this.sensors);
  unassignedSensors$: Observable<SensorModel[]> = this.unassignedSensorsSubject$.asObservable();

  private sensorReadingSubject$: Subject<SensorReadingModel[]> = new BehaviorSubject<SensorReadingModel[]>(this.sensorReading);
  sensorReading$: Observable<SensorReadingModel[]> = this.sensorReadingSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getAllByHubId(hubId: number) {
    this.sensorsSubject$.next(this.sensors);

    this.httpClient.get<SensorModel[]>(this.url + 'GetAllByHubId/' + hubId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.sensorsSubject$.next(x);
    });
  }

  getAllBySensorId(sensorId: number) {
    this.sensorReadingSubject$.next(this.sensorReading);

    this.httpClient.get<SensorReadingModel[]>(this.readingsUrl + 'GetAllBySensorId/' + sensorId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.sensorReadingSubject$.next(x);
    });
  }

  getUnassignedSensors(): void {
    this.unassignedSensorsSubject$.next(this.sensors);

    this.httpClient.get<SensorModel[]>(this.url + 'GetUnassignedSensors', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.unassignedSensorsSubject$.next(x);
    });
  }

  changeSensorConfiguration(request: ChangeSensorConfigurationRequest, hubId: number) {
    this.httpClient.put<any>(this.url + 'ChangeSensorConfiguration', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to update sensor configuration. " + errorMsg())
      }

      this.getAllByHubId(hubId);
    });
  }

  assignSensor(request: AssignSensorRequest): void {
    this.httpClient.put<any>(this.url + 'AssignSensorToHub', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to assign sensor. " + errorMsg())
      }
    });
  }

  unassignSensor(request: UnassignSensorRequest, hubId: number) {
    this.httpClient.put<any>(this.url + 'UnassignSensor', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to update sensor. " + errorMsg())
      }

      this.getAllByHubId(hubId);
    });
  }

  updateSensor(request: UpdateSensorRequest): void {
    this.httpClient.put<any>(this.url + 'UpdateSensor', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to update sensor. " + errorMsg())
      }
    });
  }
}
