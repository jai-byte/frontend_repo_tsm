/* eslint-disable */
import React from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";

const OfflineEvents = () => {
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
                Create New Offline Event
              </h4>
            </div>

            <div className="col-6 pe-0">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <NavLink to="/events" className="btn btn-reject me-3 px-4">
                    <span className="">Cancel</span>
                  </NavLink>
                </div>
                <div className="saveBtn">
                  <NavLink
                    to=""
                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                  >
                    <span className="">Save</span>
                  </NavLink>
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
                        <label className="form-label">Event Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Session name"
                          id="Title"
                          name="name"
                        />
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
                          name="name"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label"> Event Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Enter event description in short......"
                          id="Title"
                          name="description"
                          rows={4}
                          // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Set
                          start date and time
                        </label>
                        <div className="d-flex align-items-center">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter date"
                            name="author_name"
                          />
                          <p className="mb-0 px-5">To</p>
                          <input
                            type="time"
                            className="form-control"
                            placeholder="HH:MM"
                            name="author_name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Set end
                          date and time
                        </label>
                        <div className="d-flex align-items-center">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter date"
                            name="author_name"
                          />
                          <p className="mb-0 px-5">To</p>
                          <input
                            type="time"
                            className="form-control"
                            placeholder="HH:MM"
                            name="author_name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">Enter Address</label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Enter address...."
                          id="Title"
                          name="description"
                          rows={4}
                          // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          Enter Session Amount
                        </label>
                        <input
                          type="number"
                          className="form-control w-50"
                          placeholder="XXXX./-"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <label className="form-label">Content Cover Image</label>

                    <div className="col-12 float-start mb-4 position-relative">
                      <p
                        class="addUserPic p-0 w-70 d-flex justify-content-center align-items-center"
                        style={{ height: "213px" }}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <span class="text-center">
                            <img
                              src={IconGallery}
                              alt=""
                              className="mb-2"
                              id=""
                            />
                            <p className="mb-0">
                              Drag an image here <br />
                              or
                              <br /> <a href="#">Upload Image</a>
                            </p>
                          </span>
                        </div>

                        <input
                          type="file"
                          class="custom-file-input"
                          id="customFile"
                          name="uploadedFile"
                          multiple=""
                          accept="image/*"
                        />
                        <label
                          class="custom-file-label mb-0"
                          htmlForfor="customFile"
                        ></label>
                      </p>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          Enter no. of seat limit
                        </label>
                        <input
                          type="number"
                          className="form-control w-50"
                          placeholder="XXXX"
                        />
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

export default OfflineEvents;
