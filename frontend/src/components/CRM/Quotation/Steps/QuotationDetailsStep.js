import React from "react";

const QuotationDetailsStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="step-container">
      <h3>Quotation Details</h3>
      
      <div className="form-group">
        <label>Client Name</label>
        <input
          type="text"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Contact Person</label>
        <input
          type="text"
          name="contact_person"
          value={formData.contact_person}
          onChange={handleChange}
        />
      </div>

      <div className="inline-fields">
      <div className="form-group">
        <label>Contact Info</label>
        <input
          type="text"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date of Issue</label>
        <input
          type="date"
          name="date_of_issue"
          value={formData.date_of_issue}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Expiration Date</label>
        <input
          type="date"
          name="expiration_date"
          value={formData.expiration_date}
          onChange={handleChange}
        />
      </div></div>
      <div className="step-container">
      <div className="inline-fields">
      <div className="form-group">
        <label>Origin</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Destination</label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mode of Transport</label>
        <select
          name="mode_of_transport"
          value={formData.mode_of_transport}
          onChange={handleChange}
        >
          <option value="Air">Air</option>
          <option value="Sea">Sea</option>
          <option value="Land">Land</option>
        </select>
      </div>
      </div>
    </div>
    </div>
  );
};


export default QuotationDetailsStep;
