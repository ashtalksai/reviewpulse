"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface AlertBannerProps {
  count: number;
  platforms: string[];
}

export function AlertBanner({ count, platforms }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || count === 0) return null;

  return (
    <div className="data-card bg-destructive/10 border-destructive/30 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-destructive" />
        </div>
        <div>
          <span className="text-foreground font-medium">
            {count} review{count > 1 ? "s" : ""} need{count === 1 ? "s" : ""} attention
          </span>
          {platforms.length > 0 && (
            <span className="ml-2 text-sm text-muted-foreground font-mono">
              [{platforms.join(" • ")}]
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" className="bg-destructive text-white hover:bg-destructive/90" asChild>
          <Link href="/reviews?filter=urgent">View now →</Link>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 hover:bg-destructive/20"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
