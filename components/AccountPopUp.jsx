import Link from "next/link";
import swal from "sweetalert";
import styles from "../styles/Login.module.css";
import React, { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { auth, collectionDB } from "../configurations/firebase";
import {signOut} from "firebase/auth";
import { getDoc } from "firebase/firestore";

const Account = () => {

    //TEMPORARY TO BE PLACED HERE:

    //function: write data into firestore
    // getDoc(collectionDB)
    //   .then(() => {
    //     console.log(snapshot);
    //     swal("Success write into Firebase", "Please see the data on console log", "success");
    //   })
    //   .catch( (error) => {
    //     console.log(error);
    //     swal("Error at getDoc(collection)", "Please check the console log", "error");
    //   })

    //state: configurations
    const accountReg = useRef();
    const { setShowAccountPopUp } = useStateContext();
    
    //function: refresh page
    function refreshPage() {
      window.location.reload(false);
    }
  
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
          //refresh the page
          refreshPage();
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
                <div className={styles.emptylogin}>
                  <h1>Hello {auth?.currentUser?.displayName}</h1>
                  <p>Enjoy Shopping With Us</p>
    
                  <Link href="/myaccountpage">
                    <button
                      type="button"
                      onClick={() => setShowAccountPopUp(false)}
                      className="btn"
                    >
                      My Account
                    </button>
                  </Link>

                  <Link href="/">
                    <button
                      type="button"
                      onClick={logOut}
                      className="btn"
                    >
                      Sign Out
                    </button>
                  </Link>
                  
                </div>
              }
            </div>
          </div>
        </div>
        </>) : (
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
