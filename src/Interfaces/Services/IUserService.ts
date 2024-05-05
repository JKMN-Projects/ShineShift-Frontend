import { CreateUserRequest } from "../DTO/create-user-request";
import { UserHubModel } from "../Models/UserHubModel";
import { UserModel } from "../Models/UserModel";

export interface IUserService {
  getUserList(): void;
  createUser(user: CreateUserRequest): void;
  updateUser(user: UserModel): void;
  deleteUser(id: string): void;
}
