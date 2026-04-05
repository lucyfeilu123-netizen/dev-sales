"use client";

import { AuthGuard } from "@/components/auth-guard";
import { cn } from "@/lib/utils/cn";
import {
  BarChart3,
  Building2,
  ChevronLeft,
  FileText,
  Globe,
  Kanban,
  LogOut,
  Receipt,
  Search,
  Settings,
  Users,
  Bell,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: BarChart3, label: "Overview", desc: "Stats & activity" },
  { href: "/dashboard/pipeline", icon: Kanban, label: "Pipeline", desc: "Manage deals" },
  { href: "/dashboard/contacts", icon: Users, label: "Contacts", desc: "People & leads" },
  { href: "/dashboard/companies", icon: Building2, label: "Companies", desc: "Organizations" },
  { href: "/dashboard/proposals", icon: FileText, label: "Proposals", desc: "Send & track" },
  { href: "/dashboard/invoices", icon: Receipt, label: "Invoices", desc: "Get paid" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-surface-50">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-0 h-screen bg-white border-r border-border flex flex-col z-30 transition-all duration-300 ease-in-out",
            collapsed ? "w-[68px]" : "w-64"
          )}
        >
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-4 border-b border-border shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0 shadow-sm shadow-primary/20">
              <Globe size={18} />
            </div>
            {!collapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="font-bold text-foreground tracking-tight text-lg">
                  DevSales
                </span>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  PRO
                </span>
              </div>
            )}
          </div>

          {/* Quick action */}
          {!collapsed && (
            <div className="px-3 pt-4 pb-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <Plus size={14} />
                New Deal
              </button>
            </div>
          )}

          {/* Nav section label */}
          {!collapsed && (
            <div className="px-5 pt-4 pb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Menu
              </span>
            </div>
          )}

          {/* Nav links */}
          <nav className="flex-1 py-1 px-2.5 space-y-0.5 overflow-y-auto">
            {navItems.map(({ href, icon: Icon, label, desc }) => {
              const active =
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                    active
                      ? "bg-primary/10 text-primary font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon
                    size={18}
                    className={cn(
                      "shrink-0 transition-colors",
                      active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <span className="block">{label}</span>
                      {!active && (
                        <span className="block text-[11px] text-muted-foreground/60 truncate">
                          {desc}
                        </span>
                      )}
                    </div>
                  )}
                  {active && !collapsed && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-2.5 border-t border-border space-y-0.5">
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                pathname.startsWith("/dashboard/settings")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={collapsed ? "Settings" : undefined}
            >
              <Settings size={18} className="shrink-0" />
              {!collapsed && "Settings"}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full cursor-pointer"
            >
              <ChevronLeft
                size={18}
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  collapsed && "rotate-180"
                )}
              />
              {!collapsed && "Collapse"}
            </button>
          </div>

          {/* User card */}
          {!collapsed && (
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-brand-400 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  LF
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Lucy Fei Lu</p>
                  <p className="text-[11px] text-muted-foreground truncate">lucyfeilu@outlook.com</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main
          className={cn(
            "transition-all duration-300 ease-in-out",
            collapsed ? "ml-[68px]" : "ml-64"
          )}
        >
          {/* Top bar */}
          <div className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search deals, contacts..."
                  className="w-64 pl-9 pr-3 py-2 text-sm bg-muted/50 border-0 rounded-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
              <Link
                href="/dashboard/pipeline"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors"
              >
                <Plus size={14} /> New Deal
              </Link>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
