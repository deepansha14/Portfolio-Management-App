"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import PersonalInfoSection from "@/components/investor/PersonalInfoSection";
import FamilyDetailsSection from "@/components/investor/FamilyDetailsSection";
import NomineeInvestmentSection from "@/components/investor/NomineeInvestmentSection";
import IncomeDetailsSection from "@/components/investor/IncomeDetailsSection";
import RequirementDetailsSection from "../../../components/investor/RequirementDetailsSection";
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
  claimingHRA: "",
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
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
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
  
  // Expenses state
  const [expenses, setExpenses] = useState({
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
  });
  
  // Residual state
  const [residual, setResidual] = useState({
    buffer: "",
    others: "",
  });
  
  // Investments state
  const [investments, setInvestments] = useState({
    shortTermSIP: "",
    longTermSIP: "",
  });
  
  // Bonuses state
  const [bonuses, setBonuses] = useState<Array<{amount: string, month: string}>>([]);
  
  // Existing assets state
  const [existingAssets, setExistingAssets] = useState<Array<{
    assetType: string,
    currentValue: string,
    investorName: string
  }>>([]);
  
  // Detailed assets state
  const [detailedAssets, setDetailedAssets] = useState<Array<{
    assetType: string,
    srNo: number,
    assetDetails: string,
    currentValue: string,
    monthlyYearlyContribution: string,
    assetInTheNameOf: string,
    taggingTo: string,
    retainInRespectiveAccount: string,
    investingInAssortedMF: string,
    investingInDebtMF: string
  }>>([]);
  
  // Requirement details state
  const [requirements, setRequirements] = useState({
    shortTerm: "",
    midTerm: "",
    longTerm: "",
    riskAppetite: "",
    preferredInvestments: "",
    additionalInfo: ""
  });
  
    // Load saved progress functionality
  const loadSavedProgress = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/investor/get-progress?userId=${userId}`);
      const result = await response.json();

      if (result.success && result.data) {
        const savedData = result.data;
        
        // Restore form data
        if (savedData.personalInfo) {
          setPersonal(prev => ({ ...prev, ...savedData.personalInfo }));
        }
        
        if (savedData.familyDetails) {
          if (savedData.familyDetails.spouse) setSpouse(savedData.familyDetails.spouse);
          if (savedData.familyDetails.child1) setChild1(savedData.familyDetails.child1);
          if (savedData.familyDetails.child2) setChild2(savedData.familyDetails.child2);
          if (savedData.familyDetails.parent) setParent(savedData.familyDetails.parent);
        }
        
        if (savedData.incomeDetails) setIncome(savedData.incomeDetails);
        if (savedData.expenses) setExpenses(savedData.expenses);
        if (savedData.residual) setResidual(savedData.residual);
        if (savedData.investments) setInvestments(savedData.investments);
        if (savedData.bonuses) setBonuses(savedData.bonuses);
        if (savedData.existingAssets) setExistingAssets(savedData.existingAssets);
        
        // Restore current step
        if (savedData.currentStep && savedData.currentStep > 1) {
          setCurrentStep(savedData.currentStep);
        }
        
        // Set last saved time
        if (savedData.updatedAt) {
          setLastSaved(new Date(savedData.updatedAt).toLocaleString());
        }
        
        console.log("[DEBUG] Loaded saved progress for userId:", userId);
      }
    } catch (error) {
      console.error("[DEBUG] Failed to load saved progress:", error);
      // Don't show error to user, just continue with empty form
    }
  };

  // Initialize client-side only states
  useEffect(() => {
    // Check if userId is available
    if (!userId) {
      setErrors({
        ...errors,
        form: "User ID not found. Please try logging in again.",
      });
      return;
    }

    // Load saved progress if available
    loadSavedProgress();

    // Initialize bonuses if empty
    if (bonuses.length === 0) {
      setBonuses([{ amount: "", month: "" }]);
    }

    // Initialize existing assets if empty
    if (existingAssets.length === 0) {
      setExistingAssets([{ assetType: "", currentValue: "", investorName: "" }]);
    }

    // Initialize detailed assets if empty
    if (detailedAssets.length === 0) {
      setDetailedAssets([{
        assetType: "",
        srNo: 1,
        assetDetails: "",
        currentValue: "",
        monthlyYearlyContribution: "",
        assetInTheNameOf: "",
        taggingTo: "",
        retainInRespectiveAccount: "0",
        investingInAssortedMF: "0",
        investingInDebtMF: "0"
      }]);
    }
  }, [userId]);

  // Form state management
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveMessage, setSaveMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

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
    
  // Calculate total expenses
  const totalExpenses = Object.values(expenses)
    .map((v) => parseFloat(v) || 0)
    .reduce((a, b) => a + b, 0);

  // Handlers
  const handleChange = (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (section === "personal") setPersonal({ ...personal, [name]: value });
    if (section === "spouse") setSpouse({ ...spouse, [name]: value });
    if (section === "child1") setChild1({ ...child1, [name]: value });
    if (section === "child2") setChild2({ ...child2, [name]: value });
    if (section === "parent") setParent({ ...parent, [name]: value });
    if (section === "income") setIncome({ ...income, [name]: value });
    if (section === "expenses") setExpenses({ ...expenses, [name]: value });
    if (section === "residual") setResidual({ ...residual, [name]: value });
    if (section === "investments") setInvestments({ ...investments, [name]: value });
    if (section === "requirements") setRequirements({ ...requirements, [name]: value });
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
  
  // Handle bonus changes
  const handleBonusChange = (index: number, field: string, value: string) => {
    const updatedBonuses = [...bonuses];
    updatedBonuses[index] = { ...updatedBonuses[index], [field]: value };
    setBonuses(updatedBonuses);
  };
  
  // Add new bonus entry
  const handleAddBonus = () => {
    setBonuses([...bonuses, { amount: "", month: "" }]);
  };
  
  // Remove bonus entry
  const handleRemoveBonus = (index: number) => {
    if (bonuses.length > 1) {
      const updatedBonuses = [...bonuses];
      updatedBonuses.splice(index, 1);
      setBonuses(updatedBonuses);
    }
  };
  
  // Handle existing asset changes
  const handleExistingAssetChange = (index: number, field: string, value: string) => {
    const updatedAssets = [...existingAssets];
    updatedAssets[index] = { ...updatedAssets[index], [field]: value };
    setExistingAssets(updatedAssets);
  };
  
  // Add new asset entry
  const handleAddAsset = () => {
    setExistingAssets([...existingAssets, { assetType: "", currentValue: "", investorName: "" }]);
  };
  
  // Remove asset entry
  const handleRemoveAsset = (index: number) => {
    if (existingAssets.length > 1) {
      const updatedAssets = [...existingAssets];
      updatedAssets.splice(index, 1);
      setExistingAssets(updatedAssets);
    }
  };
  
  // Handle detailed asset changes
  const handleDetailedAssetChange = (index: number, field: string, value: string | boolean | number) => {
    const updatedAssets = [...detailedAssets];
    updatedAssets[index] = { ...updatedAssets[index], [field]: value };
    setDetailedAssets(updatedAssets);
  };
  
  // Add new detailed asset entry
  const handleAddDetailedAsset = (assetType: string) => {
    // Find the highest srNo across all asset types
    const maxSrNo = detailedAssets.length > 0
      ? Math.max(...detailedAssets.map(asset => asset.srNo))
      : 0;
    
    // Add new asset with the next sequential number
    setDetailedAssets([...detailedAssets, { 
      assetType, 
      srNo: maxSrNo + 1, 
      assetDetails: "", 
      currentValue: "", 
      monthlyYearlyContribution: "", 
      assetInTheNameOf: "", 
      taggingTo: "", 
      retainInRespectiveAccount: "0", 
      investingInAssortedMF: "0", 
      investingInDebtMF: "0" 
    }]);
  };
  
  // Remove detailed asset entry
  const handleRemoveDetailedAsset = (index: number) => {
    const updatedAssets = [...detailedAssets];
    
    // Get the srNo of the asset being removed
    const removedSrNo = updatedAssets[index].srNo;
    
    // Remove the asset
    updatedAssets.splice(index, 1);
    
    // Renumber all assets with higher srNo values
    updatedAssets.forEach(asset => {
      if (asset.srNo > removedSrNo) {
        asset.srNo -= 1;
      }
    });
    
    setDetailedAssets(updatedAssets);
  };

  // Validation
  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    const isEmpty = (value: any) => value === null || value === undefined || value === "";

    // Only validate the current step's fields
    if (currentStep === 1) {
      // Validate personal info fields
      Object.entries(personal).forEach(([key, value]) => {
        // Skip fields that are not part of personal info section
        if (['nomineeName', 'nomineeRelation', 'nomineeDob', 'nomineeAadhar', 
             'nomineePassport', 'sipDate', 'netbanking', 'debitCard', 'smoker'].includes(key)) {
          return;
        }
        if (isEmpty(value)) newErrors[key] = `${key} is required`;
      });

      // Validate format for specific fields if they have values
      if (personal.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(personal.pan)) {
        newErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
      }
      if (personal.mobile && !/^[6-9]\d{9}$/.test(personal.mobile)) {
        newErrors.mobile = "Invalid mobile number";
      }
      if (personal.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(personal.email)) {
        newErrors.email = "Invalid email format";
      }
    } else if (currentStep === 2) {
      // Family details are optional, only validate format if values are provided
      // Validate PAN format for spouse if provided
      if (spouse.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(spouse.pan)) {
        newErrors.spouse_pan = "Invalid PAN format (e.g. ABCDE1234F)";
      }
    } else if (currentStep === 3) {
      // Validate nominee fields
      ['nomineeName', 'nomineeRelation', 'nomineeDob', 'nomineeAadhar', 
       'nomineePassport', 'sipDate'].forEach(key => {
        if (isEmpty(personal[key as keyof typeof personal])) {
          newErrors[key] = `${key} is required`;
        }
      });
    } else if (currentStep === 4) {
      // Validate income fields - all are required
      Object.entries(income).forEach(([key, value]) => {
        if (isEmpty(value)) {
          newErrors[key] = `This field is required`;
        } else if (!/^\d*\.?\d*$/.test(value)) {
          // Double-check numeric format
          newErrors[key] = "Please enter numbers only";
        }
      });
      
      // Validate expense fields - only validate numeric format if values are provided
      Object.entries(expenses).forEach(([key, value]) => {
        if (value && !/^\d*\.?\d*$/.test(value)) {
          newErrors[`expense_${key}`] = "Please enter numbers only";
        }
      });
      
      // Validate bonus amounts - check numeric format
      bonuses.forEach((bonus, index) => {
        if (bonus.amount && !/^\d*\.?\d*$/.test(bonus.amount)) {
          newErrors[`bonus_${index}_amount`] = "Please enter numbers only";
        }
      });
      
      // Validate existing assets - check numeric format for current value
      existingAssets.forEach((asset, index) => {
        if (asset.currentValue && !/^\d*\.?\d*$/.test(asset.currentValue)) {
          newErrors[`asset_${index}_value`] = "Please enter numbers only";
        }
      });
      
      // Validate detailed assets - check numeric format for values
      detailedAssets.forEach((asset, index) => {
        if (asset.currentValue && !/^\d*\.?\d*$/.test(asset.currentValue)) {
          newErrors[`detailed_asset_${index}_value`] = "Please enter numbers only";
        }
        if (asset.monthlyYearlyContribution && !/^\d*\.?\d*$/.test(asset.monthlyYearlyContribution)) {
          newErrors[`detailed_asset_${index}_contribution`] = "Please enter numbers only";
        }
        // Validate the monetary fields
        if (asset.retainInRespectiveAccount && !/^\d*\.?\d*$/.test(asset.retainInRespectiveAccount)) {
          newErrors[`detailed_asset_${index}_retain`] = "Please enter numbers only";
        }
        if (asset.investingInAssortedMF && !/^\d*\.?\d*$/.test(asset.investingInAssortedMF)) {
          newErrors[`detailed_asset_${index}_assorted`] = "Please enter numbers only";
        }
        if (asset.investingInDebtMF && !/^\d*\.?\d*$/.test(asset.investingInDebtMF)) {
          newErrors[`detailed_asset_${index}_debt`] = "Please enter numbers only";
        }
      });
      
      // Validate claiming HRA
      if (isEmpty(personal.claimingHRA)) {
        newErrors.claimingHRA = "Please select Yes or No";
      }
    } else if (currentStep === 5) {
      // Validate requirement details
      if (isEmpty(requirements.shortTerm)) {
        newErrors.shortTerm = "Short term goals are required";
      }
      if (isEmpty(requirements.midTerm)) {
        newErrors.midTerm = "Mid term goals are required";
      }
      if (isEmpty(requirements.longTerm)) {
        newErrors.longTerm = "Long term goals are required";
      }
      if (isEmpty(requirements.riskAppetite)) {
        newErrors.riskAppetite = "Risk appetite is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step navigation
  const handleNextStep = () => {
    console.log("[DEBUG] Attempting to move to next step from step:", currentStep);
    console.log("[DEBUG] Current form data:", { personal, spouse, child1, child2, parent, income });
    
    // TEMPORARILY: Allow moving to next step without strict validation for testing
    console.log("[DEBUG] Bypassing validation for testing - allowing next step");
    
    // Clear any previous errors
    setErrors({});
    
    // Move to next step
    const nextStep = currentStep + 1;
    console.log("[DEBUG] Moving from step", currentStep, "to step", nextStep);
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // TODO: Re-enable validation after testing
    /*
    // Basic validation for the current step
    let canProceed = true;
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      // For personal info, only require essential fields
      console.log("[DEBUG] Validating step 1 - personal info");
      console.log("[DEBUG] Name:", personal.name, "Email:", personal.email, "Mobile:", personal.mobile);
      if (!personal.name || !personal.email || !personal.mobile) {
        newErrors.form = "Please fill in at least your name, email, and mobile number to continue.";
        canProceed = false;
      }
    } else if (currentStep === 2) {
      // Family details are optional, can proceed
      console.log("[DEBUG] Family details step - proceeding");
    } else if (currentStep === 3) {
      // Nominee details are optional, can proceed
      console.log("[DEBUG] Nominee details step - proceeding");
    } else if (currentStep === 4) {
      // Income details - basic validation
      console.log("[DEBUG] Validating step 4 - income details");
      console.log("[DEBUG] Self monthly:", income.selfMonthly, "Self annual:", income.selfAnnual);
      if (!income.selfMonthly || !income.selfAnnual) {
        newErrors.form = "Please fill in at least your monthly and annual income to continue.";
        canProceed = false;
      }
    } else if (currentStep === 5) {
      // Requirement details are optional, can proceed
      console.log("[DEBUG] Requirement details step - proceeding");
    }

    if (!canProceed) {
      setErrors(newErrors);
      console.log("[DEBUG] Validation failed, cannot proceed to next step");
      console.log("[DEBUG] Errors:", newErrors);
      // Scroll to error message
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Clear any previous errors
    setErrors({});
    
    // If validation passes, move to next step
    const nextStep = currentStep + 1;
    console.log("[DEBUG] Moving from step", currentStep, "to step", nextStep);
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
    */
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Save progress functionality
  const handleSaveProgress = async () => {
    // Check if userId is available
    if (!userId) {
      setSaveMessage("User ID not found. Please try logging in again.");
      return;
    }

    setSaveMessage("");
    setLoading(true);
    
    try {
      // Prepare investor data for the current progress
      const investorData = {
        personal: {
          ...personal,
          // Add family members info to personal data
          spouse: spouse,
          child1: child1,
          child2: child2,
          parent: parent
        },
        family: {
          spouse: spouse,
          child1: child1,
          child2: child2,
          parent: parent
        },
        nominee: {
          nomineeName: personal.nomineeName,
          nomineeRelation: personal.nomineeRelation,
          nomineeDob: personal.nomineeDob,
          nomineeAadhar: personal.nomineeAadhar,
          nomineePassport: personal.nomineePassport,
          sipDate: personal.sipDate
        },
        income: income,
        expenses: expenses,
        residual: residual,
        investments: investments,
        bonuses: bonuses,
        existingAssets: existingAssets
      };

      // Save progress to DynamoDB
      const response = await fetch("/api/investor/save-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          investorData: investorData,
          currentStep: currentStep
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save progress");
      }

      console.log("[DEBUG] Progress saved successfully for userId:", userId, "at step:", currentStep);
      
      // Show success message
      setSaveMessage("Your progress has been saved successfully!");
      setLastSaved(new Date().toLocaleString());
      setTimeout(() => setSaveMessage(""), 5000);
      
    } catch (error: any) {
      console.error("[DEBUG] Failed to save progress:", error);
      setSaveMessage("Failed to save progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if userId is available
    if (!userId) {
      setErrors({
        ...errors,
        form: "User ID not found. Please try logging in again.",
      });
      return;
    }
    
    // Validate only the current step
    if (!validatePersonalInfo()) {
      return;
    }
    
    setLoading(true);
    try {
      // Prepare investor data (excluding requirement details as requested)
      const investorData = {
        personal: {
          ...personal,
          // Add family members info to personal data
          spouse: spouse,
          child1: child1,
          child2: child2,
          parent: parent
        },
        family: {
          spouse: spouse,
          child1: child1,
          child2: child2,
          parent: parent
        },
        nominee: {
          nomineeName: personal.nomineeName,
          nomineeRelation: personal.nomineeRelation,
          nomineeDob: personal.nomineeDob,
          nomineeAadhar: personal.nomineeAadhar,
          nomineePassport: personal.nomineePassport,
          sipDate: personal.sipDate
        },
        income: income,
        expenses: expenses,
        residual: residual,
        investments: investments,
        bonuses: bonuses,
        existingAssets: existingAssets
      };

      // Save to DynamoDB
      const response = await fetch("/api/investor/save-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          investorData: investorData
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save investor details");
      }

      console.log("[DEBUG] Investor details saved successfully for userId:", userId);
      
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error("[DEBUG] Failed to save investor details:", error);
      setErrors({
        ...errors,
        form: error.message || "An error occurred while submitting the form. Please try again.",
      });
    } finally {
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
              label: "Requirement Details",
              completed: currentStep > 5,
              current: currentStep === 5,
            },
            {
              label: "Review & Submit",
              completed: false,
              current: currentStep === 6,
            },
          ]}
        />
        
        {/* Error Display */}
        {errors.form && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{errors.form}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Debug Info - Remove this after testing */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Debug Info:</strong> Current Step: {currentStep} | 
            Name: {personal.name || 'Not filled'} | 
            Email: {personal.email || 'Not filled'} | 
            Mobile: {personal.mobile || 'Not filled'}
          </p>
          <button 
            type="button"
            onClick={() => {
              setPersonal(prev => ({ ...prev, name: 'Test User', email: 'test@example.com', mobile: '9876543210' }));
              console.log('[DEBUG] Manually updated form data');
            }}
            className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
          >
            Fill Test Data
          </button>
        </div>
        
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
              personal={personal}
              expenses={expenses}
              residual={residual}
              investments={investments}
              bonuses={bonuses}
              existingAssets={existingAssets}
              handleChange={handleChange}
              handleToggleChange={handleToggleChange}
              handleBonusChange={handleBonusChange}
              handleAddBonus={handleAddBonus}
              handleRemoveBonus={handleRemoveBonus}
              handleExistingAssetChange={handleExistingAssetChange}
              handleAddAsset={handleAddAsset}
              handleRemoveAsset={handleRemoveAsset}
              totalMonthly={totalMonthly}
              totalAnnual={totalAnnual}
              totalExpenses={totalExpenses}
              errors={errors}
            />
          )}
          {currentStep === 5 && (
            <RequirementDetailsSection
              requirements={requirements}
              detailedAssets={detailedAssets}
              handleChange={handleChange}
              handleDetailedAssetChange={handleDetailedAssetChange}
              handleAddDetailedAsset={handleAddDetailedAsset}
              handleRemoveDetailedAsset={handleRemoveDetailedAsset}
              errors={errors}
            />
          )}
          {currentStep === 6 && (
            <ReviewSubmitSection
              personal={personal}
              income={income}
              spouse={spouse}
              child1={child1}
              child2={child2}
              parent={parent}
              requirements={requirements}
              detailedAssets={detailedAssets}
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
                {loading ? "Saving..." : "Save Progress"}
              </Button>
              {lastSaved && (
                <p className="text-sm text-green-600">Last saved: {lastSaved}</p>
              )}
              {currentStep < 6 ? (
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
