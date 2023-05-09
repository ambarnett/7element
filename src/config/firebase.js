// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "element-b5023.firebaseapp.com",
    projectId: "element-b5023",
    storageBucket: "element-b5023.appspot.com",
    messagingSenderId: "635580726857",
    appId: "1:635580726857:web:345516b5e723d565378998",
    measurementId: "G-GMQQ62MFVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const useAuth = () => {
    const [auth, setAuth] = useState(getAuth());
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    return { auth, currentUser };
}
