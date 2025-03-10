import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBRuGJcs_dJPseACxDAr3zN8o2VNX3f8A",
  authDomain: "drrm-h-web-app.firebaseapp.com",
  projectId: "drrm-h-web-app",
  storageBucket: "drrm-h-web-app.firebasestorage.app",
  messagingSenderId: "88158608812",
  appId: "1:88158608812:web:df668dd1cff2d72fb22e09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
