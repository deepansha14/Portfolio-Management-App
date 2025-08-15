"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  number: number;
  subtitle?: string;
  contentClassName?: string;
}

export function FormSection({
  title,
  number,
  subtitle,
  className,
  contentClassName,
  children,
  ...props
}: FormSectionProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md overflow-hidden mb-8",
        className
      )}
      {...props}
    >
      <div className="bg-[#F5F7FA] dark:bg-gray-900 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A2540] text-white text-lg font-semibold mr-4 shadow-md">
            {number}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-[#0A2540] dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={cn("px-8 py-6", contentClassName)}>{children}</div>
    </section>
  );
}
