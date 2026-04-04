export type DealStage =
  | "lead"
  | "qualified"
  | "discovery"
  | "audit"
  | "proposal"
  | "negotiation"
  | "contract"
  | "deposit"
  | "onboarding"
  | "won"
  | "lost";

export type ContactSource =
  | "referral"
  | "cold_email"
  | "linkedin"
  | "website"
  | "upwork"
  | "clutch"
  | "google"
  | "other";

export type Industry =
  | "restaurant"
  | "real_estate"
  | "legal"
  | "medical"
  | "ecommerce"
  | "saas"
  | "construction"
  | "coaching"
  | "nonprofit"
  | "other";

export interface Contact {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company_id: string | null;
  source: ContactSource;
  tags: string[];
  score: number;
  avatar_url: string | null;
  notes: string | null;
  position: string | null;
}

export interface Company {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  website: string | null;
  industry: Industry;
  size: string | null;
  budget_range: string | null;
  current_site_score: number | null;
  logo_url: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
}

export interface Deal {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  title: string;
  contact_id: string | null;
  company_id: string | null;
  stage: DealStage;
  value: number;
  probability: number;
  expected_close_date: string | null;
  actual_close_date: string | null;
  notes: string | null;
  contact?: Contact;
  company?: Company;
}

export interface Activity {
  id: string;
  created_at: string;
  user_id: string;
  deal_id: string | null;
  contact_id: string | null;
  type: "call" | "email" | "meeting" | "note" | "task";
  subject: string;
  body: string | null;
  scheduled_at: string | null;
  completed_at: string | null;
}

export interface Proposal {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  deal_id: string;
  title: string;
  content_json: Record<string, unknown>;
  status: "draft" | "sent" | "viewed" | "accepted" | "declined";
  sent_at: string | null;
  viewed_at: string | null;
  signed_at: string | null;
  total_value: number;
}

export interface Invoice {
  id: string;
  created_at: string;
  user_id: string;
  deal_id: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  stripe_invoice_id: string | null;
  due_date: string;
  paid_at: string | null;
  description: string | null;
}

export const DEAL_STAGE_CONFIG: Record<
  DealStage,
  { label: string; color: string; order: number }
> = {
  lead: { label: "Lead", color: "#6B7280", order: 0 },
  qualified: { label: "Qualified", color: "#8B5CF6", order: 1 },
  discovery: { label: "Discovery Call", color: "#3B82F6", order: 2 },
  audit: { label: "Website Audit", color: "#06B6D4", order: 3 },
  proposal: { label: "Proposal Sent", color: "#F59E0B", order: 4 },
  negotiation: { label: "Negotiation", color: "#F97316", order: 5 },
  contract: { label: "Contract", color: "#10B981", order: 6 },
  deposit: { label: "Deposit Paid", color: "#059669", order: 7 },
  onboarding: { label: "Onboarding", color: "#14B8A6", order: 8 },
  won: { label: "Won", color: "#22C55E", order: 9 },
  lost: { label: "Lost", color: "#EF4444", order: 10 },
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  restaurant: "Restaurant / Food",
  real_estate: "Real Estate",
  legal: "Legal / Law Firm",
  medical: "Medical / Healthcare",
  ecommerce: "E-commerce",
  saas: "SaaS / Tech",
  construction: "Construction / Home Services",
  coaching: "Coaching / Consulting",
  nonprofit: "Nonprofit",
  other: "Other",
};

export const SOURCE_LABELS: Record<ContactSource, string> = {
  referral: "Referral",
  cold_email: "Cold Email",
  linkedin: "LinkedIn",
  website: "Website",
  upwork: "Upwork",
  clutch: "Clutch",
  google: "Google",
  other: "Other",
};
