import type { Locale } from "@/i18n/config";

export type Localized<T> = { en: T; es: T };

export function isLocalized<T>(value: unknown): value is Localized<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "en" in value &&
    "es" in value
  );
}

export function pick<T>(value: Localized<T> | T, locale: Locale): T {
  return isLocalized<T>(value) ? value[locale] : value;
}
