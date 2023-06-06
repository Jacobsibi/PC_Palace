import styles from '../styles/Login.module.css';
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineLogin } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { useState } from "react";
import { auth, authGoogle } from "../configurations/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

const Logout = () => {

	//email and password to be used as parameter for Firebase special function
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//draft output current user email on console log
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
		} alert("You are logged out");
	};

	//internal configurations
	const loginReg = useRef();
	const { setShowLogin } = useStateContext();

	return (
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
					<div className={styles.emptylogin}>
						<AiOutlineLogin size={100} />
						<h1>Welcome to PC Palace</h1>
						<p >You are logged in as {auth.currentUser.email}</p>
						<Link href="/">

							<button
								type="button"
								onClick={logOut}
								className={styles.btn}
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

export default Logout
