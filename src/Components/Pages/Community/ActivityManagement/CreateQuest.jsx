/* eslint-disable */
import React from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";

const CreateQuest = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          {/* <DateAndTimeLayout /> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Community &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    Sales and Marketing
                  </span>
                </div>
                <span className="mx-2 lightGrey ">|</span>
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Category &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    Marketing
                  </span>
                </div>
                <span className="mx-2 lightGrey">|</span>
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Title &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    Marketing Strategy
                  </span>
                </div>
                <span className="mx-2 lightGrey">|</span>
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Time per question &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    30 sec
                  </span>
                </div>

                <span className="mx-2 lightGrey">|</span>
                <h4 className="page-title mb-0 font-size-18 fw-normal text-end">
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Duration &nbsp;&nbsp;{" "}
                    </span>
                    15-12-2024
                    <span className="mx-2 font-size-10">to</span>
                    <span className="font-size-10"> 15-12-2024</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      className="ms-2"
                    >
                      <g
                        id="Group_17126"
                        data-name="Group 17126"
                        transform="translate(-1805 -135)"
                      >
                        <rect
                          id="Rectangle_6668"
                          data-name="Rectangle 6668"
                          width="40"
                          height="40"
                          rx="20"
                          transform="translate(1805 135)"
                          fill="#2d3450"
                        />
                        <g
                          id="Group_17125"
                          data-name="Group 17125"
                          transform="translate(247 -247)"
                        >
                          <path
                            id="Path_11169"
                            data-name="Path 11169"
                            d="M10.388,6H4.642A1.642,1.642,0,0,0,3,7.642V19.135a1.642,1.642,0,0,0,1.642,1.642H16.135a1.642,1.642,0,0,0,1.642-1.642V13.388"
                            transform="translate(1567 389.223)"
                            fill="none"
                            stroke="#fff"
                          />
                          <path
                            id="Path_11170"
                            data-name="Path 11170"
                            d="M19.909,3.286a1.6,1.6,0,0,1,2.26,2.26L15.013,12.7,12,13.455l.753-3.013Z"
                            transform="translate(1563.363 391.182)"
                            fill="none"
                            stroke="#fff"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                </h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to="/activity-management/create-new"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Create Quest
                </h4>
              </NavLink>
            </div>

            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                <div className="saveBtn">
                  <NavLink
                    to="/activity-management/preview"
                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                  >
                    <span className="">Preview</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {/* whole div for shoprofileImgw details */}
          <div className="row">
            <div className="col-3">
              <div className="main-card bg-white">
                <div className="scroll__y ">
                  <div className="slide">
                    <ul className="mb-0 ps-0">
                      <li>
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-11">
                            <button className="btn rouded-0 btn-main-light-orange w-100 text-center py-2 mb-2">
                              <span>Quest 1</span>
                            </button>
                          </div>
                          <div className="col-1 g-0">
                            <div className="col-1 g-0">
                              <div className="dropdown">
                                <button
                                  type="button"
                                  className="btn dropdown-toggle p-0 dayFilter h-auto w-auto"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-vertical defaultGrey"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a className="dropdown-item font-size-12">
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* Modal */}
                            <div
                              className="modal fade"
                              id="exampleModal12"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered bg-transparent">
                                <div className="modal-content border_top p-5  border-0">
                                  <div className="modal-body text-start text-center">
                                    <h3 className="textGrey fw-bold">
                                      You need to have at least 1 Chapter in the
                                      course
                                    </h3>
                                    <button
                                      className="btn bgBlack text-white border-radius-5 px-4 mt-3"
                                      type="submit"
                                    >
                                      <span>Okay</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-11">
                            <button className="btn rouded-0 btn-main-light-orange w-100 text-center py-2 mb-2">
                              <span>Quest 2</span>
                            </button>
                          </div>
                          <div className="col-1 g-0">
                            <div className="col-1 g-0">
                              <div className="dropdown">
                                <button
                                  type="button"
                                  className="btn dropdown-toggle p-0 dayFilter h-auto w-auto"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-vertical defaultGrey"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a className="dropdown-item font-size-12">
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* Modal */}
                            <div
                              className="modal fade"
                              id="exampleModal12"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered bg-transparent">
                                <div className="modal-content border_top p-5  border-0">
                                  <div className="modal-body text-start text-center">
                                    <h3 className="textGrey fw-bold">
                                      You need to have at least 1 Chapter in the
                                      course
                                    </h3>
                                    <button
                                      className="btn bgBlack text-white border-radius-5 px-4 mt-3"
                                      type="submit"
                                    >
                                      <span>Okay</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-11">
                            <button className="btn rouded-0 btn-main-light-orange w-100 text-center py-2 mb-2">
                              <span>Quest 3</span>
                            </button>
                          </div>
                          <div className="col-1 g-0">
                            <div className="col-1 g-0">
                              <div className="dropdown">
                                <button
                                  type="button"
                                  className="btn dropdown-toggle p-0 dayFilter h-auto w-auto"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-vertical defaultGrey"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a className="dropdown-item font-size-12">
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* Modal */}
                            <div
                              className="modal fade"
                              id="exampleModal12"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered bg-transparent">
                                <div className="modal-content border_top p-5  border-0">
                                  <div className="modal-body text-start text-center">
                                    <h3 className="textGrey fw-bold">
                                      You need to have at least 1 Chapter in the
                                      course
                                    </h3>
                                    <button
                                      className="btn bgBlack text-white border-radius-5 px-4 mt-3"
                                      type="submit"
                                    >
                                      <span>Okay</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="parent-container">
                  <NavLink className="btn bgOrange text-white px-4 w-100 mb-2">
                    <span className="">+ &nbsp; New Quest</span>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-9">
              <div className="main-card bg-white h-100">
                <div className="row">
                  <div className="col-9 mb-0 shadow-none">
                    <h3 className="textBlack fw-bold letter-spacing-4">
                      Quest 1
                    </h3>
                  </div>
                  <div className="col-3 text-end">
                    <button className="btn  bgSave text-white border-radius-2 px-3 mt-2 me-2">
                      {/* <i className="fa fa-light fa-check me-1"></i>{" "} */}
                      <span>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Save
                      </span>
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Enter title of the task
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Title"
                          id="Title"
                          name="question"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Describe the task in detail
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Use max 100 words to describe this task....."
                          rows="4"
                          name="module_description"
                          spellcheck="false"
                        ></textarea>
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

export default CreateQuest;
