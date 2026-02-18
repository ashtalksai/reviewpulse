"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const mockReviews = [
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
      suggestedReply: "Hi Sarah, thank you for your feedback. We're sorry about your wait time — this isn't the standard we aim for.",
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
      suggestedReply: "Hi John, we appreciate your honest feedback. We're working on improving our service times.",
    },
  },
  {
    id: "3",
    platform: "google",
    rating: 5,
    text: "Absolutely love this place! Always amazing food and great atmosphere.",
    authorName: "Maria K.",
    reviewDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isNew: false,
    analysis: {
      sentiment: "positive",
      themes: ["food", "ambiance"],
      suggestedReply: "Thank you so much Maria! We're thrilled you enjoy our food and atmosphere.",
    },
  },
  {
    id: "4",
    platform: "google",
    rating: 4,
    text: "Great food, friendly staff. Parking could be better.",
    authorName: "Tom R.",
    reviewDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
    isNew: false,
    analysis: {
      sentiment: "positive",
      themes: ["food", "staff", "parking"],
      suggestedReply: "Thank you Tom! We're glad you enjoyed the food and service. We hear you on parking — it's something we're aware of.",
    },
  },
  {
    id: "5",
    platform: "yelp",
    rating: 3,
    text: "Average experience. Nothing special but nothing bad either.",
    authorName: "Lisa P.",
    reviewDate: new Date(Date.now() - 72 * 60 * 60 * 1000),
    isNew: false,
    analysis: {
      sentiment: "neutral",
      themes: [],
      suggestedReply: "Thank you for your feedback Lisa. We'd love to exceed your expectations next time!",
    },
  },
];

export default function ReviewsPage() {
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const filteredReviews = mockReviews.filter((review) => {
    if (platformFilter !== "all" && review.platform !== platformFilter) return false;
    if (ratingFilter === "negative" && review.rating > 2) return false;
    if (ratingFilter === "positive" && review.rating < 4) return false;
    return true;
  });

  const unreadCount = mockReviews.filter((r) => r.isNew).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            {mockReviews.length} reviews · {unreadCount} unread
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="yelp">Yelp</SelectItem>
            </SelectContent>
          </Select>

          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ratings</SelectItem>
              <SelectItem value="negative">1-2 stars</SelectItem>
              <SelectItem value="positive">4-5 stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No reviews match your filters.
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}
