import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBbpRnov0w8gN4G-hYTnylSlz5qqC2a8NU",
    authDomain: "mairie-gestion.firebaseapp.com",
    databaseURL: "https://mairie-gestion-default-rtdb.firebaseio.com",
    projectId: "mairie-gestion",
    storageBucket: "mairie-gestion.firebasestorage.app",
    messagingSenderId: "967213162617",
    appId: "1:967213162617:web:9e9a530847b448af8634a8",
    measurementId: "G-ZCQ8S3BP00"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default StartFirebase;