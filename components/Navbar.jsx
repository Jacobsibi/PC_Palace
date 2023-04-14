import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import SearchBar from "./SearchBar.jsx";
import styles from "../styles/Navbar.module.css";
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const CartButton = () => {
	const { setShowCart, totalQuantities } = useStateContext();
	return (<>
		<button className="cart-icon" onClick={() => setShowCart(true)}>
			<AiOutlineShopping />
			<span className="cart-item-qty">{totalQuantities}</span>
		</button>
	</>);
}

const Navbar = () => {
	const { showCart } = useStateContext();
	return (<>
		<div className={styles.navbar}>
			<SearchBar />
			<CartButton itemAmount={1} />
		</div>
		{showCart && <Cart />}
	</>);
}

export default Navbar;
