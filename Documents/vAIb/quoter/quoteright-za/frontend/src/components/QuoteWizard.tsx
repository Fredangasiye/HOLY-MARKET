import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuoteWizard.css';

interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface ClientInfo {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface QuoteFeatures {
  industry: string;
  location: string;
  experience_level: string;
  complexity: string;
  duration_hours: number;
  job_title: string;
}

interface PricingRecommendation {
  min_price: number;
  max_price: number;
  confidence: number;
  rationale: string;
}

const QuoteWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [features, setFeatures] = useState<QuoteFeatures>({
    industry: 'graphic_design',
    location: 'gauteng',
    experience_level: 'mid',
    complexity: 'standard',
    duration_hours: 8,
    job_title: ''
  });

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: ''
  });

  const [items, setItems] = useState<QuoteItem[]>([
    { description: '', quantity: 1, unit_price: 0, total: 0 }
  ]);

  const [pricingRecommendation, setPricingRecommendation] = useState<PricingRecommendation | null>(null);
  const [terms, setTerms] = useState('');
  const [validityDays, setValidityDays] = useState(30);

  const navigate = useNavigate();

  const industries = [
    { id: 'graphic_design', name: 'Graphic Design' },
    { id: 'web_development', name: 'Web Development' },
    { id: 'copywriting', name: 'Copywriting' },
    { id: 'photography', name: 'Photography' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'consulting', name: 'Consulting' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const locations = [
    { id: 'gauteng', name: 'Gauteng' },
    { id: 'western_cape', name: 'Western Cape' },
    { id: 'kwazulu_natal', name: 'KwaZulu-Natal' },
    { id: 'eastern_cape', name: 'Eastern Cape' },
    { id: 'free_state', name: 'Free State' },
    { id: 'mpumalanga', name: 'Mpumalanga' },
    { id: 'limpopo', name: 'Limpopo' },
    { id: 'north_west', name: 'North West' },
    { id: 'northern_cape', name: 'Northern Cape' }
  ];

  const experienceLevels = [
    { id: 'junior', name: 'Junior (0-2 years)' },
    { id: 'mid', name: 'Mid-level (3-5 years)' },
    { id: 'senior', name: 'Senior (5+ years)' }
  ];

  const complexityLevels = [
    { id: 'simple', name: 'Simple' },
    { id: 'standard', name: 'Standard' },
    { id: 'complex', name: 'Complex' },
    { id: 'expert', name: 'Expert' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFeatureChange = (field: keyof QuoteFeatures, value: string | number) => {
    setFeatures(prev => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof QuoteItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Calculate total for this item
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].total = newItems[index].quantity * newItems[index].unit_price;
    }
    
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const getPricingRecommendation = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/ai/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(features)
      });

      if (response.ok) {
        const data = await response.json();
        setPricingRecommendation(data);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to get pricing recommendation');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          features,
          client_info: clientInfo,
          items,
          terms,
          validity_days: validityDays
        })
      });

      if (response.ok) {
        setSuccess('Quote created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create quote');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !features.job_title) {
      setError('Please enter a job title');
      return;
    }
    if (currentStep === 2 && !clientInfo.name) {
      setError('Please enter client name');
      return;
    }
    if (currentStep === 3 && items.some(item => !item.description || item.total === 0)) {
      setError('Please fill in all item details');
      return;
    }
    
    setError('');
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep1 = () => (
    <div className="wizard-step">
      <h3>Step 1: Project Details</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            value={features.job_title}
            onChange={(e) => handleFeatureChange('job_title', e.target.value)}
            placeholder="e.g., Website Design, Logo Creation"
            required
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <select
            value={features.industry}
            onChange={(e) => handleFeatureChange('industry', e.target.value)}
          >
            {industries.map(industry => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <select
            value={features.location}
            onChange={(e) => handleFeatureChange('location', e.target.value)}
          >
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Experience Level</label>
          <select
            value={features.experience_level}
            onChange={(e) => handleFeatureChange('experience_level', e.target.value)}
          >
            {experienceLevels.map(level => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Complexity</label>
          <select
            value={features.complexity}
            onChange={(e) => handleFeatureChange('complexity', e.target.value)}
          >
            {complexityLevels.map(complexity => (
              <option key={complexity.id} value={complexity.id}>
                {complexity.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Duration (hours)</label>
          <input
            type="number"
            value={features.duration_hours}
            onChange={(e) => handleFeatureChange('duration_hours', parseFloat(e.target.value))}
            min="1"
            step="0.5"
          />
        </div>
      </div>

      <div className="ai-recommendation-section">
        <button 
          type="button" 
          onClick={getPricingRecommendation}
          className="ai-button"
          disabled={loading}
        >
          {loading ? 'Getting AI Recommendation...' : '🤖 Get AI Pricing Recommendation'}
        </button>

        {pricingRecommendation && (
          <div className="recommendation-card">
            <h4>AI Pricing Recommendation</h4>
            <div className="recommendation-details">
              <p><strong>Range:</strong> R{pricingRecommendation.min_price.toLocaleString()} - R{pricingRecommendation.max_price.toLocaleString()}</p>
              <p><strong>Confidence:</strong> {pricingRecommendation.confidence}%</p>
              <p><strong>Rationale:</strong> {pricingRecommendation.rationale}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="wizard-step">
      <h3>Step 2: Client Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Client Name *</label>
          <input
            type="text"
            value={clientInfo.name}
            onChange={(e) => handleClientChange('name', e.target.value)}
            placeholder="Enter client name"
            required
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            value={clientInfo.company}
            onChange={(e) => handleClientChange('company', e.target.value)}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={clientInfo.email}
            onChange={(e) => handleClientChange('email', e.target.value)}
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={clientInfo.phone}
            onChange={(e) => handleClientChange('phone', e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            value={clientInfo.address}
            onChange={(e) => handleClientChange('address', e.target.value)}
            placeholder="Enter full address"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="wizard-step">
      <h3>Step 3: Quote Items</h3>
      <div className="items-section">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h4>Item {index + 1}</h4>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="remove-item-button"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="item-form">
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Describe the service or product"
                />
              </div>

              <div className="item-quantity-price">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                    min="1"
                    step="1"
                  />
                </div>

                <div className="form-group">
                  <label>Unit Price (R)</label>
                  <input
                    type="number"
                    value={item.unit_price}
                    onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Total (R)</label>
                  <input
                    type="number"
                    value={item.total}
                    readOnly
                    className="readonly"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addItem} className="add-item-button">
          + Add Item
        </button>

        <div className="total-section">
          <h3>Total: R{calculateTotal().toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="wizard-step">
      <h3>Step 4: Final Details</h3>
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Terms & Conditions</label>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Enter your terms and conditions..."
            rows={6}
          />
        </div>

        <div className="form-group">
          <label>Quote Validity (days)</label>
          <input
            type="number"
            value={validityDays}
            onChange={(e) => setValidityDays(parseInt(e.target.value))}
            min="1"
            max="365"
          />
        </div>
      </div>

      <div className="quote-summary">
        <h4>Quote Summary</h4>
        <div className="summary-details">
          <p><strong>Job:</strong> {features.job_title}</p>
          <p><strong>Client:</strong> {clientInfo.name}</p>
          <p><strong>Items:</strong> {items.length}</p>
          <p><strong>Total:</strong> R{calculateTotal().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="quote-wizard-container">
      <nav className="wizard-nav">
        <div className="nav-brand">
          <h1>🎯 QuoteRight ZA</h1>
        </div>
        <div className="nav-actions">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="wizard-content">
        <div className="wizard-header">
          <h2>Create New Quote</h2>
          <div className="step-indicator">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`step-dot ${currentStep >= step ? 'active' : ''}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {renderStep()}

        <div className="wizard-actions">
          {currentStep > 1 && (
            <button onClick={prevStep} className="prev-button">
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button onClick={nextStep} className="next-button">
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Creating Quote...' : 'Create Quote'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteWizard; 