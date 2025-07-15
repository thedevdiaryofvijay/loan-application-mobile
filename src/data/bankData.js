import { INDIAN_BANKS } from '../utils/constants';
import { getBankLogo } from '../utils/helpers';

export const bankData = {
  'State Bank of India': {
    logo: getBankLogo('State Bank of India'),
    fullName: 'State Bank of India',
    shortName: 'SBI',
    type: 'Public Sector',
    website: 'https://www.sbi.co.in',
    customerCare: '1800-11-2211',
    specialties: ['Home Loans', 'Personal Loans', 'Business Loans'],
    minCreditScore: 650,
    processingTime: '3-7 days',
    features: ['Largest bank network', 'Competitive rates', 'Quick processing']
  },
  'HDFC Bank': {
    logo: getBankLogo('HDFC Bank'),
    fullName: 'HDFC Bank Limited',
    shortName: 'HDFC',
    type: 'Private Sector',
    website: 'https://www.hdfcbank.com',
    customerCare: '1800-202-6161',
    specialties: ['Personal Loans', 'Home Loans', 'Car Loans'],
    minCreditScore: 700,
    processingTime: '24-48 hours',
    features: ['Digital first', 'Instant approval', 'Flexible terms']
  },
  'ICICI Bank': {
    logo: getBankLogo('ICICI Bank'),
    fullName: 'ICICI Bank Limited',
    shortName: 'ICICI',
    type: 'Private Sector',
    website: 'https://www.icicibank.com',
    customerCare: '1800-1080',
    specialties: ['Personal Loans', 'Home Loans', 'Business Loans'],
    minCreditScore: 675,
    processingTime: '2-5 days',
    features: ['Online process', 'Attractive rates', 'Quick disbursal']
  },
  'Axis Bank': {
    logo: getBankLogo('Axis Bank'),
    fullName: 'Axis Bank Limited',
    shortName: 'Axis',
    type: 'Private Sector',
    website: 'https://www.axisbank.com',
    customerCare: '1800-419-5555',
    specialties: ['Personal Loans', 'Home Loans', 'Education Loans'],
    minCreditScore: 700,
    processingTime: '1-3 days',
    features: ['Premium banking', 'Personalized service', 'Competitive rates']
  },
  'Punjab National Bank': {
    logo: getBankLogo('Punjab National Bank'),
    fullName: 'Punjab National Bank',
    shortName: 'PNB',
    type: 'Public Sector',
    website: 'https://www.pnbindia.in',
    customerCare: '1800-180-2222',
    specialties: ['Home Loans', 'Personal Loans', 'Gold Loans'],
    minCreditScore: 650,
    processingTime: '5-10 days',
    features: ['Heritage bank', 'Government backing', 'Wide network']
  },
  'Kotak Mahindra Bank': {
    logo: getBankLogo('Kotak Mahindra Bank'),
    fullName: 'Kotak Mahindra Bank Limited',
    shortName: 'Kotak',
    type: 'Private Sector',
    website: 'https://www.kotak.com',
    customerCare: '1800-274-0110',
    specialties: ['Personal Loans', 'Business Loans', 'Home Loans'],
    minCreditScore: 675,
    processingTime: '2-4 days',
    features: ['Innovative products', 'Digital banking', 'Customer focused']
  }
};

export const getBankDetails = (bankName) => {
  return bankData[bankName] || {
    logo: getBankLogo(bankName),
    fullName: bankName,
    shortName: bankName.split(' ')[0],
    type: 'Bank',
    website: '#',
    customerCare: '1800-XXX-XXXX',
    specialties: ['Various Loans'],
    minCreditScore: 650,
    processingTime: '3-7 days',
    features: ['Banking services', 'Loan products', 'Customer support']
  };
};

export const getTopBanks = () => {
  return Object.keys(bankData).slice(0, 6);
};

export const getBanksByLoanType = (loanType) => {
  return Object.entries(bankData)
    .filter(([_, bank]) => bank.specialties.includes(loanType))
    .map(([name, _]) => name);
};