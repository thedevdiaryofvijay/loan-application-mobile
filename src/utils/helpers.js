export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-IN').format(number);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const calculateEMI = (principal, ratePercent, tenureYears) => {
  const monthlyRate = ratePercent / (12 * 100);
  const numberOfPayments = tenureYears * 12;
  
  if (monthlyRate === 0) return Math.round(principal / numberOfPayments);
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(emi);
};

export const calculateTotalAmount = (principal, ratePercent, tenureYears) => {
  const emi = calculateEMI(principal, ratePercent, tenureYears);
  return emi * tenureYears * 12;
};

export const calculateTotalInterest = (principal, ratePercent, tenureYears) => {
  const totalAmount = calculateTotalAmount(principal, ratePercent, tenureYears);
  return totalAmount - principal;
};

export const generateApplicationId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 3).toUpperCase();
  return `LA${timestamp}${random}`;
};

export const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TXN${timestamp}${random}`;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return '#28a745';
    case 'pending': return '#ffc107';
    case 'rejected': return '#dc3545';
    case 'under_review': return '#17a2b8';
    default: return '#6c757d';
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 'approved': return 'Approved';
    case 'pending': return 'Pending';
    case 'rejected': return 'Rejected';
    case 'under_review': return 'Under Review';
    default: return 'Unknown';
  }
};

export const getBankLogo = (bankName) => {
  const logos = {
    'State Bank of India': '🏛️',
    'HDFC Bank': '🏦',
    'ICICI Bank': '🏦',
    'Axis Bank': '🏦',
    'Punjab National Bank': '🏛️',
    'Kotak Mahindra Bank': '🏦',
    'Canara Bank': '🏛️',
    'Bank of Baroda': '🏛️',
    'Union Bank of India': '🏛️',
    'IndusInd Bank': '🏦',
    'Yes Bank': '🏦',
    'IDFC First Bank': '🏦',
    'Federal Bank': '🏦',
    'South Indian Bank': '🏦'
  };
  return logos[bankName] || '🏦';
};

export const getRandomRating = () => {
  return (Math.random() * 1.5 + 3.5).toFixed(1);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};