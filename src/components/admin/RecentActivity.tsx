"use client";

import { motion } from "framer-motion";
import { mockTransactions } from "@/data/mockData";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { cn, getStatusColor } from "@/lib/utils";

const activities = [
  {
    id: "1",
    type: "investment",
    message: "Sarah Johnson deposited $5,000",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    amount: 5000,
    status: "completed",
  },
  {
    id: "2",
    type: "portfolio",
    message: "Portfolio rebalanced for Michael Chen",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "completed",
  },
  {
    id: "3",
    type: "goal",
    message: "Emily Rodriguez is ahead of retirement goal",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: "on-track",
  },
  {
    id: "4",
    type: "alert",
    message: "Market volatility alert triggered",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: "warning",
  },
  {
    id: "5",
    type: "client",
    message: "New client onboarding completed",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: "completed",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0">
              <div
                className={cn(
                  "w-2 h-2 rounded-full mt-2",
                  activity.type === "investment" && "bg-green-500",
                  activity.type === "portfolio" && "bg-blue-500",
                  activity.type === "goal" && "bg-purple-500",
                  activity.type === "alert" && "bg-yellow-500",
                  activity.type === "client" && "bg-indigo-500"
                )}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>

                {activity.amount && (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(activity.amount)}
                  </span>
                )}
              </div>

              <div className="mt-2">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusColor(activity.status)
                  )}
                >
                  {activity.status.replace("-", " ")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
