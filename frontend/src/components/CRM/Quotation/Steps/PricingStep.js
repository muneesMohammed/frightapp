
// PricingStep.js
import React from "react";

const PricingStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    const total =
      parseFloat(formData.base_freight_charges || 0) +
      parseFloat(formData.additional_charges || 0) -
      parseFloat(formData.discount || 0);
    setFormData({ ...formData, total_amount: total.toFixed(2) });
  };

  return (
    <div className="step-container">
      <h3>Pricing</h3>
      <div className="form-group">
        <label>Base Freight Charges</label>
        <input
          type="number"
          name="base_freight_charges"
          value={formData.base_freight_charges}
          onChange={handleChange}
          onBlur={calculateTotal}
        />
      </div>
      <div className="form-group">
        <label>Additional Charges</label>
        <input
          type="number"
          name="additional_charges"
          value={formData.additional_charges}
          onChange={handleChange}
          onBlur={calculateTotal}
        />
      </div>
      <div className="form-group">
        <label>Discount</label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          onBlur={calculateTotal}
        />
      </div>
      <div className="form-group">
        <label>Total Amount</label>
        <input
          type="number"
          name="total_amount"
          value={formData.total_amount}
          readOnly
        />
      </div>
    </div>
  );
};

export default PricingStep;
