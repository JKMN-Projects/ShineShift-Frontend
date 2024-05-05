import { HubModel } from "../Models/HubModel";

export interface IHubService {
  getUnassignedHubs(): Array<HubModel>;
  updateHub(hub: HubModel): boolean;
}
