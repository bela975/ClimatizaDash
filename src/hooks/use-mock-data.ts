"use client";

import { useState, useEffect, useRef } from 'react';
import type { SensorReading, SimulatedData, TimeSeriesDataPoint } from '../lib/types';

const MAX_DATA_POINTS = 50; // Keep the last N data points for the chart

// Simulate potentiometer input (0 to 100)
function useSimulatedPotentiometer() {
  const [value, setValue] = useState(50); // Start in the middle

  useEffect(() => {
    // Simulate potentiometer changes slightly over time
    const interval = setInterval(() => {
      setValue(prev => {
        const change = (Math.random() - 0.5) * 10; // Random change +/- 5
        let newValue = prev + change;
        newValue = Math.max(0, Math.min(100, newValue)); // Clamp between 0 and 100
        return Math.round(newValue);
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return value;
}

export function useMockData() {
  const [sensorData, setSensorData] = useState<SensorReading | null>(null);
  const [simulatedData, setSimulatedData] = useState<SimulatedData | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesDataPoint[]>([]);
  const potentiometerValue = useSimulatedPotentiometer();
  const initialDataGenerated = useRef(false);


  // Function to generate a single new data point
  const generateNewPoint = (potValue: number): TimeSeriesDataPoint => {
    const timestamp = Date.now();

    // Simulate DHT11 readings
    const sensorTemp = 20 + Math.random() * 5; // Base 20C +/- 2.5C
    const sensorHumidity = 40 + Math.random() * 10; // Base 40% +/- 5%

    // Simulate data based on potentiometer
    // Map potValue (0-100) to reasonable ranges
    const simulatedTemp = 15 + (potValue / 100) * 20; // 15C to 35C
    const simulatedHumidity = 30 + (potValue / 100) * 40; // 30% to 70%
    const simulatedPeople = Math.floor((potValue / 100) * 10); // 0 to 10 people

    // Update the latest individual readings
    setSensorData({ temperature: sensorTemp, humidity: sensorHumidity });
    setSimulatedData({ temperature: simulatedTemp, humidity: simulatedHumidity, peopleCount: simulatedPeople });

    return {
      timestamp,
      sensorTemp,
      sensorHumidity,
      simulatedTemp,
      simulatedHumidity,
      simulatedPeople,
    };
  };


   // Effect for initial data generation
  useEffect(() => {
    if (!initialDataGenerated.current && typeof window !== 'undefined') {
      const initialPoints: TimeSeriesDataPoint[] = [];
      const now = Date.now();
      for (let i = MAX_DATA_POINTS - 1; i >= 0; i--) {
          const potValue = 50 + (Math.random() - 0.5) * (i * 0.5); // Simulate some past variation
          const timestamp = now - i * 2000; // ~2 seconds apart

          const sensorTemp = 20 + Math.random() * 5;
          const sensorHumidity = 40 + Math.random() * 10;
          const simulatedTemp = 15 + (potValue / 100) * 20;
          const simulatedHumidity = 30 + (potValue / 100) * 40;
          const simulatedPeople = Math.floor((potValue / 100) * 10);

          initialPoints.push({
              timestamp,
              sensorTemp,
              sensorHumidity,
              simulatedTemp,
              simulatedHumidity,
              simulatedPeople,
          });
      }
      setTimeSeriesData(initialPoints);

       // Set the latest readings based on the last generated initial point
       if (initialPoints.length > 0) {
           const lastPoint = initialPoints[initialPoints.length - 1];
           setSensorData({ temperature: lastPoint.sensorTemp ?? 0, humidity: lastPoint.sensorHumidity ?? 0 });
           setSimulatedData({ temperature: lastPoint.simulatedTemp ?? 0, humidity: lastPoint.simulatedHumidity ?? 0, peopleCount: lastPoint.simulatedPeople ?? 0 });
       }


      initialDataGenerated.current = true;
    }
  }, []);


  // Effect for periodic updates after initial generation
  useEffect(() => {
     if (!initialDataGenerated.current) return; // Don't run interval until initial data is set

    const interval = setInterval(() => {
       if (typeof window !== 'undefined') { // Ensure this only runs client-side
           const newPoint = generateNewPoint(potentiometerValue);
           setTimeSeriesData(prevData => {
               const newData = [...prevData, newPoint];
               // Keep only the last MAX_DATA_POINTS
               return newData.slice(Math.max(newData.length - MAX_DATA_POINTS, 0));
           });
       }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [potentiometerValue, initialDataGenerated.current]); // Rerun when potentiometer changes

  return { sensorData, simulatedData, timeSeriesData, potentiometerValue };
}
