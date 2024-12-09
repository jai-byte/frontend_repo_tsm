import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import API from "./Api/Api";
import "./index.css";

const AttendanceCalendar = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const [calendarData, setCalendarData] = useState({
    attendance: [],
    holidays: [],
  });
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem("TajurbaAdminUser") || "{}");
  const registerDate = userData.createdAt;

  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "attendance",
          function: "getUserCalendarData",
        });
        console.log("i'msfklsjf lsdfjsdiofjldsjflslf", response);
        if (response?.data?.data?.status === 200) {
          setCalendarData(response.data.data.data);
        } else {
          console.error(
            "Failed to fetch calendar data:",
            response?.data?.message
          );
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const handleEventRender = (info) => {
    let tooltipContent = "";
    if (info.event.extendedProps.type === "attendance") {
      tooltipContent = `
        <div>
          <strong>Status:</strong> ${info.event.title}<br>
          <strong>Check In:</strong> ${
            info.event.extendedProps.checkIn || "N/A"
          }<br>
          <strong>Check Out:</strong> ${
            info.event.extendedProps.checkOut || "N/A"
          }
        </div>
      `;
    } else if (info.event.extendedProps.type === "holiday") {
      tooltipContent = `
        <div>
          <strong>Holiday:</strong> ${info.event.title}<br>
          <strong>Description:</strong> ${
            info.event.extendedProps.description || "N/A"
          }
        </div>
      `;
    } else if (info.event.extendedProps.type === "absent") {
      tooltipContent = `
        <div>
          <strong>Status:</strong> Absent
        </div>
      `;
    } else if (info.event.extendedProps.type === "weekend") {
      tooltipContent = `
        <div>
          <strong>Status:</strong> Weekend Off
        </div>
      `;
    }

    tippy(info.el, {
      content: tooltipContent,
      allowHTML: true,
      placement: "top",
    });
  };

  const isWeekend = (date) => {
    const day = date.getDay();

    return day === 1;
  };

  const transformEvents = () => {
    const events = [];
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const attendanceDates = new Set(
      calendarData.attendance.map((record) => record.date)
    );
    const leaveDates = new Set(
      calendarData.attendance
        .filter((record) => record.type === "leave")
        .map((record) => record.date)
    );
    const holidayDates = new Set(
      calendarData.holidays.map((holiday) => holiday.date)
    );

    // Add attendance records
    calendarData.attendance.forEach((record) => {
      events.push({
        title: "Present",
        start: record.date,
        end: record.date,
        backgroundColor: "#4CAF50", // Green
        borderColor: "#4CAF50",
        type: "attendance",
        checkIn: record.checkIn,
        checkOut: record.checkOut,
      });
    });

    // Add holiday records
    calendarData.holidays.forEach((holiday) => {
      events.push({
        title: holiday.name || "Holiday",
        start: holiday.date,
        end: holiday.date,
        backgroundColor: "#FFC107", // Yellow
        borderColor: "#FFC107",
        type: "holiday",
        description: holiday.description,
      });
    });

    // Process dates from registration to the current date
    let currentDateIter = new Date(registerDate);
    const isWeekend = (date) => date.getDay() === 0; // Sundays

    while (currentDateIter <= currentDate) {
      const dateString = currentDateIter.toISOString().split("T")[0];

      // Skip the current date for absent marking
      if (dateString === currentDateString) {
        currentDateIter.setDate(currentDateIter.getDate() + 1);
        continue;
      }

      // Add holidays
      if (holidayDates.has(dateString)) {
        const holiday = calendarData.holidays.find(
          (h) => h.date === dateString
        );
        events.push({
          title: holiday.name || "Holiday",
          start: dateString,
          end: dateString,
          backgroundColor: "#FFC107", // Yellow
          borderColor: "#FFC107",
          type: "holiday",
          description: holiday.description,
        });
      }

      // Add weekends
      else if (isWeekend(currentDateIter)) {
        events.push({
          title: "",
          start: dateString,
          end: dateString,
          backgroundColor: "#9E9E9E", // Gray
          borderColor: "#9E9E9E",
          type: "weekend",
        });
      }

      // Add leaves
      else if (leaveDates.has(dateString)) {
        events.push({
          title: "Leave",
          start: dateString,
          end: dateString,
          backgroundColor: "#8E44AD", // Purple
          borderColor: "#8E44AD",
          type: "leave",
        });
      }

      // Add absents for past dates (not holidays, weekends, leaves, or current date)
      else if (!attendanceDates.has(dateString)) {
        events.push({
          title: "",
          start: dateString,
          end: dateString,
          backgroundColor: "#F44336", // Red
          borderColor: "#F44336",
          type: "absent",
        });
      }

      currentDateIter.setDate(currentDateIter.getDate() + 1);
    }

    return events;
  };

  if (loading) {
    return (
      <div
        className="calendar-container"
        style={{
          width: "100%",
          height: "600px",
          background: "#f5f5f5",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="loading-spinner"
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <>
      <div
        className="calendar-container"
        style={{
          width: "100%",
          padding: "10px 0",
        }}
      >
        <div className="custom-scrollbar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "title", // Place month name/title on the left
              center: "", // No content in the center
              right: "prev,next today", // Actions (prev, next, today) on the right
            }}
            events={transformEvents()}
            eventDidMount={handleEventRender}
            className="custom-scrollbar"
          />
        </div>
      </div>
      <div
        className="calendar-legend"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "15px",
          paddingTop: "30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#4CAF50",
              borderRadius: "3px",
            }}
            className="status-box"
          ></div>
          <span>Present</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#F44336",
              borderRadius: "3px",
            }}
            className="status-box"
          ></div>
          <span>Absent</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#FFC107",
              borderRadius: "3px",
            }}
            className="status-box"
          ></div>
          <span>Holiday</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#9E9E9E",
              borderRadius: "3px",
            }}
            className="status-box"
          ></div>
          <span className="status-text">Week Off</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#8E44AD",
              borderRadius: "3px",
            }}
            className="status-box"
          ></div>
          <span className="status-text">Leave</span>
        </div>
      </div>
    </>
  );
};

export default AttendanceCalendar;
