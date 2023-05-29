import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Support.module.css";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../configurations/firebase";

const ForgotPassword = () => {
  //email and password to be used as parameter for Firebase special function
  const [email, setEmail] = useState("");

  //function: forgot password, when onclick send an email, with await
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      swal("Magic Link Sent", "Please check your email", "success");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        //handle user not found
        swal("Account Not Existed", "Please enter correct email", "error");
      } else if (error.code === "auth/invalid-email") {
        //handle invalid email
        swal("Invalid Email", "Please enter correct email", "error");
      } else if (error.code === "auth/missing-email") {
        //handle missing email
        swal("Enter Email", "Please fill in email field", "warning");
      } else if (error.code === "auth/user-disabled") {
      } else if (error.code === "auth/operation-not-allowed") {
      } else if (error.code === "auth/too-many-requests") {
      } else if (error.code === "auth/network-request-failed") {
      } else if (error.code === "auth/requires-recent-login") {
      } else if (error.code === "auth/user-mismatch") {
      } else if (error.code === "auth/weak-password") {
      } else if (error.code === "auth/wrong-password") {
      } else if (error.code === "auth/email-already-in-use") {
      } else if (error.code === "auth/operation-not-allowed") {
      } else {
        //handle other errors
        swal("Error", "Cannot send the magic link", "error");
      }
    }
  };

  //the output
  return (
    <div class={styles.form}>
      <h1>Reset Your Password</h1>
      <p>
        New member?{" "}
        <Link class={styles.highlightedLink} href="/loginnewaccountpage">
          Create New Account
        </Link>
      </p>

      <label class={styles.label}>Email</label>
      <input
        class={styles.input}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            resetPassword();
          }
        }}
        name="user_email"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />

      <button class={styles.btn} onClick={resetPassword}>
        Submit
      </button>
    </div>
  );
};

export default ForgotPassword;
