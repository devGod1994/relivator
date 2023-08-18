"use client";

import type { ComponentProps } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { settings } from "~/app";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import en from "~/data/i18n/dicts/en";
import { I18nProviderClient } from "~/data/i18n/i18n";
import { queryClient } from "~/utils/server/query";
import { WithChildren } from "~/utils/types/with-children";

import { Toaster } from "~/islands/primitives/toast/toaster";

export function ThemeProvider({
  children,
  ...props
}: WithChildren<ComponentProps<typeof NextThemeProvider>>) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}

export function Providers({
  children,
  locale
}: WithChildren<{ locale: string }>) {
  return (
    <>
      {settings.themeToggleEnabled ? (
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <I18nProviderClient locale={locale} fallbackLocale={en}>
              {children}
            </I18nProviderClient>
          </QueryClientProvider>
          <Toaster />
        </ThemeProvider>
      ) : (
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem>
          <QueryClientProvider client={queryClient}>
            <I18nProviderClient locale={locale} fallbackLocale={en}>
              {children}
            </I18nProviderClient>
          </QueryClientProvider>
          <Toaster />
        </ThemeProvider>
      )}
    </>
  );
}
