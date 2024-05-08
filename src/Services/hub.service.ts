import { Injectable } from '@angular/core';
import { IHubService } from '../Interfaces/Services/IHubService';
import { HubModel } from '../Interfaces/Models/HubModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { errorMsg } from '../Utility/GetErrorMessage';
import { AssignHubToUserRequest } from '../Interfaces/DTO/assign-hub-request';
import { HttpOptionsService } from './http-options.service';
import { UnassignHubRequest } from '../Interfaces/DTO/unassign-hub-request';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HubService implements IHubService {
  url: string = 'https://ShineShiftAPI.bm-vault.com/api/Hubs/';
  localUrl: string = 'https://localhost:7129/api/Hubs/';

  private hubs: Array<HubModel> = [];

  private hubsSubject$: Subject<HubModel[]> = new BehaviorSubject<HubModel[]>(this.hubs);
  hubs$: Observable<HubModel[]> = this.hubsSubject$.asObservable();

  private unassignedHubsSubject$: Subject<HubModel[]> = new BehaviorSubject<HubModel[]>(this.hubs);
  unassignedHubs$: Observable<HubModel[]> = this.unassignedHubsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient, private authService: AuthenticationService) { }

  getMyHubs(userGuid: string): void {
    this.hubsSubject$.next(this.hubs);

    this.httpClient.get<HubModel[]>(this.url + 'GetMyHubs/' + userGuid, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.hubsSubject$.next(x);
    });
  }

  getUnassignedHubs(): void {
    this.unassignedHubsSubject$.next(this.hubs);

    this.httpClient.get<HubModel[]>(this.url + 'GetUnassignedHubs', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.unassignedHubsSubject$.next(x);
    });
  }

  assignHubToUser(request: AssignHubToUserRequest): void {
    this.httpClient.put<any>(this.url + 'AssignHubToUser', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to assign hub. " + errorMsg())
      }

      this.getMyHubs(request.userid);
    });
  }

  unassignHubToUser(request: UnassignHubRequest): void {
    this.httpClient.put<any>(this.url + 'UnassignHubToUser', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to unassign hub. " + errorMsg())
      }

      this.getMyHubs(this.authService.getUserId());
    });
  }

  updateHub(hub: HubModel): void {
    this.httpClient.put<any>(this.url + 'Update', hub, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to update hub. " + errorMsg())
      }

      this.getMyHubs(this.authService.getUserId());
    });
  }
}
