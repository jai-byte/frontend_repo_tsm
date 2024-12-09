import React from "react";

const Loader = () => {
  return (
    <>
      <div className="home-page">
        <div className="container-fluid main-container">
          <div className="row library-row center-me padding-top-40-percent">
            <div className="col-12 center-me">
              <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
