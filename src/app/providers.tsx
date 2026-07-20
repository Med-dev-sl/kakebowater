"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import { ChartThemeProvider } from "@/components/providers/chart-theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ChartThemeProvider>{children}</ChartThemeProvider>
      </NextThemesProvider>
    </JotaiProvider>
  );
}
