import React, { useState, useEffect } from "react";
import { Select, Table, Collapse, Card, Row, Col, Radio, message } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../../../Api/Api";

const { Panel } = Collapse;
const { Option } = Select;

const TaskAccordian = () => {
  // State management
  const [viewMode, setViewMode] = useState("My Logs");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const [formValues, setFormValues] = useState({
    year: "",
    month: "",
    week: "",
    employee: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [weekLoading, setWeekLoading] = useState(false);
  const [weeksInMonth, setWeeksInMonth] = useState([]);
  const [weekData, setWeekData] = useState(null);

  const [employeeList, setEmployeeList] = useState([]);

  // Predefined lists
  const availableYears = Array.from(
    { length: 5 },
    (_, i) => moment().year() - 2 + i
  );
  const months = moment.months();

  // Task Columns
  const taskColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Task Name",
      dataIndex: "task_name",
      key: "task_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => moment(text, "HH:mm").format("hh:mm A"),
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => moment(text, "HH:mm").format("hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const calculateDailyWorkHours = (tasks) => {
    return tasks
      .reduce((total, task) => {
        if (task.start_time && task.end_time) {
          const startTime = moment(task.start_time, "HH:mm");
          const endTime = moment(task.end_time, "HH:mm");
          const duration = moment.duration(endTime.diff(startTime));
          return total + duration.asHours();
        }
        return total;
      }, 0)
      .toFixed(2);
  };
  // Generate Weeks in Month
  const generateWeeksInMonth = async (year, month) => {
    setWeekLoading(true);
    try {
      const startOfMonth = moment(`${year}-${month}`, "YYYY-MMMM").startOf(
        "month"
      );
      const endOfMonth = moment(`${year}-${month}`, "YYYY-MMMM").endOf("month");

      const weeks = [];
      let currentWeek = 1;
      let currentWeekDates = [];

      let day = startOfMonth.clone();
      while (day.isSameOrBefore(endOfMonth)) {
        currentWeekDates.push(day.clone());

        // If it's Saturday or last day of month, close the week
        if (day.day() === 6 || day.isSame(endOfMonth, "day")) {
          const weekDetails = {
            week: currentWeek,
            startDate: currentWeekDates[0],
            endDate: currentWeekDates[currentWeekDates.length - 1],
            dates: currentWeekDates.map((date) => ({
              date: date.format("YYYY-MM-DD"),
              tasks: [],
            })),
          };

          // Fetch total work hours for the week
          try {
            const apiData = {
              year: year,
              month: month,
              week: currentWeek,
              user_id:
                viewMode === "My Logs" ? adminObject?._id : formValues.employee,
            };

            const response = await API?.CommanApiCall({
              data: apiData,
              agent: "task_list",
              function: "getLogs",
            });

            if (response?.data?.data?.status === 200) {
              const tasksByDate = response.data.data.data.tasksByDate;
              const totalWorkHours = Object.values(tasksByDate).reduce(
                (total, dateTasks) => {
                  return (
                    total +
                    dateTasks.reduce((dayTotal, task) => {
                      if (task.start_time && task.end_time) {
                        const startTime = moment(task.start_time, "HH:mm");
                        const endTime = moment(task.end_time, "HH:mm");
                        const duration = moment.duration(
                          endTime.diff(startTime)
                        );
                        return dayTotal + duration.asHours();
                      }
                      return dayTotal;
                    }, 0)
                  );
                },
                0
              );

              weekDetails.totalWorkHours = totalWorkHours.toFixed(2);
            } else {
              weekDetails.totalWorkHours = "0.00";
            }
          } catch (error) {
            console.error(error);
            weekDetails.totalWorkHours = "0.00";
          }

          weeks.push(weekDetails);
          currentWeek++;
          currentWeekDates = [];
        }

        day.add(1, "day");
      }

      // If there are remaining dates, add them as a final week
      if (currentWeekDates.length > 0) {
        const lastWeekDetails = {
          week: currentWeek,
          startDate: currentWeekDates[0],
          endDate: currentWeekDates[currentWeekDates.length - 1],
          dates: currentWeekDates.map((date) => ({
            date: date.format("YYYY-MM-DD"),
            tasks: [],
          })),
          totalWorkHours: "0.00",
        };
        weeks.push(lastWeekDetails);
      }

      setWeeksInMonth(weeks);
    } catch (error) {
      console.error("Error generating weeks:", error);
    } finally {
      setWeekLoading(false); // Hide loader
    }
  };
  const fetchEmployeeList = async () => {
    try {
      const response = await API.CommanApiCall({
        data: {},
        agent: "attendance",
        function: "get_user_status_list",
      });
      console.log("employee", response);
      if (response?.status === 200) {
        setEmployeeList(response.data.data.data || []); // Ensure it's always an array
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchWeekData = async (weekDetails) => {
    // Set form values for the selected week
    console.log("week date", weekDetails.week);
    setFormValues((prev) => ({
      ...prev,
      week: weekDetails.week,
    }));

    const apiData = {
      year: formValues?.year,
      month: formValues?.month,
      week: weekDetails.week,
      user_id: viewMode === "My Logs" ? adminObject?._id : formValues.employee,
    };
    setLoading(true);

    try {
      const response = await API?.CommanApiCall({
        data: apiData,
        agent: "task_list",
        function: "getLogs",
      });

      if (response?.data?.data?.status === 200) {
        setLoading(false);
        message.success("Weekly tasks fetched successfully");
        const tasksByDate = response.data.data.data.tasksByDate;

        const updatedWeekDetails = {
          ...weekDetails,
          dates: weekDetails.dates.map((dateObj) => {
            const dateTasks = tasksByDate[dateObj.date] || [];
            const totalWorkHours = dateTasks.reduce((total, task) => {
              if (task.start_time && task.end_time) {
                const startTime = moment(task.start_time, "HH:mm");
                const endTime = moment(task.end_time, "HH:mm");
                const duration = moment.duration(endTime.diff(startTime));
                return total + duration.asHours();
              }
              return total;
            }, 0);

            return {
              ...dateObj,
              tasks: dateTasks,
              totalWorkHours: totalWorkHours.toFixed(2),
            };
          }),
        };

        // Calculate total week work hours
        const weekTotalWorkHours = updatedWeekDetails.dates
          .reduce(
            (total, dateObj) => total + parseFloat(dateObj.totalWorkHours || 0),
            0
          )
          .toFixed(2);
        const finalWeekData = {
          ...updatedWeekDetails,
          totalWorkHours: weekTotalWorkHours,
        };

        const updatedWeeksInMonth = weeksInMonth.map((week) =>
          week.week === weekDetails.week
            ? { ...week, totalWorkHours: weekTotalWorkHours }
            : week
        );
        setWeeksInMonth(updatedWeeksInMonth);

        setWeekData(finalWeekData);
        setSelectedWeek(weekDetails.week);
      } else if (response?.data?.data?.status === 404) {
        const emptyWeekDetails = {
          ...weekDetails,
          dates: weekDetails.dates.map((dateObj) => ({
            ...dateObj,
            tasks: [],
            totalWorkHours: "0.00",
          })),
          totalWorkHours: "0.00",
        };

        // Add zero total work hours to the week details
        const updatedWeeksInMonth = weeksInMonth.map((week) =>
          week.week === weekDetails.week
            ? { ...week, totalWorkHours: "0.00" }
            : week
        );
        setWeeksInMonth(updatedWeeksInMonth);

        setWeekData(emptyWeekDetails);
        setSelectedWeek(weekDetails.week);
      }
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      (viewMode === "My Team" &&
        formValues.year &&
        formValues.month &&
        formValues.employee) ||
      (viewMode === "My Logs" && formValues.year && formValues.month)
    ) {
      setWeekLoading(true); // Show loader
      generateWeeksInMonth(formValues.year, formValues.month).then(() => {
        setWeekLoading(false); // Hide loader after weeks are generated
      });
      setSelectedWeek(null);
      setWeekData(null);
    }
  }, [formValues.year, formValues.month, formValues.employee]);
  useEffect(() => {
    // Reset form values and week data when view mode changes
    setFormValues({
      year: "",
      month: "",
      week: "",
      employee: "",
    });
    setWeekData(null);
    setSelectedWeek(null);
    setWeeksInMonth([]);
  }, [viewMode]);

  const renderWeekSelection = () => {
    return (
      <div>
        {weekLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {weeksInMonth.map((weekData) => (
              <Col key={weekData.week} span={4}>
                <Card
                  hoverable
                  style={{
                    borderColor:
                      selectedWeek === weekData.week ? "#1890ff" : undefined,
                  }}
                  onClick={() => {
                    setLoading(true);
                    const timer = setTimeout(() => {
                      fetchWeekData(weekData);
                      setLoading(false);
                    }, 300);
                    return () => {
                      clearTimeout(timer);
                    };
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Week {weekData.week}
                    <br />
                    {weekData.startDate.format("MMM D")} -{" "}
                    {weekData.endDate.format("MMM D")}
                    <br />
                    {weekData.totalWorkHours !== undefined && (
                      <small>Total Work Hours: {weekData.totalWorkHours}</small>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  };

  const renderDateAccordion = () => {
    if (!weekData) return null;

    return (
      <div style={{ paddingTop: "15px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Collapse accordion>
            {weekData.dates.map((dateData) => (
              <Panel
                header={`${moment(dateData.date).format(
                  "dddd, MMMM D"
                )} - Total Hours: ${dateData.totalWorkHours || "0.00"}`}
                key={dateData.date}
              >
                {renderDateTable(dateData)}
              </Panel>
            ))}
          </Collapse>
        )}
      </div>
    );
  };

  const renderDateTable = (dateData) => {
    if (!dateData.tasks || dateData.tasks.length === 0) {
      return (
        <div style={{ textAlign: "center", color: "gray", padding: "20px" }}>
          No data available for this date
        </div>
      );
    }

    return (
      <Table
        columns={taskColumns}
        dataSource={dateData.tasks}
        rowKey={(record, index) => index}
        pagination={false}
      />
    );
  };

  return (
    <>
      <div className="main-content">
        <div>
          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Col>
              <h3 className="headText mt-2 mb-2 fw-bold">
                {viewMode === "My Logs" ? "Your Task Logs" : "Team's Task Logs"}
              </h3>
            </Col>
            <Col>
              <Radio.Group
                value={viewMode}
                onChange={(e) => {
                  setViewMode(e.target.value);
                  // Reset form when switching view modes
                  setFormValues((prev) => ({
                    ...prev,
                    employee: e.target.value === "My Team" ? "" : prev.employee,
                  }));
                }}
              >
                <Radio.Button value="My Logs">My Logs</Radio.Button>
                <Radio.Button value="My Team">Team Logs</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <div className="row">
            <div className="col-12">
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={6}>
                    <label className="form-label">
                      <span className="mandatory-star me-1">*</span>
                      Year
                    </label>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Year"
                      value={formValues.year}
                      onChange={(value) =>
                        setFormValues((prev) => ({ ...prev, year: value }))
                      }
                    >
                      <Option value="" disabled>
                        Choose a year
                      </Option>
                      {availableYears.map((year) => (
                        <Option key={year} value={year}>
                          {year}
                        </Option>
                      ))}
                    </Select>
                    {formErrors.year && (
                      <p className="text-danger">{formErrors.year}</p>
                    )}
                  </Col>

                  <Col xs={24} md={6}>
                    <label className="form-label">
                      <span className="mandatory-star me-1">*</span>
                      Month
                    </label>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Month"
                      value={formValues.month}
                      onChange={(value) =>
                        setFormValues((prev) => ({ ...prev, month: value }))
                      }
                    >
                      <Option value="" disabled>
                        Choose a month
                      </Option>
                      {months.map((month) => (
                        <Option key={month} value={month}>
                          {month}
                        </Option>
                      ))}
                    </Select>
                    {formErrors.month && (
                      <p className="text-danger">{formErrors.month}</p>
                    )}
                  </Col>

                  {viewMode === "My Team" && (
                    <Col xs={24} md={6}>
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Employee Name
                      </label>
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Employee"
                        value={formValues.employee}
                        onChange={(value) =>
                          setFormValues((prev) => ({
                            ...prev,
                            employee: value,
                          }))
                        }
                      >
                        <Option value="" disabled>
                          Choose a employee
                        </Option>
                        {employeeList.map((employee, ind) => (
                          <Option key={ind} value={employee.user_id}>
                            {employee.first_name}
                          </Option>
                        ))}
                      </Select>
                      {formErrors.employee && (
                        <p className="text-danger">{formErrors.employee}</p>
                      )}
                    </Col>
                  )}
                </Row>
              </Card>
            </div>
          </div>

          {renderWeekSelection()}
          {renderDateAccordion()}
        </div>
      </div>
    </>
  );
};

export default TaskAccordian;
