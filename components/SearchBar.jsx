import React, { useEffect } from 'react';
import styles from "../styles/SearchBar.module.css";
import { AiOutlineSearch } from 'react-icons/ai';
import { client } from "../lib/client";
import { useRouter } from "next/router";

const SearchResults = React.forwardRef((props, ref) => {
    const [ productsMatching, setProductsMatching ] = React.useState([]);
    const resultsRef = React.createRef();
    const router = useRouter();

    const query = "*" + props.query + "*";

    React.useEffect(() => {
        async function getProductsMatching(query) {
            const sanityQuery = `*[_type == "product" && (name match "${query}" || details match "${query}" || brand match "${query}")]`;
            const products = await fetch(`/api/sanity/query?query=${encodeURIComponent(sanityQuery)}`).then(res => res.json());
            setProductsMatching(products);
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

        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    props.setResultAmount(productsMatching.length);
    props.setCurrentProduct(productsMatching[props.selectedIndex]);

    const itemClicked = product => {
        router.push(`/product/${product.slug.current}`);
    }

    const itemHovered = index => {
        props.setSelectedIndex(-1);
    }

    return (
        <div className={styles.queryResults} ref={resultsRef} tabIndex={1}>
            {productsMatching && 
                productsMatching.map((product, index) => {
                    
                    return (
                        <p key={index} className={`${styles.resultItem} ${props.selectedIndex == index ? styles.selected : ""}` } 
                            onMouseDown={() => itemClicked(product)}
                            onMouseEnter={() => itemHovered(index)}
                            ref={props.selectedIndex == index ? ref : null}>
                            {product.name}
                        </p>
                    );
                })
            }
        </div>
    );
});

const SearchBar = () => {
    const [ showSearchResults, setShowSearchResults ] = React.useState(false);
    const [ query, setQuery ] = React.useState("");
    const searchBarRef = React.createRef();
    const [ resultsFocused, setResultsFocused ] = React.useState(false);
    const [ searchbarFocused, setSearchbarFocused ] = React.useState(false);
    const [ selectedResultIndex, setSelectedResultIndex ] = React.useState(0);
    const [ resultAmount, setResultAmount ] = React.useState(0);
    const [ currentProduct, setCurrentProduct ] = React.useState({});
    const resultRef = React.createRef();
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

    const handleKeyPress = event => {
        const { key } = event;

        if (key === "Enter") {
            redirectToProduct();
        } else if (key === "ArrowDown") {
            event.preventDefault();
            if (selectedResultIndex < resultAmount - 1) {
                setSelectedResultIndex(selectedResultIndex + 1);
            }
        } else if (key === "ArrowUp") {
            event.preventDefault();
            if (selectedResultIndex > 0) {
                setSelectedResultIndex(selectedResultIndex - 1);
            }
        }
    }

    const handleQueryChange = event => {
        const newQuery = event.target.value.trim();
        if (newQuery !== "") {
            setQuery(newQuery);
            setShowSearchResults(true);
        } else {
            setShowSearchResults(false);
        }
    }

    React.useEffect(() => {
        if (!selectedResultIndex || selectedResultIndex < 0)
            return;
        
        resultRef.current.scrollIntoView({ block: "center" });
    }, [selectedResultIndex]);

    return (
        <>
            <div className={styles.searchBar} ref={searchBarRef}>
                <input className={styles.searchBox} type="text" placeholder="Search" 
                    onChange={e =>  handleQueryChange(e)}
                    onKeyDown={e => handleKeyPress(e)}/>

                <button className={styles.searchButton} onClick={() => searchButtonClicked()}>
                    <AiOutlineSearch />
                </button>
            </div>
            {(showSearchResults && (resultsFocused || searchbarFocused)) && 
                <SearchResults query={query} ref={resultRef}
                    resultsUnfocused={() => setResultsFocused(false)} 
                    selectedIndex={selectedResultIndex}
                    setSelectedIndex={e => setSelectedResultIndex(e)}
                    setResultAmount={amount => setResultAmount(amount)}
                    setCurrentProduct={product => setCurrentProduct(product)}/>}
        </>
    );
}

export default SearchBar;
