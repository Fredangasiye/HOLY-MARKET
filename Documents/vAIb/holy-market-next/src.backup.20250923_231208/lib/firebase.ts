import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Demo Firebase configuration - Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo-app-id",
  measurementId: "G-DEMO123"
};

// Check if Firebase is properly configured
const isFirebaseConfigured = false; // Set to false for demo mode

let app: any = null;
let auth: any = null;
let googleProvider: any = null;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);
    
    // Initialize Google Auth Provider
    googleProvider = new GoogleAuthProvider();
    
    // Initialize Cloud Firestore and get a reference to the service
    db = getFirestore(app);
    
    // Initialize Firebase Storage and get a reference to the service
    storage = getStorage(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase not configured. Please set up your environment variables.');
}

export { auth, googleProvider, db, storage };
export default app;