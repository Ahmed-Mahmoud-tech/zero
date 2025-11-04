import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Use requestLocale instead of locale for Next.js 16 compatibility
  let currentLocale = await requestLocale;

  // Fallback to 'en' if locale is still undefined
  if (!currentLocale || !["en", "ar"].includes(currentLocale)) {
    currentLocale = "en";
  }

  console.log("Request locale:", currentLocale);

  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}.json`)).default,
  };
});
