import { SensorReadingModel } from "../Models/SensorReadingModel";

export interface ISensorReadingService {
  getSensorReadings(id: number): Array<SensorReadingModel>;
}
