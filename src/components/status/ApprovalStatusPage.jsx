import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockApprovalDetails } from '../../data/mockData';
import { getStatusColor, getStatusText, formatCurrency, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

const ApprovalStatusPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [applicationId, setApplicationId] = useState(location.state?.applicationId || '');
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.applicationId) {
      handleSearch();
    }
  }, [location.state]);

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // In real app, this would be an API call
      if (applicationId === 'LA001' || applicationId === mockApprovalDetails.id) {
        setApplicationData(mockApprovalDetails);
      } else {
        setError('Application not found. Please check your application ID.');
        setApplicationData(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleAcceptOffer = (offer) => {
    if (window.confirm(`Are you sure you want to accept the offer from ${offer.bankName}?`)) {
      alert(`Offer accepted from ${offer.bankName}. You will be redirected to the bank's portal for further processing.`);
    }
  };

  const renderTimeline = () => {
    if (!applicationData?.timeline) return null;

    return (
      <div className="timeline-section">
        <h3>Application Timeline</h3>
        <div className="timeline">
          {applicationData.timeline.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-date">{formatDate(event.date)}</div>
                <h4>{event.event}</h4>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBankOffers = () => {
    if (!applicationData?.bankOffers) return null;

    return (
      <div className="bank-offers-section">
        <h3>Bank Responses</h3>
        <div className="offers-grid">
          {applicationData.bankOffers.map((offer, index) => (
            <div key={index} className="offer-card">
              <div className="offer-header">
                <h4>{offer.bankName}</h4>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(offer.status) }}
                >
                  {getStatusText(offer.status)}
                </span>
              </div>
              
              {offer.status === 'approved' && (
                <div className="offer-details">
                  <div className="detail-row">
                    <span>Interest Rate:</span>
                    <span className="highlight">{offer.interestRate}% p.a.</span>
                  </div>
                  <div className="detail-row">
                    <span>Processing Fee:</span>
                    <span>{formatCurrency(offer.processingFee)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Approved Amount:</span>
                    <span className="highlight">{formatCurrency(offer.approvedAmount)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Monthly EMI:</span>
                    <span className="highlight">{formatCurrency(offer.emi)}</span>
                  </div>
                </div>
              )}
              
              <div className="offer-remarks">
                <p>{offer.remarks}</p>
              </div>
              
              {offer.status === 'approved' && (
                <div className="offer-actions">
                  <button 
                    className="btn btn-success"
                    onClick={() => handleAcceptOffer(offer)}
                  >
                    Accept Offer
                  </button>
                  <button className="btn btn-outline">
                    View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="approval-status-container">
      <div className="status-header">
        <h1>Check Approval Status</h1>
        <p>Enter your application ID to check the latest status</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSubmit}>
          <div className="search-form">
            <div className="form-group">
              <label htmlFor="applicationId">Application ID</label>
              <input
                type="text"
                id="applicationId"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="Enter your application ID (e.g., LA001)"
                className={error ? 'error' : ''}
              />
              {error && <span className="error-text">{error}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Check Status'}
            </button>
          </div>
        </form>
        
        <div className="search-help">
          <p>💡 Your application ID was sent to your email after submission</p>
          <p>📞 Need help? Call us at 1800-123-4567</p>
        </div>
      </div>

      {loading && <LoadingSpinner message="Fetching application details..." />}

      {applicationData && (
        <div className="results-section">
          <div className="applicant-info">
            <h3>Application Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Application ID:</span>
                <span className="value">{applicationData.id}</span>
              </div>
              <div className="info-item">
                <span className="label">Applicant Name:</span>
                <span className="value">{applicationData.applicantName}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{applicationData.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Phone:</span>
                <span className="value">{applicationData.phone}</span>
              </div>
              <div className="info-item">
                <span className="label">Loan Type:</span>
                <span className="value">{applicationData.loanType}</span>
              </div>
              <div className="info-item">
                <span className="label">Requested Amount:</span>
                <span className="value">{formatCurrency(applicationData.amount)}</span>
              </div>
              <div className="info-item">
                <span className="label">Tenure:</span>
                <span className="value">{applicationData.tenure} years</span>
              </div>
              <div className="info-item">
                <span className="label">Overall Status:</span>
                <span className="value">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(applicationData.status) }}
                  >
                    {getStatusText(applicationData.status)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {renderBankOffers()}
          {renderTimeline()}

          <div className="next-steps">
            <h3>Next Steps</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">📝</div>
                <h4>Review Offers</h4>
                <p>Compare interest rates and terms from different banks</p>
              </div>
              <div className="step-card">
                <div className="step-icon">✅</div>
                <h4>Accept Offer</h4>
                <p>Choose the best offer and accept it</p>
              </div>
              <div className="step-card">
                <div className="step-icon">🏦</div>
                <h4>Bank Processing</h4>
                <p>Complete final verification with the selected bank</p>
              </div>
              <div className="step-card">
                <div className="step-icon">💰</div>
                <h4>Loan Disbursal</h4>
                <p>Receive the loan amount in your account</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="help-section">
        <h3>Need Help?</h3>
        <div className="help-grid">
          <div className="help-item">
            <h4>📞 Call Support</h4>
            <p>1800-123-4567</p>
            <p>Available 24/7</p>
          </div>
          <div className="help-item">
            <h4>✉️ Email Support</h4>
            <p>support@loanapp.com</p>
            <p>Response within 24 hours</p>
          </div>
          <div className="help-item">
            <h4>💬 Live Chat</h4>
            <p>Available on website</p>
            <p>Mon-Fri, 9 AM - 6 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalStatusPage;