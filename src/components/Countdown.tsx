"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Countdown() {
    const t = useTranslations();
    const [countdown, setCountdown] = useState(4);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <p className="text-gray-500 text-sm mb-8">
            {t('thanks.redirectMessage')} {countdown}{" "}
            {countdown === 1 ? t('thanks.second') : t('thanks.seconds')}.
        </p>
    );
}
