"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#00B368] text-white hover:bg-[#009956] shadow-md hover:shadow-lg hover:shadow-[#00B368]/20 dark:bg-[#00B368] dark:hover:bg-[#009956] active:translate-y-0.5",
    secondary:
      "bg-[#2D9CDB] text-white hover:bg-[#2689c2] shadow-md hover:shadow-lg hover:shadow-[#2D9CDB]/20 dark:bg-[#2D9CDB] dark:hover:bg-[#2689c2] active:translate-y-0.5",
    outline:
      "border border-[#0A2540] bg-white text-[#0A2540] hover:bg-[#F5F7FA] hover:border-[#0A2540] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:border-[#00B368] active:translate-y-0.5",
    ghost:
      "text-[#0A2540] hover:bg-[#F5F7FA] dark:text-gray-300 dark:hover:bg-gray-800 active:translate-y-0.5",
    danger:
      "bg-[#E74C3C] text-white hover:bg-[#d44333] shadow-md hover:shadow-lg hover:shadow-[#E74C3C]/20 dark:bg-[#E74C3C] dark:hover:bg-[#d44333] active:translate-y-0.5",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm rounded-lg",
    md: "h-11 px-5 py-2.5 text-sm",
    lg: "h-14 px-7 py-3.5 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 relative">
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      {children}
    </button>
  );
}
