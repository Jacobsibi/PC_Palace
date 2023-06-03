import React from "react";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/Generate.module.css";
import { useDepartmentsContext } from "../../context/DepartmentsContext";

const componentNameMapping = {
    "cpu": "CPU",
    "gpu": "GPU",
    "mbd": "Motherboard",
    "ram": "Memory",
    "sto": "Storage",
    "psu": "Power Supply",
    "case": "Case"
};

const ChooseProduct = props => {
    const [ matchingProducts, setMatchingProducts ] = React.useState([]);

    React.useEffect(() => {
        const fetchComponents = async componentType => {
            const query = `*[_type == "product" && component match "${componentType}"]`;
            const result = await fetch(`/api/sanity/query?query=${encodeURIComponent(query)}`).then(res => res.json()).catch(err => ([]));
            setMatchingProducts(result);
            console.log(matchingProducts);
        }

        fetchComponents(props.component);
    }, []);

    return (
        <div className={styles.chooseProduct}>
            {/* {
                matchingProducts && matchingProducts.map((product, index) =>  {
                    console.log(product);
                })
            } */}
        </div>
    )
}

const ProductsDisplay = props => {
    const [ chooseProduct, setChooseProduct ] = React.useState(false);
    const { departmentsFilter, setDepartmentsFilter } = useDepartmentsContext();

    const editComponent = part => {
        setChooseProduct(true);

        const filterMapper = {
            "cpu": "CPU",
            "gpu": "GPU",
            "mbd": "MBO",
            "ram": "RAM",
            "sto": "STO",
            "psu": "PSU",
            "case": "CASE"
        };
        
        setDepartmentsFilter(filterMapper[part]);
    }
    
    return (<>
        <div className={styles.computerParts}>
            {
                props.pc.map((current, index) => {
                    const [ currentComponentName, currentComponentValue ] = current;
                    
                    return (
                        <div className={styles.singleItem} key={index}>
                            <img src={urlFor(currentComponentValue.image[0])} width={200} height={200} alt={componentNameMapping[currentComponentName]} />
                            <button className={styles.editComponent} onClick={() => editComponent(currentComponentName)}>Customize</button>
                            <p>{currentComponentValue.name}</p>
                        </div>
                    );
                })
            }
        </div>
        {chooseProduct && <ChooseProduct component={departmentsFilter} />}
    </>);
}

const BuildDetails = props => {
    return (
        <div className={styles.buildinfo}>
            <ul>
                {Object.keys(props.pc.props).map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
        </div>
    );
}

const Generate = props => {
    if (Object.keys(props).length !== 7) {
        console.log(Object.keys(props).length);
        return;
    }

    return (
        <div className={styles.contentFixed}>
            <ProductsDisplay pc={Object.keys(props).map(key => [key, props[key]])} />
            <BuildDetails pc={{ props }} />
        </div>
    )
}

export const getServerSideProps = async context => {
    const query = context?.query;
    let props = { };

    const slugToComponentMapper = {
        cpuSlug: "cpu",
        gpuSlug: "gpu",
        mbSlug: "mbd",
        ramSlug: "ram",
        storageSlug: "sto",
        psSlug: "psu",
        caseSlug: "case"
    };

    const buildSlug = "custom-build-1";
    const builds = await client.fetch(`*[_type == "builds" && buildSlug.current match "${buildSlug}"]`);
    
    const build = builds[0]
    const componentSlugs = Object.keys(build).filter(key => key.toLowerCase().includes("slug") && key !== "buildSlug");

    for (const slug of componentSlugs) {
        const result = await client.fetch(`*[_type == "product" && slug.current match "${build[slug]}"]`);
        props[slugToComponentMapper[slug]] = result[0];
    }

    return { props };
}

export default Generate;
