/* eslint-disable */
import React from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";

const CreateSubscriptionPlans = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <NavLink
                  to="/subscription-plans"
                  className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
                >
                  <div className="backArrow me-3">
                    <i className="fa fa-solid fa-chevron-left"></i>
                  </div>

                  <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                    Create Subscription Plans
                  </h4>
                </NavLink>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <div class="cancelBtn">
                <NavLink
                  className="btn btn-reject me-3 px-4"
                  to="/subscription-plans"
                >
                  <span class="">Cancel</span>
                </NavLink>
              </div>

              <div className="saveBtn">
                <NavLink
                  className="btn bgBlack text-white border-radius-2 px-4 float-end"
                  //  onClick={(e) => handleSave(e)}
                  type="submit"
                  // disabled={loading}
                >
                  <span> Save</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="row vh-100" id="createContent">
            <form>
              <div className="row main-card pb-4">
                <div className="col-5">
                  <p className="mb-2">
                    <span class="mandatory-star me-1">*</span>Upload package
                    image here
                  </p>

                  <p class="addUserPic rounded-3 borderDashed border-2 mb-2 p-0">
                    <div className="d-flex align-items-end justify-content-center h-100">
                      <div className="bg-white">
                        <span class="d-flex align-items-center justify-content-center">
                          {/* <i class="fa-solid fa-arrow-up-from-bracket font-size-16 me-2"></i> */}
                          <svg
                            width="24"
                            height="16"
                            viewBox="0 0 24 16"
                            className="me-2"
                          >
                            <path
                              id="Icon_material-cloud-upload"
                              data-name="Icon material-cloud-upload"
                              d="M19.35,12.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,22H19a4.986,4.986,0,0,0,.35-9.96ZM14,15v4H10V15H7l5-5,5,5Z"
                              transform="translate(0 -6)"
                              fill="#707070"
                            />
                          </svg>
                          <p className="m-0">Upload package image</p>
                        </span>
                      </div>
                    </div>
                    <label
                      class="custom-file-label mb-0"
                      for="customFile"
                    ></label>
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      name="media"
                      multiple=""
                      accept="image/*"
                    />
                  </p>
                </div>
                <div className="col-7">
                  <div className="row">
                    <div className="col-12">
                      <label class="form-label" for="name">
                        Package Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Enter Package Name"
                        required=""
                        name="name"
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12">
                      <label class="form-label" for="name">
                        Package Descriptions
                      </label>

                      <textarea
                        className="form-control"
                        placeholder="Mention description in details..."
                        id="floatingTextarea2"
                        rows={4}
                      ></textarea>
                    </div>
                  </div>

                  <div className="row my-3">
                    <div className="col-12">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          defaultValue="option1"
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
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          defaultValue="option2"
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

                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label">Name the button</label>
                      <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Free"
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="rupees">
                    <div className="col-6">
                      <label className="form-label">
                        Mention amount for joining this classroom
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="₹ 300"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">
                        Select the type of subscription
                      </label>
                      <select
                        className="form-select w-50"
                        aria-label="Default select example"
                        name="category"
                      >
                        <option selected="" value="">
                          Select
                        </option>

                        <option value="Monthly">Monthly</option>
                        <option value="One Time">One Time</option>
                        <option value="Yearly">Yearly</option>
                      </select>
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

export default CreateSubscriptionPlans;
