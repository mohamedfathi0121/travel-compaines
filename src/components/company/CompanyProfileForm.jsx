import React from "react";

const InputField = ({ label, name, value, onChange, editable }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-text-primary">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={!editable}
      className={`placeholder-text-text-primary mt-1 block w-full px-3 py-2 border rounded ${
        editable
          ? "bg-text-hard-secondary border-text-primary"
          : "bg-input  border-text-hard-secondary"
      }`}
      
    />
  </div>
);

const CompanyProfileForm = ({ formData, onChange, isEditing }) => {
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name: "address",
        value: {
          ...formData.address,
          [name]: value,
        },
      },
    });
  };

  return (
    <form className="space-y-2">
      <InputField
        label="Company Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        editable={isEditing}
      />
      <InputField
        label="Contact Email"
        name="email"
        value={formData.email}
        onChange={onChange}
        editable={isEditing}
      />
      <InputField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        editable={isEditing}
      />

      {/* Address Fields */}
      <div className="text-sm font-medium text-text-primary">Address</div>
      <InputField
        label="Street"
        name="street"
        value={formData.address?.street || ""}
        onChange={handleAddressChange}
        editable={isEditing}
      />
      <InputField
        label="City"
        name="city"
        value={formData.address?.city || ""}
        onChange={handleAddressChange}
        editable={isEditing}
      />
      <InputField
        label="Country"
        name="country"
        value={formData.address?.country || ""}
        onChange={handleAddressChange}
        editable={isEditing}
      />

      <InputField
        label="Website URL"
        name="website"
        value={formData.website}
        onChange={onChange}
        editable={isEditing}
      />
      <InputField
        label="Logo URL"
        name="logo"
        value={formData.logo}
        onChange={onChange}
        editable={isEditing}
      />

      <div className="text-sm text-text-primary">
        <p>
          <strong>Status:</strong> {formData.status}
        </p>
        <p>
          <strong>Blocked:</strong> {formData.isBlocked ? "Yes" : "No"}
        </p>
      </div>
    </form>
  );
};

export default CompanyProfileForm;
