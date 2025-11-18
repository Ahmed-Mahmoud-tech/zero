"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AuthHeader() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("common");
    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("oidc", { callbackUrl: "/" });
        } catch (error) {
            console.error("Sign in error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Sign out error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-end px-4 py-3">
                <div className="animate-pulse h-10 w-24 bg-gray-300 rounded"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-end px-4 py-3 bg-white shadow-sm border-b border-gray-200">
            {status === "unauthenticated" ? (
                <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600  text-white rounded-lg hover:bg-red-800  transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? t("SigningIn") : t("SignIn")}
                </button>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{session?.user?.name || "User"}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isLoading ? t("SigningOut") : t("SignOut")}
                    </button>
                </div>
            )}
        </div>
    );
}
