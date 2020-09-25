import React, { useState } from 'react';

function SearchBar() {
    const [synonym, setSynonym] = useState('');
    const [isError, setIsError] = useState(true);

    const handleChange = (handleEvent) => {
        switch (handleEvent.target.id) {
            case 'search-bar':
                setSynonym(handleEvent.target.value);
                break;
            default:


                break;
        }
        if (synonym.length <= 1) {
            setIsError(true);
        } else {
            setIsError(false)
        }
    }

    const Search = () => {
        console.log('Submit form!');

    }
    return (
        <form id="search" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <input
                    className="form-control d-inline col-lg-8 col-12 mx-auto d-block"
                    id="search-bar"
                    type="text"
                    placeholder="Search for synonyms"
                    value={synonym}
                    onChange={(e) => handleChange(e)}
                ></input>
                <button
                    type="submit"
                    className="btn btn-primary d-inline col-lg-8 col-12 mx-auto mt-2 d-block"
                    disabled={isError}
                    onClick={Search}
                >Search</button>
            </div>
        </form>
    )
}

export default SearchBar;