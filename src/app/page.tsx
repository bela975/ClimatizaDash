"use client"

import { useRef } from "react"
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

  const lastHora = useRef<string>("--:--")
  const lastTemperatura = useRef<number | null>(null)
  const lastUmidade = useRef<number | null>(null)
  const lastPresenca = useRef<string | null>(null)

  if (sensorData?.hora) lastHora.current = sensorData.hora
  if (typeof sensorData?.temperatura === "number") lastTemperatura.current = sensorData.temperatura
  if (typeof sensorData?.umidade === "number") lastUmidade.current = sensorData.umidade
  if (typeof sensorData?.presenca === "string") lastPresenca.current = sensorData.presenca

const safeSensorData = {
  hora: lastHora.current ?? "--:--",
  temperatura: lastTemperatura.current ?? 0,
  umidade: lastUmidade.current ?? 0,
  presenca: lastPresenca.current ?? "ausente",
}

  return (
    <main className="flex min-h-screen flex-col items-center px-4 md:px-12 lg:px-24 py-10 bg-[#f5f7fa] text-[#111]">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6 mb-10">
        <OrbitingLogo />

        <div className="flex gap-6 items-center">
          <div
            className="bg-[#e6f0ff] text-[#005BAC] rounded-xl shadow-md 
                      w-[200px] min-w-[200px] max-w-[200px] 
                      h-[160px] min-h-[160px] max-h-[160px] 
                      flex flex-col items-center justify-center text-center"
          >
            <Clock className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-sm text-blue-500">Hora</p>
            <p className="text-4xl font-extrabold tracking-widest drop-shadow-sm">
              {safeSensorData.hora?.slice(0, 5)}
            </p>
          </div>

          <LockableControl />
        </div>
      </div>

      <div className="mb-10">
        <SensorDisplay data={safeSensorData} />
      </div>

      <div className="w-full max-w-6xl">
        <TimeSeriesChart data={timeSeriesData} />
      </div>
    </main>
  )
}
