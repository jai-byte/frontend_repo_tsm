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

const ScheduledEventDetails = () => {
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
                // to="/events"
                style={{ cursor: "pointer" }}
                className="w-auto float-start pe-1 textBlack"
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </a>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Scheduled Event Details
              </h4>
            </div>
            <div className="col-6 pe-0">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <button
                    type="button"
                    className="btn btn-reject me-3 px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <span className="">Delete</span>
                  </button>
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content p-5 border-radius-5 border-top-model-black">
                        <div className="modal-body text-center">
                          <h3 className="fw-bold">
                            Are you sure you want to delete this event?
                          </h3>
                          <h5 className="mt-3">
                            Deleting this event requires refunding the enrolled
                            users.
                          </h5>
                          <div className="col-12 mt-4">
                            <div className="d-flex justify-content-center">
                              <div className="cancelBtn">
                                <NavLink className="btn btn-reject me-3 px-4 border-radius-5">
                                  <span className="">Cancel</span>
                                </NavLink>
                              </div>

                              <div className="saveBtn ms-2">
                                <NavLink className="btn bgBlack text-white border-radius-5 px-4 float-end">
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
                  <button className="btn bgBlack text-white border-radius-2 px-4 float-end">
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <form className="main-card p-4">
              <div className="row">
                <div className="col-12">
                  <label className="form-label greyLight font-size-14 fw-bold">
                    Event Details
                  </label>
                </div>
              </div>
              <div className="row justify-content-between ">
                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    {/* content title */}

                    <div className="row mb-3">
                      <div className="col-12">
                        <div>
                          <img
                            src={EventDetailsImg}
                            className="img-fluid"
                            style={{ height: "250px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Total number of feedbacks/queries
                        </label>

                        <div className="position-relative">
                          <p className="textStyle mb-0  d-flex justify-content-between">
                            <span>07</span>
                            <NavLink
                              to="/events/scheduled-event-feedbacks"
                              className="textlightBlue "
                            >
                              View More
                            </NavLink>
                          </p>
                          {/* <i className="fa fa-regular fa-copy copyIcon"></i> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                                    <div className="col-12">
                                       <label className="form-label greyLight">Total Amount Received</label>
                                       <p className="textStyle">Rs 60,000/-</p>
                                    </div>
                                 </div> */}
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Name
                        </label>
                        <p className="textStyle mb-0">Delhi Conference</p>
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-5">
                        <label className="form-label greyLight">
                          Start Date
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter date"
                          name="start_date"

                          //  value={formatDate(editValues.start_date, "date")}
                          //  onChange={(e) => handleChangeValues("start_date", e.target.value)}
                        />
                      </div>
                      <div className="col-2 text-center">
                        <p className="mb-0 mt-4">To</p>
                      </div>
                      <div className="col-5">
                        <label className="form-label greyLight">End Date</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter date"
                          name="end_date"
                        />
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-5">
                        <label className="form-label greyLight">
                          Start Time
                        </label>

                        <input
                          type="time"
                          className="form-control"
                          placeholder="HH:MM"
                          name="start_time"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <p className="mb-0 mt-4">To</p>
                      </div>
                      <div className="col-5">
                        <label className="form-label greyLight">End Time</label>

                        <input
                          type="time"
                          className="form-control"
                          placeholder="HH:MM"
                          name="end_time"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label greyLight">
                          No. of Seat Limit
                        </label>
                        <p className="textStyle mb-0">500</p>
                      </div>
                      <div className="col-6">
                        <label className="form-label greyLight">
                          Event Amount
                        </label>
                        <p className="textStyle mb-0">2000./-</p>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Joining Link
                        </label>
                        <div className="position-relative">
                          <p className="textStyle mb-0">regwgwg</p>
                          <i className="fa fa-regular fa-copy copyIcon"></i>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                                    <div className="col-12">
                                       <label className="form-label greyLight">Event Location</label>

                                       <p className="textStyle pb-5">rgeg</p>
                                    </div>
                                 </div> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  {/* <p className="darkGrey font">Registration Details</p> */}
                  <label class="form-label greyLight mb-3 font-size-14 fw-bold">
                    Registration Details
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Registration Form Link
                        </label>
                        <div className="position-relative">
                          <p className="textStyle mb-0">
                            http://sample.info/?insect=fireman&porter=attraction#cave
                          </p>
                          {/* <i className="fa fa-regular fa-copy copyIcon"></i> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                                    <div className="col-12">
                                       <label className="form-label greyLight">Total Ticket Sold</label>
                                       <p className="textStyle mb-0">200</p>
                                    </div>
                                 </div> */}
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Total Ticket Sold
                        </label>

                        <div className="position-relative">
                          <p className="textStyle mb-0  d-flex justify-content-between">
                            <span>07</span>
                            <NavLink
                              to="/events/ticket-sold-event-details"
                              className="textlightBlue "
                            >
                              View More
                            </NavLink>
                          </p>
                          {/* <i className="fa fa-regular fa-copy copyIcon"></i> */}
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
                      <p className="textStyle mb-0">475</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label greyLight">
                        Total Amount Received Till Now
                      </label>
                      <p className="textStyle mb-0">Rs 50,000/-</p>
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

export default ScheduledEventDetails;
