export interface SensorReadingModel {
  id: number,
  startTime: Date,
  readingTime: Date,
  timeSinceStart: number,
  value: number,
  sensorId: number
}
