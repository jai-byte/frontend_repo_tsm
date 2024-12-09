/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import FilterSearch from "../../../Common/FilterSearch";
import Pagination from "../../../Common/Pagination";
import moment from "moment";
import AdminRoute from "../../../../Route/RouteDetails";
import TooltipCustom from "../../../Common/TooltipCustom";

const ActivityManagement = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState(
    state?.activity_management_previousTab
      ? state?.activity_management_previousTab
      : "Published"
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
    { label: "Community Name", value: "community_title" },
  ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const MyTeamTabList = (flagForList) => {
    try {
      var payload = {
        agent: "activity",
        function: "activityList",
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
          "Response from Activity management listing api ",
          response?.data?.data
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
                  <h3 className="headText mt-2 mb-2 fw-bold">
                    Activity Management
                  </h3>
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
                              setCurrentTab("Published");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Published"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Published</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("Draft");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Draft"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Draft</span>
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

                        {TajurbaAdmin_priviledge_data &&
                        TajurbaAdmin_priviledge_data.some(
                          (ele) =>
                            ele.title === "Community" &&
                            ele.is_active === true &&
                            ele?.submenu &&
                            ele?.submenu.some(
                              (sub) =>
                                sub.title === "Activity Management" &&
                                sub.is_active === true &&
                                sub.is_edit === true
                            )
                        ) ? (
                          <NavLink
                            to="/activity-management/create-new"
                            className="btn bgDarkBlack text-white px-4 float-end ms-3"
                          >
                            <i className="fa-regular fa-plus"></i>
                            <span className="ms-2">Create</span>
                          </NavLink>
                        ) : null}
                      </div>
                    </div>

                    <div
                      //  className="tab-pane main-card p-3 active mb-0 box-shadow-bottom-none"
                      className={
                        currentTab === "Published"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="to-Be-Reviewed"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap text-center">
                          <thead>
                            <tr>
                              <th className="text-start w-40">
                                Community Name
                              </th>
                              <th>Challenges</th>
                              <th>Quests</th>
                              <th>Poll</th>
                              <th>Total Activity</th>
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
                                        <td className="fw-bold text-start">
                                          {TooltipCustom(ele?.community_name)}
                                        </td>
                                        <td>{ele?.types?.challenge || 0}</td>
                                        <td>{ele?.types?.quest || 0}</td>
                                        <td>{ele?.types?.poll || 0}</td>

                                        <td className="">
                                          {ele?.types?.challenge +
                                            ele?.types?.quest +
                                            ele?.types?.poll}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.Community?.ActivityManagement?.ActivityDetails?.replace(
                                              ":id",
                                              ele?.community_id
                                            )}`}
                                            className="btn btn-sm waves-effect waves-light btnView"
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
                        currentTab === "Draft"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      // className="tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap ">
                          <thead>
                            <tr>
                              <th className="w-30">Community Name</th>
                              <th>Category</th>
                              <th>Content Type</th>
                              <th>Title</th>
                              {/* <th>Total Activity</th> */}
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
                                          {TooltipCustom(ele?.community_name)}
                                        </td>
                                        <td>{ele?.category_name}</td>
                                        <td>
                                          {TooltipCustom(ele?.content_type)}
                                        </td>
                                        <td>
                                          {TooltipCustom(ele?.content_title)}
                                        </td>

                                        <td>
                                          <NavLink
                                            to={`/${AdminRoute?.Community?.ActivityManagement?.CreateActivity?.replace(
                                              ":type",
                                              ele?.type
                                            )?.replace(
                                              ":id",
                                              ele?.activity_id
                                            )}`}
                                            className="btn btn-sm waves-effect waves-light btnView"
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

export default ActivityManagement;
