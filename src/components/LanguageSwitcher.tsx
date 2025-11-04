'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (newLocale: string) => {
        // Get current path without locale
        const currentPath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
        const newPath = `/${newLocale}${currentPath}`;
        router.push(newPath);
    };

    return (
        <div className="flex gap-2 p-4">
            <button
                onClick={() => switchLanguage('en')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${locale === 'en'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
            >
                English
            </button>
            <button
                onClick={() => switchLanguage('ar')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${locale === 'ar'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
            >
                العربية
            </button>
        </div>
    );
}