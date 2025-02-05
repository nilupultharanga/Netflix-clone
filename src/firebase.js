import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut} from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBXqLqQ8-XYjF3jGXLRvGuFMt1Pn9Xubkk",
  authDomain: "netflix-clone-384ab.firebaseapp.com",
  projectId: "netflix-clone-384ab",
  storageBucket: "netflix-clone-384ab.firebasestorage.app",
  messagingSenderId: "175250132109",
  appId: "1:175250132109:web:360f5b692224532fbce6c4",
  measurementId: "G-KJDD1C22WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db =getFirestore(app);

const signup =async (name, email, password)=>{
    try{
        const res =await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};