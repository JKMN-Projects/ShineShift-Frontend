import { Injectable } from '@angular/core';
import { IUserService } from '../Interfaces/Services/IUserService';
import { UserModel } from '../Interfaces/Models/UserModel';
import { HttpRequestInterceptor } from '../Utility/HttpRequestInterceptor';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateUserRequest } from '../Interfaces/DTO/create-user-request';
import { errorMsg } from '../Utility/GetErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  url: string = 'https://localhost:7129/api/User/';

  private users: Array<UserModel> = [];
  private usersSubject$: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);
  users$: Observable<UserModel[]> = this.usersSubject$.asObservable();

  constructor(private httpRequest: HttpRequestInterceptor, private httpClient: HttpClient) { }

  getUserList(): void {
    this.usersSubject$.next(this.users);

    this.httpClient.get<UserModel[]>(this.url + 'GetAllUsers', this.httpRequest.getHttpOptions()).subscribe(x => {
      this.usersSubject$.next(x);
    });
  }

  createUser(user: CreateUserRequest): void {
    this.httpClient.post<boolean>(this.url + 'Create', user, this.httpRequest.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to create user. " + errorMsg())
      }

      this.getUserList();
    });
  }

  updateUser(user: UserModel): void {
    this.httpClient.put<boolean>(this.url + 'Update', user, this.httpRequest.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to update user. " + errorMsg())
      }

      this.getUserList();
    });
  }

  deleteUser(id: string): void {
    this.httpClient.put<boolean>(this.url + 'Delete/' + id, this.httpRequest.getHttpOptions()).subscribe(x => {
      if (!x) {
        alert("Failed to delete user. " + errorMsg())
      }

      this.getUserList();
    });
  }
}
