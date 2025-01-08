
// AdditionalInfoStep.js
import React from "react";

const AdditionalInfoStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="step-container">
      <h3>Additional Information</h3>
      <div className="form-group">
        <label>Services Included</label>
        <input
          type="text"
          name="services_included"
          value={formData.services_included}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Special Instructions</label>
        <textarea
          name="special_instructions"
          value={formData.special_instructions}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;
