import swal from "sweetalert";
import styles from "../styles/Support.module.css";
import React, { useState, useEffect } from "react";
import { auth } from "../configurations/firebase";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

const MyAccount = () => {
  //email and password to be used as parameter for Firebase special function
  //name to update user's name when create an account via email, becuase it is not done automatically
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //function: refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

  //function: update old account for user registered via email and password
  const updateAccount = async () => {
    try {
      //check if there is no account is signed in, prompt to sign in first to continue action
      if (!auth?.currentUser) {
        swal(
          "Currently Logged Out",
          "Please sign in first to update your account",
          "warning"
        );
      } else {
        if (newName !== "") {
          //check empty string on name
          if (newName.trim() === "") {
            swal("Invalid New Name", "Please enter a new name", "warning");
            return;
          } else {
            //update name
            await updateProfile(auth.currentUser, { displayName: newName });
            await swal("Success", "Your name has been updated", "success");
          }
        }

        if (newEmail !== "") {
          //update email using firebase function
          await updateEmail(auth.currentUser, newEmail);
          await swal("Success", "Your email has been updated", "success");
        }

        if (newPassword !== "") {
          //check if password and confirm password match
          if (newPassword !== confirmPassword) {
            swal(
              "Passwords do not match",
              "Please make sure the passwords match",
              "warning"
            );
            return;
          } else {
            //update password using firebase function
            await updatePassword(auth.currentUser, newPassword);
            await swal("Success", "Your password has been updated", "success");
          }
        }

        if (newName == "" && newEmail == "" && newPassword == "") {
          await swal(
            "Enter New Details",
            "Please enter at least a personal detail to update",
            "warning"
          );
        }

        // refresh the page
        refreshPage();

        //SHOULD SUCCESS MESSAGE BE ONLY ONE ?
        //await swal("Success", "Your details has been updated", "success");
      }
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        // handle the need to relogin user again
        swal("Run Time Out", "Please relogin again to update", "error");
      } else if (error.code === "auth/email-already-in-use") {
        // handle email is already been used by others
        swal("Email already exists", "Please enter new email", "error");
      } else if (error.code === "auth/invalid-email") {
        // handle invalid email
        swal(
          "Invalid New Email",
          "Please fill in correct email address",
          "warning"
        );
      } else if (error.code === "auth/weak-password") {
        // handle weak password
        swal(
          "Enter New Strong Password",
          "Password should be at least 6 characters",
          "warning"
        );
      } else {
        // Handle other errors
        //swal("Error", "Please try updating again", "error");
        swal("Hey Bro", "Please try again", "error");
        console.log("Hey bro this is the error: " + error);
      }
    }
  };

  //output:

  if (isLoading) {
    return <div> Web is loading... </div>;
  }

  return (
    <div class={styles.form}>
      <h1>Update Details</h1>
      <p>Enter your new details</p>

      <label class={styles.label}>New Name</label>
      <p class={styles.info}>Current Name: {auth?.currentUser?.displayName}</p>
      <input
        class={styles.input}
        type="text"
        maxLength={20}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateAccount();
          }
        }}
        name="user_name"
        max-length={20}
      />

      <label class={styles.label}>New Email </label>
      <p class={styles.info}>Current Email: {auth?.currentUser?.email}</p>
      <input
        class={styles.input}
        type="email"
        onChange={(e) => setNewEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateAccount();
          }
        }}
        name="user_email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />

      <label class={styles.label}>New Password </label>
      <input
        class={styles.input}
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateAccount();
          }
        }}
        name="user_password"
      />
      <label class={styles.label}>Confirm Password</label>
      <input
        class={styles.input}
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateAccount();
          }
        }}
        name="confirm_password"
      />

      <button class={styles.btn} onClick={updateAccount}>
        {" "}
        Update{" "}
      </button>
    </div>
  );
};
export default MyAccount;
