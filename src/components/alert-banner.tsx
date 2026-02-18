"use client";

import { AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <Alert className="bg-amber-50 border-amber-200 mb-6">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-amber-800">
          <strong>{count} new review{count > 1 ? "s" : ""}</strong> need{count === 1 ? "s" : ""} attention
          {platforms.length > 0 && (
            <span className="ml-1 text-amber-600">
              ({platforms.join(" · ")})
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="bg-white" asChild>
            <Link href="/reviews?filter=urgent">View now →</Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
