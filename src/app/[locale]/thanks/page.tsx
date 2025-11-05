"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState(4);
    const employment = searchParams.get('employment');

    useEffect(() => {
        if (countdown <= 0) {
            // router.push(pathname.replace(/\/thanks$/, '') || '/');
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, router, pathname]);

    const handleBackClick = () => {
        // router.push(pathname.replace(/\/success$/, '') || '/');
    };

    const isEligible = employment === 'no';
    const successMessage = "Your nomination has been submitted successfully.";
    const ineligibleMessage = "Sorry but you are not eligible to participate in the survey as you are currently employed by a federal entity";

    return (
        <div className="min-h-screen bg-linear-to-r from-[#f3e7e7] to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="w-8 h-8 text-green-600 text-4xl">✔</span>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Thank you!</h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    {isEligible ? ineligibleMessage : successMessage}
                </p>

                {/* Countdown */}
                <p className="text-gray-500 text-sm mb-8">
                    You will be redirected within {countdown}{" "}
                    {countdown === 1 ? "second" : "seconds"}.
                </p>

                {/* Back Button */}
                <button
                    onClick={handleBackClick}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                    Back to main site
                </button>
            </div>
        </div>
    );
}
