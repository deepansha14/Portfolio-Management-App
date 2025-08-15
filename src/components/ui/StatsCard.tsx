"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  loading?: boolean;
  sparklineData?: number[]; // Optional sparkline data points
  timeframe?: string; // Optional timeframe text (e.g., "This month", "YTD")
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  loading = false,
  sparklineData,
  timeframe,
}: StatsCardProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
          <div className="space-y-3">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4" />
            <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Enhanced color classes for financial data representation
  const changeColorClass = {
    positive: "text-emerald-600 dark:text-emerald-400",
    negative: "text-rose-600 dark:text-rose-400",
    neutral: "text-slate-600 dark:text-slate-400",
  }[changeType];

  // Background styles based on change type for subtle indication
  const backgroundStyle = {
    positive: "bg-emerald-50 dark:bg-emerald-900/20",
    negative: "bg-rose-50 dark:bg-rose-900/20",
    neutral: "bg-slate-50 dark:bg-slate-900/20",
  }[changeType];

  // Icon background styles for better visual hierarchy
  const iconBgStyle = {
    positive: "bg-emerald-100 dark:bg-emerald-900/40",
    negative: "bg-rose-100 dark:bg-rose-900/40",
    neutral: "bg-primary-100 dark:bg-primary-900/40",
  }[changeType];

  // Direction arrow based on change type
  const ChangeArrow =
    changeType === "positive"
      ? ArrowUpIcon
      : changeType === "negative"
      ? ArrowDownIcon
      : null;

  // Simple inline sparkline visualization if data provided
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;

    // Normalize the data points between 0 and 1
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min;
    const normalized = sparklineData.map((point) =>
      range === 0 ? 0.5 : (point - min) / range
    );

    // Calculate points for SVG path
    const width = 70;
    const height = 24;
    const points = normalized
      .map(
        (point, i) =>
          `${(i / (normalized.length - 1)) * width},${height - point * height}`
      )
      .join(" ");

    const sparklineColor = {
      positive: "stroke-emerald-500 dark:stroke-emerald-400",
      negative: "stroke-rose-500 dark:stroke-rose-400",
      neutral: "stroke-blue-500 dark:stroke-blue-400",
    }[changeType];

    return (
      <div className="absolute bottom-6 right-6 opacity-60 h-6">
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            points={points}
            fill="none"
            strokeWidth="1.5"
            className={sparklineColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{
        y: -3,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700",
        "hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300",
        "overflow-hidden"
      )}
    >
      {/* Upper content */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-0.5 tracking-tight">
            {title}
          </h3>
          {timeframe && (
            <span className="text-xs text-gray-500 dark:text-gray-500 font-normal">
              {timeframe}
            </span>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className={cn("p-2.5 rounded-lg", iconBgStyle)}>
            <Icon className="h-5 w-5 text-primary-700 dark:text-primary-300" />
          </div>
        </div>
      </div>

      {/* Value and change */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-baseline space-x-2">
          <p className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
            {value}
          </p>
          {change && (
            <span
              className={cn(
                "text-sm font-medium flex items-center",
                changeColorClass
              )}
            >
              {ChangeArrow && (
                <ChangeArrow className="h-3.5 w-3.5 mr-0.5 inline" />
              )}
              {change}
            </span>
          )}
        </div>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 font-normal max-w-[80%]">
            {description}
          </p>
        )}
      </div>

      {/* Sparkline visualization */}
      {renderSparkline()}

      {/* Enhanced subtle background pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-40 bg-gradient-to-br from-transparent via-transparent to-gray-100/80 dark:to-gray-700/30 rounded-xl pointer-events-none",
          changeType !== "neutral" ? `${backgroundStyle}` : ""
        )}
      />

      {/* Bottom indicator bar - subtle color indication */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full",
          changeType === "positive"
            ? "bg-emerald-500/60"
            : changeType === "negative"
            ? "bg-rose-500/60"
            : "bg-primary-500/60"
        )}
      />
    </motion.div>
  );
}
