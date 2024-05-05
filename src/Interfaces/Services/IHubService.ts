import { AssignHubRequest } from "../DTO/assign-hub-request";
import { HubModel } from "../Models/HubModel";

export interface IHubService {
  getMyHubs(): void;
  getUnassignedHubs(): void;
  assignHubToUser(request: AssignHubRequest): void;
  updateHub(hub: HubModel): void;
}
