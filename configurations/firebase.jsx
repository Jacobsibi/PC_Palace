// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC7jA5-FfoOahzAp37Z0TFtd2VFV6KKs8",
  authDomain: "pc-palace-firebase.firebaseapp.com",
  projectId: "pc-palace-firebase",
  storageBucket: "pc-palace-firebase.appspot.com",
  messagingSenderId: "36614120009",
  appId: "1:36614120009:web:0bfb5174cbacf1ad459598",
  measurementId: "G-DFFVS9MX4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authGoogle = new GoogleAuthProvider();
export const authFacebook = new FacebookAuthProvider();
export const database = getFirestore();
export const collectionDB = collection(database, "usersWithName"); //DRAFT, you can change the collection name

