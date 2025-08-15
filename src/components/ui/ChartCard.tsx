"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ChartDataPoint {
  date: string;
  value: number;
  benchmark?: number;
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  timeframeOptions?: string[];
  selectedTimeframe?: string;
  onTimeframeChange?: (timeframe: string) => void;
  loading?: boolean;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  data,
  timeframeOptions = ["1M", "3M", "6M", "12M", "YTD"],
  selectedTimeframe = "12M",
  onTimeframeChange,
  loading = false,
  className,
}: ChartCardProps) {
  const [hoveredData, setHoveredData] = useState<any>(null);

  if (loading) {
    return (
      <div
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 relative overflow-hidden",
          className
        )}
      >
        {/* Top indicator bar for loading state */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700 skeleton" />

        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                <div className="ml-3 h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
              </div>
              <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            </div>
            <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-lg">
              {timeframeOptions.map((_, index) => (
                <div
                  key={index}
                  className="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded skeleton"
                />
              ))}
            </div>
          </div>

          {/* Summary stats loading state */}
          <div className="flex mb-4 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex-1 border-r border-gray-200 dark:border-gray-700 pr-4">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 skeleton" />
              <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            </div>
            <div className="flex-1 px-4">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 skeleton" />
              <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            </div>
            <div className="flex-1 border-l border-gray-200 dark:border-gray-700 pl-4">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 skeleton" />
              <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            </div>
          </div>

          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton" />

          {/* Chart footnote loading state */}
          <div className="mt-3 flex justify-between items-center">
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
          </div>
        </div>
      </div>
    );
  }

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Calculate percentage difference for context
      const portfolioValue =
        payload.find((p: any) => p.dataKey === "value")?.value || 0;
      const benchmarkValue =
        payload.find((p: any) => p.dataKey === "benchmark")?.value || 0;
      const difference = portfolioValue - benchmarkValue;
      const percentDiff = benchmarkValue
        ? ((difference / benchmarkValue) * 100).toFixed(2)
        : 0;
      const isPositive = difference > 0;

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {label}
          </p>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm mr-4" style={{ color: entry.color }}>
                  {entry.dataKey === "value" ? "Portfolio" : "Benchmark"}:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${entry.value.toLocaleString()}
                </span>
              </div>
            ))}

            {payload.length > 1 && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    vs Benchmark:
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {percentDiff}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate total growth and difference vs benchmark
  const latestData = data[data.length - 1];
  const firstData = data[0];
  const growth =
    latestData && firstData
      ? ((latestData.value - firstData.value) / firstData.value) * 100
      : 0;

  const benchmarkGrowth =
    latestData && firstData && latestData.benchmark && firstData.benchmark
      ? ((latestData.benchmark - firstData.benchmark) / firstData.benchmark) *
        100
      : null;

  const outperformance =
    benchmarkGrowth !== null ? growth - benchmarkGrowth : null;

  const isPositiveGrowth = growth > 0;
  const isOutperforming = outperformance !== null ? outperformance > 0 : false;

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 relative overflow-hidden",
        className
      )}
    >
      {/* Top indicator bar */}
      <div
        className={cn(
          "absolute top-0 left-0 h-1 w-full",
          isPositiveGrowth ? "bg-emerald-500/60" : "bg-rose-500/60"
        )}
      />

      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h3>
            {growth !== 0 && (
              <span
                className={cn(
                  "ml-3 text-sm font-medium px-2 py-0.5 rounded-full flex items-center",
                  isPositiveGrowth
                    ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30"
                    : "text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30"
                )}
              >
                {isPositiveGrowth ? "+" : ""}
                {growth.toFixed(1)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {timeframeOptions.length > 0 && (
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700/60 rounded-lg p-1 shadow-inner">
            {timeframeOptions.map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "primary" : "ghost"}
                size="sm"
                onClick={() => onTimeframeChange?.(timeframe)}
                className={cn(
                  "text-xs h-7 px-3 font-medium",
                  selectedTimeframe === timeframe
                    ? "shadow-sm"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Summary stats */}
      {benchmarkGrowth !== null && (
        <div className="flex mb-4 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="flex-1 border-r border-gray-200 dark:border-gray-700 pr-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Portfolio Growth
            </div>
            <div
              className={cn(
                "text-sm font-semibold",
                isPositiveGrowth
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {isPositiveGrowth ? "+" : ""}
              {growth.toFixed(2)}%
            </div>
          </div>
          <div className="flex-1 px-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Benchmark
            </div>
            <div
              className={cn(
                "text-sm font-semibold",
                benchmarkGrowth > 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {benchmarkGrowth > 0 ? "+" : ""}
              {benchmarkGrowth.toFixed(2)}%
            </div>
          </div>
          <div className="flex-1 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Alpha
            </div>
            <div
              className={cn(
                "text-sm font-semibold",
                isOutperforming
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {isOutperforming ? "+" : ""}
              {outperformance?.toFixed(2) || "0.00"}%
            </div>
          </div>
        </div>
      )}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onMouseMove={(data) =>
              data?.activePayload &&
              setHoveredData(data.activePayload[0].payload)
            }
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              domain={["auto", "auto"]}
            />
            <Tooltip content={customTooltip} />
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium">{value}</span>
              )}
            />
            {/* Draw grid lines */}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#3B82F6",
                strokeWidth: 2,
                fill: "white",
              }}
              name="Portfolio Value"
              connectNulls={true}
            />
            {data.some((item) => item.benchmark !== undefined) && (
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#6B7280"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "#6B7280",
                  strokeWidth: 2,
                  fill: "white",
                }}
                name="Benchmark"
                connectNulls={true}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart footnote */}
      <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-500">
        <span>Source: Portfolio Analytics</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}
