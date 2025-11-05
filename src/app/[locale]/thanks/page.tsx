import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import SuccessContent from "@/components/SuccessContent";

const getEmploymentFromCookie = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
    try {
        const formDataCookie = cookieStore.get("zeroform_data")?.value;
        const formData = formDataCookie ? JSON.parse(formDataCookie) : null;
        return formData?.employment || null;
    } catch {
        return null;
    }
};

export default async function SuccessPage() {
    const t = await getTranslations();
    const cookieStore = await cookies();
    const employment = getEmploymentFromCookie(cookieStore);
    const isEmployed = employment === 'yes';

    return (
        <div className="min-h-screen bg-linear-to-r from-[#f3e7e7] to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="w-8 h-8 text-green-600 text-4xl">✔</span>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('thanks.heading')}</h2>
                {/* Message */}
                <p className="text-gray-600 mb-6">
                    {isEmployed ? t('thanks.successMessage') : t('thanks.ineligibleMessage')}
                </p>

                {/* Countdown and Back Button - Client Component */}
                <SuccessContent />
            </div>
        </div>
    );
}
