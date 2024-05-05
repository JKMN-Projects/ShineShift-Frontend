import { ChangeSensorConfigurationRequest } from "../../app/change-sensor-configuration-request";
import { UnassignSensorRequest } from "../../app/unassign-sensor-request";
import { SensorModel } from "../Models/SensorModel";
import { RegisterSensorRequest } from "../DTO/register-sensor-request";

export interface ISensorService {
  getAllByHubId(hubId: number): void;
  registerSensor(sensor: RegisterSensorRequest): void;
  // assignSensor(sensor: SensorModel): void;
  unassignSensor(sensor: UnassignSensorRequest): void;
  // changeSensorConfiguration(sensor: ChangeSensorConfigurationRequest): void;
}
