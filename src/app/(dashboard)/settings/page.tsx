"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, CreditCard, Building, Link as LinkIcon, Plus } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Connected Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Connected Platforms
          </CardTitle>
          <CardDescription>
            Platforms we&apos;re monitoring for reviews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <div>
                <p className="font-medium">Google Business</p>
                <p className="text-sm text-muted-foreground">Acme Café</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Connected
            </Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">
                Y
              </div>
              <div>
                <p className="font-medium">Yelp</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Alert Preferences
          </CardTitle>
          <CardDescription>
            When and how we notify you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="instant-alerts">Instant Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Email immediately for 1-2 star reviews
              </p>
            </div>
            <Switch id="instant-alerts" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-digest">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
                Summary of themes and trends every Monday
              </p>
            </div>
            <Switch id="weekly-digest" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="trend-alerts">Trend Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Alert when negative themes spike 20%+
              </p>
            </div>
            <Switch id="trend-alerts" />
          </div>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Billing
          </CardTitle>
          <CardDescription>
            Manage your subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-muted-foreground">
                1 location · Google only · 30-day history
              </p>
            </div>
            <Button>Upgrade to Starter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Business Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Label className="text-sm text-muted-foreground">Business Name</Label>
              <p className="font-medium">Acme Café</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
