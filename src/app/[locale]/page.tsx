import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
// import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function HomePage() {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto overflow-hidden">
                {/* Header with Logo */}
                <div className="bg-red-600 px-8 py-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <Image
                            src="/ZGBLogo.png"
                            alt="Zero Bureaucracy Program Logo"
                            width={150}
                            height={50}
                            priority
                            className="h-auto"
                        />
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">Community Evaluator Nomination</h1>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8">
                    {/* Title and Language */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-500 mb-4">
                            Last saved: 10/16/25, 1:22 PM
                        </div>

                        <button className="text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-1 font-bold rounded-lg">
                            العربية
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700 font-bold">Form progress:</span>
                            <span className="text-md font-bold text-red-600">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-6"></div>

                    {/* Form Content */}
                    <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility</h3>

                        <p className="text-gray-600 mb-8">
                            Please confirm that you meet the eligibility requirements before proceeding.
                        </p>

                        {/* Radio Button Question */}
                        <div className="mb-8">
                            <p className="text-gray-900 font-medium mb-4">
                                Are you currently employed in any federal government entity or affiliated organization?
                            </p>
                            <div className="flex gap-8">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="employment"
                                        value="yes"
                                        className="w-5 h-5 text-red-600"
                                    />
                                    <span className="ml-3 text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="employment"
                                        value="no"
                                        className="w-5 h-5 text-gray-400"
                                    />
                                    <span className="ml-3 text-gray-700">No</span>
                                </label>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="mb-8 flex items-start">
                            <div className="flex items-center h-6">
                                <input
                                    type="checkbox"
                                    id="confirm"
                                    className="w-4 h-4 bg-red-600"
                                />
                            </div>
                            <label htmlFor="confirm" className="ml-3 text-gray-700">
                                I confirm the accuracy of the information provided.
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between pt-6 border-t border-gray-200">
                            <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300">
                                Previous
                            </button>
                            <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}