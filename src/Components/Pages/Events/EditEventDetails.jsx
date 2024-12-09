/* eslint-disable */
import React from "react";
import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import EventDetailsImg from "../../../assets/images/sureshsir.png";

const EditEventDetails = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row mb-3">
            <div className="col-6 row d-flex align-items-center">
              <a
                to="/events"
                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </a>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Edit Event Details
              </h4>
            </div>

            <div className="col-6 pe-0">
              <div className="col-12">
                <div className="saveBtn">
                  {/* Button trigger modal */}
                  <button
                    type="button"
                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <span className="">Save</span>
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
                            Are you sure you want to make these changes?
                          </h3>
                          <h5 className="mt-3">
                            Changes once saved will be notified to all the users
                            who have enrolled for the event
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
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <form>
              <div className="row justify-content-between main-card p-4">
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
                          Total Ticket Sold
                        </label>
                        <p className="textStyle disable mb-0 ">300</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Total Amount Received
                        </label>
                        <p className="textStyle disable">Rs 60,000/-</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Name
                        </label>
                        <p className="textStyle mb-0 disable">
                          Become Limitless
                        </p>
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-5">
                        <label className="form-label greyLight">
                          Start Date
                        </label>
                        <p className="textStyle mb-0">04-11-2023</p>
                      </div>
                      <div className="col-2 text-center">
                        <p className="mb-0 mt-4">To</p>
                      </div>
                      <div className="col-5">
                        <label className="form-label greyLight">End Date</label>
                        <p className="textStyle mb-0">04-11-2023</p>
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-5">
                        <label className="form-label greyLight">
                          Start Time
                        </label>
                        <p className="textStyle mb-0">11:00 AM</p>
                      </div>
                      <div className="col-2 text-center">
                        <p className="mb-0 mt-4">To</p>
                      </div>
                      <div className="col-5">
                        <label className="form-label greyLight">End Time</label>
                        <p className="textStyle mb-0">04-11-2023</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-8">
                        <label className="form-label greyLight">
                          No. of Seat Limit
                        </label>
                        <p className="textStyle mb-0 disable">500</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-8">
                        <label className="form-label greyLight">
                          Event Amount
                        </label>
                        <p className="textStyle mb-0 disable">8000./-</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Joining Link
                        </label>
                        <div className="position-relative">
                          <p className="textStyle mb-0 disable">
                            http:jngierdhfvwkfbek2ce245792364.com...
                          </p>
                          <i className="fa fa-regular fa-copy copyIcon"></i>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                                    <div className="col-12">
                                       <label className="form-label greyLight">Event Location</label>

                                       <p className="textStyle pb-5">
                                          2nd floor, Hashtag one, Maan Rd, near Wipro Circle, Phase 1, Hinjawadi Rajiv Gandhi
                                          Infotech Park, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411045
                                       </p>
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
};

export default EditEventDetails;
