// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, Auth } from "firebase/auth";
//@ts-ignore
import { getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCGniYNL73XM_3K_Dwovbg0WOzvFiDpuLE",
    authDomain: "expencetracker-e1d40.firebaseapp.com",
    projectId: "expencetracker-e1d40",
    storageBucket: "expencetracker-e1d40.firebasestorage.app",
    messagingSenderId: "546460745583",
    appId: "1:546460745583:web:1c661cfef75de88592729a",
    measurementId: "G-DD8QP013MK"
};

let app;
let auth: Auth;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} else {
    app = getApp();
    auth = getAuth();
}

export { app, auth };
export const db = getFirestore(app);

