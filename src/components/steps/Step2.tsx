"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { StepProps } from "@/types/form";
import ErrorText from "../ErrorText";

export default function Step2({ values, errors, touched, setFieldValue, setFieldTouched, onNext, onPrevious }: StepProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const prevCvFileRef = useRef<File | null>(null);

    // Sync uploadedFile with Formik's cvFile value
    useEffect(() => {
        if (values.cvFile instanceof File && values.cvFile !== prevCvFileRef.current) {
            Promise.resolve().then(() => {
                setUploadedFile(values.cvFile);
            });
            prevCvFileRef.current = values.cvFile;
        } else if (values.cvFile && typeof values.cvFile === 'object' && 'name' in values.cvFile) {
            // This is a placeholder object from cookies, create a File-like object for display
            const fileObj = values.cvFile as unknown as Record<string, unknown>;
            const file = new File([], fileObj.name as string, { type: 'application/octet-stream' });
            Promise.resolve().then(() => {
                setUploadedFile(file);
            });
            prevCvFileRef.current = file;
        }
    }, [values.cvFile]);

    const validateFile = (file: File): string | null => {
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];

        if (!allowedTypes.includes(file.type)) {
            return 'Only PDF and DOCX files are allowed';
        }

        if (file.size > maxSize) {
            return `File size exceeds 10MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
        }

        return null;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const error = validateFile(file);
            if (error) {
                toast.error(error);
                event.target.value = '';
                return;
            }
            setUploadedFile(file);
            setFieldValue('cvFile', file);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const error = validateFile(file);
            if (error) {
                toast.error(error);
                return;
            }
            setUploadedFile(file);
            setFieldValue('cvFile', file);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setFieldValue('cvFile', null);
        setFieldTouched('cvFile', false);
    };

    const handleFileSubmit = async () => {
        if (!uploadedFile) {
            toast.warning("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("File uploaded successfully:", data);
                // Save file to Formik
                setFieldValue('cvFile', uploadedFile);
                toast.success("File uploaded successfully!");
            } else {
                toast.error("Failed to upload file");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading file");
        }
    };

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    About You
                </h2>

                {/* Personal Information Section */}
                <div className="mb-8 space-y-4">
                    <div className="flex justify-between gap-4 flex-wrap">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Name: <span className="text-sm text-gray-600 font-medium">UAE Pass/Endpoint</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Emirates ID: <span className="text-sm text-gray-600 font-medium">UAE Pass/Endpoint</span>
                            </label>

                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Gender: <span className="text-sm text-gray-600 font-medium">UAE Pass/Endpoint</span>
                        </label>

                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Age Range:
                        </label>
                        <div className="flex gap-x-14 gap-y-4 flex-wrap">
                            {["18-24", "25-34", "35-44", "45-54", "55+"].map((range) => (
                                <label key={range} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="ageRange"
                                        value={range}
                                        checked={values.ageRange === range}
                                        onChange={() => setFieldValue('ageRange', range)}
                                        onBlur={() => setFieldTouched('ageRange', true)}
                                        className=""
                                    />
                                    <span className="ml-3 text-gray-700 text-sm">{range}</span>
                                </label>
                            ))}
                        </div>
                        <ErrorText error={errors.ageRange} touched={touched.ageRange} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Emirate of residence
                        </label>
                        <select
                            value={values.emirate}
                            onChange={(e) => setFieldValue('emirate', e.target.value)}
                            onBlur={() => setFieldTouched('emirate', true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                        >
                            <option value="">Select an emirate</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                            <option value="Fujairah">Fujairah</option>
                        </select>
                        <ErrorText error={errors.emirate} touched={touched.emirate} />
                    </div>
                </div>

                {/* Employment Section */}
                <div className="mb-8 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Employment
                    </h3>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Current employment status
                        </label>
                        <select
                            value={values.employmentStatus}
                            onChange={(e) => setFieldValue('employmentStatus', e.target.value)}
                            onBlur={() => setFieldTouched('employmentStatus', true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                        >
                            <option value="">Select employment status</option>
                            <option value="Employed">Employed</option>
                            <option value="Self-employed">Self-employed</option>
                            <option value="Retired">Retired</option>
                            <option value="Unemployed">Unemployed</option>
                        </select>
                        <ErrorText error={errors.employmentStatus} touched={touched.employmentStatus} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Sector of employment
                        </label>
                        <select
                            value={values.sector}
                            onChange={(e) => setFieldValue('sector', e.target.value)}
                            onBlur={() => setFieldTouched('sector', true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                        >
                            <option value="">Select a sector</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Non-profit">Non-profit</option>
                        </select>
                        <ErrorText error={errors.sector} touched={touched.sector} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Field of work / specialization
                        </label>
                        <select
                            value={values.fieldOfWork}
                            onChange={(e) => setFieldValue('fieldOfWork', e.target.value)}
                            onBlur={() => setFieldTouched('fieldOfWork', true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                        >
                            <option value="">Select a field</option>
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Other">Other</option>
                        </select>
                        <ErrorText error={errors.fieldOfWork} touched={touched.fieldOfWork} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Name of workplace
                            </label>
                            <input
                                type="text"
                                value={values.workplace}
                                onChange={(e) => setFieldValue('workplace', e.target.value)}
                                onBlur={() => setFieldTouched('workplace', true)}
                                placeholder="Ministry of Justice"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <ErrorText error={errors.workplace} touched={touched.workplace} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Years of experience
                            </label>
                            <input
                                type="number"
                                value={values.yearsExperience}
                                onChange={(e) => setFieldValue('yearsExperience', e.target.value)}
                                onBlur={() => setFieldTouched('yearsExperience', true)}
                                placeholder="10"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <ErrorText error={errors.yearsExperience} touched={touched.yearsExperience} />
                        </div>
                    </div>
                </div>

                {/* Additional Requirements Section */}
                <div className="mb-8 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Additional Requirements
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                        Upload your CV highlighting relevant experience and achievements
                        (PDF or DOCX up to 10MB).{" "}
                    </p>
                    <div>
                        <div className="p-4 bg-red-25 border-dashed border border-gray-400 rounded-lg bg-red-50">
                            {!uploadedFile ? (
                                <div
                                    className={`border border-gray-200 rounded-lg p-6 bg-white text-center cursor-pointer transition ${isDragging ? "bg-gray-50 border-gray-400" : ""
                                        }`}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                        accept=".pdf,.docx,.doc"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="cursor-pointer block text-gray-500 text-sm"
                                    >
                                        Upload your CV or drag it here
                                    </label>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="border border-gray-200 rounded-lg p-2 bg-white relative">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {uploadedFile.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(uploadedFile.size / 1024).toFixed(2)} KB
                                                </p>
                                            </div>
                                            <button
                                                onClick={handleRemoveFile}
                                                className="ml-4 text-gray-800 hover:text-gray-600 font-bold text-xs border border-gray-200 rounded px-2 py-1"
                                                title="Delete file"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {uploadedFile && (
                            <button
                                onClick={handleFileSubmit}
                                className="text-green-600 hover:text-green-700 font-medium text-xs mt-2"
                            >
                                File uploaded successfully
                            </button>
                        )}
                        <ErrorText error={errors.cvFile} touched={touched.cvFile} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={onNext}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
