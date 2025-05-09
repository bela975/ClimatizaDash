"use client";

import { SensorDisplay } from "../components/dashboard/sensor-display";
import { SimulatedDisplay } from "../components/dashboard/simulated-display";
import { TimeSeriesChart } from "../components/dashboard/time-series-chart";
import { useMockData } from "../hooks/use-mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Slider } from "../components/ui/slider"; // Assuming you might want manual control later

export default function Home() {
  const { sensorData, simulatedData, timeSeriesData, potentiometerValue } = useMockData();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-background">
      <h1 className="text-4xl font-bold text-primary mb-8">Sensor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
        <SensorDisplay data={sensorData} />
        <SimulatedDisplay data={simulatedData} />
      </div>

       {/* Optional: Display Potentiometer Value */}
       <Card className="w-full max-w-6xl mb-8 shadow-md transition-shadow hover:shadow-lg">
         <CardHeader>
           <CardTitle className="text-lg font-semibold text-primary">Potentiometer Control (Simulated)</CardTitle>
         </CardHeader>
         <CardContent className="flex items-center space-x-4">
           <Slider
             value={[potentiometerValue]}
             max={100}
             step={1}
             className="w-[80%]"
             disabled // Disabled as it's auto-simulated by the hook
           />
           <span className="text-lg font-semibold w-[20%] text-right">{potentiometerValue}%</span>
         </CardContent>
       </Card>

      <div className="w-full max-w-6xl">
        <TimeSeriesChart data={timeSeriesData} />
      </div>
    </main>
  );
}
