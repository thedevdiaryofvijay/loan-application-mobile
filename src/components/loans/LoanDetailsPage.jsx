import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAvailableLoans, generateMoreLoans } from '../../data/mockData';
import { formatCurrency, calculateEMI, calculateTotalAmount, calculateTotalInterest } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

const LoanDetailsPage = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculatorData, setCalculatorData] = useState({
    amount: '',
    tenure: '5',
    showCalculation: false
  });

  useEffect(() => {
    // Simulate API call to get loan details
    setTimeout(() => {
      const allLoans = [...mockAvailableLoans, ...generateMoreLoans()];
      const foundLoan = allLoans.find(l => l.id.toString() === loanId);
      
      if (foundLoan) {
        setLoan(foundLoan);
        setCalculatorData(prev => ({
          ...prev,
          amount: foundLoan.minAmount.toString()
        }));
      }
      setLoading(false);
    }, 1000);
  }, [loanId]);

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculatorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateLoan = () => {
    if (calculatorData.amount && calculatorData.tenure) {
      setCalculatorData(prev => ({
        ...prev,
        showCalculation: true
      }));
    }
  };

  const handleApplyLoan = () => {
    navigate('/loan-application', {
      state: { selectedLoan: loan }
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  if (loading) {
    return <LoadingSpinner message="Loading loan details..." />;
  }

  if (!loan) {
    return (
      <div className="error-page">
        <h1>Loan Not Found</h1>
        <p>The loan you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/available-loans')} className="btn btn-primary">
          Browse Available Loans
        </button>
      </div>
    );
  }

  const emi = calculatorData.showCalculation ? calculateEMI(
    parseFloat(calculatorData.amount),
    loan.interestRate,
    parseFloat(calculatorData.tenure)
  ) : 0;

  const totalAmount = calculatorData.showCalculation ? calculateTotalAmount(
    parseFloat(calculatorData.amount),
    loan.interestRate,
    parseFloat(calculatorData.tenure)
  ) : 0;

  const totalInterest = calculatorData.showCalculation ? calculateTotalInterest(
    parseFloat(calculatorData.amount),
    loan.interestRate,
    parseFloat(calculatorData.tenure)
  ) : 0;

  return (
    <div className="loan-details-container">
      <div className="loan-details-header">
        <button onClick={() => navigate('/available-loans')} className="back-btn">
          ← Back to Loans
        </button>
        <div className="loan-title">
          <span className="bank-logo">{loan.bankLogo}</span>
          <div>
            <h1>{loan.loanType}</h1>
            <p className="bank-name">{loan.bankName}</p>
          </div>
        </div>
        <div className="loan-rating">
          <span className="stars">{renderStars(loan.rating)}</span>
          <span className="rating-text">{loan.rating}/5</span>
        </div>
      </div>

      {loan.specialOffer && (
        <div className="special-offer-banner">
          <span className="offer-icon">🎉</span>
          <span className="offer-text">{loan.specialOffer}</span>
        </div>
      )}

      <div className="loan-details-content">
        <div className="loan-info-section">
          <div className="info-card">
            <h3>Interest Rate</h3>
            <div className="info-value highlight">{loan.interestRate}% per annum</div>
            <p className="info-note">Fixed rate for entire tenure</p>
          </div>

          <div className="info-card">
            <h3>Processing Fee</h3>
            <div className="info-value">{loan.processingFee}% + GST</div>
            <p className="info-note">One-time fee at disbursal</p>
          </div>

          <div className="info-card">
            <h3>Loan Amount</h3>
            <div className="info-value">
              {formatCurrency(loan.minAmount)} - {formatCurrency(loan.maxAmount)}
            </div>
            <p className="info-note">Based on income and profile</p>
          </div>

          <div className="info-card">
            <h3>Tenure</h3>
            <div className="info-value">{loan.tenure}</div>
            <p className="info-note">Flexible repayment options</p>
          </div>
        </div>

        <div className="loan-sections">
          <div className="section">
            <h3>Key Features</h3>
            <div className="features-grid">
              {loan.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Eligibility Criteria</h3>
            <div className="eligibility-info">
              <p>{loan.eligibility}</p>
              <div className="eligibility-details">
                <div className="eligibility-item">
                  <strong>Age:</strong> 21-65 years
                </div>
                <div className="eligibility-item">
                  <strong>Income:</strong> Minimum as per bank norms
                </div>
                <div className="eligibility-item">
                  <strong>Employment:</strong> Salaried/Self-employed
                </div>
                <div className="eligibility-item">
                  <strong>Credit Score:</strong> 650+ preferred
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Required Documents</h3>
            <div className="documents-grid">
              {loan.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <span className="document-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Loan Calculator</h3>
            <div className="calculator-section">
              <div className="calculator-inputs">
                <div className="input-group">
                  <label>Loan Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    value={calculatorData.amount}
                    onChange={handleCalculatorChange}
                    min={loan.minAmount}
                    max={loan.maxAmount}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="input-group">
                  <label>Tenure (Years)</label>
                  <select
                    name="tenure"
                    value={calculatorData.tenure}
                    onChange={handleCalculatorChange}
                  >
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="7">7 Years</option>
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                  </select>
                </div>
                <button onClick={calculateLoan} className="btn btn-primary">
                  Calculate EMI
                </button>
              </div>

              {calculatorData.showCalculation && (
                <div className="calculation-results">
                  <h4>EMI Calculation Results</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-label">Monthly EMI</span>
                      <span className="result-value highlight">{formatCurrency(emi)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Total Amount</span>
                      <span className="result-value">{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Total Interest</span>
                      <span className="result-value">{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Interest Rate</span>
                      <span className="result-value">{loan.interestRate}% p.a.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="section">
            <h3>Why Choose This Loan?</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">🚀</span>
                <div>
                  <strong>Quick Processing</strong>
                  <p>Get approval in 24-48 hours with minimal documentation</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <div>
                  <strong>Competitive Rates</strong>
                  <p>Best-in-class interest rates with transparent pricing</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔒</span>
                <div>
                  <strong>Secure Process</strong>
                  <p>Bank-grade security for all your personal information</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📞</span>
                <div>
                  <strong>Expert Support</strong>
                  <p>Dedicated relationship manager for personalized service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="loan-actions-section">
        <div className="actions-card">
          <h3>Ready to Apply?</h3>
          <p>Get started with your loan application in just a few minutes</p>
          <div className="action-buttons">
            <button onClick={handleApplyLoan} className="btn btn-primary btn-large">
              Apply Now
            </button>
            <button 
              onClick={() => navigate('/available-loans')}
              className="btn btn-outline btn-large"
            >
              Compare Loans
            </button>
          </div>
          <p className="action-note">
            No hidden charges • Transparent process • Expert guidance
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsPage;