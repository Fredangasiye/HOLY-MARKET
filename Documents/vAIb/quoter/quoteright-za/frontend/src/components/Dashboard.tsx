import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface Quote {
  id: number;
  job_title: string;
  industry: string;
  final_price: number;
  status: string;
  created_at: string;
  client_id?: number;
}

interface User {
  id: number;
  email: string;
  business_name: string;
  industry: string;
  experience_level: string;
  subscription_tier: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserData();
    fetchQuotes();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to load user data');
    }
  };

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/quotes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const quotesData = await response.json();
        setQuotes(quotesData);
      }
    } catch (err) {
      setError('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#f39c12';
      case 'sent': return '#3498db';
      case 'accepted': return '#27ae60';
      case 'declined': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const totalQuotes = quotes.length;
  const totalValue = quotes.reduce((sum, quote) => sum + quote.final_price, 0);
  const acceptedQuotes = quotes.filter(quote => quote.status === 'accepted').length;

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>🎯 QuoteRight ZA</h1>
        </div>
        <div className="nav-user">
          <span>Welcome, {user?.business_name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button 
            onClick={() => navigate('/quote-wizard')} 
            className="create-quote-button"
          >
            + Create New Quote
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Quotes</h3>
            <p className="stat-number">{totalQuotes}</p>
          </div>
          <div className="stat-card">
            <h3>Total Value</h3>
            <p className="stat-number">R{totalValue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Accepted Quotes</h3>
            <p className="stat-number">{acceptedQuotes}</p>
          </div>
          <div className="stat-card">
            <h3>Success Rate</h3>
            <p className="stat-number">
              {totalQuotes > 0 ? Math.round((acceptedQuotes / totalQuotes) * 100) : 0}%
            </p>
          </div>
        </div>

        <div className="quotes-section">
          <h3>Recent Quotes</h3>
          {quotes.length === 0 ? (
            <div className="empty-state">
              <p>No quotes yet. Create your first quote to get started!</p>
              <button 
                onClick={() => navigate('/quote-wizard')} 
                className="create-quote-button"
              >
                Create Your First Quote
              </button>
            </div>
          ) : (
            <div className="quotes-grid">
              {quotes.slice(0, 6).map(quote => (
                <div key={quote.id} className="quote-card">
                  <div className="quote-header">
                    <h4>{quote.job_title}</h4>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(quote.status) }}
                    >
                      {quote.status}
                    </span>
                  </div>
                  <div className="quote-details">
                    <p><strong>Industry:</strong> {quote.industry}</p>
                    <p><strong>Price:</strong> R{quote.final_price.toLocaleString()}</p>
                    <p><strong>Date:</strong> {formatDate(quote.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 