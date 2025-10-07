# Firebase Authentication Fix Guide

## 🚨 **Current Issue: `auth/operation-not-allowed` Error**

The authentication is not working because the authentication methods are not enabled in your Firebase console.

## ✅ **Complete Fix Steps**

### **Step 1: Enable Email/Password Authentication**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `holy-market-d8f15`
3. **Navigate to Authentication**:
   - Click "Authentication" in the left sidebar
   - Click "Sign-in method" tab
4. **Enable Email/Password**:
   - Click on "Email/Password"
   - **Enable the first option**: "Email/Password" (toggle it ON)
   - Click "Save"

### **Step 2: Enable Google OAuth (Optional)**

1. **In the same Sign-in method tab**:
   - Click on "Google"
   - **Toggle "Enable"**
   - Add your project support email
   - Click "Save"

### **Step 3: Configure Authorized Domains**

1. **In Authentication → Settings → Authorized domains**:
   - Add these domains:
     - `holy-market-next.vercel.app` (your production domain)
     - `localhost` (for development)
     - `127.0.0.1` (for development)

### **Step 4: Enable Firestore Database**

1. **Go to "Firestore Database"**
2. **Click "Create database"** (if not already created)
3. **Choose "Start in test mode"** (for development)
4. **Select a location** (choose closest to your users)

### **Step 5: Enable Firebase Storage**

1. **Go to "Storage"**
2. **Click "Get started"** (if not already set up)
3. **Choose "Start in test mode"**
4. **Select same location as Firestore**

## 🔧 **Security Rules Setup**

### **Firestore Rules** (go to Firestore → Rules):
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

### **Storage Rules** (go to Storage → Rules):
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

## 🧪 **Testing After Setup**

1. **Test Email Sign Up**: Try creating an account
2. **Test Email Sign In**: Try signing in with existing account
3. **Test Google Sign In**: Try Google authentication
4. **Test Image Upload**: Try uploading a profile photo

## 🚀 **Expected Results**

After completing these steps:
- ✅ Email/Password authentication will work
- ✅ Google OAuth will work (if enabled)
- ✅ Profile image uploads will work
- ✅ User data will persist in Firestore
- ✅ No more `auth/operation-not-allowed` errors

## 📞 **Support**

If you still encounter issues after following these steps:
1. Check browser console for specific error messages
2. Verify all domains are added to authorized domains
3. Ensure Firestore and Storage are properly initialized
4. Check that security rules are properly configured

---

**Status**: 🔧 **READY TO FIX**  
**Last Updated**: September 24, 2025  
**Next Step**: Follow the steps above to enable authentication methods