import React from 'react';
import Link from 'next/link';
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
}

export default function Navbar() {
	return (
        <div className={styles.navbar}>
            <SearchBar />
            <CartButton itemAmount={1} />
        </div>
    );
}
