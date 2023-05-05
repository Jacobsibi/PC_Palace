import swal from 'sweetalert';
import styles from '../styles/Support.module.css';
import { auth  } from "../configurations/firebase";
import {signOut} from "firebase/auth";


 const Logout = async () => {
  


    //Function: logout  xxxxx NOT USED CURENTLY
    const logOut = async () => {
      try {
          //check if there account is signed out already, give out a prompt
        if (!auth?.currentUser){
          await swal("Already Logged Out", "No user signed in at the moment", "warning");
        } else{
          await signOut(auth);
          swal("Logged Out", "You are logged out from your account", "info");
        }
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