"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEAL_STAGE_CONFIG } from "@/types/database";
import { useDealsStore } from "@/stores/deals";
import { useContactsStore } from "@/stores/contacts";
import {
  ArrowUpRight,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const deals = useDealsStore((s) => s.deals);
  const contacts = useContactsStore((s) => s.contacts);

  const totalPipelineValue = deals
    .filter((d) => !["won", "lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0);

  const wonDeals = deals.filter((d) => d.stage === "won");
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0);

  const activeDeals = deals.filter(
    (d) => !["won", "lost"].includes(d.stage)
  );

  const stats = [
    {
      label: "Pipeline Value",
      value: `$${totalPipelineValue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12%",
      color: "text-brand-600",
      bg: "bg-brand-50",
    },
    {
      label: "Active Deals",
      value: activeDeals.length.toString(),
      icon: TrendingUp,
      change: `${deals.length} total`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Contacts",
      value: contacts.length.toString(),
      icon: Users,
      change: "this month",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Won Revenue",
      value: `$${wonValue.toLocaleString()}`,
      icon: FileText,
      change: `${wonDeals.length} deals`,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-surface-500 text-sm mt-1">
          Your sales overview at a glance
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-500">{stat.label}</p>
                <p className="text-2xl font-bold text-surface-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-surface-400 mt-1">{stat.change}</p>
              </div>
              <div
                className={`w-10 h-10 ${stat.bg} rounded-[var(--radius-md)] flex items-center justify-center`}
              >
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent deals */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">
            Recent Deals
          </h2>
          <a
            href="/dashboard/pipeline"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
          >
            View pipeline <ArrowUpRight size={14} />
          </a>
        </div>

        {deals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp size={24} className="text-surface-400" />
            </div>
            <p className="text-surface-600 font-medium">No deals yet</p>
            <p className="text-surface-400 text-sm mt-1">
              Go to Pipeline to create your first deal
            </p>
          </div>
        ) : (
          <div className="divide-y divide-surface-100">
            {deals.slice(0, 5).map((deal) => {
              const stageConfig = DEAL_STAGE_CONFIG[deal.stage];
              return (
                <div
                  key={deal.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-surface-900">
                      {deal.title}
                    </p>
                    <p className="text-xs text-surface-400 mt-0.5">
                      {deal.company?.name || "No company"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        deal.stage === "won"
                          ? "success"
                          : deal.stage === "lost"
                            ? "danger"
                            : "default"
                      }
                    >
                      {stageConfig.label}
                    </Badge>
                    <span className="text-sm font-semibold text-surface-900 tabular-nums">
                      ${deal.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
