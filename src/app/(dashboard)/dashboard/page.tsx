import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertBanner } from "@/components/alert-banner";
import { RatingChart } from "@/components/rating-chart";
import { ReviewCard } from "@/components/review-card";
import { ThemeBar } from "@/components/theme-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Star, AlertTriangle } from "lucide-react";

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

function StatCard({ 
  label, 
  value, 
  subtext, 
  trend,
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  subtext?: string;
  trend?: "up" | "down" | null;
  icon?: typeof Star;
}) {
  return (
    <div className="data-card bg-card rounded-lg p-4">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-bold font-mono text-foreground">{value}</span>
        {trend && (
          <span className={trend === "up" ? "text-primary" : "text-destructive"}>
            {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </span>
        )}
      </div>
      {subtext && <span className="text-xs text-muted-foreground font-mono">{subtext}</span>}
    </div>
  );
}

export default function DashboardPage() {
  const urgentCount = mockReviews.filter((r) => r.rating <= 2 && r.isNew).length;
  const urgentPlatforms = [...new Set(mockReviews.filter((r) => r.rating <= 2 && r.isNew).map((r) => r.platform))];

  return (
    <div className="space-y-6">
      <AlertBanner count={urgentCount} platforms={urgentPlatforms} />

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Avg Rating" value="4.2" subtext="↑ 0.3 this week" trend="up" icon={Star} />
        <StatCard label="Reviews (30d)" value="47" subtext="+12 from last month" trend="up" />
        <StatCard label="Response Rate" value="89%" subtext="2 pending" />
        <StatCard label="Alerts" value="2" subtext="need attention" icon={AlertTriangle} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RatingChart data={mockChartData} />
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg text-foreground">Top Issues</CardTitle>
            <Button variant="ghost" size="sm" asChild className="hover:bg-secondary">
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

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg text-foreground">Recent Reviews</CardTitle>
            <span className="text-xs text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block mr-1" />
              Live
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild className="hover:bg-secondary">
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
