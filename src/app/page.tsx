import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Bell, TrendingUp, MessageSquare, Check, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl">ReviewPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
            <Button asChild>
              <Link href="/login">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          🎉 Now monitoring 10,000+ reviews for SMBs
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
          Know about every bad review{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            before your customers do.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          AI monitors Google + Yelp, spots patterns, and alerts you within 15 minutes.
          Not in 3 days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" asChild className="text-lg px-8">
            <Link href="/login">Connect Google Free →</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">No credit card required. Set up in 2 minutes.</p>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Connect your Google Business</h3>
              <p className="text-sm text-muted-foreground">2 clicks. We only read reviews — never post without asking.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI reads every review</h3>
              <p className="text-sm text-muted-foreground">Tags sentiment + themes automatically. "Slow service", "great food", etc.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get alerted instantly</h3>
              <p className="text-sm text-muted-foreground">1-2 star reviews? Email within 15 minutes. Weekly digest for trends.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why pay $300/month?</h2>
          <p className="text-muted-foreground text-center mb-12">
            Enterprise tools charge enterprise prices. You&apos;re an SMB.
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <span className="font-medium">Birdeye</span>
              <span className="text-red-500 font-bold">$300-500/mo 😬</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <span className="font-medium">Podium</span>
              <span className="text-red-500 font-bold">$249/mo 😬</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg text-white">
              <span className="font-bold">ReviewPulse</span>
              <span className="font-bold">$29/mo ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Bell, title: "Instant Alerts", desc: "Email within 15 min for negative reviews" },
            { icon: TrendingUp, title: "Trend Detection", desc: '"Slow service up 60% this week"' },
            { icon: MessageSquare, title: "AI Response Drafts", desc: "One-click copy, personalized replies" },
            { icon: Star, title: "Multi-Platform", desc: "Google + Yelp in one dashboard" },
            { icon: Zap, title: "Weekly Digest", desc: "Top themes, rating trends, insights" },
            { icon: Check, title: "Response Tracking", desc: "Mark handled, never lose track" },
          ].map((feature) => (
            <Card key={feature.title} className="p-6">
              <CardContent className="pt-0">
                <feature.icon className="w-8 h-8 text-violet-600 mb-3" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple pricing</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Free", price: "$0", features: ["1 location", "Google only", "Email alerts", "30-day history"] },
              { name: "Starter", price: "$29", popular: true, features: ["1 location", "Google + Yelp", "Full history", "Weekly digest"] },
              { name: "Pro", price: "$59", features: ["3 locations", "All platforms", "Trend alerts", "Slack webhook"] },
              { name: "Agency", price: "$149", features: ["10 locations", "White-label", "API access", "Priority support"] },
            ].map((plan) => (
              <Card key={plan.name} className={`p-6 ${plan.popular ? "border-violet-600 border-2" : ""}`}>
                {plan.popular && (
                  <Badge className="mb-2 bg-violet-600">Most Popular</Badge>
                )}
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-3xl font-bold my-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" variant={plan.popular ? "default" : "outline"} asChild>
                    <Link href="/login">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Stop letting bad reviews go viral.</h2>
        <p className="text-muted-foreground mb-8">Join 500+ SMBs who catch problems before they spread.</p>
        <Button size="lg" asChild>
          <Link href="/login">Start Free Trial →</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 ReviewPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
