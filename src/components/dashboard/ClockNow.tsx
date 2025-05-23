interface ClockNowProps {
  hora: string | undefined;
}

export function ClockNow({ hora }: ClockNowProps) {
  const formatted = hora?.slice(0, 5) ?? "--:--"

  return (
    <div className="text-[#005BAC] text-3xl font-bold tracking-widest">
      {formatted}
    </div>
  )
}
