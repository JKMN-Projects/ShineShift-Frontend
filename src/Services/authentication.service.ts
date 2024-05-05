import { Injectable } from '@angular/core';
import { UserModel } from '../Interfaces/Models/UserModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../Interfaces/DTO/Token';
import { LoginRequest } from '../Interfaces/DTO/login-request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = 'https://localhost:7129/api/Auth/';

  private loggedInSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject$.asObservable();

  constructor(private httpClient: HttpClient) { };

  getToken(login: LoginRequest) {
    this.httpClient.post<Token>(this.url + 'Login', login).subscribe(x => {
      this.checkResponse(x);
    });
  };

  refreshToken() {
    return this.httpClient.post<Token>(this.url + 'Refresh', {}, httpOptions);
  }

  removeToken() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("roleId");
    this.loggedInSubject$.next(false);
  };

  register(login: UserModel) {
    this.httpClient.post<Token>(this.url + 'Register', login).subscribe(x => {
      this.checkResponse(x);
    });
  };

  checkResponse(x: Token) {
    if (x.accessToken.length > 0) {
      sessionStorage.setItem("accessToken", x.accessToken);
      sessionStorage.setItem("refreshToken", x.refreshToken);

      this.loggedInSubject$.next(true);

      let temp = JSON.parse(atob(sessionStorage.getItem("accessToken")!.split('.')[1]));

      sessionStorage.setItem("userId", temp.UserId);
      sessionStorage.setItem("roleId", temp.role);
    };
  };

  getRoleId(): number {
    return Number.parseInt(sessionStorage.getItem("roleId") ?? "0");
  }

  isAdmin(): boolean {
    let temp = this.getRoleId();

    if (temp > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  isSupport(): boolean {
    let temp = this.getRoleId();

    if (temp > 0) {
      return true;
    }
    else {
      return false;
    }
  }
};

export interface JwtClaims {
  userId: string;
  role: string;
}
