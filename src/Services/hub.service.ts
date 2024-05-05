import { Injectable } from '@angular/core';
import { IHubService } from '../Interfaces/Services/IHubService';
import { HubModel } from '../Interfaces/Models/HubModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { errorMsg } from '../Utility/GetErrorMessage';
import { AssignHubRequest } from '../Interfaces/DTO/assign-hub-request';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class HubService implements IHubService {
  url: string = 'https://localhost:7129/api/Hubs/';

  private hubs: Array<HubModel> = [];

  private hubsSubject$: Subject<HubModel[]> = new BehaviorSubject<HubModel[]>(this.hubs);
  hubs$: Observable<HubModel[]> = this.hubsSubject$.asObservable();

  private unassignedHubsSubject$: Subject<HubModel[]> = new BehaviorSubject<HubModel[]>(this.hubs);
  unassignedHubs$: Observable<HubModel[]> = this.unassignedHubsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getMyHubs(): void {
    this.hubsSubject$.next(this.hubs);

    this.httpClient.get<HubModel[]>(this.url + 'GetMyHubs', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.hubsSubject$.next(x);
    });
  }

  getUnassignedHubs(): void {
    this.unassignedHubsSubject$.next(this.hubs);

    this.httpClient.get<HubModel[]>(this.url + 'GetUnassignedHubs', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.unassignedHubsSubject$.next(x);
    });
  }

  assignHubToUser(request: AssignHubRequest): void {
    this.httpClient.put<boolean>(this.url + 'AssignHub', request, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to assign hub. " + errorMsg())
      }

      this.getMyHubs();
    });
  }

  updateHub(hub: HubModel): void {
    this.httpClient.put<boolean>(this.url + 'Update', hub, this.httpOptions.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update hub. " + errorMsg())
      }

      this.getMyHubs();
    });
  }
}
