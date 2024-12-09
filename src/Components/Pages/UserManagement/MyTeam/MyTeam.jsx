/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import Pagination from "../../../Common/Pagination";
import FilterSearch from "../../../Common/FilterSearch";
import moment from "moment";
import AdminRoute from "../../../../Route/RouteDetails";
import TooltipCustom from "../../../Common/TooltipCustom";
import AttendanceButton from "../../../../AttendanceButton";

const MyTeam = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState(
    state?.myTeam_previousTab ? state?.myTeam_previousTab : "All"
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
    { label: "Name", value: "first_name" },
    { label: "Email", value: "email" },
    { label: "Status", value: "is_active" },
    { label: "Role", value: "role" },
  ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const MyTeamTabList = (flagForList) => {
    try {
      setLoading(true);
      var payload = {
        agent: "admin_user_list",
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
          "Response from My Team listing api ",
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
      MyTeamTabList(currentTab);
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
                  <h3 className="headText mt-2 mb-2 fw-bold">My Team</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="tableCard">
                <div className="">
                  <div className="tab-content text-muted mt-3">
                    <div className="row mb-4" id="consumers">
                      <div className="col-xl-5 mb-4 mb-xl-0">
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
                            style={{ color: "#252525" }}
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
                              style={{ color: "#252525" }}
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
                        {/* <FilterSearch
                          FilterOptions={FilterOptions}
                          search={search}
                          setSearch={setSearch}
                          filterselect={filterselect}
                          setFilterSelect={setFilterSelect}
                        /> */}

                        {TajurbaAdmin_priviledge_data &&
                        TajurbaAdmin_priviledge_data.some(
                          (ele) =>
                            ele.title === "User Management" &&
                            ele.is_active === true &&
                            ele?.submenu &&
                            ele?.submenu.some(
                              (sub) =>
                                sub.title === "My Team" &&
                                sub.is_active === true &&
                                sub.is_edit === true
                            )
                        ) ? (
                          <NavLink
                            to="/my-team/create-user"
                            className="btn text-white px-4 float-end ms-3"
                            style={{
                              backgroundColor: "#62a6dc",
                              borderRadius: "20px",
                            }}
                          >
                            <i className="fa-regular fa-plus"></i>
                            <span className="ms-2">Create User</span>
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
                              <th style={{ fontWeight: "700" }}>Name</th>
                              <th style={{ fontWeight: "700" }}>Mobile</th>
                              <th
                                className="w-25"
                                style={{ fontWeight: "700" }}
                              >
                                Email
                              </th>
                              <th style={{ fontWeight: "700" }}>Role</th>
                              <th style={{ fontWeight: "700" }}>Created On</th>
                              <th style={{ fontWeight: "700" }}>Status</th>
                              <th style={{ fontWeight: "700" }}></th>
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
                                          {TooltipCustom(ele?.first_name)}
                                        </td>
                                        <td>{ele?.mobile_no}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.email}
                                        </td>
                                        <td>{ele?.roles[0]?.name}</td>
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
                                            color: ele?.is_active
                                              ? "green"
                                              : "grey",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {ele?.is_active
                                            ? "Active"
                                            : "Inactive"}
                                        </td>

                                        <td>
                                          <NavLink
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            style={{
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange text-white"
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
                                          </NavLink>
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
                              <th style={{ fontWeight: "700" }}>Name</th>
                              <th style={{ fontWeight: "700" }}>Mobile</th>
                              <th
                                className="w-30"
                                style={{ fontWeight: "700" }}
                              >
                                Email
                              </th>
                              <th style={{ fontWeight: "700" }}>Role</th>
                              <th style={{ fontWeight: "700" }}>Created On</th>
                              <th style={{ fontWeight: "700" }}>Status</th>
                              <th></th>
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
                                          {TooltipCustom(ele?.first_name)}
                                        </td>
                                        <td>{ele?.mobile_no}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.email}
                                        </td>
                                        <td>{ele?.roles[0]?.name}</td>
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
                                            color: ele?.is_active
                                              ? "green"
                                              : "grey",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {ele?.is_active
                                            ? "Active"
                                            : "Inactive"}
                                        </td>

                                        <td>
                                          <NavLink
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light text-white"
                                            style={{
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
                                          </NavLink>
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
                              <th style={{ fontWeight: "700" }}>Name</th>
                              <th style={{ fontWeight: "700" }}>Mobile</th>
                              <th
                                className="w-30"
                                style={{ fontWeight: "700" }}
                              >
                                Email
                              </th>
                              <th style={{ fontWeight: "700" }}>Role</th>
                              <th style={{ fontWeight: "700" }}>Created On</th>
                              <th style={{ fontWeight: "700" }}>Status</th>
                              <th></th>
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
                                          {TooltipCustom(ele?.first_name)}
                                        </td>
                                        <td>{ele?.mobile_no}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.email}
                                        </td>
                                        <td>{ele?.roles[0]?.name}</td>
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
                                            color: ele?.is_active
                                              ? "green"
                                              : "grey",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {ele?.is_active
                                            ? "Active"
                                            : "Inactive"}
                                        </td>

                                        <td>
                                          <NavLink
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn text-white waves-effect waves-light"
                                            style={{
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
                                          </NavLink>
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

export default MyTeam;
