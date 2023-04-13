import React from 'react';

function search() {

}

export default function SearchBar() {
    let [ query, setQuery ] = React.useState("");

    return (
        <div className="searchbar">
            <input className="searchbox-input" type="text" 
                onKeyDown={e => {
                    setQuery(e.target.value);

                    if (e.key === "Enter") {
                        search(query);
                    }
                }}
            />
            <button className="searchButton" onClick={() => search()} />
        </div>
    );
}
