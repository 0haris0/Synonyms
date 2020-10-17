import React from "react";

function LoadingPopup(props) {
  return (
    <div className={props.isLoading ? 'd-flex' : 'd-none'}>
      <div className="loading-popup-inner">
          <h1>Loading</h1>
          <p>Looking for Synonym...</p>
      </div>
    </div>
  );
}

export default LoadingPopup;
