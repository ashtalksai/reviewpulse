"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Shield, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [yelpUrl, setYelpUrl] = useState("");
  const [googleConnected, setGoogleConnected] = useState(false);
  const [yelpConnected, setYelpConnected] = useState(false);

  const handleGoogleConnect = () => {
    // In production, this triggers Google OAuth with GMB scope
    toast.success("Google Business connected!");
    setGoogleConnected(true);
  };

  const handleYelpConnect = () => {
    if (!yelpUrl.includes("yelp.com/biz/")) {
      toast.error("Please enter a valid Yelp business URL");
      return;
    }
    toast.success("Yelp business connected!");
    setYelpConnected(true);
  };

  const handleComplete = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full ${
                  s <= step ? "bg-violet-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
          <CardTitle>
            {step === 1 ? "Connect your review platforms" : "You're all set!"}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "We'll monitor your reviews automatically. Read-only access only."
              : "We're pulling your reviews. Check back in a few minutes."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              {/* Google Connect */}
              <div className="space-y-3">
                <Button
                  onClick={handleGoogleConnect}
                  variant={googleConnected ? "secondary" : "outline"}
                  className="w-full h-12 justify-start"
                  disabled={googleConnected}
                >
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold mr-3">
                    G
                  </div>
                  {googleConnected ? (
                    <>
                      <span>Google Business connected</span>
                      <Check className="w-4 h-4 ml-auto text-green-500" />
                    </>
                  ) : (
                    "Connect Google Business"
                  )}
                </Button>
              </div>

              {/* Yelp Connect */}
              <div className="space-y-3">
                <Label htmlFor="yelp-url">Or add your Yelp business URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="yelp-url"
                    placeholder="yelp.com/biz/your-business"
                    value={yelpUrl}
                    onChange={(e) => setYelpUrl(e.target.value)}
                    disabled={yelpConnected}
                  />
                  <Button
                    onClick={handleYelpConnect}
                    disabled={yelpConnected || !yelpUrl}
                    variant={yelpConnected ? "secondary" : "default"}
                  >
                    {yelpConnected ? <Check className="w-4 h-4" /> : "Connect"}
                  </Button>
                </div>
              </div>

              {/* Trust note */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-slate-50 p-3 rounded-lg">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>Read-only access. We never post on your behalf without asking.</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!googleConnected && !yelpConnected}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                  Skip — add later
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              <div className="space-y-2">
                {googleConnected && (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      G
                    </div>
                    <span>Google Business connected</span>
                  </div>
                )}
                {yelpConnected && (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      Y
                    </div>
                    <span>Yelp connected</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                We&apos;re fetching your reviews now. Your dashboard will populate within a few minutes.
              </p>

              <Button onClick={handleComplete} className="w-full">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
