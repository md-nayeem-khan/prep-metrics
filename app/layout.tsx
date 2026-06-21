import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SonnerToaster } from "@/components/ui/sonner-toaster";
import { ThemeProvider } from "next-themes";
import { ActiveThemeProvider } from "@/components/themes/active-theme-provider";
import { DEFAULT_THEME, isValidTheme } from "@/components/themes/theme.config";
import { TimezoneProvider } from "@/components/providers/timezone-provider";
import { NavigationProgress } from "@/components/layout/navigation-progress";
import { isValidTimeZone } from "@/lib/datetime/tz";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cookies } from "next/headers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrepMetrics - Interview Preparation Analytics Dashboard",
  description:
    "Track competitive programming problems and improve interview preparation with pattern mastery insights and analytics",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("active_theme")?.value;
  const activeTheme = isValidTheme(cookieTheme)
    ? (cookieTheme as string)
    : DEFAULT_THEME;

  const cookieTimezone = cookieStore.get("user_tz")?.value;
  const initialTimezone = isValidTimeZone(cookieTimezone)
    ? (cookieTimezone as string)
    : undefined;

  return (
    <html
      lang="en"
      data-theme={activeTheme}
      className={cn("font-sans", geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className={cn(inter.className, "antialiased")}>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ActiveThemeProvider initialTheme={activeTheme}>
              <TimezoneProvider initialTimezone={initialTimezone}>
                <TooltipProvider delayDuration={300}>
                  <NavigationProgress />
                  {children}
                  <SonnerToaster />
                </TooltipProvider>
              </TimezoneProvider>
            </ActiveThemeProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
