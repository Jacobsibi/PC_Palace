import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Support.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  //email and password to be used as parameter for Firebase special function
  const router = useRouter();
  const [email, setEmail] = useState("");

  //function: refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

  //function: forgot password, when onclick send an email
  const resetPassword = async () => {
    try {
      //PROBLEM, HOW TO CHECK IF EMAIL IS EXISTED EVEN THE USER IS NOT LOGGED IN YET ??
      //ONE SOLUTION: MAYBE MAKE A COLLECTION OF EMAILS, AND CHECK IF THE EMAIL IS EXISTED IN THAT COLLECTION
      //FOR THAT I NEED TO SETUP FIRESTORE, AND MAKE A COLLECTION OF EMAILS
      //SET UP THE GETTER AND SETTER
      //THEN CHECK IF THE EMAIL IS EXISTED IN THAT COLLECTION

      //TRY NUMBER ONE:
      sendPasswordResetEmail(email);

      //TRY NUMBER TWO:
      //await auth.sendPasswordResetEmail(email);

      swal("Magic Link Sent", "Please check your email", "success");
      //DRAFT, here... use router to go to homepage if success
    } catch (error) {
      console.log("Here is why cannot send the magic link: " + error);
      console.log("Email: " + email);
      swal("Error", "Cannot send the magic link", "error");
      //DRAFT, here... just referesh this same page again, dont go anywhere
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
