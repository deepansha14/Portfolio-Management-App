import React from "react";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { FormSection } from "@/components/ui/FormSection";

interface FamilyDetailsSectionProps {
  spouse: {
    spouseName: string;
    dob: string;
    pan: string;
    occupation: string;
  };
  child1: {
    name: string;
    dob: string;
    relation: string;
    education: string;
  };
  child2: {
    name: string;
    dob: string;
    relation: string;
    education: string;
  };
  parent: {
    motherName: string;
    motherDob: string;
    fatherName: string;
    fatherDob: string;
  };
  handleChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FamilyDetailsSection: React.FC<FamilyDetailsSectionProps> = ({
  spouse,
  child1,
  child2,
  parent,
  handleChange,
}) => {
  return (
    <FormSection
      title="Family Details"
      number={2}
      subtitle="Please provide information about your family members."
    >
      <div className="space-y-8">
        {/* Spouse section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
          <h4 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-6">
            Spouse Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Input
              name="spouseName"
              value={spouse.spouseName}
              onChange={(e) => handleChange("spouse", e)}
              label="Spouse's Name"
            />
            <DatePicker
              name="dob"
              value={spouse.dob}
              onChange={(e) => handleChange("spouse", e)}
              label="Spouse's Date of Birth"
            />
            <Input
              name="pan"
              value={spouse.pan}
              onChange={(e) => handleChange("spouse", e)}
              label="Spouse's PAN"
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
              helperText="Format: ABCDE1234F (if available)"
            />
            <Select
              name="occupation"
              value={spouse.occupation}
              onChange={(e) => handleChange("spouse", e)}
              options={[
                { value: "", label: "Select Occupation" },
                { value: "Service", label: "Service" },
                { value: "Business", label: "Business" },
                { value: "Professional", label: "Professional" },
                { value: "Homemaker", label: "Homemaker" },
                { value: "Other", label: "Other" },
              ]}
              label="Spouse's Occupation"
            />
          </div>
        </div>
        {/* Children section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
          <h4 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-6">
            Children Information
          </h4>
          <div className="grid grid-cols-1 gap-y-8">
            {/* Child 1 */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <h5 className="font-medium text-[#0A2540] dark:text-white mb-4">
                Child 1
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <Input
                  name="name"
                  value={child1.name}
                  onChange={(e) => handleChange("child1", e)}
                  label="Name"
                />
                <DatePicker
                  name="dob"
                  value={child1.dob}
                  onChange={(e) => handleChange("child1", e)}
                  label="Date of Birth"
                />
                <Select
                  name="relation"
                  value={child1.relation}
                  onChange={(e) => handleChange("child1", e)}
                  options={[
                    { value: "", label: "Select Relationship" },
                    { value: "Son", label: "Son" },
                    { value: "Daughter", label: "Daughter" },
                  ]}
                  label="Relationship"
                />
                <Input
                  name="education"
                  value={child1.education}
                  onChange={(e) => handleChange("child1", e)}
                  label="Education"
                />
              </div>
            </div>
            {/* Child 2 */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <h5 className="font-medium text-[#0A2540] dark:text-white mb-4">
                Child 2
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <Input
                  name="name"
                  value={child2.name}
                  onChange={(e) => handleChange("child2", e)}
                  label="Name"
                />
                <DatePicker
                  name="dob"
                  value={child2.dob}
                  onChange={(e) => handleChange("child2", e)}
                  label="Date of Birth"
                />
                <Select
                  name="relation"
                  value={child2.relation}
                  onChange={(e) => handleChange("child2", e)}
                  options={[
                    { value: "", label: "Select Relationship" },
                    { value: "Son", label: "Son" },
                    { value: "Daughter", label: "Daughter" },
                  ]}
                  label="Relationship"
                />
                <Input
                  name="education"
                  value={child2.education}
                  onChange={(e) => handleChange("child2", e)}
                  label="Education"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Parents section */}
        <div>
          <h4 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-6">
            Parents Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Input
              name="motherName"
              value={parent.motherName}
              onChange={(e) => handleChange("parent", e)}
              label="Mother's Name"
            />
            <DatePicker
              name="motherDob"
              value={parent.motherDob}
              onChange={(e) => handleChange("parent", e)}
              label="Mother's Date of Birth"
            />
            <Input
              name="fatherName"
              value={parent.fatherName}
              onChange={(e) => handleChange("parent", e)}
              label="Father's Name"
            />
            <DatePicker
              name="fatherDob"
              value={parent.fatherDob}
              onChange={(e) => handleChange("parent", e)}
              label="Father's Date of Birth"
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};
export default FamilyDetailsSection;