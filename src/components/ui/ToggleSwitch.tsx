// Toggle Switch component for binary options
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  helperText?: string;
  className?: string;
}

export function ToggleSwitch({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  required = false,
  id,
  helperText,
  className,
}: ToggleSwitchProps) {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={switchId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
          <input
            type="checkbox"
            id={switchId}
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="opacity-0 w-0 h-0"
            aria-label={label}
          />
          <span
            className={cn(
              "absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ease-in-out",
              checked ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={
              disabled
                ? undefined
                : () => {
                    const event = {
                      target: {
                        name,
                        type: "checkbox",
                        checked: !checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>;
                    onChange(event);
                  }
            }
          ></span>
          <span
            className={cn(
              "absolute left-1 bottom-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out",
              checked && "transform translate-x-6"
            )}
          ></span>
        </div>
      </div>
      {helperText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
