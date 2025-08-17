export interface User {
  id: number;
  email: string;
  business_name: string;
  logo_url?: string;
  industry: string;
  experience_level: string;
  subscription_tier: string;
  is_active: boolean;
  created_at: string;
}

export interface Client {
  id: number;
  user_id: number;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export interface QuoteFeatures {
  industry: string;
  location: string;
  experience_level: string;
  complexity: string;
  duration_hours: number;
  job_title: string;
  additional_features?: Record<string, any>;
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quote {
  id: number;
  user_id: number;
  client_id?: number;
  industry: string;
  job_title: string;
  location: string;
  duration: string;
  experience_level: string;
  ai_recommendation_min: number;
  ai_recommendation_max: number;
  final_price: number;
  status: string;
  quote_data: string;
  pdf_url?: string;
  created_at: string;
  expires_at?: string;
}

export interface PricingRecommendation {
  min_price: number;
  max_price: number;
  confidence: number;
  rationale: string;
}

export interface Industry {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
} 