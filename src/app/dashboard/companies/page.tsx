"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { INDUSTRY_LABELS, type Company, type Industry } from "@/types/database";
import { Building2, Globe, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { create } from "zustand";

interface CompaniesState {
  companies: Company[];
  addCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
}

const useCompaniesStore = create<CompaniesState>((set) => ({
  companies: [],
  addCompany: (company) =>
    set((s) => ({ companies: [company, ...s.companies] })),
  deleteCompany: (id) =>
    set((s) => ({ companies: s.companies.filter((c) => c.id !== id) })),
}));

export default function CompaniesPage() {
  const { companies, addCompany, deleteCompany } = useCompaniesStore();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    website: "",
    industry: "other" as Industry,
    size: "",
    budget_range: "",
    city: "",
    state: "",
  });

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    const company: Company = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: "local",
      name: form.name,
      website: form.website || null,
      industry: form.industry,
      size: form.size || null,
      budget_range: form.budget_range || null,
      current_site_score: null,
      logo_url: null,
      address: null,
      city: form.city || null,
      state: form.state || null,
    };
    addCompany(company);
    setShowModal(false);
    setForm({ name: "", website: "", industry: "other", size: "", budget_range: "", city: "", state: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Companies</h1>
          <p className="text-surface-500 text-sm mt-1">
            {companies.length} companies tracked
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Company
        </Button>
      </div>

      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-3 pr-3 py-2 text-sm bg-surface-0 border border-surface-300 rounded-[var(--radius-md)] placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 size={24} className="text-surface-400" />
            </div>
            <p className="text-surface-600 font-medium">No companies yet</p>
            <p className="text-surface-400 text-sm mt-1">
              Add companies to track your prospects
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <Card key={company.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-100 rounded-[var(--radius-md)] flex items-center justify-center text-surface-500">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">
                      {company.name}
                    </p>
                    {company.city && (
                      <p className="text-xs text-surface-400">
                        {company.city}
                        {company.state ? `, ${company.state}` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteCompany(company.id)}
                  className="p-1.5 text-surface-400 hover:text-danger hover:bg-red-50 rounded-[var(--radius-sm)] transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge>{INDUSTRY_LABELS[company.industry]}</Badge>
                {company.budget_range && (
                  <Badge variant="success">{company.budget_range}</Badge>
                )}
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 mt-3"
                >
                  <Globe size={12} /> {company.website}
                </a>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Company"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <Input
            id="name"
            label="Company name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            id="website"
            label="Website URL"
            placeholder="https://example.com"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-surface-700">
              Industry
            </label>
            <select
              value={form.industry}
              onChange={(e) =>
                setForm({ ...form, industry: e.target.value as Industry })
              }
              className="w-full px-3 py-2 text-sm bg-surface-0 border border-surface-300 rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            >
              {Object.entries(INDUSTRY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="city"
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              id="state"
              label="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <Input
            id="budget"
            label="Budget range"
            placeholder="e.g. $5K-$15K"
            value={form.budget_range}
            onChange={(e) =>
              setForm({ ...form, budget_range: e.target.value })
            }
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Company</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
