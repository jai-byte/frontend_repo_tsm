import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../Common/Pagination";
import { message } from "antd";
import { default as ReactSelect, components } from "react-select";
import FilterSearch from "../../../Common/FilterSearch";
const Moderator = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [listingData, setListingData] = useState([]);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const admin_id = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "Leave Code", value: "leave_code" },
    { label: "Employee Name", value: "employee_name" },
  ];
  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Leave Management" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Leave Credits" && sub.is_active === true
        )
    );

  // Functionality for Filter and search
  // const FilterOptions = [
  //   // { label: "All", value: "all" },
  //   { label: "Title", value: "course_title" },
  //   { label: "Author", value: "author_name" },
  //   { label: "Course Type", value: "course_type" },
  //   { label: "Date", value: "createdAt" },
  // ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");
  const initialValues = {
    _id: [],
    leave_code: "",
    assigned_leave: "",
    //assigned_date: "",
    leaveType: "",
    assigned_by: admin_id._id,
  };

  const [LeaveCodeList, setLeaveCodeList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [goToPage, setGoToPage] = useState(1);
  const [errorMessage, SetErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = (values) => {
    //console.log(values, "value");
    const errors = {};
    if (!values.leave_code) {
      errors.leave_code = "Please select leave code ";
    }
    if (!values._id) {
      errors._id = "Please select Employee name ";
    } else if (formValues._id.length === 0) {
      errors._id = "Please select at least one employee.";
    }

    if (!values.assigned_leave) {
      errors.assigned_leave = "Please type numbers of leave to be provide.";
    }
    if (!values.leaveType) {
      errors.leaveType = "Please select leave mode.";
    }
    setFormErrors(errors);

    return errors;
  };

  useEffect(() => {
    const fetchLeaveCodeList = async () => {
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "leave_create_list",
        });
        // console.log("leave code",response.data.data.data)
        if (response?.status === 200) {
          setLeaveCodeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

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

    fetchLeaveCodeList();
    fetchEmployeeList();
  }, []);
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #ccc" : "1px solid #ddd", // Remove the blue border on focus
      boxShadow: "none", // Remove the default focus shadow
      borderRadius: "4px", // Add border radius
      minHeight: "38px", // Adjust height if needed
      "&:hover": {
        borderColor: "#aaa", // Optional hover effect
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black", // Change placeholder color
      fontSize: "12px",
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove the vertical line separator
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: "3px", // Add border radius for selected options
      backgroundColor: "#e9ecef", // Light background for selected items
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#333", // Color of the selected option text
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#666", // Color for the remove button
      "&:hover": {
        backgroundColor: "#ddd",
        color: "#000",
      },
    }),
  };

  const employeeOptions = EmployeeList
    ? EmployeeList.filter((ele) => ele?.is_active).map((ele) => ({
        value: ele._id,
        label: ele.first_name,
      }))
    : [];
  const CreditLeave = () => {
    try {
      var payload = {
        agent: "leave_credit",
        function: "get_credit_list",
        page_no: currentPage,
        limit: itemsPerPage,
      };
      if (filterselect === "" || search === "") {
        payload.filter = {};
      } else {
        payload.filter = {
          [filterselect]: search,
        };
      }
      API?.CommanApiCall(payload).then((response) => {
        console.log("in fetch", response);
        if (response?.data?.data?.status === 200) {
          setListingData(response.data.data.data);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_records);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    // Update the form values with the selected employee IDs
    setFormValues({
      ...formValues,
      _id: selectedIds,
    });

    // Call handleChange if needed for other fields
    handleChange({ target: { name: "_id", value: selectedIds } });
  };

  useEffect(() => {
    CreditLeave();
  }, [currentPage, itemsPerPage, loading, filterselect, search]);
  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      try {
        console.log("formValues", formValues);
        API?.CommanApiCall({
          data: {
            leave_code: formValues?.leave_code,
            user_id: formValues?._id,
            assigned_leaves: formValues?.assigned_leave,
            assigned_by: formValues?.assigned_by,
            leaveType: formValues?.leaveType,
          },
          agent: "leave_credit",
        }).then((response) => {
          if (response?.data?.data?.status === 200) {
            setLoading(false);
            message.success("Submitted Successfully");
            setFormValues(initialValues);
            // message.success("");
          } else if (response?.data?.data?.status === 201) {
            console.log("errorrr");
            SetErrorMessage(response?.data?.data?.message);
            setLoading(false);
            message.success("Error while submitting");
            setFormValues(initialValues);
            setTimeout(() => {
              SetErrorMessage("");
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
    const { name, value, options } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // const handleSave = () => {
  //   SetErrorMessage("");
  //   setLoading(true);
  //   try {
  //     API?.CommanApiCall({
  //       data: {
  //         leave_code: formik.values.leave_code,
  //         user_id: formik.values._id,
  //         assigned_leaves: formik.values.assigned_leaves,
  //         assigned_by: formik.values.assigned_by,
  //         leaveType: formik.values.leaveType,
  //       },
  //       agent: "leave_credit",
  //     }).then((response) => {
  //       if (response?.data?.data?.status === 200) {
  //         setLoading(false);
  //         message.success("Submitted Successfully");
  //       } else if (response?.data?.data?.status === 201) {
  //         console.log("errorrr");
  //         SetErrorMessage(response?.data?.data?.message);

  //         setTimeout(() => {
  //           SetErrorMessage("");
  //         }, 5000);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
                  <h3 className="headText mt-2 mb-2 fw-bold">Leave Credit</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <div
              className="row justify-content-between main-card p-3"
              style={{ marginLeft: "1px" }}
            >
              {errorMessage ? (
                <span className="text-danger text-end">{errorMessage}</span>
              ) : null}
              <div className="col-xl-6 col-lg-6">
                <div className="me-xl-5">
                  {/* content title */}
                  <div className="d-flex mb-3">
                    <div className="col-8">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Leave Code
                      </label>
                      <select
                        className="form-select w-80 border-radius-2"
                        aria-label="Default select example"
                        name="leave_code"
                        disabled={!CheckAccess}
                        onChange={(e) => handleChange(e)}
                        value={formValues?.leave_code}
                        style={{ cursor: "pointer", height: "38px" }}
                      >
                        <option selected="" value="">
                          Select
                        </option>
                        {LeaveCodeList &&
                          LeaveCodeList?.map((ele, index) => {
                            return (
                              <option
                                selected=""
                                value={ele?.leave_code}
                                key={index}
                              >
                                {ele?.leave_code}
                              </option>
                            );
                          })}
                      </select>
                      <p className="text-danger">{formErrors?.leave_code}</p>
                    </div>
                    <div className="col-8">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Employee Name
                      </label>
                      <ReactSelect
                        options={employeeOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option,
                        }}
                        onChange={handleSelectChange}
                        isDisabled={!CheckAccess}
                        className="w-80 border-radius-2"
                        value={employeeOptions.filter((option) =>
                          formValues._id.includes(option.value)
                        )}
                        styles={customStyles}
                        placeholder="Select"

                        // Hide dropdown list  when select any item
                        // closeMenuOnSelect={true}

                        //Selected Item Remove in dropdown list
                        // hideSelectedOptions={true}
                      />

                      <p className="text-danger">{formErrors?._id}</p>
                    </div>
                    <div className="col-4">
                      <span className="mandatory-star me-1">*</span>
                      <label className="form-label">Leave Mode</label>
                      <div style={{ paddingTop: "10px" }}>
                        <label className="me-3">
                          <input
                            type="radio"
                            name="leaveType"
                            value={formValues?.leaveType}
                            onChange={(e) =>
                              setFormValues({
                                ...formValues,
                                leaveType: "credit",
                              })
                            }
                            checked={formValues.leaveType === "credit"}
                            disabled={!CheckAccess}
                            style={{ cursor: "pointer" }}
                          />
                          <span
                            className="ms-1"
                            style={{ position: "relative", bottom: "3px" }}
                          >
                            Credit
                          </span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="leaveType"
                            value={formValues?.leaveType}
                            onChange={(e) =>
                              setFormValues({
                                ...formValues,
                                leaveType: "debit",
                              })
                            }
                            checked={formValues.leaveType === "debit"}
                            disabled={!CheckAccess}
                            style={{ cursor: "pointer" }}
                          />
                          <span
                            className="ms-1"
                            style={{ position: "relative", bottom: "3px" }}
                          >
                            Debit
                          </span>
                        </label>
                      </div>
                      <p className="text-danger">{formErrors?.leaveType}</p>
                    </div>
                    <div className="col-8">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        No. of Leaves
                      </label>

                      <input
                        type="number"
                        className="form-control w-80 border-radius-2"
                        aria-label="Leave balance input"
                        name="assigned_leave"
                        // onChange={formik.handleChange}
                        // value={formik.values.assigned_leaves}
                        onChange={(e) => handleChange(e)}
                        value={formValues?.assigned_leave}
                        style={{ height: "38px" }}
                      />
                      <p className="text-danger">
                        {formErrors?.assigned_leave}
                      </p>
                    </div>

                    {/* {formik.errors.category && formik.touched.category ? (
                        <div className="text-danger">
                          {formik.errors.category}
                        </div>
                      ) : null} */}
                  </div>
                </div>
                <div>
                  {CheckAccess ? (
                    <div className="saveBtn" style={{ marginLeft: "1060px" }}>
                      <button
                        className="btn profileBtn text-white px-4 float-end"
                        style={{
                          display: "flex",
                          backgroundColor: "#62a6dc",
                          borderRadius: "20px",
                        }}
                        onClick={(e) => handleSave(e)}
                        type="submit"
                        disabled={loading}
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

          <div className="row mb-2" id="">
            <div className="col-6"></div>
            <FilterSearch
              FilterOptions={FilterOptions}
              search={search}
              setSearch={setSearch}
              filterselect={filterselect}
              setFilterSelect={setFilterSelect}
            />
          </div>

          <div
            className={
              currentTab === "Moderator_pending"
                ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
            }
            id="to-Be-Reviewed"
            role="tabpanel"
          >
            <div className="table-responsive">
              <table className="table mb-0 tablesWrap">
                <thead>
                  <tr>
                    <th style={{ fontWeight: "700" }}>S.no.</th>
                    <th style={{ fontWeight: "700" }} className="">
                      Leave Code
                    </th>
                    <th style={{ fontWeight: "700" }}>Employee Name</th>
                    <th style={{ fontWeight: "700" }}>No. of leaves</th>
                    <th style={{ fontWeight: "700" }}>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
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
                        listingData?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{ele?.leave_code}</td>
                              <td>
                                {/* {EmployeeList.find(
                                  (emp) => emp?._id === ele?.user_id
                                )?.first_name || "NA"} */}
                                {ele?.employee_name}
                              </td>
                              <td>
                                {ele?.number_of_leaves}{" "}
                                {ele?.leaveType ? `(${ele.leaveType})` : ""}
                              </td>
                              <td>
                                {new Date(ele?.created_on).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
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
          <Pagination
            totalPagess={totalPagess}
            setTotalPage={setTotalPage}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Moderator;
