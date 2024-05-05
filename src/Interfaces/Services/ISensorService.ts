import { AssignSensorRequest } from "../DTO/assign-sensor-request";
import { ChangeSensorConfigurationRequest } from "../DTO/change-sensor-configuration-request";
import { UnassignSensorRequest } from "../DTO/unassign-sensor-request";
import { UpdateSensorRequest } from "../DTO/update-sensor-request";

export interface ISensorService {
  getAllByHubId(hubId: number): void;
  getUnassignedSensors(): void;
  updateSensor(request: UpdateSensorRequest): void;
  assignSensor(request: AssignSensorRequest): void;
  unassignSensor(request: UnassignSensorRequest, hubId: number): void;
  changeSensorConfiguration(request: ChangeSensorConfigurationRequest, hubId: number): void;
}
