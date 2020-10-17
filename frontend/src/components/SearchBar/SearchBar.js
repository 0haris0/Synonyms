import React, {useState, useEffect} from "react";
import LoadingPopup from "../LoadingPopup/LoadingPopup";
import SynonymBlock from "../SynonymBlock/SynonymBlock";

function SearchBar() {
    const [synonym, setSynonym] = useState("");
    const [synonymList, setSynonymList] = useState([]);
    const [isError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [displayData, setDisplayData] = useState(false);

    /* Handle change of inputs. Right now only from search */
    const handleChange = (handleEvent) => {
        switch (handleEvent.target.id) {
            case "search-bar":
                setSynonym(handleEvent.target.value);
                break;
            default:
                break;
        }
        /* Check is there more than 2 chars */
        if (synonym.length <= 1) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    /* Fetch data from backend for search query */
    const getData = async () => {
        return await fetch("http://localhost:3001/word/" + synonym)
            .then((res) => {
                return res.json()
            }).then(data => {
                setSynonymList(data);
                setIsLoading(false);
                setDisplayData(true)
                console.log(data);
            })
            .then((error) => {
                setIsError(true);
                console.log(error)
            });
    };

    /* Click on button fetch data */
    const Search = async () => {
        let validData = getData();
        return (validData && synonymList.length > 0 ? true : false);
    };

    return (
        <div>
            <form id="search" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <input
                        className="form-control d-inline col-lg-8 col-12 mx-auto d-block"
                        id="search-bar"
                        type="text"
                        placeholder="Search for synonyms"
                        value={synonym}
                        onChange={(e) => handleChange(e)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary d-inline col-lg-8 col-12 mx-auto mt-2 d-block"
                        disabled={isError}
                        onClick={Search}
                    >
                        Search
                    </button>
                </div>
            </form>
            <LoadingPopup isLoading={isLoading}/>
            {displayData && synonymList.length > 0 ? (
                <div className="row">
                    {synonymList.map((value, key) => {
                        return <SynonymBlock id={value.id} word={value.word} key={key}/>;
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default SearchBar;
