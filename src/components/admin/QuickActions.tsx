"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  PlusIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export function QuickActions() {
  const [showDropdown, setShowDropdown] = useState(false);

  const actions = [
    {
      name: "Add New Investor",
      description: "Onboard a new client",
      icon: PlusIcon,
      action: () => (window.location.href = "/investor/info-form"),
      primary: true,
    },
    {
      name: "Generate Report",
      description: "Create performance reports",
      icon: DocumentArrowDownIcon,
      action: () => console.log("Generate report"),
    },
    {
      name: "System Settings",
      description: "Configure platform settings",
      icon: Cog6ToothIcon,
      action: () => console.log("Settings"),
    },
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Quick Actions</span>
      </Button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.action();
                  setShowDropdown(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div
                  className={`p-2 rounded-lg ${
                    action.primary
                      ? "bg-primary-100 dark:bg-primary-900"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <action.icon
                    className={`h-4 w-4 ${
                      action.primary
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
