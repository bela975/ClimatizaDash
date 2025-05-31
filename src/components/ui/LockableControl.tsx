"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { updateControlState } from "@/lib/updateControlState"

export function LockableControl() {
  const [coverOn, setCoverOn] = useState(true)
  const [turnOn, setTurnOn] = useState(true)

  useEffect(() => {
    updateControlState({
      coverOn,
      override: !coverOn,
      turnOn,
      estado: turnOn ? "ligado" : "desligado"
    })
  }, [coverOn, turnOn])

  const toggleCover = () => {
    const newState = !coverOn
    setCoverOn(newState)

    updateControlState({
      coverOn: newState,
      override: !newState
    })
  }

  const toggleSwitch = () => {
    if (!coverOn) {
      const newState = !turnOn
      setTurnOn(newState)

      updateControlState({
        turnOn: newState,
        override: true,
        estado: newState ? "ligado" : "desligado"
      })
    }
  }

  return (
    <div className="relative w-60 h-60 flex items-center justify-center perspective">
      {/* BASE AZUL CLARO */}
      <div
        className="absolute w-36 h-36 bg-transparent border-[6px] rounded-md z-10"
        style={{
          borderColor: "#4C9AA9",
          boxShadow: "0 0 30px rgba(76,154,169,0.3)"
        }}
      />

      {/* TAMPA TRANSLÚCIDA */}
      <motion.div
        className="absolute w-36 h-36 border-4 rounded-md z-40 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center"
        animate={{ rotateX: coverOn ? 0 : -120 }}
        transition={{ duration: 0.6, type: "spring" }}
        onClick={toggleCover}
        style={{
          borderColor: "#4C9AA9",
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.15)"
        }}
      >
        <div className="text-center select-none">
          <p className="text-xs font-bold drop-shadow-sm" style={{ color: "#FE7902" }}>
            SISTEMA
          </p>
          <p className="text-xs font-bold drop-shadow-sm" style={{ color: "#4C9AA9" }}>
            MANUAL
          </p>
        </div>
      </motion.div>

      {/* BOTÃO FIXO */}
      <div
        className="absolute z-30 w-14 h-28 bg-gray-100 border-2 rounded-md flex flex-col justify-start items-center pt-3 pb-2 shadow-inner relative"
        style={{ borderColor: "#4C9AA9" }}
      >
        {/* TEXTO ON/OFF */}
        <span
          className={`text-xs font-bold mb-2 ${
            turnOn ? "text-[#FE7902]" : "text-gray-600"
          }`}
        >
          {turnOn ? "ON" : "OFF"}
        </span>

        {/* LINHA DO TRILHO */}
        <div className="absolute top-10 w-[2px] h-10 bg-gray-400 z-0" />

        {/* HASTE INTERNA MÓVEL */}
        <motion.div
          className="w-10 h-5 rounded-sm shadow-md z-10 relative"
          animate={{ y: turnOn ? 1 : 27 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            backgroundColor: turnOn ? "#FE7902" : "#6b7280",
            cursor: coverOn ? "not-allowed" : "pointer"
          }}
          onClick={toggleSwitch}
        />
      </div>
    </div>
  )
}
