import React from "react";
import HexImage from "../../assets/images/hexadiv/hexaorange.png";
import { NavLink } from "react-router-dom";
const EnterProfileDetails = () => {
   return (
      <>
         <div className="login-page">
            <div className="container-fluid main-container vh-100">
               <div className="row h-100">
                  <div className="col-lg-7 d-none d-lg-flex">
                     <NavLink to="/get-started" className="text-decoration-none">
                        <h1 className="text-color-secondary ps-5 pt-5">Curie</h1>
                     </NavLink>
                  </div>
                  <div className="col-lg-5 col-12 background-color-primary center-me">
                     <NavLink to="/get-started" className="text-decoration-none d-flex d-lg-none">
                        <h1 className="text-color-secondary pb-3">Tajurba</h1>
                     </NavLink>
                     <div className="login-box">
                        <form>
                           <h4 className="text-color-secondary mb-4">Edit Profile</h4>
                           <div className="upload-profile-div mb-3">
                              <div className="hexagon-image-div mb-2" style={{ backgroundImage: 'url("")' }}>
                                 <div
                                    className="hexagon-status-div"
                                    style={{
                                       backgroundImage: `url(${HexImage})`,
                                    }}
                                 ></div>
                              </div>
                              <input id="upload-pic" type="file" className="d-none" />
                              <label htmlFor="upload-pic" className="orange-small-link text-start cursor-pointer">
                                 Upload Picture
                              </label>
                           </div>
                           <label htmlFor="" className="custom-input-label-secondary">
                              <span className="star-mandatory">*</span>Name
                           </label>
                           <input
                              type="text"
                              name="phone"
                              placeholder="Enter your name"
                              className="form-control custom-input-text-primary mb-4"
                           />
                           <label htmlFor="" className="custom-input-label-secondary">
                              <span className="star-mandatory">*</span>User Name
                           </label>
                           <input
                              type="text"
                              name="phone"
                              placeholder="Enter User Name"
                              className="form-control custom-input-text-primary mb-4"
                           />
                           <NavLink to="/verify-otp" className="btn custom-button-primary w-100 fw-bold">
                              SAVE
                           </NavLink>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default EnterProfileDetails;
