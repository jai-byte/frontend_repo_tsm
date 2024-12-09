/* eslint-disable */
import React from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import EventDetailsImg from "../../../assets/images/sureshsir.png";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const EditPastEventDetails = () => {
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
                to="/past-event-details"
                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </a>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Edit Past Event Details
              </h4>
            </div>

            <div className="col-6 pe-0">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  {/* <NavLink to="/events" className="btn btn-reject me-3 px-4">
                                 <span className="">Delete</span>
                              </NavLink> */}

                  {/* Button trigger modal */}
                  <NavLink
                    to="/past-event-details"
                    type="button"
                    className="btn btn-reject me-3 px-4"
                  >
                    <span className="">Cancel</span>
                  </NavLink>
                </div>
                <div className="saveBtn">
                  <NavLink className="btn bgBlack text-white border-radius-2 px-4 float-end">
                    <span className="">Save</span>
                  </NavLink>
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
                          Session Name
                        </label>
                        <p className="textStyle mb-0 disable">
                          Become Limitless
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
                            <p className="textStyle mb-0 disable">04-11-2023</p>
                          </div>
                          <div className="col-2 text-center">
                            <p className="mb-0 disable">To</p>
                          </div>
                          <div className="col-5">
                            <p className="textStyle mb-0 disable">04-11-2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Enter Session Amount
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
                  </div>
                </div>

                <div className="col-xl-6 ">
                  <div className="ms-xl-5 pe-xl-5">
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label greyLight">
                          Total Ticket Sold
                        </label>
                        <h2 className="disable fw-bold mt-2">300</h2>
                      </div>
                      <div className="col-6">
                        <label className="form-label greyLight">
                          Total Amount Received
                        </label>
                        <h2 className="disable fw-bold mt-2">Rs 60,000/-</h2>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Analytics
                        </label>
                        <br />
                        <CircularProgressbar
                          // key={animationKey}
                          value="50"
                          text=""
                          strokeWidth={20}
                          styles={buildStyles({
                            rotation: 0.0,
                            strokeLinecap: "button",
                            textSize: "10px",
                            className: "bold-text",
                            pathTransitionDuration: 0.5,
                            pathColor: `#008DF7`,
                            textColor: "#6993ff",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",
                          })}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Media
                        </label>
                        <div className="position-relative">
                          <input
                            type="url"
                            class="form-control bg-white w-80"
                            placeholder="loremipsum.zip"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="form-label greyLight">
                          Event Testimonials
                        </label>
                        <div className="position-relative">
                          <input
                            type="url"
                            class="form-control bg-white w-80"
                            placeholder="https//www.youtube.com.jngierdhfvwkfbek2ce.com..."
                            disabled
                          />
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

export default EditPastEventDetails;
