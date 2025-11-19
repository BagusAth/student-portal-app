import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOIPbhPJkTKzzckjDGGe8B1dBfUKzJfBo",
  authDomain: "my-project-ath23.firebaseapp.com",
  projectId: "my-project-ath23",
  storageBucket: "my-project-ath23.firebasestorage.app",
  messagingSenderId: "1088747108456",
  appId: "1:1088747108456:android:31169a4e64b5f6a6f1e3dd"
};

// Initialize Firebase - check if already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth - uses memory persistence by default in React Native
// Session will be managed by our AuthContext with AsyncStorage
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
