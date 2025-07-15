import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';
import { mockFAQs } from '../../data/mockData';

const ContactUsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Loan Application',
    'Application Status',
    'Document Upload',
    'Technical Issue',
    'Account Related',
    'Bank Query',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const subjectError = validateRequired(formData.subject, 'Subject');
    if (subjectError) newErrors.subject = subjectError;

    const categoryError = validateRequired(formData.category, 'Category');
    if (categoryError) newErrors.category = categoryError;

    const messageError = validateRequired(formData.message, 'Message');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      
      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="contact-container">
        <div className="contact-success">
          <div className="success-icon">✅</div>
          <h1>Thank You!</h1>
          <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
          <div className="success-details">
            <p><strong>Reference ID:</strong> CT{Date.now().toString().slice(-6)}</p>
            <p><strong>Expected Response:</strong> Within 24 hours</p>
          </div>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We're here to help! Get in touch with our support team.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-section">
            <h3>Get in Touch</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-details">
                  <h4>Phone Support</h4>
                  <p>1800-123-4567</p>
                  <p>Available 24/7</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-details">
                  <h4>Email Support</h4>
                  <p>support@loanapp.com</p>
                  <p>Response within 4 hours</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">💬</div>
                <div className="method-details">
                  <h4>Live Chat</h4>
                  <p>Available on website</p>
                  <p>Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-details">
                  <h4>Office Address</h4>
                  <p>123 Finance Street</p>
                  <p>Mumbai, Maharashtra 400001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Support Hours</h3>
            <div className="support-hours">
              <div className="hours-item">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
              <div className="hours-item">
                <span>Emergency Support</span>
                <span>24/7 Available</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Quick Links</h3>
            <div className="quick-links">
              <a href="/faq">❓ Frequently Asked Questions</a>
              <a href="/application-status">📊 Check Application Status</a>
              <a href="/available-loans">💰 Browse Available Loans</a>
              <a href="/loan-application">📝 Apply for Loan</a>
              <a href="/terms">📄 Terms of Service</a>
              <a href="/privacy">🔒 Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="Brief description of your query"
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className={errors.message ? 'error' : ''}
                placeholder="Please provide detailed information about your query..."
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-grid">
          {mockFAQs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="emergency-contact">
        <div className="emergency-info">
          <h3>🚨 Emergency Support</h3>
          <p>For urgent loan-related issues, call our emergency helpline:</p>
          <p className="emergency-number">📞 1800-URGENT-LOAN (1800-874-368-5626)</p>
          <p>Available 24/7 for critical issues</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;