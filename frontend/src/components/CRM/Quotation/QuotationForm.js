import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import QuotationDetailsStep from "./Steps/QuotationDetailsStep";

import PricingStep from "./Steps/PricingStep";
import AdditionalInfoStep from "./Steps/AdditionalInfoStep";
import "./QuotationForm.css";
import api from "../../../utils/axios";

const QuotationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

 
  const [quotation, setQuotation] = useState({
    date_of_issue: "", // Use null to represent a date until set
    expiration_date: "", // Date field
    client_name: "",
    contact_person: "",
    contact_info: "",
    client_address: "",
    origin: "",
    destination: "",
    mode_of_transport: "",
    incoterms: "",
    cargo_type: "",
    weight: 0, // Initialize as an integer
    volume: 0, // Integer/float
    base_freight_charges: 0.0, // Float
    additional_charges: 0.0, // Float
    discount: 0.0, // Float
    total_amount: 0.0, // Float
    currency: "USD",
    services_included: [],
    delivery_time_estimate: 0, // Integer
    special_instructions: "",
    remarks: "",
  });
  
  const steps = [
    <QuotationDetailsStep formData={quotation} setFormData={setQuotation} />,
    <PricingStep formData={quotation} setFormData={setQuotation} />,
    <AdditionalInfoStep formData={quotation} setFormData={setQuotation} />,
  ];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const response = await api.post("/crm/quotation/quotations", quotation);
  //     console.log("Server Response:", response.data);
  //     setFormSubmitted(true);
  //   } catch (err) {
  //     setError(err.response?.data?.message || "An error occurred");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  const formattedData = {
    ...quotation,
    date_of_issue: quotation.date_of_issue || null,
    expiration_date: quotation.expiration_date || null,
  };

  try {
    const response = await api.post("/crm/quotation/quotations", formattedData);
    console.log("Server Response:", response.data);
    setFormSubmitted(true);
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred");
  }
};

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="quotationForm-container">
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <Header message={{ name: "Create Quotation" }} />

          <div className="stepper">
            {[
              "Details",
              "Pricing",
              "Additional Info",
            ].map((label, index) => (
              <div
                key={index}
                className={`step ${currentStep === index + 1 ? "active" : ""}`}
              >
                {label}
              </div>
            ))}
          </div>

          {formSubmitted ? (
            <div className="success-message">
              Quotation Submitted Successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quotation-form">
              {steps[currentStep - 1]}

              <div className="navigation-buttons">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep}>
                    Back
                  </button>
                )}
                {currentStep < steps.length ? (
                  <button type="button" onClick={nextStep}>
                    Next
                  </button>
                ) : (
                  <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>

              {error && <div className="error-message">{error}</div>}
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuotationForm;
