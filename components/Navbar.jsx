import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { AccountPopUp, Cart, Login, SearchBar } from './index';
import { useStateContext } from '../context/StateContext';
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { useDepartmentsContext } from '@/context/DepartmentsContext';
import { useRouter } from "next/router";


const CartButton = props => {
	return (<>
		<button className="cart-icon" onClick={() => props.setShowCart(true)}>
			<AiOutlineShopping />
			<span className="cart-item-qty">{props.itemAmount}</span>
		</button>
	</>);
}

const Account = props => {
	return (
		<button className={styles.functionalityButton} onClick={() => props.setShowLogin(true)}>
			<AiOutlineUser />
		</button>
	);
}

const Departments = props => {
	const [ prevScrollY, setPrevScrollY ] = React.useState(0);
	const { setDepartmentsFilter } = useDepartmentsContext();

	const router = useRouter();

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

	const onClick = event => {
		let chosen = event.target.textContent;

		switch (chosen) {
			case "CPUs": {
				setDepartmentsFilter("CPU");
			} break;

			case "Graphics Cards": {
				setDepartmentsFilter("GPU");
			} break;

			case "Motherboards": { 
				setDepartmentsFilter("MB");
			} break;

			case "Memory": {
				setDepartmentsFilter("RAM");
			} break;

			case "Storage": {
				setDepartmentsFilter("STO");
			} break;

			case "Power Supply": {
				setDepartmentsFilter("PSU");
			} break;

			case "Case": {
				setDepartmentsFilter("CASE");
			} break;

			case "All departments": {
				setDepartmentsFilter("");
			} break;
		}

		if (router.pathname !== "/") {
			router.push("/");
		}
	}

    return (<>
		<div className={styles.departments}>
			<ul>
				<li onClick={e => onClick(e)}><div>CPUs</div></li>
				<li onClick={e => onClick(e)}><div>Graphics Cards</div></li>
				<li onClick={e => onClick(e)}><div>Motherboards</div></li>
				<li onClick={e => onClick(e)}><div>Memory</div></li>
				<li onClick={e => onClick(e)}><div>Storage</div></li>
				<li onClick={e => onClick(e)}><div>Power Supply</div></li>
				<li onClick={e => onClick(e)}><div>Case</div></li>
				<li onClick={e => onClick(e)}><div>All departments</div></li>
			</ul>
		</div>
    </>);
}

const BeginSearch = props => {
	return (
		<button className={styles.functionalityButton} onClick={() => props.handleClick()}>
			<AiOutlineSearch />
		</button>
	);
}

const Navbar = () => {
	const { totalQuantities } = useStateContext();
	const [ showDepartments, setShowDepartments ] = React.useState(false);
	const [ showSearch, setShowSearch ] = React.useState(false);
	const [ showCart, setShowCart ] = React.useState(false);
	const [ showLogin, setShowLogin ] = React.useState(false);
	const { setDepartmentsFilter } = useDepartmentsContext();

	const handleDepartmentsClick = () => {
		setShowSearch(false);
		setShowDepartments(!showDepartments);
	}

	return (<>
		<div className={styles.navigation}>
			<div className={styles.navbar}>
				<span className={styles.pages}>
					<Link href={"/"} onClick={() => setDepartmentsFilter("")}>
						<Image src={"/logo-image.png"} width={1134} height={272} alt="Logo"></Image>
					</Link>
				</span>
				<span className={styles.pages}><Link href={"/pcbuilder/build"}>Computer Builder</Link></span>
				<span className={styles.pages}><Link href={"/support"}>Support</Link></span>
				<span className={styles.pages}><Link href={"/about"}>About us</Link></span>
				<div />
				<button className={styles.departmentsButton} onClick={() => handleDepartmentsClick()}>
					Departments
				</button>
				<BeginSearch handleClick={() => { 
					setShowSearch(!showSearch); 
					setShowDepartments(false); 
				}}/>
				<Account setShowLogin={e => setShowLogin(e)} />
				<CartButton setShowCart={e => setShowCart(e)} itemAmount={totalQuantities} />
			</div>
		</div>
		{showSearch && <SearchBar />}
		{showDepartments && <Departments hideDepartments={() => setShowDepartments(false)} />}
		{showCart && <Cart setShowCart={e => setShowCart(e)} />}
		{showLogin && <AccountPopUp setShowLogin={e => setShowLogin(e)} />}
	</>);
}

export default Navbar;
