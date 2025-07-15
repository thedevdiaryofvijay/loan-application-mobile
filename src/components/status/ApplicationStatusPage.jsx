import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockLoanApplications } from '../../data/mockData';
import { getStatusColor, getStatusText, formatCurrency, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

const ApplicationStatusPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    loanType: '',
    sortBy: 'appliedDate'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplications(mockLoanApplications);
      setFilteredApplications(mockLoanApplications);
      setLoading(false);
      
      // Show success message if coming from application submission
      if (location.state?.message) {
        alert(location.state.message);
      }
    }, 1000);
  }, [location.state]);

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, applications]);

  const applyFilters = () => {
    let filtered = [...applications];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    // Apply loan type filter
    if (filters.loanType) {
      filtered = filtered.filter(app => app.loanType === filters.loanType);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.bankName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'appliedDate':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'amount':
          return b.amount - a.amount;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      loanType: '',
      sortBy: 'appliedDate'
    });
    setSearchTerm('');
  };

  const handleViewDetails = (application) => {
    navigate('/approval-status', {
      state: { applicationId: application.id }
    });
  };

  const handleUpdateStatus = (applicationId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : app
      )
    );
  };

  const getStatusBadge = (status) => (
    <span 
      className="status-badge"
      style={{ backgroundColor: getStatusColor(status) }}
    >
      {getStatusText(status)}
    </span>
  );

  if (loading) {
    return <LoadingSpinner message="Loading your applications..." />;
  }

  return (
    <div className="application-status-container">
      <div className="status-header">
        <h1>My Loan Applications</h1>
        <p>Track and manage all your loan applications</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/loan-application')}
        >
          Apply for New Loan
        </button>
      </div>

      <div className="status-summary">
        <div className="summary-card">
          <div className="summary-number">{applications.length}</div>
          <div className="summary-label">Total Applications</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">
            {applications.filter(app => app.status === 'pending').length}
          </div>
          <div className="summary-label">Pending</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">
            {applications.filter(app => app.status === 'approved').length}
          </div>
          <div className="summary-label">Approved</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">
            {applications.filter(app => app.status === 'under_review').length}
          </div>
          <div className="summary-label">Under Review</div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-header">
          <h3>Filter Applications</h3>
          <button onClick={clearFilters} className="btn btn-outline">
            Clear Filters
          </button>
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by ID, name, or bank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="under_review">Under Review</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Loan Type</label>
            <select name="loanType" value={filters.loanType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Education Loan">Education Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Gold Loan">Gold Loan</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="appliedDate">Application Date</option>
              <option value="amount">Loan Amount</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      <div className="applications-section">
        {filteredApplications.length === 0 ? (
          <div className="no-applications">
            <p>No applications found matching your criteria.</p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="applications-grid">
            {filteredApplications.map(application => (
              <div key={application.id} className="application-card">
                <div className="card-header">
                  <div className="application-id">
                    <h3>{application.id}</h3>
                    <p className="application-type">{application.loanType}</p>
                  </div>
                  {getStatusBadge(application.status)}
                </div>

                <div className="card-content">
                  <div className="application-details">
                    <div className="detail-row">
                      <span className="label">Bank:</span>
                      <span className="value">{application.bankName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Amount:</span>
                      <span className="value">{formatCurrency(application.amount)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Tenure:</span>
                      <span className="value">{application.tenure} years</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Applied Date:</span>
                      <span className="value">{formatDate(application.appliedDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Last Updated:</span>
                      <span className="value">{formatDate(application.lastUpdated)}</span>
                    </div>
                    {application.emi && (
                      <div className="detail-row">
                        <span className="label">EMI:</span>
                        <span className="value highlight">{formatCurrency(application.emi)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(application)}
                  >
                    View Details
                  </button>
                  
                  {application.status === 'pending' && (
                    <button 
                      className="btn btn-outline"
                      onClick={() => navigate('/loan-application', { 
                        state: { editApplication: application } 
                      })}
                    >
                      Edit
                    </button>
                  )}
                  
                  {application.status === 'approved' && (
                    <button className="btn btn-success">
                      Accept Offer
                    </button>
                  )}
                </div>

                <div className="progress-indicator">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: application.status === 'approved' ? '100%' : 
                               application.status === 'under_review' ? '60%' : 
                               application.status === 'pending' ? '30%' : '0%'
                      }}
                    />
                  </div>
                  <div className="progress-text">
                    {application.status === 'approved' ? 'Approved - Ready for disbursal' :
                     application.status === 'under_review' ? 'Under review by bank' :
                     application.status === 'pending' ? 'Application submitted' :
                     'Application rejected'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatusPage;