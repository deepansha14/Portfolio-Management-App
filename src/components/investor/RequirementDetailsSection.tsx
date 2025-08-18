import React, { useState, useEffect } from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";

// Component for asset type headers
interface AssetTypeHeaderProps {
  title: string;
  onAdd: () => void;
}

const AssetTypeHeader: React.FC<AssetTypeHeaderProps> = ({ title, onAdd }) => {
  return (
    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
      <td className="px-2 py-3 border-t border-b border-gray-200 dark:border-gray-700 w-[2%]"></td>
      <td className="px-2 py-3 border-b border-t border-gray-200 dark:border-gray-700 w-[10%]">
        <span className="font-semibold text-gray-800 dark:text-white block">{title}</span>
      </td>
      <td className="p-1 border-t border-b border-gray-200 dark:border-gray-700 text-right">
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
          title="Add new asset"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add
        </button>
      </td>
      <td colSpan={7} className="px-2 py-3 border-t border-b border-gray-200 dark:border-gray-700"></td>
    </tr>
  );
};

// Function to render asset rows by type
const renderAssetRows = (
  assetType: string,
  assets: Array<any>,
  handleChange: (index: number, field: string, value: string | boolean) => void,
  handleRemove: (index: number) => void,
  errors: Record<string, string>
) => {
  const filteredAssets = assets.filter(asset => asset.assetType === assetType);
  
  if (filteredAssets.length === 0) {
    return (
      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <td colSpan={11} className="px-2 py-4 text-center text-gray-500 dark:text-gray-400 italic">
          No {assetType.toLowerCase()} assets added yet. Click "Add" to add your first {assetType.toLowerCase()} asset.
        </td>
      </tr>
    );
  }
  
  // Sort assets by serial number only, regardless of asset type
  const sortedAssets = [...filteredAssets].sort((a, b) => a.srNo - b.srNo);
  
  return sortedAssets.map((asset, index) => {
    const assetIndex = assets.findIndex(a => a === asset);
    return (
      <tr key={assetIndex} className="border-b border-gray-200 dark:border-gray-700 transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <td className="w-[5%]">
          <div className="flex justify-center pl-20">
            <button
              type="button"
              onClick={() => handleRemove(assetIndex)}
              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-900/20 dark:text-red-400 
                        dark:hover:bg-red-900/30 dark:hover:text-red-300 rounded-full transition duration-150 focus:outline-none 
                        focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              title="Remove asset"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-2 py-4 text-gray-500 dark:text-gray-400 w-[5%]"></td>
        <td className="px-2 py-4 w-[15%]">
          {asset.assetType === "Bank" ? (
            <select
              value={asset.assetDetails}
              onChange={(e) => handleChange(assetIndex, 'assetDetails', e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="">Account type</option>
              <option value="SB-sal">SB-sal</option>
              <option value="SB">SB</option>
              <option value="FD">FD</option>
              <option value="RD">RD</option>
            </select>
          ) : asset.assetType === "Retirement Assets" ? (
            <select
              value={asset.assetDetails}
              onChange={(e) => handleChange(assetIndex, 'assetDetails', e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="">Retirement type</option>
              <option value="EPF1">EPF1</option>
              <option value="EPF2">EPF2</option>
              <option value="PPF1">PPF1</option>
              <option value="PPF2">PPF2</option>
              <option value="NPS1">NPS1</option>
              <option value="NPS2">NPS2</option>
            </select>
          ) : asset.assetType === "Equity & MFs" ? (
            <select
              value={asset.assetDetails}
              onChange={(e) => handleChange(assetIndex, 'assetDetails', e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="">Investment type</option>
              <option value="Mutual Funds">Mutual Funds</option>
              <option value="Shares">Shares</option>
              <option value="ESOPs">ESOPs</option>
            </select>
          ) : (
            <input
              type="text"
              value={asset.assetDetails}
              onChange={(e) => handleChange(assetIndex, 'assetDetails', e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Select"
            />
          )}
        </td>
        <td className="px-2 py-4 w-[10%]">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
            </div>
            <input
              type="text"
              value={asset.currentValue}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value;
                if (!value || /^\d*\.?\d*$/.test(value)) {
                  handleChange(assetIndex, 'currentValue', value);
                }
              }}
              className={`w-full pl-8 pr-3 py-2.5 rounded-md border ${
                errors[`asset_${assetIndex}_value`] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 shadow-sm text-right`}
              inputMode="decimal"
              placeholder="0.00"
            />
          </div>
          {errors[`asset_${assetIndex}_value`] && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors[`asset_${assetIndex}_value`]}</p>
          )}
        </td>
        <td className="px-2 py-4 w-[10%]">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
            </div>
            <input
              type="text"
              value={asset.monthlyYearlyContribution}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value;
                if (!value || /^\d*\.?\d*$/.test(value)) {
                  handleChange(assetIndex, 'monthlyYearlyContribution', value);
                }
              }}
              className="w-full pl-8 pr-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-right"
              inputMode="decimal"
              placeholder="0.00"
            />
          </div>
        </td>
        <td className="px-2 py-4 w-[10%]">
          <input
            type="text"
            value={asset.assetInTheNameOf}
            onChange={(e) => handleChange(assetIndex, 'assetInTheNameOf', e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Name"
          />
        </td>
        <td className="px-2 py-4 w-[10%]">
          <input
            type="text"
            value={asset.taggingTo}
            onChange={(e) => handleChange(assetIndex, 'taggingTo', e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Tag"
          />
        </td>
        <td className="px-2 py-4 w-[10%]">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
            </div>
            <input
              type="text"
              value={asset.retainInRespectiveAccount}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value;
                if (!value || /^\d*\.?\d*$/.test(value)) {
                  handleChange(assetIndex, 'retainInRespectiveAccount', value);
                }
              }}
              className="w-full pl-8 pr-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-right"
              inputMode="decimal"
              placeholder="0.00"
            />
          </div>
        </td>
        <td className="px-2 py-4 w-[10%]">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
            </div>
            <input
              type="text"
              value={asset.investingInAssortedMF}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value;
                if (!value || /^\d*\.?\d*$/.test(value)) {
                  handleChange(assetIndex, 'investingInAssortedMF', value);
                }
              }}
              className="w-full pl-8 pr-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-right"
              inputMode="decimal"
              placeholder="0.00"
            />
          </div>
        </td>
        <td className="px-2 py-4 w-[10%]">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
            </div>
            <input
              type="text"
              value={asset.investingInDebtMF}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value;
                if (!value || /^\d*\.?\d*$/.test(value)) {
                  handleChange(assetIndex, 'investingInDebtMF', value);
                }
              }}
              className="w-full pl-8 pr-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-right"
              inputMode="decimal"
              placeholder="0.00"
            />
          </div>
        </td>
      </tr>
    );
  });
};

