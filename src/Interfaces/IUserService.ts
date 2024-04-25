import { UserHubModel } from "./UserHubModel";
import { UserModel } from "./UserModel";

export interface IUserService {
  getUserList(): Array<UserModel>;
  createUser(user: UserModel): boolean;
  updateUser(user: UserModel): boolean;
  assignHubToUser(userHub: UserHubModel): boolean;
  deleteUser(id: number): boolean;
}
