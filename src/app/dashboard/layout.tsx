"use client";

import { cn } from "@/lib/utils/cn";
import {
  BarChart3,
  Building2,
  ChevronLeft,
  FileText,
  Globe,
  Kanban,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
  { href: "/dashboard/pipeline", icon: Kanban, label: "Pipeline" },
  { href: "/dashboard/contacts", icon: Users, label: "Contacts" },
  { href: "/dashboard/companies", icon: Building2, label: "Companies" },
  { href: "/dashboard/proposals", icon: FileText, label: "Proposals" },
  { href: "/dashboard/invoices", icon: Receipt, label: "Invoices" },
];

const bottomItems = [
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-surface-0 border-r border-surface-200 flex flex-col z-30 transition-all duration-200",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="h-14 flex items-center gap-3 px-4 border-b border-surface-200 shrink-0">
          <div className="w-8 h-8 bg-brand-600 rounded-[var(--radius-sm)] flex items-center justify-center text-white shrink-0">
            <Globe size={17} />
          </div>
          {!collapsed && (
            <span className="font-bold text-surface-900 tracking-tight">
              DevSales
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom items */}
        <div className="py-3 px-2 border-t border-surface-200 space-y-0.5">
          {bottomItems.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && label}
              </Link>
            );
          })}

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors w-full cursor-pointer"
          >
            <ChevronLeft
              size={18}
              className={cn(
                "shrink-0 transition-transform",
                collapsed && "rotate-180"
              )}
            />
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-200",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        <div className="max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
