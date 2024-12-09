import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceButton from "../../AttendanceButton";
import API from "../../Api/Api";

export default function DateAndTimeLayout() {
  const [loginTime, setLoginTime] = useState(null);
  const [recentLoginTime, setRecentLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [totalHoursWorked, setTotalHoursWorked] = useState(null);

  const [loadingData, setLoadingData] = useState(true);

  const fetchAttendanceDetails = async () => {
    setLoadingData(true);
    try {
      const response = await API?.CommanApiCall({
        data: {},
        agent: "attendance",
        function: "get_attendance_list_id",
      });

      if (response?.data?.data?.status === 200) {
        const attendanceData = response.data.data.data || {};
        console.log("Attendance Data:", attendanceData);

        const { firstLogin, recentLogin, lastLogout, totalHours } =
          attendanceData;

        setLoginTime(firstLogin || null);
        setRecentLoginTime(recentLogin || null);
        setLogoutTime(lastLogout || null);

        setTotalHoursWorked(totalHours);
      } else {
        console.error("Failed to fetch attendance details:", response?.data);
      }
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    } finally {
      setLoadingData(false);
    }
  };

  // Calculate the duration between two timestamps in hours
  const calculateDuration = (start, end) => {
    const startMoment = moment(start);
    const endMoment = moment(end);
    if (startMoment.isValid() && endMoment.isValid()) {
      const duration = moment.duration(endMoment.diff(startMoment));
      return duration.asHours().toFixed(2);
    }
    return null;
  };

  useEffect(() => {
    fetchAttendanceDetails();
  }, []);

  return (
    <div className="row">
      <div className="col-12" style={{ height: "110px" }}>
        <div
          className="page-title-box d-flex align-items-center justify-content-end"
          style={{ paddingTop: "13px" }}
        >
          <AttendanceButton onAttendanceUpdate={fetchAttendanceDetails} />

          <h4
            className="page-title mb-0 font-size-16 fw-normal text-end text-black"
            style={{ fontSize: "14px" }} // Adjust font size for compactness
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "14px", // Add small spacing between rows/columns
                textAlign: "left",
                lineHeight: "1.2", // Compact line height
              }}
            >
              <div style={{ fontSize: "13px" }}>
                <strong>First Login:</strong>{" "}
                {loginTime ? moment(loginTime).format("h:mm A") : "--:--"}
              </div>
              <div style={{ fontSize: "13px" }}>
                <strong>Recent Login:</strong>{" "}
                {recentLoginTime
                  ? moment(recentLoginTime).format("h:mm A")
                  : "--:--"}
              </div>
              <div style={{ fontSize: "13px" }}>
                <strong>Logout:</strong>{" "}
                {logoutTime ? moment(logoutTime).format("h:mm A") : "--:--"}
              </div>
              <div style={{ fontSize: "13px" }}>
                <strong>Total Work Hours:</strong>{" "}
                {totalHoursWorked !== null ? totalHoursWorked : "0 hr 0 min"}
              </div>
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
}
