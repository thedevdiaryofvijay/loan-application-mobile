import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { mockLoans } from '../../data/mockData';

const AvailableLoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    loanType: '',
    maxAmount: '',
    interestRate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoans(mockLoans);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredLoans = loans.filter(loan => {
    if (filters.loanType && loan.loanType !== filters.loanType) return false;
    if (filters.maxAmount && loan.maxAmount < parseInt(filters.maxAmount)) return false;
    if (filters.interestRate && loan.interestRate > parseFloat(filters.interestRate)) return false;
    return true;
  });

  const handleApplyNow = (loanId) => {
    navigate(`/loan-application?loanId=${loanId}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading available loans..." />;
  }

  return (
    <div className="loans-container">
      <div className="loans-header">
        <h1>Available Loans</h1>
        <p>Find the perfect loan for your needs</p>
      </div>

      <div className="filters-section">
        <h3>Filter Loans</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Loan Type</label>
            <select 
              name="loanType" 
              value={filters.loanType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Business Loan">Business Loan</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Maximum Amount</label>
            <select 
              name="maxAmount" 
              value={filters.maxAmount}
              onChange={handleFilterChange}
            >
              <option value="">Any Amount</option>
              <option value="100000">₹1,00,000</option>
              <option value="500000">₹5,00,000</option>
              <option value="1000000">₹10,00,000</option>
              <option value="5000000">₹50,00,000</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Interest Rate (max)</label>
            <select 
              name="interestRate" 
              value={filters.interestRate}
              onChange={handleFilterChange}
            >
              <option value="">Any Rate</option>
              <option value="8">Up to 8%</option>
              <option value="10">Up to 10%</option>
              <option value="12">Up to 12%</option>
              <option value="15">Up to 15%</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-section">
        <div className="results-header">
          <h3>Available Loans ({filteredLoans.length})</h3>
        </div>
        
        <div className="loans-grid">
          {filteredLoans.map(loan => (
            <div key={loan.id} className="loan-card">
              {loan.specialOffer && (
                <div className="special-offer">Special Offer</div>
              )}
              
              <div className="loan-header">
                <div className="bank-info">
                  <div className="bank-logo">{loan.bankLogo}</div>
                  <div>
                    <h3>{loan.loanType}</h3>
                    <p className="bank-name">{loan.bankName}</p>
                  </div>
                </div>
                <div className="rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-text">{loan.rating}</span>
                </div>
              </div>
              
              <div className="loan-details">
                <div className="detail-row">
                  <span className="label">Interest Rate</span>
                  <span className="value highlight">{loan.interestRate}% p.a.</span>
                </div>
                <div className="detail-row">
                  <span className="label">Loan Amount</span>
                  <span className="value">₹{loan.minAmount.toLocaleString()} - ₹{loan.maxAmount.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Tenure</span>
                  <span className="value">{loan.tenure}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Processing Fee</span>
                  <span className="value">{loan.processingFee}% of loan amount</span>
                </div>
              </div>
              
              <div className="loan-features">
                <h4>Key Features</h4>
                <ul>
                  {loan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="loan-eligibility">
                <h4>Eligibility</h4>
                <p>{loan.eligibility}</p>
              </div>
              
              <div className="loan-documents">
                <h4>Required Documents</h4>
                <div className="document-tags">
                  {loan.documents.map((doc, index) => (
                    <span key={index} className="document-tag">{doc}</span>
                  ))}
                </div>
              </div>
              
              <div className="loan-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate(`/loan-details/${loan.id}`)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleApplyNow(loan.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableLoansPage;