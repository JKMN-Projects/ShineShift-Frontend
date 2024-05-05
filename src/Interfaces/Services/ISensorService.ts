import { ChangeSensorConfigurationRequest } from "../DTO/change-sensor-configuration-request";
import { UnassignSensorRequest } from "../DTO/unassign-sensor-request";
import { SensorModel } from "../Models/SensorModel";

export interface ISensorService {
  getAllByHubId(hubId: number): void;
  getUnassignedSensors(): void;
  assignSensor(sensor: SensorModel): void;
  unassignSensor(sensor: UnassignSensorRequest, hubId: number): void;
  changeSensorConfiguration(sensor: ChangeSensorConfigurationRequest, hubId: number): void;
}
