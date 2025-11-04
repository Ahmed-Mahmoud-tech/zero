'use client';

import { StepProps } from '@/types/form';
import ErrorText from '../ErrorText';

export default function Step3({ values, errors, touched, setFieldValue, setFieldTouched, onNext, onPrevious }: StepProps) {

    const handleCheckboxChange = (value: string) => {
        const currentExperiences = values.selectedExperiences || [];
        const newExperiences = currentExperiences.includes(value)
            ? currentExperiences.filter(item => item !== value)
            : [...currentExperiences, value];
        setFieldValue('selectedExperiences', newExperiences);
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
                        value={values.purposeText}
                        onChange={(e) => setFieldValue('purposeText', e.target.value)}
                        onBlur={() => setFieldTouched('purposeText', true)}
                        placeholder="Enter your response..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                        rows={4}
                    />
                    <ErrorText error={errors.purposeText} touched={touched.purposeText} />
                    <p className="text-xs text-gray-500 mt-1">0/500 words</p>
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
                                    checked={values.selectedExperiences?.includes(exp.id) || false}
                                    onChange={() => handleCheckboxChange(exp.id)}
                                    className=""
                                />
                                <span className="text-gray-700 text-sm ms-2">{exp.label}</span>
                            </label>
                        ))}
                    </div>
                    <ErrorText error={errors.selectedExperiences} touched={touched.selectedExperiences} />

                    {values.selectedExperiences?.includes('other') && (
                        <div className="mt-4">
                            <input
                                type="text"
                                value={values.otherSpecify}
                                onChange={(e) => setFieldValue('otherSpecify', e.target.value)}
                                onBlur={() => setFieldTouched('otherSpecify', true)}
                                placeholder="Please specify"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-sm"
                            />
                            <ErrorText error={errors.otherSpecify} touched={touched.otherSpecify} />
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
                        name="evaluationExperience"
                        value={values.evaluationExperience}
                        onChange={(e) => setFieldValue('evaluationExperience', e.target.value)}
                        onBlur={() => setFieldTouched('evaluationExperience', true)}
                        placeholder="Describe your evaluation experience..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                    <ErrorText error={errors.evaluationExperience} touched={touched.evaluationExperience} />
                </div>

                {/* Buttons */}
                <div className="flex justify-between border-gray-200">
                    <button type="button" onClick={onPrevious} className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300">
                        Previous
                    </button>
                    <button type="button" onClick={onNext} className="px-6 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
