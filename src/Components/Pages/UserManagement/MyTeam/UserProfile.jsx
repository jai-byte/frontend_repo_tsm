/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import baseApi from "../../../../Api/config";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    roles: "",
    image: "",
    employee_type: "",
    reporting_to_name: "",
    reporting_to: "",
    status: "",
  };
  const { status, id } = useParams();
  const navigate = useNavigate();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [employeeType, setEmployeeType] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [profileStatus, setProfileStatus] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [roleListing, setRoleisting] = useState([]);
  const errorMessageData = useSelector((state) => state.counter.errorData);
  const [rolePreviledgeData, setrolePreviledgeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [EmployeeList, setEmployeeList] = useState([]);
  const [edit, setEdit] = useState(false);
  var currentIndex = 0;

  // Get User Details
  useEffect(() => {
    GetDetails();
  }, [id]);

  const GetDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "createAdminUser",
        function: "getUserDetails",
        data: {
          user_id: parseInt(id),
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log("response for Get User details api", response);

          //  setrolePreviledgeData(response?.data?.data?.data?.priviledge_data);
          setFormValues({
            ...formValues,
            firstName: response?.data?.data?.data[0]?.first_name,
            email: response?.data?.data?.data[0]?.email,
            mobile: response?.data?.data?.data[0]?.mobile_no,
            roles: response?.data?.data?.data[0]?.result?.role_id,
            employee_type: response?.data?.data?.data[0]?.employee_type,
            reporting_to_name: response?.data?.data?.data[0]?.reporting_to_name,
            status: response?.data?.data?.data[0]?.is_active,
          });
          // setProfileStatus(response?.data?.data?.data[0]?.is_active);
          setProfileImg(response?.data?.data?.data[0]?.image);
          setrolePreviledgeData(
            response?.data?.data?.data[0]?.result?.priviledge_data
          );
          setRoleName(response?.data?.data?.data[0]?.result?.name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
    if (!values?.reporting_to) {
      errors.reporting_to = "Please select reporting name";
    }

    if (!values?.roles) {
      errors.roles = "Please select Role";
    }
    // if (!profileImg) {
    //   errors.profileImg = "Profile Image is required";
    // }

    return errors;
  };
  useEffect(() => {
    if (!edit) {
      // Reset form errors when closing edit mode
      setFormErrors({});
      setIsSubmit(false);
    }
  }, [edit]);

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
        console.log(
          "Response from Roles listing api ",
          response?.data?.data?.data
        );
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
      console.log("formValues", formValues);
      setLoading(true);
      try {
        API?.CommanApiCall({
          data: {
            first_name: formValues?.firstName,
            mobile_no: formValues?.mobile,
            email: formValues?.email,
            is_active: formValues?.status,
            is_admin: 1,
            loggedin_via: "email",
            usertype_in: 1,
            social_media_flag: false,
            role_id: parseInt(formValues?.roles),
            user_id: parseInt(id),
            employee_type: formValues?.employee_type,
            reporting_to: formValues?.reporting_to,
          },
          agent: "createAdminUser",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            setTimeout(() => {
              setLoading(false);
              navigate(-1);
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
        setLoading(false); // Ensure loading is stopped in case of error
      }
    } else if (isSubmit) {
      // If there are form errors, prevent API call and reset isSubmit
      setIsSubmit(false);
    }
  }, [formErrors, isSubmit]);
  useEffect(() => {
    console.log("Checking env:", process.env.REACT_APP_EMPLOYEE_TYPES); // Debug log

    const envEmployeeTypes = process.env.REACT_APP_EMPLOYEE_TYPES || "";
    const types = envEmployeeTypes
      .split(",")
      .map((type) => type.trim())
      .filter(Boolean);

    setEmployeeType(types);
  }, []);
  const handleToggle = () => {
    const newIsChecked = !profileStatus;
    setProfileStatus(newIsChecked);
    console.log(newIsChecked);
  };

  // Function for change values
  const handleSave = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    // Only set isSubmit to true if there are no errors
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "admin_user_list",
          page_no: 1,
          limit: 100,
          filter: {},
        });
        if (response?.status === 200) {
          setEmployeeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeList();
  }, []);

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
  const handleToggles = (checked) => {
    setFormValues((prev) => ({
      ...prev,
      status: checked, // Update status based on toggle
    }));
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
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <a
                onClick={() => {
                  if (edit) {
                    setEdit(false);
                  } else {
                    navigate("/my-team", {
                      state: { myTeam_previousTab: status },
                    });
                  }
                }}
                // to="/my-team"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  {edit ? "Edit" : null} User Profile
                </h4>
              </a>
            </div>

            <div className="col-6">
              {TajurbaAdmin_priviledge_data &&
              TajurbaAdmin_priviledge_data.some(
                (ele) =>
                  ele.title === "User Management" &&
                  ele.is_active === true &&
                  ele?.submenu &&
                  ele?.submenu.some(
                    (sub) =>
                      sub.title === "My Team" &&
                      sub.is_active === true &&
                      sub.is_edit === true
                  )
              ) ? (
                <div className="col-12 d-flex justify-content-end">
                  {!edit ? (
                    <div className="saveBtn">
                      <NavLink
                        onClick={() => {
                          setEdit(true);
                        }}
                        className="btn text-white px-4 float-end"
                        style={{
                          display: "flex",
                          backgroundColor: "#62a6dc",
                          borderRadius: "20px",
                        }}
                      >
                        <span className="">Edit</span>
                      </NavLink>
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
                              backgroundColor: "#fff",
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
              ) : null}
            </div>
          </div>
          {/* whole div for shoprofileImgw details */}

          {!edit ? (
            <div className="row">
              <div className="col-xl-6 mb-4">
                <div className="main-card p-3 h-100">
                  <div className="row p-4">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        {/* <img
                          className="rounded-circle img-fluid"
                          style={{ height: "150px", width: "150px" }}
                          // crossorigin="anonymous"
                          src={profileImg}
                        /> */}
                        <div className="consumerProfileText ms-3">
                          <h2 className="fw-bold letter-spacing-6">
                            {formValues?.firstName}
                          </h2>
                          <p className="fw-bold letter-spacing-6">
                            <span className="form-label ">Role:</span>{" "}
                            {roleName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label darkGrey">Email</label>
                          <p className="fw-bold">{formValues?.email}</p>
                        </div>
                        <div className="col-6">
                          <label className="form-label darkGrey">
                            Mobile No.
                          </label>
                          <p className="fw-bold">{formValues?.mobile}</p>
                        </div>
                      </div>
                      {/* <div className="row mt-4">
                        <div className="col-12">
                          <label className="form-label darkGrey">City</label>
                          <p className="fw-bold">Pune</p>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-12 mt-2 ">
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label darkGrey">
                            Reporting To
                          </label>
                          <p className="fw-bold">
                            {formValues?.reporting_to_name}
                          </p>
                        </div>
                        <div className="col-6">
                          <label className="form-label darkGrey">
                            Employee Type
                          </label>
                          <p className="fw-bold">{formValues?.employee_type}</p>
                        </div>
                      </div>
                      {/* <div className="row mt-4">
                        <div className="col-12">
                          <label className="form-label darkGrey">City</label>
                          <p className="fw-bold">Pune</p>
                        </div>
                      </div> */}
                    </div>

                    <div className="col-12 mt-4">
                      <div className="row">
                        <div className="col-6">
                          <div className="d-flex">
                            <div
                              className="col-12 d-flex"
                              style={{ marginTop: "10px" }}
                            >
                              <p className="fw-bold" style={{}}>
                                Status:
                              </p>
                              <div className="col-4 mb-3">
                                <div className="d-flex">
                                  <p
                                    style={{
                                      color: profileStatus ? "green" : "grey",
                                      fontSize: "14px",
                                      marginLeft: "10px",
                                      marginTop: "-2px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {formValues.status ? (
                                      <span style={{ color: "green" }}>
                                        Active
                                      </span>
                                    ) : (
                                      <span style={{ color: "#8A8A8A" }}>
                                        Inactive
                                      </span>
                                    )}
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
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="main-card p-4" id="uploadUserEdit">
                  <div className="row">
                    <div className="mb-3 col-12">
                      {/* <div className="col-md-4 col-sm-12 col-12 float-start">
                        <div className="col-12 float-start mt-2 mb-4">
                          <p className="addUserPic mx-auto mt-1 mb-1 ">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              name="filename"
                              multiple="multiple"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                            <img
                              // crossorigin="anonymous"
                              src={profileImg}
                              className="rounded-circle img-fluid"
                              style={{ height: "150px", width: "150px" }}
                            />
                            <label
                              className="custom-file-label mb-0"
                              htmlFor="customFile"
                            />
                          </p>
                          <div className="mx-auto text-center">
                            <button className="btn btn-main btn-main-orange btn-sm mt-3">
                              <i className="fa fa-solid fa-plus textBlack"></i>
                            </button>
                            <p className="text-danger">
                              {formErrors?.profileImg}
                            </p>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-md-8 col-sm-12 col-12 float-start mb-4 border-left-grey">
                        <div className="row ps-0 ps-md-4">
                          <div className="col-12">
                            <h4 className="fw-bold mb-3">
                              Personal Information
                            </h4>
                          </div>
                          <hr className="borderHr" />
                          <div className="col-12 mb-3">
                            <label className="form-label">
                              <span className="mandatory-star me-1">*</span>Name
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              placeholder="Enter first name"
                              name="firstName"
                              value={formValues?.firstName}
                              onChange={(e) => handleChange(e)}
                            />
                            <p className="text-danger">
                              {formErrors?.firstName}
                            </p>
                          </div>
                          <div className="col-12 mb-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  disabled
                                  className="form-control bg-white"
                                  placeholder="Enter Email"
                                  value={formValues?.email}
                                  onChange={(e) => handleChange(e)}
                                  style={{ color: "grey" }}
                                />{" "}
                                <p className="text-danger">
                                  {formErrors?.email}
                                </p>
                                {errorMessageData && errorMessageData ? (
                                  <p className="text-danger ">
                                    {errorMessageData}
                                  </p>
                                ) : null}
                              </div>
                              <div className="col-4">
                                <label className="form-label">
                                  <span className="mandatory-star me-1">*</span>
                                  Mobile No.
                                </label>

                                <input
                                  type="number"
                                  name="mobile"
                                  className="form-control bg-white"
                                  placeholder="Enter Mobile No."
                                  value={formValues?.mobile}
                                  onChange={(e) => handleChange(e)}
                                />
                                <p className="text-danger">
                                  {formErrors?.mobile}
                                </p>
                              </div>
                              <div className="col-4">
                                <label className="form-label">
                                  <span className="mandatory-star me-1">*</span>
                                  Reporting To
                                </label>
                                <div>
                                  <select
                                    className="form-select bg-white"
                                    aria-label="Default select example"
                                    name="reporting_to"
                                    onChange={(e) => handleChange(e)}
                                    value={formValues?.reporting_to}
                                  >
                                    <option value="">Select</option>
                                    {/* {employeeType?.map((ele, index) => {
                              // if (ele?.is_active)
                              return (
                                <option key={index} value={ele}>
                                  {ele}
                                </option>
                              );
                            })} */}
                                    {EmployeeList &&
                                      EmployeeList?.map((ele, index) => {
                                        const isSelected =
                                          ele.name === formValues?.reporting_to;
                                        return (
                                          <option
                                            selected=""
                                            value={ele?._id}
                                            key={index}
                                          >
                                            {ele?.first_name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  <p className="text-danger">
                                    {formErrors?.reporting_to}
                                  </p>
                                </div>
                              </div>
                              <div className="col-4">
                                <label className="form-label">
                                  <span className="mandatory-star me-1">*</span>
                                  Employee Type
                                </label>
                                <div>
                                  <select
                                    className="form-select bg-white"
                                    aria-label="Default select example"
                                    name="employee_type"
                                    onChange={(e) => handleChange(e)}
                                    value={formValues?.employee_type}
                                  >
                                    <option value="">Select</option>

                                    {employeeType &&
                                      employeeType?.map((ele, index) => {
                                        return (
                                          <option
                                            selected=""
                                            value={ele}
                                            key={index}
                                          >
                                            {ele}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  <p className="text-danger">
                                    {formErrors?.employee_type}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-12 mb-3">
                          
                        </div> */}

                        <div className="row ps-0 ps-md-4 mt-4">
                          <div className="col-12">
                            <h4 className="fw-bold mb-3">
                              <span className="mandatory-star me-1">*</span>
                              Roles
                            </h4>
                          </div>
                          <hr className="borderHr" />
                          <div className="col-4 mb-3">
                            <select
                              className="form-select bg-white"
                              aria-label="Default select example"
                              name="roles"
                              value={formValues?.roles}
                              //   value={roleListing?.map((ele, idex) => {
                              //     return ele?.name === formValues?.roles;
                              //   })}
                              onChange={(e) => handleChange(e)}
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
                            <p className="text-danger">{formErrors?.roles}</p>
                          </div>
                        </div>

                        <div
                          className="col-12 d-flex"
                          style={{ marginTop: "10px", marginLeft: "25px" }}
                        >
                          <p className="fw-bold" style={{ fontSize: "16px" }}>
                            Status:
                          </p>
                          <div className="col-4 mb-3">
                            <div className="d-flex">
                              <p
                                style={{
                                  color: profileStatus ? "green" : "red",
                                  fontSize: "14px",
                                  marginLeft: "10px",
                                  marginTop: "3px",
                                  fontWeight: "600",
                                }}
                              >
                                <div>
                                  <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    checked={formValues.status} // Controlled component with current status
                                    onChange={handleToggles} // Update formValue on toggle
                                  />
                                </div>

                                {formValues.status ? (
                                  <span style={{ color: "green" }}>Active</span>
                                ) : (
                                  <span style={{ color: "#8A8A8A" }}>
                                    Inactive
                                  </span>
                                )}
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
          )}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default UserProfile;
