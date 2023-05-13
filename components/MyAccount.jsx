import swal from 'sweetalert';
import styles from '../styles/Support.module.css';
import { auth  } from "../configurations/firebase";


 const MyAccount = async () => {
  
  //function:

  //function:

  //output:
  return (
    <div class={styles.form}>
      <h1>Hello {auth?.currentUser} </h1>
      <p>Update your details here</p>
      <button class={styles.btn} > Update </button> 
    </div>
  );
}
export default MyAccount