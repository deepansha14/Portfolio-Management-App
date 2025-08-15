"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store";
import { mockInvestors, mockMarketTrends } from "@/data/mockData";
import { StatsCard } from "@/components/ui/StatsCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import type { Investor } from "@/types";

export function ClientDashboard() {
  const { user } = useAuthStore();
  const [clientData, setClientData] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading client data
    setTimeout(() => {
      // For demo, use the first investor data
      const investor = mockInvestors[0];
      setClientData(investor);
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !clientData) {
    return <ClientDashboardSkeleton />;
  }

  const portfolio = clientData.portfolio;
  const goals = clientData.goals;

  // Generate sparkline data for stats cards
  const generateSparklineData = (trend: string): number[] => {
    const points = 7; // 7 data points for last week
    let data: number[] = [];

    if (trend === "rising") {
      // Generally rising trend with some fluctuation
      data = [68, 72, 70, 78, 82, 80, 85];
    } else if (trend === "falling") {
      // Generally falling trend with some fluctuation
      data = [85, 80, 82, 76, 74, 72, 68];
    } else if (trend === "volatile") {
      // More volatile pattern
      data = [75, 85, 70, 88, 72, 84, 78];
    } else {
      // Stable with slight growth
      data = [75, 76, 77, 75, 78, 77, 79];
    }

    return data;
  };

  const statsCards = [
    {
      title: "Portfolio Value",
      value: formatCurrency(portfolio.totalValue),
      change: `+${formatPercentage(portfolio.returnsPercentage)}`,
      changeType: "positive" as const,
      icon: CurrencyDollarIcon,
      description: "Total investment value",
      sparklineData: generateSparklineData("rising"),
      timeframe: "YTD",
    },
    {
      title: "Total Returns",
      value: formatCurrency(portfolio.totalReturns),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: ArrowTrendingUpIcon,
      description: "Lifetime gains",
      sparklineData: generateSparklineData("volatile"),
      timeframe: "All time",
    },
    {
      title: "Investment Goals",
      value: goals.length.toString(),
      change: `${goals.filter((g) => g.status === "on-track").length} on track`,
      changeType: "positive" as const,
      icon: CalendarIcon,
      description: "Active goals",
      sparklineData: generateSparklineData("stable"),
      timeframe: "Current",
    },
    {
      title: "Risk Score",
      value: `${clientData.riskScore}/10`,
      change: "Moderate",
      changeType: "neutral" as const,
      icon: ChartBarIcon,
      description: "Risk tolerance assessment",
      sparklineData: generateSparklineData("stable"),
      timeframe: "Last update",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white shadow-lg relative overflow-hidden"
      >
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1 tracking-tight">
                Welcome back, {clientData.name.split(" ")[0]}!
              </h1>
              <p className="text-primary-100 text-lg max-w-lg">
                Your portfolio is performing well. Here's your financial
                overview for{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                .
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <button className="bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Investment
              </button>
              <button className="bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium">
                View Report
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <p className="text-primary-200 text-sm font-medium">
                  Since Last Login
                </p>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  24h
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight flex items-center">
                +$2,450
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-emerald-400/20 text-emerald-200 rounded-sm">
                  +1.8%
                </span>
              </p>
              <p className="text-xs text-primary-200/80 mt-1">
                Updated {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <p className="text-primary-200 text-sm font-medium">
                  This Month
                </p>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {new Date().toLocaleDateString("en-US", { month: "short" })}
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight flex items-center">
                +5.2%
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-emerald-400/20 text-emerald-200 rounded-sm">
                  +2.1%
                </span>
              </p>
              <p className="text-xs text-primary-200/80 mt-1">
                vs. S&P 500 benchmark
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <p className="text-primary-200 text-sm font-medium">
                  Next Goal
                </p>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  Priority
                </span>
              </div>
              <p className="text-xl font-bold tracking-tight">
                {goals[0]?.title}
              </p>
              <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-white"
                  style={{ width: `${goals[0]?.progress}%` }}
                />
              </div>
              <p className="text-xs text-primary-200/80 mt-1.5 flex justify-between">
                <span>${goals[0]?.currentAmount?.toLocaleString()}</span>
                <span>${goals[0]?.targetAmount?.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <StatsCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <ChartCard
          title="Portfolio Performance"
          subtitle="Your investment growth over time"
          data={portfolio.performance.map((p) => ({
            date: new Date(p.date).toLocaleDateString("en-US", {
              month: "short",
            }),
            value: p.totalValue,
            benchmark: p.benchmark
              ? p.totalValue * (1 + p.benchmark / 100)
              : undefined,
          }))}
        />

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Asset Allocation
          </h3>
          <div className="space-y-4">
            {Object.entries(portfolio.assetAllocation).map(
              ([asset, percentage]) => (
                <div key={asset} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded ${
                        asset === "equity"
                          ? "bg-blue-500"
                          : asset === "bonds"
                          ? "bg-green-500"
                          : asset === "realEstate"
                          ? "bg-purple-500"
                          : asset === "commodities"
                          ? "bg-yellow-500"
                          : asset === "cash"
                          ? "bg-gray-500"
                          : "bg-indigo-500"
                      }`}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {asset === "realEstate" ? "Real Estate" : asset}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          asset === "equity"
                            ? "bg-blue-500"
                            : asset === "bonds"
                            ? "bg-green-500"
                            : asset === "realEstate"
                            ? "bg-purple-500"
                            : asset === "commodities"
                            ? "bg-yellow-500"
                            : asset === "cash"
                            ? "bg-gray-500"
                            : "bg-indigo-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                      {percentage}%
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </motion.div>

      {/* Goals and Holdings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Investment Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Investment Goals Progress
          </h3>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {goal.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Target: {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {goal.progress.toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatCurrency(goal.currentAmount)}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      goal.status === "on-track"
                        ? "bg-green-500"
                        : goal.status === "ahead"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    Monthly: {formatCurrency(goal.monthlyContribution)}
                  </span>
                  <span>
                    Due: {new Date(goal.targetDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity & Market News */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Holdings
            </h3>
            <div className="space-y-3">
              {portfolio.holdings.slice(0, 4).map((holding) => (
                <div
                  key={holding.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {holding.symbol}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {holding.quantity} shares
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(holding.totalValue)}
                    </p>
                    <p
                      className={`text-sm ${
                        holding.unrealizedGain >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {holding.unrealizedGain >= 0 ? "+" : ""}
                      {formatPercentage(holding.unrealizedGainPercentage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Market Highlights
            </h3>
            <div className="space-y-3">
              {mockMarketTrends.slice(0, 3).map((trend) => (
                <div
                  key={trend.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        trend.sentiment === "bullish"
                          ? "bg-green-500"
                          : trend.sentiment === "bearish"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {trend.symbol}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(trend.currentPrice)}
                    </p>
                    <p
                      className={`text-xs ${
                        trend.changePercent >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {trend.changePercent >= 0 ? "+" : ""}
                      {formatPercentage(trend.changePercent)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ClientDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome header skeleton */}
      <div className="bg-gradient-to-r from-primary-600/80 to-primary-700/80 rounded-xl p-8 shadow-lg relative overflow-hidden">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <div className="h-8 w-64 bg-white/20 rounded mb-3 skeleton" />
              <div className="h-5 w-96 bg-white/20 rounded skeleton" />
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <div className="h-10 w-36 bg-white/20 rounded-lg skeleton" />
              <div className="h-10 w-28 bg-white/20 rounded-lg skeleton" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-xl p-4 border border-white/20"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="h-4 w-24 bg-white/20 rounded skeleton" />
                  <div className="h-4 w-10 bg-white/20 rounded-full skeleton" />
                </div>
                <div className="h-6 w-28 bg-white/20 rounded skeleton mb-2" />
                <div className="h-3 w-full bg-white/20 rounded skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
              <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton" />
            </div>
            <div className="space-y-3">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4 skeleton" />
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700 skeleton" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded skeleton"
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
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 skeleton" />
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                  <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 skeleton" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton ml-auto" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton ml-auto" />
                  </div>
                </div>
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 skeleton" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex justify-between items-center p-3 rounded-lg"
                  >
                    <div className="space-y-2">
                      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                    </div>
                    <div className="space-y-2 text-right">
                      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded skeleton ml-auto" />
                      <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded skeleton ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
