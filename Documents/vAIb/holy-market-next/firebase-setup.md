# Firebase Setup for HOLY-MARKET Production

## Required Firebase Configuration

To make this production-ready for 500+ accounts, you need to:

1. **Create a Firebase Project**:
   - Go to https://console.firebase.google.com/
   - Create a new project named "holy-market-prod"
   - Enable Authentication, Firestore, and Storage

2. **Enable Authentication Methods**:
   - Email/Password authentication
   - Google Sign-In (requires Google Cloud Console setup)

3. **Configure Google OAuth**:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add authorized domains: holy-market-next.vercel.app

4. **Update Firebase Config**:
   Replace the config in `src/lib/firebase.ts` with your actual project config

5. **Set up Firestore Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

6. **Set up Storage Rules**:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /profile-images/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```