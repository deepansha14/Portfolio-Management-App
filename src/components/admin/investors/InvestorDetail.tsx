"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mockInvestors } from "@/data/mockData";
import type { Investor } from "@/types";
import { formatCurrency, formatPercentage, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChartCard } from "@/components/ui/ChartCard";
import {
  ArrowLeftIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface InvestorDetailProps {
  investorId: string;
}

export function InvestorDetail({ investorId }: InvestorDetailProps) {
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading investor data
    setTimeout(() => {
      const foundInvestor = mockInvestors.find((inv) => inv.id === investorId);
      setInvestor(foundInvestor || null);
      setLoading(false);
    }, 500);
  }, [investorId]);

  if (loading) {
    return <InvestorDetailSkeleton />;
  }

  if (!investor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Investor not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            The investor you're looking for doesn't exist.
          </p>
          <Link href="/admin/investors">
            <Button className="mt-4">Back to Investors</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link href="/admin/investors">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Investors
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {investor.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Client since {formatDate(investor.joinDate)}
            </p>
          </div>
        </div>
        <Button className="flex items-center space-x-2">
          <PencilIcon className="h-4 w-4" />
          <span>Edit Investor</span>
        </Button>
      </motion.div>

      {/* Investor Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Personal Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {investor.avatar ? (
                <img
                  src={investor.avatar}
                  alt={investor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    {investor.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {investor.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Age: {investor.age}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {investor.email}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {investor.phone}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Occupation</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {investor.demographics.occupation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Dependents</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {investor.demographics.dependents}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Portfolio Summary
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Value
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(investor.portfolio.totalValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Returns
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  +{formatPercentage(investor.portfolio.returnsPercentage)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Invested
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {formatCurrency(investor.portfolio.totalInvested)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gain/Loss
                </p>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  +{formatCurrency(investor.portfolio.totalReturns)}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Risk Metrics
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Beta</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {investor.portfolio.riskMetrics.beta}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Sharpe Ratio
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {investor.portfolio.riskMetrics.sharpeRatio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Investment Goals
          </h3>
          <div className="space-y-4">
            {investor.goals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {goal.title}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {goal.progress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatCurrency(goal.currentAmount)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ChartCard
          title="Portfolio Performance"
          subtitle="Historical performance over time"
          data={investor.portfolio.performance.map((p) => ({
            date: new Date(p.date).toLocaleDateString("en-US", {
              month: "short",
            }),
            value: p.totalValue,
            benchmark: p.benchmark
              ? p.totalValue * (1 + p.benchmark / 100)
              : undefined,
          }))}
        />
      </motion.div>

      {/* Asset Allocation & Holdings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Asset Allocation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Asset Allocation
          </h3>
          <div className="space-y-3">
            {Object.entries(investor.portfolio.assetAllocation).map(
              ([asset, percentage]) => (
                <div key={asset} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {asset}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
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

        {/* Top Holdings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Holdings
          </h3>
          <div className="space-y-3">
            {investor.portfolio.holdings.slice(0, 5).map((holding) => (
              <div
                key={holding.id}
                className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {holding.symbol}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {holding.quantity} shares
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(holding.totalValue)}
                  </p>
                  <p
                    className={`text-xs ${
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
      </motion.div>
    </div>
  );
}

function InvestorDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
          </div>
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl skeleton"
          />
        ))}
      </div>

      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl skeleton" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl skeleton"
          />
        ))}
      </div>
    </div>
  );
}
