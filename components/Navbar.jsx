import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import SearchBar from "./SearchBar.jsx";
import styles from "../styles/Navbar.module.css";
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const CartButton = (props) => {
	const { setShowCart } = useStateContext();
	return (<>
		<button className="cart-icon" onClick={() => setShowCart(true)}>
			<AiOutlineShopping />
			<span className="cart-item-qty">{props.itemAmount}</span>
		</button>
	</>);
}

const Navbar = () => {
	const { showCart, totalQuantities } = useStateContext();
	return (<>
		<div className={styles.navbar}>
			<SearchBar />
			<CartButton itemAmount={totalQuantities} />
		</div>
		{showCart && <Cart />}
	</>);
}

export default Navbar;
