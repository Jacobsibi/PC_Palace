import {auth, authGoogle} from "../configuration/Firebase"; //pass in authentication objects from Firebase Configuration
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"; //the preamde functions stuff
import { useState} from "react";

//Auth function be running inside App.js
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //just an output to see who is logged in currently
   console.log(auth?.currentUser?.email);
   console.log(auth?.currentUser?.photoURL);
   
    
   //helper method
    const signIn = async () => {
       try{
        await createUserWithEmailAndPassword(auth, email, password);
       } catch(err){
          console.error(err);
       }
    };

    //helper method
    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, authGoogle);
           } catch(err){
              console.error(err);
           }
    };

    //helper method
    const logout = async () => {
        try{
            await signOut(auth);
           } catch(err){
              console.error(err);
           }
    };

    return(
        <div>
            <input
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="Password..."
                type = "password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick = {signIn}> Sign In </button>
            <button onClick = {signInWithGoogle}> Sign with Google </button>
            <button onClick = {logout}> Log Out </button>   
        
        </div>
    )
}