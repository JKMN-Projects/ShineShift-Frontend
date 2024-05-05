import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestInterceptor } from '../Utility/HttpRequestInterceptor';
import { SensorModel } from '../Interfaces/Models/SensorModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegisterSensorRequest } from '../Interfaces/DTO/register-sensor-request';
import { ISensorService } from '../Interfaces/Services/ISensorService';
import { ChangeSensorConfigurationRequest } from '../app/change-sensor-configuration-request';
import { UnassignSensorRequest } from '../app/unassign-sensor-request';

@Injectable({
  providedIn: 'root'
})
export class SensorService implements ISensorService {
  url: string = 'https://localhost:7129/api/Sensors/';

  private sensors: Array<SensorModel> = [];
  private sensorsSubject$: Subject<SensorModel[]> = new BehaviorSubject<SensorModel[]>(this.sensors);
  sensors$: Observable<SensorModel[]> = this.sensorsSubject$.asObservable();

  constructor(private setHttpHeader: HttpRequestInterceptor, private httpClient: HttpClient) { }

  getAllByHubId(hubId: number) {
    const headers = this.setHttpHeader.setAuthHeader();
    const httpOptions = {
      headers: headers
    };

    this.httpClient.get<SensorModel[]>(this.url + 'GetAllByHubId/' + hubId, httpOptions).subscribe(x => {

    });
  }

  // changeSensorConfiguration(request: ChangeSensorConfigurationRequest) {
  //   const headers = this.setHttpHeader.setAuthHeader();
  //   const httpOptions = {
  //     headers: headers
  //   };

  //   this.httpClient.post<SensorModel[]>(this.url + 'ChangeSensorConfiguration', request, httpOptions).subscribe(x => {

  //   });
  // }

  unassignSensor(request: UnassignSensorRequest) {
    const headers = this.setHttpHeader.setAuthHeader();
    const httpOptions = {
      headers: headers
    };

    this.httpClient.put<SensorModel[]>(this.url + 'UnassignSensor', request, httpOptions).subscribe(x => {

    });
  }

  registerSensor(request: RegisterSensorRequest) {
    const headers = this.setHttpHeader.setAuthHeader();
    const httpOptions = {
      headers: headers
    };

    this.httpClient.post<SensorModel[]>(this.url + 'RegisterSensor', request, httpOptions).subscribe(x => {

    });
  }
}
