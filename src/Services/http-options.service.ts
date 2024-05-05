import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor() { }

  private setAuthHeader(): HttpHeaders {
    const token = sessionStorage.getItem("accessToken");
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getHttpOptions() {
    const headers = this.setAuthHeader();
    const httpOptions = {
      headers: headers
    };
    return httpOptions;
  }
}
