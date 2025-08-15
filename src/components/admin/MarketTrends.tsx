"use client";

import { motion } from "framer-motion";
import type { MarketTrend } from "@/types";
import {
  formatCurrency,
  formatPercentage,
  getChangeColor,
  getChangeIcon,
} from "@/lib/utils";

interface MarketTrendsProps {
  trends: MarketTrend[];
}

export function MarketTrends({ trends }: MarketTrendsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Market Trends
        </h3>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  trend.sentiment === "bullish"
                    ? "bg-green-500"
                    : trend.sentiment === "bearish"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {trend.symbol}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {trend.sector}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(trend.currentPrice)}
              </p>
              <div className="flex items-center justify-end space-x-1">
                <span
                  className={`text-xs font-medium ${getChangeColor(
                    trend.changePercent
                  )}`}
                >
                  {getChangeIcon(trend.changePercent)}
                  {formatPercentage(Math.abs(trend.changePercent))}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Live data</span>
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  );
}
