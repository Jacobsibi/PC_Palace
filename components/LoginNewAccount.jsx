import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Support.module.css";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { auth } from "../configurations/firebase";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginNewAccount = () => {
  //email and password to be used as parameter for Firebase special function
  //name to update user's name when create an account via email, becuase it is not done automatically
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  //function: refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

  //function: create new account via email and password
  const createAccount = async () => {
    try {
      //check if there is an account is signed in, prompt to sign out first to continue action
      if (auth?.currentUser) {
        swal(
          "Currently Logged In",
          "Please sign out first to create new account",
          "warning"
        );
      }
      //check if name is entered, ohterwise cannot create new account
      else if (!fullName) {
        swal("Enter Name", "Please fill in your name", "warning");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        //update user's fullname once account is created because login with email does not create name automatically
        await updateProfile(auth.currentUser, { displayName: fullName });
        // redirect to home
        await router.push('/');
        await swal("Welcome", "You created new account", "success");
        //refresh the page
        await refreshPage();
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // Handle the email already in use error
        swal("Email already exists", "Please enter new email", "error");
      } else if (error.code === "auth/phone-number-already-exists") {
        // Handle the phone number already in use error
        swal(
          "Phone number already exists",
          "Please enter new phone number",
          "error"
        );
      } else if (error.code === "auth/invalid-email") {
        // Handle the invalid email
        swal(
          "Invalid Email",
          "Please fill in correct email address",
          "warning"
        );
      } else if (error.code === "auth/missing-email") {
        // Handle the email field is empty
        swal("Enter Email", "Please fill in email field", "warning");
      } else if (error.code === "auth/missing-password") {
        // Handle the password field is empty
        swal("Enter Password", "Please fill in password field", "warning");
      } else if (error.code === "auth/weak-password") {
        // Handle the weak password
        swal(
          "Enter Strong Password",
          "Password should be at least 6 characters",
          "warning"
        );
      } else {
        // Handle other errors
        swal("Error", "Please try again", "error");
      }
    }
  };

  return (
    <div class={styles.form}>
      <h1>Create New Account</h1>
      <p>
        Already a member?{" "}
        <Link class={styles.highlightedLink} href="/loginpage">
          Sign In
        </Link>
      </p>

      <label class={styles.label}>Name</label>
      <input
        class={styles.input}
        type="text"
        maxLength={20}
        onChange={(e) => setFullName(e.target.value)}
        name="user_name"
        max-length={20}
        required
      />

      <label class={styles.label}>Email</label>
      <input
        class={styles.input}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        name="user_email"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />

      <label class={styles.label}>Password</label>
      <input
        class={styles.input}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="user_password"
        required
      />

        <button class={styles.btn} onClick={createAccount}>
          Create Account
        </button>
    </div>
  );
};
   
export default LoginNewAccount;
