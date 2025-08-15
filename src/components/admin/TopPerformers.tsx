"use client";

import { motion } from "framer-motion";
import type { Holding } from "@/types";
import {
  formatCurrency,
  formatPercentage,
  getChangeColor,
  getChangeIcon,
} from "@/lib/utils";

interface TopPerformersProps {
  assets: Holding[];
}

export function TopPerformers({ assets }: TopPerformersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Performers
        </h3>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {assets.slice(0, 4).map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-primary-700 dark:text-primary-300">
                  {asset.symbol.substring(0, 2)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {asset.symbol}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-20">
                  {asset.name}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(asset.currentPrice)}
              </p>
              <div className="flex items-center space-x-1">
                <span
                  className={`text-xs ${getChangeColor(
                    asset.unrealizedGainPercentage
                  )}`}
                >
                  {getChangeIcon(asset.unrealizedGainPercentage)}
                  {formatPercentage(Math.abs(asset.unrealizedGainPercentage))}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
