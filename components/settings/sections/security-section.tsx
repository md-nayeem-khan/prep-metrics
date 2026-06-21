"use client";

import * as React from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PasswordRequirement {
  label: string;
  met: boolean;
}

function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    {
      label: "Upper & lowercase letters",
      met: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    { label: "A number", met: /[0-9]/.test(password) },
    { label: "A symbol", met: /[^A-Za-z0-9]/.test(password) },
  ];
}

function PasswordToggle({
  shown,
  onToggle,
}: {
  shown: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
      aria-label={shown ? "Hide password" : "Show password"}
    >
      {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}

export function SecuritySection() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // Lightweight load of the read-only account facts shown below the form.
  const [email, setEmail] = React.useState<string | null>(null);
  const [memberSince, setMemberSince] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (cancelled || !res.success) return;
        setEmail(res.data.email ?? null);
        if (res.data.memberSince) {
          setMemberSince(
            new Date(res.data.memberSince).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const requirements = getPasswordRequirements(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit =
    !saving &&
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword;

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update password");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            You&apos;ll need your current password to set a new one.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {/* Current password */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                className="pr-10"
              />
              <PasswordToggle
                shown={showCurrent}
                onToggle={() => setShowCurrent((v) => !v)}
              />
            </div>
          </div>

          <Separator />

          {/* New password */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="pr-10"
              />
              <PasswordToggle shown={showNew} onToggle={() => setShowNew((v) => !v)} />
            </div>
            {/* Requirements checklist */}
            {newPassword.length > 0 && (
              <ul className="mt-1 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {requirements.map((req) => (
                  <li
                    key={req.label}
                    className={cn(
                      "flex items-center gap-2 text-xs transition-colors",
                      req.met ? "text-green-600 dark:text-green-500" : "text-muted-foreground",
                    )}
                  >
                    {req.met ? (
                      <Check className="size-3.5 shrink-0" />
                    ) : (
                      <X className="size-3.5 shrink-0 opacity-60" />
                    )}
                    {req.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className={cn(
                  "pr-10",
                  confirmPassword.length > 0 &&
                    (passwordsMatch
                      ? "border-green-500 focus-visible:ring-green-500/20"
                      : "border-red-400 focus-visible:ring-red-400/20"),
                )}
              />
              <PasswordToggle
                shown={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
              />
            </div>
            {confirmPassword.length > 0 && (
              <p
                className={cn(
                  "text-xs font-medium",
                  passwordsMatch ? "text-green-500" : "text-red-400",
                )}
              >
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleChangePassword} disabled={!canSubmit}>
              {saving ? "Updating…" : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account info — truthful, read-only facts only */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-0 divide-y divide-border">
          <div className="flex items-center justify-between py-3">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{email ?? "Loading…"}</p>
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-sm font-medium">Member Since</p>
            <p className="text-sm text-muted-foreground">{memberSince ?? "Loading…"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
