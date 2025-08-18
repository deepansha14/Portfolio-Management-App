import { FormSection } from "@/components/ui/FormSection";

interface ReviewSubmitSectionProps {
  personal: {
    name: string;
    dob: string;
    email: string;
    mobile: string;
    pan: string;
    residentialStatus: string;
    // Add other fields as needed for review
  };
  income: {
    selfMonthly: string;
    selfAnnual: string;
    spouseMonthly: string;
    spouseAnnual: string;
    otherMonthly: string;
    otherAnnual: string;
  };
  spouse: {
    spouseName: string;
    dob: string;
    pan: string;
    occupation: string;
  };
  child1: {
    name: string;
    relation: string;
    dob: string;
    education: string;
  };
  child2: {
    name: string;
    relation: string;
    dob: string;
    education: string;
  };
  parent: {
    motherName: string;
    motherDob: string;
    fatherName: string;
    fatherDob: string;
  };
  requirements?: {
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
}

const ReviewSubmitSection: React.FC<ReviewSubmitSectionProps> = ({ 
  personal, 
  income, 
  spouse, 
  child1, 
  child2, 
  parent,
  requirements = {
    shortTerm: "",
    midTerm: "",
    longTerm: "",
    riskAppetite: "",
    preferredInvestments: "",
    additionalInfo: ""
  },
  detailedAssets = []
}) => {
  return (
    <FormSection
      title="Review & Submit"
      number={6}
      subtitle="Please review all information before submitting your application."
    >
      <div className="space-y-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h4 className="font-medium text-[#0A2540] dark:text-white mb-4">
            Personal Information
          </h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {personal.name || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Date of Birth
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {personal.dob || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {personal.email || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Mobile
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {personal.mobile || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">PAN</dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {personal.pan || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Residential Status
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {personal.residentialStatus || "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h4 className="font-medium text-[#0A2540] dark:text-white mb-4">
            Spouse Information
          </h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Spouse Name
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {spouse.spouseName || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Date of Birth
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {spouse.dob || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">PAN</dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {spouse.pan || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Occupation
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {spouse.occupation || "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h4 className="font-medium text-[#0A2540] dark:text-white mb-4">
            Children Information
          </h4>
          <h5 className="font-medium text-[#0A2540] dark:text-white mb-2">Child 1</h5>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-4">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Name
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child1.name || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Relation
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child1.relation || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Date of Birth
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child1.dob || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Education
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child1.education || "—"}
              </dd>
            </div>
          </dl>
          <h5 className="font-medium text-[#0A2540] dark:text-white mb-2">Child 2</h5>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Name
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child2.name || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Relation
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child2.relation || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Date of Birth
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child2.dob || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Education
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {child2.education || "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h4 className="font-medium text-[#0A2540] dark:text-white mb-4">
            Parents Information
          </h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Mother's Name
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {parent.motherName || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Mother's Date of Birth
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {parent.motherDob || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Father's Name
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {parent.fatherName || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Father's Date of Birth
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {parent.fatherDob || "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h4 className="font-medium text-[#0A2540] dark:text-white mb-4">
            Income Details
          </h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Self Monthly Income
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {income.selfMonthly || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Self Annual Income
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {income.selfAnnual || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Spouse Monthly Income
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {income.spouseMonthly || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Spouse Annual Income
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {income.spouseAnnual || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Other Monthly Income
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {income.otherMonthly || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Other Annual Income
              </dt>
              <dd className="font-medium text-[#0A2540] dark:text-white">
                {income.otherAnnual || "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <h4 className="font-medium text-[#0A2540] dark:text-white mb-4">
            Requirement Details
          </h4>
          <div className="mb-4">
            <h5 className="font-medium text-[#0A2540] dark:text-white mb-2">Financial Goals</h5>
            <dl className="grid grid-cols-1 gap-y-3">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Short Term Goals (0-3 years)
                </dt>
                <dd className="font-medium text-[#0A2540] dark:text-white">
                  {requirements.shortTerm || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Mid Term Goals (3-7 years)
                </dt>
                <dd className="font-medium text-[#0A2540] dark:text-white">
                  {requirements.midTerm || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Long Term Goals (7+ years)
                </dt>
                <dd className="font-medium text-[#0A2540] dark:text-white">
                  {requirements.longTerm || "—"}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mb-4">
            <h5 className="font-medium text-[#0A2540] dark:text-white mb-2">Investment Preferences</h5>
            <dl className="grid grid-cols-1 gap-y-3">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Risk Appetite
                </dt>
                <dd className="font-medium text-[#0A2540] dark:text-white">
                  {requirements.riskAppetite || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Preferred Investment Vehicles
                </dt>
                <dd className="font-medium text-[#0A2540] dark:text-white">
                  {requirements.preferredInvestments || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Additional Information
                </dt>
                <dd className="font-medium text-[#0A2540] dark:text-white">
                  {requirements.additionalInfo || "—"}
                </dd>
              </div>
            </dl>
          </div>
          {detailedAssets && detailedAssets.length > 0 && (
            <div>
              <h5 className="font-medium text-[#0A2540] dark:text-white mb-2">Existing Assets</h5>
              <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <table className="w-full border-collapse mb-6 text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800">
                      <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">Asset Type</th>
                      <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">Asset Details</th>
                      <th className="text-right p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">Current Value</th>
                      <th className="text-right p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">Monthly/Yearly Contribution</th>
                      <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">In The Name Of</th>
                      <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">Tagging To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedAssets
                      .slice()
                      .sort((a, b) => a.srNo - b.srNo)
                      .map((asset, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-3 text-gray-800 dark:text-gray-200 font-medium">
                          {asset.assetType || "—"}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {asset.assetDetails || "—"}
                        </td>
                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">
                          ₹ {parseFloat(asset.currentValue || "0").toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-right text-gray-700 dark:text-gray-300">
                          ₹ {parseFloat(asset.monthlyYearlyContribution || "0").toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {asset.assetInTheNameOf || "—"}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {asset.taggingTo || "—"}
                        </td>
                      </tr>
                    ))}
                    {detailedAssets.length === 0 && (
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td colSpan={6} className="p-3 text-center text-gray-500 dark:text-gray-400 italic">
                          No assets provided
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <h6 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
                  Asset Management Distribution:
                </h6>
                <ul className="space-y-2">
                  {detailedAssets.some(asset => parseFloat(asset.retainInRespectiveAccount || "0") > 0) && (
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <svg className="h-4 w-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Retained in respective accounts: ₹ {detailedAssets.reduce((total, asset) => {
                        return total + (parseFloat(asset.retainInRespectiveAccount || "0") || 0);
                      }, 0).toLocaleString('en-IN')}
                    </li>
                  )}
                  {detailedAssets.some(asset => parseFloat(asset.investingInAssortedMF || "0") > 0) && (
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <svg className="h-4 w-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Invested in assorted mutual funds: ₹ {detailedAssets.reduce((total, asset) => {
                        return total + (parseFloat(asset.investingInAssortedMF || "0") || 0);
                      }, 0).toLocaleString('en-IN')}
                    </li>
                  )}
                  {detailedAssets.some(asset => parseFloat(asset.investingInDebtMF || "0") > 0) && (
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <svg className="h-4 w-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Invested in debt mutual funds: ₹ {detailedAssets.reduce((total, asset) => {
                        return total + (parseFloat(asset.investingInDebtMF || "0") || 0);
                      }, 0).toLocaleString('en-IN')}
                    </li>
                  )}
                  {!detailedAssets.some(asset => {
                    return parseFloat(asset.retainInRespectiveAccount || "0") > 0 ||
                           parseFloat(asset.investingInAssortedMF || "0") > 0 ||
                           parseFloat(asset.investingInDebtMF || "0") > 0;
                  }) && (
                    <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                      No asset management distribution specified
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* Add other review blocks here as needed */}
      </div>
    </FormSection>
  );
};

export default ReviewSubmitSection;