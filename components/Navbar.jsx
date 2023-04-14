import React, { useState } from 'react';
import Link from 'next/link';
<<<<<<< Updated upstream
import { AiOutlineShopping } from 'react-icons/ai'
import SearchBar from "./SearchBar.jsx";
import styles from "../styles/Navbar.module.css";

function CartButton(props) {
    return (
        <button className="cart-icon" onClick="">
            <AiOutlineShopping/>
            <span className="cart-item-qty">{props.itemAmount}</span>
        </button>
    );
=======
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">INSERT ---NAVBAR</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
>>>>>>> Stashed changes
}

export default function Navbar() {
	return (
        <div className={styles.navbar}>
            <SearchBar />
            <CartButton itemAmount={1} />
        </div>
    );
}
