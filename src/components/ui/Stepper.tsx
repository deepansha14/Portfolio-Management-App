// Stepper component for multi-step forms
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: { label: string; completed: boolean; current: boolean }[];
  className?: string;
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step circle with number */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                  step.completed
                    ? "bg-emerald-500 text-white"
                    : step.current
                    ? "bg-navy-600 text-white ring-4 ring-navy-100"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                )}
              >
                {step.completed ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <span className="font-medium text-sm">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  step.current
                    ? "text-navy-600 dark:text-navy-300"
                    : step.completed
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div className="flex-grow mx-2 sm:mx-4">
                <div className="h-1 relative">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>
                  <div
                    className={cn(
                      "absolute inset-0 bg-emerald-500 transition-all duration-300",
                      step.completed ? "w-full" : "w-0"
                    )}
                    style={{
                      width: step.completed
                        ? "100%"
                        : step.current
                        ? "50%"
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
