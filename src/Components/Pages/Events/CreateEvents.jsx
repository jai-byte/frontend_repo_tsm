/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import API from "../../../Api/Api";
import { useFormik } from "formik";
import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import AdminRoute from "../../../Route/RouteDetails";

export default function CreateEvents() {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));

  const [errorMessage, SetErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(eventType);

  const validate = (values) => {
    //  console.log(values, "value");
    const errors = {};
    const startDate = new Date(values.start_date);
    const endDate = new Date(values.end_date);
    const startTime = values.start_time;
    const endTime = values.end_time;
    console.log("start_time", values?.start_time);

    if (!values.name) {
      errors.name = "Please enter event name";
    } else if (values.name.trim() === "") {
      errors.name = "event name cannot be blank";
    }
    // else if (/[^a-zA-Z\s]/.test(values.name)) {
    //   errors.name =
    //     "Numbers and Special characters are not accepted in this field.";
    // }
    if (!values.description) {
      errors.description = "Please enter description";
    } else if (values.description.trim() === "") {
      errors.description = "Description cannot be blank";
    }
    if (!values.hosted_by) {
      errors.hosted_by = "Please enter hosts name";
    } else if (values.hosted_by.trim() === "") {
      errors.hosted_by = "Host name cannot be blank";
    }
    if (!values.start_date) {
      errors.start_date = "Please select start date";
    }
    if (!values.end_date) {
      errors.end_date = "Please select end date";
    }
    if (!values.start_time) {
      errors.start_time = "Please select start time";
    } else if (
      moment(startDate).isSame(moment(), "day") && // Check if the event is today
      moment(
        `${startDate.toISOString().split("T")[0]}T${values.start_time}`
      ).isBefore(moment())
    ) {
      errors.start_time = "Start time cannot be in the past for today's event";
    }
    // else if (
    //   moment(startDate).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")
    // ) {
    //   if (values?.start_time > moment().format())
    //     errors.start_time =
    //       "Start time cannot be in the past for today's event";
    // }
    if (!values.end_time) {
      errors.end_time = "Please select end time";
    }
    if (
      values.start_date &&
      values.end_date &&
      values.start_time &&
      values.end_time
    ) {
      // Check if end date is same as start date
      if (startDate.getTime() === endDate.getTime()) {
        // If end time is before start time
        if (endTime < startTime) {
          errors.end_time =
            "End time cannot be before start time for the same day event";
        }
      }
    }
    if (!values.amount) {
      errors.amount = "Please enter amount";
    }
    if (!values.seat) {
      errors.seat = "Please enter seat";
    }
    if (!values.image) {
      errors.image = "Please upload Image";
    }
    if (eventType === "Online") {
      if (!values.join_link) {
        errors.join_link = "Please enter joinning link";
      } else if (values.join_link.trim() === "") {
        errors.join_link = "joinning link cannot be blank";
      }
    }
    if (eventType === "Offline") {
      if (!values.address) {
        errors.address = "Please enter address";
      } else if (values.address.trim() === "") {
        errors.address = "address cannot be blank";
      }
    }

    console.log("Errors", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      hosted_by: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      amount: "",
      seat: "",
      image: "",
      type: eventType,
      ...(eventType === "Online" ? { join_link: "" } : { address: "" }),
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

  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);
    const { start_time, end_time, ...rest } = formik.values;

    // Update start_date and end_date based on start_time and end_time
    const startDate = new Date(rest.start_date + "T" + start_time + ":00");
    const endDate = new Date(rest.end_date + "T" + end_time + ":00");
    // Convert dates to ISO string format
    rest.start_date = startDate.toISOString();
    rest.end_date = endDate.toISOString();

    // Remove start_time and end_time keys
    delete rest.start_time;
    delete rest.end_time;

    //  console.log(rest);
    try {
      API?.CommanApiCall({
        data: rest,
        agent: "event",
      }).then((response) => {
        console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          toast.success(response?.data?.data?.message);
          setTimeout(() => {
            setLoading(false);
            // navigate("/events/create-FAQ/:id");
            navigate(
              `../${AdminRoute?.Events?.CreateFAQ?.replace(
                ":id",
                response?.data?.data?.data?.event_id
              )}`
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

  // Api for FIle Upload
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
          formik.setFieldValue("image", result?.data?.data?.Location);
          // setUploadedFile(result?.data?.data?.Location);
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

  // function for image drag and upload
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // function for image drop and upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    UploadFile(file);
  };

  // function for select start date
  const handleStartDateChange = (date) => {
    formik.setFieldValue("start_date", date);
    // Reset end_date if it's before the selected start date
    if (formik.values.end_date < date) {
      formik.setFieldValue("end_date", "");
    }
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to="/events"
                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </NavLink>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Create New {eventType} Event
              </h4>
            </div>

            <div className="col-6 pe-0">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    disabled={loading}
                    // to="/events"
                    className="btn btn-reject me-3 px-4"
                  >
                    <span className="">Cancel</span>
                  </button>
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
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <form onSubmit={formik.handleSubmit}>
              <div className="row justify-content-between main-card p-4">
                {errorMessage ? (
                  <span className="text-danger text-end">{errorMessage}</span>
                ) : null}
                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    {/* content title */}
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">Event Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Session name"
                          id="Title"
                          name="name"
                          onChange={formik.handleChange}
                        />
                        {formik.errors.name && formik.touched.name ? (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">Event hosted by</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Event Host's Name"
                          id="Title"
                          name="hosted_by"
                          onChange={formik.handleChange}
                        />
                        {formik.errors.hosted_by && formik.touched.hosted_by ? (
                          <div className="text-danger">
                            {formik.errors.hosted_by}
                          </div>
                        ) : null}
                      </div>
                    </div>{" "}
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label"> Event Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Enter event description in short......"
                          id="Title"
                          name="description"
                          onChange={formik.handleChange}
                          rows={4}
                          // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                        />
                      </div>
                      {formik.errors.description &&
                      formik.touched.description ? (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Set
                          start date and time
                        </label>
                        <div className="row ">
                          <div className="col-5">
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Enter date"
                              name="start_date"
                              min={moment().format("YYYY-MM-DD")}
                              value={formik.values.start_date}
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
                          </div>

                          <div className="col-2 text-center">
                            <p className="mb-0 mt-2">To</p>
                          </div>
                          <div className="col-5">
                            <input
                              type="time"
                              className="form-control"
                              placeholder="HH:MM"
                              name="start_time"
                              value={formik.values.start_time}
                              // onChange={formik.handleChange}

                              onChange={(event) => {
                                formik.handleChange(event);
                                // Update the minimum value for the end time
                                //const startTime = event.target.value;
                                // if (formik.values.end_time < startTime) {
                                //   formik.setFieldValue("end_time", startTime);
                                // }
                              }}
                            />
                            {formik.errors.start_time &&
                            formik.touched.start_time ? (
                              <div className="mr-2 text-danger">
                                {formik.errors.start_time}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Set end
                          date and time
                        </label>
                        <div className="row">
                          <div className="col-5">
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
                          </div>
                          <div className="col-2 text-center">
                            <p className="mb-0 mt-2">To</p>
                          </div>
                          <div className="col-5">
                            <input
                              type="time"
                              className="form-control"
                              placeholder="HH:MM"
                              name="end_time"
                              // min={formik.values.start_time}
                              disabled={!formik.values.start_time}
                              // onChange={formik.handleChange}
                              min={formik.values.start_time}
                              value={formik.values.end_time}
                              // onChange={(event) => {
                              //   const endTime = event.target.value;
                              //   const startTime = formik.values.start_time;

                              //   if (endTime < startTime) {
                              //     toast.warning(
                              //       "end time cannot be before start time"
                              //     );
                              //   } else {
                              //     formik.handleChange(event);
                              //   }
                              // }}
                              onChange={(event) => {
                                const endTime = event.target.value;
                                const startTime = formik.values.start_time;
                                const startDate = formik.values.start_date;
                                const endDate = formik.values.end_date;

                                if (startDate === endDate) {
                                  // If start date and end date are the same
                                  if (endTime < startTime) {
                                    // End time cannot be before start time
                                    // toast.warning(
                                    //   "End time cannot be before start time"
                                    // );
                                  } else {
                                    formik.handleChange(event);
                                  }
                                } else {
                                  // If start date and end date are different
                                  formik.handleChange(event);
                                }
                              }}
                            />
                            {formik.errors.end_time &&
                            formik.touched.end_time ? (
                              <div className="mr-2 text-danger">
                                {formik.errors.end_time}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                                    <div className="col-12">
                                       <label className="form-label">Enter Session Amount</label>
                                       <input
                                          type="number"
                                          min={1}
                                          className="form-control w-50"
                                          placeholder="XXXX./-"
                                          name="amount"
                                          onChange={formik.handleChange}
                                          onKeyPress={(e) => {
                                             if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
                                                e.preventDefault();
                                             }
                                          }}
                                       />
                                    </div>
                                    {formik.errors.amount && formik.touched.amount ? (
                                       <div className="text-danger">{formik.errors.amount}</div>
                                    ) : null}
                                 </div>
                                 <div className="row mb-3">
                                    {eventType === "Online" ? (
                                       <div className="col-12">
                                          <label className="form-label">Share Joining Link</label>
                                          <input
                                             type="url"
                                             className="form-control "
                                             placeholder="Eg:http:jngierdhfvwkfbek2ce245792364"
                                             name="join_link"
                                             onChange={formik.handleChange}
                                          />
                                          {formik.errors.join_link && formik.touched.join_link ? (
                                             <div className="text-danger">{formik.errors.join_link}</div>
                                          ) : null}
                                       </div>
                                    ) : (
                                       <div className="col-12">
                                          <label className="form-label">Enter Address</label>
                                          <textarea
                                             type="text"
                                             className="form-control"
                                             placeholder="Enter address...."
                                             id="Title"
                                             name="address"
                                             onChange={formik.handleChange}
                                             rows={4}
                                          />
                                          {formik.errors.address && formik.touched.address ? (
                                             <div className="text-danger">{formik.errors.address}</div>
                                          ) : null}
                                       </div>
                                    )}
                                 </div> */}
                    {/* <NavLink
                        to="/events/create-FAQ"
                        className="textlightBlue border-0 rounded-0 text-decoration-underline"
                      >
                        Add FAQ Questions
                      </NavLink> */}
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <label className="form-label">Content Cover Image</label>

                    <div className="col-12 float-start mb-4 position-relative">
                      <p
                        class="addUserPic p-0 w-70 d-flex justify-content-center align-items-center"
                        style={{ height: "213px" }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <span class="text-center">
                            {formik.values.image ? (
                              <img
                                src={formik.values.image}
                                alt=""
                                className="w-100"
                                id="profile-picture-custome"
                              />
                            ) : (
                              <>
                                <img src={IconGallery} className="mb-2" />
                                <p className="mb-0">
                                  Drag an image here <br />
                                  or
                                  <br /> <a href="">Upload Image</a>
                                </p>
                              </>
                            )}
                          </span>
                        </div>

                        <input
                          type="file"
                          class="custom-file-input"
                          id="customFile"
                          name="image"
                          accept="image/jpeg, image/png"
                          onChange={handleFileChange}
                          // onChange={(e) => {
                          //   UploadFile(e);
                          // }}
                        />
                        <label
                          class="custom-file-label mb-0"
                          htmlForfor="customFile"
                        ></label>
                      </p>
                      {formik.errors.image && formik.touched.image ? (
                        <div className="text-danger">{formik.errors.image}</div>
                      ) : null}
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          {eventType === "Online"
                            ? "Enter no. of seat for the event"
                            : "Enter no. of seat limit"}
                        </label>
                        <input
                          type="number"
                          className="form-control w-50"
                          min={1}
                          placeholder="XXXX"
                          name="seat"
                          onChange={formik.handleChange}
                          onKeyPress={(e) => {
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "+" ||
                              e.key === "e" ||
                              e.key === "E"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      {formik.errors.seat && formik.touched.seat ? (
                        <div className="text-danger">{formik.errors.seat}</div>
                      ) : null}
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          Enter Session Amount
                        </label>
                        <input
                          type="number"
                          min={1}
                          className="form-control w-50"
                          placeholder="XXXX./-"
                          name="amount"
                          onChange={formik.handleChange}
                          onKeyPress={(e) => {
                            if (
                              e.key === "-" ||
                              e.key === "." ||
                              e.key === "+" ||
                              e.key === "e" ||
                              e.key === "E"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      {formik.errors.amount && formik.touched.amount ? (
                        <div className="text-danger">
                          {formik.errors.amount}
                        </div>
                      ) : null}
                    </div>
                    <div className="row mb-3">
                      {eventType === "Online" ? (
                        <div className="col-12">
                          <label className="form-label">
                            Share Joining Link
                          </label>
                          <input
                            type="url"
                            className="form-control "
                            placeholder="Eg:http:jngierdhfvwkfbek2ce245792364"
                            name="join_link"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.join_link &&
                          formik.touched.join_link ? (
                            <div className="text-danger">
                              {formik.errors.join_link}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="col-12">
                          <label className="form-label">Enter Address</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter address...."
                            id="Title"
                            name="address"
                            onChange={formik.handleChange}
                            rows={4}
                          />
                          {formik.errors.address && formik.touched.address ? (
                            <div className="text-danger">
                              {formik.errors.address}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                    {/* <div className="row mb-3">
                                    <div className="col-12">
                                       <label className="form-label">Enter registration form link</label>
                                       <input
                                          type="url"
                                          className="form-control "
                                          placeholder="Enter registration form link..."
                                       />
                                    </div>
                                 </div> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
}
