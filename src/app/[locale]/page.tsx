import Image from "next/image";
import MultiStepForm from "@/components/MultiStepForm";
import LastSavedTime from "@/components/LastSavedTime";

export default function HomePage() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 p-8 text-sm">
                <div className="max-w-2xl mx-auto">
                    {/* Header with Logo */}
                    <div className="bg-red-600 px-8 py-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <Image
                                src="/ZGBLogo.png"
                                alt="Zero Bureaucracy Program Logo me-2 inline-block"
                                width={150}
                                height={50}
                                priority
                                className="h-auto max-w-[45%]"
                            />
                            <div className="text-white">
                                <h1 className="xs:text-md sm:text-xl font-bold md:text-2xl ms-4">
                                    Community Evaluator Nomination
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="py-8">
                        {/* Title and Language */}
                        <div className="flex justify-between items-center mb-2">
                            <LastSavedTime />

                            <button className="text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-1 font-bold rounded-lg">
                                العربية
                            </button>
                        </div>

                        {/* Multi-Step Form */}
                        <MultiStepForm />
                    </div>
                </div>
            </div>
        </>
    );
}
