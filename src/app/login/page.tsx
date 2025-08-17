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
        {/* App Header */}
        <LoginForm />
    </div>
  );
}
