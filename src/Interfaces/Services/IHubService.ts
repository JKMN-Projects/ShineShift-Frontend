import { AssignHubToUserRequest } from "../DTO/assign-hub-request";
import { HubModel } from "../Models/HubModel";

export interface IHubService {
  getMyHubs(userGuid: string): void;
  getUnassignedHubs(): void;
  assignHubToUser(request: AssignHubToUserRequest): void;
  updateHub(hub: HubModel): void;
}
