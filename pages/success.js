import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';
import { runSuccessStars } from '@/LIB/utils';
import styles from "../styles/Index.module.css";

const Success = () => {
  const { cartItems, setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  //adding the cart items to local storage
  // const itemsToStore = cartItems.map((item) => {
  //   return {
  //     id: item._id,
  //     name: item.name,
  //     price: item.price,
  //     quatity: item.quantity,
  //     };
  //   });

  //reset upon cart success checkout 
  // useEffect(() => {
  //   localStorage.clear();
  //   setCartItems([]);
  //   setTotalPrice(0);
  //   setTotalQuantities(0);
  //   runSuccessStars();
  // }, []);




  return (
    <div className={styles.finalizeWrapper}>
      <div className={styles.finalize}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Your order is confirmed. Thank you!</h2><br></br>
        <p className={styles.finalizeEmail}>Your receipt has been successfully sent to your email.</p>
        <p className={styles.description}>
          If you have any queries, please email
          <a className={styles.email} href="mailto:info@pcpalace.com">
            info@pcpalace.com
          </a>
        </p>

        <p> Hello Worldssss</p>

    {/* Receipts */}
    {cartItems.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}


        <Link href="/">
          <button type="button" width="300px" className="btn">
          Continue shopping with us
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success