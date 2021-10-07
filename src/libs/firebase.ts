// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjrfBqh1PGuUn6nSeuS1sGjCG-dSyaero",
    authDomain: "photo-galery-67adc.firebaseapp.com",
    projectId: "photo-galery-67adc",
    storageBucket: "photo-galery-67adc.appspot.com",
    messagingSenderId: "364299804510",
    appId: "1:364299804510:web:c955b44c989d890e9039cf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Firebase storage and exporting
export const storage = getStorage(firebaseApp)