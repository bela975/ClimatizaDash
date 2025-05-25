"use client"

import { SensorDisplay } from "../components/dashboard/sensor-display"
import { SimulatedDisplay } from "../components/dashboard/simulated-display"
import { TimeSeriesChart } from "../components/dashboard/time-series-chart"
import { useMockData } from "../hooks/use-mock-data"
import { useTimeSeriesData } from "@/hooks/useTimeSeriesData"
import { PotentiometerPanel } from "../components/dashboard/PotentiometerPanel"
import { useSensorData } from "@/hooks/useSensorData"
import { useSimulatedData } from "@/hooks/useSimulatedData"

import { Clock } from "lucide-react"
import { OrbitingLogo } from "@/components/dashboard/OrbitingLogo"
import { ClockNow } from "@/components/dashboard/ClockNow"
import { LockableControl } from "@/components/ui/LockableControl"

export default function Home() {
  const { potentiometerValue } = useMockData()
  const timeSeriesData = useTimeSeriesData()
  const sensorData = useSensorData()
  const simulatedData = useSimulatedData()

  return (
    <main className="flex min-h-screen flex-col items-center px-4 md:px-12 lg:px-24 py-10 bg-[#f5f7fa] text-[#111]">

      <div className="w-full max-w-4xl flex flex-col items-center gap-6 mb-10">
        <OrbitingLogo />

        <div className="flex gap-6 items-center">
          <div className="bg-[#e6f0ff] text-[#005BAC] rounded-xl shadow-md px-6 py-4 text-center flex flex-col items-center">
            <Clock className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-sm text-blue-500">Hora</p>
            <p className="text-4xl font-extrabold tracking-widest drop-shadow-sm">
              {sensorData?.hora ? sensorData.hora.slice(0, 5) : "--:--"}
            </p>
          </div>

          <LockableControl />
        </div>
      </div>

      {/* DISPLAYS DE SENSOR */}
      <div className="mb-10">
        <SensorDisplay data={sensorData} />
      </div>

      {/* GRÁFICO */}
      <div className="w-full max-w-6xl">
        <TimeSeriesChart data={timeSeriesData} />
      </div>
    </main>
  )
}