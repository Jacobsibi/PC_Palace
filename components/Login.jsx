import swal from 'sweetalert';
import styles from '../styles/Login.module.css';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { auth, authGoogle } from "../configurations/firebase";
import { updateProfile } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = props => {

  //email and password to be used as parameter for Firebase special function
  //name to update user's name when create an account via email, becuase it is not done automatically
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  //Function: create new account via email and password
  const createAccount = async () => {
      try {
        //check if there is an account is signed in, prompt to sign out first to continue action
        if (auth?.currentUser){
          swal("Currently Logged In", "Please sign out first to create new account", "warning");
        } 
        //check if name is entered, ohterwise cannot create new account
        else if (!fullName) { 
          swal("Enter Name", "Please fill in your name", "warning");
        } else{
          await createUserWithEmailAndPassword(auth, email, password);
          //update user's fullname once account is created because login with email does not create name automatically
          updateProfile(auth.currentUser, {displayName: fullName});
          swal("Welcome", "You created new account", "success");
        }
      }
      catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          // Handle the email already in use error
          swal("Email already exists", "Please enter new email", "error");
        } else if (error.code === 'auth/phone-number-already-exists') {
          // Handle the phone number already in use error
          swal("Phone number already exists", "Please enter new phone number", "error");
        } 
          else if (error.code === 'auth/invalid-email') {
          // Handle the invalid email 
          swal("Invalid Email", "Please fill in correct email address", "warning");
        }
          else if (error.code === 'auth/missing-email') {
          // Handle the email field is empty 
          swal("Enter Email", "Please fill in email field", "warning");
        }
          else if (error.code === 'auth/missing-password') {
          // Handle the password field is empty 
          swal("Enter Password", "Please fill in password field", "warning");
        } 
          else if (error.code === 'auth/weak-password') {
          // Handle the weak password
          swal("Enter Strong Password", "Password should be at least 6 characters", "warning");
        } 
          else {
          // Handle other errors
          swal("Error", "Please try again",  "error");
        }
      }
  }

  //Function: log in with existed account only
  const signIn = async () => {
    try {
        //check if there is an account is signed in, prompt to sign out first to continue action
        if (auth?.currentUser){
        swal("Already Logged In", "Please sign out first", "warning");
      } else{
        await signInWithEmailAndPassword(auth, email, password);
        swal("Logged In", "You signed in with email", "success");
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        // Handle the wrong passwrod
        swal("Wrong Password", "Please enter correct password", "error");
      } 
       else if (error.code === 'auth/user-not-found') {
        // Handle user not found
        swal("Account not existed", "Please enter correct email or password", "error");
      } 
      else if (error.code ===  'auth/invalid-email' ) {
        // Handle inavlid email but correct password
        swal("Account not existed", "Please enter correct email or password", "error");
      } 
      else if (error.code === 'auth/missing-email') {
        // Handle the email field is empty 
        swal("Enter Email", "Please fill in email field", "warning");
      }
        else if (error.code === 'auth/missing-password') {
        // Handle the password field is empty 
        swal("Enter Password", "Please fill in password field", "warning");
      }
      else {
        // Handle other errors
        swal("Error", "Please try again",  "error");
      }
    }
  };

  //Function: sign in with google for both new and existing customer
  const signInGoogle = async () => {
    try {
      //check if there is an account is signed in, prompt to sign out first to continue action
      if (auth?.currentUser){
        await swal("Already Logged In", "Please sign out first", "warning");
      } else{
        await signInWithPopup(auth, authGoogle);
        swal("Logged In", "You signed in with Google", "success");
      }
    } catch (error) {
      swal("Error", "Please try again",  "error");
    }
  };

  //Function: logout
  const logOut = async () => {
    try {
        //check if there account is signed out already, give out a prompt
      if (!auth?.currentUser){
        await swal("Already Logged Out", "No user signed in at the moment", "warning");
      } else{
        await signOut(auth);
        swal("Logged Out", "You are logged out from your account", "info");
      }
    } catch (error) {
      swal("Error", "Please try again",  "error");
    }
  };

  //internal configurations to show login component
  const loginReg = useRef();

  //the output
  return (
    <div class={styles.scrollcontainer}>
      <div className={styles.loginwrapper} ref={loginReg}>
        <div className={styles.logincontainer}>
          <button
            type="button"
            className="cart-heading"
            onClick={() => props.setShowLogin(false)}>
            <AiOutlineLeft />
            <span className="heading">Back</span>
          </button>

          {(
            <div className={styles.emptylogin}>
              <h1>Welcome {auth?.currentUser?.displayName}</h1>
              <p>Sign In or Create Account</p>
              <Link href="/">

                <input
                  placeholder="Name..."
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  maxLength={20}
                  required
                  className={styles.input}
                />
                <input
                  placeholder="Email..."
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
                <input
                  placeholder="Password..."
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  minlength="8" 
                  required
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