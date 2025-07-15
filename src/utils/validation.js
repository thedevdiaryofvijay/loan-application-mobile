export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit phone number';
  return null;
};

export const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!pan) return 'PAN number is required';
  if (!panRegex.test(pan.toUpperCase())) return 'Please enter a valid PAN number (e.g., ABCDE1234F)';
  return null;
};

export const validateAadhar = (aadhar) => {
  const aadharRegex = /^[0-9]{12}$/;
  if (!aadhar) return 'Aadhar number is required';
  if (!aadharRegex.test(aadhar)) return 'Please enter a valid 12-digit Aadhar number';
  return null;
};

export const validatePincode = (pincode) => {
  const pincodeRegex = /^[0-9]{6}$/;
  if (!pincode) return 'Pincode is required';
  if (!pincodeRegex.test(pincode)) return 'Please enter a valid 6-digit pincode';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

export const validateAge = (dateOfBirth) => {
  if (!dateOfBirth) return 'Date of birth is required';
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 18) return 'You must be at least 18 years old';
  if (age > 70) return 'Maximum age limit is 70 years';
  
  return null;
};

export const validateLoanAmount = (amount, minAmount = 10000, maxAmount = 100000000) => {
  if (!amount) return 'Loan amount is required';
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return 'Please enter a valid amount';
  if (numAmount < minAmount) return `Minimum loan amount is ₹${minAmount.toLocaleString()}`;
  if (numAmount > maxAmount) return `Maximum loan amount is ₹${maxAmount.toLocaleString()}`;
  
  return null;
};

export const validateIncome = (income) => {
  if (!income) return 'Monthly income is required';
  
  const numIncome = parseFloat(income);
  if (isNaN(numIncome)) return 'Please enter a valid income amount';
  if (numIncome < 10000) return 'Minimum monthly income should be ₹10,000';
  
  return null;
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field];
    const value = formData[field];
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};