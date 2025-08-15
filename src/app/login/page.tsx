"use client";

import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role");
  const [roleDisplay, setRoleDisplay] = useState("");

  useEffect(() => {
    if (role) {
      sessionStorage.setItem("selectedRole", role);
      setRoleDisplay(role.charAt(0).toUpperCase() + role.slice(1));
    } else {
      // If no role is specified, redirect back to the selection screen
      router.push("/");
    }
  }, [role, router]);

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="w-full max-w-md mx-4">
        {/* App Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <ArrowLeftIcon
              className="w-8 h-8 text-white cursor-pointer"
              onClick={goBack}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 mb-2">
            Portfolio Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
