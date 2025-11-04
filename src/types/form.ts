export interface FormValues {
  // Step 1
  employment: string;

  // Step 2
  ageRange: string;
  emirate: string;
  employmentStatus: string;
  sector: string;
  fieldOfWork: string;
  workplace: string;
  yearsExperience: string;
  cvFile: File | null;

  // Step 3
  purposeText: string;
  selectedExperiences: string[];
  otherSpecify: string;
  evaluationExperience: string;

  // Step 4
  hasExperience: string;
  experienceType: string;
  experienceDescription: string;

  // Step 5
  isPrivacyExpanded: boolean;
  isAgreed: boolean;
}

export interface StepProps {
  values: FormValues;
  errors: Record<string, string | string[]>;
  touched: Record<string, boolean>;
  setFieldValue: (field: string, value: unknown) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}
