// Types for the portfolio management application

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "investor";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Investor {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  avatar?: string;
  riskScore: number; // 1-10 scale
  totalInvestment: number;
  currentValue: number;
  status: "active" | "inactive" | "pending";
  joinDate: Date;
  lastActivity: Date;
  demographics: {
    occupation: string;
    annualIncome: number;
    netWorth: number;
    dependents: number;
  };
  goals: InvestmentGoal[];
  portfolio: Portfolio;
  preferences: {
    communicationChannel: "email" | "phone" | "sms";
    riskTolerance: "conservative" | "moderate" | "aggressive";
    investmentHorizon: number; // years
  };
}

export interface InvestmentGoal {
  id: string;
  type:
    | "retirement"
    | "education"
    | "marriage"
    | "house"
    | "emergency"
    | "other";
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  priority: "high" | "medium" | "low";
  status: "on-track" | "behind" | "ahead" | "completed";
  monthlyContribution: number;
  progress: number; // percentage
}

export interface Portfolio {
  id: string;
  investorId: string;
  totalValue: number;
  totalInvested: number;
  totalReturns: number;
  returnsPercentage: number;
  lastUpdated: Date;
  assetAllocation: AssetAllocation;
  holdings: Holding[];
  performance: PerformanceData[];
  riskMetrics: RiskMetrics;
}

export interface AssetAllocation {
  equity: number;
  bonds: number;
  realEstate: number;
  commodities: number;
  cash: number;
  alternatives: number;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "bond" | "etf" | "mutual-fund" | "reit" | "commodity";
  quantity: number;
  currentPrice: number;
  totalValue: number;
  costBasis: number;
  unrealizedGain: number;
  unrealizedGainPercentage: number;
  weight: number; // percentage of portfolio
  sector: string;
  lastUpdated: Date;
}

export interface PerformanceData {
  date: Date;
  totalValue: number;
  returns: number;
  benchmark?: number;
}

export interface RiskMetrics {
  beta: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  var95: number; // Value at Risk 95%
}

export interface Transaction {
  id: string;
  investorId: string;
  type: "buy" | "sell" | "dividend" | "deposit" | "withdrawal";
  symbol?: string;
  quantity?: number;
  price?: number;
  amount: number;
  fee: number;
  date: Date;
  description: string;
  status: "completed" | "pending" | "cancelled";
}

export interface Recommendation {
  id: string;
  investorId?: string; // if null, it's a global recommendation
  title: string;
  description: string;
  type: "buy" | "sell" | "hold" | "rebalance" | "goal-adjustment";
  priority: "high" | "medium" | "low";
  symbol?: string;
  targetAllocation?: number;
  reasoning: string;
  expectedReturn?: number;
  riskLevel: "low" | "medium" | "high";
  timeHorizon: string;
  status: "active" | "implemented" | "dismissed";
  createdBy: string; // advisor ID
  createdAt: Date;
  implementedAt?: Date;
  tags: string[];
}

export interface MarketTrend {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  changeAmount: number;
  volume: number;
  marketCap?: number;
  sector: string;
  trendType: "gaining" | "losing" | "volatile";
  sentiment: "bullish" | "bearish" | "neutral";
  lastUpdated: Date;
}

export interface DashboardMetrics {
  totalAUM: number;
  totalClients: number;
  activeClients: number;
  inactiveClients: number;
  averagePortfolioSize: number;
  totalReturns: number;
  averageReturns: number;
  clientGrowth: number; // percentage
  aumGrowth: number; // percentage
  topPerformingAssets: Holding[];
  underPerformingAssets: Holding[];
  upcomingGoals: InvestmentGoal[];
  riskDistribution: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
  ageDistribution: {
    under30: number;
    "30-50": number;
    "50-65": number;
    over65: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  url: string;
  publishedAt: Date;
  relevantSymbols: string[];
  sentiment: "positive" | "negative" | "neutral";
  impact: "high" | "medium" | "low";
  category: "market" | "economic" | "sector" | "company";
}

export interface ChartDataPoint {
  date: string;
  value: number;
  benchmark?: number;
  label?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  riskLevel?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
  message?: string;
  success: boolean;
}

// Theme and UI types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export type Theme = "light" | "dark";

export interface NotificationItem {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}
