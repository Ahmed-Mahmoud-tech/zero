import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
// import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function HomePage() {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <>
            <style>{`
                input[type="radio"]:checked,
                input[type="checkbox"]:checked {
                    accent-color: rgb(220, 38, 38);
                }
            
                input[type="radio"] {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 1px solid rgb(156, 163, 175);
                    border-radius: 50%;
                    cursor: pointer;
                    outline: none;
                    background-color: white;
                }
                
                input[type="radio"]:checked {
                    background: radial-gradient(circle, rgb(220, 38, 38) 40%, white 45%);
                    border-color: rgb(220, 38, 38);
                }
            `}</style>
            <div className="min-h-screen bg-gray-50 p-8 text-sm">
                <div className="max-w-2xl mx-auto">
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
                                <h1 className="text-2xl font-bold">
                                    Community Evaluator Nomination
                                </h1>
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
                                <span className="text-sm text-gray-700 font-bold">
                                    Form progress:
                                </span>
                                <span className="text-md font-bold text-red-600">0%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-red-600 h-2 rounded-full"
                                    style={{ width: "0%" }}
                                ></div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-6"></div>

                        {/* Steps */}
                        <Step3 />
                    </div>
                </div>
            </div>
        </>
    );
}
