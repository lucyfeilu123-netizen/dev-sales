"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Receipt } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Invoices</h1>
          <p className="text-surface-500 text-sm mt-1">
            Track and manage client invoices
          </p>
        </div>
        <Button>
          <Plus size={16} /> New Invoice
        </Button>
      </div>

      <Card>
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt size={28} className="text-emerald-500" />
          </div>
          <p className="text-surface-700 font-semibold text-lg">
            Invoicing Coming Soon
          </p>
          <p className="text-surface-400 text-sm mt-2 max-w-md mx-auto">
            Stripe-integrated invoicing with milestone payments, deposit
            collection, and recurring retainer billing. Available in Phase 4.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              Stripe payments
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              Milestone billing
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              Auto-reminders
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
