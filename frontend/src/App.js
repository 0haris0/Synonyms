import React, { useState } from 'react';
import './App.scss';

import SearchBar from './components/SearchBar/SearchBar';
import AddSynonym from './components/AddSynonym/AddSynonym';

function App() {
  const [isAdding, setIsAdding] = useState(true);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-2">
          <SearchBar></SearchBar>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-secondary d-block float-right"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? 'Close adding Synonym' : 'Add Synonym'}
          </button>
        </div>
        {isAdding ?
          <div className="col-lg-8 col-12">
            <AddSynonym></AddSynonym>
          </div>
          : null}
      </div>
    </div>
  );
}

export default App;
