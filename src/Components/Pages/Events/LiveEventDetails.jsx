/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import EventDetailsImg from "../../../assets/images/sureshsir.png";
import API from "../../../Api/Api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import AdminRoute from "../../../Route/RouteDetails";
import { useFormik } from "formik";

const LiveEventDetails = () => {
  const { eventType, eventScheduled, status, id } = useParams();

  const [eventDetails, setEventDetails] = useState();
  const [loading, setLoading] = useState(false);

  const [textContent, setTextContent] = useState("");
  const divRef = useRef(null);
  const navigate = useNavigate();

  const [editValues, setEditValues] = useState({
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });

  const [edit, setEdit] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [faq, setFaq] = useState([]);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const validate = (values) => {
    //  console.log(values, "value");
    const errors = {};
    const startDate = new Date(values.start_date);
    const endDate = new Date(values.end_date);
    const startTime = values.start_time;
    const endTime = values.end_time;
    console.log("start_time", values?.start_time);

    // if (!values.name) {
    //   errors.name = "Please enter event name";
    // } else if (values.name.trim() === "") {
    //   errors.name = "event name cannot be blank";
    // }
    // else if (/[^a-zA-Z\s]/.test(values.name)) {
    //   errors.name =
    //     "Numbers and Special characters are not accepted in this field.";
    // }
    // if (!values.description) {
    //   errors.description = "Please enter description";
    // } else if (values.description.trim() === "") {
    //   errors.description = "Description cannot be blank";
    // }
    // if (!values.hosted_by) {
    //   errors.hosted_by = "Please enter hosts name";
    // } else if (values.hosted_by.trim() === "") {
    //   errors.hosted_by = "Host name cannot be blank";
    // }
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
    // if (!values.amount) {
    //   errors.amount = "Please enter amount";
    // }
    // if (!values.seat) {
    //   errors.seat = "Please enter seat";
    // }
    // if (!values.image) {
    //   errors.image = "Please upload Image";
    // }
    // if (eventType === "Online") {
    //   if (!values.join_link) {
    //     errors.join_link = "Please enter joinning link";
    //   } else if (values.join_link.trim() === "") {
    //     errors.join_link = "joinning link cannot be blank";
    //   }
    // }
    // if (eventType === "Offline") {
    //   if (!values.address) {
    //     errors.address = "Please enter address";
    //   } else if (values.address.trim() === "") {
    //     errors.address = "address cannot be blank";
    //   }
    // }

    console.log("Errors", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      // name: "",
      // description: "",
      // hosted_by: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      // amount: "",
      // seat: "",
      // image: "",
      // type: eventType,
      // ...(eventType === "Online" ? { join_link: "" } : { address: "" }),
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

  // Function for Save Event Changes
  const handleSave = () => {
    // SetErrorMessage("");
    setLoading(true);
    const { start_time, end_time, start_date, end_date, ...rest } =
      formik.values;
    console.log("start_time", start_time);
    console.log("end_time", end_time);
    console.log("start_date", start_date);
    console.log("end_date", end_date);

    // Update start_date and end_date based on start_time and end_time
    const startDate = new Date(
      new Date(start_date).toISOString().split("T")[0] +
        "T" +
        start_time +
        ":00"
    );
    const endDate = new Date(
      new Date(end_date).toISOString().split("T")[0] + "T" + end_time + ":00"
    );
    // Convert dates to ISO string format
    rest.start_date = startDate.toISOString();
    rest.end_date = endDate.toISOString();

    // Remove start_time and end_time keys
    delete rest.start_time;
    delete rest.end_time;

    try {
      API?.CommanApiCall({
        data: {
          start_date: rest?.start_date,
          end_date: rest?.end_date,
          event_id: parseInt(id),
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
            getEventDetsils();
            // navigate("/events/create-FAQ/:id");
            // navigate(
            //   `../${AdminRoute?.Events?.CreateFAQ?.replace(
            //     ":id",
            //     response?.data?.data?.data?.event_id
            //   )}`
            // );
          }, 1000);
        } else if (response?.data?.data?.status === 201) {
          // SetErrorMessage(response?.data?.data?.message);

          setTimeout(() => {
            // SetErrorMessage("");
          }, 5000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Api call for get event details
  const getEventDetsils = () => {
    try {
      API?.CommanApiCall({
        data: {
          event_id: parseInt(id),
          flag: eventScheduled,
        },
        agent: "event",
        function: "view_event",
      }).then((response) => {
        console.log("Event Details ", response?.data?.data?.data);
        setEventDetails(response?.data?.data?.data);
        setFaq(response?.data?.data?.data?.event_register_event_data);
        formik.setValues({
          ...formik.values,
          start_date: response?.data?.data?.data?.start_date,
          end_date: response?.data?.data?.data?.end_date,
          // start_time: response?.data?.data?.data?.start_date,
          start_time: moment(response?.data?.data?.data?.start_date).format(
            "HH:mm"
          ),
          end_time: moment(response?.data?.data?.data?.end_date).format(
            "HH:mm"
          ),
        });
        setEditValues((prevState) => ({
          ...prevState,
          start_date: response?.data?.data?.data?.start_date,
          end_date: response?.data?.data?.data?.end_date,
          start_time: response?.data?.data?.data?.start_date,
          end_time: response?.data?.data?.data?.end_date,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventDetsils();
  }, []);

  // Function to copy text content of the div to clipboard
  const copyTextToClipboard = () => {
    if (divRef.current) {
      const textToCopy = divRef.current.textContent;
      navigator.clipboard.writeText(textToCopy);
      toast.success("Link Copied successfully");
    }
  };

  const formatDate = (isoDate, formatfor) => {
    // Parse ISO date string
    const date = new Date(isoDate);

    // Format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Format as HH:MM
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (formatfor === "date") {
      return `${year}-${month}-${day}`;
    } else {
      return `${hours}:${minutes}`;
    }
  };

  // Function for update the fields
  const handleChangeValues = (fieldName, value) => {
    let newValue = value; // Keep the value as it is for other fields
    if (fieldName.includes("time")) {
      // If the field is a time field, construct a valid ISO string
      const [hours, minutes] = value.split(":");
      const currentDate = new Date();
      currentDate.setHours(parseInt(hours, 10));
      currentDate.setMinutes(parseInt(minutes, 10));
      newValue = currentDate.toISOString();
    }

    if (fieldName === "end_date") {
      // Check if end_date is greater than start_date
      const startDate = new Date(editValues.start_date);
      const endDate = new Date(value);
      if (endDate < startDate) {
        // Reset end_date value if it's greater than start_date
        newValue = ""; // or any default value you prefer
      }
    }

    setEditValues((prevValues) => ({
      ...prevValues,
      [fieldName]: newValue,
    }));
  };

  // function for select start date
  const handleStartDateChange = (date) => {
    formik.setFieldValue("start_date", date);
    // Reset end_date if it's before the selected start date
    if (formik.values.end_date < date) {
      formik.setFieldValue("end_date", "");
    }
  };

  // Function for delete the Event
  const handleDeleteEvent = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          is_deleted: true,
          event_id: parseInt(id),
        },
        agent: "event",
        function: "update_event",
      }).then((response) => {
        // console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          window.$("#exampleModal").modal("hide");
          navigate(`/${AdminRoute?.Events?.Events}`);
          //toast.success(response?.data?.data?.message);
        }
      });
    } catch (error) {
      console.log(error);
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
                style={{ cursor: "pointer" }}
                className="w-auto float-start pe-1 textBlack"
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </a>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                {edit ? "Edit" : "Scheduled"} Event Details
              </h4>
            </div>

            {status === "Live" ? null : (
              <div className="col-6 pe-0">
                {TajurbaAdmin_priviledge_data &&
                TajurbaAdmin_priviledge_data.some(
                  (ele) => ele.title === "Events" && ele.is_edit === true
                ) ? (
                  <div className="col-12 d-flex justify-content-end">
                    <div className="cancelBtn">
                      {!edit ? (
                        <button
                          type="button"
                          className="btn btn-reject me-3 px-4"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <span className="">Delete</span>
                        </button>
                      ) : null}
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content border-radius-5 border-top-model-black">
                            <div className="modal-header border-0">
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body py-5 text-center">
                              <h3 className="fw-bold">
                                Are you sure you want to delete this event?
                              </h3>
                              <h5 className="mt-3">
                                Deleting this event requires refunding the
                                enrolled users.
                              </h5>
                              <div className="col-12 mt-4">
                                <div className="d-flex justify-content-center">
                                  <div className="cancelBtn">
                                    <NavLink
                                      disabled={loading}
                                      onClick={() => {
                                        window.$("#exampleModal").modal("hide");
                                      }}
                                      className="btn btn-reject me-3 px-4 border-radius-5"
                                    >
                                      <span className="">Cancel</span>
                                    </NavLink>
                                  </div>

                                  <div className="saveBtn ms-2">
                                    <NavLink
                                      disabled={loading}
                                      onClick={(e) => {
                                        handleDeleteEvent(e);
                                      }}
                                      className="btn bgBlack text-white border-radius-5 px-4 float-end"
                                    >
                                      <span>Confirm</span>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="saveBtn">
                      <button
                        type="submit"
                        disabled={loading}
                        onClick={() => {
                          if (!edit) {
                            setEdit(true);
                          } else {
                            // handleSave();
                            formik.handleSubmit();
                          }
                        }}
                        className="btn bgBlack text-white border-radius-2 px-4 float-end"
                      >
                        <span>
                          {" "}
                          {loading && (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          {edit ? "Save" : "Edit"}
                        </span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="row" id="createContent">
            <form className="main-card p-4" onSubmit={formik.handleSubmit}>
              <div className="row justify-content-between ">
                <div className="col-xl-6 col-lg-6">
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
                    {/* <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label greyLight">
                            Total Ticket Sold
                          </label>
                          <p className="textStyle mb-0">
                            {eventDetails && eventDetails?.sold_ticket_count}
                          </p>
                        </div>
                      </div> */}
                    {/* <div className="row">
                        <div className="col-12">
                          <label className="form-label greyLight">
                            Total Amount Received
                          </label>
                          <p className="textStyle">Rs 60,000/-</p>
                        </div>
                      </div> */}
                    {status === "Scheduled" ? (
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Total number of feedbacks/queries
                        </label>

                        <div className="position-relative">
                          <p className="textStyle mb-0  d-flex justify-content-between">
                            <span>07</span>
                            <NavLink
                              to={`../${AdminRoute?.Events?.ScheduledEventFeedbacks?.replace(
                                ":eventType",
                                eventType
                              )
                                .replace(":eventScheduled", eventScheduled)
                                .replace(":status", status)
                                .replace(":id", id)}`}
                              // to="/events/scheduled-event-feedbacks/:eventType/:eventScheduled/:status/:id"
                              className="textlightBlue "
                            >
                              View More
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Name
                        </label>
                        <p className="textStyle mb-0">
                          {eventDetails && eventDetails?.name}
                        </p>
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-5">
                        <label className="form-label greyLight">
                          Start Date
                        </label>
                        {!edit ? (
                          <p className="textStyle mb-0">
                            {moment(editValues?.start_date).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        ) : (
                          <>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Enter date"
                              name="start_date"
                              min={moment().format("YYYY-MM-DD")}
                              value={moment(formik.values.start_date).format(
                                "YYYY-MM-DD"
                              )}
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
                          </>
                        )}
                      </div>
                      <div className="col-2 text-center">
                        <p className="mb-0 mt-4">To</p>
                      </div>
                      <div className="col-5">
                        <label className="form-label greyLight">End Date</label>
                        {!edit ? (
                          <p className="textStyle mb-0">
                            {moment(editValues?.end_date).format("DD-MM-YYYY")}
                          </p>
                        ) : (
                          <>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Enter date"
                              name="end_date"
                              disabled={!formik.values.start_date}
                              min={formik.values.start_date} // Ensure end date cannot be before start date
                              value={moment(formik.values.end_date).format(
                                "YYYY-MM-DD"
                              )}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.end_date &&
                            formik.touched.end_date ? (
                              <div className="text-danger">
                                {formik.errors.end_date}
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-5">
                        <label className="form-label greyLight">
                          Start Time
                        </label>
                        {!edit ? (
                          <p className="textStyle mb-0">
                            {moment(editValues?.start_time).format("h:mm A")}
                          </p>
                        ) : (
                          <>
                            <input
                              type="time"
                              className="form-control"
                              placeholder="HH:MM"
                              name="start_time"
                              value={formik.values.start_time} // Format to HH:mm
                              // value={moment(formik.values.start_time).format(
                              //   "HH:mm"
                              // )}
                              // onChange={formik.handleChange}

                              onChange={(event) => {
                                formik.handleChange(event);
                              }}
                            />
                            {formik.errors.start_time &&
                            formik.touched.start_time ? (
                              <div className="mr-2 text-danger">
                                {formik.errors.start_time}
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                      <div className="col-2 text-center">
                        <p className="mb-0 mt-4">To</p>
                      </div>
                      <div className="col-5">
                        <label className="form-label greyLight">End Time</label>
                        {!edit ? (
                          <p className="textStyle mb-0">
                            {moment(editValues?.end_time).format("h:mm A")}
                          </p>
                        ) : (
                          <>
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
                              // value={moment(formik.values.end_time).format(
                              //   "HH:mm"
                              // )}
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
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-8">
                        <label className="form-label greyLight">
                          No. of Seat Limit
                        </label>
                        <p className="textStyle mb-0">
                          {eventDetails && eventDetails?.seat}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-8">
                        <label className="form-label greyLight">
                          Event Amount
                        </label>
                        <p className="textStyle mb-0">
                          {eventDetails && eventDetails?.amount} /-
                        </p>
                      </div>
                    </div>
                    {eventType === "Online" ? (
                      <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label greyLight">
                            Joining Link
                          </label>
                          <div
                            ref={divRef}
                            onClick={copyTextToClipboard}
                            className="position-relative"
                          >
                            <p className="textStyle mb-0">
                              {eventDetails && eventDetails?.join_link}
                            </p>
                            <i className="fa fa-regular fa-copy copyIcon"></i>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label greyLight">
                            Event Location
                          </label>
                          <p className="textStyle pb-5">
                            {eventDetails && eventDetails?.address}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    {/* <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label greyLight">
                            Registeration Form Link
                          </label>
                          <div className="position-relative">
                            <p className="textStyle mb-0">
                              http://sample.info/?insect=fireman&porter=attraction#cave
                            </p>
                            <i className="fa fa-regular fa-copy copyIcon"></i>
                          </div>
                        </div>
                      </div> */}
                    <div className="row mb-3">
                      {/* <div className="col-12">
                          <label className="form-label greyLight">
                            Total Ticket Sold
                          </label>
                          <p className="textStyle mb-0">
                            {eventDetails && eventDetails?.sold_ticket_count}
                          </p>
                        </div> */}
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Total Ticket Sold
                        </label>

                        <div className="position-relative">
                          <p className="textStyle mb-0  d-flex justify-content-between">
                            <span>
                              {eventDetails && eventDetails?.sold_ticket_count}
                            </span>
                            {status === "Scheduled" ? (
                              <NavLink
                                to={`../${AdminRoute?.Events?.TicketSoldEventDetails?.replace(
                                  ":eventType",
                                  eventType
                                )
                                  .replace(":eventScheduled", eventScheduled)
                                  .replace(":status", status)
                                  .replace(":id", id)}`}
                                //to="/events/ticket-sold-event-details"
                                className="textlightBlue "
                              >
                                View More
                              </NavLink>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label greyLight">
                        Remaining Seat
                      </label>
                      <p className="textStyle mb-0">
                        {eventDetails && eventDetails?.remaining_ticket_count}
                      </p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label greyLight">
                        Total Amount Received
                      </label>
                      <p className="textStyle mb-0">
                        Rs {eventDetails && eventDetails?.sold_ticket_amount}
                        /-
                      </p>
                    </div>
                  </div>
                </div>
                {/* Accordian for Faq  */}
                <div className="row">
                  <label className="form-label greyLight">FAQ Questions</label>
                  <div className="col-6 scroll__y">
                    <div className="accordion" id="accordionExampleFAQ">
                      <>
                        {faq &&
                          faq?.map((ele, index) => {
                            const isAccordionActive = index === activeAccordion;
                            return (
                              <div
                                key={index}
                                className={
                                  index < 1
                                    ? "accordion-item form-control"
                                    : "accordion-item form-control mt-3"
                                }
                              >
                                <h2
                                  className="accordion-header"
                                  id={`heading${index + 1}`}
                                >
                                  <button
                                    className={`bg-transparent accordion-button border-radius-2 py-2 px-3 shadow-none align-items-start ${
                                      isAccordionActive ? "" : "collapsed"
                                    }`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index + 1}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse${index + 1}`}
                                  >
                                    <h6 className="mb-0 me-2">
                                      {index + 1}. {ele?.question}
                                    </h6>
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
                                  <div className="accordion-body p-0">
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
            </form>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default LiveEventDetails;
