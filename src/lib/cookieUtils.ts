import Cookies from "js-cookie";
import { FormValues } from "@/types/form";

const FORM_DATA_COOKIE = "zeroform_data";
const CURRENT_STEP_COOKIE = "zeroform_step";
const FILE_NAME_COOKIE = "zeroform_file_name";
const LAST_SAVED_COOKIE = "zeroform_last_saved";
const COOKIE_EXPIRY_DAYS = 7;

export const saveFormDataToCookie = (
  formData: Partial<FormValues>,
  currentStep: number
) => {
  try {
    // Update last saved timestamp
    const now = new Date().toISOString();
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_SAVED_COOKIE, now);
      console.log("Dispatching formDataSaved event with timestamp:", now);
      // Dispatch custom event to notify listeners in same tab
      window.dispatchEvent(
        new CustomEvent("formDataSaved", { detail: { timestamp: now } })
      );
    }

    // Save File metadata separately (filename only, not the actual file)
    const dataToSave = {
      ...formData,
      cvFile: null,
    };

    if (formData.cvFile instanceof File) {
      Cookies.set(FILE_NAME_COOKIE, formData.cvFile.name, {
        expires: COOKIE_EXPIRY_DAYS,
        sameSite: "Strict",
      });
    }

    Cookies.set(FORM_DATA_COOKIE, JSON.stringify(dataToSave), {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: "Strict",
    });

    Cookies.set(CURRENT_STEP_COOKIE, currentStep.toString(), {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: "Strict",
    });
  } catch (error) {
    console.error("Error saving form data to cookie:", error);
  }
};

export const getFormDataFromCookie = (): {
  formData: Partial<FormValues> | null;
  currentStep: number;
} => {
  try {
    const formDataCookie = Cookies.get(FORM_DATA_COOKIE);
    const stepCookie = Cookies.get(CURRENT_STEP_COOKIE);
    const fileNameCookie = Cookies.get(FILE_NAME_COOKIE);

    const formData = formDataCookie ? JSON.parse(formDataCookie) : null;
    const currentStep = stepCookie ? parseInt(stepCookie, 10) : 1;

    // Restore filename as a marker that file was uploaded
    if (formData && fileNameCookie) {
      // Create a marker object with the filename to indicate a file was uploaded
      (formData as Record<string, unknown>).cvFile = {
        name: fileNameCookie,
        _isPlaceholder: true,
      };
    }

    return { formData, currentStep };
  } catch (error) {
    console.error("Error retrieving form data from cookie:", error);
    return { formData: null, currentStep: 1 };
  }
};

export const clearFormCookies = () => {
  try {
    Cookies.remove(FORM_DATA_COOKIE);
    Cookies.remove(CURRENT_STEP_COOKIE);
    Cookies.remove(FILE_NAME_COOKIE);
  } catch (error) {
    console.error("Error clearing form cookies:", error);
  }
};
