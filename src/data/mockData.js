export const mockUserData = {
  id: 1,
  name: 'Kiran Kumar',
  email: 'thedevdiaryofvijay@example.com',
  role: 'user',
  applications: {
    active: 2,
    pending: 1,
    approved: 1,
    rejected: 0
  },
  loans: {
    approved: 1,
    totalDisbursed: '5,00,000',
    active: 1
  },
  creditScore: 750,
  joinDate: '2024-01-15',
  lastLogin: new Date().toISOString()
};

export const mockLoans = [
  {
    id: 1,
    bankName: 'State Bank of India',
    bankLogo: '🏦',
    loanType: 'Personal Loan',
    interestRate: 10.5,
    maxAmount: 1000000,
    minAmount: 25000,
    tenure: '12-60 months',
    processingFee: 2,
    rating: 4.5,
    features: [
      'No collateral required',
      'Quick approval',
      'Flexible repayment',
      'Online application'
    ],
    eligibility: 'Minimum salary ₹25,000/month, Age 21-60 years',
    documents: ['Salary slips', 'Bank statements', 'PAN card', 'Aadhaar card'],
    specialOffer: 'Limited time offer - 0.5% rate reduction'
  },
  {
    id: 2,
    bankName: 'HDFC Bank',
    bankLogo: '🏛️',
    loanType: 'Home Loan',
    interestRate: 8.75,
    maxAmount: 10000000,
    minAmount: 100000,
    tenure: '12-360 months',
    processingFee: 0.5,
    rating: 4.8,
    features: [
      'Competitive rates',
      'Balance transfer facility',
      'Top-up loan available',
      'No prepayment charges'
    ],
    eligibility: 'Minimum salary ₹40,000/month, Age 21-65 years',
    documents: ['Salary slips', 'Property documents', 'Bank statements', 'PAN card'],
    specialOffer: null
  }
];