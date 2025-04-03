import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyCBRuGJcs_dJPseACxDAr3zN8o2VNX3f8A",
  authDomain: "drrm-h-web-app.firebaseapp.com",
  projectId: "drrm-h-web-app",
  storageBucket: "drrm-h-web-app.appspot.com",
  messagingSenderId: "88158608812",
  appId: "1:88158608812:web:df668dd1cff2d72fb22e09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
