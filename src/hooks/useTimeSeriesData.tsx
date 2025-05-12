import { useEffect, useState } from "react";
import { ref, onValue, database } from "../app/firebase";

interface TimeSeriesDataPoint {
  timestamp: number;
  sensorTemp?: number;
  sensorHumidity?: number;
  simulatedTemp?: number;
  simulatedHumidity?: number;
  simulatedPeople?: number;
}

export function useTimeSeriesData(intervalMs = 5000) {
  const [dataPoints, setDataPoints] = useState<TimeSeriesDataPoint[]>([]);

  useEffect(() => {
    let sensorTemp = 0;
    let sensorHumidity = 0;
    let simulatedTemp = 0;
    let simulatedHumidity = 0;
    let simulatedPresence = false;

    const listeners = [
      { key: "temperatura_real", setter: (val: number) => (sensorTemp = val) },
      { key: "umidade_real", setter: (val: number) => (sensorHumidity = val) },
      { key: "temperatura_simulada", setter: (val: number) => (simulatedTemp = val) },
      { key: "umidade_simulada", setter: (val: number) => (simulatedHumidity = val) },
      { key: "presenca_simulada", setter: (val: boolean) => (simulatedPresence = val) },
    ];

    const unsubs = [
        onValue(ref(database, "/sensores/temperatura_real"), (snap) => {
          const val = snap.val();
          if (typeof val === "number") sensorTemp = val;
        }),
        onValue(ref(database, "/sensores/umidade_real"), (snap) => {
          const val = snap.val();
          if (typeof val === "number") sensorHumidity = val;
        }),
        onValue(ref(database, "/sensores/temperatura_simulada"), (snap) => {
          const val = snap.val();
          if (typeof val === "number") simulatedTemp = val;
        }),
        onValue(ref(database, "/sensores/umidade_simulada"), (snap) => {
          const val = snap.val();
          if (typeof val === "number") simulatedHumidity = val;
        }),
        onValue(ref(database, "/sensores/presenca_simulada"), (snap) => {
          const val = snap.val();
          if (typeof val === "boolean") simulatedPresence = val;
        }),
      ];

    const interval = setInterval(() => {
      const point: TimeSeriesDataPoint = {
        timestamp: Date.now(),
        sensorTemp,
        sensorHumidity,
        simulatedTemp,
        simulatedHumidity,
        simulatedPeople: simulatedPresence ? 1 : 0,
      };

      setDataPoints((prev) => [...prev.slice(-49), point]);
    }, intervalMs);

    return () => {
      unsubs.forEach((unsub) => unsub());
      clearInterval(interval);
    };
  }, [intervalMs]);

  return dataPoints;
}
