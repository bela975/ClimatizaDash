import { useEffect, useState } from "react"
import { ref, onValue, query, limitToLast } from "firebase/database"
import { database } from "../app/firebase"

interface TimeSeriesDataPoint {
  timestamp: number;
  sensorTemp?: number;
  sensorHumidity?: number;
  simulatedTemp?: number;
  simulatedHumidity?: number;
  simulatedPeople?: number;
}

export function useTimeSeriesData(limit = 50) {
  const [dataPoints, setDataPoints] = useState<TimeSeriesDataPoint[]>([])

  useEffect(() => {
    const leiturasRef = ref(database, "leituras")
    const ultimasLeituras = query(leiturasRef, limitToLast(limit))

    const unsubscribe = onValue(ultimasLeituras, (snapshot) => {
      const val = snapshot.val()
      if (!val) return

      const pontos: TimeSeriesDataPoint[] = Object.entries(val).map(([horaChave, leitura]) => {
        const dados = leitura as any

        return {
          timestamp: parseHoraParaTimestamp(horaChave),
          sensorTemp: dados.temperatura,
          sensorHumidity: dados.umidade,
          simulatedTemp: undefined, // ainda não temos isso aqui
          simulatedHumidity: undefined,
          simulatedPeople: dados.presenca === "presente" ? 1 : 0,
        }
      })

      setDataPoints(pontos)
    })

    return () => unsubscribe()
  }, [limit])

  return dataPoints
}

// Exemplo de função para transformar "19:14:40" em timestamp
function parseHoraParaTimestamp(horaStr: string): number {
  const now = new Date()
  const [h, m, s] = horaStr.split(":").map(Number)
  now.setHours(h, m, s, 0)
  return now.getTime()
}
