import React from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
// import AdminRoute from '../../../Route/RouteDetails';

const EditRole = () => {
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
                to="/roles/role-details"
                className="w-auto float-start pe-1 textBlack"
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </NavLink>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Edit Role
              </h4>
            </div>
            <div className="col-6 pe-0">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <NavLink
                    to="/roles/role-details"
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

          <div className="row mb-4">
            <div className="col-4">
              <div className="row d-flex align-items-center w-100">
                <div className="col-2 pe-0">
                  <label className="form-label">Role :</label>
                </div>
                <div className="col-10 d-flex ps-0">
                  <span className="mandatory-star me-1">*</span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    id="name"
                    required=""
                    name="name"
                    value="Content Creator"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              <div className="d-flex align-items-center w-100">
                <div className="pe-0">
                  <label className="form-label">Describe :</label>
                </div>
                <div className="d-flex">
                  <span className="mandatory-star me-1">*</span>
                  <input
                    type="text"
                    className="form-control bg-white"
                    id="name"
                    value="Creator Have access to Create Content"
                    required=""
                    name="name"
                  />
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex justify-content-end">
                <div className="button b2 me-3" id="button-13">
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

          <div className="row">
            <div className="col-12">
              <div className="main-card p-3">
                <div className="table-responsive">
                  <table className="table" id="tableRoles">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Features</th>
                        <th>Access</th>
                      </tr>
                    </thead>
                    <tbody className="mt-3">
                      <tr className="border-bottom-custom">
                        <td></td>
                        <td></td>
                        <td className="">View</td>
                        <td className="">Add</td>
                        <td className="">Edit</td>
                        <td className="">Delete</td>
                        {/* <td>
                            <table className="table my-2 tablesWrap">
                              <thead>
                                <tr>
                                  <th className="selfWidth">View</th>
                                  <th className="selfWidth">Add</th>
                                  <th className="selfWidth">Edit</th>
                                  <th className="selfWidth">Delete</th>
                                </tr>
                              </thead>
                            </table>
                          </td> */}
                      </tr>

                      <tr>
                        <td>01.</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">
                              Dashboard
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>02.</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked
                            />
                            <label className="form-check-label">Content</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                      </tr>

                      <tr className="selfWidth">
                        <td>03.</td>
                        <td>
                          <div className="form-check ps-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked
                            />
                            <label className="form-check-label">Creator</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>04.</td>
                        <td>
                          <div className="form-check ps-5 ms-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked
                            />
                            <label className="form-check-label">
                              Create New
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>05.</td>
                        <td>
                          <div className="form-check ps-5 ms-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked
                            />
                            <label className="form-check-label">Draft</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>06.</td>
                        <td>
                          <div className="form-check ps-5 ms-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked
                            />
                            <label className="form-check-label">
                              Submitted
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>07.</td>
                        <td>
                          <div className="form-check ps-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked
                            />
                            <label className="form-check-label">Moderate</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                          />
                        </td>
                      </tr>

                      <tr className="selfWidth">
                        <td>08.</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">
                              Subscription Plans
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>09.</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">
                              Analytics & Report
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>10.</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">
                              User Management
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>11.</td>
                        <td>
                          <div className="form-check ps-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">Consumer</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>12.</td>
                        <td>
                          <div className="form-check ps-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">My Team</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>13.</td>
                        <td>
                          <div className="form-check ps-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">Roles</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                      <tr className="selfWidth">
                        <td>14.</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">Settings</label>
                          </div>
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default EditRole;
