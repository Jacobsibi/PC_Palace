import swal from 'sweetalert';
import styles from '../styles/Login.module.css';
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineLogin } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../LIB/client';
import { useState } from "react";
import { auth, authGoogle } from "../configurations/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FirebaseError } from 'firebase/app';

const Login = () => {
  
  //email and password to be used as parameter for Firebase special function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //draft output current user email on console log
  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.displayName);

  //CREATE ACCOUNT
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
        //@QUESTION: how to save the names of user when they create via email ?
        

      console.log('Create account successful!');
      swal("Welcome", "You created new account", "success");
    } 
    catch (err) {
      //@QUESTION: how to catch firebase errors?
      
        //swal("Failed", "Email has already been used", "error");
        console.log(err);
        console.log(FirebaseError);
    }
        
  }

  //SIGN IN EXISTED ACCOUNT ONLY
  const signIn = async () => {
    try {
      //await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      swal("Logged In", "You signed in with email", "success");
    } catch (err) {
      console.log(err);
      console.log("Hey " + FirebaseError.name);
    }
  };

  //SIGN IN WITH GOOGLE (both new and returning customer)
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, authGoogle);
      console.log('Login with Google successful!');
      swal("Logged In", "You signed in with Google", "success");
    } catch (err) {
      console.log(err);
    }
  };

  //LOGOUT
  const logOut = async () => {
    try {
      await signOut(auth);
      swal("Logged Out", "You are logged out from your account", "info");
    } catch (err) {
      console.log(err);
    } 
  };

  //internal configurations
  const loginReg = useRef();
  const {setShowLogin} = useStateContext();

  return (
    <div class={styles.scrollcontainer}>
    <div className={styles.loginwrapper} ref={loginReg}>
      <div className={styles.logincontainer}>
      <button
          type="button"
          className="cart-heading"
          onClick={() => setShowLogin(false)}>
          <AiOutlineLeft />
          <span className="heading">Back</span>
        </button>

        {(
          //@QUESTION: How to use link redirect to another page? https://tinyurl.com/yc5se6fx
          <div className={styles.emptylogin}>
            <h1>Login</h1>
            <p>New Member?<Link className={styles.buttonsignuppage} href="/cart"> Sign Up</Link> </p>
            <Link href="/">
              <div class="box">I am a box</div>
              <label class="checkbox">
  <input type="checkbox"/>
  Remember me
</label>



            <input 
                placeholder="FirstName..."
                type="text"
                //onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
               <input
              placeholder="LastName..."
              type="text"
              // onChange={(e) => setPassword(e.target.value)}
               minlength="8" required
               className={styles.input}
            />
            <input
                placeholder="Email..."
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
               <input
              placeholder="Password..."
              type="password"
               onChange={(e) => setPassword(e.target.value)}
               minlength="8" required
               className={styles.input}
            />
              <button
                type="button"
                onClick={signIn}
                className={styles.btn}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={signInGoogle}
                className={styles.btn}
              >
                Sign In With Google
              </button>
              <button
                type="button"
                onClick={logOut}
                className={styles.btn}
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={createAccount}
                className={styles.btn}
              >
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Login