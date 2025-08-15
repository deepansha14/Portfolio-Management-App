import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  User,
  Investor,
  DashboardMetrics,
  Theme,
  NotificationItem,
} from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface InvestorsState {
  investors: Investor[];
  selectedInvestor: Investor | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    search: string;
    status: string;
    riskLevel: string;
  };
  setInvestors: (investors: Investor[]) => void;
  setSelectedInvestor: (investor: Investor | null) => void;
  addInvestor: (investor: Investor) => void;
  updateInvestor: (id: string, updates: Partial<Investor>) => void;
  deleteInvestor: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<InvestorsState["filters"]>) => void;
  setPagination: (pagination: Partial<InvestorsState["pagination"]>) => void;
}

interface DashboardState {
  metrics: DashboardMetrics | null;
  loading: boolean;
  lastUpdated: Date | null;
  setMetrics: (metrics: DashboardMetrics) => void;
  setLoading: (loading: boolean) => void;
  refreshMetrics: () => Promise<void>;
}

interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  notifications: NotificationItem[];
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (
    notification: Omit<NotificationItem, "id" | "timestamp">
  ) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        login: async (email: string, password: string) => {
          try {
            const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              return false;
            }

            const userData = await response.json();

            const user: User = {
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
              avatar: userData.avatar || "https://via.placeholder.com/150",
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            set({ user, isAuthenticated: true });
            return true;
          } catch (error) {
            console.error("Login error:", error);
            return false;
          }
        },
        logout: async () => {
          try {
            // Call the logout API endpoint
            await fetch("/api/auth/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            // Import clearTokenRefresh dynamically to avoid SSR issues
            import("@/lib/auth-utils")
              .then(({ clearTokenRefresh }) => {
                // Clear token refresh interval
                clearTokenRefresh();

                // Clear local state regardless of API success/failure
                set({ user: null, isAuthenticated: false });

                // Redirect to home page
                window.location.href = "/";
              })
              .catch((err) => {
                console.error("Failed to import auth-utils:", err);
                // Still clear state and redirect even if import fails
                set({ user: null, isAuthenticated: false });
                window.location.href = "/";
              });
          }
        },
        setUser: (user: User) => {
          set({ user, isAuthenticated: true });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

// Investors Store
export const useInvestorsStore = create<InvestorsState>()(
  devtools((set, get) => ({
    investors: [],
    selectedInvestor: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
    filters: {
      search: "",
      status: "",
      riskLevel: "",
    },
    setInvestors: (investors) => set({ investors }),
    setSelectedInvestor: (investor) => set({ selectedInvestor: investor }),
    addInvestor: (investor) =>
      set((state) => ({ investors: [...state.investors, investor] })),
    updateInvestor: (id, updates) =>
      set((state) => ({
        investors: state.investors.map((inv) =>
          inv.id === id ? { ...inv, ...updates } : inv
        ),
        selectedInvestor:
          state.selectedInvestor?.id === id
            ? { ...state.selectedInvestor, ...updates }
            : state.selectedInvestor,
      })),
    deleteInvestor: (id) =>
      set((state) => ({
        investors: state.investors.filter((inv) => inv.id !== id),
        selectedInvestor:
          state.selectedInvestor?.id === id ? null : state.selectedInvestor,
      })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setFilters: (filters) =>
      set((state) => ({ filters: { ...state.filters, ...filters } })),
    setPagination: (pagination) =>
      set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  }))
);

// Dashboard Store
export const useDashboardStore = create<DashboardState>()(
  devtools((set, get) => ({
    metrics: null,
    loading: false,
    lastUpdated: null,
    setMetrics: (metrics) => set({ metrics, lastUpdated: new Date() }),
    setLoading: (loading) => set({ loading }),
    refreshMetrics: async () => {
      set({ loading: true });
      try {
        // Mock API call - replace with real API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Set mock metrics here
        set({ loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }))
);

// UI Store
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "light",
        sidebarCollapsed: false,
        notifications: [],
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
        toggleSidebar: () =>
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              {
                ...notification,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date(),
                read: false,
              },
              ...state.notifications,
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
        markNotificationAsRead: (id) =>
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
          })),
        clearAllNotifications: () => set({ notifications: [] }),
      }),
      {
        name: "ui-storage",
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
        }),
      }
    )
  )
);
