import React from "react";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { FormSection } from "@/components/ui/FormSection";

interface NomineeInvestmentSectionProps {
  personal: {
    nomineeName: string;
    nomineeRelation: string;
    nomineeDob: string;
    nomineeAadhar: string;
    nomineePassport: string;
    sipDate: string;
    netbanking: string;
    debitCard: string;
    smoker: string;
  };
  errors: Record<string, string>;
  handleChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleToggleChange: (
    section: string,
    field: string,
    checked: boolean
  ) => void;
}

const NomineeInvestmentSection: React.FC<NomineeInvestmentSectionProps> = ({
  personal,
  errors,
  handleChange,
  handleToggleChange,
}) => {
  return (
    <FormSection
      title="Nominee & Investment Preferences"
      number={3}
      subtitle="Please provide details about your nominee and investment preferences."
    >
      <div className="space-y-8">
        {/* Nominee section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
          <h4 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-6">
            Nominee Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Input
              name="nomineeName"
              value={personal.nomineeName}
              onChange={(e) => handleChange("personal", e)}
              label="Nominee Name"
              error={errors.nomineeName}
              required
            />
            <Input
              name="nomineeRelation"
              value={personal.nomineeRelation}
              onChange={(e) => handleChange("personal", e)}
              label="Relationship with Investor"
              error={errors.nomineeRelation}
              required
            />
            <DatePicker
              name="nomineeDob"
              value={personal.nomineeDob}
              onChange={(e) => handleChange("personal", e)}
              label="Nominee Date of Birth"
              error={errors.nomineeDob}
              required
            />
            <Input
              name="nomineeAadhar"
              value={personal.nomineeAadhar}
              onChange={(e) => handleChange("personal", e)}
              label="Nominee Aadhar (last 4 digits)"
              error={errors.nomineeAadhar}
              required
              pattern="^\d{4}$"
              maxLength={4}
            />
            <Input
              name="nomineePassport"
              value={personal.nomineePassport}
              onChange={(e) => handleChange("personal", e)}
              label="Nominee Passport (NRIs only)"
              error={errors.nomineePassport}
              className="md:col-span-2"
            />
          </div>
        </div>
        {/* Investment preferences */}
        <div>
          <h4 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-6">
            Investment Preferences
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <DatePicker
              name="sipDate"
              value={personal.sipDate}
              onChange={(e) => handleChange("personal", e)}
              label="SIP Preferred Date"
              error={errors.sipDate}
              required
              helperText="Date of the month for your Systematic Investment Plan"
            />
            <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-6 my-2"></div>
            <div className="space-y-6 md:col-span-2">
              <ToggleSwitch
                name="netbanking"
                checked={personal.netbanking === "yes"}
                onChange={(e) =>
                  handleToggleChange("personal", "netbanking", e.target.checked)
                }
                label="Do you have netbanking login?"
                required
                helperText="Required for online account management"
              />
              <ToggleSwitch
                name="debitCard"
                checked={personal.debitCard === "yes"}
                onChange={(e) =>
                  handleToggleChange("personal", "debitCard", e.target.checked)
                }
                label="Do you have a debit card?"
                required
              />
              <ToggleSwitch
                name="smoker"
                checked={personal.smoker === "yes"}
                onChange={(e) =>
                  handleToggleChange("personal", "smoker", e.target.checked)
                }
                label="Are you a smoker?"
                required
                helperText="This information may be required for insurance policies"
              />
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default NomineeInvestmentSection;