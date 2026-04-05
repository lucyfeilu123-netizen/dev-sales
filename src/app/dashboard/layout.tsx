"use client";

import { AuthGuard } from "@/components/auth-guard";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2m0 10V7m6 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" },
  { href: "/dashboard/contacts", label: "Contacts", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/dashboard/companies", label: "Companies", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { href: "/dashboard/proposals", label: "Proposals", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/dashboard/invoices", label: "Invoices", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d={d} />
    </svg>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[var(--color-canvas)]">
        {/* Sidebar */}
        <aside className={cn(
          "fixed left-0 top-0 h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col z-30 transition-all duration-300",
          collapsed ? "w-[52px]" : "w-56"
        )}>
          {/* Logo */}
          <div className="h-12 flex items-center px-4 border-b border-[var(--color-border)] shrink-0">
            {!collapsed && <span className="text-[14px] font-semibold text-[var(--color-ink)] tracking-tight">DevSales</span>}
            {collapsed && <span className="text-[14px] font-semibold text-[var(--color-ink)]">D</span>}
          </div>

          {/* Nav */}
          <nav className="flex-1 py-2 px-2 space-y-px overflow-y-auto">
            {navItems.map(({ href, label, icon }) => {
              const active = href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-[7px] rounded-[var(--radius-sm)] text-[13px] transition-colors",
                    active
                      ? "bg-[var(--color-muted)] text-[var(--color-ink)] font-medium"
                      : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <NavIcon d={icon} />
                  {!collapsed && label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-2 border-t border-[var(--color-border)] space-y-px">
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-[7px] rounded-[var(--radius-sm)] text-[13px] transition-colors",
                pathname.startsWith("/dashboard/settings")
                  ? "bg-[var(--color-muted)] text-[var(--color-ink)] font-medium"
                  : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)]"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><circle cx="12" cy="12" r="3" /></svg>
              {!collapsed && "Settings"}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-[var(--radius-sm)] text-[13px] text-[var(--color-ink-tertiary)] hover:bg-[var(--color-muted)] hover:text-[var(--color-ink-secondary)] transition-colors w-full cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-300", collapsed && "rotate-180")}><path d="M15 19l-7-7 7-7" /></svg>
              {!collapsed && "Collapse"}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className={cn("transition-all duration-300", collapsed ? "ml-[52px]" : "ml-56")}>
          <div className="max-w-5xl mx-auto px-6 py-8 lg:px-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
