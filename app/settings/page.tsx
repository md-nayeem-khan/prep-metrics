"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Database,
  Download,
  Eye,
  EyeOff,
  Palette,
  Shield,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { PageContainer } from "@/components/layout/page-container";
import { ThemeModeToggle } from "@/components/themes/theme-mode-toggle";
import { useActiveTheme } from "@/components/themes/active-theme-provider";
import { THEMES } from "@/components/themes/theme.config";
import { cn } from "@/lib/utils";

interface ProfileData {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  memberSince: string;
}

type SectionId = "profile" | "appearance" | "security" | "data";

const NAV_ITEMS: {
  id: SectionId;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  { id: "profile", label: "Profile", description: "Personal information", icon: User },
  { id: "appearance", label: "Appearance", description: "Theme & display", icon: Palette },
  { id: "security", label: "Security", description: "Password & access", icon: Shield },
  { id: "data", label: "Data", description: "Export & backups", icon: Database },
];

const THEME_SWATCHES: Record<string, [string, string, string]> = {
  vercel: ["#000000", "#ededed", "#666666"],
  claude: ["#d4813e", "#f0e6d3", "#7c4a1e"],
  supabase: ["#3ecf8e", "#1c1c1c", "#0a0a0a"],
  mono: ["#71717a", "#f4f4f5", "#3f3f46"],
  notebook: ["#6366f1", "#fffbeb", "#4338ca"],
  neobrutualism: ["#eab308", "#ffffff", "#1a1a1a"],
  "light-green": ["#22c55e", "#f0fdf4", "#166534"],
  zen: ["#a855f7", "#faf5ff", "#6b21a8"],
  "astro-vista": ["#818cf8", "#0f0a1e", "#4f46e5"],
  whatsapp: ["#25d366", "#111b21", "#128c7e"],
};

function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

