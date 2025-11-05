'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();

    const switchLanguage = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        // Get current path without locale
        const currentPath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
        const newPath = `/${newLocale}${currentPath}`;
        router.push(newPath);
    };

    const buttonText = locale === 'en' ? t('common.arabic') : t('common.english');

    return (
        <button
            onClick={switchLanguage}
            className="text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-1 font-bold rounded-lg transition-colors"
        >
            {buttonText}
        </button>
    );
}