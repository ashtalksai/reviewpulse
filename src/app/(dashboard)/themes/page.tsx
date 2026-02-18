import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeBar } from "@/components/theme-bar";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

const mockThemes = {
  urgent: [
    { name: "slow service", count: 8, trend: 60, avgRating: 2.1, urgency: "high" as const },
    { name: "rude staff", count: 3, trend: 50, avgRating: 1.8, urgency: "high" as const },
  ],
  watch: [
    { name: "parking", count: 5, trend: 20, avgRating: 2.8, urgency: "medium" as const },
    { name: "noise level", count: 4, trend: 15, avgRating: 3.0, urgency: "medium" as const },
  ],
  positive: [
    { name: "ambiance", count: 12, trend: 0, avgRating: 4.7, urgency: "positive" as const },
    { name: "food quality", count: 9, trend: 10, avgRating: 4.5, urgency: "positive" as const },
    { name: "friendly staff", count: 7, trend: 5, avgRating: 4.8, urgency: "positive" as const },
  ],
};

const maxCount = Math.max(
  ...Object.values(mockThemes).flat().map((t) => t.count)
);

export default function ThemesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Themes & Trends</h1>
        <p className="text-muted-foreground">
          What customers are talking about this week
        </p>
      </div>

      {/* Urgent */}
      {mockThemes.urgent.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="destructive">🔴 Urgent — action needed</Badge>
          </div>
          <div className="grid gap-4">
            {mockThemes.urgent.map((theme) => (
              <ThemeBar key={theme.name} theme={theme} maxCount={maxCount} />
            ))}
          </div>
        </div>
      )}

      {/* Watch */}
      {mockThemes.watch.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-amber-500">🟡 Watch — growing</Badge>
          </div>
          <div className="grid gap-4">
            {mockThemes.watch.map((theme) => (
              <ThemeBar key={theme.name} theme={theme} maxCount={maxCount} />
            ))}
          </div>
        </div>
      )}

      {/* Positive */}
      {mockThemes.positive.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-green-500">🟢 Positive — keep it up</Badge>
          </div>
          <div className="grid gap-4">
            {mockThemes.positive.map((theme) => (
              <ThemeBar key={theme.name} theme={theme} maxCount={maxCount} />
            ))}
          </div>
        </div>
      )}

      {/* AI Insight */}
      <Card className="bg-violet-50 border-violet-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-violet-900 mb-1">AI Insight</p>
              <p className="text-sm text-violet-800">
                &quot;Slow service complaints are up 60% this week. Check staffing levels 
                on Thursday evenings — that&apos;s when most complaints occurred.&quot;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
