// Updated to use fixed positioning for the dropdown to prevent clipping issues
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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState({ top: 0, left: 0 });

  const datePickerId = id || `date-picker-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = dropdownRef.current?.offsetHeight || 0;

      const top = rect.bottom + dropdownHeight > viewportHeight ? rect.top - dropdownHeight : rect.bottom;
      const left = rect.left;

      setDropdownStyles({ top, left });
    }
  }, [isOpen]);

  const handleYearChange = (offset: number) => {
    setSelectedYear((prev) => prev + offset);
  };

  const handleMonthChange = (offset: number) => {
    setSelectedMonth((prev) => {
      let newMonth = prev + offset;
      if (newMonth < 0) {
        newMonth = 11;
        setSelectedYear((prevYear) => prevYear - 1);
      } else if (newMonth > 11) {
        newMonth = 0;
        setSelectedYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day);
    onChange({
      target: {
        name,
        value: selectedDate.toISOString().split("T")[0],
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  const generateDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === selectedYear &&
      today.getMonth() === selectedMonth &&
      today.getDate() === day
    );
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      {label && (
        <label
          htmlFor={datePickerId}
          className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          id={datePickerId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={cn(
            "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/50",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/50",
            className
          )}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && (
          <div
            ref={dropdownRef}
            className="fixed z-50 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700 overflow-visible"
            style={{ top: dropdownStyles.top, left: dropdownStyles.left }}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={() => handleYearChange(-1)}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-2 py-1 rounded transition-colors"
              >
                «
              </button>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleMonthChange(-1)}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-2 py-1 rounded transition-colors"
                >
                  ‹
                </button>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {MONTH_NAMES[selectedMonth]} {selectedYear}
                </span>
                <button
                  type="button"
                  onClick={() => handleMonthChange(1)}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-2 py-1 rounded transition-colors"
                >
                  ›
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleYearChange(1)}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-2 py-1 rounded transition-colors"
              >
                »
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {generateDays().map((day) => (
                <button
                  key={day}
                  type="button"
                  className={cn(
                    "h-10 w-10 rounded-full text-sm font-medium transition-colors",
                    isToday(day)
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  )}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${datePickerId}-error`}
          className="text-sm text-red-500 mt-1 animate-fadeIn"
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
