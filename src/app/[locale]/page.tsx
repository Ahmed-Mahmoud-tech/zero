import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function HomePage() {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <div>
            <LanguageSwitcher />
            <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">Current locale: {locale}</p>
                <h1 className="text-2xl font-bold">{t('title')}</h1>
            </div>
        </div>
    );
}