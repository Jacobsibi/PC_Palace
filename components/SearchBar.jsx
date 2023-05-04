import React from 'react';
import styles from "../styles/SearchBar.module.css";
import { AiOutlineSearch } from 'react-icons/ai';
import { client } from "../lib/client";
import Link from "next/link";

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

    const onKeyDown = event => {
        if (event.key === "Enter") {
            props.enterPressed(productsMatching[props.selectedIndex]);
        } else if (event.key === "ArrowDown") {
            props.selectedIndex < productsMatching.length ? props.incrementIndex() : console.log("Nothing below!");
        } else if (event.key === "ArrowUp") {
            props.selectedIndex > 0 ? props.decrementIndex() : console.log("Nothing above!");
        }
    };

    if (productsMatching) {
        return (
            <div className={styles.queryResults} ref={resultsRef} onKeyDown={e => onKeyDown(e)}>
                <ul>
                    {
                        productsMatching.map((product, index) => (
                            <Link href={`product/${product.slug.current}`} onMouseEnter={() => props.setSelectedIndex(index)}>
                                <div className={`${props.selectedIndex == index ? styles.selected : ""} ${styles.resultItem}`} key={index}>
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
    })

    const searchButtonClicked = () => {

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
                    }}/>
                <button className={styles.searchButton} onClick={() => searchButtonClicked()}>
                    <AiOutlineSearch />
                </button>
            </div>
            {(showSearchResults && (resultsFocused || searchbarFocused)) && 
                <SearchResults query={query} resultsUnfocused={() => setResultsFocused(false)} selectedIndex={selectedResultIndex}
                    setSelectedIndex={e => setSelectedResultIndex(e)} incrementIndex={() => setSelectedResultIndex(selectedResultIndex + 1)}
                    decrementIndex={() => setSelectedResultIndex(selectedResultIndex - 1)} />}
        </>
    );
}

export default SearchBar;
