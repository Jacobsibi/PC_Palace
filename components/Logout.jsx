import swal from 'sweetalert';
import styles from '../styles/Support.module.css';
import { auth  } from "../configurations/firebase";
import {signOut} from "firebase/auth";

const Logout = () => {

  //Function: logout
  const logOut = async () => {
    try {
      await signOut(auth);
      swal("Logged Out", "You are logged out from your account", "info");
    } catch (error) {
      swal("Error", "Please try again",  "error");
    }
  };

  return (
    <div class={styles.form}>

        <h1>Welcome {auth?.currentUser} </h1>
        <p>Enjoy Shopping With Us</p>
     
      <button class={styles.btn} onClick={logOut}> Logout</button> 

    </div>
  );
}

export default Logout