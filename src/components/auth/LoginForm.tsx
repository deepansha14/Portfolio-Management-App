import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  UserIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import routes from "@/lib/routes";

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [userType, setUserType] = useState<"admin" | "investor">(() => {
    if (typeof window !== "undefined") {
      const storedRole = sessionStorage.getItem("selectedRole");
      if (storedRole === "admin" || storedRole === "investor") {
        return storedRole;
      }
    }
    return "investor";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const selectedRole = userType;
      let loginEmail = email;
      let loginPassword = password;
      if (!loginEmail || !loginPassword) {
        if (selectedRole === "investor") {
          loginEmail = "investor@example.com";
          loginPassword = "demo123";
        } else if (selectedRole === "admin") {
          loginEmail = "advisor@portfoliomanager.com";
          loginPassword = "admin123";
        }
      }
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        setErrorMsg(error.error || "Invalid email or password");
        setLoading(false);
        return;
      }
      const userData = await response.json();
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: "/api/placeholder/32/32",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setLoading(false);
      if (selectedRole === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setErrorMsg("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push(routes.register);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 m-8">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {userType === "admin" ? "Advisor Login" : "Investor Login"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
            {userType === "admin"
              ? "Sign in to your advisor account to manage portfolios."
              : "Sign in to your investor account to view your investments."}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm flex items-center gap-2 shadow-sm"
              role="alert"
            >
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
              </svg>
              <span>{errorMsg}</span>
            </motion.div>
          )}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <UserIcon className="h-4 w-4 mr-1.5 text-gray-500" />
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  userType === "admin"
                    ? "advisor@portfoliomanager.com"
                    : "investor@example.com"
                }
                className="pl-10 bg-gray-50 dark:bg-gray-750 focus:bg-white"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-4 h-4 text-gray-400">@</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {userType === "admin"
                ? "Enter your advisor email address"
                : "Enter your registered email address"}
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-1.5 text-gray-500" />
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 bg-gray-50 dark:bg-gray-750 focus:bg-white"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-4 h-4 text-gray-400">🔒</div>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              For security, use a strong password
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember device
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className={`w-full py-2.5 mt-2 ${
              loading || !email || !password
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                : userType === "admin"
                ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }`}
            disabled={loading || !email || !password}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 mr-1.5 text-white" />
                {`Secure Sign in as ${
                  userType === "admin" ? "Advisor" : "Investor"
                }`}
              </div>
            )}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 text-gray-500 bg-white dark:bg-gray-800">
                Protected by bank-level security
              </span>
            </div>
          </div>
        </form>

        <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              onClick={navigateToRegister}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
            >
              Create Account
            </a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            By continuing, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
