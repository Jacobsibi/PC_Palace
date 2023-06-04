import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { runSuccessStars } from "@/LIB/utils";
import styles from "../styles/Receipts.module.css";
import { auth } from "@/configurations/firebase";


const Receipts = () => {
  const { cartItems } = useStateContext();
  const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();

  return (
    <>
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <hr />
        </div>
      ))}
    </div>


  <div class={styles.receipt}>
    <div class={styles.header}>
      <h2>Receipt</h2>
    </div>
    <div class="logo">
      <img src="/logo-image.png" width={100} height={30} alt="Store Logo"/>
    </div>
    <div class={styles.storeinfo}>
      <p>PC Palace</p>
      <p>55 Wellesley St East, Auckland, New Zealand</p>
      <p>Phone: (123) 456-7890</p>
    </div>
    <div class={styles.customerinfo}>
      <p>Customer Name: {auth?.currentUser?.displayName}</p>
      <p>Date: {formattedDate}</p>
    </div>
    <div class={styles.items}>
      <div class={styles.itemrow}>
        <span>Item 1</span>
        <span>$10.00</span>
      </div>
      <div class={styles.itemrow}>
        <span>Item 2</span>
        <span>$15.00</span>
      </div>
    </div>
    <div class={styles.total}>
      <p>Subtotal: $25.00</p>
      <p>Tax: $2.50</p>
      <p>Total: $27.50</p>
    </div>
  </div>
</>

  );
};

export default Receipts;
