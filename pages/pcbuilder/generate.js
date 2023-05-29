import { client } from "../../lib/client";
import styles from "../../styles/Generate.module.css";
import { Product } from "../../components/";

const ProductsDisplay = props => {
    return (
        <div className={styles.computerParts}>
            {/* <button>CPU</button>
            <button>GPU</button>
            <button>Motherboard</button>
            <button>RAM</button>
            <button>Storage</button>
            <button>Power Supply</button>
            <button>Cooling</button>
            <button>Case</button> */}
            {
                props.pc.map((current, index) => {
                    <div className={styles.singleItem}>
                        <Image src={current.image} />
                        <button>Edit</button>
                    </div>
                })
            }
        </div>
    );
}

const Generate = ({ props }) => {
    return (
        <div className={styles.contentFixed}>
            <h2>pc yay :)</h2>
            <ProductsDisplay pc={[]} />
        </div>
    )
}

export const getServerSideProps = async context => {
    const query = context?.query;

    // fetch PC from sanity

    return {
        props: {
            generatedPC: {

            }
        } 
    };
}

export default Generate;
