export interface SensorReading {
  temperature: number;
  humidity: number;
}

export interface SimulatedData {
  temperature: number;
  humidity: number;
  peopleCount: number;
}

export interface TimeSeriesDataPoint {
  timestamp: number; // Unix timestamp or JS Date timestamp
  sensorTemp?: number;
  sensorHumidity?: number;
  simulatedTemp?: number;
  simulatedHumidity?: number;
  simulatedPeople?: number;
}
