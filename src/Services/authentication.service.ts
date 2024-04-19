import { Injectable } from '@angular/core';
import { UserModel } from '../Interfaces/UserModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../Interfaces/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = /*environment.config.apiUrl +*/ "/api/UserModel";
  registerEndpoint: string = "/register";
  loginEndpoint: string = "/login";

  private loggedInSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject$.asObservable();

  constructor(private httpClient: HttpClient) { };

  getToken(login: UserModel) {
    this.httpClient.post<Token>(this.url + this.loginEndpoint, login).subscribe(x => {
      this.checkResponse(x);
    });
  };

  removeToken() {
    sessionStorage.removeItem("token");
    this.loggedInSubject$.next(false);
  };

  register(login: UserModel) {
    this.httpClient.post<Token>(this.url + this.registerEndpoint, login).subscribe(x => {
      this.checkResponse(x);
    });
  };

  checkResponse(x: Token) {
    if (x.token != null || x.token != undefined) {
      sessionStorage.setItem("token", x.token);
      this.loggedInSubject$.next(true);
    };
  };
};
