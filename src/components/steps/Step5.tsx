'use client';

import ErrorText from '../ErrorText';
import { StepProps } from '@/types/form';
import { useLocale, useTranslations } from 'next-intl';

export default function Step5({ values, errors, touched, setFieldValue, setFieldTouched, onPrevious }: StepProps) {
    const t = useTranslations();
    const locale = useLocale();
    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step5.title')}</h2>

                {/* Agreement & Consent Section */}
                <div className="bg-red-50 rounded-lg px-4 py-3">
                    {/* Privacy Statement */}
                    <div className="">
                        <button
                            type="button"
                            onClick={() => setFieldValue('isPrivacyExpanded', !values.isPrivacyExpanded)}
                            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                        >
                            <span className="me-2">{values.isPrivacyExpanded ? '▼' : locale == "ar" ? '◀' : '▶'}</span>
                            {t('step5.privacyStatement')}
                        </button>

                        {values.isPrivacyExpanded && (
                            <div className="mt-3 p-4 bg-white rounded border border-gray-200">
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    {t('step5.privacyText1')}
                                </p>
                                <p className="text-xs text-gray-700 leading-relaxed mt-3">
                                    {t('step5.privacyText2')}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Checkbox Agreement */}
                    {values.isPrivacyExpanded && (
                        <div className="flex items-start mt-4">
                            <input
                                type="checkbox"
                                id="agreement"
                                checked={values.isAgreed}
                                onChange={(e) => setFieldValue('isAgreed', e.target.checked)}
                                onBlur={() => setFieldTouched('isAgreed', true)}
                                className="mt-1 min-w-4"
                            />
                            <label htmlFor="agreement" className="ms-3 text-xs text-gray-700">
                                {t('step5.confirmAgreement')}
                            </label>
                        </div>
                    )}
                    <ErrorText error={errors.isAgreed} touched={touched.isAgreed} />
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-6 border-gray-200">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300"
                    >
                        {t('step1.previous')}
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={!values.isAgreed}
                    >
                        {t('step5.preview')}
                    </button>
                </div>
            </div>
        </>
    );
}
