import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC23qbkZCKbxw0uga-e76hw_5p2XIaKD_A",
  authDomain: "fir-course-2d02e.firebaseapp.com",
  projectId: "fir-course-2d02e",
  storageBucket: "fir-course-2d02e.appspot.com",
  messagingSenderId: "885405419586",
  appId: "1:885405419586:web:63c33b9a1bfd2fe8aec5db",
  measurementId: "G-8HSHQJ3LDQ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  //Firebase authentication login with email object
export const authGoogle = new GoogleAuthProvider(); //Firebase authenticatio login with google object 