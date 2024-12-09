/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { errorData } from "../../../../Redux/slice";

const RoleDetails = () => {
  const { status, id } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    role: "",
    describe: "",
    status: null,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  var currentIndex = 0;
  const errorMessageData = useSelector((state) => state.counter.errorData);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const dispatch = useDispatch();
  const [rolePreviledgeData, setrolePreviledgeData] = useState([]);
  const location = useLocation();
  const { isEditable } = location.state || {};
  const [edit, setEdit] = useState(isEditable);
  const [loading, setLoading] = useState(false);
  const GetDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "role",
        function: "view",
        data: {
          role_id: parseInt(id),
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log(
            "response for Get role details api",
            response?.data?.data?.data
          );
          setrolePreviledgeData(response?.data?.data?.data?.priviledge_data);
          setFormValues({
            ...formValues,
            role: response?.data?.data?.data?.name,
            describe: response?.data?.data?.data?.description,
            status: response?.data?.data?.data?.status,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function for validate fields
  const validate = (values) => {
    const errors = {};
    const specialCharacter = /^[A-Za-z0-9 ]+$/;

    if (!values?.role) {
      errors.role = "Please enter Role";
    } else if (values.role.trim() === "") {
      errors.role = "Role cannot be blank";
    } else if (!specialCharacter.test(values?.role)) {
      errors.role = "Please enter valid Role";
    } else if (values?.role?.length < 3 || values?.role?.length > 30) {
      errors.role = "Role length should be 3 to 10 characters";
    }
    if (!values?.describe) {
      errors.describe = "Please enter Role Description";
    } else if (values.describe.trim() === "") {
      errors.describe = "Description cannot be blank";
    }

    return errors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // function for select checkboxes
  const handleCheckboxClick = (
    rowIndex,
    field,
    value,
    subIndex,
    childIndex
  ) => {
    if (!edit) {
      // If edit is false, do not proceed
      return;
    }

    const updatedData = rolePreviledgeData?.map((menu, menuIndex) => {
      if (menuIndex === rowIndex) {
        if (subIndex !== undefined && childIndex !== undefined) {
          // Handling submenuChild checkboxes
          return {
            ...menu,
            submenu: menu?.submenu?.map((submenu, submenuIndex) => {
              if (submenuIndex === subIndex) {
                return {
                  ...submenu,
                  submenuChild: submenu?.submenuChild?.map(
                    (submenuChild, childIdx) => {
                      if (childIdx === childIndex) {
                        return {
                          ...submenuChild,
                          [field]: value,
                        };
                      }
                      return submenuChild;
                    }
                  ),
                };
              }
              return submenu;
            }),
          };
        } else if (subIndex !== undefined) {
          // Handling submenu checkboxes
          return {
            ...menu,
            submenu: menu?.submenu?.map((submenu, submenuIndex) => {
              if (submenuIndex === subIndex) {
                return {
                  ...submenu,
                  [field]: value,
                };
              }
              return submenu;
            }),
          };
        } else {
          // Handling menu checkboxes
          return {
            ...menu,
            [field]: value,
          };
        }
      }
      return menu;
    });

    setrolePreviledgeData(updatedData);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log("formValues", formValues);
      setLoading(true);
      const updatedMenuArray = rolePreviledgeData.map((menuItem) => {
        if (menuItem.title === "Dashboard") {
          // Update the values for "is_view", "is_add", "is_delete", "is_edit"
          return {
            ...menuItem,
            is_active: true,
            is_view: true,
            is_add: true,
            is_delete: true,
            is_edit: true,
          };
        } else {
          return menuItem; // Keep values as they are for other menu items
        }
      });

      try {
        API?.CommanApiCall({
          agent: "role",
          data: {
            name: formValues?.role,
            description: formValues?.describe,
            status: formValues?.status,
            priviledge_data: updatedMenuArray,
            role_id: parseInt(id),
          },
        }).then((response) => {
          //  console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            console.log(response?.data?.data?.data);
            toast.success(response?.data?.data?.message);
            setTimeout(() => {
              setLoading(false);
              navigate("/roles", {
                state: { role_previousTab: status },
              });
            }, 1000);

            dispatch(errorData(""));
          } else {
            dispatch(errorData(response?.data?.message));
            setLoading(false);
            setTimeout(() => {
              dispatch(errorData(""));
            }, 3000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

  const handleToggle = () => {
    const newIsChecked = !formValues.status;
    setFormValues({ ...formValues, status: newIsChecked });
    console.log(newIsChecked);
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
          <div className="row d-flex align-items-center justify-content-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <a
                onClick={() => {
                  if (edit) {
                    setEdit(false);
                  } else {
                    navigate("/roles", {
                      state: { role_previousTab: status },
                    });
                  }
                }}
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  {edit ? "Edit Role" : "Role Details"}{" "}
                </h4>
              </a>
            </div>

            <div className="col-6 pe-0">
              {TajurbaAdmin_priviledge_data &&
                TajurbaAdmin_priviledge_data.some(
                  (ele) =>
                    ele.title === "User Management" &&
                    ele.is_active === true &&
                    ele?.submenu &&
                    ele?.submenu.some(
                      (sub) =>
                        sub.title === "Roles" &&
                        sub.is_active === true &&
                        sub.is_edit === true
                    )
                ) ? (
                <div className="col-12 d-flex justify-content-end">
                  {!edit ? (
                    <div className="saveBtn">
                      <NavLink
                        onClick={() => {
                          setEdit(true);
                        }}
                        //  to="/edit-role"
                        //className="btn text-white px-4 float-end"
                        // style={{
                        //   backgroundColor: "#62a6dc",
                        //   borderRadius: "20px"
                        // }}
                      >
                        {/* <span className="">Edit</span> */}
                      </NavLink>
                    </div>
                  ) : (
                    <div className="col-6 pe-0">
                      <div className="col-12 d-flex justify-content-end">
                        <div className="cancelBtn">
                          <NavLink
                            disabled={loading}
                            onClick={() => {
                              setEdit(false);
                              GetDetails();
                            }}
                            className="btn btn-reject me-3 px-4"
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "20px"
                            }}
                          >
                            <span className="">Close</span>
                          </NavLink>
                        </div>
                        <div className="saveBtn">
                          <NavLink
                            disabled={loading}
                            onClick={(e) => handleSave(e)}
                            className="btn text-white px-4 float-end"
                            style={{
                              backgroundColor: "#62a6dc",
                              borderRadius: "20px"
                            }}
                          >
                            <span className="">
                              {loading && (
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              )}
                              Save
                            </span>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <div class="d-flex w-100">
                <div class="mt-1 me-2">
                  <label className="form-label float-end me-1 mb-0">
                    Role :
                  </label>
                </div>
                <div class=" flex-grow-1">
                  <div class="w-100">
                    <input
                      type="text"
                      className="form-control bg-white"
                      id="name"
                      placeholder="Enter Role"
                      required=""
                      name="role"
                      disabled={!edit}
                      value={formValues?.role}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{formErrors?.role}</p>
                    {errorMessageData && errorMessageData ? (
                      <p className="text-danger ">{errorMessageData}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div class="d-flex w-100">
                <div class="mt-1 me-2">
                  <label className="form-label me-1 mb-0">Describe :</label>
                </div>
                <div class=" flex-grow-1">
                  <div class="w-100">
                    <input
                      type="text"
                      className="form-control bg-white"
                      id="describe"
                      disabled={!edit}
                      placeholder="Enter description here"
                      name="describe"
                      value={formValues?.describe}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger">{formErrors?.describe}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="col-12 d-flex" style={{ marginTop: "10px" }}>
                <p className="fw-bold" style={{}}>Status:</p>
                <div className="col-4 mb-3">
                  <div className="d-flex">
                    <p
                      style={{
                        color: formValues?.status ? "green" : "grey",
                        fontSize: "14px",
                        marginLeft: "10px",
                        marginTop: "-2px",
                        fontWeight: "600",
                      }}
                    >
                      {formValues?.status ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-3">
                <div className="row">
                  <div className="col-12 col-xl-10">
                    <div className="table-responsive">
                      <table className="table" id="tableRoles">
                        <thead>
                          <tr>
                            <th>Sr. No.</th>
                            <th>Features</th>
                            <th>Access</th>
                          </tr>
                        </thead>
                        <tbody className="mt-3">
                          <tr className="border-bottom-custom">
                            <td></td>
                            <td></td>
                            <td className="border-top-grey ">Read</td>
                            {/* <td className="border-top-grey ">Add</td> */}
                            <td className="border-top-grey ">Write</td>
                            {/* <td className="border-top-grey ">Delete</td> */}
                          </tr>
                          {rolePreviledgeData &&
                            rolePreviledgeData?.map((menu, menuIndex) => {
                              currentIndex =
                                currentIndex === 0
                                  ? menuIndex + 1
                                  : currentIndex + 1;
                              return (
                                <React.Fragment key={menu._id}>
                                  <tr>
                                    <td>{currentIndex}.</td>
                                    <td>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={""}
                                          disabled={menu?.title === "Dashboard"}
                                          checked={
                                            menu?.title === "Dashboard"
                                              ? true
                                              : menu?.is_active
                                          }
                                          onChange={(e) =>
                                            handleCheckboxClick(
                                              menuIndex,
                                              "is_active",
                                              //e.target.checked
                                              menu?.title === "Dashboard"
                                                ? true
                                                : e.target.checked
                                            )
                                          }
                                        />
                                        <label className="form-check-label">
                                          {menu.title}
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={
                                          menu?.title === "Dashboard"
                                            ? true
                                            : menu.is_view
                                        }
                                        disabled={!menu.is_active}
                                        onChange={(e) =>
                                          handleCheckboxClick(
                                            menuIndex,
                                            "is_view",
                                            //e.target.checked
                                            menu?.title === "Dashboard"
                                              ? true
                                              : e.target.checked
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={
                                          menu?.title === "Dashboard"
                                            ? true
                                            : menu.is_edit
                                        }
                                        disabled={!menu.is_active}
                                        onChange={(e) =>
                                          handleCheckboxClick(
                                            menuIndex,
                                            "is_edit",
                                            // e.target.checked
                                            menu?.title === "Dashboard"
                                              ? true
                                              : e.target.checked
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                  {menu?.submenu?.map(
                                    (submenu, submenuIndex) => {
                                      currentIndex++;
                                      return (
                                        <React.Fragment key={submenu._id}>
                                          <tr className="selfWidth">
                                            <td>{currentIndex}</td>
                                            <td>
                                              <div className="form-check ps-5">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value=""
                                                  checked={submenu.is_active}
                                                  disabled={!menu.is_active} // Disable if submenu or menu is not active
                                                  onChange={(e) =>
                                                    handleCheckboxClick(
                                                      menuIndex,
                                                      "is_active",
                                                      e.target.checked,
                                                      submenuIndex
                                                    )
                                                  }
                                                />
                                                <label className="form-check-label">
                                                  {submenu.title}
                                                </label>
                                              </div>
                                            </td>
                                            <td>
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={submenu.is_view}
                                                disabled={
                                                  !menu.is_active ||
                                                  !submenu.is_active
                                                } // Disable if submenu or menu is not active
                                                onChange={(e) =>
                                                  handleCheckboxClick(
                                                    menuIndex,
                                                    "is_view",
                                                    e.target.checked,
                                                    submenuIndex
                                                  )
                                                }
                                              />
                                            </td>
                                            <td>
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={submenu.is_edit}
                                                disabled={
                                                  !menu.is_active ||
                                                  !submenu.is_active
                                                } // Disable if submenu or menu is not active
                                                onChange={(e) =>
                                                  handleCheckboxClick(
                                                    menuIndex,
                                                    "is_edit",
                                                    e.target.checked,
                                                    submenuIndex
                                                  )
                                                }
                                              />
                                            </td>
                                          </tr>
                                          {submenu.submenuChild.map(
                                            (submenuChild, childIndex) => {
                                              currentIndex++;
                                              return (
                                                <tr key={submenuChild._id}>
                                                  <td>{currentIndex}</td>
                                                  <td>
                                                    <div className="form-check ps-5 ms-5">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        disabled={
                                                          !submenu.is_active ||
                                                          !menu.is_active
                                                        } // Disable if submenuChild, submenu, or menu is not active
                                                        value=""
                                                        checked={
                                                          submenuChild.is_active
                                                        }
                                                        onChange={(e) =>
                                                          handleCheckboxClick(
                                                            menuIndex,
                                                            "is_active",
                                                            e.target.checked,
                                                            submenuIndex,
                                                            childIndex
                                                          )
                                                        }
                                                      />
                                                      <label className="form-check-label">
                                                        {submenuChild.title}
                                                      </label>
                                                    </div>
                                                  </td>
                                                  <td>
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      disabled={
                                                        !submenu.is_active ||
                                                        !menu.is_active ||
                                                        !submenuChild.is_active
                                                      } // Disable if submenuChild, submenu, or menu is not active
                                                      value=""
                                                      checked={
                                                        submenuChild.is_view
                                                      }
                                                      onChange={(e) =>
                                                        handleCheckboxClick(
                                                          menuIndex,
                                                          "is_view",
                                                          e.target.checked,
                                                          submenuIndex,
                                                          childIndex
                                                        )
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      disabled={
                                                        !submenu.is_active ||
                                                        !menu.is_active ||
                                                        !submenuChild.is_active
                                                      } // Disable if submenuChild, submenu, or menu is not active
                                                      value=""
                                                      checked={
                                                        submenuChild.is_edit
                                                      }
                                                      onChange={(e) =>
                                                        handleCheckboxClick(
                                                          menuIndex,
                                                          "is_edit",
                                                          e.target.checked,
                                                          submenuIndex,
                                                          childIndex
                                                        )
                                                      }
                                                    />
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </React.Fragment>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default RoleDetails;
