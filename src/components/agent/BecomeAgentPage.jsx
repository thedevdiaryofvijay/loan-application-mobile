import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { INDIAN_BANKS, INDIAN_STATES, DEPARTMENTS } from '../../utils/constants';
import { validateEmail, validatePhone, validatePAN, validateRequired } from '../../utils/validation';

const BecomeAgentPage = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    dateOfBirth: '',
    gender: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Professional Information
    experience: '',
    education: '',
    currentEmployment: '',
    department: '',
    specialization: [],
    
    // Bank Preferences
    preferredBanks: [],
    workingHours: '',
    
    // Documents
    panNumber: '',
    aadharNumber: '',
    resume: null,
    certificates: [],
    
    // Additional Information
    languagesKnown: [],
    whyJoin: '',
    expectations: '',
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToBackground: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const specializations = [
    'Personal Loans',
    'Home Loans',
    'Car Loans',
    'Business Loans',
    'Education Loans',
    'Gold Loans',
    'Credit Cards',
    'Insurance',
    'Investment Products'
  ];

  const languages = [
    'English',
    'Hindi',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Gujarati',
    'Kannada',
    'Malayalam',
    'Punjabi',
    'Urdu',
    'Odia'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'preferredBanks' || name === 'specialization' || name === 'languagesKnown') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      if (name === 'certificates') {
        setFormData(prev => ({
          ...prev,
          certificates: [...prev.certificates, files[0]]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
      
      const phoneError = validatePhone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
      
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    }

    if (step === 3) {
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.education) newErrors.education = 'Education is required';
      if (!formData.department) newErrors.department = 'Department is required';
      if (formData.specialization.length === 0) newErrors.specialization = 'Select at least one specialization';
    }

    if (step === 4) {
      if (formData.preferredBanks.length === 0) newErrors.preferredBanks = 'Select at least one bank';
      if (!formData.workingHours) newErrors.workingHours = 'Working hours is required';
    }

    if (step === 5) {
      const panError = validatePAN(formData.panNumber);
      if (panError) newErrors.panNumber = panError;
      
      if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
      if (!formData.resume) newErrors.resume = 'Resume is required';
    }

    if (step === 6) {
      if (formData.languagesKnown.length === 0) newErrors.languagesKnown = 'Select at least one language';
      if (!formData.whyJoin) newErrors.whyJoin = 'This field is required';
      if (!formData.expectations) newErrors.expectations = 'This field is required';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
      if (!formData.agreeToBackground) newErrors.agreeToBackground = 'You must agree to background verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Agent application submitted:', formData);
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="alternatePhone">Alternate Phone</label>
                <input
                  type="tel"
                  id="alternatePhone"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>Address Information</h3>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'error' : ''}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={errors.pincode ? 'error' : ''}
                />
                {errors.pincode && <span className="error-text">{errors.pincode}</span>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>Professional Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">Experience *</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={errors.experience ? 'error' : ''}
                >
                  <option value="">Select Experience</option>
                  <option value="fresher">Fresher</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                {errors.experience && <span className="error-text">{errors.experience}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="education">Education *</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={errors.education ? 'error' : ''}
                >
                  <option value="">Select Education</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="mba">MBA</option>
                  <option value="other">Other</option>
                </select>
                {errors.education && <span className="error-text">{errors.education}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="currentEmployment">Current Employment</label>
                <input
                  type="text"
                  id="currentEmployment"
                  name="currentEmployment"
                  value={formData.currentEmployment}
                  onChange={handleInputChange}
                  placeholder="Current company/employer"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Preferred Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={errors.department ? 'error' : ''}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <span className="error-text">{errors.department}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Specialization *</label>
              <div className="checkbox-grid">
                {specializations.map(spec => (
                  <label key={spec} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="specialization"
                      value={spec}
                      checked={formData.specialization.includes(spec)}
                      onChange={handleInputChange}
                    />
                    {spec}
                  </label>
                ))}
              </div>
              {errors.specialization && <span className="error-text">{errors.specialization}</span>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h3>Bank Preferences</h3>
            <div className="form-group">
              <label>Preferred Banks *</label>
              <div className="bank-grid">
                {INDIAN_BANKS.slice(0, 15).map(bank => (
                  <label key={bank} className="bank-checkbox">
                    <input
                      type="checkbox"
                      name="preferredBanks"
                      value={bank}
                      checked={formData.preferredBanks.includes(bank)}
                      onChange={handleInputChange}
                    />
                    {bank}
                  </label>
                ))}
              </div>
              {errors.preferredBanks && <span className="error-text">{errors.preferredBanks}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="workingHours">Preferred Working Hours *</label>
              <select
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleInputChange}
                className={errors.workingHours ? 'error' : ''}
              >
                <option value="">Select Working Hours</option>
                <option value="9-6">9 AM - 6 PM</option>
                <option value="10-7">10 AM - 7 PM</option>
                <option value="flexible">Flexible Hours</option>
                <option value="part-time">Part Time</option>
                <option value="weekends">Weekends Only</option>
              </select>
              {errors.workingHours && <span className="error-text">{errors.workingHours}</span>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h3>Document Upload</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="panNumber">PAN Number *</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="ABCDE1234F"
                  className={errors.panNumber ? 'error' : ''}
                />
                {errors.panNumber && <span className="error-text">{errors.panNumber}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="aadharNumber">Aadhar Number *</label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  placeholder="123456789012"
                  className={errors.aadharNumber ? 'error' : ''}
                />
                {errors.aadharNumber && <span className="error-text">{errors.aadharNumber}</span>}
              </div>
            </div>

            <div className="document-upload">
              <div className="upload-group">
                <label htmlFor="resume">Resume *</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className={errors.resume ? 'error' : ''}
                />
                <p className="upload-help">Upload your latest resume (PDF, DOC, DOCX)</p>
                {errors.resume && <span className="error-text">{errors.resume}</span>}
              </div>

              <div className="upload-group">
                <label htmlFor="certificates">Certificates (Optional)</label>
                <input
                  type="file"
                  id="certificates"
                  name="certificates"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                />
                <p className="upload-help">Upload relevant certificates and qualifications</p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label>Languages Known *</label>
              <div className="checkbox-grid">
                {languages.map(lang => (
                  <label key={lang} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="languagesKnown"
                      value={lang}
                      checked={formData.languagesKnown.includes(lang)}
                      onChange={handleInputChange}
                    />
                    {lang}
                  </label>
                ))}
              </div>
              {errors.languagesKnown && <span className="error-text">{errors.languagesKnown}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="whyJoin">Why do you want to join as an agent? *</label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleInputChange}
                rows="4"
                className={errors.whyJoin ? 'error' : ''}
                placeholder="Tell us about your motivation and interest..."
              />
              {errors.whyJoin && <span className="error-text">{errors.whyJoin}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="expectations">What are your expectations from this role? *</label>
              <textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleInputChange}
                rows="4"
                className={errors.expectations ? 'error' : ''}
                placeholder="Describe your expectations and goals..."
              />
              {errors.expectations && <span className="error-text">{errors.expectations}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> *
              </label>
              {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToBackground"
                  checked={formData.agreeToBackground}
                  onChange={handleInputChange}
                />
                I agree to background verification and reference checks *
              </label>
              {errors.agreeToBackground && <span className="error-text">{errors.agreeToBackground}</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Address', icon: '📍' },
    { number: 3, title: 'Professional', icon: '💼' },
    { number: 4, title: 'Banks', icon: '🏦' },
    { number: 5, title: 'Documents', icon: '📄' },
    { number: 6, title: 'Additional', icon: '✨' }
  ];

  if (submitted) {
    return (
      <div className="agent-container">
        <div className="agent-success">
          <div className="success-icon">🎉</div>
          <h1>Application Submitted Successfully!</h1>
          <p>Thank you for applying to become an agent with LoanApp.</p>
          <div className="success-details">
            <p><strong>Application ID:</strong> AG{Date.now().toString().slice(-8)}</p>
            <p><strong>Status:</strong> Under Review</p>
            <p><strong>Next Steps:</strong> We will contact you within 3-5 business days</p>
          </div>
          <div className="success-actions">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="btn btn-primary"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="btn btn-outline"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-container">
      <div className="agent-header">
        <h1>Become an Agent</h1>
        <p>Join our network of certified loan agents and help customers find the best loan solutions</p>
        <div className="agent-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <span>Attractive Commission</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎯</span>
            <span>Flexible Working Hours</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📈</span>
            <span>Career Growth</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🏆</span>
            <span>Performance Rewards</span>
          </div>
        </div>
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

      <div className="agent-form">
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-outline"
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeAgentPage;