'use client';

import { useRouter, usePathname } from 'next/navigation';
import { StepProps } from '@/types/form';

export default function Step6({ values, onPrevious, onStepChange }: StepProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleSubmit = () => {
        const thanksPath = pathname.replace(/\/[^/]*$/, '/thanks');
        const urlWithParams = `${thanksPath}?employment=${values.employment}`;
        router.push(urlWithParams);
    };

    const getExperienceLabel = (value: string) => {
        const mapping: Record<string, string> = {
            'community': 'Community engagement',
            'innovation': 'Innovation experience',
            'policy': 'Policy knowledge',
            'leadership': 'Leadership',
            'other': 'Other',
            'professional': 'Professional awards',
            'jury': 'Jury panels',
            'assessment': 'Assessment committees',
            'evaluation': 'Evaluation activities',
        };
        return mapping[value] || value;
    };

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
                <p className="text-gray-600 mb-8">Review your responses below. You can edit any section before submitting.</p>

                {/* Your profile Section (Step 2) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">About You</h3>

                            {/* Personal Information */}
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Personal Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Age Range</p>
                                    <p className="text-gray-900 font-medium">{values.ageRange || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Emirate of residence</p>
                                    <p className="text-gray-900 font-medium">{values.emirate || 'Not specified'}</p>
                                </div>
                            </div>

                            {/* Employment Information */}
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Employment Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Current employment status</p>
                                    <p className="text-gray-900 font-medium">{values.employmentStatus || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Sector of employment</p>
                                    <p className="text-gray-900 font-medium">{values.sector || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Field of work / specialization</p>
                                    <p className="text-gray-900 font-medium">{values.fieldOfWork || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Name of workplace</p>
                                    <p className="text-gray-900 font-medium">{values.workplace || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">Years of experience</p>
                                    <p className="text-gray-900 font-medium">{values.yearsExperience || 'Not specified'}</p>
                                </div>
                            </div>

                            {/* CV Upload */}
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Additional Requirements</h4>
                            <div>
                                <p className="text-xs text-gray-600 mb-2">Upload CV</p>
                                <p className="text-gray-900 font-medium">
                                    {values.cvFile ? (
                                        typeof values.cvFile === 'string'
                                            ? values.cvFile
                                            : (values.cvFile as { name?: string })?.name || 'File uploaded'
                                    ) : 'Not specified'}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(2)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ml-4"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* Purpose of Participation Section (Step 3) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Purpose of Participation</h3>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-600 mb-2">Why would you like to be a community evaluator in the Zero Bureaucracy Program?</p>
                                <p className="text-gray-900">{values.purposeText || 'Not specified'}</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-600 mb-2">Relevant experience or perspective you bring (Select all that apply)</p>
                                <p className="text-gray-900">
                                    {values.selectedExperiences && values.selectedExperiences.length > 0
                                        ? values.selectedExperiences.map(exp => getExperienceLabel(exp)).join(', ')
                                        : 'Not specified'}
                                </p>
                            </div>

                            {values.selectedExperiences?.includes('other') && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 mb-2">Please specify (Other experience)</p>
                                    <p className="text-gray-900">{values.evaluationExperience || 'Not specified'}</p>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(3)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ml-4"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* Jury & Assessment Section (Step 4) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Evaluation Experience</h3>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-600 mb-2">Have you ever participated in jury panels, assessment committees, or evaluation activities?</p>
                                <p className="text-gray-900 font-medium">{values.hasExperience || 'Not specified'}</p>
                            </div>

                            {values.hasExperience === 'Yes' && (
                                <>
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-gray-600 mb-2">Type of experience</p>
                                        <p className="text-gray-900 font-medium">{getExperienceLabel(values.experienceType) || 'Not specified'}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-2">Describe your experience</p>
                                        <p className="text-gray-900">{values.experienceDescription || 'Not specified'}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(4)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ml-4"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* Additional Requirements Section (Step 5) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Agreement & Consent</h3>

                            <div>
                                <p className="text-xs font-semibold text-gray-600 mb-2">I confirm that I meet the eligibility criteria and agree to participate as a community evaluator if selected.</p>
                                <p className="text-gray-900 font-medium">{values.isAgreed ? 'Yes' : 'No'}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(5)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ml-4"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between border-gray-200">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
