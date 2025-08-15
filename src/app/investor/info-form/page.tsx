"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import PersonalInfoSection from "@/components/investor/PersonalInfoSection";
import FamilyDetailsSection from "@/components/investor/FamilyDetailsSection";
import NomineeInvestmentSection from "@/components/investor/NomineeInvestmentSection";
import IncomeDetailsSection from "@/components/investor/IncomeDetailsSection";
import ReviewSubmitSection from "@/components/investor/ReviewSubmitSection";

const initialPersonal = {
  name: "",
  placeOfBirth: "",
  dob: "",
  address: "",
  city: "",
  gender: "",
  status: "",
  pan: "",
  mobile: "",
  email: "",
  motherName: "",
  fatherName: "",
  residentialStatus: "",
  education: "",
  occupation: "",
  designation: "",
  annualIncome: "",
  nomineeName: "",
  nomineeRelation: "",
  nomineeDob: "",
  nomineeAadhar: "",
  nomineePassport: "",
  sipDate: "",
  netbanking: "",
  debitCard: "",
  smoker: "",
};

const initialSpouse = {
  spouseName: "",
  dob: "",
  pan: "",
  occupation: "",
};

const initialChild = {
  name: "",
  relation: "",
  dob: "",
  education: "",
};

const initialParent = {
  motherName: "",
  motherDob: "",
  fatherName: "",
  fatherDob: "",
};

const InvestorInfoForm = () => {
  const router = useRouter();
  const [personal, setPersonal] = useState(initialPersonal);
  const [spouse, setSpouse] = useState(initialSpouse);
  const [child1, setChild1] = useState(initialChild);
  const [child2, setChild2] = useState(initialChild);
  const [parent, setParent] = useState(initialParent);

  // Income state
  const [income, setIncome] = useState({
    selfMonthly: "",
    selfAnnual: "",
    spouseMonthly: "",
    spouseAnnual: "",
    otherMonthly: "",
    otherAnnual: "",
  });

  // Form state management
  const [currentStep, setCurrentStep] = useState(4);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveMessage, setSaveMessage] = useState("");

  // Calculate total income
  const totalMonthly = [
    income.selfMonthly,
    income.spouseMonthly,
    income.otherMonthly,
  ]
    .map((v) => parseFloat(v) || 0)
    .reduce((a, b) => a + b, 0);
  const totalAnnual = [
    income.selfAnnual,
    income.spouseAnnual,
    income.otherAnnual,
  ]
    .map((v) => parseFloat(v) || 0)
    .reduce((a, b) => a + b, 0);

  // Handlers
  const handleChange = (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (section === "personal") setPersonal({ ...personal, [name]: value });
    if (section === "spouse") setSpouse({ ...spouse, [name]: value });
    if (section === "child1") setChild1({ ...child1, [name]: value });
    if (section === "child2") setChild2({ ...child2, [name]: value });
    if (section === "parent") setParent({ ...parent, [name]: value });
    if (section === "income") setIncome({ ...income, [name]: value });
  };

  const handleToggleChange = (
    section: string,
    field: string,
    checked: boolean
  ) => {
    if (section === "personal") {
      setPersonal({ ...personal, [field]: checked ? "yes" : "no" });
    }
  };

  // Validation
  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!personal.name) newErrors.name = "Name is required";
    if (!personal.placeOfBirth)
      newErrors.placeOfBirth = "Place of birth is required";
    if (!personal.dob) newErrors.dob = "Date of birth is required";
    if (!personal.address) newErrors.address = "Address is required";
    if (!personal.city) newErrors.city = "City is required";
    if (!personal.gender) newErrors.gender = "Gender is required";
    if (!personal.status) newErrors.status = "Status is required";
    if (!personal.pan) {
      newErrors.pan = "PAN is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(personal.pan)) {
      newErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    }
    if (!personal.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(personal.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    if (!personal.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(personal.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step navigation
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validatePersonalInfo()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 4) {
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Save progress functionality
  const handleSaveProgress = async () => {
    setSaveMessage("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaveMessage("Your progress has been saved successfully!");
      setTimeout(() => setSaveMessage(""), 5000);
    } catch (error) {
      setSaveMessage("Failed to save progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePersonalInfo()) {
      setCurrentStep(1);
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (error) {
      setErrors({
        ...errors,
        form: "An error occurred while submitting the form. Please try again.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setSaveMessage("");
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 pb-10">
      {/* Header with Breadcrumb */}
      <header className="bg-[#0A2540] dark:bg-gray-950 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">Investor Profile</h1>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "New Application" },
            ]}
            className="mt-3"
          />
        </div>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stepper
          steps={[
            {
              label: "Personal Info",
              completed: currentStep > 1,
              current: currentStep === 1,
            },
            {
              label: "Family Details",
              completed: currentStep > 2,
              current: currentStep === 2,
            },
            {
              label: "Nominee & Investment",
              completed: currentStep > 3,
              current: currentStep === 3,
            },
            {
              label: "Income Details",
              completed: currentStep > 4,
              current: currentStep === 4,
            },
            {
              label: "Review & Submit",
              completed: false,
              current: currentStep === 5,
            },
          ]}
        />
        <form onSubmit={handleSubmit} className="mt-8">
          {currentStep === 1 && (
            <PersonalInfoSection
              personal={personal}
              errors={errors}
              handleChange={handleChange}
            />
          )}
          {currentStep === 2 && (
            <FamilyDetailsSection
              spouse={spouse}
              child1={child1}
              child2={child2}
              parent={parent}
              handleChange={handleChange}
            />
          )}
          {currentStep === 3 && (
            <NomineeInvestmentSection
              personal={personal}
              errors={errors}
              handleChange={handleChange}
              handleToggleChange={handleToggleChange}
            />
          )}
          {currentStep === 4 && (
            <IncomeDetailsSection
              income={income}
              handleChange={handleChange}
              totalMonthly={totalMonthly}
              totalAnnual={totalAnnual}
            />
          )}
          {currentStep === 5 && (
            <ReviewSubmitSection
              personal={personal}
              income={income}
              spouse={spouse}
              child1={child1}
              child2={child2}
              parent={parent}
            />
          )}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between">
            <Button
              type="button"
              onClick={handlePreviousStep}
              className="px-6 py-3 mb-3 md:mb-0 border-2 border-[#0A2540] dark:border-gray-600 text-[#0A2540] dark:text-white bg-transparent hover:bg-[#0A2540]/10 dark:hover:bg-gray-700"
              disabled={currentStep === 1 || loading}
            >
              Previous Step
            </Button>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleSaveProgress}
                className="px-6 py-3 border border-[#2D9CDB] dark:border-[#2D9CDB] text-[#2D9CDB] dark:text-[#2D9CDB] bg-transparent hover:bg-[#2D9CDB]/10 dark:hover:bg-[#2D9CDB]/20"
                disabled={loading}
              >
                Save Progress
              </Button>
              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-[#00B368] hover:bg-[#00A25D] text-white"
                  disabled={loading}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="px-6 py-3 bg-[#00B368] hover:bg-[#00A25D] text-white"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </form>
        {saveMessage && (
          <div className="mt-4 text-center text-[#00B368] font-medium">
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorInfoForm;
