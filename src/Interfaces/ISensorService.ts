import { SensorModel } from "./SensorModel";

export interface ISensorService {
  getSensorList(hubId: string): Array<SensorModel>;
  assignSensor(sensor: SensorModel): boolean;
}
