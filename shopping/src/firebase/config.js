/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2_gQMPbHg9rhijvj7wF-IKQ1LMDnmcLY",
  authDomain: "shoeshop-232af.firebaseapp.com",
  databaseURL: "https://shoeshop-232af-default-rtdb.firebaseio.com",
  projectId: "shoeshop-232af",
  storageBucket: "shoeshop-232af.appspot.com",
  messagingSenderId: "290265174141",
  appId: "1:290265174141:web:f4b088c41142ea0b6fa114"
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// init firestore service

export { db }