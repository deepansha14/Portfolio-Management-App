import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  options?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) {
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

export function formatNumber(
  number: number,
  options?: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    notation?: "standard" | "scientific" | "engineering" | "compact";
  }
) {
  const {
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    notation = "standard",
  } = options || {};

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  }).format(number);
}

export function formatPercentage(
  value: number,
  options?: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) {
  const {
    locale = "en-US",
    minimumFractionDigits = 1,
    maximumFractionDigits = 2,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
}

export function formatDate(
  date: Date | string,
  options?: {
    locale?: string;
    dateStyle?: "full" | "long" | "medium" | "short";
    timeStyle?: "full" | "long" | "medium" | "short";
  }
) {
  const { locale = "en-US", dateStyle = "medium", timeStyle } = options || {};

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  }).format(dateObj);
}

export function formatRelativeTime(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return formatDate(dateObj, { dateStyle: "short" });
}

export function calculateAge(birthDate: Date | string) {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function calculateGoalProgress(
  currentAmount: number,
  targetAmount: number
) {
  return Math.min((currentAmount / targetAmount) * 100, 100);
}

export function calculateTimeToGoal(
  currentAmount: number,
  targetAmount: number,
  monthlyContribution: number,
  expectedReturn: number = 0.07
) {
  if (monthlyContribution <= 0) return Infinity;

  const monthlyReturn = expectedReturn / 12;
  const remainingAmount = targetAmount - currentAmount;

  if (remainingAmount <= 0) return 0;

  // Use compound interest formula to calculate months needed
  const months =
    Math.log(1 + (remainingAmount * monthlyReturn) / monthlyContribution) /
    Math.log(1 + monthlyReturn);

  return Math.ceil(months);
}

export function getRiskLevelColor(riskScore: number) {
  if (riskScore <= 3) return "text-green-600 bg-green-100";
  if (riskScore <= 6) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
}

export function getRiskLevelLabel(riskScore: number) {
  if (riskScore <= 3) return "Conservative";
  if (riskScore <= 6) return "Moderate";
  return "Aggressive";
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-gray-600 bg-gray-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "on-track":
      return "text-green-600 bg-green-100";
    case "behind":
      return "text-red-600 bg-red-100";
    case "ahead":
      return "text-blue-600 bg-blue-100";
    case "completed":
      return "text-purple-600 bg-purple-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function getChangeColor(value: number) {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-600";
}

export function getChangeIcon(value: number) {
  if (value > 0) return "↗";
  if (value < 0) return "↘";
  return "→";
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateChartColors(count: number) {
  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
    "#06B6D4", // cyan
    "#F97316", // orange
    "#84CC16", // lime
    "#EC4899", // pink
    "#6B7280", // gray
  ];

  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function downloadCSV(data: any[], filename: string) {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => row[header]).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateRandomId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
