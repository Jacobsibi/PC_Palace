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
			<div className={styles.pages}>
				<p>
					<Link href={"/"}>
						{/*<img className="logo" />*/}
						home(logo)
					</Link>
				</p>

				<p>
					<Link href={"/buildcomputer"}>
						Computer Builder
					</Link>
				</p>


				<p>
					<Link href={""}>
						Hardware
					</Link>
				</p>

				<p>
					<Link href={""}>
						Peripherals
					</Link>
				</p>

				<p>
					<Link href={""}>
							Specials
					</Link>
				</p>

				<p>
					<Link href={""}>
							Brands
					</Link>
				</p>

				<p>
					<Link href={"/about"}>
							About us
					</Link>
				</p>
			</div>
			
			<div className={styles.functionality}>
				<SearchBar />
				<CartButton itemAmount={totalQuantities} />
			</div>
		</div>
		{showCart && <Cart />}
	</>);
}

export default Navbar;
