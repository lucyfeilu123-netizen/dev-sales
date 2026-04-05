"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─── Scroll Animation Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, className: visible ? "animate-in" : "opacity-0 translate-y-3" };
}

/* ─── Navbar ─── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[15px] font-semibold tracking-tight text-[var(--color-ink)]">DevSales</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-1.5 text-[13px] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink)]">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard" className="text-[13px] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink)]">
            Dashboard
          </Link>
          <Link href="/dashboard" className="rounded-[var(--radius-sm)] bg-[var(--color-action)] px-4 py-1.5 text-[13px] font-medium text-[var(--color-action-fg)] transition-colors hover:bg-[var(--color-action-hover)] active:scale-[0.98]">
            Get started
          </Link>
        </div>

        <button className="p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobileOpen ? "M18 6L6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} /></svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-[13px] text-[var(--color-ink-secondary)]">{l.label}</a>
          ))}
          <Link href="/dashboard" className="mt-2 block w-full rounded-[var(--radius-sm)] bg-[var(--color-action)] py-2 text-center text-[13px] font-medium text-[var(--color-action-fg)]">
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 md:py-36 text-center">
      <p className="mb-6 inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-secondary)]">
        Sales tools for web developers
      </p>

      <h1 className="mx-auto max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.03em]">
        Close more projects.{" "}
        <em className="not-italic text-[var(--color-ink-secondary)]">
          Spend less time selling.
        </em>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-secondary)]">
        Pipeline, proposals, contracts and invoicing in one workspace.
        Built around how web developers and agencies actually close deals.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/dashboard" className="rounded-[var(--radius-sm)] bg-[var(--color-action)] px-8 py-2.5 text-[14px] font-medium text-[var(--color-action-fg)] transition-colors hover:bg-[var(--color-action-hover)] active:scale-[0.98]">
          Start free trial
        </Link>
        <a href="#how-it-works" className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-8 py-2.5 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-muted)]">
          See how it works
        </a>
      </div>

      <p className="mt-5 text-[12px] text-[var(--color-ink-tertiary)]">
        Free for up to 50 contacts. No credit card required.
      </p>
    </section>
  );
}

/* ─── Stats ─── */
function Stats() {
  const reveal = useScrollReveal();
  const stats = [
    { value: "500+", label: "Web developers" },
    { value: "12,000+", label: "Deals tracked" },
    { value: "$8.2M", label: "Revenue closed" },
    { value: "32%", label: "Higher win rate" },
  ];

  return (
    <section className="border-y border-[var(--color-border)]">
      <div ref={reveal.ref} className={`mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 py-14 md:grid-cols-4 ${reveal.className}`}>
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[28px] font-semibold tracking-tight text-[var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
            <p className="mt-1 text-[13px] text-[var(--color-ink-secondary)]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features — Bento Grid ─── */
function Features() {
  const reveal = useScrollReveal();
  const features = [
    { tag: "Pipeline", tagColor: "blue", title: "11-stage Kanban built for web dev", desc: "From initial lead through website audit, proposal, contract, deposit, and onboarding. Every stage reflects how you actually sell.", span: "md:col-span-2" },
    { tag: "AI", tagColor: "purple", title: "Proposals in seconds", desc: "Generate professional proposals from deal context. Three-tier pricing, embedded case studies, and e-signature ready.", span: "" },
    { tag: "Audit", tagColor: "green", title: "Website audit as a sales tool", desc: "Run Lighthouse on any prospect URL. Generate a branded PDF report showing exactly what needs fixing on their current site.", span: "" },
    { tag: "Contracts", tagColor: "yellow", title: "Web-dev specific clauses", desc: "Scope limits, revision rounds, kill fees, IP transfer on final payment. Every clause written for how web projects actually work.", span: "" },
    { tag: "Invoicing", tagColor: "red", title: "Milestone payments via Stripe", desc: "Deposits, progress payments, final invoices, and recurring retainer billing. Automated reminders when invoices are overdue.", span: "md:col-span-2" },
  ];

  const tagColors: Record<string, string> = {
    blue: "bg-[var(--color-tag-blue-bg)] text-[var(--color-tag-blue-fg)]",
    purple: "bg-[var(--color-tag-purple-bg)] text-[var(--color-tag-purple-fg)]",
    green: "bg-[var(--color-tag-green-bg)] text-[var(--color-tag-green-fg)]",
    yellow: "bg-[var(--color-tag-yellow-bg)] text-[var(--color-tag-yellow-fg)]",
    red: "bg-[var(--color-tag-red-bg)] text-[var(--color-tag-red-fg)]",
  };

  return (
    <section id="features" className="mx-auto max-w-5xl px-5 py-24 md:py-32">
      <div ref={reveal.ref} className={reveal.className}>
        <h2 className="max-w-lg text-[clamp(1.8rem,4vw,2.8rem)]">
          Everything you need to <em className="not-italic text-[var(--color-ink-secondary)]">run your sales</em>
        </h2>
        <p className="mt-4 max-w-lg text-[15px] text-[var(--color-ink-secondary)]">
          Stop juggling separate tools. One workspace for the entire lifecycle from first contact to final payment.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3 stagger">
        {features.map((f) => (
          <div
            key={f.title}
            className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${f.span}`}
          >
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.05em] ${tagColors[f.tagColor]}`}>
              {f.tag}
            </span>
            <h3 className="mt-4 text-[17px] font-semibold leading-snug text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
              {f.title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-secondary)]">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const reveal = useScrollReveal();
  const steps = [
    { num: "01", title: "Capture", desc: "Import contacts, run website audits, and score prospects based on their current site quality and budget signals." },
    { num: "02", title: "Propose", desc: "AI generates a proposal from your deal context. Three-tier pricing, timeline, case studies. Send with one click." },
    { num: "03", title: "Close", desc: "Web-dev specific contracts with revision limits and kill fees. Collect deposits through Stripe before starting work." },
    { num: "04", title: "Deliver", desc: "Client portal for content collection, brand assets, and project updates. Hand off from sales to delivery in one system." },
  ];

  return (
    <section id="how-it-works" className="border-y border-[var(--color-border)] bg-[var(--color-muted)]">
      <div className="mx-auto max-w-5xl px-5 py-24 md:py-32">
        <div ref={reveal.ref} className={reveal.className}>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">
            From first contact to <em className="not-italic text-[var(--color-ink-secondary)]">project kickoff</em>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] text-[var(--color-ink-secondary)]">
            A four-step process designed around the web development sales cycle.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-4 stagger">
          {steps.map((s) => (
            <div key={s.num} className="bg-[var(--color-surface)] p-7">
              <span className="text-[32px] font-semibold text-[var(--color-ink-tertiary)]" style={{ fontFamily: "var(--font-display)" }}>{s.num}</span>
              <h3 className="mt-3 text-[16px] font-semibold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-ink-secondary)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const reveal = useScrollReveal();
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "For getting started",
      features: ["50 contacts", "3 active deals", "Basic pipeline", "1 proposal template"],
      cta: "Get started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      desc: "For freelancers and small agencies",
      features: ["Unlimited contacts", "Unlimited deals", "AI proposals", "Email sequences", "Website audits", "Priority support"],
      cta: "Start free trial",
      highlighted: true,
    },
    {
      name: "Agency",
      price: "$49",
      desc: "For teams closing larger deals",
      features: ["Everything in Pro", "5 team seats", "Client portal", "White-label proposals", "API access"],
      cta: "Contact us",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-5xl px-5 py-24 md:py-32">
      <div ref={reveal.ref} className={`text-center ${reveal.className}`}>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">
          Simple pricing
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-[var(--color-ink-secondary)]">
          No per-transaction fees. No hidden charges. Start free and upgrade when you need more.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3 stagger">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-[var(--radius-lg)] border p-7 transition-shadow duration-200 ${
              p.highlighted
                ? "border-[var(--color-ink)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>{p.name}</h3>
              {p.highlighted && (
                <span className="rounded-full bg-[var(--color-tag-blue-bg)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.05em] text-[var(--color-tag-blue-fg)]">
                  Popular
                </span>
              )}
            </div>
            <div className="mt-4">
              <span className="text-[36px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{p.price}</span>
              <span className="text-[14px] text-[var(--color-ink-secondary)]">/month</span>
            </div>
            <p className="mt-1 text-[13px] text-[var(--color-ink-secondary)]">{p.desc}</p>

            <Link
              href="/dashboard"
              className={`mt-6 block w-full rounded-[var(--radius-sm)] py-2 text-center text-[13px] font-medium transition-colors active:scale-[0.98] ${
                p.highlighted
                  ? "bg-[var(--color-action)] text-[var(--color-action-fg)] hover:bg-[var(--color-action-hover)]"
                  : "border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-muted)]"
              }`}
            >
              {p.cta}
            </Link>

            <div className="mt-6 border-t border-[var(--color-border)] pt-5 space-y-2.5">
              {p.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-[13px] text-[var(--color-ink-secondary)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--color-tag-green-fg)] shrink-0"><path d="M20 6L9 17l-5-5" /></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reveal = useScrollReveal();
  const reviews = [
    { name: "Sarah Kim", role: "Agency Owner, Portland", quote: "Closed three times more deals in the first quarter. The AI proposals alone saved me ten hours each week." },
    { name: "James Rivera", role: "Freelance Developer", quote: "Finally a CRM that understands the web dev sales cycle. Discovery, audit, proposal, contract. It just makes sense." },
    { name: "Maria Lopez", role: "Studio Lead, Austin", quote: "The website audit tool changed everything. I send prospects a free audit and close forty percent of them." },
  ];

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]">
      <div className="mx-auto max-w-5xl px-5 py-24 md:py-32">
        <div ref={reveal.ref} className={reveal.className}>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">
            What developers <em className="not-italic text-[var(--color-ink-secondary)]">are saying</em>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 stagger">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
              <p className="text-[14px] leading-relaxed text-[var(--color-ink-secondary)] italic" style={{ fontFamily: "var(--font-display)" }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <p className="text-[13px] font-semibold text-[var(--color-ink)]">{r.name}</p>
                <p className="text-[12px] text-[var(--color-ink-tertiary)]">{r.role}</p>
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
  const reveal = useScrollReveal();
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 md:py-32">
      <div ref={reveal.ref} className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center md:p-20 ${reveal.className}`}>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">
          Ready to close <em className="not-italic text-[var(--color-ink-secondary)]">more deals?</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-[var(--color-ink-secondary)]">
          Join five hundred web developers who stopped losing deals to ghosting and scattered tools.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/dashboard" className="rounded-[var(--radius-sm)] bg-[var(--color-action)] px-8 py-2.5 text-[14px] font-medium text-[var(--color-action-fg)] transition-colors hover:bg-[var(--color-action-hover)] active:scale-[0.98]">
            Start free trial
          </Link>
          <a href="#pricing" className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-8 py-2.5 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-muted)]">
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-[15px] font-semibold text-[var(--color-ink)]">DevSales</span>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-ink-secondary)]">
              Sales tools built for web developers and agencies.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Resources", links: ["Documentation", "Templates", "API Reference", "Blog"] },
            { title: "Company", links: ["About", "Contact", "Privacy Policy", "Terms of Service"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--color-ink-tertiary)]">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-[13px] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink)]">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-center">
          <p className="text-[12px] text-[var(--color-ink-tertiary)]">{new Date().getFullYear()} DevSales. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <>
      <div className="ambient-glow" />
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
