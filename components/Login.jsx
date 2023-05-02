import swal from 'sweetalert';
import styles from '../styles/Login.module.css';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { db, auth, authGoogle } from "../configurations/firebase";
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {

  //email and password to be used as parameter for Firebase special function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentUserIn, setCurrentUserIn] = useState("");

  //draft output current user email on console log
  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.displayName);

//SET A DOCUMENT TO DATABASE Declaration (used for create account)
const setterDoc = async (email, fullName) => {

  const userRef = collection(db, "usersWithName");

  await setDoc(doc(userRef), {
    currentUser: email,
    fullName: fullName
  });
  setCurrentUserIn(fullName);
}

  //GET A DOCUMENT FROM DATABASE Declaration (used for login)
  const getterDoc = async () => {

    const collectionRef = collection(db, "usersWithName");
    const q = query(collectionRef, where('currentUser', '==', auth?.currentUser?.email ) );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //doc.data() is never undefined for query doc snapshots
      console.log(doc.id, "=>", doc.data());
      setCurrentUserIn(doc.data().fullName);
    })
    
  }

  //CREATE NEW ACCOUNT WITH EMAIL AND PASSWORD
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // >>> Handle the user fullname storage to firestore
      await setterDoc(email, fullName);

      console.log('Create account successful!');
      swal("Welcome", "You created new account", "success");
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Handle the email already in use error
        console.log('Email already exists');
        swal("Email already exists", "Please enter new email", "error");
      } else if (error.code === 'auth/phone-number-already-exists') {
        // Handle the phone number already in use error
        console.log('Phone number already exists');
        swal("Phone number already exists", "Please enter new phone number", "error");
      } 
        else if (error.code === 'auth/invalid-email') {
        // Handle the invalid email 
        console.log('Invalid Email');
        swal("Invalid Email", "Please fill in correct email address", "warning");
      }
        else if (error.code === 'auth/missing-email') {
        // Handle the email field is empty 
        console.log('Enter Email');
        swal("Enter Email", "Please fill in email field", "warning");
      }
        else if (error.code === 'auth/missing-password') {
        // Handle the password field is empty 
        console.log('Enter Password');
        swal("Enter Password", "Please fill in password field", "warning");
      } 
        else if (error.code === 'auth/weak-password') {
        // Handle the weak password
        console.log('Enter Strong Password');
        swal("Enter Strong Password", "Password should be at least 6 characters", "warning");
      } 
        else {
        // Handle other errors
        console.log(error.message);
        swal("Error", "Please try again",  "error");
      }
    }

  }

  //SIGN IN THE EXISTED ACCOUNT ONLY
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      getterDoc();
      console.log('Login successful!');
      console.log(currentUserIn);  //just to know who is this name ?????

      swal("Logged In", "You signed in with email", "success");
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        // Handle the wrong passwrod
        console.log('Wrong Password');
        swal("Wrong Password", "Please enter correct password", "error");
      } 
       else if (error.code === 'auth/user-not-found') {
        // Handle user not found
        console.log('User not found)');
        swal("Account not existed", "Please enter correct email or password", "error");
      } 
      else if (error.code ===  'auth/invalid-email' ) {
        // Handle inavlid email but correct password
        console.log('Invalid email(correct password)');
        swal("Account not existed", "Please enter correct email or password", "error");
      } 
      else if (error.code === 'auth/missing-email') {
        // Handle the email field is empty 
        console.log('Enter Email');
        swal("Enter Email", "Please fill in email field", "warning");
      }
        else if (error.code === 'auth/missing-password') {
        // Handle the password field is empty 
        console.log('Enter Password');
        swal("Enter Password", "Please fill in password field", "warning");
      }
      else {
        // Handle other errors
        console.log(error.message);
        swal("Error", "Please try again",  "error");
      }
    }
  };

  //SIGN IN WITH GOOGLE (both new and returning customer)
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, authGoogle);
      setCurrentUserIn(auth?.currentUser?.displayName);
      console.log('Login with Google successful!');
      swal("Logged In", "You signed in with Google", "success");
    } catch (error) {
      console.log(error);
      swal("Error", "Please try again",  "error");
    }
  };

  //LOGOUT (right now currentUser != NUlL)
  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUserIn("");
      swal("Logged Out", "You are logged out from your account", "info");
    } catch (error) {
      console.log(error);
      swal("Error", "Please try again",  "error");
    }
  };

  //internal configurations
  const loginReg = useRef();
  const { setShowLogin } = useStateContext();

  return (
    <div class={styles.scrollcontainer}>
      <div className={styles.loginwrapper} ref={loginReg}>
        <div className={styles.logincontainer}>
          <button
            type="button"
            className="cart-heading"
            onClick={() => setShowLogin(false)}>
            <AiOutlineLeft />
            <span className="heading">Back</span>
          </button>

          {(
            // >>> QUESTION: How to, when click this link, render the page, make SignUp component to show up ?
            <div className={styles.emptylogin}>
              <h1>Login {currentUserIn}</h1>
              {/* <p>New Member?<Link className={styles.buttonsignuppage} href=""> Sign Up</Link> </p> */}
              <p>Welcome to PC Palace</p>
              <Link href="/">

                <input
                  placeholder="Name..."
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  className={styles.input}
                />
                <input
                  placeholder="Email..."
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <input
                  placeholder="Password..."
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  minlength="8" required
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={signIn}
                  className={styles.btn}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={signInGoogle}
                  className={styles.btn}
                >
                  Sign In With Google
                </button>
                <button
                  type="button"
                  onClick={logOut}
                  className={styles.btn}
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={createAccount}
                  className={styles.btn}
                >
                  Create Account
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login