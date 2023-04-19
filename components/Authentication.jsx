import {auth, authGoogle} from "../configurations/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    //just for fun
    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(err){
            console.log(err);
        }
    };
    const signInGoogle = async () => {
        try{
            await signInWithPopup(auth, authGoogle);
        } catch(err){
            console.log(err);
        }
    };
    const logOut = async () => {
        try{
            await signOut(auth);
        } catch(err){
            console.log(err);
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
            type="password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInGoogle}>Sign In With Google</button>
        <button onClick={logOut}>Sign Out</button>
        </div>
    );
};