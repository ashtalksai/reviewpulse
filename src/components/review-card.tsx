"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Copy, RefreshCw, ExternalLink, Check, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface ReviewCardProps {
  review: {
    id: string;
    platform: string;
    rating: number;
    text: string | null;
    authorName: string | null;
    reviewDate: Date;
    isNew: boolean;
    analysis?: {
      sentiment: string;
      themes: string[];
      suggestedReply: string | null;
    };
  };
}

const platformColors: Record<string, string> = {
  google: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  yelp: "bg-red-500/20 text-red-400 border-red-500/30",
  facebook: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  trustpilot: "bg-green-500/20 text-green-400 border-green-500/30",
};

export function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState(review.analysis?.suggestedReply || "");
  const [copied, setCopied] = useState(false);

  const isUrgent = review.rating <= 2;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "data-card rounded-lg p-4 transition-all",
      isUrgent && "border-destructive/50"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className={cn("text-xs border", platformColors[review.platform])}>
              {review.platform}
            </Badge>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < review.rating ? "fill-warning text-warning" : "text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {formatDistanceToNow(new Date(review.reviewDate), { addSuffix: true })}
            </span>
            {review.isNew && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                NEW
              </Badge>
            )}
            {isUrgent && (
              <AlertTriangle className="w-3 h-3 text-destructive" />
            )}
          </div>

          <p className="text-sm font-medium text-foreground mb-1">
            {review.authorName || "Anonymous"}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {review.text || "No text"}
          </p>

          {review.analysis && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded font-mono",
                review.analysis.sentiment === "positive" && "bg-primary/20 text-primary",
                review.analysis.sentiment === "neutral" && "bg-muted text-muted-foreground",
                review.analysis.sentiment === "negative" && "bg-destructive/20 text-destructive"
              )}>
                {review.analysis.sentiment}
              </span>
              {review.analysis.themes.map((theme) => (
                <Badge key={theme} variant="outline" className="text-xs border-border">
                  {theme}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 hover:bg-secondary"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span className="ml-1 text-xs">Respond</span>
        </Button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-medium text-foreground">AI suggested response</p>
          </div>
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={4}
            className="mb-3 bg-secondary border-border font-mono text-sm"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm" onClick={handleCopy} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button size="sm" variant="outline" className="border-border hover:bg-secondary">
              <RefreshCw className="w-4 h-4 mr-1" />
              Regenerate
            </Button>
            <Button size="sm" variant="outline" asChild className="border-border hover:bg-secondary">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Open on {review.platform}
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
