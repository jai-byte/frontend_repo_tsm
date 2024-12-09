import React from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink } from "react-router-dom";
// import AdminRoute from '../../../Route/RouteDetails';
import CreateUserImg from "../../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";

const UserProfileEdit = () => {
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
                to="/user-profile"
                className="w-auto float-start pe-1 textBlack"
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </NavLink>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Edit
              </h4>
            </div>
            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <NavLink
                    to="/user-profile"
                    className="btn btn-reject me-3 px-4"
                  >
                    <span className="">Close</span>
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

          <div className="row">
            <div className="col-12">
              <div className="main-card p-4" id="uploadUserEdit">
                <div className="row">
                  <div className="mb-3 col-12">
                    <div className="col-md-4 col-sm-12 col-12 float-start">
                      <div className="col-12 float-start mt-2 mb-4">
                        <p className="addUserPic mx-auto mt-1 mb-1 ">
                          {/* <span className="addPicIcon">
                              <i className="fas fa-pen" />
                            </span> */}
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            name="filename"
                          />
                          <img src={CreateUserImg} className="rounded-circle" />
                          <label
                            className="custom-file-label mb-0"
                            htmlFor="customFile"
                          />
                        </p>
                        <div className="mx-auto text-center">
                          <button className="btn btn-main btn-main-orange btn-sm mt-3">
                            <i className="fa fa-solid fa-pen textBlack"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 col-sm-12 col-12 float-start mb-4 border-left-grey">
                      <div className="row ps-0 ps-md-4">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Personal Information</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-12 mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                              />
                            </div>
                            <div className="col-4">
                              <label className="form-label">Mobile No.</label>
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter Mobile No."
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row ps-0 ps-md-4 mt-4">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Roles</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-4 mb-3">
                          <select
                            className="form-select border-radius-2"
                            aria-label="Default select example"
                          >
                            <option>Select</option>
                            <option value="Creator">Creator</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Publisher">Publisher</option>
                          </select>
                        </div>
                      </div>

                      <div className="row ps-0 ps-md-4 mt-4">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Status</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-4 mb-3">
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

                            <p className="mt-1">Active</p>
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

export default UserProfileEdit;
