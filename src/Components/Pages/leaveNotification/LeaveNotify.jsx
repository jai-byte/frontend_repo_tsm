/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import { Tooltip } from "antd";

const LeaveNotify = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leaveData, setLeaveData] = useState([]);
  const [currentTab, setCurrentTab] = useState("pending");

  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const [EmployeeList, setEmployeeList] = useState([]);

  const [listingData, setListingData] = useState([]);

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");
  function calculateLeaveDays(from_date, to_date) {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    const timeDifference = endDate - startDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) || 0;
  }
  const admin_id = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const MyTeamTabList = (flagForList) => {
    try {
      API?.CommanApiCall({
        data: {
          status: flagForList,
        },
        agent: "leave_application",
        function: "get_leave_application",
      }).then((response) => {
        console.log("leave", response);
        if (response?.data?.data?.status === 200) {
          // const updatedData = response.data.data.data.map((ele) => ({
          //   ...ele,
          //   leaveDays: calculateLeaveDays(ele.from_date, ele.to_date),
          // }));

          setLeaveData(response.data.data.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "admin_user_list",
          page_no: 1,
          limit: 100,
          filter: {},
        });
        if (response?.status === 200) {
          setEmployeeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeList();
  }, []);
  const handleStatus = async (leaveId, applicationId, flagForList) => {
    console.log("Approved leave ID:", leaveId);
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          user_id: leaveId,
          application_id: applicationId,

          status: flagForList,
        },
        agent: "leave_application",
        function: "update_leave_application",
      }).then((response) => {
        console.log("leave", response);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          navigate(0);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MyTeamTabList(currentTab);
  }, [currentTab, currentPage, itemsPerPage, filterselect, search]);

  console.log("lejrlejfljsl ", leaveData);
  const filteredData =
    leaveData &&
    leaveData
      .filter((leave) => {
        const employee = EmployeeList.find(
          (emp) => emp._id == leave.user_id && emp.reporting_to == admin_id._id
        );

        return employee;
      })
      .map((leave) => {
        const employee = EmployeeList.find((emp) => emp._id == leave.user_id);
        return {
          ...leave,
          first_name: employee ? employee.first_name : null, // Add the employee's name if found
        };
      });
  const LengthBasedTooltip = ({ text, maxLength = 20 }) => {
    const shouldShowTooltip = text.length > maxLength;
    const displayText = shouldShowTooltip
      ? `${text.slice(0, maxLength)}...`
      : text;

    return (
      <td>
        {shouldShowTooltip ? (
          <Tooltip title={text}>
            <span>{displayText}</span>
          </Tooltip>
        ) : (
          <span>{text}</span>
        )}
      </td>
    );
  };
  console.log("eplist", filteredData);
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />

          {/* end page title */}
          <div className="row">
            <div className="col-12">
              <div className="row position-relative">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Notification</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="tableCard">
                <div className="">
                  <div className="tab-content text-muted mt-3">
                    <div className="row mb-4" id="consumers">
                      <div className="col-xl-5 mb-4 mb-xl-0">
                        <ul
                          className="nav   nav-tabs-custom mt-5 mt-xl-0"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("pending");
                            }}
                          >
                            <a
                              className={
                                currentTab === "pending"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Pending</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("approved");
                            }}
                          >
                            <a
                              className={
                                currentTab === "approved"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Approved</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("rejected");
                            }}
                          >
                            <a
                              className={
                                currentTab === "rejected"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Ongoing"
                              role="tab"
                            >
                              <span>Rejected</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className={
                        currentTab === "pending"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="to-Be-Reviewed"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Name</th>
                              <th style={{ fontWeight: "600" }}>Leave Code</th>
                              <th
                                className="w-20"
                                style={{ fontWeight: "600" }}
                              >
                                Leave Reason
                              </th>
                              <th style={{ fontWeight: "600" }}>Start Date</th>
                              <th style={{ fontWeight: "600" }}>End Date</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              <>
                                {filteredData && filteredData?.length ? (
                                  filteredData?.map((ele, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="fw-bold">
                                          {ele?.first_name}
                                        </td>
                                        <td>{ele?.leave_code}</td>
                                        <td>
                                          <LengthBasedTooltip
                                            text={ele?.leave_reason}
                                            maxLength={20}
                                          />
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.from_date
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.to_date
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>

                                        <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light btnViewOrange text-white"
                                            onClick={() => {
                                              handleStatus(
                                                ele?.user_id,
                                                ele?._id,
                                                "approved"
                                              );
                                            }}
                                            style={{
                                              display: "flex",
                                              backgroundColor: " #62a6dc",
                                              borderRadius: "20px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Approve
                                          </button>
                                        </td>
                                        <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light btnViewOrange text-white"
                                            onClick={() => {
                                              handleStatus(
                                                ele?.user_id,
                                                ele?._id,
                                                "rejected"
                                              );
                                            }}
                                            style={{
                                              display: "flex",
                                              backgroundColor: " #62a6dc",
                                              borderRadius: "20px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Reject
                                          </button>
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

                    <div
                      className={
                        currentTab === "approved"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Name</th>
                              <th style={{ fontWeight: "600" }}>Leave Code</th>
                              <th
                                className="w-20"
                                style={{ fontWeight: "600" }}
                              >
                                Leave Reason
                              </th>
                              <th style={{ fontWeight: "600" }}>Start Date</th>
                              <th style={{ fontWeight: "600" }}>End Date</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              <>
                                {filteredData && filteredData?.length ? (
                                  filteredData?.map((ele, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="fw-bold">
                                          {ele?.first_name}
                                        </td>
                                        <td>{ele?.leave_code}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.leave_reason}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.from_date
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.to_date
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>
                                        {/* <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light text-white"
                                            style={{
                                              display: "flex",
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
                                          </button>
                                        </td> */}
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

                    <div
                      className={
                        currentTab === "rejected"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Ongoing"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Name</th>
                              <th style={{ fontWeight: "600" }}>Leave Code</th>
                              <th
                                className="w-20"
                                style={{ fontWeight: "600" }}
                              >
                                Leave Reason
                              </th>
                              <th style={{ fontWeight: "600" }}>Start Date</th>
                              <th style={{ fontWeight: "600" }}>End Date</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              <>
                                {filteredData && filteredData?.length ? (
                                  filteredData?.map((ele, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="fw-bold">
                                          {ele?.first_name}
                                        </td>
                                        <td>{ele?.leave_code}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.leave_reason}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.from_date
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.to_date
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>
                                        {/* <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light text-white"
                                            style={{
                                              display: "flex",
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
                                          </button>
                                        </td> */}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Pagination
            totalPagess={totalPagess}
            setTotalPage={setTotalPage}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          /> */}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default LeaveNotify;
