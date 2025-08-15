"use client";

import { useRouter } from "next/navigation";

export function SimpleRoleSelection() {
  const router = useRouter();

  const handleRoleSelect = (role: "investor" | "admin") => {
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Portfolio Management App</h1>
      <p className="text-xl mb-12">Select your role to continue</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
          <h2 className="text-2xl font-bold mb-4">Investor</h2>
          <p className="mb-8 text-slate-300">
            Access your investment portfolio, track performance, and make
            informed decisions.
          </p>
          <button
            onClick={() => handleRoleSelect("investor")}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium"
          >
            Continue as Investor
          </button>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition-all">
          <h2 className="text-2xl font-bold mb-4">Administrator</h2>
          <p className="mb-8 text-slate-300">
            Manage users, monitor platform activity, and access reporting tools.
          </p>
          <button
            onClick={() => handleRoleSelect("admin")}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium"
          >
            Continue as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
