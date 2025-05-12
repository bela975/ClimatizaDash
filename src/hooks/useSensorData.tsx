import { useEffect, useState } from "react"
import { ref, onValue, database } from "../app/firebase"

interface SensorReading {
    temperature: number;
    humidity: number;
}

export function useSensorData() {
    const [data, setData] = useState<SensorReading |  null>(null)
    
    useEffect(() => {
        const tempRef = ref(database, "/sensores/temperatura_real")
        const humRef = ref(database, "/sensores/umidade_real")

        let temperature = 0
        let humidity = 0

        const unsubTemp = onValue(tempRef, (snap) => {
            const val = snap.val()
            if (typeof val === "number") {
                temperature = val
                setData((prev) => ({
                    temperature: val,
                    humidity: prev?.humidity ?? humidity,
                }))
            }
        })

        const unsubHum = onValue(humRef, (snap) => {
            const val = snap.val()
            if (typeof val === "number") {
                humidity = val
                setData((prev) => ({
                    temperature: prev?.temperature ?? temperature,
                    humidity: val,
                }))
            }
        })

        return () => {
            unsubTemp()
            unsubHum()
        }
    }, [])

    return data
}