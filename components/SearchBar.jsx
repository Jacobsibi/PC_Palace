import React from 'react';
import styles from "../styles/SearchBar.module.css";
import { AiOutlineSearch } from 'react-icons/ai';
import { client } from "../lib/client";
import Link from "next/link";

const SearchBox = (props) => {
    const [ query, setQuery ] = React.useState("");

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            props.search(query);
        }
    }

    return (
        <input className={styles.searchBox} type="text" placeholder="Search" 
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => handleKeyDown(e)}/>
    );
}

const SearchResults = props => {
    const [ productsMatching, setProductsMatching ] = React.useState([]);

    const query = "*" + props.query + "*";

    React.useEffect(() => {
        async function getProductsMatching(query) {
            const sanityQuery = `*[_type == "product" && (name match "${query}" || details match "${query}" || brand match "${query}")]`;
            const getProducts = await client.fetch(sanityQuery);
            setProductsMatching(getProducts);
        }
        
        getProductsMatching(query); 
    }, [props.query]);

    return (
        <div className={styles.queryResults}>
            <ul>
                {
                    productsMatching.map((product, index) => (
                        <Link href={`product/${product.slug.current}`}>
                            <div className={styles.resultItem} key={index}>{product.name}</div>
                        </Link>
                    ))
                }
            </ul>
        </div>
    );
}

const SearchBar = () => {
    const [ showSearchResults, setShowSearchResults ] = React.useState(false);
    const [ query, setQuery ] = React.useState("");

    const onEnter = (query) => {
        if (query.trim() === "") {
            setShowSearchResults(false);
        } else {
            setShowSearchResults(true);
        }
        setQuery(query);
    }

    return (
        <>
            <div className={styles.searchBar}>
                <SearchBox search={query => onEnter(query)} />
                <button className={styles.searchButton} onClick={() => {}}>
                    <AiOutlineSearch />
                </button>
            </div>
            {showSearchResults && <SearchResults query={query} />}
        </>
    );
}

export default SearchBar;
