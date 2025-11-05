'use client';

import { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import { saveFormDataToCookie, getFormDataFromCookie } from '@/lib/cookieUtils';

const validationSchema = Yup.object({
    // Step 1
    employment: Yup.string().required('This field is required'),

    // Step 2
    ageRange: Yup.string().required('This field is required'),
    emirate: Yup.string().required('This field is required'),
    employmentStatus: Yup.string().required('This field is required'),
    sector: Yup.string().required('This field is required'),
    fieldOfWork: Yup.string().required('This field is required'),
    workplace: Yup.string().required('This field is required'),
    yearsExperience: Yup.number()
        .required('This field is required')
        .positive('Must be a positive number')
        .integer('Must be a whole number'),
    cvFile: Yup.mixed()
        .test('file-required', 'This field is required', (value) => {
            return value !== null && value !== undefined;
        }),

    // Step 3
    purposeText: Yup.string().required('This field is required'),
    selectedExperiences: Yup.array()
        .min(1, 'This field is required')
        .required('This field is required'),
    otherSpecify: Yup.string().when('selectedExperiences', {
        is: (experiences: string[]) => experiences?.includes('other'),
        then: (schema) => schema.required('This field is required'),
        otherwise: (schema) => schema,
    }),
    evaluationExperience: Yup.string().when('selectedExperiences', {
        is: (experiences: string[]) => experiences?.includes('other'),
        then: (schema) => schema.required('This field is required'),
        otherwise: (schema) => schema,
    }),

    // Step 4
    hasExperience: Yup.string().required('This field is required'),
    experienceType: Yup.string().when('hasExperience', {
        is: 'Yes',
        then: (schema) => schema.required('This field is required'),
        otherwise: (schema) => schema,
    }),
    experienceDescription: Yup.string().when('hasExperience', {
        is: 'Yes',
        then: (schema) => schema.required('This field is required'),
        otherwise: (schema) => schema,
    }),

    // Step 5
    isPrivacyExpanded: Yup.boolean(),
    isAgreed: Yup.boolean()
        .oneOf([true], 'This field is required')
        .required('This field is required'),
});

const initialValues = {
    // Step 1
    employment: '',

    // Step 2
    ageRange: '',
    emirate: '',
    employmentStatus: '',
    sector: '',
    fieldOfWork: '',
    workplace: '',
    yearsExperience: '',
    cvFile: null,

    // Step 3
    purposeText: '',
    selectedExperiences: [] as string[],
    otherSpecify: '',
    evaluationExperience: '',

    // Step 4
    hasExperience: '',
    experienceType: '',
    experienceDescription: '',

    // Step 5
    isPrivacyExpanded: false,
    isAgreed: false,
};

export default function MultiStepForm() {
    const initializeRef = useRef(false);
    const [mounted, setMounted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const formValuesRef = useRef<typeof initialValues>(initialValues);
    const prevValuesRef = useRef<string>('');
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const triggerSaveRef = useRef<(() => void) | null>(null);

    // Initialize on client side only (run once)
    useEffect(() => {
        if (!initializeRef.current) {
            initializeRef.current = true;
            const { formData, currentStep: savedStep } = getFormDataFromCookie();
            const timeoutId = setTimeout(() => {
                if (formData) {
                    setFormInitialValues((prev) => ({
                        ...prev,
                        ...formData,
                    } as typeof initialValues));
                    setCurrentStep(savedStep);
                }
                setMounted(true);
            }, 0);

            return () => clearTimeout(timeoutId);
        }
    }, []);

    // Set up callback to trigger save
    useEffect(() => {
        triggerSaveRef.current = () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            saveTimeoutRef.current = setTimeout(() => {
                if (typeof window !== 'undefined' && formValuesRef.current) {
                    saveFormDataToCookie(formValuesRef.current, currentStep);
                }
            }, 500);
        };
    }, [currentStep]);

    // Don't render form until mounted on client to prevent hydration errors
    if (!mounted) {
        return null;
    }

    const totalSteps = 5;

    // Get fields for current step
    const getStepFields = (step: number): (keyof typeof initialValues)[] => {
        switch (step) {
            case 1:
                return ['employment'];
            case 2:
                return ['ageRange', 'emirate', 'employmentStatus', 'sector', 'fieldOfWork', 'workplace', 'yearsExperience', 'cvFile'];
            case 3:
                return ['purposeText', 'selectedExperiences', 'evaluationExperience'];
            case 4:
                return ['hasExperience', 'experienceType', 'experienceDescription'];
            case 5:
                return ['isAgreed'];
            default:
                return [];
        }
    };

    const handleNext = async (validateForm: () => Promise<Record<string, string | string[]>>, setTouched: (touched: Record<string, boolean>) => void) => {
        const stepFields = getStepFields(currentStep);

        // Mark all fields in current step as touched
        const touchedFields: Record<string, boolean> = {};
        stepFields.forEach(field => {
            touchedFields[field] = true;
        });
        setTouched(touchedFields);

        // Validate the form
        const errors = await validateForm();

        // Check if current step has errors
        const stepHasErrors = stepFields.some(field => errors[field]);

        if (!stepHasErrors && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Calculate progress percentage (0% for step 1, then 25% increments)
    const getProgressPercentage = () => {
        if (currentStep === 1) return 0;
        return ((currentStep - 1) / (totalSteps - 1)) * 100;
    };

    const handleSubmit = async (values: typeof initialValues) => {
        console.log('Form submitted:', values);

        // Create FormData to send to backend
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'selectedExperiences') {
                formData.append(key, JSON.stringify(value));
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        try {
            // Send to your backend endpoint
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    return (
        <Formik
            initialValues={formInitialValues as typeof initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {({ values, errors, touched, setFieldValue, setFieldTouched, validateForm, setTouched }) => {
                // Update ref with current values for use in effects/callbacks
                formValuesRef.current = values;

                // Check if values changed and trigger save (using callback to avoid setState)
                const currentValuesStr = JSON.stringify(values);
                if (mounted && prevValuesRef.current !== currentValuesStr) {
                    prevValuesRef.current = currentValuesStr;
                    // Call the save trigger function without updating state
                    triggerSaveRef.current?.();
                }

                return (
                    <Form>
                        {/* Progress indicator - hidden on step 1 */}
                        {currentStep > 1 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-700 font-bold">Form progress:</span>
                                    <span className="text-md font-bold text-red-600">
                                        {Math.round(getProgressPercentage())}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <Step1
                                values={values}
                                errors={errors as Record<string, string | string[]>}
                                touched={touched}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                onNext={() => handleNext(validateForm, setTouched)}
                                onPrevious={handlePrevious}
                            />
                        )}

                        {/* Step 2 */}
                        {currentStep === 2 && (
                            <Step2
                                values={values}
                                errors={errors as Record<string, string | string[]>}
                                touched={touched}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                onNext={() => handleNext(validateForm, setTouched)}
                                onPrevious={handlePrevious}
                            />
                        )}

                        {/* Step 3 */}
                        {currentStep === 3 && (
                            <Step3
                                values={values}
                                errors={errors as Record<string, string | string[]>}
                                touched={touched}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                onNext={() => handleNext(validateForm, setTouched)}
                                onPrevious={handlePrevious}
                            />
                        )}

                        {/* Step 4 */}
                        {currentStep === 4 && (
                            <Step4
                                values={values}
                                errors={errors as Record<string, string | string[]>}
                                touched={touched}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                onNext={() => handleNext(validateForm, setTouched)}
                                onPrevious={handlePrevious}
                            />
                        )}

                        {/* Step 5 */}
                        {currentStep === 5 && (
                            <Step5
                                values={values}
                                errors={errors as Record<string, string | string[]>}
                                touched={touched}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                onPrevious={handlePrevious}
                            />
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
}
