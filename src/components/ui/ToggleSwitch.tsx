import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <Label htmlFor="ligar" className="text-lg font-semibold text-[#005BAC]">
        Monitoramento
      </Label>
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium ${
            enabled ? "text-green-600" : "text-gray-500"
          }`}
        >
          {enabled ? "Ligado" : "Desligado"}
        </span>
        <Switch
          id="ligar"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>
    </div>
  );
}
