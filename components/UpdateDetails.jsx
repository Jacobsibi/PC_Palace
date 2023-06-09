import { useRouter } from "next/router";
import swal from "sweetalert";
import styles from "../styles/UpdateDetails.module.css";
import React, { useState, useEffect } from "react";
import { auth } from "../configurations/firebase";
import { signOut } from "firebase/auth";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

const MyAccount = () => {
  //email and password to be used as parameter for Firebase special function
  //name to update user's name when create an account via email, becuase it is not done automatically
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeField, setActiveField] = useState(""); //add state for active field
  const router = useRouter();

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
            await router.push("/");
          }
        }

        if (newEmail !== "") {
          //update email using firebase function
          await updateEmail(auth.currentUser, newEmail);
          await swal("Success", "Your email has been updated", "success");
          await router.push("/");
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
            await router.push("/");
          }
        }

        if (newName == "" && newEmail == "" && newPassword == "") {
          await swal(
            "Enter New Details",
            "Please enter at least a personal detail to update",
            "warning"
          );
        }
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
        swal("Error", "Please try again", "error");
      }
    }
  };

  //function: delete account
  const deleteAccount = async () => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this account!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await auth.currentUser.delete();
          await router.push("/");
          swal("Account Deleted", "Your account has been deleted", "success", {
            icon: "success",
          });
        } else {
          swal("Account Is Not Deleted", "Your account is safe", "warning");
        }
      });
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        swal("Run Time Out", "Please relogin again to delete", "error");
      } else if (error.code === "auth/network-request-failed") {
        swal("Connection Error", "Please connect to internet", "error");
      } else {
        swal("Error", "Cannot delete the account", "error");
      }
    }
  };

  //output:
  if (isLoading) {
    return <div> Web is loading... </div>;
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Update Details</h1>
        <p className={styles.p}>Enter your new details</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <button
              className={styles.smallBtn}
              onClick={() => setActiveField("showName")}
            >
              Edit Name
            </button>
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <button
              className={styles.smallBtn}
              onClick={() => setActiveField("showEmail")}
            >
              Edit Email
            </button>
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <button
              className={styles.smallBtn}
              onClick={() => setActiveField("showPasswords")}
            >
              Edit Password
            </button>
          </label>
        </div>
      </div>

      {activeField === "showName" && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>New Name</label>
          <input
            className={styles.input}
            type="text"
            maxLength={20}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateAccount();
              }
            }}
            name="user_name"
          />
          <button className={styles.btn} onClick={updateAccount}>
            Update
          </button>
        </div>
      )}
      {activeField === "showEmail" && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>New Email</label>
          <input
            className={styles.input}
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
          <button className={styles.btn} onClick={updateAccount}>
            Update
          </button>
        </div>
      )}
      {activeField === "showPasswords" && (
        <div>
        
          {" "}
          <div className={styles.inputGroup}>
            <label className={styles.label}>New Password</label>
            <input
              className={styles.input}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateAccount();
                }
              }}
              name="user_password"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateAccount();
                }
              }}
              name="confirm_password"
            />
            <button className={styles.btn} onClick={updateAccount}>
              Update
            </button>
          </div>{" "}
        </div>
      )}



        <div className={styles.inputGroup}>
        <button className={styles.btn} onClick={deleteAccount}>
          Delete This Account
        </button>
        </div>


    </>
  );
};
export default MyAccount;
