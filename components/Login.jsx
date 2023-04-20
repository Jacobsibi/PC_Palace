//I need to make names into Login not Cart
//My goal is to make this pop up when click the little man on homepage

import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineLogin } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../LIB/client';
import { useState } from "react";
import { auth, authGoogle } from "../configurations/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {
  
  //email and password to be used as parameter for Firebase special function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //output current user email on console
  console.log(auth?.currentUser?.email);

  //calling Firebase special functions
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, authGoogle);
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  //internal configurations
  const loginRef = useRef();
  const {setShowLogin} = useStateContext();

  return (
    <div className="cart-wrapper" ref={loginRef}>
      <div className="cart-container">
      <button
          type="button"
          className="cart-heading"
          onClick={() => setShowLogin(false)}>
          <AiOutlineLeft />
          <span className="heading">Back</span>
        </button>

        {(
          <div className="empty-cart">
            <AiOutlineLogin size={150} />
            <h3>Welcome to PC Palace</h3>
            <Link href="/">
            <input
                placeholder="Email..."
                onChange={console.log}
                //onChange={(e) => setEmail(e.target.value)}
              />
               <input
              placeholder="Password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
               //onChange={(e) => setPassword(e.target.value)}
            />
              <button
                type="button"
                onClick={() => setShowCart(false)}
                //onClick={signIn}
                className="btn"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                //onClick={signInGoogle}
                className="btn"
              >
                Sign In With Google
              </button>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                //onClick={logOut}
                className="btn"
              >
                Sign Out
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login