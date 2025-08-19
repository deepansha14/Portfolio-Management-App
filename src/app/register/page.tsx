"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ChartBarIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const router = useRouter();
  // TODO: Replace with actual role selection logic
  const [userType, setUserType] = useState("investor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    level: "Weak",
    progress: 0,
  });
  const [otpStep, setOtpStep] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // Firebase config from environment variables
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };
  // Only initialize once
  if (typeof window !== "undefined" && !(window as any)._firebaseInitialized) {
    initializeApp(firebaseConfig);
    (window as any)._firebaseInitialized = true;
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    let level = "Weak";
    let progress = 33;
    if (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^A-Za-z0-9]/.test(value)
    ) {
      level = "Strong";
      progress = 100;
    } else if (
      value.length >= 6 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value)
    ) {
      level = "Moderate";
      progress = 66;
    }
    setPasswordStrength({ level, progress });
  };

  function generateUserId() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Step 1: Send OTPs
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setLoading(true);
    setOtpError("");
    try {
      // Send OTP to email only
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      setLoading(false);
      if (result.success) {
        setOtpStep(true);
      } else {
        setOtpError(result.error || "Failed to send OTP");
      }
    } catch (err) {
      setLoading(false);
      setOtpError("Failed to send OTP. Please try again.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      setOtpLoading(false);
      if (result.success) {
        setOtpError(""); // Clear any previous errors
        // Show success message
        alert("OTP resent successfully!");
      } else {
        setOtpError(result.error || "Failed to resend OTP");
      }
    } catch (err) {
      setOtpLoading(false);
      setOtpError("Failed to resend OTP. Please try again.");
    }
  };

  // Step 2: Verify OTPs and register
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError("");
    // Verify email OTP only
    const emailRes = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, emailOtp }),
    });
    const emailResult = await emailRes.json();
    if (!emailResult.success) {
      setOtpLoading(false);
      setOtpError(emailResult.error || "Invalid email OTP");
      return;
    }
    // Register user
    try {
      const userId = generateUserId(); // Generate userId for the user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          name,
          email,
          password,
          userType,
        }),
      });
      const result = await res.json();
      setOtpLoading(false);
      if (result.success) {
        if (userType === "admin") {
          router.push("/admin/dashboard");
        } else if (userType === "investor") {
          router.push(`/investor/info-form?userId=${userId}`); // Redirect to input form with userId
        }
      } else {
        setOtpError(result.error || "Registration failed");
      }
    } catch (err) {
      setOtpLoading(false);
      setOtpError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 my-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Portfolio Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {otpStep ? "Verify OTP" : "Create a new account"}
            </p>
          </div>
          {!otpStep ? (
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* Show/hide password icon can go here */}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        passwordStrength.level === "Weak"
                          ? "bg-red-500"
                          : passwordStrength.level === "Moderate"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${passwordStrength.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                    Password Strength: {passwordStrength.level}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                {confirmPassword && confirmPassword !== password && (
                  <div className="text-sm text-red-500 mt-1">
                    Passwords do not match.
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                required
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </span>
            </div>
            {otpError && (
              <div className="text-sm text-red-500 mt-1">{otpError}</div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={
                loading ||
                !email ||
                !password ||
                !confirmPassword ||
                !name
              }
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  onClick={() => router.push(`/login?role=${userType}`)}
                  className="text-primary-600 hover:text-primary-500 cursor-pointer"
                >
                  Sign In
                </a>
              </p>
            </div>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've sent a 6-digit OTP to <strong>{email}</strong>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Email OTP
                </label>
                <Input
                  type="text"
                  value={emailOtp}
                  onChange={e => setEmailOtp(e.target.value)}
                  placeholder="Enter the 6-digit code"
                  maxLength={6}
                  required
                />
              </div>
              {otpError && (
                <div className="text-sm text-red-500 mt-1">{otpError}</div>
              )}
              <Button type="submit" className="w-full" disabled={otpLoading}>
                {otpLoading ? "Verifying..." : "Verify & Complete Registration"}
              </Button>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setOtpStep(false)}
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1" 
                  onClick={handleResendOtp}
                  disabled={otpLoading}
                >
                  Resend OTP
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
