/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "./LoginLayout";
import API from "./../../Api/Api";
import AdminRoute from "./../../Route/RouteDetails";
// import { useParams } from "react-router-dom";

const VerifyOTP = () => {
   const navigate = useNavigate();
   const TempEmailID = JSON.parse(localStorage.getItem("TempEmail"));
   // const oid = useParams();
   const otpinfor = JSON.parse(localStorage.getItem("otpinfo"));
   const [otp, setOtp] = useState(["", "", "", ""]);
   const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
   const [newOtpData, setnewOtpData] = useState([]);
   const [errormsg, seterrormsg] = useState("");

   function handleChange(event, index) {
      const { value } = event.target;
      console.log("value", value);
      setOtp((prevOtp) => {
         const newOtp = [...prevOtp];
         newOtp[index] = value.slice(0, 1);
         return newOtp;
      });

      if (value.length === 1 && index < 3) {
         inputRefs[index + 1].current.focus();
      } else if (value.length === 0 && index > 0) {
         inputRefs[index - 1].current.focus();
      }
   }
   const newotp = otp.join("");

   useEffect(() => {
      console.log("otpinfor", otpinfor?.data);
   }, []);

   const handleVerifyOtp = (e) => {
      e.preventDefault();
      //console.log("newotp", parseInt(newotp));
      seterrormsg(" ");
      if (!newotp) {
         seterrormsg("Please Enter otp");
      } else {
         try {
            API.CommanApiCall({
               data: {
                  email: otpinfor?.data?.email,

                  is_admin: 1,
                  first_name: otpinfor?.data?.first_name,
                  last_name: otpinfor?.data?.last_name,
                  otp_action: "Admin forgot otp",
                  loggedin_via: "email",
                  usertype_in: "1",
                  otp: parseInt(newotp),
               },
               agent: "verifyOtp",
               tokenRequired: false,
            }).then((response) => {
               console.log(response.data?.data);
               if (response?.data?.data?.status === 200) {
                  navigate(`../${AdminRoute?.Auth?.NewPassword}`);
                  localStorage.removeItem("otpinfo");
               } else if (response.data?.data?.resp?.status === 0) {
                  seterrormsg(response.data?.data?.resp?.message);
                  setTimeout(() => {
                     seterrormsg("");
                  }, 5000);
               }
            });
         } catch (error) {
            console.log(error);
         }
      }
   };

   useEffect(() => {
      console.log("otp", otp);
   }, [otp]);

   // ===== Resend Otp ===========

   const [counter, setCounter] = useState(60);

   // useEffect(() => {
   //   const timeout = setTimeout(() => {
   //     // Code to execute after 30 seconds
   //   }, 30000);

   //   const interval = setInterval(() => {
   //     if (counter) {
   //       setCounter(prevCounter => prevCounter - 1)
   //     }
   //   }, 1000);

   //   return () => {
   //     clearTimeout(timeout);
   //     clearInterval(interval);
   //   };
   // }, [counter]);

   useEffect(() => {
      if (counter) {
         setTimeout(() => setCounter(counter - 1), 1000);
      }
      // Time == 0 ? setotperror(true) : null;
   }, [counter]);

   const handleResendOtp = (e) => {
      e.preventDefault();
      setCounter(60);
      setOtp(["", "", "", ""]);
      seterrormsg("");
      try {
         API.CommanApiCall({
            data: {
               email: otpinfor?.data?.email,

               is_admin: 1,
               // first_name: otpinfor?.data?.first_name,
               // last_name: otpinfor?.data?.last_name,
               // otp_action: "Admin forgot otp",
               // loggedin_via: "email",
               // usertype_in: "1",
               // otp: parseInt(newotp),
            },
            agent: "forgot_password",
            tokenRequired: false,
         }).then((response) => {
            console.log(response?.data?.data);
            if (response?.data?.data?.status === 200) {
               //alert(response?.data?.data?.otp);
               setnewOtpData(response?.data?.data?.data);
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      console.log("otp", otp[0]);
      if (otp[0] === "") {
         console.log("error");
      }
   }, [otp]);

   return (
      <>
         <LoginLayout>
            <div className="login-box " id="login">
               <span className="btn fw-normal btnBackArrow mb-5" onClick={() => navigate(-1)}>
                  <svg width="20" height="15" viewBox="0 0 24.343 20">
                     <path
                        id="Path_10378"
                        data-name="Path 10378"
                        d="M72.9,4.9c-.162.155-.251.237-.337.323q-2.847,2.846-5.691,5.694a1.462,1.462,0,0,1-1.419.482,1.424,1.424,0,0,1-.8-2.295,3.618,3.618,0,0,1,.254-.267L73.155.586A1.458,1.458,0,0,1,75.486.578Q79.649,4.741,83.813,8.9a1.449,1.449,0,0,1,.471,1.424,1.416,1.416,0,0,1-2.374.714c-.625-.591-1.222-1.213-1.831-1.822q-2-2-4-4.013a1.315,1.315,0,0,1-.175-.323l-.15.107v.386q0,8.689,0,17.379a1.428,1.428,0,1,1-2.842.281c-.011-.156-.008-.313-.008-.469q0-8.589,0-17.177Z"
                        transform="translate(0 84.324) rotate(-90)"
                        fill="#fff"
                     />
                  </svg>
               </span>
               <div className="px-4">
                  <div className="text-center mb-5">
                     {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="49.017"
                        height="34.616"
                        viewBox="0 0 49.017 34.616"
                        className="mb-4"
                     >
                        <path
                           id="Path_10261"
                           data-name="Path 10261"
                           d="M24.184,0q9.752,0,19.5,0A4.773,4.773,0,0,1,46.4.675a4.152,4.152,0,0,1,1.977,3.341c.033.486.043.975.043,1.463q0,11.8,0,23.6a6.445,6.445,0,0,1-.229,1.961,4.217,4.217,0,0,1-3.741,2.932c-.471.028-.944.044-1.416.044q-19.149,0-38.3,0a4.741,4.741,0,0,1-2.983-.862,4.126,4.126,0,0,1-1.7-3.106C.012,29.539,0,29.026,0,28.515Q0,16.622,0,4.729A4.815,4.815,0,0,1,.57,2.2,4.154,4.154,0,0,1,4,.047C4.451.012,4.909,0,5.366,0q9.41,0,18.819,0M4.848,2.846c.054.068.076.1.1.128l5.387,5.336q4.27,4.232,8.54,8.466c.816.81,1.6,1.652,2.45,2.427a4.228,4.228,0,0,0,5.65.107c.294-.248.559-.531.833-.8Q35.585,10.8,43.359,3.085c.066-.066.12-.144.2-.238Zm38.728,28.32c-.093-.1-.152-.17-.216-.233-.691-.679-1.387-1.353-2.075-2.035q-4.912-4.862-9.818-9.73c-.127-.126-.2-.125-.326,0-.335.344-.678.68-1.024,1.014a20.293,20.293,0,0,1-1.494,1.409,6.922,6.922,0,0,1-5.493,1.468,7.176,7.176,0,0,1-4.055-2.108c-.6-.593-1.2-1.186-1.791-1.785-.125-.127-.206-.146-.338,0-.249.273-.52.526-.783.786Q10.741,25.322,5.317,30.69c-.147.146-.309.277-.464.415l.047.061ZM2.853,4.8V29.154l.085.069L14.983,16.954,2.853,4.8m42.716,24.4V4.791L33.328,17.018,45.569,29.194"
                           transform="translate(0.299 0.3)"
                           fill="#36dae9"
                           stroke="#d6732d"
                           stroke-width="0.6"
                        />
                     </svg> */}
                     <h2 className="text-center text-black fw-bold letter-spacing">Email Verification</h2>
                     <span className="text-black">
                        Enter 4 digit OTP send on
                        <br />
                        {otpinfor?.data?.email}
                        <p className="text-danger ">{errormsg}</p>
                     </span>
                  </div>

                  <div className="row mb-4" style={{ justifyContent: "space-evenly", display: "flex" }}>
                     {otp.map((value, index) => (
                        <input
                           key={index}
                           //autocomplete="off"
                           onkeypress="return onlyNumberKey(event)"
                           type="number"
                           // pattern="\d*"
                           pattern="[0-9.]+"
                           id={`otp-${index}`}
                           name={`otp-${index}`}
                           value={value}
                           onChange={(event) => handleChange(event, index)}
                           maxLength="1"
                           ref={inputRefs[index]}
                           className="otp-input form-control custom-input-text-primary otp-input mb-0"
                        />
                     ))}
                  </div>

                  <button
                     // to="/new-password"
                     className="btn bgBlack text-white py-3 rounded-pill w-100 fw-bold mt-4"
                     onClick={(e) => handleVerifyOtp(e)}
                     style={{
                        backgroundColor: "#62a6dc",
                        borderRadius: "20px",
                     }}
                  >
                     Verify and Proceed
                  </button>

                  {counter === 0 ? (
                     <div className="row">
                        <div className="col-12 text-center">
                           <p className="d-flex align-items-end mt-2 text-center justify-content-center">
                              Didn&rsquo;t receive OTP?
                              <button className="ms-1 btn p-0 text-decoration-underline" onClick={(e) => handleResendOtp(e)}>
                                 {" "}
                                 Resend OTP
                              </button>
                           </p>
                        </div>
                     </div>
                  ) : (
                     <div className="row text-center">
                        <p className=" mt-2 text-black">
                           Resend OTP in <b>{counter == 60 ? `00:60` : counter >= 10 ? `00:${counter}` : `00:0${counter}`}</b> Sec
                        </p>
                     </div>
                  )}

                  <div className="custum-height-50"></div>
                  {/* {counter === 0 ?
                  <p
                    className="orange-small-link text-center cursor-pointer text-decoration-underline"
                    // data-bs-target="#otpResentModal"
                    // data-bs-toggle="modal"
                    onClick={(e) => handleResendOtp(e)}
                  >
                    Resend OTP
                  </p>
                  :
                  <h3 className="text-center text-color-secondary">
                    {counter == 30 ? `00:30` : counter >= 10 ? `00:${counter}` : `00:0${counter}`}
                  </h3>
                } */}
               </div>
            </div>
         </LoginLayout>
      </>
   );
};

export default VerifyOTP;
