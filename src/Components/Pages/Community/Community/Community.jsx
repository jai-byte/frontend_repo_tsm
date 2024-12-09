/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import FilterSearch from "../../../Common/FilterSearch";
import moment from "moment";
import AdminRoute from "../../../../Route/RouteDetails";
import Pagination from "../../../Common/Pagination";
import TooltipCustom from "../../../Common/TooltipCustom";

const Community = () => {
  const ActiveStatusSvg = (
    <svg
      id="Component_150_6"
      data-name="Component 150 – 6"
      width="50"
      height="26"
      viewBox="0 0 50 26"
    >
      <rect
        id="Rectangle_6304"
        data-name="Rectangle 6304"
        width="50"
        height="26"
        rx="2"
        fill="#7cd67b"
      />
      <path
        id="Path_10465"
        data-name="Path 10465"
        d="M0-.487,3.675,4.1l9.084-7.077"
        transform="translate(30.746 12.477)"
        fill="none"
        stroke="#fff"
      />
      <g
        id="Group_14953"
        data-name="Group 14953"
        transform="translate(-1522 -438)"
      >
        <rect
          id="Rectangle_6305"
          data-name="Rectangle 6305"
          width="18"
          height="18"
          rx="2"
          transform="translate(1527 442)"
          fill="#fff"
        />
        <g
          id="Group_14952"
          data-name="Group 14952"
          transform="translate(1531.918 447)"
        >
          <line
            id="Line_1364"
            data-name="Line 1364"
            y2="9"
            transform="translate(0.082)"
            fill="none"
            stroke="#e8e8e8"
          />
          <line
            id="Line_1365"
            data-name="Line 1365"
            y2="9"
            transform="translate(4.082)"
            fill="none"
            stroke="#e8e8e8"
          />
          <line
            id="Line_1366"
            data-name="Line 1366"
            y2="9"
            transform="translate(8.082)"
            fill="none"
            stroke="#e8e8e8"
          />
        </g>
      </g>
    </svg>
  );
  const InActiveStatusSvg = (
    <svg
      id="Component_150_7"
      data-name="Component 150 – 7"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="26"
      viewBox="0 0 50 26"
    >
      <rect
        id="Rectangle_6304"
        data-name="Rectangle 6304"
        width="50"
        height="26"
        rx="2"
        fill="#e2e2e2"
      />
      <g
        id="Group_14953"
        data-name="Group 14953"
        transform="translate(-1500 -438)"
      >
        <rect
          id="Rectangle_6305"
          data-name="Rectangle 6305"
          width="18"
          height="18"
          rx="2"
          transform="translate(1527 442)"
          fill="#fff"
        />
        <g
          id="Group_14952"
          data-name="Group 14952"
          transform="translate(1531.918 447)"
        >
          <line
            id="Line_1364"
            data-name="Line 1364"
            y2="9"
            transform="translate(0.082)"
            fill="none"
            stroke="#e8e8e8"
          />
          <line
            id="Line_1365"
            data-name="Line 1365"
            y2="9"
            transform="translate(4.082)"
            fill="none"
            stroke="#e8e8e8"
          />
          <line
            id="Line_1366"
            data-name="Line 1366"
            y2="9"
            transform="translate(8.082)"
            fill="none"
            stroke="#e8e8e8"
          />
        </g>
      </g>
      <g
        id="Group_14954"
        data-name="Group 14954"
        transform="translate(9.5 0.5)"
      >
        <line
          id="Line_1368"
          data-name="Line 1368"
          x1="8"
          y2="10"
          transform="translate(0 7.5)"
          fill="none"
          stroke="#b9b9b9"
        />
        <line
          id="Line_1369"
          data-name="Line 1369"
          x2="8"
          y2="10"
          transform="translate(0 7.5)"
          fill="none"
          stroke="#b9b9b9"
        />
      </g>
    </svg>
  );

  const { state } = useLocation();
  console.log("State", state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState(
    state?.community_previousTab ? state?.community_previousTab : "All"
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
    { label: "Classroom Name", value: "community_title" },
    //  { label: "Created Date", value: "created_date" },
    { label: "Status", value: "is_active" },
  ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const MyTeamTabList = (flagForList) => {
    try {
      var payload = {
        agent: "community",
        function: "get_list",
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
          "Response from Community listing api ",
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
    MyTeamTabList(currentTab);
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
                  <h3 className="headText mt-2 mb-2 fw-bold">Community</h3>
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
                          className="nav nav-tabs nav-tabs-custom mt-5 mt-xl-0"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
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
                        <FilterSearch
                          FilterOptions={FilterOptions}
                          search={search}
                          setSearch={setSearch}
                          filterselect={filterselect}
                          setFilterSelect={setFilterSelect}
                        />
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
                              <th className="w-50">Classroom Name</th>
                              <th>Created Date</th>
                              <th>Status</th>
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
                                          {TooltipCustom(ele?.community_title)}
                                        </td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>

                                        <td>
                                          {ele?.is_active === true
                                            ? ActiveStatusSvg
                                            : InActiveStatusSvg}
                                        </td>

                                        <td>
                                          <NavLink
                                            className="btn btn-sm waves-effect waves-light btnView"
                                            to={`../${AdminRoute?.Community?.Community?.CommunityDetail?.replace(
                                              ":type",
                                              currentTab
                                            ).replace(
                                              ":id",
                                              ele?.community_id
                                            )}`}
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
                              <th className="w-50">Classroom Name</th>
                              <th>Created Date</th>
                              <th>Status</th>
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
                                          {TooltipCustom(ele?.community_title)}
                                        </td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>

                                        <td
                                          className={
                                            ele?.is_active === true
                                              ? "textGreen"
                                              : "textRed"
                                          }
                                        >
                                          {ele?.is_active === true
                                            ? "Active"
                                            : "Inactive"}
                                        </td>
                                        <td>
                                          <NavLink
                                            className="btn btn-sm waves-effect waves-light btnView"
                                            to={`../${AdminRoute?.Community?.Community?.CommunityDetail?.replace(
                                              ":type",
                                              currentTab
                                            ).replace(
                                              ":id",
                                              ele?.community_id
                                            )}`}
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
                              <th className="w-50">Classroom Name</th>
                              <th>Created Date</th>
                              <th>Status</th>
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
                                          {TooltipCustom(ele?.community_title)}
                                        </td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>

                                        <td
                                          className={
                                            ele?.is_active === true
                                              ? "textGreen"
                                              : "textRed"
                                          }
                                        >
                                          {ele?.is_active === true
                                            ? "Active"
                                            : "Inactive"}
                                        </td>

                                        <td>
                                          <NavLink
                                            className="btn btn-sm waves-effect waves-light btnView"
                                            to={`../${AdminRoute?.Community?.Community?.CommunityDetail?.replace(
                                              ":type",
                                              currentTab
                                            ).replace(
                                              ":id",
                                              ele?.community_id
                                            )}`}
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

export default Community;
