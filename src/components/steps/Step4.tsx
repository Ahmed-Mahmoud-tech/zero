'use client';

import ErrorText from '../ErrorText';
import { StepProps } from '@/types/form';
import { useTranslations } from 'next-intl';
import { experienceTypeOptions } from '@/lib/options';

export default function Step4({ values, errors, touched, setFieldValue, setFieldTouched, onNext, onPrevious }: StepProps) {
    const t = useTranslations();

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step4.title')}</h2>

                {/* Question 1: Have you participated */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-900 mb-1">
                        {t('step4.haveParticipated')}
                    </label>
                    <div className="flex gap-10">
                        {['Yes', 'No'].map((option) => (
                            <label key={option} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="hasExperience"
                                    value={option}
                                    checked={values.hasExperience === option}
                                    onChange={() => setFieldValue('hasExperience', option)}
                                    onBlur={() => setFieldTouched('hasExperience', true)}
                                    className=""
                                />
                                <span className="ms-3 text-gray-700 text-sm">{t(`common.${option.toLowerCase()}`)}</span>
                            </label>
                        ))}
                    </div>
                    <ErrorText error={errors.hasExperience} touched={touched.hasExperience} />
                </div>

                <div className={`${values.hasExperience === 'Yes' ? '' : 'hidden'} p-4 pb-1 mb-6 bg-red-50 rounded-lg`}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-900 mb-2">
                            {t('step4.typeOfExperience')}
                        </label>
                        <select
                            value={values.experienceType}
                            onChange={(e) => setFieldValue('experienceType', e.target.value)}
                            onBlur={() => setFieldTouched('experienceType', true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-600"
                        >
                            <option value="">{t('step4.selectOption')}</option>
                            {experienceTypeOptions.map((value) => (
                                <option key={value} value={value}>
                                    {t(`options.experienceType.${value}`)}
                                </option>
                            ))}
                        </select>
                        <ErrorText error={errors.experienceType} touched={touched.experienceType} />
                    </div>

                    {/* Question 3: Describe your experience */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-900 mb-2">
                            {t('step4.describeExperience')}
                        </label>
                        <textarea
                            value={values.experienceDescription}
                            onChange={(e) => setFieldValue('experienceDescription', e.target.value)}
                            onBlur={() => setFieldTouched('experienceDescription', true)}
                            className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-sm"
                            rows={4}
                        />
                        <ErrorText error={errors.experienceDescription} touched={touched.experienceDescription} />
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
                        onClick={onNext}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                    >
                        {t('step1.next')}
                    </button>
                </div>
            </div>
        </>
    );
}
