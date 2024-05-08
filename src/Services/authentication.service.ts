import { Injectable } from '@angular/core';
import { UserModel } from '../Interfaces/Models/UserModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../Interfaces/DTO/Token';
import { LoginRequest } from '../Interfaces/DTO/login-request';
import { AsyncPipe } from '@angular/common';

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

  constructor(private httpClient: HttpClient, private async: AsyncPipe) { };

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
    };
  };

  getRoleId(): number {
    let temp = JSON.parse(atob(sessionStorage.getItem("accessToken")!.split('.')[1]));

    if (temp.role == 'Support') {
      return 1;
    }
    else if (temp.role == 'Admin') {
      return 2;
    }

    return 0;
  }

  isAdmin(): boolean {
    if (!this.async.transform(this.loggedIn$)) {
      return false;
    }

    let temp = this.getRoleId();

    if (temp > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  isSupport(): boolean {
    if (!this.async.transform(this.loggedIn$)) {
      return false;
    }

    let temp = this.getRoleId();

    if (temp > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getUserId(): string {
    let temp = JSON.parse(atob(sessionStorage.getItem("accessToken")!.split('.')[1])) as JwtClaims;

    return temp.UserId;
  }
};

export interface JwtClaims {
  UserId: string;
  role: string;
}

