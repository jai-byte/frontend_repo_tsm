import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "./LoginLayout";
import API from "../../Api/Api";
import { useDispatch } from "react-redux";
import { userdata } from "../../Redux/slice";
import AdminRoute from "./../../Route/RouteDetails";

import forgotIcon from "../../assets/images/fpass.svg";

const NewPassword = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const otpinfor = JSON.parse(localStorage.getItem("TempEmail"));
   const initialValues = { NewPass: "", ConfirmPass: "" };
   const [formValues, setFormValues] = useState(initialValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const [passwordShown, setPasswordShown] = useState(false);
   const [passwordShown2, setPasswordShown2] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
   };

   const validate = (values) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/i;
      const errors = {};

      // if (!values?.OTP) {
      //   errors.OTP = "OTP Required!";
      // }
      if (!values?.NewPass) {
         errors.NewPass = "Please enter New Password";
      } else if (!regex.test(values.NewPass)) {
         errors.NewPass = "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";
      }
      if (!values?.ConfirmPass) {
         errors.ConfirmPass = "Please enter Confirm Password";
      } else if (formValues.NewPass !== formValues.ConfirmPass) {
         errors.ConfirmPass = "Password does not match";
      }
      return errors;
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         try {
            API?.CommanApiCall({
               data: {
                  email: otpinfor,
                  password: formValues?.NewPass,
                  confirm_password: formValues?.ConfirmPass,
               },
               agent: "update_forgot_password",
               tokenRequired: false,
            }).then((response) => {
               console.log("Confirm Password Response", response?.data?.data);
               if (response?.data?.data?.result === "success") {
                  // localStorage.setItem(

                  //   JSON.stringify(response?.data)
                  // );
                  localStorage.removeItem("TempEmail");
                  dispatch(userdata(response?.data?.data));
                  navigate(`../${AdminRoute?.Auth?.PasswordReset}`);
                  setTimeout(() => {
                     navigate(`../${AdminRoute?.Auth?.Login}`);
                  }, "2000");
               } else {
                  console.log(response?.data?.data?.message); // Use Toast here
               }
            });
         } catch (error) {
            console.log(error);
         }
      }
   }, [formErrors]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
   };

   useEffect(() => {
      console.log("======>", otpinfor);
   }, []);

   return (
      <>
         <LoginLayout>
            <div className="login-box" id="login">
               <div className="text-center mb-5">
                  <h2 className="text-center fw-bold letter-spacing" style={{ color: "#62a6dc" }}>Create Password</h2>
                  {/* <small style={{color: "#62a6dc"}}>
                     Enter new password, it must be different <br />
                     from previous password.
                  </small> */}
                  <img src={forgotIcon} className="mb-4" />
               </div>

               <form>
                  <div className="row">
                     <div className="float-start col-12 position-relative">
                        <label className="form-label fw-normal d-flex align-items-center text-black">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17.483"
                              height="24.48"
                              viewBox="0 0 17.483 24.48"
                              className="me-2"
                           >
                              <g id="Group_15439" data-name="Group 15439" transform="translate(-1369 -566)">
                                 <path
                                    id="Path_611"
                                    data-name="Path 611"
                                    d="M2.622,8.737v-.15c0-.869-.007-1.739,0-2.608A5.864,5.864,0,0,1,5.167,1.053,5.729,5.729,0,0,1,8.306.013,6.526,6.526,0,0,1,11.082.4a5.725,5.725,0,0,1,3.574,4.032c.343.848.007,3.888.032,4.353a.876.876,0,0,1-1.029.905.909.909,0,0,1-.709-.915c0-.717.5-3.965-.386-4.967a3.963,3.963,0,0,0-3.14-2.027,5.076,5.076,0,0,0-2.176.154A4.1,4.1,0,0,0,4.4,5.276a2.254,2.254,0,0,0-.034.408c0,.983,0,1.966,0,2.949v.113h.179c3.4,0,6.8-.006,10.2,0a2.586,2.586,0,0,1,2.493,1.566,2.614,2.614,0,0,1,.236,1.14c0,2.671.011,5.343,0,8.015a4.849,4.849,0,0,1-1.127,3.175,4.941,4.941,0,0,1-3.515,1.806c-.195.016-.391.024-.586.024-2.408,0-4.816.013-7.223,0a4.86,4.86,0,0,1-3.765-1.687A4.862,4.862,0,0,1,.024,19.832C.01,19.637,0,19.441,0,19.246q0-3.918,0-7.837A2.644,2.644,0,0,1,2.383,8.768c.076-.008.152-.019.239-.031m6.124,1.756H2.657a.856.856,0,0,0-.909.9q0,4.075,0,8.15a3.1,3.1,0,0,0,.183,1.042,3.226,3.226,0,0,0,3.1,2.143c2.5-.008,5,0,7.5,0a3.475,3.475,0,0,0,.623-.057,3.213,3.213,0,0,0,2.585-3.11q0-3.378,0-6.757c0-.464,0-.928,0-1.392a.889.889,0,0,0-.923-.915H8.746"
                                    transform="translate(1369 566)"
                                    fill="#62a6dc"
                                 />
                                 <path
                                    id="Path_612"
                                    data-name="Path 612"
                                    d="M64.8,124.438c0-.45,0-.9,0-1.351a.2.2,0,0,0-.1-.2,1.725,1.725,0,0,1-.669-1.993,1.749,1.749,0,0,1,1.775-1.177,1.707,1.707,0,0,1,1.55,1.306,1.734,1.734,0,0,1-.7,1.856.222.222,0,0,0-.111.219q0,1.351,0,2.7a.871.871,0,0,1-1.689.321,1.237,1.237,0,0,1-.056-.348c-.006-.446,0-.892,0-1.337"
                                    transform="translate(1312.069 459.398)"
                                    fill="#62a6dc"
                                 />
                              </g>
                           </svg>
                           New Password
                        </label>
                        <input
                           name="NewPass"
                           type={passwordShown ? "text" : "password"}
                           className="form-control form-control-field"
                           placeholder="Enter New Password"
                           required
                           onChange={handleChange}
                        />
                        <p className="text-danger">{formErrors?.NewPass}</p>
                        <span className="formIcons">
                           <i
                              // toggle="#password-field" s
                              className="fa fa-fw field-icon toggle-password fa-eye"
                              aria-hidden="true"
                              // onClick={togglePassword}
                              onClick={() => setPasswordShown(!passwordShown)}
                           ></i>
                        </span>
                        {/* <small>Password must be 8 characters minumum</small> */}
                     </div>
                  </div>
                  <div className="row mt-4">
                     <div className="float-start col-12 position-relative pt-2">
                        <label className="form-label fw-normal d-flex align-items-center text-black">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17.483"
                              height="24.48"
                              viewBox="0 0 17.483 24.48"
                              className="me-2"
                           >
                              <g id="Group_15439" data-name="Group 15439" transform="translate(-1369 -566)">
                                 <path
                                    id="Path_611"
                                    data-name="Path 611"
                                    d="M2.622,8.737v-.15c0-.869-.007-1.739,0-2.608A5.864,5.864,0,0,1,5.167,1.053,5.729,5.729,0,0,1,8.306.013,6.526,6.526,0,0,1,11.082.4a5.725,5.725,0,0,1,3.574,4.032c.343.848.007,3.888.032,4.353a.876.876,0,0,1-1.029.905.909.909,0,0,1-.709-.915c0-.717.5-3.965-.386-4.967a3.963,3.963,0,0,0-3.14-2.027,5.076,5.076,0,0,0-2.176.154A4.1,4.1,0,0,0,4.4,5.276a2.254,2.254,0,0,0-.034.408c0,.983,0,1.966,0,2.949v.113h.179c3.4,0,6.8-.006,10.2,0a2.586,2.586,0,0,1,2.493,1.566,2.614,2.614,0,0,1,.236,1.14c0,2.671.011,5.343,0,8.015a4.849,4.849,0,0,1-1.127,3.175,4.941,4.941,0,0,1-3.515,1.806c-.195.016-.391.024-.586.024-2.408,0-4.816.013-7.223,0a4.86,4.86,0,0,1-3.765-1.687A4.862,4.862,0,0,1,.024,19.832C.01,19.637,0,19.441,0,19.246q0-3.918,0-7.837A2.644,2.644,0,0,1,2.383,8.768c.076-.008.152-.019.239-.031m6.124,1.756H2.657a.856.856,0,0,0-.909.9q0,4.075,0,8.15a3.1,3.1,0,0,0,.183,1.042,3.226,3.226,0,0,0,3.1,2.143c2.5-.008,5,0,7.5,0a3.475,3.475,0,0,0,.623-.057,3.213,3.213,0,0,0,2.585-3.11q0-3.378,0-6.757c0-.464,0-.928,0-1.392a.889.889,0,0,0-.923-.915H8.746"
                                    transform="translate(1369 566)"
                                    fill="#62a6dc"
                                 />
                                 <path
                                    id="Path_612"
                                    data-name="Path 612"
                                    d="M64.8,124.438c0-.45,0-.9,0-1.351a.2.2,0,0,0-.1-.2,1.725,1.725,0,0,1-.669-1.993,1.749,1.749,0,0,1,1.775-1.177,1.707,1.707,0,0,1,1.55,1.306,1.734,1.734,0,0,1-.7,1.856.222.222,0,0,0-.111.219q0,1.351,0,2.7a.871.871,0,0,1-1.689.321,1.237,1.237,0,0,1-.056-.348c-.006-.446,0-.892,0-1.337"
                                    transform="translate(1312.069 459.398)"
                                    fill="#62a6dc"
                                 />
                              </g>
                           </svg>
                           Confirm Password
                        </label>
                        <input
                           type={passwordShown2 ? "text" : "password"}
                           className="form-control form-control-field mb-2"
                           placeholder="Enter Confirm Password"
                           id="ConfirmPass"
                           name="ConfirmPass"
                           required
                           onChange={handleChange}
                        />
                        <p className="text-danger">{formErrors?.ConfirmPass}</p>
                        <span className="formIcons">
                           <i
                              // toggle="#password-field" s
                              className="fa fa-fw field-icon toggle-password fa-eye mt-2"
                              aria-hidden="true"
                              // onClick={togglePassword}
                              onClick={() => setPasswordShown2(!passwordShown2)}
                           ></i>
                        </span>
                        <small className="text-black">Password must be 8 characters minumum</small>
                     </div>
                  </div>

                  <button
                     className="btn py-3 text-white rounded-pill w-100 fw-bold mt-4"
                     onClick={(e) => handleSubmit(e)}
                     style={{
                        backgroundColor: "#62a6dc",
                        borderRadius: "20px",
                     }}
                  >
                     Create Password
                  </button>
               </form>
               <div className="custum-height-10"></div>
            </div>
         </LoginLayout>
      </>
   );
};

export default NewPassword;
