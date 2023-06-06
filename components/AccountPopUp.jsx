import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Login.module.css";
import React, { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { signOut } from "firebase/auth";
import { auth } from "../configurations/firebase";

const Account = () => {

  //state: configurations
  const accountReg = useRef();
  const { setShowAccountPopUp } = useStateContext();

  //function: logout
  const logOut = async () => {
    try {
      //check if there account is signed out already, give out a prompt
      if (!auth?.currentUser) {
        await swal(
          "Already Logged Out",
          "No user signed in at the moment",
          "warning"
        );
      } else {
        await signOut(auth);
        await swal(
          "Logged Out",
          "You are logged out from your account",
          "info"
        );
      }
    } catch (error) {
      swal("Error", "Please try again", "error");
    }
  };

  //ouput:
  return (
    <div>
      {auth?.currentUser ? (
        <>
          <div class={styles.scrollcontainer}>
            <div className={styles.loginwrapper} ref={accountReg}>
              <div className={styles.logincontainer}>
                <button
                  type="button"
                  className="cart-heading"
                  onClick={() => setShowAccountPopUp(false)}
                >
                  <AiOutlineLeft />
                  <span className="heading">Back</span>
                </button>

                {
                  <>
                    <div className={styles.image}>
                      <Link href="/updateimage">
                        <button
                          type="button"
                          onClick={() => setShowAccountPopUp(false)}
                        >
                          <img
                            className={`${styles.info} ${styles.roundImage}`}
                            src={auth?.currentUser?.photoURL}
                            alt="User Image"
                          />
                        </button>
                      </Link>
                    </div>

                    <div className={styles.emptylogin}>
                      <h1>Hello {auth?.currentUser?.displayName}</h1>
                      <p>Enjoy Shopping With Us</p>
                    </div>

                    <div className={styles.textArea}>
                      <h4 className={styles.textArea}>Account Details</h4>

                      {auth?.currentUser?.displayName && (
                      <p className={styles.textArea}>Name: {auth?.currentUser?.displayName}</p>                      
                      )}
                      {auth?.currentUser?.email && (
                        <p className={styles.textArea} >Email: {auth?.currentUser?.email}</p>
                      )}
                      {auth?.currentUser?.phoneNumber && (
                        <p className={styles.textArea}>
                          Phone: {auth?.currentUser?.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div className={styles.emptylogin}>
                      <Link href="/updatedetailspage">
                        <button
                          type="button"
                          onClick={() => setShowAccountPopUp(false)}
                          className="btn"
                        >
                          Update Details
                        </button>
                      </Link>

                      <Link href="/">
                        <button type="button" onClick={logOut} className="btn">
                          Sign Out
                        </button>
                      </Link>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class={styles.scrollcontainer}>
            <div className={styles.loginwrapper} ref={accountReg}>
              <div className={styles.logincontainer}>
                <button
                  type="button"
                  className="cart-heading"
                  onClick={() => setShowAccountPopUp(false)}
                >
                  <AiOutlineLeft />
                  <span className="heading">Back</span>
                </button>
                {
                  <div className={styles.emptylogin}>
                    <h1>Welcome</h1>
                    <p>Sign In or Create New Account</p>

                    <Link href="/loginpage">
                      <button
                        type="button"
                        onClick={() => setShowAccountPopUp(false)}
                        className="btn"
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link href="/loginnewaccountpage">
                      <button
                        type="button"
                        onClick={() => setShowAccountPopUp(false)}
                        className="btn"
                      >
                        Create New Account
                      </button>
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
