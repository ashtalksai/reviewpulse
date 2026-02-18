import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertBanner } from "@/components/alert-banner";
import { RatingChart } from "@/components/rating-chart";
import { ReviewCard } from "@/components/review-card";
import { ThemeBar } from "@/components/theme-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock data - in production, this comes from the database
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
      suggestedReply: "Thank you so much Maria! We're thrilled you enjoy our food and atmosphere. We look forward to seeing you again!",
    },
  },
];

const mockChartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    google: 3.8 + Math.random() * 0.8,
    yelp: 3.5 + Math.random() * 0.9,
  };
});

const mockThemes = [
  { name: "slow service", count: 8, trend: 60, avgRating: 2.1, urgency: "high" as const },
  { name: "parking", count: 5, trend: 20, avgRating: 2.8, urgency: "medium" as const },
  { name: "ambiance", count: 12, trend: 0, avgRating: 4.7, urgency: "positive" as const },
];

export default function DashboardPage() {
  const urgentCount = mockReviews.filter((r) => r.rating <= 2 && r.isNew).length;
  const urgentPlatforms = [...new Set(mockReviews.filter((r) => r.rating <= 2 && r.isNew).map((r) => r.platform))];

  return (
    <div className="space-y-6">
      <AlertBanner count={urgentCount} platforms={urgentPlatforms} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RatingChart data={mockChartData} />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Top Issues This Week</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/themes">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockThemes.map((theme) => (
              <ThemeBar key={theme.name} theme={theme} maxCount={12} />
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Recent Reviews</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/reviews">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
