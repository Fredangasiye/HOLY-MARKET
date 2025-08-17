import axios from 'axios';
import { 
  User, 
  Client, 
  Quote, 
  QuoteFeatures, 
  QuoteItem, 
  PricingRecommendation,
  Industry,
  Location,
  AuthResponse
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: {
    email: string;
    password: string;
    business_name: string;
    industry: string;
    experience_level: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// AI API
export const aiAPI = {
  predictPricing: async (features: QuoteFeatures): Promise<PricingRecommendation> => {
    const response = await api.post('/ai/predict', features);
    return response.data;
  },

  getIndustries: async (): Promise<{ industries: Industry[] }> => {
    const response = await api.get('/ai/industries');
    return response.data;
  },

  getLocations: async (): Promise<{ locations: Location[] }> => {
    const response = await api.get('/ai/locations');
    return response.data;
  },
};

// Client API
export const clientAPI = {
  createClient: async (clientData: {
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
  }): Promise<Client> => {
    const response = await api.post('/clients', clientData);
    return response.data;
  },

  getClients: async (): Promise<Client[]> => {
    const response = await api.get('/clients');
    return response.data;
  },

  getClient: async (id: number): Promise<Client> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },
};

// Quote API
export const quoteAPI = {
  createQuote: async (quoteData: {
    features: QuoteFeatures;
    client_id?: number;
    client_info?: {
      name: string;
      company?: string;
      email?: string;
      phone?: string;
      address?: string;
    };
    items: QuoteItem[];
    terms?: string;
    validity_days: number;
  }): Promise<Quote> => {
    const response = await api.post('/quotes', quoteData);
    return response.data;
  },

  getQuotes: async (): Promise<Quote[]> => {
    const response = await api.get('/quotes');
    return response.data;
  },

  getQuote: async (id: number): Promise<Quote> => {
    const response = await api.get(`/quotes/${id}`);
    return response.data;
  },

  updateQuoteStatus: async (id: number, status: string): Promise<{ message: string }> => {
    const response = await api.put(`/quotes/${id}/status`, { status });
    return response.data;
  },

  getQuotePDF: async (id: number): Promise<{ pdf_url: string }> => {
    const response = await api.get(`/quotes/${id}/pdf`);
    return response.data;
  },
};

export default api; 