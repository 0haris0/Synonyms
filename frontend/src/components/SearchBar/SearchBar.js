import React, { useState } from 'react';

function SearchBar() {
    const [synonym, setSynonym] = useState('');
    const Search = () => {
        alert(synonym)
    }
    return (
        <form id="search">
            <div className="form-group">
                <input
                    className="form-control d-inline col-lg-8 col-12 mx-auto d-block"
                    id="search-bar"
                    type="text"
                    placeholder="Search for synonyms"
                    value={synonym}
                    onChange={(e) => setSynonym(e.target.value)}
                ></input>
                <button
                    type="submit"
                    className="btn btn-primary d-inline col-lg-8 col-12 mx-auto mt-1 d-block"
                    onClick={Search}
                >Search</button>
            </div>
        </form>
    )
}

export default SearchBar;