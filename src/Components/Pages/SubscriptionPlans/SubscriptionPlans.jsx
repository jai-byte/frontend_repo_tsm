/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import { message, Tooltip } from "antd";
import Pagination from "../../Common/Pagination";

const SubscriptionPlans = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [listingData, setListingData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);
  const initialValues = {
    leave_code: "",
    from_date: "",
    to_date: "",
    leave_reason: "",
    status: "pending",
  };
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const UserObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Leave" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Apply Leave" && sub.is_active === true
        )
    );

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.leave_code) {
      errors.leave_code = "Please select leave code ";
    }
    if (!values.from_date) {
      errors.from_date = "Please enter start date";
    }
    if (!values.to_date) {
      errors.to_date = "Please enter end date";
    }
    if (!values.leave_reason) {
      errors.leave_reason = "Please enter reason for leave.";
    }
    console.log("Errors", errors);
    return errors;
  };

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {},
        agent: "leave_create_list",
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setListingData(response.data.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  function calculateLeaveDays(from_date, to_date) {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    const timeDifference = endDate - startDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) || 0;
  }
  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const GetLeaveApplication = () => {
    try {
      API?.CommanApiCall({
        data: { page_no: currentPage, limit: itemsPerPage },
        agent: "leave_application",
        function: "get_leave_application",
      }).then((response) => {
        console.log("leave", response);
        if (response?.data?.data?.status === 200) {
          const updatedData = response?.data?.data?.data
            ? response.data.data.data.map((ele) => ({
                ...ele,
                leaveDays: calculateLeaveDays(ele.from_date, ele.to_date),
              }))
            : [];

          setLeaveData(updatedData);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_records);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetLeaveApplication();
  }, [currentPage, itemsPerPage, loading]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("formValues", formValues);
      setLoading(true);
      try {
        API?.CommanApiCall({
          data: {
            user_id: UserObject._id,
            from_date: formValues?.from_date,
            to_date: formValues?.to_date,
            leave_code: formValues?.leave_code,
            leave_reason: formValues?.leave_reason,
            status: formValues?.status,
          },
          agent: "leave_application",
          id: editItemId,
        }).then((response) => {
          console.log(response);
          if (response?.data?.data?.status === 200) {
            setLoading(false);
            setEditItemId(null);
            message.success("Submitted Successfully");
            setFormValues(initialValues);
          } else if (response?.data?.data?.status === 201) {
            setErrorMessage(response?.data?.data?.message);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
            setLoading(false);
            setFormValues(initialValues);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          <DateAndTimeLayout />
          <div className="row  ">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Leave Request</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <div
              className="row justify-content-between main-card p-4"
              style={{ marginLeft: "2px" }}
            >
              {errorMessage ? (
                <span className="text-danger text-end">{errorMessage}</span>
              ) : null}
              <div className="col-xl-6 col-lg-6">
                <div className="me-xl-5">
                  {/* content title */}
                  <div className="d-flex mb-3">
                    <div className="col-8">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Leave Code
                      </label>
                      <select
                        className="form-select w-80 border-radius-2"
                        aria-label="Default select example"
                        name="leave_code"
                        disabled={!CheckAccess}
                        onChange={(e) => handleChange(e)}
                        value={formValues?.leave_code}
                        style={{ cursor: "pointer" }}
                      >
                        <option selected="" value="">
                          Select
                        </option>
                        {listingData &&
                          listingData?.map((ele, index) => {
                            return (
                              <option
                                selected=""
                                value={ele?.leave_code}
                                key={index}
                              >
                                {ele?.leave_code} ({ele?.leave_name})
                              </option>
                            );
                          })}
                      </select>
                      <p className="text-danger">{formErrors?.leave_code}</p>
                    </div>

                    <div className="col-8 mb-3">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control w-80 border-radius-2"
                        name="from_date"
                        disabled={!CheckAccess}
                        onChange={(e) => handleChange(e)}
                        value={formValues?.from_date}
                        style={{ cursor: "pointer" }}
                      />
                      <p className="text-danger">{formErrors?.from_date}</p>
                    </div>

                    <div className="col-8 mb-3">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        End Date
                      </label>
                      <input
                        type="date"
                        className="form-control w-80 border-radius-2"
                        name="to_date"
                        disabled={!CheckAccess}
                        onChange={(e) => handleChange(e)}
                        value={formValues?.to_date}
                        style={{ cursor: "pointer" }}
                      />
                      <p className="text-danger">{formErrors?.to_date}</p>
                    </div>
                  </div>
                  <div className="col-10 mb-3">
                    <label className="form-label">
                      <span className="mandatory-star me-1">*</span>
                      Reason
                    </label>
                    <textarea
                      className="form-control w-80 border-radius-2"
                      name="leave_reason"
                      aria-label="Leave Reason"
                      disabled={!CheckAccess}
                      onChange={(e) => handleChange(e)}
                      value={formValues?.leave_reason}
                      rows="3"
                    />
                    <p className="text-danger">{formErrors?.leave_reason}</p>
                  </div>
                  <div>
                    {CheckAccess ? (
                      <div className="saveBtn" style={{ marginTop: "-50px" }}>
                        <button
                          className="btn profileBtn text-white px-4 float-end"
                          onClick={(e) => handleSave(e)}
                          type="submit"
                          style={{
                            display: "flex",
                            backgroundColor: "#62a6dc",
                            borderRadius: "20px",
                          }}
                          disabled={loading}
                        >
                          {loading && (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Apply
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2" id="">
            <div className="col-6"></div>
          </div>
          <div
            className={
              currentTab === "Moderator_pending"
                ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
            }
            id="to-Be-Reviewed"
            role="tabpanel"
          >
            <div className="table-responsive">
              <table className="table mb-0 tablesWrap">
                <thead>
                  <tr>
                    <th style={{ fontWeight: "700" }}>S.No</th>
                    <th style={{ fontWeight: "700" }}>Leave Code</th>
                    <th style={{ fontWeight: "700" }}>Start Date</th>
                    <th style={{ fontWeight: "700" }}>End Date</th>
                    <th style={{ fontWeight: "700" }}>No. of leaves</th>
                    <th style={{ fontWeight: "700" }}>Status</th>
                    <th style={{ fontWeight: "700" }}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {leaveData && leaveData?.length ? (
                        leaveData?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{ele?.leave_code}</td>
                              <td>
                                {new Date(ele?.from_date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td>
                                {new Date(ele?.to_date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td>{ele?.leaveDays}</td>
                              <td
                                style={{
                                  color:
                                    ele?.status === "pending"
                                      ? "#f9b11a"
                                      : ele?.status === "approved"
                                      ? "green"
                                      : ele?.status === "rejected"
                                      ? "red"
                                      : "black",
                                }}
                              >
                                {ele?.status}
                              </td>
                              <td>
                                <Tooltip
                                  title={
                                    ele?.leave_reason?.length > 20
                                      ? ele.leave_reason
                                      : ""
                                  }
                                >
                                  {ele?.leave_reason?.length > 20
                                    ? `${ele.leave_reason.slice(0, 20)}...`
                                    : ele.leave_reason}
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <tr>
                            <td colSpan={6} className="text-center">
                              No data Found
                            </td>
                          </tr>
                        </>
                      )}{" "}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            totalPagess={totalPagess}
            setTotalPage={setTotalPage}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlans;
