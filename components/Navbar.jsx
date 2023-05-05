import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { Cart, Login } from './index';
import { useStateContext } from '../context/StateContext';
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";


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
	const { setShowLogin} = useStateContext();
	return (<>
		<button className={styles.accountButton} onClick={() => setShowLogin(true)}>
			<AiOutlineUser />
		</button>
	</>);
}

const Departments = (props) => {
	const [ prevScrollY, setPrevScrollY ] = React.useState(0);
	const router = useRouter();
	console.log(router.pathname);

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
				<li><Link href={`/?filter=cpu&rerender=${router.pathname !== "/"}`}>CPUs</Link></li>
				<li><Link href={`/?filter=gpu&rerender=${router.pathname !== "/"}`}>Graphics Cards</Link></li>
				<li><Link href={`/?filter=mb&rerender=${router.pathname !== "/"}`}>Motherboards</Link></li>
				<li><Link href={`/?filter=ram&rerender=${router.pathname !== "/"}`}>Memory</Link></li>
				<li><Link href={`/?filter=sto&rerender=${router.pathname !== "/"}`}>Storage</Link></li>
				<li><Link href={`/?filter=psu&rerender=${router.pathname !== "/"}`}>Power Supply</Link></li>
				<li><Link href={`/?filter=case&rerender=${router.pathname !== "/"}`}>Case</Link></li>
			</ul>
		</div>
    </>);
}

const Navbar = () => {
	const { showCart, totalQuantities, showLogin } = useStateContext();
	const [ showDepartments, setShowDepartments ] = React.useState(false);

	return (<>
		<div className={styles.navbar}>
			<span className={styles.pages}><Link href={"/"}>home(logo)</Link></span>
			<span className={styles.pages}><Link href={"/buildcomputer"}>Computer Builder</Link></span>
			<span className={styles.pages}><Link href={"/support"}>Support</Link></span>
			<span className={styles.pages}><Link href={"/about"}>About us</Link></span>
			<div />
			<button className={styles.departmentsButton} onClick={() => setShowDepartments(!showDepartments)}>Departments</button>
			<Account />
			<CartButton itemAmount={totalQuantities} />
		</div>
		{showDepartments && <Departments hideDepartments={() => setShowDepartments(false)} />}
		{showCart && <Cart />}
		{showLogin && <Login />}
	</>);
}

export default Navbar;
