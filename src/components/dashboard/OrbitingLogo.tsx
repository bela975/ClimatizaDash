import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useRef } from "react"

export function OrbitingLogo() {
  const radius = 90
  const progress = useMotionValue(0)
  const ref = useRef<HTMLDivElement>(null)

  useAnimationFrame(() => {
    const speed = 0.0015
    progress.set((progress.get() + speed) % 1)
  })

  const angle = useTransform(progress, (p: number) => p * 2 * Math.PI)
  const sunX = useTransform(angle, (a: number) => Math.cos(a) * radius)
  const sunY = useTransform(angle, (a: number) => Math.sin(a) * radius)
  const moonX = useTransform(angle, (a: number) => Math.cos(a + Math.PI) * radius)
  const moonY = useTransform(angle, (a: number) => Math.sin(a + Math.PI) * radius)

  const brightnessFilter = useTransform(sunY, [-radius, radius], ["brightness(1.3)", "brightness(0.7)"])

  return (
    <motion.div
      ref={ref}
      className="relative w-[360px] h-[220px] flex items-center justify-center mb-10"
      style={{ filter: brightnessFilter }}
    >
      <motion.div className="absolute" style={{ x: sunX, y: sunY }}>
        <Sun className="w-7 h-7 text-[#fe7902]" />
      </motion.div>
      <motion.div className="absolute" style={{ x: moonX, y: moonY }}>
        <Moon className="w-7 h-7 text-[#4c9aa9]" />
      </motion.div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#4c9aa9] drop-shadow-sm z-10">
        Climatiza<br />
        <span className="text-[#fe7902]">Recife</span>
      </h1>
    </motion.div>
  )
}