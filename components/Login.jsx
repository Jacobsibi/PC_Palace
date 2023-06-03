import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Support.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  auth,
  authGoogle,
  authFacebook,
  database,
} from "../configurations/firebase";
import {
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  //email and password to be used as parameter for Firebase special function
  const router = useRouter();
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

        // check if the photoURL exists, if not, set it to a default photo URL
        if (!auth.currentUser.photoURL) {
          const newPhotoURL =
            "https://www.tenforums.com/geek/gars/images/2/types/thumb_14400082930User.png";
          await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
        }

        //redirect to home
        await router.push("/");
        await swal("Logged In", "You signed in with email", "success");
        //refresh the page
        await refreshPage();
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        // Handle the wrong passwrod
        swal("Wrong Password", "Please enter correct password", "error");
      } else if (error.code === "auth/user-not-found") {
        // Handle user not found
        swal(
          "Account Not Existed",
          "Please enter correct email or password",
          "error"
        );
      } else if (error.code === "auth/invalid-email") {
        // Handle invalid email but correct password
        swal(
          "Account Not Existed",
          "Please enter correct email or password",
          "error"
        );
      } else if (error.code === "auth/missing-email") {
        // Handle the email field is empty
        swal("Enter Email", "Please fill in email field", "warning");
        setEmail("");
      } else if (error.code === "auth/missing-password") {
        // Handle the password field is empty
        swal("Enter Password", "Please fill in password field", "warning");
        setPassword("");
      } else {
        // Handle other errors
        swal("Error", "Please try again", "error");
        console.log("HAHAHA " + error);
      }
    }
  };

  //function: sign in with google for both new and existing customer
  const signInWithGoogle = async () => {
    try {
      //check if there is an account is signed in, prompt to sign out first to continue action
      if (auth?.currentUser) {
        await swal("Already Logged In", "Please sign out first", "warning");
      } else {
        await signInWithPopup(auth, authGoogle);
        // check if the photoURL exists, if not, set it to a default photo URL
        if (!auth.currentUser.photoURL) {
          const newPhotoURL =
            "https://www.tenforums.com/geek/gars/images/2/types/thumb_14400082930User.png";
          await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
        }
        //redirect to home
        await router.push("/");
        await swal("Logged In", "You signed in with Google", "success");
        //refresh the page
        await refreshPage();
      }
    } catch (error) {
      swal("Error", "Please try again", "error");
    }
  };

  //DRAFT, MAYBE IMPLEMENT THIS IF I HAVE TIME, I AM ALMOST DONE?
  //function: sign in with facebook for both new and existing customer
  const signInWithFacebook = async () => {
    try {
      //check if there is an account is signed in, prompt to sign out first to continue action
      if (auth?.currentUser) {
        await swal("Already Logged In", "Please sign out first", "warning");
      } else {
        await signInWithPopup(auth, authFacebook);
        //redirect to home
        await router.push("/");
        await swal("Logged In", "You signed in with Facebook", "success");
        //refresh the page
        await refreshPage();
      }
    } catch (error) {
      //CONSOLE LOG
      console.log("Hey Bro " + error);
      swal("Error", "Please try again", "error");
    }
  };


  //the output
  return (
    <div class={styles.form}>
      <h1>Sign In</h1>
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
            signIn();
          }
        }}
        name="user_email"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />

      <label class={styles.label}>Password</label>
      <input
        class={styles.input}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            signIn();
          }
        }}
        name="user_password"
        required
      />
      <Link class={styles.highlightedLink} href="/forgotpasswordpage">
        Forgot Password ?
      </Link>

      <button class={styles.btn} onClick={signIn}>
        Sign In
      </button>
      <button class={styles.btn} onClick={signInWithGoogle}>
        Sign In With Google
      </button>

    </div>
  );
};

export default Login;
