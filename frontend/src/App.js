import React, {useState} from 'react';
import './App.scss';

import SearchBar from './components/SearchBar/SearchBar';
import AddSynonym from './components/AddSynonym/AddSynonym';

function App() {
    const [isAdding, setIsAdding] = useState(true);
    return (
        <div className="container">
            <div className="row d-flex align-content-center min-vh-100 ">
                <div className="col-lg-8 search-field">
                    <SearchBar></SearchBar>
                </div>
                <div className="col-lg-4 sidebar-popup">
                    <div className="large-title text-right">Want to add own synonym?</div>
                    <div className="small-title-desc">You can do it in few simple steps!</div>
                    <button
                        className="btn btn-secondary d-block float-right mt-3 "
                        onClick={() => setIsAdding(!isAdding)}
                    >
                        {isAdding ? 'Close adding Synonym' : 'Add Synonym'}
                    </button>
                </div>
                {isAdding ?
                    <div className="col-lg-4 col-lg-offset-8 col-12">
                        <AddSynonym></AddSynonym>
                    </div>
                    : null}
            </div>

        </div>
    );
}

export default App;
