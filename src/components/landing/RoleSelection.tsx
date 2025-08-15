"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  BuildingOfficeIcon,
  UserCircleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"investor" | "admin" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: "investor" | "admin") => {
    setSelectedRole(role);
    setIsLoading(true);

    // Small delay for animation
    setTimeout(() => {
      router.push(`/login?role=${role}`);
    }, 1000);
  };

  const RoleCard = ({
    role,
    title,
    description,
    icon: Icon,
    gradientFrom,
    gradientTo,
    delay = 0,
  }: {
    role: "investor" | "admin";
    title: string;
    description: string;
    icon: React.ElementType;
    gradientFrom: string;
    gradientTo: string;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full h-full"
    >
      <motion.div
        whileHover={{
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        className="h-full flex flex-col bg-white/8 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/30"
      >
        {/* Card header with gradient */}
        <div
          className="h-3 w-full"
          style={{
            background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
          }}
        ></div>

        <div className="p-8 flex-1 flex flex-col relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M37.9,-65.1C47.7,-53.9,53.4,-40.8,61.3,-28.1C69.1,-15.4,79.1,-3.2,79.3,9.5C79.5,22.2,69.9,35.4,58.4,44.1C47,52.8,33.6,57,19.8,61.7C6,66.5,-8.3,71.7,-22.6,70.8C-36.9,69.9,-51.1,62.8,-59.3,51.3C-67.4,39.8,-69.4,23.9,-71.2,8.1C-73,-7.8,-74.6,-23.5,-68.1,-35.2C-61.7,-46.9,-47.1,-54.4,-33.7,-63.6C-20.3,-72.7,-8.1,-83.4,3.4,-88.7C14.9,-94,29.7,-94,37.9,-65.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          {/* Icon with enhanced visibility */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 shadow-lg border border-white/10">
            <Icon
              className={`w-8 h-8 ${gradientFrom.replace(
                "from-",
                "text-"
              )} drop-shadow-lg`}
            />
          </div>

          {/* Content with better visual hierarchy */}
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <div className="mb-2 inline-flex items-center">
            <span
              className={`px-2.5 py-0.5 text-xs rounded-full ${
                role === "investor"
                  ? "bg-blue-100/10 text-blue-300"
                  : "bg-purple-100/10 text-purple-300"
              }`}
            >
              {role === "investor" ? "Personal Portal" : "Management Access"}
            </span>
          </div>
          <p className="text-slate-300/90 text-sm leading-relaxed mb-8 flex-1">
            {description}
          </p>

          {/* Features list */}
          <div className="space-y-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-xs text-slate-300/80">
                  {role === "investor"
                    ? [
                        "View your portfolio",
                        "Track investments",
                        "Set financial goals",
                      ][i - 1]
                    : [
                        "Manage client accounts",
                        "Review portfolios",
                        "Generate reports",
                      ][i - 1]}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced button with better affordance */}
          <Button
            onClick={() => handleRoleSelect(role)}
            className={`group w-full mt-auto py-4 px-6 rounded-xl font-medium transition-all duration-300 shadow-xl`}
            style={{
              background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
              boxShadow: `0 8px 20px -5px ${gradientFrom
                .replace("from-", "")
                .replace("5", "300")}60`,
            }}
            disabled={isLoading}
          >
            <span className="relative z-10 flex items-center justify-between w-full">
              <span className="flex items-center">
                <span className="mr-1.5">
                  {role === "investor" ? "👤" : "🛡️"}
                </span>
                <span>Continue as {role}</span>
              </span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 transition-all">
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </span>
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-slate-950 text-white p-4 sm:p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute -top-1/3 -right-1/4 w-full h-full bg-gradient-to-r from-blue-600/10 to-transparent rounded-full mix-blend-soft-light blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute -bottom-1/3 -left-1/4 w-full h-full bg-gradient-to-r from-purple-600/10 to-transparent rounded-full mix-blend-soft-light blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        ></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTE4IDQ4YzkuOTQgMCAxOC04LjA2IDE4LTE4aC02YzAgNi42MjctNS4zNzMgMTItMTIgMTJ2NnptLTEyLTY2YTYgNiAwIDEgMCAwIDEyIDYgNiAwIDAgMCAwLTEyem0wIDMwYTYgNiAwIDEgMCAwIDEyIDYgNiAwIDAgMCAwLTEyem0wIDMwYTYgNiAwIDEgMCAwIDEyIDYgNiAwIDAgMCAwLTEyem0zMC0zMGE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnptMzAgMGE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnptMC0zMGE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnoiIGZpbGw9IiNmZmZmZmYwNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced Header with financial brand identity */}
        <header className="text-center pt-12 pb-20">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-3 mb-8 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
          >
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1">
              <ShieldCheckIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-white mr-3">
                Bank-grade Security
              </span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
          >
            <span className="text-white drop-shadow-md">WeathWise</span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent ml-2 relative">
              Pro
              <span className="absolute top-0 -right-6 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-0.5 rounded-md uppercase tracking-wide font-normal">
                New
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Advanced financial analytics and portfolio management
            <span className="block mt-4 text-slate-400 text-lg">
              <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-md mr-2 border border-blue-500/20">
                Real-time data
              </span>
              <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-md mr-2 border border-purple-500/20">
                Custom strategies
              </span>
              <span className="inline-block px-2 py-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-md border border-emerald-500/20">
                Smart insights
              </span>
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-blue-300/90 mt-8 font-medium"
          >
            Continue by selecting your account type:
          </motion.p>
        </header>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && selectedRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mx-4"
              >
                <div className="w-16 h-16 mx-auto mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-full h-full"
                  >
                    <ArrowPathIcon className="w-full h-full text-blue-600" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Preparing your {selectedRole} dashboard
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Please wait while we securely log you in...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Role Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-700/10 rounded-full blur-xl"></div>

            <RoleCard
              role="investor"
              title="Personal Investor"
              description="Monitor your investments, track performance metrics, and optimize your portfolio with AI-powered recommendations."
              icon={UserCircleIcon}
              gradientFrom="from-blue-600"
              gradientTo="to-indigo-600"
              delay={0.2}
            />
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-700/10 rounded-full blur-xl"></div>

            <RoleCard
              role="admin"
              title="Wealth Advisor"
              description="Manage client portfolios, access advanced analytics, and leverage powerful tools for financial planning and reporting."
              icon={BuildingOfficeIcon}
              gradientFrom="from-violet-600"
              gradientTo="to-purple-600"
              delay={0.3}
            />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center mt-12 mb-6 space-x-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center text-slate-400 text-sm"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            256-bit Encryption
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center text-slate-400 text-sm"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            SOC 2 Compliant
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center text-slate-400 text-sm"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            GDPR Compliant
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: ShieldCheckIcon,
              title: "Bank-level Security",
              description:
                "Your data is protected with 256-bit encryption and multi-factor authentication.",
              gradient: "from-emerald-400 to-cyan-400",
            },
            {
              icon: ChartBarIcon,
              title: "Real-time Analytics",
              description:
                "Make informed decisions with up-to-the-minute market data and performance metrics.",
              gradient: "from-blue-400 to-indigo-400",
            },
            {
              icon: UserCircleIcon,
              title: "Dedicated Support",
              description:
                "Our team is available 24/7 to assist you with any questions or concerns.",
              gradient: "from-purple-400 to-pink-400",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl p-0.5"
              style={{
                background: `linear-gradient(135deg, ${feature.gradient
                  .split(" ")[0]
                  .replace("from-", "")}30, ${feature.gradient
                  .split(" ")
                  .slice(-1)[0]
                  .replace("to-", "")}30)`,
              }}
            >
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-[15px] h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${
                      feature.gradient.split(" ")[0]
                    }, ${feature.gradient.split(" ")[2]})`,
                  }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-300/90 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 pb-12 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <span className="hidden sm:block text-slate-600">•</span>
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:block text-slate-600">•</span>
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Security
            </a>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} PortfolioPro. All rights reserved.
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Need help?{" "}
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
