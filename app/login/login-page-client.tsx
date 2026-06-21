"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BarChart3, Loader2, ShieldCheck, TimerReset, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSafeNextPath } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FEATURES = [
  {
    icon: BarChart3,
    label: "Live readiness score and progress insights",
  },
  {
    icon: TimerReset,
    label: "Track streaks, time benchmarks, and revision cycles",
  },
  {
    icon: ShieldCheck,
    label: "Secure session and private analytics data",
  },
];

export default function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload?.error || "Login failed");
        return;
      }
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Unexpected error while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        {/* Left branding panel */}
        <div className="hidden flex-col justify-between rounded-xl border bg-card p-8 lg:flex">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-4 w-4" aria-hidden />
              </div>
              <span className="font-semibold">PrepMetrics</span>
            </div>

            <h1 className="mt-8 text-3xl font-bold leading-tight">
              Keep your interview momentum
              <span className="block text-primary">with focused analytics.</span>
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Sign in to continue tracking readiness, pattern confidence, and daily consistency
              from your personalized dashboard.
            </p>

            <div className="mt-8 space-y-3">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Precision practice. Measurable growth.</p>
        </div>

        {/* Right sign-in card */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary lg:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Code2 className="h-3.5 w-3.5" aria-hidden />
              </div>
              <span className="text-sm font-semibold">PrepMetrics</span>
            </div>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Use your account to access the PrepMetrics dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  autoFocus
                  aria-invalid={error ? true : undefined}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  aria-invalid={error ? true : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                >
                  {error}
                </p>
              )}

              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Signing in…
                  </>
                ) : (
                  <>
                    Continue to dashboard
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-4 text-xs text-muted-foreground">
              Need access? Contact your admin to provision an account.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
