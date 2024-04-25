import { HubModel } from "./HubModel";

export interface IHubService {
  getUnassignedHubs(): Array<HubModel>;
  updateHub(hub: HubModel): boolean;
}
