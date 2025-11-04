'use client';

import ErrorText from '../ErrorText';
import { StepProps } from '@/types/form';

export default function Step5({ values, errors, touched, setFieldValue, setFieldTouched, onPrevious }: StepProps) {

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Agreement and consent</h2>

                {/* Agreement & Consent Section */}
                <div className="bg-red-50 rounded-lg px-4 py-3">
                    {/* Privacy Statement */}
                    <div className="">
                        <button
                            type="button"
                            onClick={() => setFieldValue('isPrivacyExpanded', !values.isPrivacyExpanded)}
                            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                        >
                            <span className="mr-2">{values.isPrivacyExpanded ? '▼' : '▶'}</span>
                            Privacy statement
                        </button>

                        {values.isPrivacyExpanded && (
                            <div className="mt-3 ml-6 p-4 bg-white rounded border border-gray-200">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Your privacy is important to us. This privacy statement explains how we collect, use, and protect your personal information when you participate as a community evaluator in the Zero Bureaucracy Program.
                                </p>
                                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                                    By participating, you consent to the collection and processing of your personal data as described in this statement. Your information will be used solely for evaluation purposes and will be handled in accordance with UAE data protection regulations.
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
                                className="mt-1"
                            />
                            <label htmlFor="agreement" className="ml-3 text-sm text-gray-700">
                                I confirm that I meet the eligibility criteria and agree to participate as a community evaluator if selected.
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
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={!values.isAgreed}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
