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

        fetchComponents(props.departmentsFilter);
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
                    const [ currentPart, partValue ] = current;
                    // console.log(partValue[0].image[0]);
                    
                    return (
                        <div className={styles.singleItem} key={index}>
                            <img src={urlFor(partValue[0].image[0])} width={200} height={200} alt={componentNameMapping[currentPart]} />
                            <button className={styles.editComponent} onClick={() => editComponent(currentPart)}>Customize</button>
                            <p>{partValue[0].name}</p>
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

    const exampleSlugs = {
        cpu: "intel-core-i3-12100f",
        gpu: "nvidia-geforce-gt-710",
        mbd: "gigabyte-b760",
        ram: "crucial-16gb-ram",
        sto: "samsung-870-evo-1tb",
        psu: "corsair-rm-series-rm1000x",
        "case": "masterbox-mb600l-v2-black"
    };

    let props = { };
    
    for (const component of Object.keys(exampleSlugs)) {
        props[component] = await client.fetch(`*[_type == "product" && slug.current match "${exampleSlugs[component]}"]`);
    }

    return { props };
}

export default Generate;
