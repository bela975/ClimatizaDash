"use client";

import type { TimeSeriesDataPoint } from '@/lib/types';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo, useState, useEffect } from 'react';

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
}

const chartConfig = {
  sensorTemp: {
    label: "Sensor Temp (°C)",
    color: "hsl(var(--chart-1))", // Blue
  },
  sensorHumidity: {
    label: "Sensor Hum (%)",
    color: "hsl(var(--chart-2))", // Green
  },
  simulatedTemp: {
    label: "Simulated Temp (°C)",
    color: "hsl(var(--chart-3))", // Red (example) - dotted
  },
  simulatedHumidity: {
    label: "Simulated Hum (%)",
    color: "hsl(var(--chart-4))", // Orange (example) - dotted
  },
  simulatedPeople: {
    label: "People Count",
    color: "hsl(var(--chart-5))", // Purple (example) - dotted
  },
} satisfies ChartConfig;

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const formattedData = useMemo(() => {
      if (!isClient) return []; // Prevent server/client mismatch during initial render

      return data.map((point) => ({
        ...point,
        timeLabel: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      }));
    }, [data, isClient]);


  if (!isClient) {
    // Render placeholder or null during SSR and initial client render
    return (
       <Card className="shadow-md transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Time Series Data</CardTitle>
          <CardDescription>Sensor and Simulated Readings Over Time</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
             Loading chart...
           </div>
        </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <TrendingUp className="h-4 w-4" /> Showing latest data
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary">Time Series Data</CardTitle>
        <CardDescription>Sensor and Simulated Readings Over Time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={formattedData}
            margin={{
              left: 12,
              right: 12,
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="timeLabel"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value} // Already formatted
            />
             <YAxis
              yAxisId="temperature"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
              label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
              label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
            />
             <YAxis
              yAxisId="people"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5} // Adjust as needed
              domain={[0, 'dataMax + 1']} // Example domain
              allowDecimals={false}
              hide={true} // Hide axis, tooltip will show value
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(label) => `Time: ${label}`}
                />
              }
            />
            <Line
              dataKey="sensorTemp"
              type="monotone"
              stroke="var(--color-sensorTemp)"
              strokeWidth={2}
              dot={false}
              yAxisId="temperature"
            />
            <Line
              dataKey="sensorHumidity"
              type="monotone"
              stroke="var(--color-sensorHumidity)"
              strokeWidth={2}
              dot={false}
               yAxisId="humidity"
            />
             <Line
              dataKey="simulatedTemp"
              type="monotone"
              stroke="var(--color-simulatedTemp)"
              strokeWidth={2}
              strokeDasharray="5 5" // Dotted line for simulated
              dot={false}
              yAxisId="temperature"
            />
             <Line
              dataKey="simulatedHumidity"
              type="monotone"
              stroke="var(--color-simulatedHumidity)"
              strokeWidth={2}
              strokeDasharray="5 5" // Dotted line for simulated
              dot={false}
              yAxisId="humidity"
            />
            <Line
              dataKey="simulatedPeople"
              type="step" // Or monotone if preferred
              stroke="var(--color-simulatedPeople)"
              strokeWidth={2}
              strokeDasharray="5 5" // Dotted line for simulated
              dot={false}
              yAxisId="people"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" /> Showing latest data
        </div>
        {/* Optional: Add legend or details about the data */}
      </CardFooter>
    </Card>
  );
}
