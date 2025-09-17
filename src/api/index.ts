// const { MongoClient } = require('mongodb');
// require('dotenv').config();

// // MongoDB connection URI - should be moved to environment variables in production
// // const uri = "mongodb+srv://florencemetende:Bovary@08@cluster0.oviap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// async function connectToDatabase() {
//     const uri = "mongodb+srv://florencemetende:Bovary@08@cluster0.oviap.mongodb.net/mairie?retryWrites=true&w=majority";
// //   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     const collects = await client.db("mairie").collection()
//     collects.forEach((collection) => console.log(collection.s.namespace.collection))
//     return client;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   } finally{
//     await client.close()
//   }
// }

// connectToDatabase()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Realtime Database
const database = getDatabase(app);

export { database };

// Initialize Firestore
export const db = getFirestore(app);

// Use the `collection` function with the Firestore instance
const employeesCollection = collection(db, "employees");
const equipmentsCollection = collection(db, "equipments");