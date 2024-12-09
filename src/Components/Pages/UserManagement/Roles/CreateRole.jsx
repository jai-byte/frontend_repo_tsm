/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../../Api/Api";
import { errorData } from "../../../../Redux/slice";
import { ToastContainer, toast } from "react-toastify";

const CreateRole = () => {
  const navigate = useNavigate();
  const initialValues = {
    role: "",
    describe: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  var currentIndex = 0;
  const errorMessageData = useSelector((state) => state.counter.errorData);
  const dispatch = useDispatch();
  const [rolePreviledgeData, setrolePreviledgeData] = useState([]);

  // Function for update fields values
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

  // Get Privilage Data
  useEffect(() => {
    try {
      API?.CommanApiCall({
        agent: "menu",
        function: "get_list",
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log(response?.data?.data?.data);
          setrolePreviledgeData(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // function for select checkboxes
  const handleCheckboxClick = (
    rowIndex,
    field,
    value,
    subIndex,
    childIndex
  ) => {
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
    //console.log("updatedData", updatedData);
    setrolePreviledgeData(updatedData);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log("formValues", formValues);
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
            status: true,
            priviledge_data: updatedMenuArray,
          },
        }).then((response) => {
          //  console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            console.log(response?.data?.data?.data);
            toast.success(response?.data?.data?.message);
            setTimeout(() => {
              navigate(-1);
            }, 1000);

            dispatch(errorData(""));
          } else {
            dispatch(errorData(response?.data?.data?.message));
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

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to="/roles"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Create Role
                </h4>
              </NavLink>
            </div>
            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="btn btn-reject me-3 px-4 text-white"
                    style={{
                      display: "flex",
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className="">Close</span>
                  </button>
                </div>
                <div className="saveBtn">
                  <button
                    onClick={(e) => handleSave(e)}
                    className="btn text-white px-4 float-end"
                    style={{
                      display: "flex",
                      backgroundColor: "#62a6dc",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <span className="">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-5">
              <div class="d-flex w-100">
                <div class="mt-1 me-2">
                  <span class="mandatory-star me-1">*</span>
                  <label class="form-label mb-0">Role:</label>
                </div>
                <div class=" flex-grow-1">
                  <div class="w-100">
                    <input
                      type="text"
                      class="form-control bg-white"
                      id="name"
                      placeholder="Enter Role"
                      required=""
                      name="role"
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger mb-0">{formErrors?.role}</p>
                    {errorMessageData && errorMessageData ? (
                      <p className="text-danger mb-0">{errorMessageData}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div class="d-flex w-100">
                <div class="mt-1 me-2">
                  <span class="mandatory-star me-1">*</span>
                  <label class="form-label mb-0">Description:</label>
                </div>
                <div class=" flex-grow-1">
                  <div class="w-100">
                    <input
                      type="text"
                      className="form-control bg-white"
                      id="describe"
                      placeholder="Enter description here"
                      name="describe"
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-danger mb-0">{formErrors?.describe}</p>
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
                            <th>S.No</th>
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
                                    {/* <td>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={
                                          menu?.title === "Dashboard"
                                            ? true
                                            : menu.is_add
                                        }
                                        disabled={!menu.is_active}
                                        onChange={(e) =>
                                          handleCheckboxClick(
                                            menuIndex,
                                            "is_add",
                                            // e.target.checked
                                            menu?.title === "Dashboard"
                                              ? true
                                              : e.target.checked
                                          )
                                        }
                                      />
                                    </td> */}
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
                                    {/* <td>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={
                                          menu?.title === "Dashboard"
                                            ? true
                                            : menu.is_delete
                                        }
                                        disabled={!menu.is_active}
                                        onChange={(e) =>
                                          handleCheckboxClick(
                                            menuIndex,
                                            "is_delete",
                                            //  e.target.checked
                                            menu?.title === "Dashboard"
                                              ? true
                                              : e.target.checked
                                          )
                                        }
                                      />
                                    </td> */}
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
                                            {/* <td>
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={submenu.is_add}
                                                disabled={
                                                  !menu.is_active ||
                                                  !submenu.is_active
                                                } // Disable if submenu or menu is not active
                                                onChange={(e) =>
                                                  handleCheckboxClick(
                                                    menuIndex,
                                                    "is_add",
                                                    e.target.checked,
                                                    submenuIndex
                                                  )
                                                }
                                              />
                                            </td> */}
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
                                            {/* <td>
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={submenu.is_delete}
                                                disabled={
                                                  !menu.is_active ||
                                                  !submenu.is_active
                                                } // Disable if submenu or menu is not active
                                                onChange={(e) =>
                                                  handleCheckboxClick(
                                                    menuIndex,
                                                    "is_delete",
                                                    e.target.checked,
                                                    submenuIndex
                                                  )
                                                }
                                              />
                                            </td> */}
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
                                                  {/* <td>
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
                                                        submenuChild.is_add
                                                      }
                                                      onChange={(e) =>
                                                        handleCheckboxClick(
                                                          menuIndex,
                                                          "is_add",
                                                          e.target.checked,
                                                          submenuIndex,
                                                          childIndex
                                                        )
                                                      }
                                                    />
                                                  </td> */}
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
                                                  {/* <td>
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      disabled={
                                                        !submenu.is_active ||
                                                        !menu.is_active ||
                                                        !submenuChild.is_active
                                                      }
                                                      value=""
                                                      checked={
                                                        submenuChild.is_delete
                                                      }
                                                      onChange={(e) =>
                                                        handleCheckboxClick(
                                                          menuIndex,
                                                          "is_delete",
                                                          e.target.checked,
                                                          submenuIndex,
                                                          childIndex
                                                        )
                                                      }
                                                    />
                                                  </td> */}
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

export default CreateRole;
