export default function Step1() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
            <div className="text-center font-bold mb-6">
                Welcome, and thank you for your interest in becoming a
                Community Evaluator for the Zero Bureaucracy Program.We
                appreciate your willingness to contribute to improving
                government services.
            </div>

            {/* Radio Button Question */}
            <div className="mb-6">
                <p className="text-gray-900 font-medium mb-1">
                    Before we begin, please confirm whether you are currently
                    employed by any federal entity in the UAE.
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


            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    What you will complete:
                </h2>
                <ul className="list-decimal list-inside space-y-2 text-gray-700">
                    <li className="flex items-start">
                        <span>1. About you (which will include job description and details)</span>
                    </li>
                    <li className="flex items-start">
                        <span>2. Purpose of Participation</span>
                    </li>
                    <li className="flex items-start">
                        <span>3. Evaluation experience</span>
                    </li>
                </ul>
            </div>

            <div className="mb-6">
                You can save your progress at any time. Your information is secure and used only to evaluate your nomination.
            </div>


            {/* Checkbox */}
            {/* <div className="mb-6 flex items-center">
                <div className="flex items-center h-6">
                    <input
                        type="checkbox"
                        id="confirm"
                        className="w-4 h-4 bg-red-600"
                    />
                </div>
                <label htmlFor="confirm" className="ml-3 text-gray-700 font-bold text-xs">
                    I confirm the accuracy of the information provided.
                </label>
            </div> */}

            {/* Buttons */}
            <div className="flex justify-between pt-2">
                <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300">
                    Previous
                </button>
                <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                    Next
                </button>
            </div>
        </div>
    );
}
