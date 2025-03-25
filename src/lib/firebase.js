// Import Firebase App (compat version)
import firebase from "firebase/compat/app";

// Import required Firebase services in compat mode
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmrioQUAe0A705CehiwugU92IywNMSllI",
  authDomain: "classrooms-project-ffd30.firebaseapp.com",
  projectId: "classrooms-project-ffd30",
  storageBucket: "classrooms-project-ffd30.appspot.com", // Fix: Corrected "firebasestorage.app" to "appspot.com"
  messagingSenderId: "145851727632",
  appId: "1:145851727632:web:6f839ae7fecd2c75eaef95",
  measurementId: "G-SVMVG5WC6W"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Firestore Database
const db = app.firestore();

// Authentication
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Cloud Storage
const storage = app.storage();

export { auth, provider, storage };
export default db;
