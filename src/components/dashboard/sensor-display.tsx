import type { SensorReading } from '../../lib/types'
import { Card, CardContent } from "../ui/card"
import { Thermometer, Droplet, User } from 'lucide-react'
import clsx from 'clsx'

interface SensorDisplayProps {
  data: SensorReading | null
}

export function SensorDisplay({ data }: SensorDisplayProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">

      {/* TEMPERATURA */}
      <Card className="bg-[#001F4D] text-white rounded-xl border-none shadow-md 
                      w-[180px] min-w-[180px] max-w-[180px] 
                      h-[150px] min-h-[150px] max-h-[150px]">
        <CardContent className="flex flex-col items-center justify-center text-center h-full">
          <Thermometer className="w-6 h-6 mb-2 text-red-400" />
          <p className="text-sm text-blue-200">Temperatura</p>
          <p className="text-2xl font-bold">
            {typeof data?.temperatura === "number"
              ? `${data.temperatura.toFixed(1).replace(".", ",")}°C`
              : '---'}
          </p>
        </CardContent>
      </Card>

      {/* UMIDADE */}
      <Card className="bg-[#001F4D] text-white rounded-xl border-none shadow-md 
                      w-[180px] min-w-[180px] max-w-[180px] 
                      h-[150px] min-h-[150px] max-h-[150px]">
        <CardContent className="flex flex-col items-center justify-center text-center h-full">
          <Droplet className="w-6 h-6 mb-2 text-blue-400" />
          <p className="text-sm text-blue-200">Umidade</p>
          <p className="text-2xl font-bold">
            {typeof data?.umidade === "number"
              ? `${data.umidade.toFixed(1).replace(".", ",")}%`
              : '---'}
          </p>
        </CardContent>
      </Card>

      {/* PRESENÇA */}
      <Card
        className={clsx(
          "relative overflow-hidden rounded-xl border-none shadow-md text-white transition-colors duration-500",
          "w-[180px] min-w-[180px] max-w-[180px] h-[150px] min-h-[150px] max-h-[150px]",
          data?.presenca === "presente" ? "bg-green-600" : "bg-[#001F4D]"
        )}
      >
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-full bg-green-700 opacity-30 z-0 transition-all duration-700 ease-in-out rounded-t-full",
            data?.presenca === "presente"
              ? "h-full"
              : "h-0"     
          )}
        />

        <CardContent className="relative z-10 flex flex-col items-center justify-center text-center h-full">
          <User className="w-6 h-6 mb-2" />
          <p className="text-sm text-blue-200">Presença</p>
          <p className="text-2xl font-bold font-mono">
            {data?.presenca === "presente" ? "Detectada" : "Ausente"}
          </p>
        </CardContent>
      </Card>

    </div>
  )
}
