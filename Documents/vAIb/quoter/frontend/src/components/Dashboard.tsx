import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { authAPI, quoteAPI } from '../services/api';
import { User, Quote } from '../types';
import QuoteWizard from './QuoteWizard';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuoteWizard, setShowQuoteWizard] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [userData, quotesData] = await Promise.all([
        authAPI.getCurrentUser(),
        quoteAPI.getQuotes(),
      ]);
      setUser(userData);
      setQuotes(quotesData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  const handleQuoteCreated = () => {
    setShowQuoteWizard(false);
    loadDashboardData();
  };

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowQuoteDialog(true);
  };

  const handleDownloadPDF = async (quoteId: number) => {
    try {
      const response = await quoteAPI.getQuotePDF(quoteId);
      // In a real app, you would download the PDF file
      window.open(response.pdf_url, '_blank');
    } catch (err) {
      console.error('Failed to download PDF:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'sent':
        return 'primary';
      case 'accepted':
        return 'success';
      case 'declined':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (showQuoteWizard) {
    return <QuoteWizard onQuoteCreated={handleQuoteCreated} />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuoteRight ZA
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2">
                {user?.business_name}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2" color="textSecondary">
                {user?.email}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Welcome back, {user?.business_name}!
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  You're on the {user?.subscription_tier} plan
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowQuoteWizard(true)}
                  sx={{ mt: 2 }}
                >
                  Create New Quote
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Quotes
                </Typography>
                <Typography variant="h3" color="primary">
                  {quotes.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Accepted Quotes
                </Typography>
                <Typography variant="h3" color="success.main">
                  {quotes.filter(q => q.status === 'accepted').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h3" color="primary">
                  R{quotes.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.final_price, 0).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Quotes Table */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Quotes
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Quote ID</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {quotes.slice(0, 10).map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell>Q{quote.id}</TableCell>
                          <TableCell>{quote.job_title}</TableCell>
                          <TableCell>Client Name</TableCell>
                          <TableCell>R{quote.final_price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip
                              label={quote.status}
                              color={getStatusColor(quote.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(quote.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleViewQuote(quote)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDownloadPDF(quote.id)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Quote Details Dialog */}
      <Dialog
        open={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Quote Details - Q{selectedQuote?.id}
        </DialogTitle>
        <DialogContent>
          {selectedQuote && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedQuote.job_title}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {selectedQuote.industry} • {selectedQuote.location} • {selectedQuote.experience_level} level
              </Typography>
              <Typography variant="body1" gutterBottom>
                Duration: {selectedQuote.duration}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                R{selectedQuote.final_price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                AI Recommendation: R{selectedQuote.ai_recommendation_min.toFixed(2)} - R{selectedQuote.ai_recommendation_max.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {selectedQuote.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created: {new Date(selectedQuote.created_at).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuoteDialog(false)}>Close</Button>
          {selectedQuote && (
            <Button
              onClick={() => handleDownloadPDF(selectedQuote.id)}
              variant="contained"
            >
              Download PDF
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 