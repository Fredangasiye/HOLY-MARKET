import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import { aiAPI, quoteAPI, clientAPI } from '../services/api';
import { QuoteFeatures, QuoteItem, PricingRecommendation, Industry, Location, Client } from '../types';

interface QuoteWizardProps {
  onQuoteCreated: () => void;
}

const QuoteWizard: React.FC<QuoteWizardProps> = ({ onQuoteCreated }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [features, setFeatures] = useState<QuoteFeatures>({
    industry: '',
    location: '',
    experience_level: 'mid',
    complexity: 'standard',
    duration_hours: 8,
    job_title: '',
  });

  const [pricingRecommendation, setPricingRecommendation] = useState<PricingRecommendation | null>(null);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
  });

  const steps = ['Job Details', 'AI Pricing', 'Quote Items', 'Client Info', 'Review & Generate'];

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [industriesRes, locationsRes, clientsRes] = await Promise.all([
        aiAPI.getIndustries(),
        aiAPI.getLocations(),
        clientAPI.getClients(),
      ]);
      setIndustries(industriesRes.industries);
      setLocations(locationsRes.locations);
      setClients(clientsRes);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Get AI pricing recommendation
      try {
        setLoading(true);
        const recommendation = await aiAPI.predictPricing(features);
        setPricingRecommendation(recommendation);
        
        // Initialize quote items with AI recommendation
        const suggestedPrice = (recommendation.min_price + recommendation.max_price) / 2;
        setQuoteItems([{
          description: features.job_title,
          quantity: features.duration_hours,
          unit_price: suggestedPrice / features.duration_hours,
          total: suggestedPrice,
        }]);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to get pricing recommendation');
        return;
      } finally {
        setLoading(false);
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const quoteData = {
        features,
        client_info: clientInfo,
        items: quoteItems,
        terms: 'Payment due within 30 days. 50% deposit required to commence work.',
        validity_days: 30,
      };

      await quoteAPI.createQuote(quoteData);
      onQuoteCreated();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteItem = (index: number, field: keyof QuoteItem, value: any) => {
    const newItems = [...quoteItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate total
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].total = newItems[index].quantity * newItems[index].unit_price;
    }
    
    setQuoteItems(newItems);
  };

  const addQuoteItem = () => {
    setQuoteItems([...quoteItems, {
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
    }]);
  };

  const removeQuoteItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                value={features.job_title}
                onChange={(e) => setFeatures({ ...features, job_title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Industry"
                value={features.industry}
                onChange={(e) => setFeatures({ ...features, industry: e.target.value })}
                required
              >
                {industries.map((industry) => (
                  <MenuItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Location"
                value={features.location}
                onChange={(e) => setFeatures({ ...features, location: e.target.value })}
                required
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Experience Level"
                value={features.experience_level}
                onChange={(e) => setFeatures({ ...features, experience_level: e.target.value })}
              >
                <MenuItem value="junior">Junior</MenuItem>
                <MenuItem value="mid">Mid-Level</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Complexity"
                value={features.complexity}
                onChange={(e) => setFeatures({ ...features, complexity: e.target.value })}
              >
                <MenuItem value="simple">Simple</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="complex">Complex</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Duration (hours)"
                value={features.duration_hours}
                onChange={(e) => setFeatures({ ...features, duration_hours: Number(e.target.value) })}
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box>
            {loading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : pricingRecommendation ? (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    AI Pricing Recommendation
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {pricingRecommendation.rationale}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    R{pricingRecommendation.min_price.toFixed(2)} - R{pricingRecommendation.max_price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Confidence: {(pricingRecommendation.confidence * 100).toFixed(0)}%
                  </Typography>
                </CardContent>
              </Card>
            ) : null}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Quote Items
            </Typography>
            {quoteItems.map((item, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={item.description}
                        onChange={(e) => updateQuoteItem(index, 'description', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) => updateQuoteItem(index, 'quantity', Number(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Unit Price"
                        value={item.unit_price}
                        onChange={(e) => updateQuoteItem(index, 'unit_price', Number(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <TextField
                        fullWidth
                        label="Total"
                        value={item.total.toFixed(2)}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeQuoteItem(index)}
                        disabled={quoteItems.length === 1}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Button variant="outlined" onClick={addQuoteItem}>
              Add Item
            </Button>
          </Box>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={clientInfo.company}
                onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={clientInfo.address}
                onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Quote Summary
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Job: {features.job_title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {features.industry} • {features.location} • {features.experience_level} level
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Duration: {features.duration_hours} hours • Complexity: {features.complexity}
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            {quoteItems.map((item, index) => (
              <Box key={index} sx={{ mb: 1, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <Typography variant="body1">{item.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.quantity} × R{item.unit_price.toFixed(2)} = R{item.total.toFixed(2)}
                </Typography>
              </Box>
            ))}
            
            <Typography variant="h5" sx={{ mt: 2, textAlign: 'right' }}>
              Total: R{quoteItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create New Quote
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Generating Quote...' : 'Generate Quote'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={loading || (activeStep === 0 && (!features.job_title || !features.industry || !features.location))}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default QuoteWizard; 