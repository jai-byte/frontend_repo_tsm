import React from "react";
import pagenotfoundImg from '../../assets/images/icons/pagenotfound.png';
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-page">
        <div className="container-fluid main-container">
          <div className="row library-row center-me padding-top-40-percent">
            <div className="errorimagediv center-me">
              <img src={pagenotfoundImg} alt="pagenotfound" className="errorimage" />
            </div>
            <div className="col-12 center-me">
              <h1 className="text-white text-center heading-error">
                Page Not Found
              </h1>
              <p className="mb-4 text-white">
                The page you are looking for does not exist or an other error
                occured.
              </p>
              <button className="btn btn-sm custom-button-secondary" onClick={()=> navigate(-1)}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
