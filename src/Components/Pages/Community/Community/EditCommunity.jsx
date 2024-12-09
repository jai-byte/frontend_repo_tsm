/* eslint-disable */
import React from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";

const EditCommunity = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to="/community/community-detail/:type/:id"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Edit Community
                </h4>
              </NavLink>
            </div>
            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <NavLink
                    to="/community/community-detail/:type/:id"
                    className="btn btn-reject me-3 px-4"
                  >
                    <span className="">Close</span>
                  </NavLink>
                </div>
                <div className="saveBtn">
                  <button className="btn bgBlack text-white border-radius-2 px-4 float-end">
                    <span className="">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-4" id="uploadUser">
                <div className="row">
                  <div className="mb-3 col-12">
                    <div className="col-md-4 col-sm-12 col-12 float-start">
                      <div className="col-12 float-start mt-2 mb-4">
                        <p className="addUserPic mx-auto mt-1 mb-1 ">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            name="filename"
                            multiple="multiple"
                            accept="image/*"
                          />
                          <img
                            crossorigin="anonymous"
                            src=""
                            className="rounded-circle img-fluid"
                            style={{ height: "196px", width: "193px" }}
                          />{" "}
                          <label
                            className="custom-file-label mb-0"
                            htmlFor="customFile"
                          />
                        </p>
                        <div className="mx-auto text-center">
                          <button className="btn btn-main btn-main-orange btn-sm mt-3">
                            {/* <i className="fa fa-solid fa-plus textBlack"></i> */}
                            <i className="fa fa-thin fa-pen"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 col-sm-12 col-12 float-start mb-4 border-left-grey ps-5">
                      <div className="row">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Classroom Details</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-12">
                          <label className="form-label">Classroom Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Classroom Name"
                            name="firstName"
                          />
                          <label className="form-label mt-4">
                            Classroom description
                          </label>
                          <textarea
                            className="form-control"
                            placeholder="Enter Classroom description"
                            rows="4"
                          ></textarea>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 mb-3">
                          <label className="form-label">Status</label>
                          <div className="d-flex">
                            <div
                              className="button b2 me-xxl-3 me-2"
                              id="button-13"
                            >
                              <input type="checkbox" className="checkbox" />

                              <div className="knobs">
                                <span>|||</span>
                              </div>
                              <div className="layer"></div>
                            </div>
                            <p className="mt-1"> Active</p>
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="form-label">
                            Select the type of account
                          </label>
                          <div className="ms-2">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                id="inlineRadio1"
                                defaultValue="Free"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                              >
                                Free
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                id="inlineRadio2"
                                defaultValue="Paid"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                              >
                                Paid
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3" id="rupees">
                          <div className="col-6 mb-3">
                            <label className="form-label">
                              Select the type of subscription
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="₹ 300"
                            ></input>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">
                              Mention amount for joining this classroom
                            </label>
                            <select
                              className="form-select border-radius-2"
                              aria-label="Default select example"
                              name="roles"
                            >
                              <option>Select</option>
                              <option value="Monthly">Monthly</option>
                              <option value="One Time">One Time</option>
                              <option value="Yearly">Yearly</option>
                            </select>
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
      {/* </AppLayout> */}
    </>
  );
};

export default EditCommunity;
