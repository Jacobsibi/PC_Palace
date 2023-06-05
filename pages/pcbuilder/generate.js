import React from "react";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/Generate.module.css";
import { useDepartmentsContext } from "../../context/DepartmentsContext";
import { AiOutlineClose } from "react-icons/ai";
import getStripe from '../../lib/getStripe';
import toast from 'react-hot-toast';

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
                    {props.customizeAll &&
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
                                    <img src={urlFor(product.image[0])} width={150} height={150} alt={product.name} />
                                    <p>{product.name}</p>
                                    <button onClick={() => handleItemUpdated(product)}>Select</button>
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

const BuildDetails = props => {
    return (
        <div className={styles.buildinfo}>
            <ul>
                {props.pc && Object.values(props.pc).map((product, index) => {
                    const componentTypeMatching = Object.keys(props.pc).find(key => props.pc[key] === product);
                    
                    return (
                        <li key={index}>
                            <b>{componentNameMapping[componentTypeMatching]}</b>: {product.name}<br></br>
                            <b>${product.price}</b>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

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
            <button style={{marginLeft: "auto"}} onClick={() => handleCustomizeBuildClick()}>Customize build</button>
            <button onClick={() => props.buildComplete()}>Complete build</button>
            <p>Total: {price}</p>
        </div>
        {customizeBuild && <ChooseProduct cancelChoose={() => setCustomizeBuild(false)} updateItem={(component, product) => updateBuild(component, product)}
            customizeAll={true} />}
    </>);
}

const Generate = props => {
    const [ build, setBuild ] = React.useState({});

    React.useMemo(() => {
        setBuild(props.build);
        allProducts = props.allProducts;
    }, []);

    const handleBuildChange = (componentType, item) => {
        const newBuild = JSON.parse(JSON.stringify(build));
        const componentTypeMatching = Object.keys(componentSanityMapping).find(key => componentSanityMapping[key] === componentType);
        newBuild[componentTypeMatching] = item;
        setBuild(newBuild);
    }

    const handleBuildComplete = async () => {
        const stripe = await getStripe();

        const cart = Object.values(build).map(product => ({
            ...product,
            quantity: 1
        }));

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

    return (
        <>
            <h1 className={styles.buildTitle}>{props.buildName}</h1>
            <div className={styles.contentFixed}>
                <ProductsDisplay pc={Object.keys(build).map(key => [key, build[key]])} changeBuild={(componentType, item) => handleBuildChange(componentType, item)} />
                <BuildDetails pc={build} />
            </div>
            <FunctionalityButtons build={build} changeBuild={(componentType, item) => handleBuildChange(componentType, item)} buildComplete={() => handleBuildComplete()} />
        </>
    )
}

export const getServerSideProps = async context => {
    const query = context?.query;
    let props = { build: { }, allProducts: { }, buildName: "" };

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

    const buildSlug = "low-end-gaming";
    const builds = await client.fetch(`*[_type == "builds" && buildSlug.current match "${buildSlug}"]`);
    
    const build = builds[0];
    const componentSlugs = Object.keys(build).filter(key => key.toLowerCase().includes("slug") && key !== "buildSlug").sort();

    for (const slug of componentSlugs) {
        const result = await client.fetch(`*[_type == "product" && slug.current match "${build[slug]}"]`);
        props[slugToComponentMapper[slug]] = result[0];
        props.build[slugToComponentMapper[slug]] = result[0];
    }

    props.allProducts = await client.fetch('*[_type == "product"]');
    props.buildName = build.name;

    return { props };
}

export default Generate;
