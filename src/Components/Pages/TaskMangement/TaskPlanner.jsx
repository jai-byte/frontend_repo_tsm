/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DeleteFilled,
  EditFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tooltip, message } from "antd";
import moment from "moment";
import "./timeSheet.css";
// import Pagination from "../Common/Pagination";

const TaskPlanner = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const initialValues = {
    task_name: "",
    task_description: "",
    project_name: "",
    start_time: "",
    end_time: "",
    status: "Ongoing",
  };
  const [EmployeeList, setEmployeeList] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment().format("dddd"));
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [currentDate, setCurrentDate] = useState(moment());
  const startOfWeek = currentDate.clone().startOf("week");
  const endOfWeek = currentDate.clone().endOf("week");

  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Task Management" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Task Planner" && sub.is_active === true
        )
    );

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  function formatTo12Hour(time) {
    if (!time) return "N/A"; // Handle missing time
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  function calculateTotalHours(startTime, endTime) {
    if (!startTime || !endTime) return "N/A"; // Handle missing times
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start; // Difference in milliseconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`; // Format as hours and minutes
  }
  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.task_name) {
      errors.task_name = "Please enter task name";
    }
    if (!values.task_description) {
      errors.task_description = "Please enter task description";
    }
    if (!values.project_name) {
      errors.project_name = "Please enter project name";
    }
    if (!values.start_time) {
      errors.start_time = "Please enter start time of task";
    }
    if (!values.end_time) {
      errors.end_time = "Please enter end time of the task";
    }
    if (!values.status) {
      errors.status = "Please select status";
    }
    setFormErrors(errors);
    console.log("Errors", errors);

    return errors;
  };
  function calculateTotalHours(startTime, endTime) {
    if (!startTime || !endTime) return "N/A"; // Handle missing times
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");

    if (!start.isValid() || !end.isValid()) return "Invalid Time"; // Handle invalid times

    const duration = moment.duration(end.diff(start)); // Calculate the difference
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    return `${hours}h ${minutes}m`; // Format as "Xh Ym"
  }
  const getPlannerData = () => {
    try {
      API?.CommanApiCall({
        data: {
          current_date: selectedDate,
        },
        agent: "task_list",
        function: "getTask",
      }).then((response) => {
        console.log("getting list: ", response);
        if (response?.data?.data?.status === 200) {
          setListingData(response?.data?.data?.data);
        } else if (response?.data?.data?.status === 404) {
          setListingData([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPlannerData();
  }, [selectedDate]);
  const handleDelete = (ele) => {
    try {
      setLoading(true);
      API?.CommanApiCall({
        data: {
          task_id: ele._id,
          current_date: selectedDate,
        },
        agent: "task_list",
        function: "deleteTask",
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          message.success("successfully deleted the task");
          getPlannerData();
        }
      });
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
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
        console.log("employee", response);
        if (response?.status === 200) {
          setEmployeeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeList();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      const apiData = {
        description: formValues?.task_description,
        task_name: formValues?.task_name,
        project_name: formValues?.project_name,
        start_time: formValues?.start_time,
        end_time: formValues?.end_time,
        status: formValues?.status,

        current_date: selectedDate,
      };
      if (editItemId) {
        apiData["task_id"] = editItemId;
        apiData["updates"] = {
          description: formValues?.task_description,
          task_name: formValues?.task_name,
          project_name: formValues?.project_name,
          start_time: formValues?.start_time,
          end_time: formValues?.end_time,
          status: formValues?.status,
        };
      }
      try {
        API?.CommanApiCall({
          data: apiData,
          agent: "task_list",
          function: editItemId && "updateTask",
        }).then((response) => {
          console.log(response);
          if (response?.data?.data?.status === 200) {
            setLoading(false);
            message.success("Submitted Successfully");
            setEditItemId(null);
            getPlannerData();
            setFormValues(initialValues);
          } else if (response?.data?.data?.status === 201) {
            setErrorMessage(response?.data?.data?.message);
            setLoading(false);
            message.success("Error while submitting");
            setFormValues(initialValues);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          }
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [formErrors]);
  // Assuming listingData contains your tasks array
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const apiData = {
        task_id: "validation",
        current_date: selectedDate,
        updates: {
          is_submit: true,
        },
      };

      const response = await API?.CommanApiCall({
        data: apiData,
        agent: "task_list",
        function: "updateTask", // New function name for list submission
      });

      if (response?.data?.data?.status === 200) {
        setLoading(false);
        message.success("Lists submitted successfully");
        setEditItemId(null);
        getPlannerData();
      } else if (response?.data?.data?.status === 201) {
        setErrorMessage(response?.data?.data?.message);
        setLoading(false);
        message.error("Error while submitting"); // Changed to error message

        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleEdit = (item) => {
    setEditItemId(item._id);
    setFormValues({
      task_description: item.task_description,
      task_name: item.task_name,
      project_name: item.project_name,
      start_time: item.start_time,
      end_time: item.end_time,
      status: item.status,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day.format("dddd"));
    setSelectedDate(day.format("YYYY-MM-DD"));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    const day = dayFormatter.format(date);

    // Custom manual formatting for a cleaner look
    const month = date.toLocaleString("default", { month: "short" });
    const dateNum = date.getDate();
    const year = date.getFullYear();

    return `${dateNum} ${month} ${year}, ${day}`;
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.clone().add(index, "days")
  );

  const handlePreviousWeek = () => {
    const newDate = currentDate.clone().subtract(1, "week");
    setCurrentDate(newDate);
    // Automatically select the first day (Monday) of the new week
    const firstDayOfWeek = newDate.clone().startOf("week");
    setSelectedDay(firstDayOfWeek.format("dddd"));
    setSelectedDate(firstDayOfWeek.format("YYYY-MM-DD"));
  };

  const handleNextWeek = () => {
    const newDate = currentDate.clone().add(1, "week");
    setCurrentDate(newDate);
    // Automatically select the first day (Monday) of the new week
    const firstDayOfWeek = newDate.clone().startOf("week");
    setSelectedDay(firstDayOfWeek.format("dddd"));
    setSelectedDate(firstDayOfWeek.format("YYYY-MM-DD"));
  };

  console.log("listing data in timesheet", listingData);

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">
                    Create Task List
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <div
              className="row justify-content-between main-card p-4"
              style={{ marginLeft: "12px" }}
            >
              {/* {errorMessage ? (
                <span className="text-danger text-end">{errorMessage}</span>
              ) : null} */}
              <div className="col-xl-3 col-lg-3">
                <div className="week-tab d-flex align-items-center justify-content-between mb-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handlePreviousWeek}
                  >
                    <CaretLeftOutlined
                      style={{ color: "#62a6dc", fontSize: "16px" }}
                    />
                  </button>
                  <div>
                    {startOfWeek.format("DD MMM")} -{" "}
                    {endOfWeek.format("DD MMM")}
                  </div>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleNextWeek}
                  >
                    <CaretRightOutlined
                      style={{ color: "#62a6dc", fontSize: "16px" }}
                    />
                  </button>
                </div>

                <div className="days-column">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day.format("dddd")}
                      className={`day-item ${
                        selectedDay === day.format("dddd") ? "highlighted" : ""
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day.format("dddd")}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 px-1">
                <h3 className="text-center" style={{ marginBottom: "30px" }}>
                  {formatDate(selectedDate)}
                </h3>
                <div className="me-xl-5">
                  {/* Form Content */}
                  <div className="row gx-3 gy-4">
                    {/* Task Name */}
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Task Name
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-2"
                        name="task_name"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        value={formValues.task_name || ""}
                      />
                      <p className="text-danger">{formErrors?.task_name}</p>
                    </div>

                    {/* Task Description */}
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Task Description
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-2"
                        name="task_description"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        value={formValues.task_description || ""}
                      />
                      <p className="text-danger">
                        {formErrors?.task_description}
                      </p>
                    </div>

                    {/* Project Name */}
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-2"
                        name="project_name"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        value={formValues.project_name || ""}
                      />
                      <p className="text-danger">{formErrors?.project_name}</p>
                    </div>

                    {/* Start Time */}
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Start Time
                      </label>
                      <input
                        type="time"
                        className="form-control border-radius-2"
                        name="start_time"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        value={formValues.start_time || ""}
                      />
                      <p className="text-danger">{formErrors?.start_time}</p>
                    </div>

                    {/* End Time */}
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        End Time
                      </label>
                      <input
                        type="time"
                        className="form-control border-radius-2"
                        name="end_time"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        value={formValues.end_time || ""}
                      />
                      <p className="text-danger">{formErrors?.end_time}</p>
                    </div>

                    {/* Status */}
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Status
                      </label>
                      <select
                        className="form-control border-radius-2"
                        name="status"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        onChange={(e) => handleChange(e)}
                        value={formValues.status || "Ongoing"}
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <p className="text-danger">{formErrors?.status}</p>
                    </div>
                  </div>

                  {CheckAccess && (
                    <div className="saveBtn">
                      <button
                        className="btn text-white px-4 float-end"
                        onClick={(e) => handleSave(e)}
                        disabled={loading}
                        style={{
                          display: "flex",
                          backgroundColor: "#62a6dc",
                          borderRadius: "20px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          border: "none",
                        }}
                      >
                        {loading && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {editItemId ? "Update Task" : "Add Task"}
                      </button>
                    </div>
                  )}
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
            // style={{ overflowY: "scroll", height: "20rem" }}
          >
            <div className="table-responsive">
              <table className="table mb-0 tablesWrap">
                <thead>
                  <tr>
                    <th style={{ fontWeight: "700" }}>S.No</th>
                    <th style={{ fontWeight: "700" }}>Project Name</th>
                    <th style={{ fontWeight: "700" }}>Task Name</th>
                    <th style={{ fontWeight: "700" }}>Description</th>
                    <th style={{ fontWeight: "700" }}>Start time</th>
                    <th style={{ fontWeight: "700" }}>End Time</th>
                    <th style={{ fontWeight: "700" }}>Status</th>
                    <th style={{ fontWeight: "700" }}>Total Time</th>
                    <th
                      style={{
                        fontWeight: "700",
                        paddingLeft: "25px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {listingData &&
                        listingData?.length > 0 &&
                        CheckAccess && (
                          <div
                            className=" mb-3"
                            style={{
                              position: "relative",
                              right: "18px",
                              display: "flex",
                              gap: "9px",
                            }}
                          >
                            <Tooltip
                              title="Once submitted, tasks cannot be edited or deleted. Ensure all task details are correct before submitting."
                              placement="left"
                            >
                              <InfoCircleOutlined
                                style={{
                                  color: "#62a6dc",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>
                            <button
                              className="btn text-white "
                              onClick={handleSubmit}
                              disabled={loading}
                              style={{
                                display: "flex",
                                backgroundColor: "#62a6dc",
                                borderRadius: "20px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                border: "none",
                              }}
                            >
                              {loading && (
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              )}
                              Submit
                            </button>
                          </div>
                        )}
                      Action
                    </th>
                    {/* <th style={{ fontWeight: "700" }}>Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
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
                      {listingData && listingData?.length ? (
                        listingData[0]?.tasks?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{ele?.project_name}</td>
                              <td>{ele?.task_name}</td>
                              <td>{ele?.description}</td>
                              <td>
                                {moment(ele?.start_time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </td>
                              <td>
                                {moment(ele?.end_time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </td>
                              <td>{ele?.status}</td>
                              <td>
                                {calculateTotalHours(
                                  ele?.start_time,
                                  ele?.end_time
                                )}
                              </td>
                              <td>
                                <Tooltip title="Edit">
                                  <button
                                    className={`btn btn-sm ${
                                      ele?.is_submit ? "no-border" : ""
                                    }`}
                                    disabled={ele?.is_submit}
                                    onClick={() => handleEdit(ele)}
                                    style={{
                                      border: ele?.is_submit ? "none" : "",
                                      cursor: ele?.is_submit
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    <EditFilled
                                      style={{
                                        fontSize: "20px",
                                        color: "#62a6dc",
                                      }}
                                    />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <button
                                    className={`btn btn-sm ${
                                      ele?.is_submit ? "no-border" : ""
                                    }`}
                                    disabled={ele?.is_submit}
                                    onClick={() => handleDelete(ele)}
                                    style={{
                                      border: ele?.is_submit ? "none" : "",
                                      cursor: ele?.is_submit
                                        ? "not-allowed !important"
                                        : "pointer",
                                    }}
                                  >
                                    <DeleteFilled
                                      style={{
                                        fontSize: "20px",
                                        color: "#62a6dc",
                                      }}
                                    />
                                  </button>
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
    </>
  );
};

export default TaskPlanner;
