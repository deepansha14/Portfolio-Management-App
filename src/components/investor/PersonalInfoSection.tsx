import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { FormSection } from "@/components/ui/FormSection";

interface PersonalInfoSectionProps {
  personal: {
    name: string;
    placeOfBirth: string;
    dob: string;
    address: string;
    city: string;
    gender: string;
    status: string;
    pan: string;
    mobile: string;
    email: string;
    motherName: string;
    fatherName: string;
    residentialStatus: string;
    education: string;
    occupation: string;
    designation: string;
    annualIncome: string;
  };
  errors: Record<string, string>;
  handleChange: (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const validateEmail = (email: string) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

const validatePanCard = (pan: string) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personal,
  errors,
  handleChange,
}) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("personal", e);
    if (!validateEmail(e.target.value)) {
      errors.email = "Invalid email format";
    } else {
      errors.email = "";
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("personal", e);
    if (!validatePhoneNumber(e.target.value)) {
      errors.mobile = "Invalid mobile number";
    } else {
      errors.mobile = "";
    }
  };

  const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("personal", e);
    if (!e.target.value.trim()) {
      errors.occupation = "Occupation is required";
    } else {
      errors.occupation = "";
    }
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("personal", e);
    if (!validatePanCard(e.target.value)) {
      errors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    } else {
      errors.pan = "";
    }
  };

  const handleChangeWithErrorClear = (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    handleChange(section, e);
    if (value.trim()) {
      errors[name] = ""; // Clear the error if a value is provided
    }
  };

  return (
    <FormSection
      title="Personal Information"
      number={1}
      subtitle="Please fill in your personal details as they appear on official documents."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Input
          name="name"
          value={personal.name}
          onChange={(e) => handleChange("personal", e)}
          label="Full Name"
          error={errors.name}
          required
          autoFocus
        />
        <Input
          name="placeOfBirth"
          value={personal.placeOfBirth}
          onChange={(e) => handleChange("personal", e)}
          label="Place of Birth"
          error={errors.placeOfBirth}
          required
        />
        <DatePicker
          name="dob"
          value={personal.dob}
          onChange={(e) => handleChange("personal", e)}
          label="Date of Birth"
          error={errors.dob} // Pass error prop for dob
          required
        />
        <Input
          name="address"
          value={personal.address}
          onChange={(e) => handleChange("personal", e)}
          label="Address"
          error={errors.address}
          required
        />
        <Input
          name="city"
          value={personal.city}
          onChange={(e) => handleChange("personal", e)}
          label="Current Residing City"
          error={errors.city}
          required
        />
        <Select
          name="gender"
          value={personal.gender}
          onChange={(e) => handleChange("personal", e)}
          options={[
            { value: "", label: "Select Gender" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
          label="Gender"
          error={errors.gender}
          required
        />
        <Select
          name="status"
          value={personal.status}
          onChange={(e) => handleChange("personal", e)}
          options={[
            { value: "", label: "Select Status" },
            { value: "Married", label: "Married" },
            { value: "Single", label: "Single" },
          ]}
          label="Status (Married/Single)"
          error={errors.status}
          required
        />
        <Input
          name="pan"
          value={personal.pan}
          onChange={handlePanChange}
          label="PAN"
          error={errors.pan}
          required
          pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
          helperText="Format: ABCDE1234F"
        />
        <Input
          name="mobile"
          value={personal.mobile}
          onChange={handlePhoneChange}
          label="Mobile Number"
          error={errors.mobile}
          required
          pattern="^[6-9]\d{9}$"
        />
        <Input
          name="email"
          value={personal.email}
          onChange={handleEmailChange}
          label="Email ID"
          error={errors.email}
          type="email"
          required
        />
        <Input
          name="motherName"
          value={personal.motherName}
          onChange={(e) => handleChange("personal", e)}
          label="Mother's Name"
          error={errors.motherName}
          required
        />
        <Input
          name="fatherName"
          value={personal.fatherName}
          onChange={(e) => handleChange("personal", e)}
          label="Father's Name"
          error={errors.fatherName}
          required
        />
        <Select
          name="residentialStatus"
          value={personal.residentialStatus}
          onChange={(e) => handleChange("personal", e)}
          options={[
            { value: "", label: "Select Residential Status" },
            { value: "Indian", label: "Indian" },
            { value: "NRI", label: "NRI" },
          ]}
          label="Residential Status"
          error={errors.residentialStatus}
          required
        />
        <Input
          name="education"
          value={personal.education}
          onChange={(e) => handleChange("personal", e)}
          label="Education Qualification"
          error={errors.education}
          required
        />
        <Input
          name="occupation"
          value={personal.occupation}
          onChange={handleOccupationChange}
          label="Occupation"
          error={errors.occupation}
          required
        />
        <Input
          name="designation"
          value={personal.designation}
          onChange={(e) => handleChange("personal", e)}
          label="Designation"
          error={errors.designation}
          required
        />
        <Select
          name="annualIncome"
          value={personal.annualIncome}
          onChange={(e) => handleChange("personal", e)}
          options={[
            { value: "", label: "Select Annual Income" },
            { value: "0-1 Lac", label: "0-1 Lac" },
            { value: "1-5 Lac", label: "1-5 Lac" },
            { value: "5-10 Lac", label: "5-10 Lac" },
            { value: "10-25 Lac", label: "10-25 Lac" },
            { value: "25 Lac-1 Crore", label: "25 Lac-1 Crore" },
            { value: ">1 Crore", label: ">1 Crore" },
          ]}
          label="Annual Income"
          error={errors.annualIncome}
          required
        />
      </div>
    </FormSection>
  );
};

export default PersonalInfoSection;