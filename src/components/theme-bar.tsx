"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ThemeBarProps {
  theme: {
    name: string;
    count: number;
    trend: number;
    avgRating: number;
    urgency: "high" | "medium" | "positive";
  };
  maxCount: number;
}

const urgencyStyles = {
  high: "border-l-red-500",
  medium: "border-l-amber-500",
  positive: "border-l-green-500",
};

export function ThemeBar({ theme, maxCount }: ThemeBarProps) {
  const percentage = (theme.count / maxCount) * 100;
  const trendColor = theme.trend > 0 && theme.avgRating < 3 ? "text-red-500" : theme.trend > 0 ? "text-green-500" : "text-gray-400";

  return (
    <Link href={`/reviews?theme=${encodeURIComponent(theme.name)}`}>
      <Card className={cn("border-l-4 hover:bg-slate-50 transition-colors cursor-pointer", urgencyStyles[theme.urgency])}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{theme.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{theme.count} reviews</span>
              {theme.trend !== 0 && (
                <span className={cn("flex items-center text-xs", trendColor)}>
                  {theme.trend > 0 ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {Math.abs(theme.trend)}%
                </span>
              )}
              {theme.trend === 0 && (
                <Minus className="w-3 h-3 text-gray-400" />
              )}
            </div>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full",
                theme.urgency === "high" ? "bg-red-500" : theme.urgency === "medium" ? "bg-amber-500" : "bg-green-500"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">Avg rating: {theme.avgRating.toFixed(1)}★</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
