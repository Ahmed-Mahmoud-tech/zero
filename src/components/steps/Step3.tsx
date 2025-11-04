'use client';

import { useState } from 'react';

export default function Step3() {
    const [formData, setFormData] = useState({
        purposeText: '',
        experience: '',
        selectedExperiences: [] as string[],
        otherSpecify: '',
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            selectedExperiences: prev.selectedExperiences.includes(value)
                ? prev.selectedExperiences.filter(item => item !== value)
                : [...prev.selectedExperiences, value],
        }));
    };

    const experiences = [
        { id: 'community', label: 'Community engagement' },
        { id: 'innovation', label: 'Innovation experience' },
        { id: 'policy', label: 'Policy knowledge' },
        { id: 'leadership', label: 'Leadership' },
        { id: 'other', label: 'Other' },
    ];

    return (
        <>


            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Purpose of Participation</h2>

                {/* Question 1: Why participate */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                        Why would you like to be a community evaluator in the Zero Bureaucracy Program?
                    </label>
                    <textarea
                        name="purposeText"
                        value={formData.purposeText}
                        onChange={handleTextChange}
                        placeholder="Enter your response..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                        rows={4}
                    />
                    <p className="text-xs text-gray-500">0/500 words</p>
                </div>

                {/* Question 2: Relevant experience */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                        Relevant experience or perspective you bring
                    </label>
                    <p className="text-xs text-gray-600 mb-3">Select all that apply</p>

                    <div className="flex flex-wrap gap-3">
                        {experiences.map((exp) => (
                            <label key={exp.id} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.selectedExperiences.includes(exp.id)}
                                    onChange={() => handleCheckboxChange(exp.id)}
                                    className=""
                                />
                                <span className="text-gray-700 text-sm ms-2">{exp.label}</span>
                            </label>
                        ))}
                    </div>

                    {formData.selectedExperiences.includes('other') && (
                        <div className="mt-4">
                            <input
                                type="text"
                                value={formData.otherSpecify}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    otherSpecify: e.target.value,
                                }))}
                                placeholder="Please specify"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-sm"
                            />
                        </div>
                    )}
                </div>

                {/* Question 3: Evaluation experience */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                        Please specify
                    </label>
                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            experience: e.target.value,
                        }))}
                        placeholder="Describe your evaluation experience..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between border-gray-200">
                    <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300">
                        Previous
                    </button>
                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
