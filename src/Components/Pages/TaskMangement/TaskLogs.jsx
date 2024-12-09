/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";

import { Collapse, Tooltip, message, Select } from "antd";
import moment from "moment";
import "./timeSheet.css";
import TaskAccordion from "./TaskAccordian";
const { Panel } = Collapse;
const { Option } = Select;

//import Pagination from "../Common/Pagination";

const TaskLogs = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const { state } = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const initialValues = {
    year: "",
    month: "",
    week: "",
  };
  // const [formValues, setFormValues] = useState(initialValues);
  const [loadingData, setLoadingData] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const startOfWeek = currentDate.clone().startOf("week");
  const [viewType, setViewType] = useState("Weekly"); // Default view
  const currentMonth = new Date().getMonth();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Task Management" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Task Logs" && sub.is_active === true
        )
    );

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.year) {
      errors.year = "Please select year";
    }
    if (!values.month) {
      errors.task_description = "Please select month";
    }
    if (!values.week) {
      errors.project_name = "Please select week";
    }

    setFormErrors(errors);
    console.log("Errors", errors);

    return errors;
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      const apiData = {
        year: formValues?.year,
        month: formValues?.month,
        week: formValues?.week,
        user_id: adminObject?._id,
      };

      try {
        API?.CommanApiCall({
          data: apiData,
          agent: "task_list",
          function: "getLogs",
        }).then((response) => {
          console.log(response);
          if (response?.data?.data?.status === 200) {
            setLoading(false);
            message.success("Submitted Successfully");
            // setEditItemId(null);
            setListingData(response?.data?.data?.data);
            setFormValues(initialValues);
          } else if (response?.data?.data?.status === 404) {
            setErrorMessage(response?.data?.data?.message);
            setLoading(false);
            message.error(response?.data?.data?.message);
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
  console.log("listing data", listingData);

  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}

          <TaskAccordion />
        </div>
      </div>
    </>
  );
};

export default TaskLogs;
