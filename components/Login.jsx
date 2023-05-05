import Link from 'next/link';
import swal from 'sweetalert';
import styles from '../styles/Support.module.css';
import React, { useRef, useState, useEffect } from 'react';
import { auth, authGoogle } from "../configurations/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {

  //to DELETE
  console.log(auth?.currentUser?.email);

  //email and password to be used as parameter for Firebase special functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //let loggedIn = true;
  //const [loggedIn, setLoggedIn] =  useState(false);

  //sign in wiht email function
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //handleLogin();
      swal("Logged In", "You signed in with email", "success");
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

  //sign in with Google function
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, authGoogle);
      //handleLogin();
    } catch (error) {
      swal("Error", "Please try again",  "error");
    }
  };

  //logout function
  const logOut = async () => {
    try {
      await signOut(auth);
      //handleLogin();
      swal("Logged Out", "You are logged out from your account", "info");
    } catch (error) {
      swal("Error", "Please try again",  "error");
    }
  };

  //handle login change the use state based on the value of auth.CurrentUser
  // function handleLogin() {
  //   if(auth?.currentUser){
  //     console.log("User in");
  //     //setLoggedIn(true);
  //     loggedIn = true;
  //   } else{
  //     console.log("User not in");
  //     //setLoggedIn(false);
  //     loggedIn = false;
  //   }
  // }
  
  //useEffect to render again after an action
  // useEffect(() => {
  //   if (loggedIn) {
  //     console.log("User logged in!"); // Your code to execute on login here
  //     loggedIn = true;
  //   }
  //   else{
  //     loggedIn = false;
  //   }
  // }, [loggedIn]);

  return (
  // implement this if want to check login inside component and use auxiliary function
  //   <div className={styles.form}>
  //   {loggedIn ? (
  //     <div>
  //           <h1>Welcome {auth?.currentUser?.displayName} </h1>
  //           <p>Enjoy Shopping With Us</p>
  //           <button class={styles.btn} onClick={logOut}> Logout</button> 
  //     </div>
  //   ) : (
  //     <div>
  //       <h1>Welcome {auth?.currentUser?.displayName} </h1>
  //       <label className={styles.label}>Email</label>
  //       <input
  //         className={styles.input}
  //         type="email"
  //         onChange={(e) => setEmail(e.target.value)}
  //         name="user_email"
  //         required
  //         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  //       />

  //       <label className={styles.label}>Password</label>
  //       <input
  //         className={styles.input}
  //         type="password"
  //         onChange={(e) => setPassword(e.target.value)}
  //         name="user_password"
  //         required
  //       />

  //       <p>
  //         New Member? <Link href="/loginnewaccount"> Sign Up Now</Link>
  //       </p>

  //       <button className={styles.btn} onClick={signIn}>
  //         Sign In
  //       </button>
  //       <button className={styles.btn} onClick={signInGoogle}>
  //         Sign In With Google
  //       </button>
  //     </div>
  //   )}
  // </div>

<div className={styles.form}>
<h1>Welcome {auth?.currentUser?.displayName} </h1>
<label className={styles.label}>Email</label>
<input
  className={styles.input}
  type="email"
  onChange={(e) => setEmail(e.target.value)}
  name="user_email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>

<label className={styles.label}>Password</label>
<input
  className={styles.input}
  type="password"
  onChange={(e) => setPassword(e.target.value)}
  name="user_password"
  required
/>

<p>
  New Member? <Link href="/loginnewaccount"> Sign Up Now</Link>
</p>

<button className={styles.btn} onClick={signIn}>
  Sign In
</button>
<button className={styles.btn} onClick={signInGoogle}>
  Sign In With Google
</button>
</div>
   
  );
}

export default Login