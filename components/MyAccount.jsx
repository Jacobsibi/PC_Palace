import swal from 'sweetalert';
import styles from '../styles/Support.module.css';
import React, { useState } from 'react';
import { auth } from "../configurations/firebase";


 const MyAccount = () => {
  
  //email and password to be used as parameter for Firebase special function
  //name to update user's name when create an account via email, becuase it is not done automatically
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  //function:

  //function:

  //output:
  return (
    <div class={styles.form}>
      <h1>Hello {auth?.currentUser?.displayName} </h1>
      <p>Update your details here</p>
      <button class={styles.btn} > Update </button> 
    </div>
  );
}
export default MyAccount;