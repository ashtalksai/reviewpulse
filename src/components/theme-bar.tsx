"use client";

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
  high: "border-l-destructive",
  medium: "border-l-warning",
  positive: "border-l-primary",
};

const barColors = {
  high: "bg-destructive",
  medium: "bg-warning",
  positive: "bg-primary",
};

export function ThemeBar({ theme, maxCount }: ThemeBarProps) {
  const percentage = (theme.count / maxCount) * 100;
  const trendColor = theme.trend > 0 && theme.avgRating < 3 
    ? "text-destructive" 
    : theme.trend > 0 
      ? "text-primary" 
      : "text-muted-foreground";

  return (
    <Link href={`/reviews?theme=${encodeURIComponent(theme.name)}`}>
      <div className={cn(
        "data-card rounded-lg p-3 border-l-2 hover:bg-secondary/50 transition-colors cursor-pointer",
        urgencyStyles[theme.urgency]
      )}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground text-sm">{theme.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">{theme.count}</span>
            {theme.trend !== 0 && (
              <span className={cn("flex items-center text-xs font-mono", trendColor)}>
                {theme.trend > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                )}
                {Math.abs(theme.trend)}%
              </span>
            )}
            {theme.trend === 0 && (
              <Minus className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn("absolute inset-y-0 left-0 rounded-full", barColors[theme.urgency])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground font-mono">
            avg {theme.avgRating.toFixed(1)}★
          </span>
        </div>
      </div>
    </Link>
  );
}
