import { Card, CardContent } from "../ui/card"
import { Thermometer, Droplet, User } from "lucide-react"
import clsx from "clsx"

interface PotentiometerPanelProps {
  label: string
  type: "percent" | "presence"
  value: number | null
}

export function PotentiometerPanel({ label, type, value }: PotentiometerPanelProps) {
  const isPresence = type === "presence"
  const displayValue = isPresence
    ? value === 1 ? "Detectada" : "Ausente"
    : value !== null
    ? `${value.toFixed(1).replace(".", ",")}${label.toLowerCase().includes("temp") ? "°C" : "%"}`
    : "---"

  const icon = isPresence
    ? <User className="w-6 h-6" />
    : label.toLowerCase().includes("umidade")
    ? <Droplet className="w-6 h-6" />
    : <Thermometer className="w-6 h-6" />

  const cardColor = isPresence && value === 1 ? "bg-green-600 text-white" : "bg-[#001F4D] text-white"

  return (
    <Card className={clsx("rounded-xl border-none shadow-md p-4 text-center", cardColor)}>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-blue-200">{label}</p>
        <div className="text-2xl font-bold">{displayValue}</div>
        <div className="mt-2">{icon}</div>
      </CardContent>
    </Card>
  )
}
