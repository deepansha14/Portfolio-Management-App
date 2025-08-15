"use client";

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export function Select({
  className,
  label,
  error,
  helperText,
  id,
  options,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-[#0A2540] dark:text-gray-200 mb-1.5"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`appearance-none flex h-11 w-full rounded-lg border border-[#ccc] bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:border-[#00B368] focus:ring-2 focus:ring-[#00B368]/20 focus:shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-[#00B368] dark:focus:ring-[#00B368]/20 ${
            error
              ? "border-[#E74C3C] focus:border-[#E74C3C] focus:ring-[#E74C3C]/20"
              : ""
          } ${className || ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
              ? `${selectId}-helper`
              : undefined
          }
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
      {helperText && !error && (
        <p
          id={`${selectId}-helper`}
          className="text-xs text-gray-500 dark:text-gray-400 mt-1"
        >
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-xs text-[#E74C3C] mt-1 transition-opacity animate-fadeIn"
        >
          {error}
        </p>
      )}
    </div>
  );
}
