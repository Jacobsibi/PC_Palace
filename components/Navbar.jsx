import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { Cart, Login, SearchBar } from './index';
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
				setDepartmentsFilter("cpu");
			} break;

			case "Graphics Cards": {
				setDepartmentsFilter("gpu");
			} break;

			case "Motherboards": { 
				setDepartmentsFilter("mb");
			} break;

			case "Memory": {
				setDepartmentsFilter("ram");
			} break;

			case "Storage": {
				setDepartmentsFilter("sto");
			} break;

			case "Power Supply": {
				setDepartmentsFilter("psu");
			} break;

			case "Case": {
				setDepartmentsFilter("case");
			}
		}

		if (router.pathname !== "/") {
			router.push("/");
		}
	}

    return (<>
		<div className={styles.departments}>
			{/* <ul>
				<li><Link href={`/?filter=cpu`}>CPUs</Link></li>
				<li><Link href={`/?filter=gpu`}>Graphics Cards</Link></li>
				<li><Link href={`/?filter=mb`}>Motherboards</Link></li>
				<li><Link href={`/?filter=ram`}>Memory</Link></li>
				<li><Link href={`/?filter=sto`}>Storage</Link></li>
				<li><Link href={`/?filter=psu`}>Power Supply</Link></li>
				<li><Link href={`/?filter=case`}>Case</Link></li>
			</ul> */}
			<ul>
				<li><div onClick={e => onClick(e)}>CPUs</div></li>
				<li><div>Graphics Cards</div></li>
				<li><div>Motherboards</div></li>
				<li><div>Memory</div></li>
				<li><div>Storage</div></li>
				<li><div>Power Supply</div></li>
				<li><div>Case</div></li>
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

	const handleDepartmentsClick = () => {
		setShowSearch(false);
		setShowDepartments(!showDepartments);
	}

	return (<>
		<div className={styles.navigation}>
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
		{showLogin && <Login setShowLogin={e => setShowLogin(e)} />}
	</>);
}

export default Navbar;
