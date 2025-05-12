import type { SimulatedData } from '../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Thermometer, Droplet, ThumbsDown, ThumbsUp } from 'lucide-react';

interface SimulatedDisplayProps {
  data: SimulatedData | null;
}

export function SimulatedDisplay({ data }: SimulatedDisplayProps) {
  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-primary">Simulated Data</CardTitle>
        {/* Placeholder for potentiometer value or status */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Thermometer className="h-6 w-6 text-destructive" />
          <div>
            <p className="text-sm text-muted-foreground">Temperature</p>
            <p className="text-2xl font-bold">
              {data ? `${data.temperature.toFixed(1)}°C` : '---'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Droplet className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-2xl font-bold">
              {data ? `${data.humidity.toFixed(1)}%` : '---'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {data ? (
            data.presence ? (
              <ThumbsUp className="h-6 w-6 text-green-600" />
            ) : (
              <ThumbsDown className="h-6 w-6 text-red-600" />
            )
          ) : (
            <div className="h-6 w-6 text-muted-foreground">---</div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">Presença</p>
            <p className="text-2xl font-bold">
              {data ? (data.presence ? "Detectada" : "Ausente") : '---'}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
