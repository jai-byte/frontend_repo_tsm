/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import { useFormik } from "formik";
import API from "../../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import AdminRoute from "../../../../Route/RouteDetails";
import { useDispatch } from "react-redux";
import { activityDetails } from "../../../../Redux/slice";
import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import API from "../../../Api/Api";
// import { errorData } from "../../../Redux/slice";
// import { useFormik } from "formik";

const CreateNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, SetErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [communityListing, setCommuityListing] = useState([]);

  const validate = (values) => {
    //  console.log(values, "value");
    const errors = {};

    if (!values.type) {
      errors.type = "Please enter type";
    }
    if (!values.community_id) {
      errors.community_id = "Please enter community";
    }
    // if (!values.content_type) {
    //   errors.content_type = "Please enter content type";
    // } else if (values.content_type.trim() === "") {
    //   errors.content_type = "Content type cannot be blank";
    // }

    if (!values.content_title) {
      errors.content_title = "Please enter content title";
    } else if (values.content_title.trim() === "") {
      errors.content_title = "content title cannot be blank";
    }
    // else if (/[^a-zA-Z\s]/.test(values.content_title)) {
    //   errors.content_title =
    //     "Numbers and Special characters are not accepted in this field.";
    // }
    if (!values.description) {
      errors.description = "Please enter description";
    } else if (values.description.trim() === "") {
      errors.description = "Description cannot be blank";
    }
    if (values.type === "Challenge") {
      if (!values.provided_timer) {
        errors.provided_timer = "Please provide timer";
      } else {
        // Validate MM:SS format
        const timerRegex = /^([0-5]?[0-9]):([0-5][0-9])$/;
        if (!values.provided_timer) {
          errors.provided_timer = "Please provide timer";
        } else if (!timerRegex.test(values.provided_timer)) {
          errors.provided_timer = "Timer must be in MM:SS format";
        }
      }
    }
    if (!values.start_date) {
      errors.start_date = "Please select start date";
    }
    if (!values.end_date) {
      errors.end_date = "Please select end date";
    }

    console.log("Errors", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      type: "Challenge",
      community_id: "",
      content_type: "",
      content_title: "",
      description: "",
      start_date: "",
      end_date: "",
      provided_timer: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const errors = validate(values);

      if (Object.keys(errors).length === 0) {
        // console.log("Run vaidation function no errors");
        handleSave();
      } else {
        // console.log("Run vaidation function if errors is present ");

        console.log("Validation errors:", errors);
      }

      setSubmitting(false);
    },
    validate,
  });

  // Function for role listing
  useEffect(() => {
    try {
      var payload = {
        agent: "community",
        function: "get_list",
        flag: "Active",
        page_no: 1,
        limit: 200,

        filter: {},
      };

      API?.CommanApiCall(payload).then((response) => {
        console.log(
          "Response from Community listing api ",
          response?.data?.data?.data
        );
        if (response?.data?.data?.status === 200) {
          setCommuityListing(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);
    // console.log(formik.values);
    // console.log(
    //   (communityListing &&
    //     communityListing?.find(
    //       (ele) => ele.community_id == formik.values.community_id
    //     )?.community_title) ||
    //     ""
    // );

    try {
      API?.CommanApiCall({
        agent: "activity",
        data: {
          type: formik.values?.type,
          community_id: formik.values?.community_id,
          // content_type: formik.values?.content_type,
          content_type:
            (communityListing &&
              communityListing?.find(
                (ele) => ele.community_id == formik.values.community_id
              )?.community_title) ||
            "",
          content_title: formik.values?.content_title,
          description: formik.values?.description,
          start_date: formik.values?.start_date,
          end_date: formik.values?.end_date,
          provided_timer: formik.values?.provided_timer,
          activity_status: "Draft",
        },
      }).then((response) => {
        console.log(response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          toast.success(response?.data?.data?.message);
          setTimeout(() => {
            setLoading(false);
            dispatch(activityDetails(response?.data?.data?.data));

            navigate(
              `/${AdminRoute?.Community?.ActivityManagement?.CreateActivity?.replace(
                ":type",
                formik?.values?.type
              )?.replace(":id", response?.data?.data?.data?.activity_id)}`
            );
          }, 1000);
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
  };

  useEffect(() => {
    console.log("formik.values", formik.values);
  }, [formik.values]);
  const handleStartDateChange = (date) => {
    formik.setFieldValue("start_date", date);
    // Reset end_date if it's before the selected start date
    if (formik.values.end_date < date) {
      formik.setFieldValue("end_date", "");
    }
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
            <div className="col-12">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Create New</h3>
                </div>
              </div>
            </div>
          </div>
          <div id="createContent">
            <div className="main-card bg-white p-0 h-auto">
              <div className="row">
                <div className="col-4">
                  <div className="createBg p-xl-4 p-3 h-100">
                    <div className="row h-100">
                      <div className="d-flex align-items-start">
                        <div>
                          <h2 className="text-white createHeading mt-3">
                            CREATE{" "}
                            <span className="createSubheading">ACTIVITY</span>
                          </h2>
                        </div>
                      </div>
                      <div className="d-flex align-items-end">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="66.532"
                            height="53.96"
                            viewBox="0 0 66.532 53.96"
                          >
                            <path
                              id="Path_11221"
                              data-name="Path 11221"
                              d="M51.693,42.088a12.167,12.167,0,0,0,9.294-4.241,13.3,13.3,0,0,0,3.88-9.114,13.321,13.321,0,0,0-3.429-8.753q-3.429-4.061-6.677-4.061a19.659,19.659,0,0,1,3.7-8.482,72.739,72.739,0,0,1,8.391-8.3L61.8-11.872A47.141,47.141,0,0,0,44.745,4.821q-6.767,10.918-6.767,21.2a16.84,16.84,0,0,0,3.97,11.55A12.488,12.488,0,0,0,51.693,42.088Zm-38.019,0a12.443,12.443,0,0,0,9.384-4.241,13.151,13.151,0,0,0,3.97-9.114A13.525,13.525,0,0,0,23.69,19.98q-3.339-4.061-6.767-4.061a18.959,18.959,0,0,1,3.7-8.392A82.353,82.353,0,0,1,29.194-.864L23.96-11.872A47.632,47.632,0,0,0,7.087,4.821Q.32,15.739.32,26.026A17.085,17.085,0,0,0,4.2,37.576,12.043,12.043,0,0,0,13.674,42.088Z"
                              transform="translate(-0.32 11.872)"
                              fill="#354660"
                            />
                          </svg>
                          <p className="text-white mt-3">
                            Embrace the challenges, unleash your potential and
                            create a legacy that inspires the world.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="p-4">
                    <div className="createText">
                      <h3 className="fw-bold letter-spacing-48">
                        What Media Format do you want to choose to Create
                        Content ?
                      </h3>

                      <nav className="social-media1">
                        <ul
                          className="nav nav-tabs mb-3 py-2"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="" role="presentation">
                            <a>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="type"
                                  id="flexRadioDefault1"
                                  value="Challenge"
                                  checked={formik.values.type === "Challenge"}
                                  onChange={formik.handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  Challenge
                                </label>
                              </div>
                            </a>
                          </li>
                          <li className="" role="presentation">
                            <a>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="type"
                                  id="flexRadioDefault2"
                                  value="Quest"
                                  checked={formik.values.type === "Quest"}
                                  onChange={formik.handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                >
                                  Quest
                                </label>
                              </div>
                            </a>
                          </li>
                          <li className="" role="presentation">
                            <a>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="type"
                                  id="flexRadioDefault3"
                                  value="Poll"
                                  checked={formik.values.type === "Poll"}
                                  onChange={formik.handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault3"
                                >
                                  Poll
                                </label>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </nav>
                      {formik.errors.type && formik.touched.type ? (
                        <div className="text-danger">{formik.errors.type}</div>
                      ) : null}

                      <form>
                        <div
                          className="tab-pane fade show active"
                          id="Text"
                          role="tabpanel"
                          aria-labelledby="Text-tab"
                        >
                          <div className="row ">
                            <div className="col-xl-8">
                              {/* Category */}
                              <div className="row">
                                <div className="col-12 mb-2">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Select the community you are making this
                                    activity for
                                  </label>
                                  <select
                                    className="form-select w-100
                                                             border-radius-2"
                                    aria-label="Default select example"
                                    name="community_id"
                                    onChange={formik.handleChange}
                                  >
                                    <option value="">Select</option>
                                    {communityListing &&
                                      communityListing?.map((ele, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={ele?.community_id}
                                          >
                                            {ele?.community_title}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  {formik.errors.community_id &&
                                  formik.touched.community_id ? (
                                    <div className="text-danger">
                                      {formik.errors.community_id}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              {/* content title */}
                              {/* <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    {" "}
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>{" "}
                                    Choose the content type
                                  </label>
                                  <select
                                    className="form-select w-100
                                                             border-radius-2"
                                    aria-label="Default select example"
                                    name="content_type"
                                    onChange={formik.handleChange}
                                    value={
                                      (communityListing &&
                                        communityListing?.find(
                                          (ele) =>
                                            ele.community_id ==
                                            formik.values.community_id
                                        )?.community_title) ||
                                      ""
                                    }
                                    disabled
                                  >
                                    <option value="">Select</option>
                                    {communityListing &&
                                      communityListing?.map((ele, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={ele?.community_title}
                                          >
                                            {ele?.community_title}
                                          </option>
                                        );
                                      })}
                                  </select> */}
                              {/* <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter content type"
                                      id="Title"
                                      name="content_type"
                                      onChange={formik.handleChange}
                                    /> */}
                              {/* </div> */}
                              {/* {formik.errors.content_type &&
                                  formik.touched.content_type ? (
                                    <div className="text-danger">
                                      {formik.errors.content_type}
                                    </div>
                                  ) : null} */}
                              {/* </div> */}

                              {/* author name */}
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    {" "}
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>{" "}
                                    Enter content title
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter content title"
                                    name="content_title"
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.content_title &&
                                  formik.touched.content_title ? (
                                    <div className="text-danger">
                                      {formik.errors.content_title}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">
                                  {" "}
                                  <span className="mandatory-star me-1">
                                    *
                                  </span>{" "}
                                  Give description
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  placeholder="Describe the topic in detail...."
                                  id="Title"
                                  name="description"
                                  onChange={formik.handleChange}
                                  rows="4"
                                />
                                {formik.errors.description &&
                                formik.touched.description ? (
                                  <div className="text-danger">
                                    {formik.errors.description}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            {formik?.values?.type === "Challenge" ? (
                              <div className="row mb-3">
                                <div className="col-2">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>{" "}
                                    Provide Timer
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="MM:SS"
                                    name="provided_timer"
                                    onChange={formik.handleChange}
                                    onKeyPress={(e) => {
                                      // Allow only numbers and colon
                                      const regex = /^[0-9:]$/;
                                      if (!regex.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) => {
                                      // Format validation on blur
                                      const value = e.target.value;
                                      const timerRegex =
                                        /^([0-5]?[0-9]):([0-5][0-9])$/;
                                      if (!timerRegex.test(value)) {
                                        formik.setFieldError(
                                          "provided_timer",
                                          "Timer must be in MM:SS format"
                                        );
                                      }
                                    }}
                                  />
                                  {/* <div className="">
                                                         <div className="form-check form-check-inline">
                                                            <input
                                                               className="form-check-input"
                                                               type="radio"
                                                               id="inlineRadio1"
                                                               name="provided_timer"
                                                               value="15s"
                                                               checked={formik.values.provided_timer === "15s"}
                                                               onChange={formik.handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio1">
                                                               15 sec
                                                            </label>
                                                         </div>
                                                         <div className="form-check form-check-inline">
                                                            <input
                                                               className="form-check-input"
                                                               type="radio"
                                                               //name="inlineRadioOptions"
                                                               id="inlineRadio2"
                                                               name="provided_timer"
                                                               value="20s"
                                                               checked={formik.values.provided_timer === "20s"}
                                                               onChange={formik.handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio2">
                                                               20 sec
                                                            </label>
                                                         </div>
                                                         <div className="form-check form-check-inline">
                                                            <input
                                                               className="form-check-input"
                                                               type="radio"
                                                               //  name="inlineRadioOptions"
                                                               id="inlineRadio3"
                                                               name="provided_timer"
                                                               value="30s"
                                                               checked={formik.values.provided_timer === "30s"}
                                                               onChange={formik.handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio3">
                                                               30 sec
                                                            </label>
                                                         </div>

                                                         <div className="form-check form-check-inline">
                                                            <input
                                                               className="form-check-input"
                                                               type="radio"
                                                               // name="inlineRadioOptions"
                                                               id="inlineRadio4"
                                                               name="provided_timer"
                                                               value="45s"
                                                               checked={formik.values.provided_timer === "45s"}
                                                               onChange={formik.handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio4">
                                                               45 sec
                                                            </label>
                                                         </div>
                                                         <div className="form-check form-check-inline">
                                                            <input
                                                               className="form-check-input"
                                                               type="radio"
                                                               // name="inlineRadioOptions"
                                                               id="inlineRadio5"
                                                               name="provided_timer"
                                                               value="60s"
                                                               checked={formik.values.provided_timer === "60s"}
                                                               onChange={formik.handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="inlineRadio5">
                                                               60 sec
                                                            </label>
                                                         </div>
                                                      </div> */}
                                  {formik.errors.provided_timer &&
                                  formik.touched.provided_timer ? (
                                    <div className="text-danger">
                                      {formik.errors.provided_timer}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">
                                  <span className="mandatory-star me-1">*</span>
                                  Set start and end date
                                </label>
                                <div className="d-flex align-items-center">
                                  <span>
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="Enter date"
                                      name="start_date"
                                      value={formik.values.start_date}
                                      min={moment().format("YYYY-MM-DD")}
                                      onChange={(e) =>
                                        handleStartDateChange(e.target.value)
                                      }
                                    />
                                    {formik.errors.start_date &&
                                    formik.touched.start_date ? (
                                      <div className="text-danger">
                                        {formik.errors.start_date}
                                      </div>
                                    ) : null}
                                  </span>
                                  <p className="mb-0 px-5">To</p>
                                  <span>
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="Enter date"
                                      name="end_date"
                                      disabled={!formik.values.start_date}
                                      min={formik.values.start_date} // Ensure end date cannot be before start date
                                      value={formik.values.end_date}
                                      onChange={formik.handleChange}
                                    />
                                    {formik.errors.end_date &&
                                    formik.touched.end_date ? (
                                      <div className="text-danger">
                                        {formik.errors.end_date}
                                      </div>
                                    ) : null}
                                  </span>
                                </div>{" "}
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-12 d-flex justify-content-end">
                                <div className="cancelBtn">
                                  <NavLink
                                    disabled={loading}
                                    to={`/${AdminRoute?.Community?.ActivityManagement?.ActivityManagement}`}
                                    className="btn btn-reject me-3 px-4"
                                  >
                                    <span className="">Back</span>
                                  </NavLink>
                                </div>
                                <div className="saveBtn">
                                  <button
                                    onClick={formik.handleSubmit}
                                    type="submit"
                                    disabled={loading}
                                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                                  >
                                    <span className="">
                                      {loading && (
                                        <span
                                          className="spinner-border spinner-border-sm me-2"
                                          role="status"
                                          aria-hidden="true"
                                        ></span>
                                      )}
                                      Start
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default CreateNew;
