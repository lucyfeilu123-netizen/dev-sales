"use client";

import { cn } from "@/lib/utils/cn";
import { useDealsStore } from "@/stores/deals";
import { DEAL_STAGE_CONFIG, type Deal, type DealStage } from "@/types/database";
import { DollarSign, GripVertical, Plus, Trophy, XCircle } from "lucide-react";
import { useState } from "react";

const VISIBLE_STAGES: DealStage[] = [
  "lead", "qualified", "discovery", "audit", "proposal",
  "negotiation", "contract", "deposit", "onboarding",
];

export default function PipelinePage() {
  const { deals, addDeal, moveDeal } = useDealsStore();
  const [showModal, setShowModal] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", value: "", stage: "lead" as DealStage });

  const wonDeals = deals.filter((d) => d.stage === "won");
  const lostDeals = deals.filter((d) => d.stage === "lost");

  function handleAdd() {
    const deal: Deal = {
      id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      user_id: "local", title: form.title, contact_id: null, company_id: null,
      stage: form.stage, value: parseFloat(form.value) || 0, probability: 20,
      expected_close_date: null, actual_close_date: null, notes: null,
    };
    addDeal(deal);
    setShowModal(false);
    setForm({ title: "", value: "", stage: "lead" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">Drag deals between stages to update status</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors cursor-pointer">
          <Plus size={16} /> New Deal
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 bg-emerald-50/50">
          <Trophy size={14} className="text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Won: {wonDeals.length} (${wonDeals.reduce((s, d) => s + d.value, 0).toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50/50">
          <XCircle size={14} className="text-red-600" />
          <span className="text-xs font-semibold text-red-700">Lost: {lostDeals.length} (${lostDeals.reduce((s, d) => s + d.value, 0).toLocaleString()})</span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2">
        {VISIBLE_STAGES.map((stage) => {
          const config = DEAL_STAGE_CONFIG[stage];
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage} className="flex-shrink-0 w-[260px]" onDragOver={(e) => e.preventDefault()} onDrop={() => { if (draggedDeal) { moveDeal(draggedDeal, stage); setDraggedDeal(null); } }}>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{config.label}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{stageDeals.length}</span>
              </div>
              {stageValue > 0 && <p className="text-xs text-muted-foreground mb-2 px-1 tabular-nums">${stageValue.toLocaleString()}</p>}
              <div className={cn("space-y-2 min-h-[140px] p-2 rounded-xl border border-dashed transition-colors", draggedDeal ? "border-primary/40 bg-primary/5" : "border-border bg-muted/20")}>
                {stageDeals.map((deal) => (
                  <div key={deal.id} draggable onDragStart={() => setDraggedDeal(deal.id)} className={cn("bg-card border border-border rounded-lg p-3.5 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md hover:border-primary/20 transition-all group", draggedDeal === deal.id && "opacity-40 scale-95")}>
                    <div className="flex items-start gap-2">
                      <GripVertical size={14} className="text-muted-foreground/30 mt-0.5 shrink-0 group-hover:text-muted-foreground transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{deal.title}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <DollarSign size={12} className="text-muted-foreground" />
                          <span className="text-xs font-semibold text-foreground tabular-nums">{deal.value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Won */}
        <div className="flex-shrink-0 w-[260px]" onDragOver={(e) => e.preventDefault()} onDrop={() => { if (draggedDeal) { moveDeal(draggedDeal, "won"); setDraggedDeal(null); } }}>
          <div className="flex items-center gap-2 mb-3 px-1"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Won</span><span className="text-xs text-muted-foreground bg-emerald-50 px-1.5 py-0.5 rounded">{wonDeals.length}</span></div>
          <div className="space-y-2 min-h-[140px] p-2 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/20">
            {wonDeals.map((d) => (<div key={d.id} className="bg-card border border-emerald-200 rounded-lg p-3.5 shadow-sm"><p className="text-sm font-medium text-foreground truncate">{d.title}</p><span className="text-xs font-semibold text-emerald-600 mt-1.5 inline-block">${d.value.toLocaleString()}</span></div>))}
          </div>
        </div>

        {/* Lost */}
        <div className="flex-shrink-0 w-[260px]" onDragOver={(e) => e.preventDefault()} onDrop={() => { if (draggedDeal) { moveDeal(draggedDeal, "lost"); setDraggedDeal(null); } }}>
          <div className="flex items-center gap-2 mb-3 px-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Lost</span><span className="text-xs text-muted-foreground bg-red-50 px-1.5 py-0.5 rounded">{lostDeals.length}</span></div>
          <div className="space-y-2 min-h-[140px] p-2 rounded-xl border border-dashed border-red-200 bg-red-50/20">
            {lostDeals.map((d) => (<div key={d.id} className="bg-card border border-red-200 rounded-lg p-3.5 shadow-sm"><p className="text-sm font-medium text-foreground truncate">{d.title}</p><span className="text-xs font-semibold text-red-600 mt-1.5 inline-block">${d.value.toLocaleString()}</span></div>))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md mx-4">
            <div className="p-6 border-b border-border"><h2 className="text-lg font-semibold">New Deal</h2><p className="text-sm text-muted-foreground mt-0.5">Add a deal to your pipeline</p></div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div><label className="text-sm font-medium text-foreground">Deal title</label><input className="mt-1.5 w-full px-3 py-2.5 text-sm bg-muted/50 border border-border rounded-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Restaurant XYZ Redesign" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
              <div><label className="text-sm font-medium text-foreground">Deal value ($)</label><input className="mt-1.5 w-full px-3 py-2.5 text-sm bg-muted/50 border border-border rounded-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="number" placeholder="5000" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required /></div>
              <div><label className="text-sm font-medium text-foreground">Starting stage</label><select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value as DealStage })} className="mt-1.5 w-full px-3 py-2.5 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">{VISIBLE_STAGES.map((s) => (<option key={s} value={s}>{DEAL_STAGE_CONFIG[s].label}</option>))}</select></div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm font-medium text-muted-foreground rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-sm hover:bg-primary/90 transition-colors cursor-pointer">Create Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
