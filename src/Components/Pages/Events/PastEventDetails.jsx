/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import EventDetailsImg from "../../../assets/images/sureshsir.png";
import photogallery from "../../../assets/images/Notific.png";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import API from "../../../Api/Api";
import moment from "moment";
// import MultiCircularProgressBar from "../../Common/MultiCircularProgressBar";
import Modal from "react-bootstrap/Modal";
import { CChart } from "@coreui/react-chartjs";
import { ToastContainer, toast } from "react-toastify";
import baseApi from "../../../Api/config";
import AdminRoute from "../../../Route/RouteDetails";
import PastOnlineEventDetails from "./PastOnlineEventDetails";

const PastEventDetails = () => {
  const { eventType, eventScheduled, status, id } = useParams();

  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const navigate = useNavigate();
  const divRef = useRef(null);

  const [eventDetails, setEventDetails] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [editValues, setEditValues] = useState({
    media: [],
    testimonial: "",
  });

  const [values, setValues] = useState([]);
  const [totalSeat, setTotalSeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [faq, setFaq] = useState([]);

  // Validate all the  Fields
  const validate = (values) => {
    const errors = {};

    const emailregex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileregex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const specialCharacter = /^[A-Za-z0-9 ]+$/;

    if (!values?.testimonial) {
      errors.testimonial = "Please enter testimonial ";
    } else if (values.testimonial.trim() === "") {
      errors.testimonial = "Testimonial cannot be blank";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [edit, setEdit] = useState(false);

  const removePhoto = (indexToRemove) => {
    if (editValues?.media.length > 1) {
      setEditValues((prevState) => ({
        ...prevState,
        media: prevState.media.filter((_, index) => index !== indexToRemove),
      }));
    } else {
      toast.warning("alteast 1 image is required");
    }
  };

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

      return fetch(baseApi?.baseurl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          return result?.data?.data?.Location; // Return the uploaded image URL
        })
        .catch((error) => {
          console.log("error", error);
          throw error; // Re-throw the error to handle it outside this function
        });
    } else {
      toast.error("Only jpg or png should be allowed");
    }
  };

  // function for image file uplaod
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      // No files selected, you might want to handle this case
      return;
    }

    const uploadPromises = [];

    // Iterate over each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const imageURL = await UploadFile(file); // Wait for the image upload to complete
        uploadPromises.push(imageURL);
      } catch (error) {
        // Handle any errors that occur during the upload
        console.error("Error uploading file:", error);
        // Optionally, you might want to break out of the loop or handle the error differently
      }
    }

    // Once all files are uploaded, update the state with the new image URLs
    Promise.all(uploadPromises)
      .then((imageURLs) => {
        setEditValues((prevValues) => ({
          ...prevValues,
          media: [...(prevValues?.media || []), ...imageURLs], // Provide a default empty array if prevValues?.media is null
        }));
      })
      .catch((error) => {
        // Handle errors that might occur during Promise.all
        console.error("Error uploading files:", error);
      });
  };

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          event_id: parseInt(id),
          flag: eventScheduled,
        },
        agent: "event",
        function: "view_event",
      }).then((response) => {
        console.log("Past Event Details ", response?.data?.data?.data);
        setEventDetails(response?.data?.data?.data);
        setFaq(response?.data?.data?.data?.event_register_event_data);
        setEditValues({
          ...editValues,
          testimonial: response?.data?.data?.data?.testimonial,
          media: response?.data?.data?.data?.media,
        });
        setShowImage(response?.data?.data?.data?.media);
        setTotalSeat(response?.data?.data?.data?.seat);
        setValues([
          {
            label: "Not Attended",
            value: response?.data?.data?.data?.user_event_not_attend_count,
            color: "#C0C0C0",
          },
          {
            label: "Attended",
            value: response?.data?.data?.data?.user_event_attend_count,
            color: "#008DF7",
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const MultiCircularProgressBar = ({ values, seat }) => {
    const labels = values.map((item) => item.label);
    const data = values.map((item) => item.value);
    const color = values.map((item) => item.color);
    //  const totalCount = values.reduce(
    //    (acc, curr) => acc + parseInt(curr.value),
    //    0
    //  );

    return (
      <div className="row">
        <div className="col-7">
          <CChart
            type="doughnut"
            data={{
              labels: labels,

              datasets: [
                {
                  backgroundColor: color,
                  data: data,
                },
              ],
            }}
            options={{
              aspectRatio: 1.5,
              plugins: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </div>
        <div className="col-5">
          {/* <div>Total Seat: {seat}</div>
               <div>Not attended: 50</div>
               <div>Attended: 250</div> */}

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckDefault"
              style={{ border: "1px solid #C0C0C0" }}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Total Seat: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {eventDetails?.user_event_attend_count +
                eventDetails?.user_event_not_attend_count}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckChecked"
              style={{ backgroundColor: "#DBDBFE", border: "0", opacity: "1" }}
              disabled
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckChecked"
              style={{ opacity: "1" }}
            >
              Not attended: &nbsp; &nbsp; &nbsp;{" "}
              {eventDetails?.user_event_not_attend_count}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckChecked1"
              style={{ backgroundColor: "#008DF7", border: "0", opacity: "1" }}
              disabled
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckChecked1"
              style={{ opacity: "1" }}
            >
              Attended: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {eventDetails?.user_event_attend_count}
            </label>
          </div>

          <div className="text-center mt-2">
            <NavLink
              //  to="/events/past-online-event-details/:eventType/:eventScheduled/:status/:id"
              state={{
                PastOnlineEventDetails_Tab: "attended",
              }}
              to={`../${AdminRoute?.Events?.PastOnlineEventDetails?.replace(
                ":eventType",
                eventType
              )
                .replace(":eventScheduled", eventScheduled)
                .replace(":status", status)
                .replace(":id", id)}`}
              className="textlightBlue"
            >
              View Details
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  // function for save updated event details
  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(editValues));
    setIsSubmit(true);
  };

  // Function to copy text content of the div to clipboard
  const copyTextToClipboard = () => {
    if (divRef.current) {
      const textToCopy = divRef.current.textContent;
      navigator.clipboard.writeText(textToCopy);
      toast.success("Link Copied successfully");
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("editValues", editValues);
      setLoading(true);
      try {
        API?.CommanApiCall({
          data: {
            event_id: id,
            media: editValues?.media,
            testimonial: editValues?.testimonial,
            flag: eventScheduled,
          },
          agent: "event",
          function: "update_event",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            setTimeout(() => {
              setLoading(false);
              setEdit(false);
              // navigate(-1);
            }, 1500);
          } else if (response?.data?.data?.status === 201) {
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

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
              <a
                onClick={() => {
                  if (edit) {
                    setEdit(false);
                  } else {
                    navigate("/events");
                  }
                }}
                // to="/events"
                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </a>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                {edit ? "Edit" : null} Past Event Details
              </h4>
            </div>

            <div className="col-6 pe-0">
              <div className="col-12 d-flex justify-content-end">
                <div className="saveBtn">
                  {edit ? (
                    <span
                      onClick={() => {
                        setEdit(false);
                      }}
                      disabled={loading}
                      type="button"
                      className="btn btn-reject me-3 px-4"
                    >
                      <span className="">Cancel</span>
                    </span>
                  ) : null}

                  {TajurbaAdmin_priviledge_data &&
                  TajurbaAdmin_priviledge_data.some(
                    (ele) => ele.title === "Events" && ele.is_edit === true
                  ) ? (
                    <span
                      disabled={loading}
                      onClick={(e) => {
                        if (!edit) {
                          setEdit(true);
                        } else {
                          handleSave(e);
                        }
                      }}
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
                        {edit ? "Save" : "Edit"}
                      </span>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <form>
              <div className="row justify-content-between main-card p-4">
                <div className="col-xl-6 border-right-custom">
                  <div className="me-xl-5">
                    {/* content title */}

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Details
                        </label>
                        <div>
                          <img
                            src={eventDetails && eventDetails?.image}
                            className="img-fluid"
                            style={{ height: "250px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Session Name
                        </label>
                        <p className="textStyle mb-0">
                          {eventDetails && eventDetails?.name}
                        </p>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Set start and end date
                        </label>

                        <div className="row align-items-center">
                          <div className="col-5">
                            <p className="textStyle mb-0">
                              {moment(
                                eventDetails && eventDetails?.start_date
                              ).format("DD-MM-YYYY")}
                            </p>
                          </div>
                          <div className="col-2 text-center">
                            <p className="mb-0">To</p>
                          </div>
                          <div className="col-5">
                            <p className="textStyle mb-0">
                              {" "}
                              {moment(
                                eventDetails && eventDetails?.end_date
                              ).format("DD-MM-YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Enter Session Amount
                        </label>
                        <p className="textStyle mb-0">
                          {eventDetails && eventDetails?.amount} /-
                        </p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Joining Link
                        </label>
                        <div className="position-relative" ref={divRef}>
                          <p className="textStyle mb-0">
                            {eventDetails && eventDetails?.join_link}
                          </p>
                          <i
                            onClick={copyTextToClipboard}
                            className="fa fa-regular fa-copy copyIcon"
                          ></i>
                        </div>
                      </div>
                    </div>
                    {/* Accordian for Faq  */}
                    <div className="row">
                      <label className="form-label greyLight">FAQ</label>
                      <div className="col-12 scroll__y">
                        <div className="accordion" id="accordionExample">
                          <>
                            {faq &&
                              faq?.map((ele, index) => {
                                const isAccordionActive =
                                  index === activeAccordion;
                                return (
                                  <div
                                    key={index}
                                    className={
                                      index < 1
                                        ? "accordion-item border-0"
                                        : "accordion-item border-0 mt-3"
                                    }
                                  >
                                    <h2
                                      className="accordion-header"
                                      id={`heading${index + 1}`}
                                    >
                                      <button
                                        className={`accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none ${
                                          isAccordionActive ? "" : "collapsed"
                                        }`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index + 1}`}
                                        aria-expanded="true"
                                        aria-controls={`collapse${index + 1}`}
                                      >
                                        <div className="d-flex align-items-center">
                                          <div className="bgCheckIcon rounded-circle me-2">
                                            <i className="fa fa-light fa-check"></i>
                                          </div>
                                          <p className="mb-0 fw-bold">
                                            {index + 1}. {ele?.question}
                                          </p>
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id={`collapse${index + 1}`}
                                      className={`accordion-collapse collapse ${
                                        isAccordionActive ? "show" : ""
                                      }`}
                                      aria-labelledby={`heading${index + 1}`}
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="verseText d-flex">
                                          <div className="accordion-body">
                                            <p className="darkGrey">
                                              {ele?.answer}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 ">
                  <div className="ms-xl-5 pe-xxl-4">
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label greyLight">
                          Total Ticket Sold
                        </label>
                        <h2 className="darkGrey fw-bold mt-2">
                          {eventDetails && eventDetails?.sold_ticket_count}
                        </h2>
                      </div>
                      <div className="col-6">
                        <label className="form-label greyLight">
                          Total Amount Received
                        </label>
                        <h2 className="darkGrey fw-bold mt-2">
                          Rs {eventDetails && eventDetails?.sold_ticket_amount}
                          /-
                        </h2>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Analytics
                        </label>
                        {/* <br /> */}
                        <MultiCircularProgressBar
                          values={values}
                          seat={totalSeat}
                        />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <></>
                      {/* {!edit ? ( */}
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Upload Event Media
                        </label>
                        <br />
                        <a
                          className="btn btn-upload border-radius-5 py-2 position-relative w-80"
                          id=""
                          style={{ border: "1px dashed #C0C0C0" }}
                        >
                          <i className="fa-solid fa-arrow-up-from-bracket gray"></i>
                          <span className="ms-2 gray">Bulk upload</span>
                        </a>
                        <br />
                        <small className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Enter png/jpeg files only
                        </small>
                        {/* 
                            {showImage && showImage.length > 0 && (
                              <div className="gallery">
                                {showImage.map((ele, index) => (
                                  <img
                                    key={index}
                                    src={ele}
                                    alt={`Image ${index}`}
                                    className="gallery-image"
                                  />
                                ))}
                              </div>
                            )} */}
                      </div>
                      {/* ) : ( */}
                      <div className="col-12 mt-3">
                        <label className="form-label greyLight mb-0">
                          Event Media
                        </label>
                        <br />
                        <small className="mb-1 darkGrey">
                          Click to view all the photos at once
                        </small>
                        <br />

                        <button
                          type="button"
                          className="btn btn orangrBg border-radius-5 py-2 position-relative w-80 mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          {edit ? editValues?.media?.length : showImage?.length}{" "}
                          Photos
                        </button>
                        {/* Modal */}
                        <div
                          className="modal galleryModal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered bg-transparent">
                            <div className="modal-content p-2 border-0">
                              <div className="modal-body">
                                <div className="modal-header border-0 pt-0">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>

                                <div>
                                  <p className="darkGrey fw-bold">
                                    Total Photos:
                                    <span className="textlightBlue">
                                      {" "}
                                      {editValues?.media?.length}
                                    </span>
                                  </p>
                                  <div className="galleryTable">
                                    {editValues &&
                                      editValues?.media?.map((ele, index) => {
                                        return (
                                          <span
                                            key={index}
                                            className="position-relative me-2"
                                          >
                                            <img
                                              src={ele}
                                              className="galleryphotoWidth mb-2"
                                            />
                                            {edit ? (
                                              <i
                                                onClick={() =>
                                                  removePhoto(index)
                                                }
                                                className="fa fa-solid fa-xmark btnClose"
                                              ></i>
                                            ) : null}
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                                {edit ? (
                                  <div className="d-flex justify-content-end">
                                    <button type="submit">
                                      <input
                                        type="file"
                                        className="btn bgBlack text-white border-radius-5 px-4 mt-3"
                                        id="customFile"
                                        name="filename"
                                        multiple
                                        // multiple="multiple"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                      />
                                      <span>+ Upload Media</span>
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                      {/* )} */}
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Testimonials
                        </label>
                        <div className="position-relative">
                          <input
                            type="url"
                            disabled={!edit}
                            name="testimonial"
                            value={editValues?.testimonial}
                            onChange={handleChange}
                            class="form-control bg-white w-80"
                            placeholder="enter testimonials link"
                          />
                          {edit ? (
                            <p className="text-danger">
                              {formErrors?.testimonial}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
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
};

export default PastEventDetails;
