import type {
  Investor,
  Portfolio,
  InvestmentGoal,
  Holding,
  PerformanceData,
  Transaction,
  Recommendation,
  MarketTrend,
  DashboardMetrics,
  NewsItem,
} from "@/types";

// Mock performance data for charts
export const generatePerformanceData = (
  months: number = 12
): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const startValue = 100000;
  let currentValue = startValue;

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);

    // Random growth/decline between -5% to 8%
    const change = (Math.random() - 0.3) * 0.13;
    currentValue = currentValue * (1 + change);

    data.push({
      date,
      totalValue: Math.round(currentValue),
      returns:
        Math.round(((currentValue - startValue) / startValue) * 100 * 100) /
        100,
      benchmark:
        Math.round(
          ((startValue * Math.pow(1.07, (months - i) / 12) - startValue) /
            startValue) *
            100 *
            100
        ) / 100,
    });
  }

  return data;
};

// Mock holdings data
export const mockHoldings: Holding[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    quantity: 150,
    currentPrice: 182.52,
    totalValue: 27378,
    costBasis: 165.3,
    unrealizedGain: 2583,
    unrealizedGainPercentage: 10.4,
    weight: 15.2,
    sector: "Technology",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "stock",
    quantity: 100,
    currentPrice: 378.85,
    totalValue: 37885,
    costBasis: 340.2,
    unrealizedGain: 3865,
    unrealizedGainPercentage: 11.4,
    weight: 21.0,
    sector: "Technology",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    type: "etf",
    quantity: 200,
    currentPrice: 445.2,
    totalValue: 89040,
    costBasis: 420.15,
    unrealizedGain: 5010,
    unrealizedGainPercentage: 6.0,
    weight: 49.4,
    sector: "Diversified",
    lastUpdated: new Date(),
  },
  {
    id: "4",
    symbol: "BND",
    name: "Vanguard Total Bond Market ETF",
    type: "etf",
    quantity: 300,
    currentPrice: 75.3,
    totalValue: 22590,
    costBasis: 78.2,
    unrealizedGain: -870,
    unrealizedGainPercentage: -3.7,
    weight: 12.5,
    sector: "Fixed Income",
    lastUpdated: new Date(),
  },
];

// Mock investment goals
export const mockGoals: InvestmentGoal[] = [
  {
    id: "1",
    type: "retirement",
    title: "Retirement Fund",
    description:
      "Build a substantial retirement corpus for comfortable post-retirement life",
    targetAmount: 2000000,
    currentAmount: 450000,
    targetDate: new Date("2055-12-31"),
    priority: "high",
    status: "on-track",
    monthlyContribution: 3500,
    progress: 22.5,
  },
  {
    id: "2",
    type: "education",
    title: "Children's Education",
    description: "Fund for college education expenses",
    targetAmount: 500000,
    currentAmount: 125000,
    targetDate: new Date("2035-08-15"),
    priority: "high",
    status: "ahead",
    monthlyContribution: 1200,
    progress: 25.0,
  },
  {
    id: "3",
    type: "house",
    title: "Dream Home Down Payment",
    description: "Save for down payment on a new house",
    targetAmount: 200000,
    currentAmount: 85000,
    targetDate: new Date("2027-06-01"),
    priority: "medium",
    status: "behind",
    monthlyContribution: 2000,
    progress: 42.5,
  },
];

