"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Plus, Sparkles } from "lucide-react";

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Proposals</h1>
          <p className="text-surface-500 text-sm mt-1">
            Create and manage client proposals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Plus size={16} /> From Template
          </Button>
          <Button>
            <Sparkles size={16} /> AI Generate
          </Button>
        </div>
      </div>

      <Card>
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={28} className="text-brand-500" />
          </div>
          <p className="text-surface-700 font-semibold text-lg">
            Proposal Builder Coming Soon
          </p>
          <p className="text-surface-400 text-sm mt-2 max-w-md mx-auto">
            AI-powered proposal generation with web dev templates, dynamic
            pricing, and e-signatures. Available in Phase 3.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              Drag & drop builder
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              5+ templates
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              Claude AI generation
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
