"use client";

import * as React from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { TimezoneCombobox } from "@/components/settings/timezone-combobox";
import { SettingsSaveBar } from "@/components/settings/settings-save-bar";
import { useTimezone } from "@/components/providers/timezone-provider";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { cn } from "@/lib/utils";

interface ProfileData {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  timezone: string;
  memberSince: string;
}

interface FormSnapshot {
  name: string;
  bio: string;
  timezone: string;
}

function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export function ProfileSection({
  onDirtyChange,
}: {
  onDirtyChange?: (dirty: boolean) => void;
}) {
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [timezone, setTimezone] = React.useState("UTC");
  // Baseline captured at load / last save — the dirty check compares against this.
  const [initial, setInitial] = React.useState<FormSnapshot>({
    name: "",
    bio: "",
    timezone: "UTC",
  });

  const { setTimezone: setDisplayTimezone } = useTimezone();

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (cancelled || !res.success) return;
        const data: ProfileData = res.data;
        setProfile(data);
        const snapshot: FormSnapshot = {
          name: data.name ?? "",
          bio: data.bio ?? "",
          timezone: data.timezone ?? "UTC",
        };
        setName(snapshot.name);
        setBio(snapshot.bio);
        setTimezone(snapshot.timezone);
        setInitial(snapshot);
      })
      .catch(() => {
        if (!cancelled) toast.error("Failed to load profile.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isDirty =
    name !== initial.name ||
    bio !== initial.bio ||
    timezone !== initial.timezone;

  // Surface dirty state to the shell (for the tab-switch guard) and warn on unload.
  useUnsavedChanges(isDirty);
  React.useEffect(() => {
    onDirtyChange?.(isDirty);
    return () => onDirtyChange?.(false);
  }, [isDirty, onDirtyChange]);

  const handleDiscard = () => {
    setName(initial.name);
    setBio(initial.bio);
    setTimezone(initial.timezone);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || null, bio: bio.trim() || null, timezone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save profile");
      setProfile((prev) => (prev ? { ...prev, ...data.data } : prev));
      // Update the display-timezone context (+ cookie) so dates re-render in the new zone immediately.
      if (data.data?.timezone) setDisplayTimezone(data.data.timezone);
      setInitial({ name, bio, timezone });
      toast.success("Profile saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials = profile ? getInitials(profile.name, profile.email) : "..";
  const memberSince = profile?.memberSince
    ? new Date(profile.memberSince).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Identity card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-5">
            {loading ? (
              <Skeleton className="size-20 shrink-0 rounded-full" />
            ) : (
              <Avatar className="size-20 shrink-0 text-2xl">
                <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="min-w-0 flex-1">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ) : (
                <>
                  <p className="truncate text-lg font-semibold">
                    {profile?.name || profile?.email}
                  </p>
                  {profile?.name && (
                    <p className="truncate text-sm text-muted-foreground">
                      {profile?.email}
                    </p>
                  )}
                  {memberSince && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Member since {memberSince}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your display name and bio.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={profile?.email ?? ""}
                disabled
                readOnly
                className="text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="A short note about your prep focus…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={loading}
              maxLength={500}
              rows={3}
            />
            <p
              className={cn(
                "text-right text-xs transition-colors",
                bio.length > 450 ? "text-orange-500" : "text-muted-foreground",
              )}
            >
              {bio.length}/500
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Timezone & Region */}
      <Card>
        <CardHeader>
          <CardTitle>Timezone &amp; Region</CardTitle>
          <CardDescription>
            Your daily streaks, revision schedule, and all date-based analytics use this
            timezone. Dates are also displayed in it.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="timezone">Timezone</Label>
            <TimezoneCombobox value={timezone} onChange={setTimezone} disabled={loading} />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (detected) setTimezone(detected);
              }}
              disabled={loading}
              className="text-sm text-primary underline-offset-4 hover:underline disabled:opacity-50"
            >
              Use browser timezone
            </button>
          </div>
        </CardContent>
      </Card>

      <SettingsSaveBar
        visible={isDirty}
        saving={saving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
}
