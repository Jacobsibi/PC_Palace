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
    if (Object.keys(props).length !== 8) {
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
        gpu: "stage-1-gpu",
        cpu: "stage-1-cpu",
        mbd: "stage-1-mb",
        ram: "stage-1-ram",
        sto: "stage-1-storage",
        psu: "stage-1-ps",
        os: "stage-1-os",
        "case": "stage-1-case"
    };

    let props = { };
    
    for (const component of Object.keys(exampleSlugs)) {
        props[component] = await client.fetch(`*[_type == "buildLow" && slug.current match "${exampleSlugs[component]}"]`);
    }

    return { props };
}

export default Generate;
