import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { FormSection } from "@/components/ui/FormSection";

interface IncomeDetailsSectionProps {
  income: {
    selfMonthly: string;
    selfAnnual: string;
    spouseMonthly: string;
    spouseAnnual: string;
    otherMonthly: string;
    otherAnnual: string;
  };
  personal?: {
    claimingHRA?: string;
    [key: string]: any;
  };
  expenses?: {
    household: string;
    maid: string;
    bills: string;
    transport: string;
    childrenFee1: string;
    childrenFee2: string;
    rent: string;
    parentsContribution: string;
    miscellaneous: string;
    memberships: string;
    emi: string;
    insurance: string;
    others: string;
  };
  residual?: {
    buffer: string;
    others: string;
  };
  investments?: {
    shortTermSIP: string;
    longTermSIP: string;
  };
  bonuses?: Array<{amount: string, month: string}>;
  existingAssets?: Array<{
    assetType: string,
    currentValue: string,
    investorName: string
  }>;
  handleChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleToggleChange?: (
    section: string,
    field: string,
    checked: boolean
  ) => void;
  handleBonusChange?: (index: number, field: string, value: string) => void;
  handleAddBonus?: () => void;
  handleRemoveBonus?: (index: number) => void;
  handleExistingAssetChange?: (index: number, field: string, value: string) => void;
  handleAddAsset?: () => void;
  handleRemoveAsset?: (index: number) => void;
  totalMonthly: number;
  totalAnnual: number;
  totalExpenses?: number;
  errors?: Record<string, string>;
}

