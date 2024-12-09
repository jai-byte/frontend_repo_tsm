/* eslint-disable */
import React, { useEffect, useState, useRef, useCallback } from "react";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ToastContainer, toast } from "react-toastify";
import API from "../../../Api/Api";
import { saveAs } from "file-saver";
import "tippy.js/dist/tippy.css";
import dummy from "../../../assets/images/dummy-profile.jpg";
import "../../../index.css";
import AttendanceCalendar from "../../../AttendanceCalendar";
import { ReloadOutlined } from "@ant-design/icons";
import myProfileImg from "../../../assets/images/dummy-profile1.jpg"
import { Tooltip } from "antd";

const Dashboard = () => {
  const [duration, setDuration] = useState("monthly");
  const [dashboardDetails, setDashboardDetails] = useState("");
  const calendarRef = useRef(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [events, setEvents] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [CosumptionDetails, setConsumptionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfileDetails, setUserProfileDetails] = useState("");
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  console.log("admin", adminObject);
  const [EmployeeList, setEmployeeList] = useState([]);

  const GetDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "createAdminUser",
        function: "getUserDetails",
        data: {
          _id: adminObject._id,
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          setUserProfileDetails(response?.data?.data?.data[0]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeeList = async () => {
    setLoadingTeam(true);
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
    } finally {
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  useEffect(() => {
    GetDetails();
  }, []);

  console.log("jksflsdfljdlfjs", EmployeeList);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (Array.isArray(EmployeeList) && EmployeeList.length > 0) {
      // Set the filtered employees based on your logic (e.g., all employees or filtered list)
      setFilteredEmployees(EmployeeList);
    }
  }, [EmployeeList]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.on("datesSet", (info) => {
        setCurrentMonth(info.view.currentStart.getMonth() + 1);
        setCurrentYear(info.view.currentStart.getFullYear());
      });
    }
  }, [currentMonth]);

  const handleDateNav = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  };

  // click for export data in csv

  const getEvents = async () => {
    try {
      await API?.CommanApiCall({
        data: {
          month: currentMonth,
          year: currentYear,
          timeframe: "halfYearly",
        },
        agent: "dashboard",
      }).then(async (response) => {
        console.log("Dashboard Details ", response?.data?.data?.data);
        setDashboardDetails(response?.data?.data?.data);
        await setEvents(response?.data?.data?.data?.eventCount);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const getEVventsCb = useCallback(getEvents, [events.length]);
  // useEffect(() => {
  //   getEVventsCb();
  // }, [getEVventsCb]);

  const count0 = dashboardDetails?.communityCount?.[0]?.count || 0;
  const count1 = dashboardDetails?.communityCount?.[1]?.count || 0;
  const totalCommunitiesCount = count0 + count1;

  const user1 =
    dashboardDetails && dashboardDetails?.userCount.length
      ? dashboardDetails?.userCount[0]?.count
      : 0;
  const user2 =
    dashboardDetails && dashboardDetails?.userCount.length > 1
      ? dashboardDetails?.userCount[1]?.count
      : 0;

  const totalUser = user1 + user2;

  const handleClickCSV = () => {
    if (duration) {
      try {
        API?.CommanApiCall({
          agent: "dashboard",
          function: "exportToCsv",
          data: {
            timeframe: duration,
          },
        })
          .then((response) => {
            if (response?.data?.data?.status === 200) {
              let csvContent = response.data.data.data;
              console.log("CSV Content:", csvContent);

              // Ensure CSV content is formatted correctly
              csvContent = fixCsvFormatting(csvContent);

              if (csvContent) {
                const blob = new Blob([csvContent], { type: "text/csv" });
                saveAs(blob, "exported_data.csv");
              } else {
                console.error("Invalid CSV content:", csvContent);
              }
            } else {
              console.error(
                "API returned status:",
                response?.data?.data?.status
              );
            }
          })
          .catch((error) => {
            console.error("API call failed:", error);
          });
      } catch (error) {
        console.error("Error during API call:", error);
      }
    } else {
      toast.warning("Please select duration");
    }
  };

  // Function to fix CSV formatting
  const fixCsvFormatting = (csvContent) => {
    // Add necessary headers if missing
    const headers = "header1,header2,header3,..."; // replace with actual headers
    if (!csvContent.startsWith(headers)) {
      csvContent = `${headers}\n${csvContent}`;
    }

    // Ensure each row is properly terminated
    csvContent = csvContent
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    return csvContent;
  };

  const formatRevenue = (revenue) => {
    if (revenue >= 1000) {
      // If revenue is greater than or equal to 1000, convert it to k format
      return (revenue / 1000)?.toFixed(0) + "k";
    } else {
      // Otherwise, just return the revenue as is
      return revenue?.toString();
    }
  };

  useEffect(() => {
    GetConsumerConseptionDetails();
  }, []);

  //Api for get consumer consumption details
  const GetConsumerConseptionDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "holiday_create",
        function: "get_holiday_list",
        // data: {
        //   user_id: parseInt(id),
        // },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setConsumptionDetails(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    filteredEmployees,
    "jdaskljfsdjflksjlkfjsdkljflksdjfklsjfljslfjlsjdljdlfj"
  );

  const handleSearchEmployee = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const filteredData = EmployeeList.filter((employee) =>
      employee.first_name.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredEmployees(filteredData);
  };

  return (
    <>
      <ToastContainer />
      <div className="main-content" id="dashboard">
        <div className="page-content h-100 ">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-xl-6">
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "7px",
                  height: "240px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <img
                  // crossOrigin="Anonymous"
                  src={myProfileImg}
                  alt="Profile"
                  className="profile"
                  id="profile-picture-custome"
                  style={{
                    width: "160px", // Decrease the width of the image
                    height: "160px", // Adjust height to maintain aspect ratio if needed
                    borderRadius: "50%", // Optional: To make the image circular
                  }}
                />
                <div
                  className="consumerProfileText ms-3"
                  style={{
                    flex: 1,
                  }}
                >
                  <h3
                    className="fw-bold letter-spacing-6"
                    style={{ marginBottom: "20px" }}
                  >
                    {adminObject && adminObject?.first_name}{" "}
                    {adminObject && adminObject?.last_name}
                  </h3>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    {/* <div>
                      <p style={{ color: "#A9A9A9" }}>
                        Role:{" "}
                        <span
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "13px",
                            paddingLeft: "4px",
                          }}
                        >
                          {adminObject.role_details.name}
                        </span>
                      </p>
                    </div> */}
                    <div>
                      <p style={{ color: "#A9A9A9" }}>
                        Position:{" "}
                        <span
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "13px",
                            paddingLeft: "4px",
                          }}
                        >
                          {adminObject.employee_type || "Management"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: "#A9A9A9" }}>
                      Email:{" "}
                      <span
                        style={{
                          color: "black",
                          fontWeight: "normal",
                          fontSize: "13px",
                          paddingLeft: "4px",
                        }}
                      >
                        {adminObject.email}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#A9A9A9" }}>
                      Phone:{" "}
                      <span
                        style={{
                          color: "black",
                          fontWeight: "normal",
                          fontSize: "13px",
                          paddingLeft: "4px",
                        }}
                      >
                        {adminObject.mobile_no}
                      </span>
                    </p>
                  </div>
                  {/* <LinkedinFilled style={{ fontSize: "1.5rem", color: "#1877F2" }} /> */}
                </div>
              </div>

              <div
                className="main-card bg-white p-4"
                style={{ borderRadius: "7px" }}
              >
                <h3 className="fw-bold">Holiday Calendar</h3>

                {/* <img src={contentConsumtionImg} className="img-fluid w-70" /> */}
                <div className="row mt-3">
                  <div className="col-12">
                    <table
                      className="table tablesWrap scrollTable"
                      style={{
                        width: "100%", // Ensure the table uses the full available width
                        borderCollapse: "collapse", // Collapses table borders to avoid double borders
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="lightGrey"
                            style={{ fontWeight: "600" }}
                          >
                            Holiday Name
                          </th>
                          <th
                            scope="col"
                            className="lightGrey"
                            style={{ fontWeight: "600" }}
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        style={{
                          overflowY: "scroll",
                          maxHeight: "300px",
                        }}
                      >
                        {loading ? (
                          <tr>
                            <td colSpan={2}>
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <>
                            {CosumptionDetails && CosumptionDetails?.length ? (
                              CosumptionDetails?.map((ele, index) => {
                                return (
                                  <tr key={index}>
                                    <td
                                      scope="row"
                                      className="darkGrey fw-bold"
                                    >
                                      {ele?.holiday_name} (
                                      {ele?.is_compulsory
                                        ? "Compulsory"
                                        : "Optional"}
                                      )
                                    </td>
                                    <td className="darkGrey">
                                      {new Date(
                                        ele?.holiday_date
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}{" "}
                                      {ele?.paid_amount}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={2} className="text-center">
                                  No data Found
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div
                className="main-card bg-white p-4"
                style={{
                  borderRadius: "7px",
                  width: "100%",
                }}
              >
                <div className="my_team_dashboard">
                  <h3 className="fw-bold">My Team </h3>
                  <Tooltip title="Refresh">
                    <div
                      onClick={fetchEmployeeList}
                      style={{ paddingRight: "10px", cursor: "pointer" }}
                    >
                      <ReloadOutlined
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                      />
                    </div>
                  </Tooltip>
                </div>

                <div className="mt-3 mb-3" style={{ padding: "0 20px 0 10px" }}>
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => handleSearchEmployee(e)}
                    className="form-control"
                    style={{ borderRadius: "7px" }}
                  />
                </div>
                {/* Map through the employees list */}
                <div
                  className="row mt-3 custom-scrollbar"
                  style={{
                    height: "330px",
                    margin: "0 auto",
                    overflowY: "auto",
                  }}
                >
                  <div className="col-12">
                    {loadingTeam ? (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {filteredEmployees && filteredEmployees.length ? (
                          filteredEmployees.map((employee, index) => (
                            <div
                              key={index}
                              className="team-card d-flex align-items-center mb-3 "
                              style={{
                                backgroundColor: "white",
                                borderRadius: "15px",
                                padding: "10px",
                                position: "relative",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                height: "90px",
                              }}
                            >
                              <img
                                // src={employee.profilePicture}
                                src={dummy}
                                alt={`${employee.first_name}`}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "50%",
                                  marginRight: "20px",
                                  objectFit: "cover",
                                }}
                              />
                              <div style={{ marginTop: "18px" }}>
                                <h5
                                  className="fw-bold"
                                  style={{ marginBottom: "5px" }}
                                >
                                  {employee.first_name}
                                </h5>
                                <p
                                  style={{
                                    marginBottom: "3px",
                                    color: "#A9A9A9",
                                  }}
                                >
                                  Email:{" "}
                                  <span
                                    style={{
                                      color: "black",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {employee.email}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    marginBottom: "0px",
                                    color: "#A9A9A9",
                                  }}
                                >
                                  Contact:{" "}
                                  <span
                                    style={{
                                      color: "black",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {employee.mobile}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    marginBottom: "15px",
                                    color: "#A9A9A9",
                                  }}
                                >
                                  Position:{" "}
                                  <span
                                    style={{
                                      color: "black",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {employee.employee_type}
                                  </span>
                                </p>
                              </div>

                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: employee.online_status
                                    ? "green"
                                    : "red",
                                  position: "absolute",
                                  right: "30px",

                                  border: "2px solid white",
                                  pointerEvents: "none", // Prevent hover interaction
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-center">No employees found</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div
                className="main-card bg-white p-4"
                style={{ borderRadius: "7px" }}
              >
                <h3 className="fw-bold">Attendance</h3>
                <div>
                  <AttendanceCalendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
