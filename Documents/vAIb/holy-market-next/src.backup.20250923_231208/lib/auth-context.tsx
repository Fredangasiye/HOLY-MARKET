"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, googleProvider, db, storage } from './firebase';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  authProvider: 'local' | 'google';
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, profileImage?: File) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
  updateProfileImage: (file: File) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const uploadImageToStorage = async (file: File, userId: string): Promise<string> => {
  if (!storage) {
    throw new Error('Firebase Storage not configured');
  }

  const imageRef = ref(storage, `profile-images/${userId}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

const saveUserToFirestore = async (user: User) => {
  if (!db) {
    console.warn('Firestore not configured. User data not saved.');
    return;
  }

  try {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

const getUserFromFirestore = async (uid: string): Promise<User | null> => {
  if (!db) {
    console.warn('Firestore not configured. Cannot fetch user data.');
    return null;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      // Firebase not configured, set loading to false
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Try to get user from Firestore first
          let userData = await getUserFromFirestore(firebaseUser.uid);
          
          if (!userData) {
            // Create new user if not found in Firestore
            userData = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              phone: firebaseUser.phoneNumber || '',
              profilePhoto: firebaseUser.photoURL || '',
              authProvider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'local',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            // Save to Firestore
            await saveUserToFirestore(userData);
          }
          
          setUser(userData);
        } catch (error) {
          console.error('Error handling auth state change:', error);
          setError('Failed to load user data');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    if (!auth) {
      setError('Authentication is currently in demo mode. Signing you in locally.');
      // Simulate successful signin for demo purposes
      setTimeout(() => {
        const demoUser: User = {
          id: 'demo-user-' + Date.now(),
          name: 'Demo User',
          email: email,
          phone: '',
          profilePhoto: '',
          authProvider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(demoUser);
        setError(null);
      }, 1000);
      return true;
    }

    try {
      setError(null);
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, profileImage?: File): Promise<boolean> => {
    if (!auth) {
      setError('Authentication is currently in demo mode. Your account will be created locally.');
      // Simulate successful signup for demo purposes
      setTimeout(() => {
        const demoUser: User = {
          id: 'demo-user-' + Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          profilePhoto: profileImage ? URL.createObjectURL(profileImage) : '',
          authProvider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(demoUser);
        setError(null);
      }, 1000);
      return true;
    }

    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password || '');
      const firebaseUser = userCredential.user;
      
      let profilePhotoUrl = userData.profilePhoto || '';
      
      // Upload profile image if provided
      if (profileImage) {
        try {
          profilePhotoUrl = await uploadImageToStorage(profileImage, firebaseUser.uid);
        } catch (uploadError) {
          console.warn('Failed to upload profile image:', uploadError);
          // Continue without image upload error
        }
      }
      
      // Update Firebase profile
      await updateProfile(firebaseUser, {
        displayName: userData.name,
        photoURL: profilePhotoUrl,
      });
      
      // Create user object
      const newUser: User = {
        id: firebaseUser.uid,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        profilePhoto: profilePhotoUrl,
        authProvider: 'local',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Save to Firestore
      await saveUserToFirestore(newUser);
      
      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    if (!auth || !googleProvider) {
      setError('Authentication is currently in demo mode. Signing you in with Google locally.');
      // Simulate successful Google signin for demo purposes
      setTimeout(() => {
        const demoUser: User = {
          id: 'demo-google-user-' + Date.now(),
          name: 'Demo Google User',
          email: 'demo@google.com',
          phone: '',
          profilePhoto: '',
          authProvider: 'google',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(demoUser);
        setError(null);
      }, 1000);
      return true;
    }

    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Check if user exists in Firestore
      let userData = await getUserFromFirestore(firebaseUser.uid);
      
      if (!userData) {
        // Create new user
        userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          phone: firebaseUser.phoneNumber || '',
          profilePhoto: firebaseUser.photoURL || '',
          authProvider: 'google',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        // Save to Firestore
        await saveUserToFirestore(userData);
      }
      
      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    if (!auth) {
      setUser(null);
      return;
    }

    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
    }
  };

  const updateProfileImage = async (file: File): Promise<boolean> => {
    if (!user || !auth) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);
      setLoading(true);

      // Upload new image
      const profilePhotoUrl = await uploadImageToStorage(file, user.id);

      // Update Firebase profile
      await updateProfile(auth.currentUser!, {
        photoURL: profilePhotoUrl,
      });

      // Update user object
      const updatedUser: User = {
        ...user,
        profilePhoto: profilePhotoUrl,
        updatedAt: new Date(),
      };

      // Save to Firestore
      await saveUserToFirestore(updatedUser);
      setUser(updatedUser);

      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to update profile image');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    clearError,
    updateProfileImage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};