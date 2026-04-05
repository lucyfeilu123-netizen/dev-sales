"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  FileText,
  Globe,
  Kanban,
  LineChart,
  Mail,
  Menu,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── Navbar ─── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">DevSales</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>

        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="mt-2 block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow" />
      <div className="mx-auto grid max-w-6xl place-items-center gap-10 px-4 py-20 sm:px-6 md:py-32 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles size={14} className="text-primary" />
            AI-Powered Sales for Web Developers
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <span className="inline bg-gradient-to-r from-primary to-brand-400 bg-clip-text text-transparent">
              Close more deals.
            </span>{" "}
            Build fewer spreadsheets.
          </h1>

          <p className="mx-auto text-lg text-muted-foreground md:w-10/12 lg:mx-0">
            The all-in-one CRM built specifically for web developers and
            agencies. Pipeline, proposals, contracts, and invoicing — powered by
            AI.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
            >
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            No credit card required. Free for up to 50 contacts.
          </p>
        </div>

        {/* Hero cards — floating card composition */}
        <div className="relative hidden h-[500px] w-[600px] lg:flex">
          {/* Pipeline card */}
          <div className="absolute -top-2 left-4 w-[320px] rounded-xl border border-border bg-card p-5 shadow-xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Kanban size={16} className="text-primary" /> Sales Pipeline
            </div>
            <div className="flex gap-2">
              {[
                { stage: "Lead", count: 12, color: "bg-gray-200" },
                { stage: "Proposal", count: 5, color: "bg-amber-200" },
                { stage: "Contract", count: 3, color: "bg-emerald-200" },
                { stage: "Won", count: 8, color: "bg-green-300" },
              ].map((s) => (
                <div key={s.stage} className="flex-1 text-center">
                  <div className={`${s.color} mx-auto mb-1 h-16 rounded-md`} style={{ height: `${20 + s.count * 5}px` }} />
                  <p className="text-[10px] font-medium text-muted-foreground">{s.stage}</p>
                  <p className="text-xs font-bold">{s.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue card */}
          <div className="absolute right-0 top-8 w-[240px] rounded-xl border border-border bg-card p-4 shadow-xl">
            <p className="text-xs text-muted-foreground">Monthly Revenue</p>
            <p className="mt-1 text-2xl font-bold">$47,250</p>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
              <LineChart size={12} /> +23% this month
            </div>
          </div>

          {/* AI proposal card */}
          <div className="absolute bottom-16 left-12 w-[280px] rounded-xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={14} className="text-violet-500" /> AI Proposal
            </div>
            <div className="space-y-1.5">
              <div className="h-2.5 w-full rounded-full bg-muted" />
              <div className="h-2.5 w-4/5 rounded-full bg-muted" />
              <div className="h-2.5 w-3/5 rounded-full bg-muted" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Restaurant XYZ Redesign</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">$12,500</span>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="absolute bottom-4 right-4 w-[220px] rounded-xl border border-border bg-card p-4 shadow-xl">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              &ldquo;Closed 3x more deals since switching to DevSales.&rdquo;
            </p>
            <p className="mt-1.5 text-xs font-medium">Sarah K., Agency Owner</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function Stats() {
  const stats = [
    { value: "500+", label: "Web developers" },
    { value: "12,000+", label: "Deals tracked" },
    { value: "$8.2M", label: "Revenue closed" },
    { value: "32%", label: "Higher win rate" },
  ];

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight text-foreground">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    {
      icon: Kanban,
      title: "Pipeline Built for Web Dev",
      desc: "11 stages from Lead to Won — discovery calls, website audits, proposals, contracts, deposits, and onboarding.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Proposals",
      desc: "Generate winning proposals from deal context in seconds. Web dev templates with dynamic pricing and case studies.",
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: Globe,
      title: "Website Audit Tool",
      desc: "Auto-analyze prospect websites with Lighthouse. Generate audit reports as sales ammunition — show them what's broken.",
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      icon: FileText,
      title: "Contracts & E-Signatures",
      desc: "Web-dev specific contract clauses — scope limits, revision rounds, kill fees, IP transfer. Built-in e-sign.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: BarChart3,
      title: "Invoicing & Payments",
      desc: "Stripe-powered milestone billing. Deposits, progress payments, and recurring retainer invoicing — all automated.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Mail,
      title: "Email Sequences",
      desc: "Automated follow-up sequences. Never lose a deal to ghosting again. Track opens, clicks, and replies.",
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const badges = [
    "CRM", "Proposals", "Contracts", "Invoicing", "Website Audits",
    "AI Generation", "Email Sequences", "Client Portal", "Dark Mode",
  ];

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-primary to-brand-400 bg-clip-text text-transparent">
            close more deals
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Stop juggling 5 tools. DevSales combines your CRM, proposals, contracts,
          and invoicing into one platform built for how web developers actually sell.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {badges.map((b) => (
          <span key={b} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            {b}
          </span>
        ))}
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className={`inline-flex rounded-lg p-2.5 ${f.color}`}>
              <f.icon size={22} />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Capture Leads", desc: "Import contacts, run website audits, score prospects automatically." },
    { num: "02", title: "Send Proposals", desc: "AI generates proposals from deal context. 3-tier pricing, case studies, e-sign." },
    { num: "03", title: "Close & Collect", desc: "Contracts with web-dev clauses. Stripe invoicing with milestone payments." },
    { num: "04", title: "Onboard & Deliver", desc: "Client portal, content collection, project handoff. All in one place." },
  ];

  return (
    <section id="how-it-works" className="border-y border-border bg-muted/20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From lead to launch in{" "}
            <span className="bg-gradient-to-r from-primary to-brand-400 bg-clip-text text-transparent">4 steps</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            A pipeline designed around the web development sales cycle — not adapted from generic CRM.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <span className="text-5xl font-black text-muted/60">{s.num}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const plans = [
    {
      name: "Free",
      price: 0,
      desc: "Perfect for getting started",
      features: ["50 contacts", "3 active deals", "Basic pipeline", "1 proposal template", "Community support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: 29,
      desc: "For serious freelancers and small agencies",
      features: ["Unlimited contacts", "Unlimited deals", "AI proposals", "Email sequences", "Website audits", "Priority support"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Agency",
      price: 49,
      desc: "For teams that close big deals",
      features: ["Everything in Pro", "5 team seats", "Client portal", "White-label proposals", "API access", "Dedicated support"],
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple,{" "}
          <span className="bg-gradient-to-r from-primary to-brand-400 bg-clip-text text-transparent">
            transparent
          </span>{" "}
          pricing
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          No hidden fees. No per-transaction charges. Start free, upgrade when you grow.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-xl border p-8 transition-all ${
              p.popular
                ? "border-primary bg-card shadow-xl shadow-primary/10"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">${p.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

            <Link
              href="/dashboard"
              className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                p.popular
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              {p.cta}
            </Link>

            <hr className="my-6 border-border" />

            <ul className="space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check size={16} className="text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reviews = [
    { name: "Sarah K.", role: "Agency Owner", quote: "Closed 3x more deals in the first quarter. The AI proposals alone saved me 10 hours a week.", avatar: "SK" },
    { name: "James R.", role: "Freelance Developer", quote: "Finally a CRM that understands the web dev sales cycle. Discovery call → audit → proposal → contract. It just makes sense.", avatar: "JR" },
    { name: "Maria L.", role: "Studio Lead", quote: "The website audit tool is a game changer. I send prospects a free audit and close 40% of them.", avatar: "ML" },
    { name: "Alex T.", role: "WordPress Agency", quote: "Switched from HoneyBook. The web-dev specific contract clauses saved me from a scope creep nightmare.", avatar: "AT" },
    { name: "Nina P.", role: "Webflow Designer", quote: "The productized service templates let me sell $5K packages on autopilot. Best investment I've made.", avatar: "NP" },
    { name: "Chris D.", role: "Full-Stack Dev", quote: "Pipeline went from a messy spreadsheet to a beautiful Kanban. My win rate jumped from 20% to 35%.", avatar: "CD" },
  ];

  return (
    <section id="testimonials" className="border-t border-border bg-muted/20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by{" "}
          <span className="bg-gradient-to-r from-primary to-brand-400 bg-clip-text text-transparent">
            web developers
          </span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join 500+ developers and agencies who close more deals with DevSales.
        </p>

        <div className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <div key={r.name} className="break-inside-avoid rounded-xl border border-border bg-card p-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-2xl shadow-primary/20 sm:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to close more deals?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
            Join 500+ web developers who stopped losing deals to ghosting, scope
            creep, and scattered tools.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/90"
            >
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/10"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Globe size={16} />
              </div>
              <span className="text-lg font-bold">DevSales</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The sales system built specifically for web developers and agencies.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Resources", links: ["Blog", "Documentation", "Templates", "API"] },
            { title: "Company", links: ["About", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} DevSales. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
