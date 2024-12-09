import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminRoute from "./../../Route/RouteDetails";
import LoginLayout from "./LoginLayout";
import API from "../../Api/Api";
import { useDispatch } from "react-redux";
import { userdata } from "../../Redux/slice";
import loginIcon from "../../assets/images/login.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = { EmailId: "", Password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [errormsg, seterrormsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    const emailregex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!values?.EmailId) {
      errors.EmailId = "Please enter Email Id";
    } else if (!emailregex.test(values?.EmailId)) {
      errors.EmailId = "Invalid email address. Please enter valid Email Id";
    }
    if (!values?.Password) {
      errors.Password = "Please enter Password";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        API.CommanApiCall({
          data: {
            email: formValues?.EmailId,
            password: formValues?.Password,
            role: 2,
            is_admin: 1,
          },
          agent: "login",
          tokenRequired: false,
        }).then((response) => {
          // console.log(response?.data?.data?.data);
          console.log("kulo", response);
          if (response?.data?.data?.status === 200) {
            localStorage.setItem(
              "TajurbaAdminUser",
              JSON.stringify(response?.data?.data?.data)
            );
            localStorage.setItem(
              "TajurbaAdminToken",
              JSON.stringify(response?.data?.data?.data?.token)
            );
            localStorage.setItem(
              "TajurbaAdmin_priviledge_data",
              JSON.stringify(
                response?.data?.data?.data?.role_details?.priviledge_data
              )
            );

            // localStorage.setItem(
            //   "VidyameAdminRoles",
            //   JSON.stringify(response?.data?.rolePrevilege)
            // );
            dispatch(userdata(response?.data));
            navigate(`../${AdminRoute?.Auth?.LoginSuccessful}`);
            setTimeout(() => {
              navigate(`../${AdminRoute?.Dashboard?.DashboardPage}`);
            }, "1000");
            seterrormsg("");
          } else if (response?.data?.data?.status === 201) {
            // localStorage.setItem(
            //   "TempEmail",
            //   JSON.stringify(formValues?.EmailId)
            // );
            // localStorage.removeItem("TempEmail");
            localStorage.setItem(
              "otpinfo",
              JSON.stringify(response?.data?.data)
            );
            navigate(`../${AdminRoute?.Auth?.NewPassword}`);
          } else {
            // alert(response?.data?.message); // Use Toast here
            seterrormsg(response?.data?.data?.message);
            setTimeout(() => {
              seterrormsg("");
            }, 5000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleForgotPass = (e) => {
    e.preventDefault();
    // localStorage.setItem("TempEmail", JSON.stringify(formValues?.EmailId));
    navigate(`../${AdminRoute?.Auth?.ForgotPassword}`);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <LoginLayout>
        <div className="login-box" id="login" style={{padding: "40px"}}>
          <div className="text-center mb-4">
            {/* <img src={loginIcon} /> */}
            <h2 style={{fontWeight: "600", marginBottom: "80px", color:"#62a6dc" }}>Login</h2>
          </div>
          {/* <h2 className="mb-4 text-center fw-bold text-white letter-spacing">
            Log in
          </h2> */}
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="row">
              <div className="float-start col-12">
                <label className="form-label fw-normal text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.578"
                    height="14.564"
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
                  type="email"
                  name="EmailId"
                  className="form-control form-control-field"
                  placeholder="Enter register email"
                  onChange={(e) => handleChange(e)}
                // required
                />
                <p className="text-danger">{formErrors?.EmailId}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="float-start col-12 position-relative">
                <label className="form-label fw-normal d-flex align-items-center text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.483"
                    height="23.48"
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

                  Password
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control form-control-field"
                  placeholder="Enter Password"
                  id="userpassword"
                  name="Password"
                  onChange={(e) => handleChange(e)}
                // required
                />
                <span className="formIcons">
                  <i
                    // toggle="#password-field" s
                    className="fa fa-fw field-icon toggle-password fa-eye"
                    aria-hidden="true"
                    onClick={togglePassword}
                  ></i>
                </span>
                <p className="text-danger">{formErrors?.Password}</p>
                <p className="text-danger">{errormsg}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <button
                  type="button"
                  className="btn text-decoration-underline"
                  onClick={(e) => handleForgotPass(e)}
                >
                  <span>Forgot Password?</span>
                </button>
              </div>
            </div>
            <button
              // to="/login-successful"
              type="submit"
              className="btn text-white py-2 rounded-pill w-100 fw-bold mt-4"
              // onClick={(e) => handleLogin(e)}
              style={{
                backgroundColor: "#62a6dc",
                borderRadius: "20px",
                fontSize: "15px"
              }}
            >
              Login
            </button>
            {/* <div className="d-flex justify-content-between mt-3">
              <small className="text-decoration-underline">
                Terms & Conditions
              </small>
              <small className="text-decoration-underline">
                Privacy & policy
              </small>
            </div> */}
          </form>
          <div className="custum-height-10"></div>
        </div>
      </LoginLayout>

      {/* <Outlet /> */}
    </>
  );
};

export default Login;
