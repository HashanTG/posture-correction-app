// Test Firebase Authentication Connection
import { auth } from './firebaseConfig';
import { connectAuthEmulator } from 'firebase/auth';

export function testFirebaseConnection() {
  console.log('Firebase Auth instance:', auth);
  console.log('Firebase Config:', auth.config);
  console.log('Firebase App:', auth.app);
  
  // Test if auth is properly initialized
  if (auth) {
    console.log('✅ Firebase Auth is initialized');
    console.log('Auth domain:', auth.config?.authDomain);
    console.log('Project ID:', auth.config?.projectId);
  } else {
    console.log('❌ Firebase Auth is NOT initialized');
  }
  
  return auth;
}

// Test function to debug auth state
export function debugAuthState() {
  console.log('Current user:', auth.currentUser);
  console.log('Auth state ready:', auth.app);
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('✅ User is signed in:', user.email);
    } else {
      console.log('❌ User is signed out');
    }
  });
}
