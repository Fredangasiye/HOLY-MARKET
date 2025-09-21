# Firebase Setup Instructions

## Current Status
The app is currently running in **demo mode** without Firebase authentication. All authentication features will show "Firebase not configured" messages until you set up Firebase.

## To Enable Full Authentication:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `holy-market-next` (or your preferred name)
4. Follow the setup wizard

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Enable "Google" provider (optional but recommended)

### 3. Create Firestore Database
1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

### 4. Get Your Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 5. Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 6. Set Up Firestore Security Rules
1. Go to Firestore Database > Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read all user documents (for business listings)
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

### 7. Restart the Development Server
After updating the environment variables:
```bash
npm run dev
```

## Current Demo Features
- ✅ Navigation improvements (legible text)
- ✅ Continuous business form (no step-by-step sections)
- ✅ Protected routes (redirects to login when not authenticated)
- ✅ UI/UX improvements
- ⚠️ Authentication (demo mode - shows "Firebase not configured" messages)

## Testing Without Firebase
The app will work for browsing and viewing content, but authentication features will show configuration messages. This allows you to test the UI improvements while setting up Firebase.

## Need Help?
If you encounter any issues during Firebase setup, the app will continue to work in demo mode, so you can always test the UI improvements first.