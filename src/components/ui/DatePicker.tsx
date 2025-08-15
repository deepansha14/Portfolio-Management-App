// DatePicker component with enhanced UX
"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function DatePicker({
  id,
  name,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  min,
  max,
  error,
  helperText,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerId =
    id || `date-picker-${Math.random().toString(36).substr(2, 9)}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-1" ref={containerRef}>
      {label && (
        <label
          htmlFor={datePickerId}
          className="block text-sm font-medium text-[#0A2540] dark:text-gray-200 mb-1.5"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id={datePickerId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          className={cn(
            "flex h-11 w-full rounded-lg border border-[#ccc] bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-[#00B368] focus:ring-2 focus:ring-[#00B368]/20 focus:shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#00B368] dark:focus:ring-[#00B368]/20",
            error &&
              "border-[#E74C3C] focus:border-[#E74C3C] focus:ring-[#E74C3C]/20",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${datePickerId}-error`
              : helperText
              ? `${datePickerId}-helper`
              : undefined
          }
          onFocus={() => setIsOpen(true)}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      </div>
      {error && (
        <p
          id={`${datePickerId}-error`}
          className="text-sm text-[#E74C3C] dark:text-red-400 mt-1 transition-opacity animate-fadeIn"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${datePickerId}-helper`}
          className="text-sm text-gray-500 dark:text-gray-400 mt-1"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
