"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/store";
import {
  mockDashboardMetrics,
  mockMarketTrends,
  mockRecommendations,
} from "@/data/mockData";
import { StatsCard } from "@/components/ui/StatsCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { TopPerformers } from "@/components/admin/TopPerformers";
import { MarketTrends } from "@/components/admin/MarketTrends";
import { QuickActions } from "@/components/admin/QuickActions";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import {
  UsersIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export function AdminDashboard() {
  const { metrics, setMetrics, loading, setLoading } = useDashboardStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState("12M");

  useEffect(() => {
    // Simulate loading dashboard data
    setLoading(true);
    setTimeout(() => {
      setMetrics(mockDashboardMetrics);
      setLoading(false);
    }, 1000);
  }, [setMetrics, setLoading]);

  if (loading || !metrics) {
    return <DashboardSkeleton />;
  }

  // Sample sparkline data for stats cards
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
      title: "Total AUM",
      value: formatCurrency(metrics.totalAUM),
      change: `+${formatPercentage(metrics.aumGrowth)}`,
      changeType: "positive" as const,
      icon: CurrencyDollarIcon,
      description: "Assets under management",
      sparklineData: generateSparklineData("rising"),
      timeframe: "YTD",
    },
    {
      title: "Active Clients",
      value: metrics.activeClients.toString(),
      change: `+${formatPercentage(metrics.clientGrowth)}`,
      changeType: "positive" as const,
      icon: UsersIcon,
      description: `${metrics.totalClients} total clients`,
      sparklineData: generateSparklineData("stable"),
      timeframe: "This quarter",
    },
    {
      title: "Average Returns",
      value: formatPercentage(metrics.averageReturns),
      change: "+2.3%",
      changeType: "positive" as const,
      icon: ArrowTrendingUpIcon,
      description: "Portfolio performance",
      sparklineData: generateSparklineData("volatile"),
      timeframe: "This month",
    },
    {
      title: "Portfolio Value",
      value: formatCurrency(metrics.averagePortfolioSize),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: ChartBarIcon,
      description: "Average per client",
      sparklineData: generateSparklineData("rising"),
      timeframe: "YTD",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 pb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Admin Dashboard
            </h1>
            <span className="ml-4 px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
              Live Data
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
            Overview of your portfolio management business. Last updated{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <QuickActions />
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
          subtitle="Total AUM growth over time"
          timeframeOptions={["1M", "3M", "6M", "12M", "YTD"]}
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
          data={[
            { date: "Jan", value: 12500000, benchmark: 12000000 },
            { date: "Feb", value: 13200000, benchmark: 12300000 },
            { date: "Mar", value: 13800000, benchmark: 12600000 },
            { date: "Apr", value: 14100000, benchmark: 12900000 },
            { date: "May", value: 14700000, benchmark: 13200000 },
            { date: "Jun", value: 15200000, benchmark: 13500000 },
            { date: "Jul", value: 15600000, benchmark: 13800000 },
            { date: "Aug", value: 15400000, benchmark: 14100000 },
            { date: "Sep", value: 15900000, benchmark: 14400000 },
            { date: "Oct", value: 16200000, benchmark: 14700000 },
            { date: "Nov", value: 16500000, benchmark: 15000000 },
            { date: "Dec", value: 15750000, benchmark: 15300000 },
          ]}
        />

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Client Distribution
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Conservative
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${metrics.riskDistribution.conservative}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {metrics.riskDistribution.conservative}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Moderate
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${metrics.riskDistribution.moderate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {metrics.riskDistribution.moderate}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Aggressive
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${metrics.riskDistribution.aggressive}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {metrics.riskDistribution.aggressive}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Age Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics.ageDistribution).map(
                ([range, percentage]) => (
                  <div
                    key={range}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {range.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <TopPerformers assets={metrics.topPerformingAssets} />
          <MarketTrends trends={mockMarketTrends.slice(0, 3)} />
        </div>
      </motion.div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            <div className="h-5 w-20 ml-4 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
          </div>
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
        </div>
        <div className="flex space-x-3">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
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
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
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
          <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded skeleton" />
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4 skeleton" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4 skeleton" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 skeleton" />
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full skeleton mr-4" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 skeleton" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3 skeleton" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 skeleton" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded mr-3 skeleton" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
