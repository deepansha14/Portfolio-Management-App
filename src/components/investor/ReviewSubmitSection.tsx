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
}

const ReviewSubmitSection: React.FC<ReviewSubmitSectionProps> = ({ personal }) => {
  return (
    <FormSection
      title="Review & Submit"
      number={5}
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
        {/* Add other review blocks here as needed */}
      </div>
    </FormSection>
  );
};

export default ReviewSubmitSection;