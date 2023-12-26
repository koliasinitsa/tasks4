// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,   } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword as createUser } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTag2ppkfViM0gi4OG5CVuuAA48wMShvw",
  authDomain: "task4-f5d58.firebaseapp.com",
  projectId: "task4-f5d58",
  storageBucket: "task4-f5d58.appspot.com",
  messagingSenderId: "1007520272448",
  appId: "1:1007520272448:web:7220911be6353aa4768fa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUserWithEmailAndPassword = createUser;
export const auth = getAuth(app);
export const firestore = getFirestore(app);
//export const createUserWithEmailAndPassword = createUserWithEmailAndPassword;

//createUserWithEmailAndPassword(auth, email, password);
//export { createUserWithEmailAndPassword };