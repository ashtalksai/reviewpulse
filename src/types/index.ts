export interface Review {
  id: string;
  platform: "google" | "yelp" | "facebook" | "trustpilot";
  rating: number;
  text: string | null;
  authorName: string | null;
  authorImage: string | null;
  reviewDate: Date;
  isNew: boolean;
  respondedAt: Date | null;
  analysis?: ReviewAnalysis;
}

export interface ReviewAnalysis {
  id: string;
  sentiment: "positive" | "neutral" | "negative";
  sentimentScore: number;
  themes: string[];
  urgency: "low" | "medium" | "high";
  suggestedReply: string | null;
}

export interface Theme {
  name: string;
  count: number;
  trend: number; // percentage change vs last week
  avgRating: number;
  urgency: "high" | "medium" | "positive";
}

export interface RatingDataPoint {
  date: string;
  googleRating: number | null;
  yelpRating: number | null;
  allRating: number | null;
}
