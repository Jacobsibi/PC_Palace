import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { Cart, AccountPopUp } from './index';
import { useStateContext } from '../context/StateContext';
import styles from "../styles/Navbar.module.css";
import Image from "next/image";

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
	const { setShowAccountPopUp } = useStateContext();
	return (<>
		<button className={styles.accountButton} onClick={() => setShowAccountPopUp(true)}>
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
				<li><Link href={`/?filter=cpu`}>CPUs</Link></li>
				<li><Link href={`/?filter=gpu`}>Graphics Cards</Link></li>
				<li><Link href={`/?filter=mb`}>Motherboards</Link></li>
				<li><Link href={`/?filter=ram`}>Memory</Link></li>
				<li><Link href={`/?filter=sto`}>Storage</Link></li>
				<li><Link href={`/?filter=psu`}>Power Supply</Link></li>
				<li><Link href={`/?filter=case`}>Case</Link></li>
			</ul>
		</div>
    </>);
}

const Navbar = () => {
	const { showAccountPopUp, showCart, totalQuantities } = useStateContext();
	const [ showDepartments, setShowDepartments ] = React.useState(false);
	return (<>
		<div className={styles.navbar}>
			<span className={styles.pages}>
				<Link href={"/"}>
					<Image src={"/logo-image.png"} width={1134} height={272}></Image>
				</Link>
			</span>
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
		{showAccountPopUp && <AccountPopUp />}
	</>);
}

export default Navbar;
