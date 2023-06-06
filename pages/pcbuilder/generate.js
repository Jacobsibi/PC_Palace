import React from "react";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/Generate.module.css";
import { DepartmentsContextProvider, useDepartmentsContext } from "../../context/DepartmentsContext";

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
    return (
        <div className={styles.chooseProduct}>

        </div>
    )
}

const ProductsDisplay = props => {
    const [ chooseProduct, setChooseProduct ] = React.useState(false);
    const [ filterType, setFilterType ] = React.useState("");

    const editComponent = part => {
        setChooseProduct(true);
        setFilterType(part);
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
        {chooseProduct && <ChooseProduct component={filterType} />}
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
            <DepartmentsContextProvider>
                <ProductsDisplay pc={Object.keys(props).map(key => [key, props[key]])} />
                <BuildDetails pc={{ props }} />
            </DepartmentsContextProvider>
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
