import { useEffect, useState } from "react"
import { ref, onValue, database } from "../app/firebase"

interface SimulatedData {
    temperature: number
    humidity: number
    presence: boolean
}

export function useSimulatedData() {
    const [data, setData] = useState<SimulatedData | null>(null)

    useEffect(() => {
        const tempRef = ref(database, "/sensores/temperatura_simulada")
        const humRef = ref(database, "/sensores/umidade_simulada")
        const presRef = ref(database, "/sensores/presenca_simulada")

        let temperature = 0
        let humidity = 0
        let presence = false

        const unsubTemp = onValue(tempRef, (snap) => {
            const val = snap.val()
            if (typeof val === "number") {
                temperature = val
                setData((prev) => ({
                    temperature: val,
                    humidity: prev?.humidity ?? humidity,
                    presence: prev?.presence ?? presence,
                }))
            }
        })

        const unsubHum = onValue(humRef, (snap) => {
            const val = snap.val()
            if (typeof val ==="number") {
                humidity = val
                setData((prev) => ({
                    temperature: prev?.temperature ?? temperature,
                    humidity: val,
                    presence: prev?.presence ?? presence,
                }))
            }
        })

        const unsubPres = onValue(presRef, (snap) => {
            const val = snap.val()
            if (typeof val === "boolean"){
                presence = val
                setData((prev) => ({
                    temperature: prev?.temperature ?? temperature,
                    humidity: prev?.humidity ?? humidity,
                    presence: val,
                }))
            }
        })

        return () => {
            unsubTemp()
            unsubHum()
            unsubPres()
        }
    }, [])

    return data
}