interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'player' | 'scout';
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: any;
  session: any;
  message?: string;
}

class AuthService {
  private baseUrl = 'http://localhost:5001/api';

  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create account');
    }

    return response.json();
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign in');
    }

    return response.json();
  }

  async signOut(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }
  }

  async getSession(token?: string): Promise<AuthResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/auth/session`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to get session');
    }

    return response.json();
  }

  // Store session in localStorage
  storeSession(session: any, user: any) {
    if (session?.access_token) {
      localStorage.setItem('auth_token', session.access_token);
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  // Get stored session
  getStoredSession() {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      return {
        token,
        user: JSON.parse(userData)
      };
    }
    
    return null;
  }

  // Clear stored session
  clearStoredSession() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService(); 