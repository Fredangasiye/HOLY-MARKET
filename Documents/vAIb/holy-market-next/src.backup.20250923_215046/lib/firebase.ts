import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcka9QoUd7D-UVNzdAWt05ITHFE07yVtQ",
  authDomain: "holy-market-d8f15.firebaseapp.com",
  projectId: "holy-market-d8f15",
  storageBucket: "holy-market-d8f15.firebasestorage.app",
  messagingSenderId: "43977078996",
  appId: "1:43977078996:web:688f1f8bfb8ed88193e341",
  measurementId: "G-EB67KEGR2S"
};

// Check if Firebase is properly configured
const isFirebaseConfigured = true;

let app: any = null;
let auth: any = null;
let googleProvider: any = null;
let db: any = null;

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
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase not configured. Please set up your environment variables.');
}

export { auth, googleProvider, db };
export default app;