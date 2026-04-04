"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Globe,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-700 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.15)_0%,transparent_50%)]" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/15 backdrop-blur rounded-[var(--radius-md)] flex items-center justify-center">
              <Globe size={22} />
            </div>
            <span className="text-2xl font-bold tracking-tight font-[var(--font-display)]">
              DevSales
            </span>
          </div>
          <p className="text-brand-200 text-sm mt-1">
            Sales system built for web developers
          </p>
        </div>

        <div className="relative space-y-6">
          <Feature
            icon={<BarChart3 size={20} />}
            title="Pipeline built for web dev"
            desc="Lead → Audit → Proposal → Contract → Kickoff"
          />
          <Feature
            icon={<Sparkles size={20} />}
            title="AI-powered proposals"
            desc="Generate winning proposals from deal context in seconds"
          />
          <Feature
            icon={<FileText size={20} />}
            title="Contracts & invoicing"
            desc="Web-dev specific clauses, Stripe payments, milestone billing"
          />
        </div>

        <p className="relative text-brand-300 text-xs">
          Trusted by 200+ web developers and agencies
        </p>
      </div>

      {/* Right — Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-600 rounded-[var(--radius-md)] flex items-center justify-center text-white">
              <Globe size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">DevSales</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-surface-900">
              Welcome back
            </h1>
            <p className="text-surface-500 text-sm mt-1">
              Sign in to manage your sales pipeline
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius-md)] text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-50 px-3 text-surface-400">
                or continue with
              </span>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full"
            size="lg"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-surface-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-brand-600 font-medium hover:text-brand-700"
            >
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-brand-200 text-xs mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
