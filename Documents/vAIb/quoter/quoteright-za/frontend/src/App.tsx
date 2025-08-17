import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components (we'll create these next)
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import QuoteWizard from './components/QuoteWizard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quote-wizard" element={<QuoteWizard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
