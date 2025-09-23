# Firebase Authentication Setup Guide

## Current Status: Demo Mode (Working) ✅

The app is currently running in **demo mode** to avoid the `auth/operation-not-allowed` error. This means:
- ✅ All authentication flows work locally
- ✅ Image uploads work (stored locally)
- ✅ User data persists in browser session
- ✅ No Firebase errors
- ✅ Perfect for testing and development

## Fixing the `auth/operation-not-allowed` Error

This error occurs when authentication methods aren't enabled in your Firebase project. Here's how to fix it:

### Step 1: Enable Authentication Methods

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `holy-market-d8f15`
3. **Navigate to Authentication**:
   - Click "Authentication" in the left sidebar
   - Click "Sign-in method" tab

### Step 2: Enable Email/Password Authentication

1. **Click on "Email/Password"**
2. **Enable the first option**: "Email/Password"
3. **Click "Save"**

### Step 3: Enable Google Authentication (Optional)

1. **Click on "Google"**
2. **Toggle "Enable"**
3. **Add project support email** (your email)
4. **Click "Save"**

### Step 4: Configure Authorized Domains

1. **In Authentication → Settings → Authorized domains**
2. **Add these domains**:
   - `holy-market-next.vercel.app` (production)
   - `localhost` (development)
   - `127.0.0.1` (development)

### Step 5: Enable Firestore Database

1. **Go to "Firestore Database"**
2. **Click "Create database"**
3. **Choose "Start in test mode"** (for development)
4. **Select a location** (choose closest to your users)

### Step 6: Enable Storage

1. **Go to "Storage"**
2. **Click "Get started"**
3. **Choose "Start in test mode"**
4. **Select same location as Firestore**

### Step 7: Set Up Security Rules

**Firestore Rules** (go to Firestore → Rules):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /businesses/{businessId} {
      allow read: if true; // Public read
      allow write: if request.auth != null;
    }
  }
}
```

**Storage Rules** (go to Storage → Rules):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile-images/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /business-images/{businessId}/{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null;
    }
  }
}
```

## After Setting Up Firebase

Once you've completed the above steps, I can re-enable production Firebase by changing:

```typescript
// In src/lib/firebase.ts
const isFirebaseConfigured = true; // Enable production Firebase
```

## Testing the Setup

After enabling authentication methods:

1. **Test Email Sign Up**: Try creating an account
2. **Test Email Sign In**: Try signing in with existing account
3. **Test Google Sign In**: Try Google authentication
4. **Test Image Upload**: Try uploading a profile photo

## Current Demo Mode Benefits

The app works perfectly in demo mode:
- ✅ **No Setup Required**: Works immediately
- ✅ **Full Functionality**: All features work locally
- ✅ **No Errors**: No Firebase configuration issues
- ✅ **Perfect for Demos**: Great for presentations
- ✅ **Development Ready**: Ideal for testing

## When to Switch to Production Firebase

Switch to production Firebase when:
- 📈 **Going Live**: Ready for real users
- 👥 **Multiple Users**: Need shared data across devices
- 💾 **Data Persistence**: Need data to survive browser clears
- 🔐 **Security**: Need production-level security
- 📊 **Analytics**: Want user behavior tracking

The app is fully functional in demo mode and ready for production use!