// Mock investors data
export const mockInvestors: Investor[] = [
  {
    id: "1",
    userId: "user_1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    age: 42,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b4e0?w=150&h=150&fit=crop&crop=face",
    riskScore: 7,
    totalInvestment: 250000,
    currentValue: 287500,
    status: "active",
    joinDate: new Date("2020-03-15"),
    lastActivity: new Date(),
    demographics: {
      occupation: "Software Engineer",
      annualIncome: 150000,
      netWorth: 800000,
      dependents: 2,
    },
    goals: mockGoals,
    portfolio: {
      id: "portfolio_1",
      investorId: "1",
      totalValue: 287500,
      totalInvested: 250000,
      totalReturns: 37500,
      returnsPercentage: 15.0,
      lastUpdated: new Date(),
      assetAllocation: {
        equity: 65,
        bonds: 20,
        realEstate: 10,
        commodities: 3,
        cash: 2,
        alternatives: 0,
      },
      holdings: mockHoldings,
      performance: generatePerformanceData(12),
      riskMetrics: {
        beta: 1.2,
        sharpeRatio: 1.8,
        maxDrawdown: -12.5,
        volatility: 18.3,
        var95: -8.2,
      },
    },
    preferences: {
      communicationChannel: "email",
      riskTolerance: "moderate",
      investmentHorizon: 15,
    },
  },
  {
    id: "2",
    userId: "user_2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0124",
    age: 35,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    riskScore: 8,
    totalInvestment: 180000,
    currentValue: 205200,
    status: "active",
    joinDate: new Date("2021-07-22"),
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    demographics: {
      occupation: "Marketing Director",
      annualIncome: 120000,
      netWorth: 550000,
      dependents: 1,
    },
    goals: [
      {
        id: "4",
        type: "retirement",
        title: "Early Retirement",
        targetAmount: 1500000,
        currentAmount: 205200,
        targetDate: new Date("2050-01-01"),
        priority: "high",
        status: "on-track",
        monthlyContribution: 4000,
        progress: 13.7,
      },
    ],
    portfolio: {
      id: "portfolio_2",
      investorId: "2",
      totalValue: 205200,
      totalInvested: 180000,
      totalReturns: 25200,
      returnsPercentage: 14.0,
      lastUpdated: new Date(),
      assetAllocation: {
        equity: 75,
        bonds: 15,
        realEstate: 5,
        commodities: 3,
        cash: 2,
        alternatives: 0,
      },
      holdings: mockHoldings.slice(0, 3),
      performance: generatePerformanceData(12),
      riskMetrics: {
        beta: 1.4,
        sharpeRatio: 1.6,
        maxDrawdown: -15.2,
        volatility: 22.1,
        var95: -10.5,
      },
    },
    preferences: {
      communicationChannel: "phone",
      riskTolerance: "aggressive",
      investmentHorizon: 20,
    },
  },
  {
    id: "3",
    userId: "user_3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1-555-0125",
    age: 28,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    riskScore: 6,
    totalInvestment: 75000,
    currentValue: 82500,
    status: "active",
    joinDate: new Date("2022-11-08"),
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    demographics: {
      occupation: "Teacher",
      annualIncome: 65000,
      netWorth: 150000,
      dependents: 0,
    },
    goals: [
      {
        id: "5",
        type: "house",
        title: "First Home",
        targetAmount: 100000,
        currentAmount: 35000,
        targetDate: new Date("2028-05-01"),
        priority: "high",
        status: "on-track",
        monthlyContribution: 1500,
        progress: 35.0,
      },
    ],
    portfolio: {
      id: "portfolio_3",
      investorId: "3",
      totalValue: 82500,
      totalInvested: 75000,
      totalReturns: 7500,
      returnsPercentage: 10.0,
      lastUpdated: new Date(),
      assetAllocation: {
        equity: 60,
        bonds: 30,
        realEstate: 5,
        commodities: 2,
        cash: 3,
        alternatives: 0,
      },
      holdings: mockHoldings.slice(0, 2),
      performance: generatePerformanceData(12),
      riskMetrics: {
        beta: 0.9,
        sharpeRatio: 1.4,
        maxDrawdown: -8.7,
        volatility: 14.2,
        var95: -6.8,
      },
    },
    preferences: {
      communicationChannel: "email",
      riskTolerance: "moderate",
      investmentHorizon: 25,
    },
  },
];

