"use client";

import { useState } from "react";

export default function Step2() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
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
            setUploadedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
    };

    const handleFileSubmit = async () => {
        if (!uploadedFile) {
            alert("Please select a file first");
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
                alert("File uploaded successfully!");
            } else {
                alert("Failed to upload file");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        }
    };

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-neutral-300 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    About You / Can&apos;t be edited
                </h2>

                {/* Personal Information Section */}
                <div className="mb-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Name:
                            </label>
                            <p className="text-sm text-gray-600">UAE Pass/Endpoint</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Emirates ID:
                            </label>
                            <p className="text-sm text-gray-600">UAE Pass/Endpoint</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Gender:
                        </label>
                        <p className="text-sm text-gray-600">UAE Pass/Endpoint</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Age Range:
                        </label>
                        <div className="flex gap-14">
                            {["18-24", "25-34", "35-44", "45-54", "55+"].map((range) => (
                                <label key={range} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="ageRange"
                                        value={range}
                                        className=""
                                    />
                                    <span className="ml-3 text-gray-700 text-sm">{range}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Emirate of residence
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
                            <option>Union Al Quwain</option>
                        </select>
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
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
                            <option>Retired</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Sector of employment
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
                            <option>Non-profit</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Field of work / specialization
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
                            <option>Business</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Name of workplace
                            </label>
                            <input
                                type="text"
                                placeholder="Ministry of Justice"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Years of experience
                            </label>
                            <input
                                type="number"
                                placeholder="10"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
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
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-300">
                        Previous
                    </button>
                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
