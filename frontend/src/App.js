import React from 'react';
import './App.scss';

import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div className="container">
      <div className="col-12 mt-2">
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

export default App;
