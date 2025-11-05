"use client";

import { useState, useEffect, useRef } from "react";

const LAST_SAVED_COOKIE = "zeroform_last_saved";

const formatDateTime = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, "0");

    return `${month}/${day}/${year}, ${hoursStr}:${minutes} ${ampm}`;
};

export default function LastSavedTime() {
    const [lastSaved, setLastSaved] = useState<string>(formatDateTime(new Date()));
    const initRef = useRef(false);

    useEffect(() => {
        // Initialize on first mount only
        if (!initRef.current) {
            initRef.current = true;
            const savedTime = localStorage.getItem(LAST_SAVED_COOKIE);
            const timeoutId = setTimeout(() => {
                if (savedTime) {
                    setLastSaved(formatDateTime(new Date(savedTime)));
                } else {
                    const now = new Date();
                    localStorage.setItem(LAST_SAVED_COOKIE, now.toISOString());
                    setLastSaved(formatDateTime(now));
                }
            }, 0);

            return () => clearTimeout(timeoutId);
        }
    }, []);

    useEffect(() => {
        // Listen for formDataSaved custom event
        const handleFormDataSaved = (event: Event) => {
            const customEvent = event as CustomEvent<{ timestamp: string }>;
            console.log("formDataSaved event received:", customEvent.detail);
            if (customEvent.detail?.timestamp) {
                setLastSaved(formatDateTime(new Date(customEvent.detail.timestamp)));
            }
        };

        window.addEventListener('formDataSaved', handleFormDataSaved);

        return () => {
            window.removeEventListener('formDataSaved', handleFormDataSaved);
        };
    }, []);

    return (
        <div className="text-sm text-gray-500 mb-4">
            Last saved: {lastSaved}
        </div>
    );
}
