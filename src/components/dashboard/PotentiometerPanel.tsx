import React, { useEffect, useState } from "react"
import { ref, onValue, database } from "../../app/firebase"
import ReactSpeedometer from "react-d3-speedometer"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import potentiometerImg from "../../assets/images/potentiometer.png"

interface PotentiometerPanelProps {
  label: string;
  firebaseKey: string;
  type: "percent" | "presence";
}

export function PotentiometerPanel({ label, firebaseKey, type }: PotentiometerPanelProps) {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const sensorRef = ref(database, `/sensores/${firebaseKey}`);

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const val = snapshot.val();

      if (type === "presence") {
        setValue(val ? 100 : 0);
      } else {
        setValue(typeof val === "number" ? val : null);
      }
    });

    return () => unsubscribe();
  }, [firebaseKey, type]);

  const unit = label.toLowerCase().includes("temperatura")
    ? "°C"
    : label.toLowerCase().includes("umidade")
    ? "%"
    : "";

  const displayValue = value !== null ? `${value.toFixed(0)}${unit}` : "---";

  return (
    <Card 
      className="w-full max-w-sm border rounded-xl bg-gradient-to-b from-gray-200 to-gray-300 shadow-inner"
      style={{
        border: "2px solid #888",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.15)",
        backgroundImage:
          "repeating-linear-gradient(45deg, #d1d1d1, #d1d1d1 2px, #c7c7c7 2px, #c7c7c7 4px",
      }}>
      <CardHeader>
        <CardTitle className="text-xl text-center">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col items-center">
        
        {/* Display digital com unidade */}
        <div className="p-1 bg-[#333] rounded-lg shadow-inner w-fit">
          <div
            className="px-6 py-2 rounded-md border border-gray-500 bg-[#d6f5d6] text-black text-4xl font-mono tracking-wider"
            style={{
              fontWeight: 500,
              textAlign: "center",
              minWidth: "100px",
            }}
          >
            {displayValue}
          </div>
        </div>

        {/* Ponteiro giratório (gauge) */}
        <div className="w-full max-w-[200px] h-[160px] mt-4">
        <ReactSpeedometer
            value={value ?? 0}
            minValue={0}
            maxValue={100}
            customSegmentStops={[0, 20, 40, 60, 80, 100]}
            segmentColors={["#6ACDE5", "#00B6D3", "#0085BD", "#2A348E", "#102444"]}
            needleColor="black"
            ringWidth={30}
            textColor="transparent"
            needleTransitionDuration={400}
            height={160}
            width={200}
            />
        </div>


        {/* potenciometro giratorio */}

        <div className="mt-2">
            <img
                src={potentiometerImg.src}
                alt="Potenciômetro"
                className="w-24 h-24 transition-transform duration-500"
                style={{ transform: `rotate(${(value ?? 0) * 2.7 + 45}deg)`}}
            />
        </div>
      </CardContent>
    </Card>
  );
}
