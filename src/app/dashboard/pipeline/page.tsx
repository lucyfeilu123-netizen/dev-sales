"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils/cn";
import { useDealsStore } from "@/stores/deals";
import {
  DEAL_STAGE_CONFIG,
  type Deal,
  type DealStage,
} from "@/types/database";
import {
  DollarSign,
  GripVertical,
  Plus,
} from "lucide-react";
import { useState } from "react";

const PIPELINE_STAGES: DealStage[] = [
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
  "lost",
];

const VISIBLE_STAGES = PIPELINE_STAGES.filter(
  (s) => s !== "won" && s !== "lost"
);

export default function PipelinePage() {
  const { deals, addDeal, moveDeal } = useDealsStore();
  const [showModal, setShowModal] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    value: "",
    stage: "lead" as DealStage,
  });

  const wonDeals = deals.filter((d) => d.stage === "won");
  const lostDeals = deals.filter((d) => d.stage === "lost");

  function handleAdd() {
    const deal: Deal = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: "local",
      title: form.title,
      contact_id: null,
      company_id: null,
      stage: form.stage,
      value: parseFloat(form.value) || 0,
      probability: 20,
      expected_close_date: null,
      actual_close_date: null,
      notes: null,
    };
    addDeal(deal);
    setShowModal(false);
    setForm({ title: "", value: "", stage: "lead" });
  }

  function handleDragStart(dealId: string) {
    setDraggedDeal(dealId);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(stage: DealStage) {
    if (draggedDeal) {
      moveDeal(draggedDeal, stage);
      setDraggedDeal(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Pipeline</h1>
          <p className="text-surface-500 text-sm mt-1">
            Drag deals between stages to update their status
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> New Deal
        </Button>
      </div>

      {/* Won/Lost summary */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-[var(--radius-md)]">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-xs font-medium text-emerald-700">
            Won: {wonDeals.length} ($
            {wonDeals.reduce((s, d) => s + d.value, 0).toLocaleString()})
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-[var(--radius-md)]">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-xs font-medium text-red-700">
            Lost: {lostDeals.length} ($
            {lostDeals.reduce((s, d) => s + d.value, 0).toLocaleString()})
          </span>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2">
        {VISIBLE_STAGES.map((stage) => {
          const config = DEAL_STAGE_CONFIG[stage];
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);

          return (
            <div
              key={stage}
              className="flex-shrink-0 w-64"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-xs font-semibold text-surface-700 uppercase tracking-wide">
                    {config.label}
                  </span>
                  <span className="text-xs text-surface-400">
                    {stageDeals.length}
                  </span>
                </div>
              </div>

              {/* Stage value */}
              {stageValue > 0 && (
                <p className="text-xs text-surface-400 mb-2 tabular-nums">
                  ${stageValue.toLocaleString()}
                </p>
              )}

              {/* Cards */}
              <div
                className={cn(
                  "space-y-2 min-h-[120px] p-2 rounded-[var(--radius-lg)] border border-dashed border-surface-200 bg-surface-50/50 transition-colors",
                  draggedDeal && "border-brand-300 bg-brand-50/30"
                )}
              >
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                    className={cn(
                      "bg-surface-0 border border-surface-200 rounded-[var(--radius-md)] p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow transition-shadow",
                      draggedDeal === deal.id && "opacity-50"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical
                        size={14}
                        className="text-surface-300 mt-0.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 truncate">
                          {deal.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs font-semibold text-surface-700 flex items-center gap-0.5">
                            <DollarSign size={12} />
                            {deal.value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Won column */}
        <div
          className="flex-shrink-0 w-64"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("won")}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              Won
            </span>
            <span className="text-xs text-surface-400">
              {wonDeals.length}
            </span>
          </div>
          <div className="space-y-2 min-h-[120px] p-2 rounded-[var(--radius-lg)] border border-dashed border-emerald-200 bg-emerald-50/30">
            {wonDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-surface-0 border border-emerald-200 rounded-[var(--radius-md)] p-3 shadow-sm"
              >
                <p className="text-sm font-medium text-surface-900 truncate">
                  {deal.title}
                </p>
                <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
                  ${deal.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lost column */}
        <div
          className="flex-shrink-0 w-64"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("lost")}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              Lost
            </span>
            <span className="text-xs text-surface-400">
              {lostDeals.length}
            </span>
          </div>
          <div className="space-y-2 min-h-[120px] p-2 rounded-[var(--radius-lg)] border border-dashed border-red-200 bg-red-50/30">
            {lostDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-surface-0 border border-red-200 rounded-[var(--radius-md)] p-3 shadow-sm"
              >
                <p className="text-sm font-medium text-surface-900 truncate">
                  {deal.title}
                </p>
                <span className="text-xs font-semibold text-red-600 mt-1 inline-block">
                  ${deal.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add deal modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New Deal"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <Input
            id="title"
            label="Deal title"
            placeholder="e.g. Restaurant XYZ Website Redesign"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            id="value"
            label="Deal value ($)"
            type="number"
            placeholder="5000"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-surface-700">
              Starting stage
            </label>
            <select
              value={form.stage}
              onChange={(e) =>
                setForm({ ...form, stage: e.target.value as DealStage })
              }
              className="w-full px-3 py-2 text-sm bg-surface-0 border border-surface-300 rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            >
              {VISIBLE_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {DEAL_STAGE_CONFIG[stage].label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Deal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
