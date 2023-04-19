import React from 'react';
import styles from "../styles/SearchBar.module.css";
import { AiOutlineSearch } from 'react-icons/ai'

function search(query) {

}

const SearchBox = () => {
    const [ query, setQuery ] = React.useState("");

    return (
        <div className={styles.searchBoxHolder}>
            <input className={styles.searchBox} type="text" placeholder="Search"
                onKeyDown={e => {
                    setQuery(e.target.value);

                    if (e.key === "Enter") {
                        search(query);
                    }
                }}
            />
        </div>
    );
}

export default function SearchBar() {
    const [ haveSearchBar, setHaveSearchBar ] = React.useState(false);

    return (
        <>
            {haveSearchBar && <SearchBox />}
            <button className={styles.searchButton} onClick={() => setHaveSearchBar(true)}>
			    <AiOutlineSearch />
            </button>
        </>
    );
}
