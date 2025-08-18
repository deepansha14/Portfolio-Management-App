import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { FormSection } from "@/components/ui/FormSection";
import { Button } from "@/components/ui/Button";

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
  const [children, setChildren] = useState<number[]>([1]); // Start with one child

  const addChild = () => {
    if (children.length < 2) { // Limit to 2 children for now based on existing state management
      setChildren([...children, children.length + 1]);
    }
  };
  
  const removeChild = (childNum: number) => {
    if (children.length > 1) { // Always keep at least one child form
      setChildren(children.filter(num => num !== childNum));
    }
  };
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
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#0A2540] dark:text-white">
              Children Information
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-y-8">
            {children.map((childNum) => (
              <div key={childNum} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-medium text-[#0A2540] dark:text-white">
                    Child {childNum}
                  </h5>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(childNum)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                      aria-label={`Remove Child ${childNum}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <Input
                    name="name"
                    value={childNum === 1 ? child1.name : child2.name}
                    onChange={(e) => handleChange(childNum === 1 ? "child1" : "child2", e)}
                    label="Name"
                  />
                  <DatePicker
                    name="dob"
                    value={childNum === 1 ? child1.dob : child2.dob}
                    onChange={(e) => handleChange(childNum === 1 ? "child1" : "child2", e)}
                    label="Date of Birth"
                  />
                  <Select
                    name="relation"
                    value={childNum === 1 ? child1.relation : child2.relation}
                    onChange={(e) => handleChange(childNum === 1 ? "child1" : "child2", e)}
                    options={[
                      { value: "", label: "Select Relationship" },
                      { value: "Son", label: "Son" },
                      { value: "Daughter", label: "Daughter" },
                    ]}
                    label="Relationship"
                  />
                  <Input
                    name="education"
                    value={childNum === 1 ? child1.education : child2.education}
                    onChange={(e) => handleChange(childNum === 1 ? "child1" : "child2", e)}
                    label="Education"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {children.length < 2 && (
            <button
              type="button"
              onClick={addChild}
              className="mt-4 flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-[#0A2540] hover:text-[#0A2540] dark:hover:border-gray-400 dark:hover:text-white transition-colors duration-200 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Add Child</span>
            </button>
          )}
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