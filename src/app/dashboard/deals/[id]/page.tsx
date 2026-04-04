"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { useDealsStore } from "@/stores/deals";
import { DEAL_STAGE_CONFIG, type DealStage } from "@/types/database";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

const STAGES_ORDER: DealStage[] = [
  "lead",
  "qualified",
  "discovery",
  "audit",
  "proposal",
  "negotiation",
  "contract",
  "deposit",
  "onboarding",
  "won",
];

export default function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { deals, moveDeal } = useDealsStore();
  const deal = deals.find((d) => d.id === id);

  if (!deal) {
    return (
      <div className="text-center py-20">
        <p className="text-surface-600 font-medium">Deal not found</p>
        <Link
          href="/dashboard/pipeline"
          className="text-brand-600 text-sm mt-2 inline-block"
        >
          Back to pipeline
        </Link>
      </div>
    );
  }

  const stageConfig = DEAL_STAGE_CONFIG[deal.stage];
  const currentStageIndex = STAGES_ORDER.indexOf(deal.stage);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/pipeline"
        className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 transition-colors"
      >
        <ArrowLeft size={14} /> Back to pipeline
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">{deal.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge
              variant={
                deal.stage === "won"
                  ? "success"
                  : deal.stage === "lost"
                    ? "danger"
                    : "info"
              }
            >
              {stageConfig.label}
            </Badge>
            <span className="text-lg font-bold text-surface-900 flex items-center gap-1">
              <DollarSign size={18} />
              {deal.value.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Phone size={14} /> Log Call
          </Button>
          <Button variant="secondary" size="sm">
            <MessageSquare size={14} /> Note
          </Button>
          <Button variant="secondary" size="sm">
            <FileText size={14} /> Proposal
          </Button>
        </div>
      </div>

      {/* Stage progress */}
      <Card>
        <h3 className="text-sm font-semibold text-surface-700 mb-4">
          Deal Progress
        </h3>
        <div className="flex items-center gap-1">
          {STAGES_ORDER.map((stage, i) => {
            const config = DEAL_STAGE_CONFIG[stage];
            const isActive = stage === deal.stage;
            const isPast = i < currentStageIndex;
            return (
              <button
                key={stage}
                onClick={() => moveDeal(deal.id, stage)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-colors cursor-pointer",
                  isActive
                    ? "bg-brand-500"
                    : isPast
                      ? "bg-brand-200"
                      : "bg-surface-200 hover:bg-surface-300"
                )}
                title={`Move to ${config.label}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-surface-400">Lead</span>
          <span className="text-xs text-surface-400">Won</span>
        </div>
      </Card>

      {/* Details grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Activity timeline */}
          <Card>
            <h3 className="text-sm font-semibold text-surface-700 mb-4">
              Activity Timeline
            </h3>
            <div className="text-center py-8">
              <div className="w-10 h-10 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar size={20} className="text-surface-400" />
              </div>
              <p className="text-sm text-surface-500">No activities yet</p>
              <p className="text-xs text-surface-400 mt-0.5">
                Log calls, meetings, and notes here
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-surface-700 mb-3">
              Deal Info
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-surface-400">Value</dt>
                <dd className="text-sm font-medium text-surface-900">
                  ${deal.value.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-surface-400">Probability</dt>
                <dd className="text-sm font-medium text-surface-900">
                  {deal.probability}%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-surface-400">Weighted Value</dt>
                <dd className="text-sm font-medium text-surface-900">
                  $
                  {Math.round(
                    deal.value * (deal.probability / 100)
                  ).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-surface-400">Created</dt>
                <dd className="text-sm text-surface-700">
                  {new Date(deal.created_at).toLocaleDateString()}
                </dd>
              </div>
              {deal.expected_close_date && (
                <div>
                  <dt className="text-xs text-surface-400">
                    Expected Close
                  </dt>
                  <dd className="text-sm text-surface-700">
                    {new Date(
                      deal.expected_close_date
                    ).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-surface-700 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {deal.stage !== "won" && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => moveDeal(deal.id, "won")}
                >
                  Mark as Won
                </Button>
              )}
              {deal.stage !== "lost" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-danger hover:bg-red-50"
                  onClick={() => moveDeal(deal.id, "lost")}
                >
                  Mark as Lost
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
