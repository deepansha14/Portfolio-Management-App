import React from "react";
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
  handleChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  totalMonthly: number;
  totalAnnual: number;
}

const IncomeDetailsSection: React.FC<IncomeDetailsSectionProps> = ({
  income,
  handleChange,
  totalMonthly,
  totalAnnual,
}) => {
  return (
    <FormSection
      title="Income Details"
      number={4}
      subtitle="Please provide your income details. Total income will be calculated automatically."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Input
          name="selfMonthly"
          value={income.selfMonthly}
          onChange={(e) => handleChange("income", e)}
          label="Self Income (Monthly)"
          type="number"
          min="0"
          required
        />
        <Input
          name="selfAnnual"
          value={income.selfAnnual}
          onChange={(e) => handleChange("income", e)}
          label="Self Income (Annual)"
          type="number"
          min="0"
          required
        />
        <Input
          name="spouseMonthly"
          value={income.spouseMonthly}
          onChange={(e) => handleChange("income", e)}
          label="Spouse Income (Monthly)"
          type="number"
          min="0"
          required
        />
        <Input
          name="spouseAnnual"
          value={income.spouseAnnual}
          onChange={(e) => handleChange("income", e)}
          label="Spouse Income (Annual)"
          type="number"
          min="0"
          required
        />
        <Input
          name="otherMonthly"
          value={income.otherMonthly}
          onChange={(e) => handleChange("income", e)}
          label="Other Income (Monthly)"
          type="number"
          min="0"
          required
        />
        <Input
          name="otherAnnual"
          value={income.otherAnnual}
          onChange={(e) => handleChange("income", e)}
          label="Other Income (Annual)"
          type="number"
          min="0"
          required
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
  );
};

export default IncomeDetailsSection;