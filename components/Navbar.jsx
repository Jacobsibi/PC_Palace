import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import styles from "../styles/Navbar.module.css";

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

const Departments = (props) => {
	const [ prevScrollY, setPrevScrollY ] = React.useState(0);

	const handleScroll = () => {
		if (window.scrollY != prevScrollY) {
			setPrevScrollY(window.scrollY);
			props.hideDepartments();
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

    return (<>
		<div className={styles.departments}>
			<ul>
				<li><Link href={""}>CPUs</Link></li>
				<li><Link href={""}>Graphics Cards</Link></li>
				<li><Link href={""}>Motherboards</Link></li>
				<li><Link href={""}>Memory</Link></li>
				<li><Link href={""}>Storage</Link></li>
				<li><Link href={""}>Power Supply Units</Link></li>
				<li><Link href={""}>System Cooling</Link></li>
				<li><Link href={""}>Case</Link></li>
				<li><Link href={""}>Monitor</Link></li>
				<li><Link href={""}>Peripherals</Link></li>
			</ul>
		</div>
    </>);
}

const Navbar = () => {
	const { showCart, totalQuantities } = useStateContext();
	const [ showDepartments, setShowDepartments ] = React.useState(false);

	return (<>
		<div className={styles.navbar}>
			<span className={styles.pages}><Link href={"/"}>home(logo)</Link></span>
			<span className={styles.pages}><Link href={"/buildcomputer"}>Computer Builder</Link></span>
			<span className={styles.pages}><Link href={""}>Specials</Link></span>
			<span className={styles.pages}><Link href={""}>Brands</Link></span>
			<span className={styles.pages}><Link href={"/support"}>Support</Link></span>
			<span className={styles.pages}><Link href={"/about"}>About us</Link></span>
			<div />
			<button className={styles.departmentsButton} onClick={() => setShowDepartments(!showDepartments)}>Departments</button>
			<Account />
			<CartButton itemAmount={totalQuantities} />
		</div>
		{showDepartments && <Departments hideDepartments={() => setShowDepartments(false)} />}
		{showCart && <Cart />}
	</>);
}

export default Navbar;
