import Image from "next/image";
import MultiStepForm from "@/components/MultiStepForm";
import LastSavedTime from "@/components/LastSavedTime";

export default function HomePage() {
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

                 input[type="checkbox"] {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgb(156, 163, 175);
                    border-radius: 3px;
                    cursor: pointer;
                    outline: none;
                    background-color: white;
                }
                
                input[type="checkbox"]:checked {
                    background-color: rgb(220, 38, 38);
                    border-color: rgb(220, 38, 38);
                    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 100%;
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
