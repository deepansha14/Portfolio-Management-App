// auth-utils.ts
// Utility functions for token refresh and authentication

// Define a global interface to extend Window
declare global {
  interface Window {
    tokenRefreshInterval?: number;
  }
}

/**
 * Refreshes the authentication token
 * @returns {Promise<boolean>} true if refresh was successful, false otherwise
 */
export async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
}

/**
 * Sets up an interval to refresh the token before it expires
 * Call this function after user login to ensure token refresh happens automatically
 */
export function setupTokenRefresh(): void {
  // Refresh token every 45 minutes (token expires after 1 hour)
  const REFRESH_INTERVAL = 45 * 60 * 1000; // 45 minutes in milliseconds

  if (typeof window !== "undefined") {
    // Clear any existing interval
    if (window.tokenRefreshInterval) {
      clearInterval(window.tokenRefreshInterval);
    }

    // Set up new interval
    window.tokenRefreshInterval = window.setInterval(async () => {
      const success = await refreshToken();
      if (!success) {
        // If refresh failed, redirect to login
        if (window.tokenRefreshInterval) {
          clearInterval(window.tokenRefreshInterval);
        }
        window.location.href = "/";
      }
    }, REFRESH_INTERVAL);
  }
}

/**
 * Clears the token refresh interval
 * Call this function when logging out
 */
export function clearTokenRefresh(): void {
  if (typeof window !== "undefined" && window.tokenRefreshInterval) {
    clearInterval(window.tokenRefreshInterval);
    window.tokenRefreshInterval = undefined;
  }
}
