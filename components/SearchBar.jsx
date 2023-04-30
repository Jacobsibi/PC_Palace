import React from 'react';
import styles from "../styles/SearchBar.module.css";
import { AiOutlineSearch } from 'react-icons/ai'

function search(query) {

}

const SearchBox = () => {
    const [ query, setQuery ] = React.useState("");

    return (
        <input className={styles.searchBox} type="text" placeholder="Search"
            onKeyDown={e => {
                setQuery(e.target.value);

                if (e.key === "Enter") {
                    search(query);
                }
            }}
        />
    );
}

const SearchBar = (props) => {
    return (
        <div className={styles.searchBar}>
            <SearchBox />
            <button className={styles.searchButton} onClick={() => {}}>
			    <AiOutlineSearch />
            </button>
        </div>
    );
}

export default SearchBar;
