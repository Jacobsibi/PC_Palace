import React from "react";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/Generate.module.css";
import { useDepartmentsContext } from "../../context/DepartmentsContext";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineClose } from "react-icons/ai";
import getStripe from '../../lib/getStripe';
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
let allProducts = [];
const componentNameMapping = {
    "cpu": "CPU",
    "gpu": "GPU",
    "mbd": "Motherboard",
    "ram": "Memory",
    "sto": "Storage",
    "psu": "Power Supply",
    "case": "Case",
    "os": "Operating System",
    "cooling": "Cooler"
};
const componentSanityMapping = {
    "cpu": "CPU",
    "gpu": "GPU",
    "mbd": "MB",
    "ram": "RAM",
    "sto": "STO",
    "psu": "PSU",
    "case": "CASE",
    "os": "OS",
    "cooling": "COOLING"
}
const ChooseProduct = props => {
    const [ matchingProducts, setMatchingProducts ] = React.useState([]);
    const { departmentsFilter } = useDepartmentsContext();
    // Set initial state for matching products
    React.useEffect(() => {
        if (departmentsFilter === "") {
            setMatchingProducts(allProducts);
        } else {
            const result = allProducts.filter(product => product.component === departmentsFilter);
            setMatchingProducts(result);
        }
    }, []);
    const handleItemUpdated = product => {
        props.updateItem(product.component, product);
    }
    // Filter the results based on the type selected
    const filterResults = type => {
        if (type === "") {
            setMatchingProducts(allProducts);
        } else {
            const filter = componentSanityMapping[Object.keys(componentNameMapping).find(x => componentNameMapping[x] === type)];
            const result = allProducts.filter(product => product.component === filter);
            setMatchingProducts(result);
        }
    }
    return (
        <div className={styles.chooseProductContainer}>
            <div className={styles.chooseProduct}>
                <div className={styles.chooseProductHeader}>
                    Choose your item
                    <button onClick={() => props.cancelChoose()}>
                        <AiOutlineClose size={20} />
                    </button>
                </div>
                <div className={styles.productsListContainer}>
                    {props.customizeAll && /* Only render the filterer if customizeAll flag is set to true */
                    <div className={styles.departmentsFilterer}>
                        {
                            Object.values(componentNameMapping).map((type, index) => (
                                <button key={index} onClick={() => filterResults(type)}>{type}</button>
                            ))
                        }
                        <button onClick={() => filterResults("")}>All Departments</button>
                    </div>
                    }
                    <div className={styles.productsList}>
                        {
                            matchingProducts && matchingProducts.map((product, index) => {
                            return (
                                <div key={index} className={styles.selectableProduct}>
                                    <a href={`/product/${product.slug.current}`} target="_blank">
                                        <img src={urlFor(product.image[0])} width={150} height={150} alt={product.name} />
                                    </a>
                                    <p>{product.name}</p>
                                    <button className={styles.chooseProductButton} onClick={() => handleItemUpdated(product)}>Select</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
const ProductsDisplay = props => {
    const [ chooseProduct, setChooseProduct ] = React.useState(false);
    const { setDepartmentsFilter } = useDepartmentsContext();
    const editComponent = part => {        
        setChooseProduct(true);
        setDepartmentsFilter(componentSanityMapping[part]);
    }
    const updateBuild = (component, item) => {
        setChooseProduct(false);
        props.changeBuild(component, item);
    }
    
    return (<>
        <div className={styles.computerParts}>
            {
                props.pc.map((current, index) => {
                    const [ currentComponentName, currentComponentValue ] = current;
                    
                    return (
                        <div className={styles.singleItem} key={index}>
                            <a href={`/product/${currentComponentValue.slug.current}`} target="_blank">
                                <img src={urlFor(currentComponentValue.image[0])} width={200} height={200} alt={componentNameMapping[currentComponentName]} />
                            </a>
                            <button className={styles.editComponent} onClick={() => editComponent(currentComponentName)}>Customize</button>
                            <p>{currentComponentValue.name}</p>
                        </div>
                    );
                })
            }
        </div>
        {chooseProduct && <ChooseProduct cancelChoose={() => setChooseProduct(false)} 
            updateItem={(component, item) => updateBuild(component, item)} />}
    </>);
}
const BuildDetails = props => (
    <div className={styles.buildinfo}>
        <ul>
            {props.pc && Object.values(props.pc).map((product, index) => {
                const componentTypeMatching = Object.keys(props.pc).find(key => props.pc[key] === product);
                
                return (
                    <li key={index}>
                        <b>{componentNameMapping[componentTypeMatching]}</b>: {product.name}<br></br>
                        <b>${product.price}</b>
                        {index < Object.values(props.pc).length - 1 && <hr></hr>}
                    </li>
                );
            })}
        </ul>
    </div>
);
const FunctionalityButtons = props => {
    const [ customizeBuild, setCustomizeBuild ] = React.useState(false);
    const { setDepartmentsFilter } = useDepartmentsContext();
    const price = Object.values(Object.values(props)[0]).map(product => product.price).reduce((partialSum, curr) => partialSum + curr, 0);
    const updateBuild = (component, item) => {
        setCustomizeBuild(false);
        props.changeBuild(component, item);
    }
    const handleCustomizeBuildClick = () => {
        setCustomizeBuild(true);
        setDepartmentsFilter("");
    }
    return (<>
        <div className={styles.functionalityButtons}>
            <div>
                <button onClick={() => handleCustomizeBuildClick()}>Customize build</button>
                <button onClick={() => props.buildComplete()}>Complete build</button>
            </div>
            <div>
                <p>Total: {(Math.round(price * 100) / 100).toFixed(2)}</p>
            </div>
        </div>
        {customizeBuild && <ChooseProduct cancelChoose={() => setCustomizeBuild(false)} updateItem={(component, product) => updateBuild(component, product)}
            customizeAll={true} />}
    </>);
}
const OrderCompleteOverlay = props => {    
    // If the checkout step 2 flag is set to true (proceed to checkout was clicked) then render "purchase with/without cart"
    if (props.checkoutStep2) {
        return (
            <div className={styles.orderCompleteContainer}>
                <div className={styles.orderCompleteOverlay}>
                    <h1>Would you like to purchase with your cart items as well?</h1>
                    <div className={styles.orderCompleteButtons}>
                        <button onClick={() => props.purchaseWithCart(true)}>Purchase with cart</button>
                        <button onClick={() => props.purchaseWithCart(false)}>Purchase without cart</button>
                    </div>
                </div>
            </div>
        );
    }
    // Render "continue shopping" / "proceed to checkout"
    return (
        <div className={styles.orderCompleteContainer}>
            <div className={styles.orderCompleteOverlay}>
                <h1>Your build has been complete!</h1>
                <h4>Thank you for building with PC Palace!</h4>
                <div className={styles.orderCompleteButtons}>
                    <button onClick={() => props.continueShopping()}>Continue shopping</button>
                    <button onClick={() => props.checkout()}>Proceed to checkout</button>
                </div>
            </div>
        </div>
    )
}
const Generate = props => {
    const [ build, setBuild ] = React.useState({});
    const [ orderComplete, setOrderComplete ] = React.useState(false);
    const [ checkout, setCheckout ] = React.useState(false);
    const { addBuild, cartItems } = useStateContext();
    const router = useRouter();
    React.useMemo(() => {
        setBuild(props.build);
        allProducts = props.allProducts;
    }, []);

    React.useEffect(() => {
        if (Object.keys(props.build).length !== 9) {
            router.push("/pcbuilder/build");
        }
    })

    const handleBuildChange = (componentType, item) => {
        // update the part inside the build with the matching component type to the selected item
        const newBuild = JSON.parse(JSON.stringify(build));
        const componentTypeMatching = Object.keys(componentSanityMapping).find(key => componentSanityMapping[key] === componentType);
        newBuild[componentTypeMatching] = item;
        setBuild(newBuild);
    }
    const handleBuildComplete = () => {
        setOrderComplete(true);
    }
    // Checkout with stripe (similar to in Cart.jsx)
    const handleCheckout = async combineCart => {
        const stripe = await getStripe();
        let cart = Object.values(build).map(product => ({
            ...product,
            quantity: 1
        }));
        // Combine the cart and the builds
        if (combineCart) {
            cart = cart.concat(cartItems);
        }
		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cart),
		});
		if (response.statusCode === 500) return;
		const data = await response.json();
		toast.loading('Redirecting...');
		stripe.redirectToCheckout({ sessionId: data.id });
    }
    // Add all the products into the cart and return to home page
    const continueShopping = () => {
        addBuild(build);
        router.push("/");
    }
    return (
        <div className={styles.page}>
            <h1 className={styles.buildTitle}>{props.buildName}</h1>
            <div className={styles.contentFixed}>
                <ProductsDisplay pc={Object.keys(build).map(key => [key, build[key]])} changeBuild={(componentType, item) => handleBuildChange(componentType, item)} />
                <BuildDetails pc={build} />
            </div>
            <FunctionalityButtons build={build} changeBuild={(componentType, item) => handleBuildChange(componentType, item)} buildComplete={() => handleBuildComplete()} />
            {checkout && <OrderCompleteOverlay checkoutStep2={true} purchaseWithCart={combineCart => handleCheckout(combineCart)} />}
            {!checkout && orderComplete && <OrderCompleteOverlay continueShopping={() => continueShopping()} checkout={() => setCheckout(true)} />}
        </div>
    )
}



export const getServerSideProps = async context => {
	// the querys from the URL
	const query = context?.query;
	let props = { build: {}, allProducts: {}, buildName: "" };
	let defaultBuildSlug = "template-build";
	if (query && query.key) {
		// Extract the value of the 'key' attribute
		const key = query.key;

		// execute different logic based on the key value
		switch (key) {
			case 'low-gaming':
			  defaultBuildSlug = "low-end-gaming";
			  break;
			case 'medium-gaming':
			  defaultBuildSlug = "medium-gaming-custom-pc";
			  break;
			case 'high-gaming':
			  defaultBuildSlug = "high-gaming-custom-pc";
			  break;
			case 'low-streaming':
			  defaultBuildSlug = "medium-gaming-custom-pc";
			  break;
			case 'medium-streaming':
			  defaultBuildSlug = "medium-streaming-pc";
			  break;
			case 'high-streaming':
			  defaultBuildSlug = "high-streaming-pc";
			  break;
			case 'workstation':
			  defaultBuildSlug = "med-workstation-custom-pc";
			  break;
			default:
			  defaultBuildSlug = "template-build";
		  }
		  
	}

	// maps a slug to a component name
	const slugToComponentMapper = {
		cpuSlug: "cpu",
		gpuSlug: "gpu",
		mbSlug: "mbd",
		ramSlug: "ram",
		storageSlug: "sto",
		psSlug: "psu",
		caseSlug: "case",
		osSlug: "os",
		coolerSlug: "cooling"
	};



	const builds = await client.fetch(`*[_type == "builds" && buildSlug.current match"${query?.build ? query?.build : defaultBuildSlug}"]`)
	const build = builds[0];

	const componentSlugs = Object.keys(build).filter(key => key.toLowerCase().includes("slug") && key !== "buildSlug").sort();

	for (const slug of componentSlugs) {
		// Get the object of each product from the build
		const result = await client.fetch(`*[_type == "product" && slug.current match "${build[slug]}"]`);
		props[slugToComponentMapper[slug]] = result[0];
		props.build[slugToComponentMapper[slug]] = result[0];
	}

	props.allProducts = await client.fetch('*[_type == "product"]');
	props.buildName = build.name;

	return { props };
}

export default Generate;
