import { ref, get, child, update } from "firebase/database"
import { database } from "@/app/firebase"

export async function updateControlState(data: { turnOn?: boolean; coverOn?: boolean; override?: boolean; estado?: "ligado" | "desligado" }) {
  try {
    const snapshot = await get(child(ref(database), "leituras"))
    if (!snapshot.exists()) return

    const keys = Object.keys(snapshot.val())
    const lastKey = keys[keys.length - 1]
    const lastRef = ref(database, `leituras/${lastKey}`)

    await update(lastRef, data)
  } catch (error) {
    console.error("Erro ao atualizar controle no Firebase:", error)
  }
}