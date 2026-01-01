// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSmH2iD_2MNhjECiM51eG1YHa4jmTxwns",
  authDomain: "glassmindai.firebaseapp.com",
  projectId: "glassmindai",
  storageBucket: "glassmindai.firebasestorage.app",
  messagingSenderId: "311934024859",
  appId: "1:311934024859:web:9d8bb90ad34a65427a9a3e",
  measurementId: "G-D9EZRQ2ZMH"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
