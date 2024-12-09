/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import Pagination from "../../../Common/Pagination";
import AdminRoute from "../../../../Route/RouteDetails";
import TooltipCustom from "../../../Common/TooltipCustom";
import { Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";

const Roles = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState(
    state?.role_previousTab ? state?.role_previousTab : "All"
  );

  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [listingData, setListingData] = useState([]);

  // For Pagination
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);

  // Functionality for Filter and search
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "Role", value: "name" },
    // { label: "Status", value: "status" },
  ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const RoleTabList = (flagForList) => {
    try {
      setLoading(true);
      var payload = {
        agent: "role",
        function: "list",
        flag: flagForList,
        page_no: currentPage,
        limit: itemsPerPage,
        //filter: {},
        // createdAt: -1,
      };
      if (filterselect === "" || search === "") {
        payload.filter = {};
      } else {
        payload.filter = {
          [filterselect]: search,
        };
      }
      API?.CommanApiCall(payload).then((response) => {
        console.log(
          "Response from Roles listing api ",
          response?.data?.data?.data
        );
        if (response?.data?.data?.status === 200) {
          setListingData(response?.data?.data?.data);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      RoleTabList(currentTab);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentTab, currentPage, itemsPerPage, filterselect, search]);

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-12">
              <div className="row position-relative">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Roles</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tableCard">
                <div className="">
                  <div className="tab-content text-muted mt-3">
                    <div
                      className="row mb-4 d-flex align-items-center"
                      id="consumers"
                    >
                      <div className="col-xl-5 mb-4">
                        <ul
                          className="nav   nav-tabs-custom mt-5 mt-xl-0"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setLoading(true);
                              setCurrentTab("All");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "All"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>All</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setLoading(true);
                              setCurrentTab("Active");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Active"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Active</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setLoading(true);
                              setCurrentTab("Inactive");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Inactive"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Ongoing"
                              role="tab"
                            >
                              <span>Inactive</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-xl-7 d-flex align-items-center justify-content-end">
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
                          <NavLink
                            to="/roles/create-role"
                            className="btn text-white px-4 float-end ms-3"
                            style={{
                              backgroundColor: "#62a6dc",
                              borderRadius: "20px",
                            }}
                          >
                            <i className="fa-regular fa-plus"></i>
                            <span className="ms-2">Create Role</span>
                          </NavLink>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className={
                        currentTab === "All"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="to-Be-Reviewed"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "700" }}>Roles</th>
                              <th style={{ fontWeight: "700" }}>Created On</th>
                              <th style={{ fontWeight: "700" }}>Status</th>
                              <th style={{ fontWeight: "700" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
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
                                        <td className="fw-bold">
                                          {TooltipCustom(ele?.name)}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.createdAt
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>

                                        <td
                                          style={{
                                            color: ele?.status
                                              ? "green"
                                              : "grey",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {ele?.status ? "Active" : "Inactive"}
                                        </td>

                                        <td>
                                          <Tooltip title="View">
                                            <NavLink
                                              to={`../${AdminRoute?.UserManagement?.Roles?.RoleDetails?.replace(
                                                ":status",
                                                currentTab
                                              ).replace(":id", ele?.role_id)}`}
                                              state={{ isEditable: false }}
                                              style={{ marginRight: "10px" }}
                                            >
                                              <i
                                                class="fa fa-eye"
                                                aria-hidden="true"
                                                style={{ color: "#62a6dc" }}
                                              ></i>
                                            </NavLink>
                                          </Tooltip>
                                          <Tooltip title="Edit">
                                            <NavLink
                                              to={`../${AdminRoute?.UserManagement?.Roles?.RoleDetails?.replace(
                                                ":status",
                                                currentTab
                                              ).replace(":id", ele?.role_id)}`}
                                              state={{ isEditable: true }}
                                              style={{ marginRight: "10px" }}
                                            >
                                              <EditFilled
                                                style={{
                                                  fontSize: "20px",
                                                  color: "#62a6dc",
                                                }}
                                              />
                                            </NavLink>
                                          </Tooltip>
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

                    <div
                      className={
                        currentTab === "Active"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "700" }}>Roles</th>
                              <th style={{ fontWeight: "700" }}>
                                Created Date
                              </th>

                              <th style={{ fontWeight: "700" }}>Status</th>
                              <th style={{ fontWeight: "700" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              <>
                                {listingData && listingData?.length > 0 ? (
                                  listingData?.map((ele, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="fw-bold">
                                          {TooltipCustom(ele?.name)}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.createdAt
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>

                                        <td
                                          style={{
                                            color: ele?.status
                                              ? "green"
                                              : "grey",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {ele?.status ? "Active" : "Inactive"}
                                        </td>

                                        <td>
                                          <Tooltip title="View">
                                            <NavLink
                                              to={`../${AdminRoute?.UserManagement?.Roles?.RoleDetails?.replace(
                                                ":status",
                                                currentTab
                                              ).replace(":id", ele?.role_id)}`}
                                              state={{ isEditable: false }}
                                              style={{ marginRight: "10px" }}
                                            >
                                              <i
                                                class="fa fa-eye"
                                                aria-hidden="true"
                                                style={{ color: "#62a6dc" }}
                                              ></i>
                                            </NavLink>
                                          </Tooltip>
                                          <Tooltip title="Edit">
                                            <NavLink
                                              to={`../${AdminRoute?.UserManagement?.Roles?.RoleDetails?.replace(
                                                ":status",
                                                currentTab
                                              ).replace(":id", ele?.role_id)}`}
                                              state={{ isEditable: true }}
                                            >
                                              <EditFilled
                                                style={{
                                                  fontSize: "20px",
                                                  color: "#62a6dc",
                                                }}
                                              />
                                            </NavLink>
                                          </Tooltip>
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

                    <div
                      className={
                        currentTab === "Inactive"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Ongoing"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "700" }}>Roles</th>
                              <th style={{ fontWeight: "700" }}>
                                Created Date
                              </th>

                              <th style={{ fontWeight: "700" }}>Status</th>
                              <th style={{ fontWeight: "700" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
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
                                        <td className="fw-bold">
                                          {TooltipCustom(ele?.name)}
                                        </td>
                                        <td>
                                          {new Date(
                                            ele?.createdAt
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </td>

                                        <td
                                          style={{
                                            color: ele?.status
                                              ? "green"
                                              : "grey",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {ele?.status ? "Active" : "Inactive"}
                                        </td>

                                        <td>
                                          <Tooltip title="View">
                                            <NavLink
                                              to={`../${AdminRoute?.UserManagement?.Roles?.RoleDetails?.replace(
                                                ":status",
                                                currentTab
                                              ).replace(":id", ele?.role_id)}`}
                                              state={{ isEditable: false }}
                                              style={{ marginRight: "10px" }}
                                            >
                                              <i
                                                class="fa fa-eye"
                                                aria-hidden="true"
                                                style={{ color: "#62a6dc" }}
                                              ></i>
                                            </NavLink>
                                          </Tooltip>
                                          <Tooltip title="Edit">
                                            <NavLink
                                              to={`../${AdminRoute?.UserManagement?.Roles?.RoleDetails?.replace(
                                                ":status",
                                                currentTab
                                              ).replace(":id", ele?.role_id)}`}
                                              state={{ isEditable: false }}
                                              style={{ marginRight: "10px" }}
                                            >
                                              <EditFilled
                                                style={{
                                                  fontSize: "20px",
                                                  color: "#62a6dc",
                                                }}
                                              />
                                            </NavLink>
                                          </Tooltip>
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
                  </div>
                </div>
              </div>
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
      {/* </AppLayout> */}
    </>
  );
};

export default Roles;
