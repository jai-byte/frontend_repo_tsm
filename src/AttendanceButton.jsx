import { useEffect, useState } from "react";
import API from "./Api/Api";
import { Tooltip } from "antd";
import { message } from "antd";

const AttendanceButton = ({ onAttendanceUpdate }) => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));

  const [status, setStatus] = useState(() => {
    const storedStatus = localStorage.getItem("attendanceStatus");
    return storedStatus ? storedStatus : "logged_out"; // Default to "logged_out" if no value is found
  });

  useEffect(() => {
    localStorage.setItem("attendanceStatus", status);
  }, [status]);

  const handleAttendance = async () => {
    const newStatus = status === "logged_in" ? "logged_out" : "logged_in"; // Toggle status

    const requestData = {
      user_id: adminObject?._id,
      status: newStatus,
      reason: "manual",
    };

    try {
      const response = await API.CommanApiCall({
        data: requestData,
        agent: "attendance",
      });

      if (response?.data?.data?.status === 200) {
        setStatus(newStatus);
        onAttendanceUpdate();

        const successMessage =
          newStatus === "logged_in"
            ? "Logged in successfully"
            : "Logged out successfully";
        message.success(successMessage);
      } else {
        message.error(response?.data?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      message.error("An error occurred while updating attendance.");
    }
  };

  return (
    <div style={{ paddingRight: "20px" }}>
      <Tooltip
        title={status === "logged_in" ? "Click to logout" : "Click to login"}
      >
        <button
          onClick={handleAttendance}
          style={{
            width: "80px",
            height: "25px",
            color: status === "logged_in" ? "#f49a0b" : "green",
            backgroundColor: "#fff",
            border: `2px solid ${status === "logged_in" ? "#f49a0b" : "green"}`,
            borderRadius: "15px",
            fontWeight: "bold",
          }}
        >
          {status === "logged_in" ? "Logout" : "Login"}
        </button>
      </Tooltip>
    </div>
  );
};

export default AttendanceButton;
