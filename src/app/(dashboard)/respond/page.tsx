"use client";

import { ReviewCard } from "@/components/review-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const needsResponse = [
  {
    id: "1",
    platform: "google",
    rating: 1,
    text: "Waited 40 minutes for a table. Staff was rude. Won't be back.",
    authorName: "Sarah M.",
    reviewDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isNew: true,
    analysis: {
      sentiment: "negative",
      themes: ["slow service", "staff"],
      suggestedReply: "Hi Sarah, thank you for your feedback. We're sorry about your wait time — this isn't the standard we aim for. Please reach out to us directly at contact@business.com so we can make it right.",
    },
  },
  {
    id: "2",
    platform: "yelp",
    rating: 2,
    text: "Food was ok but the wait was too long. Had to wait 30 mins just to order.",
    authorName: "John D.",
    reviewDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isNew: true,
    analysis: {
      sentiment: "neutral",
      themes: ["slow service", "food"],
      suggestedReply: "Hi John, we appreciate your honest feedback. We're working on improving our service times. We'd love another chance to provide you a better experience.",
    },
  },
];

export default function RespondPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Respond to Reviews</h1>
          <p className="text-muted-foreground">
            {needsResponse.length} reviews awaiting response
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <MessageSquare className="w-3 h-3" />
          AI drafts ready
        </Badge>
      </div>

      {needsResponse.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground">
              No reviews need a response right now.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {needsResponse.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
