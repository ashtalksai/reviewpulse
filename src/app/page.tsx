import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare, 
  Zap,
  Star,
  ArrowRight,
  Check,
  Activity
} from "lucide-react";

// Fake review data for the live monitor demo
const demoReviews = [
  { stars: 1, text: "Waited 45 minutes for food...", time: "2m ago", platform: "Google", sentiment: "negative" },
  { stars: 5, text: "Best tacos in Rotterdam!", time: "8m ago", platform: "Google", sentiment: "positive" },
  { stars: 2, text: "Staff was rude and dismissive", time: "15m ago", platform: "Yelp", sentiment: "negative" },
  { stars: 4, text: "Great food, a bit pricey", time: "1h ago", platform: "Google", sentiment: "neutral" },
  { stars: 5, text: "Amazing experience, will come back", time: "2h ago", platform: "Google", sentiment: "positive" },
];

function LiveReviewFeed() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-warning/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">review-monitor.sh</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
      
      {/* Review feed */}
      <div className="divide-y divide-border">
        {demoReviews.map((review, i) => (
          <div key={i} className="px-4 py-3 hover:bg-secondary/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-3 h-3 ${j < review.stars ? 'fill-warning text-warning' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <Badge 
                    variant={review.sentiment === 'negative' ? 'destructive' : 'secondary'}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {review.platform}
                  </Badge>
                  {review.sentiment === 'negative' && (
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                  )}
                </div>
                <p className="text-sm text-foreground truncate">{review.text}</p>
              </div>
              <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{review.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Status bar */}
      <div className="px-4 py-2 bg-secondary border-t border-border flex items-center justify-between text-xs font-mono">
        <span className="text-muted-foreground">5 reviews • 2 alerts</span>
        <span className="text-primary">↑ Sync complete</span>
      </div>
    </div>
  );
}

function StatsCard({ value, label, trend }: { value: string; label: string; trend?: string }) {
  return (
    <div className="data-card bg-card rounded-lg p-4">
      <div className="text-3xl font-bold font-mono text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {trend && (
        <div className={`text-xs font-mono mt-2 ${trend.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
          {trend}
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold tracking-tight">ReviewPulse</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/login">Start monitoring</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
              Real-time monitoring
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Catch bad reviews<br />
              <span className="text-primary glow-text">in 15 minutes,</span><br />
              not 3 days.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              AI monitors Google + Yelp around the clock. 
              Get instant alerts, spot trends, respond faster than your competitors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow">
                <Link href="/login">
                  Connect Google Business
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#pricing">View pricing</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free plan available. No credit card required.
            </p>
          </div>
          
          {/* Live demo */}
          <div className="relative">
            <LiveReviewFeed />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatsCard value="10K+" label="Reviews monitored" trend="+2.4K this week" />
            <StatsCard value="<15min" label="Avg alert time" />
            <StatsCard value="500+" label="SMBs trust us" trend="+12% MoM" />
            <StatsCard value="$270" label="Saved vs enterprise" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">How it works</h2>
          <p className="text-muted-foreground">Three steps. Two minutes. Zero complexity.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              step: "01",
              title: "Connect",
              desc: "Link your Google Business. We only read reviews — never post without asking.",
              icon: Zap
            },
            {
              step: "02", 
              title: "Monitor",
              desc: "AI scans 24/7. Tags sentiment, spots patterns, builds your reputation profile.",
              icon: Activity
            },
            {
              step: "03",
              title: "Respond",
              desc: "Get alerts for bad reviews in 15 min. AI drafts responses. You stay in control.",
              icon: MessageSquare
            }
          ].map((item, i) => (
            <Card key={i} className="data-card bg-card p-6 relative overflow-hidden">
              <span className="absolute top-4 right-4 text-6xl font-bold text-border">{item.step}</span>
              <div className="relative">
                <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Save $270+/mo vs enterprise tools
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Simple pricing</h2>
          <p className="text-muted-foreground">No enterprise sales calls. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              period: "forever",
              features: ["1 location", "Google only", "Email alerts", "30-day history"],
              cta: "Start free",
              highlight: false
            },
            {
              name: "Pro",
              price: "$29",
              period: "/month",
              features: ["1 location", "Google + Yelp", "AI response drafts", "Unlimited history", "Trend reports"],
              cta: "Start trial",
              highlight: true
            },
            {
              name: "Agency",
              price: "$149",
              period: "/month", 
              features: ["10 locations", "All platforms", "White-label", "API access", "Priority support"],
              cta: "Contact us",
              highlight: false
            }
          ].map((plan, i) => (
            <Card 
              key={i} 
              className={`data-card bg-card p-6 relative ${plan.highlight ? 'border-primary glow' : ''}`}
            >
              {plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most popular
                </Badge>
              )}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-mono">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                asChild 
                className={`w-full ${plan.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                variant={plan.highlight ? 'default' : 'outline'}
              >
                <Link href="/login">{plan.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Stop letting bad reviews go viral.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join 500+ SMBs who catch problems before they spread.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow">
            <Link href="/login">
              Start monitoring free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4 text-primary" />
            <span>ReviewPulse</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 ReviewPulse. Built for SMBs who don't have time for enterprise BS.
          </div>
        </div>
      </footer>
    </div>
  );
}