function getFilenameFromDisposition(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);
  const plainMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (plainMatch?.[1]) return plainMatch[1];
  return null;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  colorClass: string;
} {
  if (!password) return { score: 0, label: "", colorClass: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score: 1, label: "Weak", colorClass: "bg-red-500" };
  if (score <= 2) return { score: 2, label: "Fair", colorClass: "bg-orange-400" };
  if (score <= 3) return { score: 3, label: "Good", colorClass: "bg-yellow-400" };
  return { score: 4, label: "Strong", colorClass: "bg-green-500" };
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  // Profile state
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Data state
  const [isDownloading, setIsDownloading] = useState(false);

  // Theme state
  const { activeTheme, setActiveTheme } = useActiveTheme();

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          const data: ProfileData = res.data;
          setProfile(data);
          setName(data.name ?? "");
          setBio(data.bio ?? "");
        }
      })
      .catch(() => toast.error("Failed to load profile."))
      .finally(() => setProfileLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || null, bio: bio.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save profile");
      setProfile((prev) => (prev ? { ...prev, ...data.data } : prev));
      toast.success("Profile saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setPasswordSaving(true);
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
      setPasswordSaving(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/export/txt");
      if (!response.ok) throw new Error("Failed to download analytics report");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const filename =
        getFilenameFromDisposition(response.headers.get("content-disposition")) ||
        `analytics-report-${new Date().toISOString().slice(0, 10)}.txt`;
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      toast.success("Analytics report downloaded.");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Unable to download analytics report.");
    } finally {
      setIsDownloading(false);
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
  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;

  return (
    <PageContainer
      pageTitle="Settings"
      pageDescription="Manage your profile, preferences, and account"
    >
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">

        {/* ── Sidebar Nav ─────────────────────────────────── */}
        <aside className="w-full shrink-0 md:w-56">
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-1 overflow-x-auto pb-1 md:hidden">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  activeSection === id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Desktop: vertical */}
          <nav className="hidden flex-col gap-0.5 md:flex">
            {NAV_ITEMS.map(({ id, label, description, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  activeSection === id
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                    activeSection === id
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm leading-tight",
                      activeSection === id
                        ? "font-semibold text-foreground"
                        : "font-medium"
                    )}
                  >
                    {label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{description}</p>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content Area ────────────────────────────────── */}
        <div className="min-w-0 flex-1">

          {/* ── Profile ──────────────────────────────────── */}
          {activeSection === "profile" && (
            <div className="flex flex-col gap-5">
              {/* Identity card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-5">
                    {profileLoading ? (
                      <div className="size-20 shrink-0 animate-pulse rounded-full bg-muted" />
                    ) : (
                      <Avatar className="size-20 shrink-0 text-2xl">
                        <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="min-w-0 flex-1">
                      {profileLoading ? (
                        <div className="space-y-2">
                          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                          <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                        </div>
                      ) : (
                        <>
                          <p className="truncate text-lg font-semibold">
                            {profile?.name || "No name set"}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {profile?.email}
                          </p>
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
                  <CardDescription>
                    Update your display name and bio.
                  </CardDescription>
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
                        disabled={profileLoading}
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
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="A short note about your prep focus…"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={profileLoading}
                      maxLength={500}
                      rows={3}
                    />
                    <p
                      className={cn(
                        "text-right text-xs transition-colors",
                        bio.length > 450 ? "text-orange-500" : "text-muted-foreground"
                      )}
                    >
                      {bio.length}/500
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={profileLoading || profileSaving}
                    >
                      {profileSaving ? "Saving…" : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Appearance ───────────────────────────────── */}
          {activeSection === "appearance" && (
            <div className="flex flex-col gap-5">
              <Card>
                <CardHeader>
                  <CardTitle>Color Theme</CardTitle>
                  <CardDescription>
                    Choose a color palette for the dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {THEMES.map((theme) => {
                      const swatches =
                        THEME_SWATCHES[theme.value] ?? ["#888888", "#cccccc", "#444444"];
                      const isActive = activeTheme === theme.value;
                      return (
                        <button
                          key={theme.value}
                          onClick={() => setActiveTheme(theme.value)}
                          className={cn(
                            "group relative flex flex-col gap-2 rounded-lg border p-3 text-left transition-all",
                            isActive
                              ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                              : "border-border hover:border-primary/40 hover:bg-accent/50"
                          )}
                        >
                          {/* Swatch preview */}
                          <div className="flex h-6 gap-0.5 overflow-hidden rounded">
                            {swatches.map((color, i) => (
                              <div
                                key={i}
                                className="flex-1"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate text-xs font-medium leading-tight">
                              {theme.name}
                            </span>
                            {isActive && (
                              <Check className="size-3 shrink-0 text-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Display Mode</CardTitle>
                  <CardDescription>
                    Switch between light and dark appearance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark appearance.
                      </p>
                    </div>
                    <ThemeModeToggle />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Security ─────────────────────────────────── */}
          {activeSection === "security" && (
            <div className="flex flex-col gap-5">
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
                      <button
                        type="button"
                        onClick={() => setShowCurrent((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showCurrent ? "Hide password" : "Show password"}
                      >
                        {showCurrent ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
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
                      <button
                        type="button"
                        onClick={() => setShowNew((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showNew ? "Hide password" : "Show password"}
                      >
                        {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {/* Strength indicator */}
                    {newPassword.length > 0 && (
                      <div className="flex flex-col gap-1.5 pt-0.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                passwordStrength.score >= level
                                  ? passwordStrength.colorClass
                                  : "bg-muted"
                              )}
                            />
                          ))}
                        </div>
                        <p
                          className={cn(
                            "text-xs font-medium",
                            passwordStrength.score <= 1
                              ? "text-red-500"
                              : passwordStrength.score <= 2
                                ? "text-orange-400"
                                : passwordStrength.score <= 3
                                  ? "text-yellow-500"
                                  : "text-green-500"
                          )}
                        >
                          {passwordStrength.label}
                        </p>
                      </div>
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
                              : "border-red-400 focus-visible:ring-red-400/20")
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && (
                      <p
                        className={cn(
                          "text-xs font-medium",
                          passwordsMatch ? "text-green-500" : "text-red-400"
                        )}
                      >
                        {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleChangePassword}
                      disabled={
                        passwordSaving ||
                        !currentPassword ||
                        !newPassword ||
                        !confirmPassword
                      }
                    >
                      {passwordSaving ? "Updating…" : "Update Password"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account info */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-0 divide-y divide-border">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">
                        {memberSince ?? "Loading…"}
                      </p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.email ?? "Loading…"}
                      </p>
                    </div>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Data ─────────────────────────────────────── */}
          {activeSection === "data" && (
            <div className="flex flex-col gap-5">
              <Card>
                <CardHeader>
                  <CardTitle>Export Analytics Report</CardTitle>
                  <CardDescription>
                    Download a complete report of your interview preparation data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="rounded-lg border border-dashed bg-muted/30 p-4">
                    <p className="mb-2.5 text-sm font-medium">What&apos;s included</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "All solved problems with difficulty and tags",
                        "Full submission history and time tracking",
                        "Complete mock interview session logs",
                        "Pattern and topic performance breakdown",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <Check className="size-3.5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Format: Plain text (.txt)
                    </p>
                    <Button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="gap-2"
                    >
                      <Download className="size-4" />
                      {isDownloading ? "Preparing…" : "Download Report"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </PageContainer>
  );
}
