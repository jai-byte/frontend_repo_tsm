/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import AdminRoute from "./../../../Route/RouteDetails";
import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import FilterSearch from "../../Common/FilterSearch";
import {
  DownloadOutlined,
  EditFilled,
  FileExcelOutlined,
} from "@ant-design/icons";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { Tooltip, message } from "antd";
import Pagination from "../../Common/Pagination";
import * as XLSX from "xlsx";
import moment from "moment";

const AttendanceReport = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [formErrors, setFormErrors] = useState({});

  const [EmployeeList, setEmployeeList] = useState([]);
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
    from_date: "",
    to_date: "",
    employee_id: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [loadingData, setLoadingData] = useState(false);
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "Leave Name", value: "leave_name" },
    { label: "Leave Code", value: "leave_code" },
  ];
  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Report" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Attendance Report" && sub.is_active === true
        )
    );

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();

  // const exportToExcel = () => {
  //   if (!listingData || listingData.length === 0) {
  //     message.error("No data available to export");
  //     return;
  //   }

  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.aoa_to_sheet([]);

  //   // Adjust date range to match exact backend dates
  //   const startDate = listingData[0]?.dateStats?.[0]?.date;
  //   const endDate =
  //     listingData[0]?.dateStats?.[listingData[0]?.dateStats?.length - 1]?.date;

  //   // Display the exact date range from the backend or fallback to form values
  //   const dateRangeRow = [
  //     `Date Range: ${
  //       startDate
  //         ? new Date(startDate).toLocaleDateString("en-GB")
  //         : formValues.from_date
  //     } to ${
  //       endDate
  //         ? new Date(endDate).toLocaleDateString("en-GB")
  //         : formValues.to_date
  //     }`,
  //   ];

  //   XLSX.utils.sheet_add_aoa(worksheet, [dateRangeRow], { origin: "A1" });

  //   worksheet["!merges"] = [
  //     {
  //       s: { r: 0, c: 0 },
  //       e: { r: 0, c: 10 },
  //     },
  //   ];
  //   worksheet["A1"].s = {
  //     fill: { fgColor: { rgb: "4F81BD" } },
  //     font: { color: { rgb: "FFFFFF" }, bold: true },
  //     alignment: { horizontal: "center" },
  //   };

  //   const headers = [
  //     "Employee Name",
  //     ...allDates.map((date) => new Date(date).toLocaleDateString("en-GB")),
  //     "Total Days",
  //     "Total Present",
  //     "Total Absent",
  //     "Total Leaves",
  //     "Total Holidays",
  //   ];

  //   XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A2" });

  //   const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
  //   for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
  //     const headerCell = XLSX.utils.encode_cell({ r: 1, c: col });
  //     worksheet[headerCell].s = {
  //       fill: { fgColor: { rgb: "4F81BD" } },
  //       font: { color: { rgb: "FFFFFF" }, bold: true },
  //       alignment: { horizontal: "center" },
  //     };
  //   }

  //   const dataRows = listingData.map((employee) => {
  //     const dateStatuses = allDates.map((date) => {
  //       const dateStat = employee.dateStats.find(
  //         (stat) =>
  //           new Date(stat.date).toISOString() === new Date(date).toISOString()
  //       );
  //       return dateStat ? dateStat.status : "N/A";
  //     });

  //     return [
  //       employee.employee_name,
  //       ...dateStatuses,
  //       employee.summary_stats.total_days,
  //       employee.summary_stats.total_present,
  //       employee.summary_stats.total_absent,
  //       employee.summary_stats.total_leave,
  //       employee.summary_stats.total_holiday,
  //     ];
  //   });

  //   XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: "A3" });

  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
  //   XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  // };
  const exportToExcel = () => {
    if (!listingData || listingData.length === 0) {
      message.error("No data available to export");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Styling for header and date range rows
    const headerStyle = {
      fill: { fgColor: { rgb: "4F81BD" } },
      font: { color: { rgb: "FFFFFF" }, bold: true },
      alignment: { horizontal: "center" },
    };

    // Prepare date range
    const startDate = listingData[0]?.dateStats?.[0]?.date
      ? moment.utc(listingData[0].dateStats[0].date).startOf("day").toDate()
      : null;

    const endDate = listingData[0]?.dateStats?.[
      listingData[0]?.dateStats?.length - 1
    ]?.date
      ? moment
          .utc(
            listingData[0].dateStats[listingData[0].dateStats.length - 1].date
          )
          .startOf("day")
          .toDate()
      : null;

    // Company Name Row
    const companyNameRow = ["Attendance Report"];
    XLSX.utils.sheet_add_aoa(worksheet, [companyNameRow], { origin: "A1" });

    // Date Range Row
    const dateRangeRow = [
      `Date Range: ${
        startDate
          ? moment.utc(startDate).format("DD/MM/YYYY")
          : moment(formValues.from_date).format("DD/MM/YYYY")
      } to ${
        endDate
          ? moment.utc(endDate).format("DD/MM/YYYY")
          : moment(formValues.to_date).format("DD/MM/YYYY")
      }`,
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [dateRangeRow], { origin: "A2" });

    // Merge and style company name and date range rows
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 10 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 10 } },
    ];

    // Style company name and date range rows
    worksheet["A1"].s = headerStyle;
    worksheet["A2"].s = headerStyle;

    // Prepare headers
    const headers = [
      "Employee Name",
      ...allDates.map((date) => new Date(date).toLocaleDateString("en-GB")),
      "Total Days",
      "Total Present",
      "Total Absent",
      "Total Leaves",
      "Total Holidays",
    ];

    // Add headers
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A3" });

    // Style headers
    const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const headerCell = XLSX.utils.encode_cell({ r: 2, c: col });
      worksheet[headerCell].s = headerStyle;
    }

    // Generate Data Rows
    const dataRows = listingData.map((employee) => {
      const dateStatuses = allDates.map((date) => {
        // Normalize both the dateStat.date and the date from allDates to remove the time part
        const normalizedDate = new Date(
          Date.UTC(
            new Date(date).getUTCFullYear(),
            new Date(date).getUTCMonth(),
            new Date(date).getUTCDate()
          )
        ).toISOString();

        const dateStat = employee.dateStats.find((stat) => {
          // Normalize the employee's dateStat.date to compare it with the normalized date
          const normalizedStatDate = new Date(
            Date.UTC(
              new Date(stat.date).getUTCFullYear(),
              new Date(stat.date).getUTCMonth(),
              new Date(stat.date).getUTCDate()
            )
          ).toISOString();

          return normalizedStatDate === normalizedDate;
        });

        return dateStat ? dateStat.status : "N/A";
      });

      return [
        employee.employee_name,
        ...dateStatuses,
        employee.summary_stats.total_days,
        employee.summary_stats.total_present,
        employee.summary_stats.total_absent,
        employee.summary_stats.total_leave,
        employee.summary_stats.total_holiday,
      ];
    });

    // Add data rows
    XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: "A4" });

    // Create workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  };
  const validate = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.from_date) {
      errors.from_date = "Please enter start date";
    }
    if (!values.to_date) {
      errors.to_date = "Please enter end date";
    }

    // if (!values.leaves) {
    //   errors.leave = "Please type numbers of leave to be provide.";
    // }
    setFormErrors(errors);
    console.log("Erroes", errors);

    return errors;
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
  const allDates = [
    ...new Set(
      listingData.flatMap((employee) =>
        employee.dateStats.map((dateStat) => {
          // Ensure dates are treated as UTC to avoid timezone issues
          const date = new Date(dateStat.date);
          // Normalize the date to remove time part
          return new Date(
            Date.UTC(
              date.getUTCFullYear(),
              date.getUTCMonth(),
              date.getUTCDate()
            )
          ).toISOString();
        })
      )
    ),
  ].sort((a, b) => new Date(a) - new Date(b));

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      const apiData = {
        from_date: formValues?.from_date,
        to_date: formValues?.to_date,
        employee_id: formValues?.employee_id,
      };
      console.log("api Data", apiData);
      //
      try {
        API?.CommanApiCall({
          data: apiData,
          agent: "attendance",
          function: "get_user_attendance_report",
        }).then((response) => {
          console.log(response);
          if (response?.data?.data?.status === 200) {
            setLoading(false);
            message.success("Submitted Successfully");

            setFormValues(initialValues);
            setListingData(response?.data?.data?.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleEdit = (item) => {
    setEditItemId(item._id);
    formik.setValues({
      leave_code: item.leave_code,
      leave_name: item.leave_name,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  console.log("listing data", listingData);

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
                    Attendance Report
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
              {errorMessage ? (
                <span className="text-danger text-end">{errorMessage}</span>
              ) : null}
              <div className="col-xl-6 col-lg-6">
                <div className="me-xl-5">
                  {/* content title */}
                  <div className="d-flex mb-3">
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

                    <div className="col-8  ">
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
                    <div className="col-6">
                      <label className="form-label">
                        <span className="mandatory-star me-1"></span>
                        Employee Name
                      </label>
                      <div>
                        <select
                          className="form-select bg-white"
                          aria-label="Default select example"
                          name="employee_id"
                          onChange={(e) => handleChange(e)}
                          value={formValues?.employee_id}
                        >
                          <option value="">Select</option>
                          {/* {employeeType?.map((ele, index) => {
                              // if (ele?.is_active)
                              return (
                                <option key={index} value={ele}>
                                  {ele}
                                </option>
                              );
                            })} */}
                          {EmployeeList &&
                            EmployeeList?.map((ele, index) => {
                              return (
                                <option
                                  selected=""
                                  value={ele?._id}
                                  key={index}
                                >
                                  {ele?.first_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginTop: "25px", marginLeft: "30px" }}>
                      {CheckAccess ? (
                        <div className="saveBtn">
                          <button
                            className="btn profileBtn text-white px-4 float-end"
                            onClick={(e) => handleSave(e)}
                            disabled={loading}
                            style={{
                              display: "flex",
                              backgroundColor: "#62a6dc",
                              borderRadius: "20px",
                              fontWeight: "bold",
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
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2" id="">
            <div className="col-6"></div>
            {/* <FilterSearch
              FilterOptions={FilterOptions}
              search={search}
              setSearch={setSearch}
              filterselect={filterselect}
              setFilterSelect={setFilterSelect}
            /> */}
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
                    <th style={{ width: "150px" }}>Employee Name</th>
                    {allDates.map((date) => (
                      <th
                        key={date}
                        style={{ width: "100px", textAlign: "center" }}
                      >
                        {new Date(date).toLocaleDateString("en-GB")}
                      </th>
                    ))}
                    <th style={{ width: "80px" }}>Total Days</th>
                    <th style={{ width: "80px" }}>Working Days</th>

                    <th style={{ width: "80px" }}>Total Present</th>
                    <th style={{ width: "80px" }}>Total Absent</th>
                    <th style={{ width: "80px" }}>Total Leaves</th>
                    <th style={{ width: "80px" }}>Total Holidays</th>
                    <th style={{ width: "50px" }} onClick={exportToExcel}>
                      <Tooltip title="Download">
                        <FileExcelOutlined
                          style={{ fontSize: "24px", color: "#62A6DC" }}
                        />
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listingData && listingData.length > 0 ? (
                    listingData.map((employee) => {
                      const dateStatuses = allDates.map((date) => {
                        // Normalize both the dateStat.date and the date from allDates to remove the time part
                        const normalizedDate = new Date(
                          Date.UTC(
                            new Date(date).getUTCFullYear(),
                            new Date(date).getUTCMonth(),
                            new Date(date).getUTCDate()
                          )
                        ).toISOString();

                        const dateStat = employee.dateStats.find((stat) => {
                          // Normalize the employee's dateStat.date to compare it with the normalized date
                          const normalizedStatDate = new Date(
                            Date.UTC(
                              new Date(stat.date).getUTCFullYear(),
                              new Date(stat.date).getUTCMonth(),
                              new Date(stat.date).getUTCDate()
                            )
                          ).toISOString();

                          return normalizedStatDate === normalizedDate; // Compare normalized dates
                        });

                        return dateStat ? dateStat.status : "N/A"; // Return the status or "N/A" if no status found
                      });

                      return (
                        <tr key={employee.employee_id}>
                          <td style={{ width: "150px" }}>
                            {employee.employee_name}
                          </td>
                          {dateStatuses.map((status, index) => (
                            <td
                              key={index}
                              style={{ width: "100px", textAlign: "center" }}
                            >
                              {status}
                            </td>
                          ))}
                          <td style={{ width: "80px" }}>
                            {employee.summary_stats.total_days}
                          </td>
                          <td style={{ width: "80px" }}>
                            {employee.summary_stats.total_working_days}
                          </td>
                          <td style={{ width: "80px" }}>
                            {employee.summary_stats.total_present}
                          </td>
                          <td style={{ width: "80px" }}>
                            {employee.summary_stats.total_absent}
                          </td>
                          <td style={{ width: "80px" }}>
                            {employee.summary_stats.total_leave}
                          </td>
                          <td style={{ width: "80px" }}>
                            {employee.summary_stats.total_holiday}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No data Found
                      </td>
                    </tr>
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

export default AttendanceReport;