const IncomeDetailsSection: React.FC<IncomeDetailsSectionProps> = ({
  income,
  personal = { claimingHRA: "" },
  expenses = {
    household: "",
    maid: "",
    bills: "",
    transport: "",
    childrenFee1: "",
    childrenFee2: "",
    rent: "",
    parentsContribution: "",
    miscellaneous: "",
    memberships: "",
    emi: "",
    insurance: "",
    others: "",
  },
  residual = {
    buffer: "",
    others: "",
  },
  investments = {
    shortTermSIP: "",
    longTermSIP: "",
  },
  bonuses = [],
  existingAssets = [],
  handleChange,
  handleToggleChange = () => {},
  handleBonusChange = () => {},
  handleAddBonus = () => {},
  handleRemoveBonus = () => {},
  handleExistingAssetChange = () => {},
  handleAddAsset = () => {},
  handleRemoveAsset = () => {},
  totalMonthly,
  totalAnnual,
  totalExpenses = 0,
  errors: parentErrors = {},
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Combine parent errors with local validation errors
  const errors = { ...localErrors, ...parentErrors };

  const validateNumericInput = (e: React.ChangeEvent<HTMLInputElement>, section: string = "income") => {
    const { name, value } = e.target;
    
    // Clear local error if field is empty - parent will handle required validation
    if (!value) {
      setLocalErrors(prev => ({ ...prev, [name]: "" }));
      handleChange(section, e);
      return;
    }
    
    // Check if the value is a valid number
    if (!/^\d*\.?\d*$/.test(value)) {
      setLocalErrors(prev => ({ ...prev, [name]: "Please enter numbers only" }));
      return;
    }
    
    // If valid, clear any error and call the parent handler
    setLocalErrors(prev => ({ ...prev, [name]: "" }));
    handleChange(section, e);
  };
  
  // Helper function to validate bonus amount input
  const validateBonusAmount = (index: number, value: string) => {
    if (!value) {
      return value;
    }
    
    if (!/^\d*\.?\d*$/.test(value)) {
      return bonuses[index].amount; // Return original value if not a valid number
    }
    
    return value;
  };
  return (
    <>
      <FormSection
        title="Income Details"
        number={4}
        subtitle="Please provide your income details. Total income will be calculated automatically."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <Input
            name="selfMonthly"
            value={income.selfMonthly}
            onChange={(e) => validateNumericInput(e, "income")}
            label="Self Income (Monthly)"
            type="text"
            inputMode="decimal"
            min="0"
            required
            error={errors.selfMonthly}
          />
          <Input
            name="selfAnnual"
            value={income.selfAnnual}
            onChange={(e) => validateNumericInput(e, "income")}
            label="Self Income (Annual)"
            type="text"
            inputMode="decimal"
            min="0"
            required
            error={errors.selfAnnual}
          />
          <Input
            name="spouseMonthly"
            value={income.spouseMonthly}
            onChange={(e) => validateNumericInput(e, "income")}
            label="Spouse Income (Monthly)"
            type="text"
            inputMode="decimal"
            min="0"
            required
            error={errors.spouseMonthly}
          />
          <Input
            name="spouseAnnual"
            value={income.spouseAnnual}
            onChange={(e) => validateNumericInput(e, "income")}
            label="Spouse Income (Annual)"
            type="text"
            inputMode="decimal"
            min="0"
            required
            error={errors.spouseAnnual}
          />
          <Input
            name="otherMonthly"
            value={income.otherMonthly}
            onChange={(e) => validateNumericInput(e, "income")}
            label="Other Income (Monthly)"
            type="text"
            inputMode="decimal"
            min="0"
            required
            error={errors.otherMonthly}
          />
          <Input
            name="otherAnnual"
            value={income.otherAnnual}
            onChange={(e) => validateNumericInput(e, "income")}
            label="Other Income (Annual)"
            type="text"
            inputMode="decimal"
            min="0"
            required
            error={errors.otherAnnual}
          />
          <div className="md:col-span-2 mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div>
                <span className="font-semibold">Total Income (Monthly): </span>
                <span>
                  {totalMonthly.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="font-semibold">Total Income (Annual): </span>
                <span>
                  {totalAnnual.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Monthly Expenses"
        number={4.5}
        subtitle="Please provide your monthly expenses. The percentage will be calculated automatically."
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Monthly Expenses</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Amount</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">(%)</th>
              </tr>
            </thead>
            <tbody>
              <ExpenseRow 
                label="House Hold Expenses" 
                name="household" 
                value={expenses.household} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_household`]}
              />
              <ExpenseRow 
                label="Maid" 
                name="maid" 
                value={expenses.maid} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_maid`]}
              />
              <ExpenseRow 
                label="Bills (Ele,tele,water,paper,cable,Internet)" 
                name="bills" 
                value={expenses.bills} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_bills`]}
              />
              <ExpenseRow 
                label="Transport" 
                name="transport" 
                value={expenses.transport} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_transport`]}
              />
              <ExpenseRow 
                label="Children school fee 1" 
                name="childrenFee1" 
                value={expenses.childrenFee1} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_childrenFee1`]}
              />
              <ExpenseRow 
                label="Children school fee 2" 
                name="childrenFee2" 
                value={expenses.childrenFee2} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_childrenFee2`]}
              />
              <ExpenseRow 
                label="Rent" 
                name="rent" 
                value={expenses.rent} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_rent`]}
              />
              <ExpenseRow 
                label="Contribution to Parents" 
                name="parentsContribution" 
                value={expenses.parentsContribution} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_parentsContribution`]}
              />
              <ExpenseRow 
                label="Miscellaneous Expenses" 
                name="miscellaneous" 
                value={expenses.miscellaneous} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_miscellaneous`]}
              />
              <ExpenseRow 
                label="Any memberships (Gym, club etc)" 
                name="memberships" 
                value={expenses.memberships} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_memberships`]}
              />
              <ExpenseRow 
                label="EMI" 
                name="emi" 
                value={expenses.emi} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_emi`]}
              />
              <ExpenseRow 
                label="Insurance" 
                name="insurance" 
                value={expenses.insurance} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_insurance`]}
              />
              <ExpenseRow 
                label="Others" 
                name="others" 
                value={expenses.others} 
                onChange={(e) => validateNumericInput(e, "expenses")} 
                total={totalExpenses}
                error={errors[`expense_others`]}
              />
              <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">Total Expenses</td>
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">
                  {totalExpenses.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">100.00%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection
        title="Residual"
        number={4.75}
        subtitle="Monthly income after expenses"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Item</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Amount</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <td className="p-3 font-semibold">Residual (A-B)</td>
                <td className="p-3 font-semibold">
                  {(totalMonthly - totalExpenses).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
                <td className="p-3">Income minus expenses</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">Buffer</td>
                <td className="p-3">
                  <input
                    type="text"
                    name="buffer"
                    value={residual.buffer}
                    onChange={(e) => validateNumericInput(e, "residual")}
                    className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    inputMode="decimal"
                  />
                </td>
                <td className="p-3">Emergency fund</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">Others</td>
                <td className="p-3">
                  <input
                    type="text"
                    name="others"
                    value={residual.others}
                    onChange={(e) => validateNumericInput(e, "residual")}
                    className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    inputMode="decimal"
                  />
                </td>
                <td className="p-3">Other allocations</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">Available for Investment</td>
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">
                  {(totalMonthly - totalExpenses - (parseFloat(residual.buffer) || 0) - (parseFloat(residual.others) || 0)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">Amount available for investment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection
        title="Monthly Investments"
        number={4.8}
        subtitle="How you want to allocate your investments"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Investment Type</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Amount</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <td className="p-3 font-semibold">Monthly Investments can be done</td>
                <td className="p-3 font-semibold">
                  {(totalMonthly - totalExpenses - (parseFloat(residual.buffer) || 0) - (parseFloat(residual.others) || 0)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
                <td className="p-3">Total available for investments</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">Short term SIP (Term and Health Insurance...)</td>
                <td className="p-3">
                  <input
                    type="text"
                    name="shortTermSIP"
                    value={investments.shortTermSIP}
                    onChange={(e) => validateNumericInput(e, "investments")}
                    className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    inputMode="decimal"
                  />
                </td>
                <td className="p-3">Short-term investments</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">Long term SIP</td>
                <td className="p-3">
                  <input
                    type="text"
                    name="longTermSIP"
                    value={investments.longTermSIP}
                    onChange={(e) => validateNumericInput(e, "investments")}
                    className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    inputMode="decimal"
                  />
                </td>
                <td className="p-3">Long-term wealth creation</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">Total Investments</td>
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">
                  {((parseFloat(investments.shortTermSIP) || 0) + (parseFloat(investments.longTermSIP) || 0)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
                <td className="p-3 border-t border-blue-200 dark:border-blue-800">Sum of all investments</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection
        title="Bonus"
        number={4.9}
        subtitle="Add details of expected bonuses for the year"
      >
        <div className="overflow-x-auto">
          <ClientSideBonusTable 
            bonuses={bonuses}
            handleBonusChange={handleBonusChange}
            handleAddBonus={handleAddBonus}
            handleRemoveBonus={handleRemoveBonus}
          />
        </div>
      </FormSection>

      <FormSection
        title="Existing Assets"
        number={5}
        subtitle="Details of your current investments and assets"
      >
        <div className="overflow-x-auto">
          <ClientSideAssetsTable 
            existingAssets={existingAssets}
            handleExistingAssetChange={handleExistingAssetChange}
            handleAddAsset={handleAddAsset}
            handleRemoveAsset={handleRemoveAsset}
            errors={errors}
          />
        </div>
      </FormSection>

      <FormSection
        title="Additional Tax Information"
        number={5.1}
        subtitle="Information relevant for tax planning"
      >
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="font-medium">Claiming HRA?</span>
              <div className="ml-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="claimingHRA"
                    value="yes"
                    checked={(personal as any).claimingHRA === "yes"}
                    onChange={() => handleToggleChange && handleToggleChange("personal", "claimingHRA", true)}
                    className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6 cursor-pointer">
                  <input
                    type="radio"
                    name="claimingHRA"
                    value="no"
                    checked={(personal as any).claimingHRA === "no"}
                    onChange={() => handleToggleChange && handleToggleChange("personal", "claimingHRA", false)}
                    className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
                </label>
              </div>
            </div>
            <div>
              {errors.claimingHRA && <p className="text-sm text-red-500 error-message">{errors.claimingHRA}</p>}
            </div>
          </div>
        </div>
      </FormSection>
    </>
  );
};

// Helper component for expense rows
interface ExpenseRowProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  total: number;
  error?: string;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ label, name, value, onChange, total, error }) => {
  const amount = parseFloat(value) || 0;
  const percentage = total > 0 ? (amount / total * 100) : 0;
  
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="p-3">{label}</td>
      <td className="p-3">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-1.5 rounded-md border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                    bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          inputMode="decimal"
        />
        {error && <p className="text-xs text-red-500 mt-1 error-message">{error}</p>}
      </td>
      <td className="p-3">{percentage.toFixed(1)}%</td>
    </tr>
  );
};

export default IncomeDetailsSection;

// Client-side only component for bonus table
interface ClientSideBonusTableProps {
  bonuses: Array<{amount: string, month: string}>;
  handleBonusChange: (index: number, field: string, value: string) => void;
  handleAddBonus: () => void;
  handleRemoveBonus: (index: number) => void;
}

const ClientSideBonusTable: React.FC<ClientSideBonusTableProps> = ({ 
  bonuses, 
  handleBonusChange, 
  handleAddBonus, 
  handleRemoveBonus 
}) => {
  const [mounted, setMounted] = useState(false);
  
  // Only render the table client-side to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="py-4">Loading bonus table...</div>;
  }
  
  return (
    <table className="w-full border-collapse mb-6">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Bonus in Rs</th>
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Month</th>
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bonuses.map((bonus, index) => (
          <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3">
              <input
                type="text"
                value={bonus.amount}
                onChange={(e) => {
                  // Only allow numeric input
                  const value = e.target.value;
                  if (!value || /^\d*\.?\d*$/.test(value)) {
                    handleBonusChange(index, 'amount', value);
                  }
                }}
                className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                inputMode="decimal"
                placeholder="Enter amount"
              />
            </td>
            <td className="p-3">
              <select
                value={bonus.month}
                onChange={(e) => handleBonusChange(index, 'month', e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </td>
            <td className="p-3">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBonus(index)}
                  className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                  aria-label="Remove bonus entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={3} className="p-3">
            <button
              type="button"
              onClick={handleAddBonus}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Bonus
            </button>
          </td>
        </tr>
        <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
          <td className="p-3 border-t border-blue-200 dark:border-blue-800">Total Bonus</td>
          <td colSpan={2} className="p-3 border-t border-blue-200 dark:border-blue-800">
            {bonuses.reduce((total, bonus) => total + (parseFloat(bonus.amount) || 0), 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Client-side only component for existing assets table
interface ClientSideAssetsTableProps {
  existingAssets: Array<{
    assetType: string,
    currentValue: string,
    investorName: string
  }>;
  handleExistingAssetChange: (index: number, field: string, value: string) => void;
  handleAddAsset: () => void;
  handleRemoveAsset: (index: number) => void;
  errors?: Record<string, string>;
}

const ClientSideAssetsTable: React.FC<ClientSideAssetsTableProps> = ({ 
  existingAssets, 
  handleExistingAssetChange, 
  handleAddAsset, 
  handleRemoveAsset,
  errors = {}
}) => {
  const [mounted, setMounted] = useState(false);
  
  // Only render the table client-side to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="py-4">Loading assets table...</div>;
  }
  
  return (
    <table className="w-full border-collapse mb-6">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Sl no</th>
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Asset Details</th>
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Current Value</th>
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Name of the Investor</th>
          <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {existingAssets.map((asset, index) => (
          <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">
              <input
                type="text"
                value={asset.assetType}
                onChange={(e) => handleExistingAssetChange(index, 'assetType', e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter asset type"
              />
            </td>
            <td className="p-3">
              <input
                type="text"
                value={asset.currentValue}
                onChange={(e) => {
                  // Only allow numeric input
                  const value = e.target.value;
                  if (!value || /^\d*\.?\d*$/.test(value)) {
                    handleExistingAssetChange(index, 'currentValue', value);
                  }
                }}
                className={`w-full px-3 py-1.5 rounded-md border ${errors[`asset_${index}_value`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                          bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                inputMode="decimal"
                placeholder="0.00"
              />
              {errors[`asset_${index}_value`] && (
                <p className="text-xs text-red-500 mt-1 error-message">{errors[`asset_${index}_value`]}</p>
              )}
            </td>
            <td className="p-3">
              <input
                type="text"
                value={asset.investorName}
                onChange={(e) => handleExistingAssetChange(index, 'investorName', e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter investor name"
              />
            </td>
            <td className="p-3">
              {index > 3 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAsset(index)}
                  className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                  aria-label="Remove asset entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={5} className="p-3">
            <button
              type="button"
              onClick={handleAddAsset}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Asset
            </button>
          </td>
        </tr>
        <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
          <td className="p-3 border-t border-blue-200 dark:border-blue-800">Total Assets</td>
          <td colSpan={4} className="p-3 border-t border-blue-200 dark:border-blue-800">
            {existingAssets.reduce((total, asset) => total + (parseFloat(asset.currentValue) || 0), 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};