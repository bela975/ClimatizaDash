import { ref, update } from "firebase/database"
import { database } from "@/app/firebase"

export async function updateControlState(data: {
  turnOn?: boolean
  coverOn?: boolean
  override?: boolean
  estado?: "ligado" | "desligado"
}) {
  try {
    const controlRef = ref(database, "control")
    await update(controlRef, data)
  } catch (error) {
    console.error("Erro ao atualizar controle no Firebase:", error)
  }
}
