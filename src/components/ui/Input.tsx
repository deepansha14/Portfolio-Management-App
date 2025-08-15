"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  className,
  label,
  error,
  helperText,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#0A2540] dark:text-gray-200 mb-1.5"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[#ccc] bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-[#00B368] focus:ring-2 focus:ring-[#00B368]/20 focus:shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#00B368] dark:focus:ring-[#00B368]/20",
          error &&
            "border-[#E74C3C] focus:border-[#E74C3C] focus:ring-[#E74C3C]/20",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-[#E74C3C] dark:text-red-400 mt-1 transition-opacity animate-fadeIn"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="text-sm text-gray-500 dark:text-gray-400 mt-1"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
