"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-surface-500 text-sm mt-1">
          Configure your DevSales account
        </p>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-surface-700 mb-4">
          Profile
        </h3>
        <form className="space-y-4">
          <Input id="name" label="Full name" placeholder="Jane Developer" />
          <Input
            id="company"
            label="Company / Agency name"
            placeholder="Your Web Agency"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@agency.com"
          />
          <Button type="button">Save Changes</Button>
        </form>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-surface-700 mb-4">
          Integrations
        </h3>
        <div className="space-y-3">
          {["Google OAuth", "Stripe", "Gmail", "Google Calendar"].map(
            (integration) => (
              <div
                key={integration}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-surface-100 rounded-[var(--radius-sm)] flex items-center justify-center">
                    <Settings size={14} className="text-surface-500" />
                  </div>
                  <span className="text-sm font-medium text-surface-700">
                    {integration}
                  </span>
                </div>
                <Button variant="secondary" size="sm">
                  Connect
                </Button>
              </div>
            )
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-surface-700 mb-2">
          Subscription
        </h3>
        <p className="text-sm text-surface-500 mb-4">
          You&apos;re on the <strong>Free</strong> plan (50 contacts, 3 active
          deals)
        </p>
        <div className="flex gap-3">
          <Button size="sm">Upgrade to Pro ($29/mo)</Button>
          <Button variant="ghost" size="sm">
            View plans
          </Button>
        </div>
      </Card>
    </div>
  );
}
