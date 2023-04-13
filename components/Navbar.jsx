import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import SearchBar from "./SearchBar.jsx";
import styles from "../styles/Navbar.module.css";

// const Navbar = () => {
//   return (
//     <div className="navbar-container">
//       <p className="logo">
//         <Link href="/">INSERT ---NAVBAR</Link>
//       </p>

//       <button type="button" className="cart-icon" onClick="">
//         <AiOutlineShopping/>
//         <span className="cart-item-qty">1</span>
//       </button>
//     </div>
//   )
// }

// export default Navbar

export default function Navbar() {
	return (
        <div className={styles.navbar}>
            <SearchBar />
            <button className="cart-icon" onClick="">
                <AiOutlineShopping/>
                <span className="cart-item-qty">1</span>
            </button>
        </div>
    );
}
