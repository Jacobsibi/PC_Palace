import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Support.module.css";
import React, { useRef, useState, useEffect } from "react";
import { auth, authGoogle } from "../configurations/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  //email and password to be used as parameter for Firebase special function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function: refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

  //function: log in with existed account only
  const signIn = async () => {
    try {
      //check if there is an account is signed in, prompt to sign out first to continue action
      if (auth?.currentUser) {
        swal("Already Logged In", "Please sign out first", "warning");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        await swal("Logged In", "You signed in with email", "success");
        //refresh the page
        refreshPage();
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        // Handle the wrong passwrod
        swal("Wrong Password", "Please enter correct password", "error");
      } else if (error.code === "auth/user-not-found") {
        // Handle user not found
        swal(
          "Account not existed",
          "Please enter correct email or password",
          "error"
        );
      } else if (error.code === "auth/invalid-email") {
        // Handle inavlid email but correct password
        swal(
          "Account not existed",
          "Please enter correct email or password",
          "error"
        );
      } else if (error.code === "auth/missing-email") {
        // Handle the email field is empty
        swal("Enter Email", "Please fill in email field", "warning");
      } else if (error.code === "auth/missing-password") {
        // Handle the password field is empty
        swal("Enter Password", "Please fill in password field", "warning");
      } else {
        // Handle other errors
        swal("Error", "Please try again", "error");
      }
    }
  };

  //function: sign in with google for both new and existing customer
  const signInGoogle = async () => {
    try {
      //check if there is an account is signed in, prompt to sign out first to continue action
      if (auth?.currentUser) {
        await swal("Already Logged In", "Please sign out first", "warning");
      } else {
        await signInWithPopup(auth, authGoogle);
        await swal("Logged In", "You signed in with Google", "success");
        //refresh the page
        refreshPage();
      }
    } catch (error) {
      swal("Error", "Please try again", "error");
    }
  };

  //the output
  return (
    <div class={styles.form}>
      <h1>Sign In</h1>
      <p>
        New member? <Link href="/loginnewaccountpage">Create New Account</Link>
      </p>

      <label class={styles.label}>Email</label>
      <input
        class={styles.input}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        name="user_email"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />

      <label class={styles.label}>password</label>
      <input
        class={styles.input}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="user_password"
        required
      />
      <p>
        Forgot password? <Link href="/about">Send a magic link</Link>
      </p>

      <button class={styles.btn} onClick={signIn}>
        {" "}
        Sign In{" "}
      </button>

      <button class={styles.btn} onClick={signInGoogle}>
        {" "}
        Sign In With Google{" "}
      </button>
    </div>
  );
};

export default Login;
