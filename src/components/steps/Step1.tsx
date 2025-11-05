import ErrorText from '../ErrorText';
import { StepProps } from '@/types/form';
import { useTranslations } from 'next-intl';

export default function Step1({ values, errors, touched, setFieldValue, setFieldTouched, onNext }: StepProps) {
    const t = useTranslations();

    return (
        <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
            <div className="text-center font-bold mb-6">
                {t('step1.welcome')}
            </div>

            {/* Radio Button Question */}
            <div className="mb-6">
                <p className="text-gray-900 font-medium mb-1">
                    {t('step1.employmentQuestion')}
                </p>
                <div className="flex gap-8">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="employment"
                            value="yes"
                            checked={values.employment === 'yes'}
                            onChange={() => setFieldValue('employment', 'yes')}
                            onBlur={() => setFieldTouched('employment', true)}
                            className="w-5 h-5 text-red-600"
                        />
                        <span className="ms-3 text-gray-700">{t('step1.yes')}</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="employment"
                            value="no"
                            checked={values.employment === 'no'}
                            onChange={() => setFieldValue('employment', 'no')}
                            onBlur={() => setFieldTouched('employment', true)}
                            className="w-5 h-5 text-gray-400"
                        />
                        <span className="ms-3 text-gray-700">{t('step1.no')}</span>
                    </label>
                </div>
                <ErrorText error={errors.employment} touched={touched.employment} />
            </div>


            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {t('step1.whatYouWillComplete')}
                </h2>
                <ul className="list-decimal list-inside space-y-2 text-gray-700">
                    <li className="flex items-start">
                        <span>1. {t('step1.item1')}</span>
                    </li>
                    <li className="flex items-start">
                        <span>2. {t('step1.item2')}</span>
                    </li>
                    <li className="flex items-start">
                        <span>3. {t('step1.item3')}</span>
                    </li>
                </ul>
            </div>

            <div className="mb-6">
                {t('step1.saveNote')}
            </div>

            <div className="flex justify-between pt-2">
                <button
                    type="button"
                    disabled
                    className="px-6 py-2 text-gray-400 font-medium rounded-lg border border-gray-300 cursor-not-allowed"
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
    );
}
