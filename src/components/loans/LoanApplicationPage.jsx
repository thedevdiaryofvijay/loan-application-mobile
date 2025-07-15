import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const LoanApplicationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    
    // Loan Details
    loanType: searchParams.get('loanType') || '',
    loanAmount: '',
    loanTenure: '',
    purpose: '',
    
    // Employment Details
    employmentType: '',
    employerName: '',
    designation: '',
    monthlyIncome: '',
    experience: '',
    
    // Address Details
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Documents
    documents: {}
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Loan Details', icon: '💰' },
    { number: 3, title: 'Employment', icon: '💼' },
    { number: 4, title: 'Address', icon: '📍' },
    { number: 5, title: 'Documents', icon: '📄' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: files[0]
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and redirect
      alert('Application submitted successfully!');
      navigate('/application-status');
    } catch (error) {
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                required
              >
                <option value="">Select marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>Loan Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Loan Type</label>
                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select loan type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="car">Car Loan</option>
                  <option value="business">Business Loan</option>
                </select>
              </div>
              <div className="form-group">
                <label>Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  placeholder="Enter loan amount"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Loan Tenure (months)</label>
                <select
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select tenure</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>
              <div className="form-group">
                <label>Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Purpose of loan"
                  required
                />
              </div>
            </div>
            
            {formData.loanAmount && formData.loanTenure && (
              <div className="emi-calculation">
                <h4>EMI Calculation</h4>
                <div className="emi-details">
                  <div className="emi-item">
                    <span>Loan Amount</span>
                    <span className="emi-value">₹{parseInt(formData.loanAmount).toLocaleString()}</span>
                  </div>
                  <div className="emi-item">
                    <span>Interest Rate</span>
                    <span className="emi-value">10.5% p.a.</span>
                  </div>
                  <div className="emi-item">
                    <span>Tenure</span>
                    <span className="emi-value">{formData.loanTenure} months</span>
                  </div>
                  <div className="emi-item">
                    <span>Monthly EMI</span>
                    <span className="emi-value">₹{Math.round((parseInt(formData.loanAmount) * 0.105 * Math.pow(1.105, formData.loanTenure/12)) / (Math.pow(1.105, formData.loanTenure/12) - 1) / 12).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>Employment Details</h3>
            <div className="form-group">
              <label>Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select employment type</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business Owner</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Employer Name</label>
                <input
                  type="text"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleInputChange}
                  placeholder="Enter employer name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Monthly Income</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  placeholder="Enter monthly income"
                  required
                />
              </div>
              <div className="form-group">
                <label>Work Experience (years)</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h3>Address Details</h3>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                rows="3"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select state</option>
                  <option value="andhra-pradesh">Andhra Pradesh</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="kerala">Kerala</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="telangana">Telangana</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="delhi">Delhi</option>
                  <option value="punjab">Punjab</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>PIN Code</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter PIN code"
                pattern="[0-9]{6}"
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h3>Upload Documents</h3>
            <div className="document-upload">
              <div className="upload-group">
                <label>PAN Card</label>
                <input
                  type="file"
                  name="panCard"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <p className="upload-help">Upload clear image of PAN card (PDF, JPG, PNG)</p>
              </div>
              
              <div className="upload-group">
                <label>Aadhaar Card</label>
                <input
                  type="file"
                  name="aadhaarCard"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <p className="upload-help">Upload clear image of Aadhaar card (PDF, JPG, PNG)</p>
              </div>
              
              <div className="upload-group">
                <label>Salary Slips (Last 3 months)</label>
                <input
                  type="file"
                  name="salarySlips"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  required
                />
                <p className="upload-help">Upload salary slips for last 3 months (PDF, JPG, PNG)</p>
              </div>
              
              <div className="upload-group">
                <label>Bank Statements (Last 6 months)</label>
                <input
                  type="file"
                  name="bankStatements"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  required
                />
                <p className="upload-help">Upload bank statements for last 6 months (PDF, JPG, PNG)</p>
              </div>
              
              <div className="upload-group">
                <label>Address Proof</label>
                <input
                  type="file"
                  name="addressProof"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <p className="upload-help">Upload address proof document (PDF, JPG, PNG)</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Submitting your application..." />;
  }

  return (
    <div className="loan-application-container">
      <div className="application-header">
        <h1>Loan Application</h1>
        <p>Complete the form below to apply for your loan</p>
      </div>

      <div className="step-indicator">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step-item ${currentStep === step.number ? 'active' : ''} ${
              currentStep > step.number ? 'completed' : ''
            }`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-info">
              <div className="step-number">{step.number}</div>
              <div className="step-title">{step.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="application-form">
        {renderStepContent()}
        
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          
          {currentStep < steps.length ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationPage;