"use client";

import { useDealsStore } from "@/stores/deals";
import { useContactsStore } from "@/stores/contacts";
import { DEAL_STAGE_CONFIG } from "@/types/database";
import {
  ArrowUpRight,
  DollarSign,
  FileText,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const deals = useDealsStore((s) => s.deals);
  const contacts = useContactsStore((s) => s.contacts);

  const totalPipelineValue = deals
    .filter((d) => !["won", "lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0);

  const wonDeals = deals.filter((d) => d.stage === "won");
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0);
  const activeDeals = deals.filter((d) => !["won", "lost"].includes(d.stage));

  const stats = [
    {
      label: "Pipeline Value",
      value: `$${totalPipelineValue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12% from last month",
      trend: "up" as const,
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Deals",
      value: activeDeals.length.toString(),
      icon: TrendingUp,
      change: `${deals.length} total deals`,
      trend: "up" as const,
      gradient: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Contacts",
      value: contacts.length.toString(),
      icon: Users,
      change: "Add contacts to get started",
      trend: "neutral" as const,
      gradient: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Won Revenue",
      value: `$${wonValue.toLocaleString()}`,
      icon: FileText,
      change: `${wonDeals.length} deals won`,
      trend: "up" as const,
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back! Here&apos;s your sales overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            Last 30 days
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div className={`${stat.bg} w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent deals */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Deals
            </h2>
            <Link
              href="/dashboard/pipeline"
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          {deals.length === 0 ? (
            <div className="text-center py-16 px-5">
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold">No deals yet</p>
              <p className="text-muted-foreground text-sm mt-1.5 max-w-sm mx-auto">
                Create your first deal in the Pipeline to start tracking your sales.
              </p>
              <Link
                href="/dashboard/pipeline"
                className="inline-flex items-center gap-2 mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Go to Pipeline <ArrowUpRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {deals.slice(0, 6).map((deal) => {
                const stageConfig = DEAL_STAGE_CONFIG[deal.stage];
                return (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: stageConfig.color }}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {deal.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stageConfig.label}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      ${deal.value.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Create a deal", href: "/dashboard/pipeline", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
                { label: "Add a contact", href: "/dashboard/contacts", icon: Users, color: "text-violet-600 bg-violet-50" },
                { label: "Generate proposal", href: "/dashboard/proposals", icon: Sparkles, color: "text-amber-600 bg-amber-50" },
                { label: "Send invoice", href: "/dashboard/invoices", icon: Zap, color: "text-emerald-600 bg-emerald-50" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                    <action.icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {action.label}
                  </span>
                  <ArrowUpRight size={14} className="ml-auto text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Pro tip */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Pro Tip</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add your first contact and create a deal to see your pipeline in action. The AI proposal generator will help you close faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
