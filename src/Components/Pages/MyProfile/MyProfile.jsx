/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import myProfileImg from "../../../assets/images/dummy-profile1.jpg";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
// import moment from "moment";
// import AdminRoute from '../../../Route/RouteDetails';

const MyProfile = () => {
  const { id } = useParams();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const [userProfileDetails, setUserProfileDetails] = useState("");
  // console.log(adminObject?._id);

  // Api call for get Profile user  details
  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    roles: "",
    image: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [profileStatus, setProfileStatus] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [roleListing, setRoleisting] = useState([]);
  const errorMessageData = useSelector((state) => state.counter.errorData);
  const [rolePreviledgeData, setRolePreviledgeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const userData = JSON.parse(localStorage.getItem("TajurbaAdminUser") || "{}");
  const registerDate = userData.createdAt;

  var currentIndex = 0;

  // Get User Details
  useEffect(() => {
    GetDetails();
  }, [id, rolePreviledgeData]);

  const GetDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "createAdminUser",
        function: "getUserDetails",
        data: {
          user_id: parseInt(id),
        },
      }).then((response) => {
        console.log("details of user", response);
        if (response?.data?.data?.status === 200) {
          // console.log(
          //   "response for Get User details api",
          //   response?.data?.data?.data[0]
          // );

          //  setrolePreviledgeData(response?.data?.data?.data?.priviledge_data);
          setUserProfileDetails(response?.data?.data?.data[0]);
          setFormValues({
            ...formValues,
            firstName: response?.data?.data?.data[0]?.first_name,
            email: response?.data?.data?.data[0]?.email,
            mobile: response?.data?.data?.data[0]?.mobile_no,
            roles: response?.data?.data?.data[0]?.result?.role_id,
          });
          setProfileStatus(response?.data?.data?.data[0]?.is_active);
          setProfileImg(response?.data?.data?.data[0]?.image);
          setRolePreviledgeData(
            response?.data?.data?.data[0]?.result?.priviledge_data
          );
          setRoleName(response?.data?.data?.data[0]?.result?.name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("rolePreviledgeData in My Profile", rolePreviledgeData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validate all the  Fields
  const validate = (values) => {
    const errors = {};

    const emailregex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileregex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const specialCharacter = /^[A-Za-z0-9 ]+$/;

    if (!values?.email) {
      errors.email = "Please enter Email Id";
    } else if (values.email.trim() === "") {
      errors.email = "Email cannot be blank";
    } else if (!emailregex.test(values?.email)) {
      errors.email = "Invalid email address. Please enter valid Email Id";
    }
    if (!values?.firstName) {
      errors.firstName = "Please enter  Name";
    } else if (values.firstName.trim() === "") {
      errors.firstName = "Name cannot be blank";
    } else if (!specialCharacter.test(values?.firstName)) {
      errors.firstName = "Please enter valid Name";
    }
    // else if (
    //   values?.firstName?.length < 3 ||
    //   values?.firstName?.length > 10
    // ) {
    //   errors.firstName = "Name length should be 3 to 10 characters";
    // }

    if (!values?.mobile) {
      errors.mobile = "Please enter Mobile no";
    } else if (!mobileregex.test(values?.mobile)) {
      errors.mobile = "Invalid Mobile No. Please enter valid Mobile No";
    }

    if (!values?.roles) {
      errors.roles = "Please select Role";
    }
    if (!profileImg) {
      errors.profileImg = "Profile Image is required";
    }

    return errors;
  };

  // Function for role listing
  useEffect(() => {
    try {
      var payload = {
        agent: "role",
        function: "list",
        flag: "Active",
        page_no: 1,
        limit: 200,
        filter: {},
      };

      API?.CommanApiCall(payload).then((response) => {
        // console.log(
        //   "Response from Roles listing api ",
        //   response?.data?.data?.data
        // );
        if (response?.data?.data?.status === 200) {
          setRoleisting(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api call for creating new user
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log("formValues", formValues);
      setLoading(true);
      try {
        API?.CommanApiCall({
          data: {
            first_name: formValues?.firstName,
            mobile_no: formValues?.mobile,
            image: profileImg,
            email: formValues?.email,
            // is_active: profileStatus,
            is_admin: 1,
            loggedin_via: "email",
            usertype_in: 1,
            social_media_flag: false,
            // role_id: parseInt(formValues?.roles),
            is_subscribed: false,
            user_id: parseInt(id),
          },
          agent: "createAdminUser",
        }).then((response) => {
          console.log(response?.data?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            localStorage.setItem(
              "TajurbaAdminUser",
              JSON.stringify(response?.data?.data?.data)
            );
            setTimeout(() => {
              setLoading(false);
              navigate("/dashboard");
            }, 1500);
          } else if (response?.data?.data?.status === 201) {
            SetErrorMessage(response?.data?.data?.message);

            setTimeout(() => {
              SetErrorMessage("");
            }, 5000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

  const handleToggle = () => {
    const newIsChecked = !profileStatus;
    setProfileStatus(newIsChecked);
    //  console.log(newIsChecked);
  };

  // Function for change values
  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // Function for upload File
  const UploadFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const fileType = file?.type;

    if (allowedTypes.includes(fileType)) {
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", adminObject);

      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("action", "formcommand");
      formdata.append("docType", "profile");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(baseApi?.baseurl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setProfileImg(result?.data?.data?.Location);
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("Only jpg or png should be allowed");
    }
  };

  // function for image file uplaod
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    UploadFile(file);
  };

  const renderCheckboxCells = (rowData) => {
    return (
      <>
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            disabled
            checked={rowData.is_view}
          />
        </td>
        {/* <td>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            disabled
            checked={rowData.is_add}
          />
        </td> */}
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            disabled
            checked={rowData.is_edit}
          />
        </td>
        {/* <td>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            disabled
            checked={rowData.is_delete}
          />
        </td> */}
      </>
    );
  };

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-6">
              <div className="row d-flex align-items-center mb-3">
                <a
                  //to="/dashboard"
                  onClick={() => {
                    if (edit) {
                      setEdit(false);
                    } else {
                      navigate(
                        "/dashboard"
                        //   {
                        //     state: { myTeam_previousTab: status },
                        //   }
                      );
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  className="w-auto float-start pe-1 textBlack"
                >
                  <div className="backArrow">
                    <i className="fa fa-solid fa-chevron-left"></i>
                  </div>
                </a>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  {edit ? "Edit" : null} Profile
                </h4>
              </div>
            </div>
            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                {!edit ? (
                  <div className="saveBtn">
                    {/* <NavLink
                      onClick={() => {
                        setEdit(true);
                      }}
                      className="btn text-white px-4 float-end"
                      style={{
                        display: "flex",
                        gap: "5px",
                        backgroundColor: "#62a6dc",
                        borderRadius: "20px",
                      }}
                    >
                      <i
                        className="fa fa-regular fa-pen-to-square"
                        style={{ marginTop: "2px" }}
                      ></i>{" "}
                      <span className="">Edit</span>
                    </NavLink> */}
                  </div>
                ) : (
                  <div className="col-6 pe-0">
                    <div className="col-12 d-flex justify-content-end">
                      <div className="cancelBtn">
                        <NavLink
                          disabled={loading}
                          onClick={() => {
                            setEdit(false);
                            GetDetails();
                          }}
                          className="btn btn-reject me-3 px-4"
                          style={{
                            display: "flex",
                            backgroundColor: "#ffffff",
                            borderRadius: "20px",
                          }}
                        >
                          <span className="">Close</span>
                        </NavLink>
                      </div>
                      <div className="saveBtn">
                        <NavLink
                          disabled={loading}
                          onClick={(e) => handleSave(e)}
                          className="btn text-white px-4 float-end"
                          style={{
                            display: "flex",
                            backgroundColor: "#62a6dc",
                            borderRadius: "20px",
                          }}
                        >
                          <span className="">
                            {loading && (
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            Save
                          </span>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!edit ? (
            <div className="row">
              <div className="col-xl-7">
                <div className="main-card p-0">
                  <div className="custum-orange-bgbox"></div>
                  <div className="px-4">
                    <div className="pofileInfo">
                      <div className="row d-flex align-items-center">
                        <div className="col-8">
                          <div className="d-flex align-items-center">
                            <img
                              // crossOrigin="Anonymous"
                              // src={
                              //   userProfileDetails && userProfileDetails?.image
                              // }
                              src={myProfileImg}
                              alt="Profile"
                              className="rounded-50 profile"
                              id="profile-picture-custome"
                            />
                            <div className="consumerProfileText ms-3">
                              <h2 className="fw-bold letter-spacing-6">
                                {userProfileDetails &&
                                  userProfileDetails?.first_name}{" "}
                                {userProfileDetails &&
                                  userProfileDetails?.last_name}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                          {/* <div className="button b2" id="button-13">
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={
                                userProfileDetails &&
                                userProfileDetails?.is_active != true
                              }
                            />
                            <div className="knobs">
                              <span>|||</span>
                            </div>
                            <div className="layer"></div>
                          </div> */}

                          {/* <p className="mt-1 ms-3 ">
                            {adminObject?.is_active == true
                              ? "Active"
                              : "Inactive"}
                          </p> */}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p>Personal Details</p>
                      <hr className="borderHr mb-4" />
                      <div className="row pb-5">
                        <div className="col-6">
                          {" "}
                          <div className="">
                            <p>Email</p>
                            <h5 className="fw-bold">
                              {" "}
                              {userProfileDetails && userProfileDetails?.email}
                            </h5>
                          </div>
                          <div
                            className="col-12 d-flex"
                            style={{ marginTop: "50px" }}
                          >
                            <p className="fw-bold" style={{}}>
                              Status:
                            </p>
                            <div className="col-4 mb-3">
                              <div className="d-flex">
                                <p
                                  style={{
                                    color: profileStatus ? "green" : "red",
                                    fontSize: "14px",
                                    marginLeft: "10px",
                                    marginTop: "-2px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {profileStatus ? "Active" : "Inactive"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="border-left-grey h-100">
                            <div className="ps-4">
                              {" "}
                              <div className="">
                                <p>Contact</p>
                                <h5 className="fw-bold">
                                  {" "}
                                  {userProfileDetails &&
                                    userProfileDetails?.mobile_no}
                                </h5>
                              </div>
                              {/* <div className="mt-5">
                                <p>Address</p>
                                <h5 className="fw-bold">
                                  High Street, NY, 123456
                                </h5>
                              </div> */}
                              <div className="mt-5">
                                <p>Registration Date</p>
                                {/* <h5 className="fw-bold">
                                  {moment(
                                    userProfileDetails &&
                                      userProfileDetails?.createdAt
                                  ).format("DD-MM-YYYY")}
                                </h5> */}
                                <h5 className="fw-bold">
                                  {new Date(registerDate).toLocaleString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="main-card p-0">
                  <div className="custum-orange-bgbox"></div>
                  <div className="px-4">
                    <div className="pofileInfo">
                      <div className="row d-flex align-items-center">
                        <div className="col-8">
                          <div className="d-flex align-items-center">
                            <img
                              //crossOrigin="Anonymous"
                              src={profileImg}
                              alt=""
                              className="rounded-50 profile"
                              id="profile-picture-custome"
                              name="filename"
                              accept="image/*"
                            />
                            <p className="text-danger">
                              {formErrors?.profileImg}
                            </p>

                            <div className="file-upload-container ms-3 d-flex align-items-center">
                              <div className="contentBg">
                                <i className="fa fa-light fa-pen text-white"></i>
                              </div>

                              <input
                                id="file-input"
                                type="file"
                                name="filename"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                              <label htmlFor="file-input" className="ms-2 mb-0">
                                Change Profile Image
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                          {/* <label className="slider-container me-2">
                                          <input
                                             type="checkbox"
                                             className="ms-3"
                                             disabled
                                             checked={profileStatus}
                                             onChange={handleToggle}
                                             // onChange={(e) => {
                                             //   setProfileStatus(
                                             //     e.target.checked === true ? false : true
                                             //   );
                                             // }}
                                          />
                                          <span className="slider round"></span>
                                       </label> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <div className="my-4">
                          <p>Personal Details</p>
                          <hr className="borderHr" />
                          <div className="row">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter name"
                                  name="firstName"
                                  value={formValues?.firstName}
                                  onChange={(e) => handleChange(e)}
                                />
                                <p className="text-danger">
                                  {formErrors?.firstName}
                                </p>
                              </div>
                            </div>
                            <div className="row  mb-3">
                              <div className="col-6"></div>
                              <div className="col-6"></div>
                            </div>
                            <div className="col-12 mb-3">
                              <div className="row">
                                <div className="col-6">
                                  <label className="form-label">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    disabled
                                    name="email"
                                    placeholder="Enter Email"
                                    value={formValues?.email}
                                    onChange={(e) => handleChange(e)}
                                  />
                                  <p className="text-danger">
                                    {formErrors?.email}
                                  </p>
                                  {errorMessageData && errorMessageData ? (
                                    <p className="text-danger ">
                                      {errorMessageData}
                                    </p>
                                  ) : null}
                                </div>
                                <div className="col-6">
                                  <label className="form-label">
                                    Mobile No.
                                  </label>
                                  <input
                                    name="mobile"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Mobile No."
                                    value={formValues?.mobile}
                                    onChange={(e) => handleChange(e)}
                                  />
                                  <p className="text-danger">
                                    {formErrors?.mobile}
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6"></div>
                              </div>

                              <div className="row">
                                <div className="col-6 mt-4">
                                  <label className="form-label">
                                    Designation
                                  </label>

                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="roles"
                                    disabled
                                    value={formValues?.roles}
                                  >
                                    <option value="">Select</option>
                                    {roleListing?.map((ele, index) => {
                                      // Check if the role matches the formValues.roles
                                      const isSelected =
                                        ele.name === formValues?.roles;
                                      return (
                                        <option
                                          key={index}
                                          value={ele.role_id}
                                          selected={isSelected}
                                        >
                                          {ele.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  <p className="text-danger">
                                    {formErrors?.roles}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default MyProfile;
