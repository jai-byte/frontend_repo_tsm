import React from "react";
import LoginLayout from "./LoginLayout";

const LoginSuccessful = () => {
   return (
      <>
         <LoginLayout>
            <div className="login-box login-success position-relative" >
               {/* <div className="checkIcon"> */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 148 148">
                     <g id="Group_13772" data-name="Group 13772" transform="translate(-1502 -329)">
                        <circle
                           id="Ellipse_604"
                           data-name="Ellipse 604"
                           cx="74"
                           cy="74"
                           r="74"
                           transform="translate(1502 329)"
                           fill="#66cb8e"
                           opacity="0.1"
                        />
                        <circle
                           id="Ellipse_603"
                           data-name="Ellipse 603"
                           cx="64"
                           cy="64"
                           r="64"
                           transform="translate(1512 339)"
                           fill="#66cb8e"
                           opacity="0.18"
                        />
                        <circle
                           id="Ellipse_602"
                           data-name="Ellipse 602"
                           cx="53"
                           cy="53"
                           r="53"
                           transform="translate(1523 350)"
                           fill="#66cb8e"
                        />
                        <path
                           id="Path_430"
                           data-name="Path 430"
                           d="M0,5.917l11.49,17.64L45.591,0"
                           transform="translate(1551.727 394.933) rotate(-9)"
                           fill="none"
                           stroke="#fff"
                        />
                     </g>
                  </svg> */}
               {/* </div> */}
               <div className="text-center px-4 mt-5 mb-5">
                  <h2 className="text-center fw-bold letter-spacing text-black mb-3">Login Successful</h2>
                  {/* <small className="text-white">
                     Welcome to the Central Admin Panel! <br />
                     Congratulations on a successful login to the <br />
                     Central Admin.
                  </small> */}
               </div>
            </div>
         </LoginLayout>
      </>
   );
};

export default LoginSuccessful;
