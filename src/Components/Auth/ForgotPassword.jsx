import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "./LoginLayout";
import API from "../../Api/Api";
import AdminRoute from "../../Route/RouteDetails";
import forgotIcon from "../../assets/images/fpass.svg";

const ForgotPassword = () => {
   const navigate = useNavigate();
   const [EmailId, setEmailId] = useState("");
   const [formErrors, setFormErrors] = useState({});
   const [apiError, setApiError] = useState("");
   const [isSubmit, setIsSubmit] = useState(false);

   const handleChange = (e) => {
      setEmailId(e.target.value);
   };

   const validate = (EmailId) => {
      const errors = {};

      const emailregex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

      if (!EmailId) {
         errors.EmailId = "Please enter Email Id";
      } else if (!emailregex.test(EmailId)) {
         errors.EmailId = "Invalid email address. Please enter valid Email Id";
      }

      return errors;
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         try {
            API?.CommanApiCall({
               data: {
                  email: EmailId,
                  //role: 2,
                  is_admin: 1,
               },
               agent: "forgot_password",
               tokenRequired: false,
            }).then((response) => {
               console.log(response.data?.data);
               if (response?.data?.data?.status === 200) {
                  //alert(response?.data?.data?.otp);
                  navigate(`../${AdminRoute?.Auth?.VerifyOtp}`);
                  localStorage.setItem("TempEmail", JSON.stringify(EmailId));
                  // localStorage.removeItem("TempEmail");
                  localStorage.setItem("otpinfo", JSON.stringify(response?.data?.data));
               } else {
                  console.log(response?.data?.data);
                  setApiError(response?.data?.data?.message);
                  setTimeout(() => {
                     setApiError("");
                  }, 3000);
               }
            });
         } catch (error) {
            console.log(error);
         }
      }
   }, [formErrors]);

   const handleSubmitOTP = (e) => {
      e.preventDefault();
      setFormErrors(validate(EmailId));
      setIsSubmit(true);
   };

   return (
      <>
         <LoginLayout>
            <div className="login-box" id="login">
               <span className="btn fw-normal btnBackArrow mb-5" onClick={() => navigate(-1)} style={{ backgroundColor: "#ddd" }}>
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
               <div className="text-center mb-5">
                  <img src={forgotIcon} className="mb-4" />
                  <h2 className="text-center text-black fw-bold letter-spacing">Forgot Password</h2>
                  <small className="text-black">
                     Enter the email address associated <br />
                     with your register account.
                  </small>
               </div>

               <div style={{ padding: "40px" }}>
                  <form>
                     <div className="row">
                        <div className="mb-3 float-start col-12">
                           <label className="form-label fw-normal text-black">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20.578"
                                 height="15.564"
                                 viewBox="0 0 23.578 16.564"
                                 className="me-2"
                              >
                                 <path
                                    id="Path_628"
                                    data-name="Path 628"
                                    d="M11.777,0h9.5a2.324,2.324,0,0,1,1.32.328,2.022,2.022,0,0,1,.963,1.627c.016.237.021.475.021.712q0,5.745,0,11.491a3.138,3.138,0,0,1-.111.955,2.053,2.053,0,0,1-1.821,1.428c-.229.014-.46.022-.69.022H2.3a2.309,2.309,0,0,1-1.453-.42,2.009,2.009,0,0,1-.828-1.512c-.018-.248-.023-.5-.023-.747Q0,8.094,0,2.3A2.345,2.345,0,0,1,.278,1.074,2.023,2.023,0,0,1,1.946.023C2.168.006,2.391,0,2.613,0q4.582,0,9.164,0M2.361,1.386c.027.033.037.049.05.063l2.623,2.6L9.192,8.169c.4.394.78.8,1.193,1.182a2.059,2.059,0,0,0,2.751.052c.143-.121.272-.259.405-.391L21.114,1.5c.032-.032.058-.07.1-.116ZM21.22,15.176c-.045-.049-.074-.083-.105-.113-.337-.33-.675-.659-1.01-.991Q17.712,11.7,15.323,9.334c-.062-.062-.1-.061-.159,0-.163.167-.33.331-.5.494a9.882,9.882,0,0,1-.727.686,3.371,3.371,0,0,1-2.675.715A3.494,3.494,0,0,1,9.289,10.2c-.291-.289-.583-.577-.872-.869-.061-.062-.1-.071-.165,0-.121.133-.253.256-.381.383L2.589,14.945c-.072.071-.151.135-.226.2l.023.03ZM1.389,2.335V14.2l.042.034L7.3,8.255,1.389,2.335m20.8,11.881V2.333L16.229,8.287l5.961,5.929"
                                    transform="translate(0 0)"
                                    fill="#62a6dc"
                                 />
                              </svg>


                              Email
                           </label>
                           <input
                              name="EmailId"
                              type="email"
                              className="form-control form-control-field"
                              placeholder="Enter register email"
                              value={EmailId}
                              // defaultValue={TempEmailID}
                              onChange={(e) => handleChange(e)}
                           />
                           <p className="text-danger mb-0">{formErrors?.EmailId}</p>
                        </div>
                        <p className="text-danger mb-0">{apiError}</p>
                     </div>

                     <button
                        className="btn bgBlack text-white py-3 rounded-pill w-100 fw-bold mt-4"
                        onClick={(e) => handleSubmitOTP(e)}
                        style={{
                           backgroundColor: "#62a6dc",
                           borderRadius: "20px",
                        }}
                     >
                        Send OTP
                     </button>
                  </form>
                  <div className="custum-height-10"></div>
               </div>
            </div>

         </LoginLayout>
      </>
   );
};

export default ForgotPassword;