// Mock recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    investorId: "1",
    title: "Increase Technology Exposure",
    description:
      "Consider adding more technology stocks to capitalize on AI growth trends",
    type: "buy",
    priority: "medium",
    symbol: "NVDA",
    reasoning: "Strong AI market fundamentals and excellent quarterly results",
    expectedReturn: 15,
    riskLevel: "medium",
    timeHorizon: "6-12 months",
    status: "active",
    createdBy: "advisor_1",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ["growth", "technology", "AI"],
  },
  {
    id: "2",
    investorId: undefined,
    title: "Rebalance Bond Holdings",
    description:
      "Current interest rate environment suggests reducing bond duration",
    type: "rebalance",
    priority: "high",
    reasoning: "Rising interest rates negatively impact long-duration bonds",
    riskLevel: "low",
    timeHorizon: "1-3 months",
    status: "active",
    createdBy: "advisor_1",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ["bonds", "rebalancing", "risk-management"],
  },
];

// Mock market trends
export const mockMarketTrends: MarketTrend[] = [
  {
    id: "1",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    currentPrice: 875.5,
    changePercent: 8.5,
    changeAmount: 68.5,
    volume: 45000000,
    marketCap: 2150000000000,
    sector: "Technology",
    trendType: "gaining",
    sentiment: "bullish",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    currentPrice: 245.8,
    changePercent: -3.2,
    changeAmount: -8.15,
    volume: 28000000,
    marketCap: 780000000000,
    sector: "Consumer Discretionary",
    trendType: "losing",
    sentiment: "bearish",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    symbol: "META",
    name: "Meta Platforms, Inc.",
    currentPrice: 485.2,
    changePercent: 5.7,
    changeAmount: 26.2,
    volume: 18000000,
    marketCap: 1230000000000,
    sector: "Communication Services",
    trendType: "gaining",
    sentiment: "bullish",
    lastUpdated: new Date(),
  },
];

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalAUM: 15750000,
  totalClients: 127,
  activeClients: 118,
  inactiveClients: 9,
  averagePortfolioSize: 124015,
  totalReturns: 2362500,
  averageReturns: 12.8,
  clientGrowth: 15.2,
  aumGrowth: 18.7,
  topPerformingAssets: mockHoldings.slice(0, 3),
  underPerformingAssets: [mockHoldings[3]],
  upcomingGoals: mockGoals.filter(
    (goal) =>
      new Date(goal.targetDate).getTime() - Date.now() <
      365 * 24 * 60 * 60 * 1000
  ),
  riskDistribution: {
    conservative: 35,
    moderate: 45,
    aggressive: 20,
  },
  ageDistribution: {
    under30: 25,
    "30-50": 45,
    "50-65": 25,
    over65: 5,
  },
};

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    investorId: "1",
    type: "buy",
    symbol: "AAPL",
    quantity: 50,
    price: 182.52,
    amount: 9126,
    fee: 9.95,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: "Purchased Apple shares",
    status: "completed",
  },
  {
    id: "2",
    investorId: "1",
    type: "deposit",
    amount: 5000,
    fee: 0,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    description: "Monthly investment deposit",
    status: "completed",
  },
];

// Mock news items
export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Fed Signals Potential Rate Cuts in 2024",
    summary:
      "Federal Reserve officials hint at possible interest rate reductions if inflation continues to cool.",
    source: "Financial Times",
    url: "#",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    relevantSymbols: ["SPY", "BND"],
    sentiment: "positive",
    impact: "high",
    category: "economic",
  },
  {
    id: "2",
    title: "Tech Earnings Season Shows Strong AI Adoption",
    summary:
      "Major technology companies report robust quarterly results driven by artificial intelligence investments.",
    source: "Reuters",
    url: "#",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    relevantSymbols: ["AAPL", "MSFT", "NVDA"],
    sentiment: "positive",
    impact: "medium",
    category: "sector",
  },
];
