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
      <Card className="bg-[#001F4D] text-white rounded-xl border-none shadow-md p-4">
        <CardContent className="flex flex-col items-center text-center">
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
      <Card className="bg-[#001F4D] text-white rounded-xl border-none shadow-md p-4">
        <CardContent className="flex flex-col items-center text-center">
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
      <Card className={clsx(
        "rounded-xl border-none shadow-md p-4",
        data?.presenca === "presente" ? "bg-green-600 text-white" : "bg-[#001F4D] text-white"
      )}>
        <CardContent className="flex flex-col items-center text-center">
          <User className="w-6 h-6 mb-2" />
          <p className="text-sm text-blue-200">Presença</p>
          <p className="text-2xl font-bold">
            {data?.presenca === "presente" ? "Detectada" : "Ausente"}
          </p>
        </CardContent>
      </Card>

    </div>
  )
}
