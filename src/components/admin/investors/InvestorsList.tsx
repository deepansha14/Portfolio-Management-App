"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInvestorsStore } from "@/store";
import { mockInvestors } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  formatCurrency,
  formatDate,
  getRiskLevelColor,
  getRiskLevelLabel,
  getStatusColor,
} from "@/lib/utils";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export function InvestorsList() {
  const {
    investors,
    setInvestors,
    loading,
    setLoading,
    filters,
    setFilters,
    pagination,
    setPagination,
  } = useInvestorsStore();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setInvestors(mockInvestors);
      setPagination({ ...pagination, total: mockInvestors.length });
      setLoading(false);
    }, 1000);
  }, [setInvestors, setLoading, setPagination]);

  // Filter and sort investors
  const filteredAndSortedInvestors = useMemo(() => {
    let filtered = investors.filter((investor) => {
      const matchesSearch =
        !filters.search ||
        investor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        investor.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        !filters.status || investor.status === filters.status;

      const matchesRisk =
        !filters.riskLevel ||
        getRiskLevelLabel(investor.riskScore).toLowerCase() ===
          filters.riskLevel.toLowerCase();

      return matchesSearch && matchesStatus && matchesRisk;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [investors, filters, sortConfig]);

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((o, p) => o?.[p], obj);
  };

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) {
      return <ArrowsUpDownIcon className="h-4 w-4" />;
    }
    return (
      <ArrowsUpDownIcon
        className={`h-4 w-4 ${
          sortConfig.direction === "asc" ? "rotate-180" : ""
        }`}
      />
    );
  };

  if (loading) {
    return <InvestorsListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Investors
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your client portfolio and investments
          </p>
        </div>
        <Button
          className="flex items-center space-x-2"
          onClick={() => (window.location.href = "/investor/info-form")}
        >
          <span>Add New Investor</span>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search investors..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={filters.riskLevel}
            onChange={(e) => setFilters({ riskLevel: e.target.value })}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Risk Levels</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>

          <Button variant="outline" className="flex items-center space-x-2">
            <FunnelIcon className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <span>Investor</span>
                    {getSortIcon("name")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("age")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <span>Age</span>
                    {getSortIcon("age")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("currentValue")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <span>Portfolio Value</span>
                    {getSortIcon("currentValue")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("joinDate")}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <span>Join Date</span>
                    {getSortIcon("joinDate")}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedInvestors.map((investor, index) => (
                <motion.tr
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {investor.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={investor.avatar}
                            alt={investor.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {investor.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {investor.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {investor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {investor.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(
                        investor.riskScore
                      )}`}
                    >
                      {getRiskLevelLabel(investor.riskScore)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(investor.currentValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        investor.status
                      )}`}
                    >
                      {investor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(investor.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/investor/${investor.id}`}>
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">
                    {filteredAndSortedInvestors.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAndSortedInvestors.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary-50 border-primary-500 text-primary-600"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InvestorsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 dark:bg-gray-700 rounded skeleton"
            />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <div className="h-12 bg-gray-100 dark:bg-gray-700" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-6"
          >
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full skeleton mr-4" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
