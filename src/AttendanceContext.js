import { createContext, useState, useContext, useEffect } from "react";

// Create a context
const AttendanceContext = createContext();

// Provider component
export const AttendanceProvider = ({ children }) => {
  // Retrieve attendance status from localStorage or default to "logged_out"
  const storedAttendanceStatus =
    localStorage.getItem("attendanceStatus") || "logged_out";
  const [attendanceStatus, setAttendanceStatus] = useState(
    storedAttendanceStatus
  );

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // Sync attendance status with localStorage
  useEffect(() => {
    localStorage.setItem("attendanceStatus", attendanceStatus);
  }, [attendanceStatus]);

  const toggleAttendance = (status) => {
    setAttendanceStatus(status);
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceStatus,
        toggleAttendance,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

// Custom hook to use attendance context
export const useAttendance = () => {
  return useContext(AttendanceContext);
};
