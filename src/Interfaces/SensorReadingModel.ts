export interface SensorReadingModel {
  id: string,
  startTime: Date,
  readingTime: Date,
  timeSinceStart: number,
  value: JSON,
  sensorId: string
}
