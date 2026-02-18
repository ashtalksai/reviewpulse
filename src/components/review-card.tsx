"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Copy, RefreshCw, ExternalLink, Check, ChevronDown, ChevronUp } from "lucide-react";
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
  google: "bg-blue-500",
  yelp: "bg-red-500",
  facebook: "bg-blue-600",
  trustpilot: "bg-green-500",
};

const platformLabels: Record<string, string> = {
  google: "G",
  yelp: "Y",
  facebook: "F",
  trustpilot: "T",
};

const sentimentEmojis: Record<string, string> = {
  positive: "😊",
  neutral: "😐",
  negative: "😡",
};

export function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState(review.analysis?.suggestedReply || "");
  const [copied, setCopied] = useState(false);

  const borderColor = review.rating <= 2 ? "border-l-red-500" : review.rating === 3 ? "border-l-amber-500" : "border-l-green-500";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={cn("border-l-4", borderColor)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={cn("text-white text-xs", platformColors[review.platform])}>
                {platformLabels[review.platform]}
              </Badge>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.reviewDate), { addSuffix: true })}
              </span>
              {review.isNew && (
                <Badge variant="destructive" className="text-xs">NEW</Badge>
              )}
            </div>

            <p className="text-sm font-medium mb-1">{review.authorName || "Anonymous"}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{review.text || "No text"}</p>

            {review.analysis && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">{sentimentEmojis[review.analysis.sentiment]}</span>
                <span className="text-xs text-muted-foreground capitalize">{review.analysis.sentiment}</span>
                {review.analysis.themes.map((theme) => (
                  <Badge key={theme} variant="secondary" className="text-xs">
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
            className="flex-shrink-0"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="ml-1 text-xs">Respond</span>
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">AI suggested response:</p>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={4}
              className="mb-3"
            />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button size="sm" variant="outline">
                <RefreshCw className="w-4 h-4 mr-1" />
                Regenerate
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open on {review.platform}
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
