import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcka9QoUd7D-UVNzdAWt05ITHFE07yVtQ",
  authDomain: "holy-market-prod.firebaseapp.com",
  projectId: "holy-market-prod",
  storageBucket: "holy-market-prod.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:holy-market-prod",
  measurementId: "G-HOLYMARKET123"
};

// Check if Firebase is properly configured
const isFirebaseConfigured = true; // Enable Firebase for production

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