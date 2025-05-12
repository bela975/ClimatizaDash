"use client";

import { SensorDisplay } from "../components/dashboard/sensor-display";
import { SimulatedDisplay } from "../components/dashboard/simulated-display";
import { TimeSeriesChart } from "../components/dashboard/time-series-chart";
import { useMockData } from "../hooks/use-mock-data";
import { useTimeSeriesData } from "@/hooks/useTimeSeriesData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Slider } from "../components/ui/slider"; // Assuming you might want manual control later
import { PotentiometerPanel } from "../components/dashboard/PotentiometerPanel"
import { useSensorData } from "@/hooks/useSensorData";
import { useSimulatedData } from "@/hooks/useSimulatedData";

export default function Home() {
  const { potentiometerValue } = useMockData();
  const timeSeriesData = useTimeSeriesData()
  const sensorData = useSensorData()
  const simulatedData = useSimulatedData()

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-background">
      <h1 className="text-4xl font-bold text-primary mb-8">Sensor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-8">
      <PotentiometerPanel label="Temp. Simulada" firebaseKey="temperatura_simulada" type="percent" />
      <PotentiometerPanel label="Umidade Simulada" firebaseKey="umidade_simulada" type="percent" />
      <PotentiometerPanel label="Presença Simulada" firebaseKey="presenca_simulada" type="presence" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
        <SensorDisplay data={sensorData} />
        <SimulatedDisplay data={simulatedData} />
      </div>

      <div className="w-full max-w-6xl">
        <TimeSeriesChart data={timeSeriesData} />
      </div>
    </main>
  );
}
