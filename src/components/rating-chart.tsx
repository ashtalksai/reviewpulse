"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RatingChartProps {
  data: {
    date: string;
    google: number | null;
    yelp: number | null;
  }[];
}

export function RatingChart({ data }: RatingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rating Trend (30 days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis domain={[1, 5]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(value) => (typeof value === 'number' ? value.toFixed(1) : "N/A")}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="google"
                stroke="#4285f4"
                strokeWidth={2}
                dot={false}
                name="Google"
              />
              <Line
                type="monotone"
                dataKey="yelp"
                stroke="#ff1a1a"
                strokeWidth={2}
                dot={false}
                name="Yelp"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
