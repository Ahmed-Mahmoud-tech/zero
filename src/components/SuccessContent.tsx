"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function SuccessContent() {
    const t = useTranslations();
    const [countdown, setCountdown] = useState(4);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    const handleBackClick = () => {
        // router.push(pathname.replace(/\/success$/, '') || '/');
    };

    return (
        <>
            {/* Countdown */}
            <p className="text-gray-500 text-sm mb-8">
                {t('thanks.redirectMessage')} {countdown}{" "}
                {countdown === 1 ? t('thanks.second') : t('thanks.seconds')}.
            </p>

            {/* Back Button */}
            <button
                onClick={handleBackClick}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
                {t('thanks.backToMainSite')}
            </button>
        </>
    );
}
