import React from 'react';
import styles from "../styles/SearchBar.module.css";
import { AiOutlineSearch } from 'react-icons/ai';
import { client } from "../lib/client";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchResults = props => {
    const [ productsMatching, setProductsMatching ] = React.useState([]);
    const resultsRef = React.createRef();

    const query = "*" + props.query + "*";

    React.useEffect(() => {
        async function getProductsMatching(query) {
            const sanityQuery = `*[_type == "product" && (name match "${query}" || details match "${query}" || brand match "${query}")]`;
            const getProducts = await client.fetch(sanityQuery);
            setProductsMatching(getProducts);
        }
        
        getProductsMatching(query); 
    }, [props.query]);

    React.useEffect(() => {
        function handleClickOutside(e) {
            if (resultsRef.current && !resultsRef.current.contains(e.target)) {
                props.resultsUnfocused();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    props.setResultAmount(productsMatching.length);
    props.setCurrentProduct(productsMatching[props.selectedIndex]);

    if (productsMatching) {
        return (
            <div className={styles.queryResults} ref={resultsRef}>
                <ul>
                    {
                        productsMatching.map((product, index) => (
                            <Link href={`${product.slug.current}`} 
                                onMouseEnter={() => props.setSelectedIndex(index)} key={index}>
                                <div className={`${props.selectedIndex == index ? styles.selected : ""} ${styles.resultItem}`}
                                    onClick={() => router.push(`/product/${product.slug.current}`)}>
                                    {product.name}
                                </div>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        );
    }
    
    return <></>;
};

const SearchBar = () => {
    const [ showSearchResults, setShowSearchResults ] = React.useState(false);
    const [ query, setQuery ] = React.useState("");
    const searchBarRef = React.createRef();
    const [ resultsFocused, setResultsFocused ] = React.useState(false);
    const [ searchbarFocused, setSearchbarFocused ] = React.useState(false);
    const [ selectedResultIndex, setSelectedResultIndex ] = React.useState(0);
    const [ resultAmount, setResultAmount ] = React.useState(0);
    const [ currentProduct, setCurrentProduct ] = React.useState({});
    const router = useRouter();

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setSearchbarFocused(false);
            } else {
                setSearchbarFocused(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });
    
    const redirectToProduct = () => {
        router.push(`/product/${currentProduct.slug.current}`);
        setShowSearchResults(false);
    };

    return (
        <>
            <div className={styles.searchBar} ref={searchBarRef}>
                <input className={styles.searchBox} type="text" placeholder="Search" 
                    onChange={e => {
                        let newQuery = e.target.value.trim();
                        if (newQuery !== "") {
                            setQuery(newQuery);
                            setShowSearchResults(true);
                        } else {
                            setShowSearchResults(false);
                        }
                    }}
                    onKeyDown={e => {
                        let key = e.key;

                        if (key === "Enter") {
                            redirectToProduct();
                        } else if (key === "ArrowDown") {
                            e.preventDefault();
                            if (selectedResultIndex < resultAmount - 1) {
                                console.log(resultAmount);
                                setSelectedResultIndex(selectedResultIndex + 1);
                            }
                        } else if (key === "ArrowUp") {
                            e.preventDefault();
                            if (selectedResultIndex > 0) {
                                setSelectedResultIndex(selectedResultIndex - 1);
                            }
                        }
                    }}/>
                <button className={styles.searchButton} onClick={() => searchButtonClicked()}>
                    <AiOutlineSearch />
                </button>
            </div>
            {(showSearchResults && (resultsFocused || searchbarFocused)) && 
                <SearchResults query={query} 
                    resultsUnfocused={() => setResultsFocused(false)} 
                    selectedIndex={selectedResultIndex}
                    setSelectedIndex={e => setSelectedResultIndex(e)}
                    setResultAmount={amount => setResultAmount(amount)}
                    setCurrentProduct={product => setCurrentProduct(product)}/>}
        </>
    );
}

export default SearchBar;
