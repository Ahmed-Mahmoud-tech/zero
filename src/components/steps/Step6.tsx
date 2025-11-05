'use client';

import { useRouter, usePathname } from 'next/navigation';
import { StepProps } from '@/types/form';
import { useTranslations } from 'next-intl';

export default function Step6({ values, onPrevious, onStepChange }: StepProps) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();

    const handleSubmit = () => {
        const thanksPath = pathname.replace(/\/[^/]*$/, '/thanks');
        const urlWithParams = `${thanksPath}`;
        router.push(urlWithParams);
    };

    const getExperienceLabel = (value: string) => {
        const mapping: Record<string, string> = {
            'community': t('step3.community'),
            'innovation': t('step3.innovation'),
            'policy': t('step3.policy'),
            'leadership': t('step3.leadership'),
            'other': t('step3.otherExperience'),
            'professional': t('step4.professional'),
            'jury': t('step4.jury'),
            'assessment': t('step4.assessment'),
            'evaluation': t('step4.evaluation'),
        };
        return mapping[value] || value;
    };

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step6.title')}</h2>
                <p className="text-gray-600 mb-8">{t('step6.reviewInstruction')}</p>

                {/* Your profile Section (Step 2) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('step6.yourProfile')}</h3>

                            {/* Personal Information */}
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('step6.personalInformation')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.ageRange')}</p>
                                    <p className="text-gray-900 font-medium">{values.ageRange || t('step6.notSpecified')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.emirateOfResidence')}</p>
                                    <p className="text-gray-900 font-medium">{values.emirate || t('step6.notSpecified')}</p>
                                </div>
                            </div>

                            {/* Employment Information */}
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('step6.employmentInformation')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.currentEmploymentStatus')}</p>
                                    <p className="text-gray-900 font-medium">{values.employmentStatus || t('step6.notSpecified')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.sectorOfEmployment')}</p>
                                    <p className="text-gray-900 font-medium">{values.sector || t('step6.notSpecified')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.fieldOfWorkSpecialization')}</p>
                                    <p className="text-gray-900 font-medium">{values.fieldOfWork || t('step6.notSpecified')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.nameOfWorkplace')}</p>
                                    <p className="text-gray-900 font-medium">{values.workplace || t('step6.notSpecified')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-2">{t('step6.yearsOfExperience')}</p>
                                    <p className="text-gray-900 font-medium">{values.yearsExperience || t('step6.notSpecified')}</p>
                                </div>
                            </div>

                            {/* CV Upload */}
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('step6.additionalRequirements')}</h4>
                            <div>
                                <p className="text-xs text-gray-600 mb-2">{t('step6.uploadCV')}</p>
                                <p className="text-gray-900 font-medium">
                                    {values.cvFile ? (
                                        typeof values.cvFile === 'string'
                                            ? values.cvFile
                                            : (values.cvFile as { name?: string })?.name || t('step6.fileUploaded')
                                    ) : t('step6.notSpecified')}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(2)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ms-4"
                        >
                            {t('step6.edit')}
                        </button>
                    </div>
                </div>

                {/* Purpose of Participation Section (Step 3) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('step6.purposeOfParticipation')}</h3>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.whyParticipate')}</p>
                                <p className="text-gray-900">{values.purposeText || t('step6.notSpecified')}</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.relevantExperienceQuestion')}</p>
                                <p className="text-gray-900">
                                    {values.selectedExperiences && values.selectedExperiences.length > 0
                                        ? values.selectedExperiences.map(exp => getExperienceLabel(exp)).join(', ')
                                        : t('step6.notSpecified')}
                                </p>
                            </div>

                            {values.selectedExperiences?.includes('other') && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.otherExperience')}</p>
                                    <p className="text-gray-900">{values.evaluationExperience || t('step6.notSpecified')}</p>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(3)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ms-4"
                        >
                            {t('step6.edit')}
                        </button>
                    </div>
                </div>

                {/* Jury & Assessment Section (Step 4) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('step6.juryAndAssessment')}</h3>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.haveParticipatedQuestion')}</p>
                                <p className="text-gray-900 font-medium">{(values.hasExperience === 'Yes' ? t('step1.yes') : t('step1.no'))}</p>
                            </div>

                            {values.hasExperience === 'Yes' && (
                                <>
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.typeOfExperience')}</p>
                                        <p className="text-gray-900 font-medium">{getExperienceLabel(values.experienceType) || t('step6.notSpecified')}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.describeExperience')}</p>
                                        <p className="text-gray-900">{values.experienceDescription || t('step6.notSpecified')}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(4)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ms-4"
                        >
                            {t('step6.edit')}
                        </button>
                    </div>
                </div>

                {/* Additional Requirements Section (Step 5) */}
                <div className="mb-8">
                    <div className="border border-gray-300 rounded-lg p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('step6.agreementAndConsent')}</h3>

                            <div>
                                <p className="text-xs font-semibold text-gray-600 mb-2">{t('step6.confirmEligibility')}</p>
                                <p className="text-gray-900 font-medium">{values.isAgreed ? t('step1.yes') : t('step1.no')}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onStepChange?.(5)}
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-sm whitespace-nowrap ms-4"
                        >
                            {t('step6.edit')}
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
                        {t('step1.previous')}
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                    >
                        {t('step6.submit')}
                    </button>
                </div>
            </div>
        </>
    );
}
