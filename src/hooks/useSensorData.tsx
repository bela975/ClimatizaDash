import { useEffect, useState } from "react"
import { ref, onValue, query, limitToLast, DatabaseReference } from "firebase/database"
import { database } from "../app/firebase"

interface SensorReading {
    hora: string;
    presenca: string;
    temperatura: number;
    umidade: number;
}

export function useSensorData() {
    const [data, setData] = useState<SensorReading | null>(null)

    useEffect(() => {
        const leiturasRef = ref(database, "leituras")
        const ultimasLeituras = query(leiturasRef, limitToLast(1))

        const unsubscribe = onValue(ultimasLeituras, (snapshot) => {
            const val = snapshot.val()
            if (val) {
                const ultimaChave = Object.keys(val)[0]
                const ultimaLeitura = val[ultimaChave]

                setData({
                    hora: ultimaLeitura.hora,
                    presenca: ultimaLeitura.presenca,
                    temperatura: ultimaLeitura.temperatura,
                    umidade: ultimaLeitura.umidade,
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return data
}
