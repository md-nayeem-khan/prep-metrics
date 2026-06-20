"use client";

import * as React from "react";
import { DEFAULT_THEME, isValidTheme } from "@/components/themes/theme.config";

type ActiveThemeProviderProps = {
  children: React.ReactNode;
  initialTheme?: string;
};

const ActiveThemeContext = React.createContext<{
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
}>({
  activeTheme: DEFAULT_THEME,
  setActiveTheme: () => {},
});

export function ActiveThemeProvider({
  children,
  initialTheme,
}: ActiveThemeProviderProps) {
  const [activeTheme, setActiveThemeState] = React.useState(
    isValidTheme(initialTheme) ? (initialTheme as string) : DEFAULT_THEME,
  );

  const setActiveTheme = React.useCallback((theme: string) => {
    setActiveThemeState(theme);
    document.cookie = `active_theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  // Keep the html data-theme attribute in sync (also corrects legacy values).
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  return (
    <ActiveThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ActiveThemeContext.Provider>
  );
}

export function useActiveTheme() {
  return React.useContext(ActiveThemeContext);
}

// Template-compatible alias.
export const useThemeConfig = useActiveTheme;
