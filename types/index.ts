export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  profileImage?: string;
  businessName: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  userId: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  location: string;
  city: string;
  country: string;
  category: BusinessCategory;
  website?: string;
  description: string;
  profileImage?: string;
  faithAffirmation: boolean;
  churchName: string;
  christianDuration: ChristianDuration;
  churchInvolvement?: string;
  status: CompanyStatus;
  adminNotes?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type BusinessCategory = 
  | 'Retail'
  | 'Consulting'
  | 'Technology'
  | 'Healthcare'
  | 'Education'
  | 'Construction'
  | 'Food & Beverage'
  | 'Professional Services'
  | 'Manufacturing'
  | 'Transportation'
  | 'Real Estate'
  | 'Finance'
  | 'Media & Marketing'
  | 'Other';

export type ChristianDuration = 
  | '<1 year'
  | '1-5 years'
  | '5-10 years'
  | '>10 years';

export type CompanyStatus = 
  | 'pending'
  | 'approved'
  | 'rejected';

export interface AuthState {
  user: User | null;
  company: Company | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SearchFilters {
  keyword: string;
  category?: BusinessCategory;
  location?: string;
  city?: string;
  country?: string;
}