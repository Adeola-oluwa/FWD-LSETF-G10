
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyD6Z0zJy5P9VuXqkJEdsUmwS9yWekzXVvM",
  authDomain: "netflix-clone-19fbc.firebaseapp.com",
  projectId: "netflix-clone-19fbc",
  storageBucket: "netflix-clone-19fbc.appspot.com",
  messagingSenderId: "832839129420",
  appId: "1:832839129420:web:6bb27186dcfd43d32017e9"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    
    }

}

const login = async(emai, password)=>{
   try {
    signInWithEmailAndPassword(auth, email, password)
   } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}  
const logout =()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};