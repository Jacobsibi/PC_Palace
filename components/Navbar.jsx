import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { Cart, Login, SearchBar } from './index';
import { useStateContext } from '../context/StateContext';
import styles from "../styles/Navbar.module.css";
import Image from "next/image";


const CartButton = props => {
	return (<>
		<button className="cart-icon" onClick={() => props.setShowCart(true)}>
			<AiOutlineShopping />
			<span className="cart-item-qty">{props.itemAmount}</span>
		</button>
	</>);
}

const Account = () => {
	const { setShowLogin} = useStateContext();
	return (
		<button className={styles.functionalityButton} onClick={() => setShowLogin(true)}>
			<AiOutlineUser />
		</button>
	);
}

const Departments = props => {
	const [ prevScrollY, setPrevScrollY ] = React.useState(0);
	
	props.handleClick();

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

const BeginSearch = props => {
	return (
		<button className={styles.functionalityButton} onClick={() => props.handleClick()}>
			<AiOutlineSearch />
		</button>
	);
}

const Navbar = () => {
	const { totalQuantities, showLogin } = useStateContext();
	const [ showDepartments, setShowDepartments ] = React.useState(false);
	const [ showSearch, setShowSearch ] = React.useState(false);
	const [ showCart, setShowCart ] = React.useState(false);

	return (<>
		<div className={styles.navigation}>
			<div className={styles.navbar}>
				<span className={styles.pages}>
					<Link href={"/"}>
						<Image src={"/logo-image.png"} width={1134} height={272}></Image>
					</Link>
				</span>
				<span className={styles.pages}><Link href={"/pcbuilder/build"}>Computer Builder</Link></span>
				<span className={styles.pages}><Link href={"/support"}>Support</Link></span>
				<span className={styles.pages}><Link href={"/about"}>About us</Link></span>
				<div />
				<button className={styles.departmentsButton} onClick={() => setShowDepartments(!showDepartments)}>
					Departments
				</button>
				<BeginSearch handleClick={() => { 
					setShowSearch(!showSearch); 
					setShowDepartments(false); 
				}}/>
				<Account />
				<CartButton setShowCart={e => setShowCart(e)} itemAmount={totalQuantities} />
			</div>
		</div>
		{showSearch && <SearchBar />}
		{showDepartments && <Departments handleClick={() => setShowSearch(false)} hideDepartments={() => setShowDepartments(false)} />}
		{showCart && <Cart setShowCart={e => setShowCart(e)} />}
		{showLogin && <Login />}
	</>);
}

export default Navbar;
