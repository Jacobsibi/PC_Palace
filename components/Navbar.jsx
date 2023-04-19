import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import SearchBar from "./SearchBar.jsx";
// import styles from "../styles/Navbar.module.css";
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import styles from "../test/Navbar.module.css";

const CartButton = (props) => {
	const { setShowCart } = useStateContext();
	return (<>
		<button className="cart-icon" onClick={() => setShowCart(true)}>
			<AiOutlineShopping />
			<span className="cart-item-qty">{props.itemAmount}</span>
		</button>
	</>);
}

const Account = () => {
	return (<>
		<button className={styles.accountButton} onClick={console.log("Add an account drop-down similar to the cart")}>
			<AiOutlineUser />
		</button>
	</>);
}

// const Navbar = () => {
// 	const { showCart, totalQuantities } = useStateContext();
// 	return (<>
// 		<div className={styles.navbarWrapper}>
// 			<div className={styles.navbar}>
// 				<div className={styles.pages}>
// 					<div>
// 						<Link href={"/"}>
// 							{/*<img className="logo" />*/}
// 							home(logo)
// 						</Link>
// 					</div>

// 					<div>
// 						<Link href={"/buildcomputer"}>
// 							Computer Builder
// 						</Link>
// 					</div>


// 					<div>
// 						<Link href={""}>
// 							Hardware
// 						</Link>
// 					</div>

// 					<div>
// 						<Link href={""}>
// 							Peripherals
// 						</Link>
// 					</div>

// 					<div>
// 						<Link href={""}>
// 							Specials
// 						</Link>
// 					</div>

// 					<div>
// 						<Link href={""}>
// 							Brands
// 						</Link>
// 					</div>

// 					<div>
// 						<Link href={"/support"}>
// 							Support
// 						</Link>
// 					</div>

// 					<div>
// 						<Link href={"/about"}>
// 							About us
// 						</Link>
// 					</div>
// 				</div>
				
// 				<div className={styles.functionality}>
// 					<SearchBar />
// 					<Account />
// 					<CartButton itemAmount={totalQuantities} />
// 				</div>
// 			</div>
// 		</div>
// 		{showCart && <Cart />}
// 	</>);
// }

const Navbar = () => {
	const { showCart, totalQuantities } = useStateContext();

	return (<>
		<ul className={styles.navbar}>
			<li><Link href={"/"}>home(logo)</Link></li>
			<li><Link href={""}>Hardware</Link></li>
			<li><Link href={""}>Peripherals</Link></li>
			<li><Link href={""}>Specials</Link></li>
			<li><Link href={""}>Brands</Link></li>
			<li><Link href={"/support"}>Support</Link></li>
			<li><Link href={"/about"}>About us</Link></li>
		</ul>
		{showCart && <Cart />}
	</>);
}

export default Navbar;
