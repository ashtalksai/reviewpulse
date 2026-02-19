"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

interface RatingChartProps {
  data: {
    date: string;
    google: number | null;
    yelp: number | null;
  }[];
}

export function RatingChart({ data }: RatingChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground">Rating Trend</CardTitle>
          <span className="text-xs text-muted-foreground font-mono">30 days</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#737373" }}
                tickFormatter={(value) => value.slice(5)}
                stroke="#262626"
              />
              <YAxis 
                domain={[1, 5]} 
                tick={{ fontSize: 10, fill: "#737373" }} 
                stroke="#262626"
              />
              <Tooltip
                contentStyle={{ 
                  fontSize: 12, 
                  backgroundColor: "#111111",
                  border: "1px solid #262626",
                  borderRadius: "6px",
                  color: "#fafafa"
                }}
                formatter={(value) => (typeof value === 'number' ? value.toFixed(1) : "N/A")}
                labelStyle={{ color: "#737373" }}
              />
              <Legend 
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) => <span style={{ color: "#a1a1a1" }}>{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="google"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Google"
              />
              <Line
                type="monotone"
                dataKey="yelp"
                stroke="#ef4444"
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
