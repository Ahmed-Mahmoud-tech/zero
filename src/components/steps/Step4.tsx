'use client';

import { useState } from 'react';

export default function Step4() {
    const [formData, setFormData] = useState({
        hasExperience: '',
        experienceType: '',
        experienceDescription: '',
    });

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            hasExperience: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            experienceType: e.target.value,
        }));
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            experienceDescription: e.target.value,
        }));
    };

    return (
        <>

            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Experience</h2>

                {/* Question 1: Have you participated */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-900 mb-1">
                        Have you ever participated in jury panels, assessment committees, or evaluation activities?
                    </label>
                    <div className="flex gap-10">
                        {['Yes', 'No'].map((option) => (
                            <label key={option} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="hasExperience"
                                    value={option}
                                    checked={formData.hasExperience === option}
                                    onChange={() => handleRadioChange(option)}
                                    className=""
                                />
                                <span className="ml-3 text-gray-700 text-sm">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className={`${formData.hasExperience === 'Yes' ? '' : 'hidden'} p-4 pb-1 mb-6 bg-red-50 rounded-lg`}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-900 mb-2">
                            Type of experience
                        </label>
                        <select
                            value={formData.experienceType}
                            onChange={handleSelectChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-600"
                        >
                            <option value="">Professional awards</option>
                            <option value="professional">Professional awards</option>
                            <option value="jury">Jury panels</option>
                            <option value="assessment">Assessment committees</option>
                            <option value="evaluation">Evaluation activities</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Question 3: Describe your experience */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-900 mb-2">
                            Describe your experience
                        </label>
                        <textarea
                            value={formData.experienceDescription}
                            onChange={handleTextChange}
                            className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-sm"
                            rows={4}
                        />
                    </div>
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
