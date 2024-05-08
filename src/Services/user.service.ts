import { Injectable } from '@angular/core';
import { IUserService } from '../Interfaces/Services/IUserService';
import { UserModel } from '../Interfaces/Models/UserModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateUserRequest } from '../Interfaces/DTO/create-user-request';
import { errorMsg } from '../Utility/GetErrorMessage';
import { HttpOptionsService } from './http-options.service';
import { RoleModel } from '../Interfaces/Models/RoleModel';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  url: string = 'https://ShineShiftAPI.bm-vault.com/api/User/';

  private users: Array<UserModel> = [];
  private usersSubject$: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);
  users$: Observable<UserModel[]> = this.usersSubject$.asObservable();

  private roles: Array<RoleModel> = [];
  private rolesSubject$: Subject<RoleModel[]> = new BehaviorSubject<RoleModel[]>(this.roles);
  roles$: Observable<RoleModel[]> = this.rolesSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getUserList(): void {
    this.usersSubject$.next(this.users);

    this.httpClient.get<UserModel[]>(this.url + 'GetUserList', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.usersSubject$.next(x);
    });
  }

  getRoles(): void {
    this.rolesSubject$.next(this.roles);

    this.httpClient.get<RoleModel[]>(this.url + 'GetRoles', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.rolesSubject$.next(x);
    });
  }

  createUser(user: CreateUserRequest): void {
    this.httpClient.post<any>(this.url + 'Create', user, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to create user. " + errorMsg())
      }

      this.getUserList();
    });
  }

  updateUser(user: UserModel): void {
    this.httpClient.put<any>(this.url + 'Update', user, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to update user. " + errorMsg())
      }

      this.getUserList();
    });
  }

  deleteUser(id: string): void {
    this.httpClient.put<any>(this.url + 'Delete/' + id, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to delete user. " + errorMsg())
      }

      this.getUserList();
    });
  }
}
