export const locales = ["en", "ar"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];