// Calculate total for a specific field
const calculateTotal = (assets: Array<any>, field: string): number => {
  return assets.reduce((total, asset) => {
    const value = parseFloat(asset[field]) || 0;
    return total + value;
  }, 0);
};

interface RequirementDetailsSectionProps {
  requirements: {
    shortTerm: string;
    midTerm: string;
    longTerm: string;
    riskAppetite: string;
    preferredInvestments: string;
    additionalInfo: string;
  };
  detailedAssets?: Array<{
    assetType: string;
    srNo: number;
    assetDetails: string;
    currentValue: string;
    monthlyYearlyContribution: string;
    assetInTheNameOf: string;
    taggingTo: string;
    retainInRespectiveAccount: string;
    investingInAssortedMF: string;
    investingInDebtMF: string;
  }>;
  handleChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleDetailedAssetChange?: (
    index: number, 
    field: string, 
    value: string | boolean | number
  ) => void;
  handleAddDetailedAsset?: (assetType: string) => void;
  handleRemoveDetailedAsset?: (index: number) => void;
  errors?: Record<string, string>;
}

const RequirementDetailsSection: React.FC<RequirementDetailsSectionProps> = ({
  requirements,
  detailedAssets = [],
  handleChange,
  handleDetailedAssetChange = () => {},
  handleAddDetailedAsset = () => {},
  handleRemoveDetailedAsset = () => {},
  errors = {},
}) => {
  // Create an onChange handler for textareas
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange("requirements", e as any);
  };

  // Function to handle changes in the Retirement Details section
  const handleRetirementDetailsChange = (type: string, field: string, value: string) => {
    // Find if there's an existing retirement asset with this type
    const existingAssetIndex = detailedAssets.findIndex(
      asset => asset.assetType === "Retirement Assets" && asset.assetDetails === type
    );
    
    // If the value is empty and there's no existing asset, do nothing
    if (!value && existingAssetIndex === -1) return;
    
    // If asset exists, update it
    if (existingAssetIndex !== -1) {
      handleDetailedAssetChange(existingAssetIndex, field, value);
    } 
    // If asset doesn't exist, create a new one
    else if (value) {
      // Find the highest srNo for proper ordering
      const maxSrNo = detailedAssets.length > 0 
        ? Math.max(...detailedAssets.map(a => a.srNo)) 
        : 0;
      
      // Create a new retirement asset
      const newAsset = {
        assetType: "Retirement Assets",
        assetDetails: type,
        srNo: maxSrNo + 1,
        currentValue: field === 'currentValue' ? value : '',
        monthlyYearlyContribution: field === 'monthlyYearlyContribution' ? value : '',
        assetInTheNameOf: '',
        taggingTo: '',
        retainInRespectiveAccount: '',
        investingInAssortedMF: '',
        investingInDebtMF: ''
      };
      
      // Add the new asset to the list - we need to modify parent component to handle this
      // For now, just add the type and the parent component should initialize the object
      handleAddDetailedAsset("Retirement Assets");
    }
  };

  // Calculate totals for different asset types
  const calculateAssetTypeTotal = (detailedAssets: Array<any>, assetTypes: string[], assetDetails: string[] = []): number => {
    return detailedAssets
      .filter(asset => {
        // If specific asset details are provided, filter by them as well
        if (assetDetails.length > 0) {
          return assetTypes.includes(asset.assetType) && assetDetails.includes(asset.assetDetails);
        }
        // Otherwise filter just by asset type
        return assetTypes.includes(asset.assetType);
      })
      .reduce((total, asset) => total + (parseFloat(asset.currentValue) || 0), 0);
  };

  // Client-side only rendering for the complex table
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <FormSection
        title="Existing Assets"
        number={1}
        subtitle="Please provide details of your existing assets and investments"
      >
        {isMounted ? (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800">
                  <th className="text-center px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[5%]"></th>
                  <th className="text-left px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Asset Type</th>
                  <th className="text-left px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[15%]">Asset Details</th>
                  <th className="text-right px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Current Value</th>
                  <th className="text-right px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Monthly/Yearly Contribution</th>
                  <th className="text-left px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Asset in the Name of</th>
                  <th className="text-left px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Tagging to</th>
                  <th className="text-right px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Retain in respective account (₹)</th>
                  <th className="text-right px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Investing in Assorted MF (₹)</th>
                  <th className="text-right px-2 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[10%]">Investing in Debt MF (₹)</th>
                </tr>
              </thead>
              <tbody>
                {/* Bank Assets */}
                <AssetTypeHeader title="Bank" onAdd={() => handleAddDetailedAsset("Bank")} />
                {renderAssetRows("Bank", detailedAssets, handleDetailedAssetChange, handleRemoveDetailedAsset, errors)}
                
                {/* Retirement Assets */}
                <AssetTypeHeader title="Retirement Assets" onAdd={() => handleAddDetailedAsset("Retirement Assets")} />
                {renderAssetRows("Retirement Assets", detailedAssets, handleDetailedAssetChange, handleRemoveDetailedAsset, errors)}
                
                {/* Equity & MFs */}
                <AssetTypeHeader title="Equity & MFs" onAdd={() => handleAddDetailedAsset("Equity & MFs")} />
                {renderAssetRows("Equity & MFs", detailedAssets, handleDetailedAssetChange, handleRemoveDetailedAsset, errors)}
                
                {/* Real Estate */}
                <AssetTypeHeader title="Real Estate" onAdd={() => handleAddDetailedAsset("Real Estate")} />
                {renderAssetRows("Real Estate", detailedAssets, handleDetailedAssetChange, handleRemoveDetailedAsset, errors)}
                
                {/* Others */}
                <AssetTypeHeader title="Others (Gold, Silver etc….)" onAdd={() => handleAddDetailedAsset("Others")} />
                {renderAssetRows("Others", detailedAssets, handleDetailedAssetChange, handleRemoveDetailedAsset, errors)}
                
                
                {/* Total Row */}
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 font-medium">
                  <td className="px-2 py-4.5 border-t-2 border-blue-200 dark:border-blue-800"></td>
                  <td colSpan={2} className="px-2 py-4.5 text-right border-t-2 border-blue-200 dark:border-blue-800 text-gray-700 dark:text-gray-300">
                    Total Assets
                  </td>
                  <td className="px-2 py-4.5 text-right border-t-2 border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 w-[10%]">
                    ₹ {calculateTotal(detailedAssets, 'currentValue').toLocaleString('en-IN')}
                  </td>
                  <td className="px-2 py-4.5 text-right border-t-2 border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 w-[10%]">
                    ₹ {calculateTotal(detailedAssets, 'monthlyYearlyContribution').toLocaleString('en-IN')}
                  </td>
                  <td colSpan={2} className="px-2 py-4.5 border-t-2 border-blue-200 dark:border-blue-800"></td>
                  <td className="px-2 py-4.5 text-right border-t-2 border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 w-[10%]">
                    ₹ {calculateTotal(detailedAssets, 'retainInRespectiveAccount').toLocaleString('en-IN')}
                  </td>
                  <td className="px-2 py-4.5 text-right border-t-2 border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 w-[10%]">
                    ₹ {calculateTotal(detailedAssets, 'investingInAssortedMF').toLocaleString('en-IN')}
                  </td>
                  <td className="px-2 py-4.5 text-right border-t-2 border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 w-[10%]">
                    ₹ {calculateTotal(detailedAssets, 'investingInDebtMF').toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-4">Loading assets table...</div>
        )}
      </FormSection>

      <FormSection
        title="Retirement Details"
        number={2}
        subtitle="Your retirement investment details"
      >
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800">
                <th className="text-left px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[30%]">Type</th>
                <th className="text-right px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[35%]">Current Value</th>
                <th className="text-right px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[35%]">Monthly Contribution (X+X-1250)</th>
              </tr>
            </thead>
            <tbody>
              {/* Map for each retirement type */}
              {["EPF1", "EPF2", "PPF1", "PPF2", "NPS1", "NPS2", "ESOPs", "Others"].map((type) => {
                // Find matching retirement asset
                const matchingAsset = detailedAssets.find(
                  asset => asset.assetType === "Retirement Assets" && asset.assetDetails === type
                );
                
                // Get asset index if it exists
                const assetIndex = matchingAsset 
                  ? detailedAssets.findIndex(asset => asset === matchingAsset)
                  : -1;
                
                // Get values or defaults
                const currentValue = matchingAsset?.currentValue || "";
                const contribution = matchingAsset?.monthlyYearlyContribution || "";
                
                return (
                  <tr key={type} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{type}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="text"
                          value={currentValue}
                          onChange={(e) => {
                            // Only allow numeric input
                            const value = e.target.value;
                            if (!value || /^\d*\.?\d*$/.test(value)) {
                              if (assetIndex !== -1) {
                                // Update existing asset
                                handleDetailedAssetChange(assetIndex, 'currentValue', value);
                              } else if (value) {
                                // Create new asset via our helper function
                                handleRetirementDetailsChange(type, 'currentValue', value);
                              }
                            }
                          }}
                          className="w-full pl-8 pr-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-right"
                          inputMode="decimal"
                          placeholder="0.00"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="text"
                          value={contribution}
                          onChange={(e) => {
                            // Only allow numeric input
                            const value = e.target.value;
                            if (!value || /^\d*\.?\d*$/.test(value)) {
                              if (assetIndex !== -1) {
                                // Update existing asset
                                handleDetailedAssetChange(assetIndex, 'monthlyYearlyContribution', value);
                              } else if (value) {
                                // Create new asset via our helper function
                                handleRetirementDetailsChange(type, 'monthlyYearlyContribution', value);
                              }
                            }
                          }}
                          className="w-full pl-8 pr-3 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-right"
                          inputMode="decimal"
                          placeholder="0.00"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {/* Total row */}
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 font-medium">
                <td className="px-4 py-3.5 border-t-2 border-blue-200 dark:border-blue-800 font-semibold text-gray-800 dark:text-gray-200">Total</td>
                <td className="px-4 py-3.5 text-right border-t-2 border-blue-200 dark:border-blue-800 font-semibold text-gray-800 dark:text-gray-200">
                  {/* Calculate total of retirement assets current value */}
                  ₹ {detailedAssets
                      .filter(asset => asset.assetType === "Retirement Assets")
                      .reduce((total, asset) => total + (parseFloat(asset.currentValue) || 0), 0)
                      .toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3.5 text-right border-t-2 border-blue-200 dark:border-blue-800 font-semibold text-gray-800 dark:text-gray-200">
                  {/* Calculate total of retirement assets contributions */}
                  ₹ {detailedAssets
                      .filter(asset => asset.assetType === "Retirement Assets")
                      .reduce((total, asset) => total + (parseFloat(asset.monthlyYearlyContribution) || 0), 0)
                      .toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection
        title="Asset Allocation"
        number={3}
        subtitle="Your portfolio asset allocation breakdown"
      >
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800">
                <th className="text-left px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[40%]">Type</th>
                <th className="text-right px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[30%]">Amount</th>
                <th className="text-right px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 w-[30%]">%</th>
              </tr>
            </thead>
            <tbody>
              {/* Calculate values for the asset allocation breakdown */}
              {(() => {
                // Get debt assets total (Bank + Retirement Assets)
                const debtTotal = calculateAssetTypeTotal(
                  detailedAssets, 
                  ["Bank", "Retirement Assets"], 
                  ["SB-sal", "SB", "FD", "RD", "EPF1", "EPF2", "PPF1", "PPF2", "NPS1", "NPS2"]
                );
                
                // Get equity assets total
                const equityTotal = calculateAssetTypeTotal(
                  detailedAssets, 
                  ["Equity & MFs"], 
                  ["Mutual Funds", "Shares", "ESOPs"]
                );
                
                // Get insurance total - for now set to 0 as we don't have a specific category
                const insuranceTotal = 0;
                
                // Calculate grand total
                const grandTotal = debtTotal + equityTotal + insuranceTotal;
                
                // Calculate percentages
                const debtPercentage = grandTotal > 0 ? (debtTotal / grandTotal * 100) : 0;
                const equityPercentage = grandTotal > 0 ? (equityTotal / grandTotal * 100) : 0;
                const insurancePercentage = grandTotal > 0 ? (insuranceTotal / grandTotal * 100) : 0;
                
                return (
                  <>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-300">Debt (SB+FD+RD+EPF+NPS+PPF)</td>
                      <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-300">₹ {debtTotal.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-300">{debtPercentage.toFixed(2)}%</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-300">Equity (MFs+ESOPs+Shares)</td>
                      <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-300">₹ {equityTotal.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-300">{equityPercentage.toFixed(2)}%</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-300">Insurance</td>
                      <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-300">₹ {insuranceTotal.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-300">{insurancePercentage.toFixed(2)}%</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 font-medium">
                      <td className="px-4 py-3.5 border-t-2 border-blue-200 dark:border-blue-800 font-semibold text-gray-800 dark:text-gray-200">Total</td>
                      <td className="px-4 py-3.5 text-right border-t-2 border-blue-200 dark:border-blue-800 font-semibold text-gray-800 dark:text-gray-200">
                        ₹ {grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3.5 text-right border-t-2 border-blue-200 dark:border-blue-800 font-semibold text-gray-800 dark:text-gray-200">
                        100.00%
                      </td>
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection
        title="Financial Goals"
        number={4}
        subtitle="Please specify your financial goals for different time horizons"
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Term Goals (0-3 years) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="shortTerm"
              value={requirements.shortTerm}
              onChange={handleTextAreaChange}
              className={`w-full px-2 py-3 rounded-md border ${
                errors.shortTerm ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]`}
              placeholder="e.g., Emergency fund, buying a car, vacation"
            ></textarea>
            {errors.shortTerm && (
              <p className="mt-1 text-sm text-red-500 error-message">{errors.shortTerm}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mid Term Goals (3-7 years) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="midTerm"
              value={requirements.midTerm}
              onChange={handleTextAreaChange}
              className={`w-full px-2 py-3 rounded-md border ${
                errors.midTerm ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]`}
              placeholder="e.g., Down payment for house, higher education, starting a business"
            ></textarea>
            {errors.midTerm && (
              <p className="mt-1 text-sm text-red-500 error-message">{errors.midTerm}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Long Term Goals (7+ years) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="longTerm"
              value={requirements.longTerm}
              onChange={handleTextAreaChange}
              className={`w-full px-2 py-3 rounded-md border ${
                errors.longTerm ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]`}
              placeholder="e.g., Retirement planning, children's education, wealth creation"
            ></textarea>
            {errors.longTerm && (
              <p className="mt-1 text-sm text-red-500 error-message">{errors.longTerm}</p>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Investment Preferences"
        number={5}
        subtitle="Please tell us about your investment preferences and risk appetite"
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Appetite <span className="text-red-500">*</span>
            </label>
            <select
              name="riskAppetite"
              value={requirements.riskAppetite}
              onChange={(e) => handleChange("requirements", e)}
              className={`w-full px-2 py-3 rounded-md border ${
                errors.riskAppetite ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select your risk appetite</option>
              <option value="Conservative">Conservative (Low risk, stable returns)</option>
              <option value="Moderate">Moderate (Balanced risk and returns)</option>
              <option value="Aggressive">Aggressive (Higher risk, potentially higher returns)</option>
              <option value="Very Aggressive">Very Aggressive (High risk, high potential returns)</option>
            </select>
            {errors.riskAppetite && (
              <p className="mt-1 text-sm text-red-500 error-message">{errors.riskAppetite}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Investment Vehicles
            </label>
            <textarea
              name="preferredInvestments"
              value={requirements.preferredInvestments}
              onChange={handleTextAreaChange}
              className="w-full px-2 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="e.g., Mutual funds, stocks, bonds, real estate, fixed deposits"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={requirements.additionalInfo}
              onChange={handleTextAreaChange}
              className="w-full px-2 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Any other requirements or specific financial goals you want to share"
            ></textarea>
          </div>
        </div>
      </FormSection>
    </>
  );
};

export default RequirementDetailsSection;
