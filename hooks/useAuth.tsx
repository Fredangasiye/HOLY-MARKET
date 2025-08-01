import { useState, useEffect, createContext, useContext } from 'react';
import { User, Company, AuthState } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '+1234567890',
    whatsappNumber: '+1234567890',
    businessName: 'Grace Tech Solutions',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockCompanies: Company[] = [
  {
    id: '1',
    userId: '1',
    businessName: 'Grace Tech Solutions',
    ownerName: 'John Smith',
    email: 'info@gracetech.com',
    phone: '+1234567890',
    whatsappNumber: '+1234567890',
    location: 'Cape Town, South Africa',
    city: 'Cape Town',
    country: 'South Africa',
    category: 'Technology',
    website: 'https://gracetech.com',
    description: 'Christian-led technology consulting firm specializing in digital transformation and software development.',
    faithAffirmation: true,
    churchName: 'Grace Community Church',
    christianDuration: '5-10 years',
    churchInvolvement: 'Elder and Tech Ministry Leader',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
    approvedAt: new Date(),
  },
  {
    id: '2',
    userId: '2',
    businessName: 'Faithful Accounting',
    ownerName: 'Sarah Johnson',
    email: 'sarah@faithfulaccounting.com',
    phone: '+1234567891',
    whatsappNumber: '+1234567891',
    location: 'Johannesburg, South Africa',
    city: 'Johannesburg',
    country: 'South Africa',
    category: 'Professional Services',
    website: 'https://faithfulaccounting.com',
    description: 'Providing honest and reliable accounting services with Christian values at the core of our practice.',
    faithAffirmation: true,
    churchName: 'Hope Baptist Church',
    christianDuration: '>10 years',
    churchInvolvement: 'Sunday School Teacher',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
    approvedAt: new Date(),
  },
  {
    id: '3',
    userId: '3',
    businessName: 'Kingdom Construction',
    ownerName: 'Michael Davis',
    email: 'mike@kingdomconstruction.com',
    phone: '+1234567892',
    location: 'Durban, South Africa',
    city: 'Durban',
    country: 'South Africa',
    category: 'Construction',
    description: 'Building homes and commercial spaces with integrity, excellence, and Christian values.',
    faithAffirmation: true,
    churchName: 'First Baptist Durban',
    christianDuration: '1-5 years',
    churchInvolvement: 'Member',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateCompany: (companyData: Partial<Company>) => Promise<boolean>;
  createCompany: (companyData: Partial<Company>) => Promise<boolean>;
}>({
  authState: {
    user: null,
    company: null,
    isLoading: false,
    isAuthenticated: false,
  },
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateUser: async () => false,
  updateCompany: async () => false,
  createCompany: async () => false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    company: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for stored auth on app start
  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Convert string dates back to Date objects
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        
        const company = mockCompanies.find(c => c.userId === user.id);
        setAuthState({
          user,
          company: company || null,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      const company = mockCompanies.find(c => c.userId === user.id);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        company: company || null,
        isLoading: false,
        isAuthenticated: true,
      });
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      whatsappNumber: userData.whatsappNumber,
      profileImage: userData.profileImage,
      businessName: userData.businessName || '',
      website: userData.website,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockUsers.push(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      company: null,
      isLoading: false,
      isAuthenticated: true,
    });
    
    return true;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setAuthState({
      user: null,
      company: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;
    
    const updatedUser = { ...authState.user, ...userData, updatedAt: new Date() };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    setAuthState(prev => ({ ...prev, user: updatedUser }));
    return true;
  };

  const updateCompany = async (companyData: Partial<Company>): Promise<boolean> => {
    if (!authState.company) return false;
    
    const updatedCompany = { ...authState.company, ...companyData, updatedAt: new Date() };
    setAuthState(prev => ({ ...prev, company: updatedCompany }));
    return true;
  };

  const createCompany = async (companyData: Partial<Company>): Promise<boolean> => {
    if (!authState.user) return false;
    
    const newCompany: Company = {
      id: Date.now().toString(),
      userId: authState.user.id,
      businessName: companyData.businessName || '',
      ownerName: companyData.ownerName || '',
      email: companyData.email || '',
      phone: companyData.phone || '',
      whatsappNumber: companyData.whatsappNumber,
      location: companyData.location || '',
      city: companyData.city || '',
      country: companyData.country || '',
      category: companyData.category || 'Other',
      website: companyData.website,
      description: companyData.description || '',
      profileImage: companyData.profileImage,
      faithAffirmation: companyData.faithAffirmation || false,
      churchName: companyData.churchName || '',
      christianDuration: companyData.christianDuration || '<1 year',
      churchInvolvement: companyData.churchInvolvement,
      status: 'pending',
      adminNotes: companyData.adminNotes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockCompanies.push(newCompany);
    setAuthState(prev => ({ ...prev, company: newCompany }));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      authState,
      login,
      register,
      logout,
      updateUser,
      updateCompany,
      createCompany,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCompanies = async (filters?: { keyword?: string; category?: string; location?: string }) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCompanies = mockCompanies.filter(c => c.status === 'approved');
    
    if (filters?.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredCompanies = filteredCompanies.filter(c => 
        c.businessName.toLowerCase().includes(keyword) ||
        c.description.toLowerCase().includes(keyword) ||
        c.category.toLowerCase().includes(keyword)
      );
    }
    
    if (filters?.category) {
      filteredCompanies = filteredCompanies.filter(c => c.category === filters.category);
    }
    
    if (filters?.location) {
      const location = filters.location.toLowerCase();
      filteredCompanies = filteredCompanies.filter(c => 
        c.location.toLowerCase().includes(location) ||
        c.city.toLowerCase().includes(location) ||
        c.country.toLowerCase().includes(location)
      );
    }
    
    setCompanies(filteredCompanies);
    setIsLoading(false);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return { companies, isLoading, getCompanies };
};