import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { db, auth, authGoogle } from "../configurations/firebase";
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Context = createContext();

export const StateContext = ({ children }) => {
    //email and password to be used as parameter for Firebase special function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [currentUserIn, setCurrentUserIn] = useState("");

  //
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    //check if product is already in the cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      //recognise if item is already in the cart and simply add quantity instead of duplicating same item
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
      //else if item does not already exist in cart
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart!`);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        const updatedItem = { ...item };
        updatedItem.quantity += value === 'inc' ? 1 : -1;
        if (updatedItem.quantity < 1) {
          updatedItem.quantity = 1;
        }
        return updatedItem;

      }
      return item;
    });
    
    setCartItems(updatedCartItems);

    const foundProduct = cartItems.find((item) => item._id === id);
    const itemPrice = foundProduct.price;
    const itemQuantity = foundProduct.quantity + (value === 'inc' ? 1 : -1);
    if (itemQuantity < 1) {
      return;
    }
    setTotalPrice((prevTotalPrice) => {
      let newPrice = prevTotalPrice + (value === 'inc' ? itemPrice : -itemPrice);
      if (newPrice < 0) {
        newPrice = 0;
      }
      return newPrice;
    });
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + (value === 'inc' ? 1 : -1));
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1
    });
  }

  //// >>> auxiliary functions code for login:
  //SET A DOCUMENT TO DATABASE Declaration (used for create account)
const setterDoc = async (email, fullName) => {

  const userRef = collection(db, "usersWithName");

  await setDoc(doc(userRef), {
    currentUser: email,
    fullName: fullName
  });

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

  return (
    <Context.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        fullName,
        setFullName,
        currentUserIn,
        setCurrentUserIn,
        showLogin,
        setShowLogin,
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);