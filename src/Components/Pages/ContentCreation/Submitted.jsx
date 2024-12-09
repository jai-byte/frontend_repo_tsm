/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import Dropdown from "react-bootstrap/Dropdown";
import API from "../../../Api/Api";
import moment from "moment";
import AdminRoute from "../../../Route/RouteDetails";
import Pagination from "../../Common/Pagination";
import FilterSearch from "../../Common/FilterSearch";
import TooltipCustom from "../../Common/TooltipCustom";

const Submitted = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // console.log("state", state);

  const [currentTab, setCurrentTab] = useState(
    state?.creator_previousTab ? state?.creator_previousTab : "Pending"
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
    // { label: "All", value: "all" },
    { label: "Title", value: "course_title" },
    { label: "Author", value: "author_name" },
    { label: "Course Type", value: "course_type" },
    { label: "Date", value: "createdAt" },
  ];

  const [filterselect, setFilterSelect] = useState("");
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   console.log("filterselect", filterselect);
  //   console.log("search", search);
  // }, [filterselect, search]);

  const SubmittedTabList = (flagForList) => {
    try {
      var payload = {
        agent: "course",
        function: "getCourseList",
        flag: flagForList,
        page_no: currentPage,
        limit: itemsPerPage,
        // filter: {},
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
        //console.log(`${flagForList} list`, response?.data?.data?.data);
        console.log(response);
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
    SubmittedTabList(currentTab);
  }, [currentTab, currentPage, itemsPerPage, filterselect, search]);
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          <DateAndTimeLayout />

          <div className="row">
            <div className="col-12">
              <div className="row position-relative">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Submitted</h3>
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
                      <div className="col-6">
                        <ul
                          className="nav nav-tabs nav-tabs-custom mt-5 mt-xl-0"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("Pending");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Pending"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              //className="nav-link active"
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Pending</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            // onClick={() => handleTabChange("Published")}
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
                              // className="nav-link"
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Published</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            // onClick={() => handleTabChange("Rejected")}
                            onClick={() => {
                              setCurrentTab("Rejected");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Rejected"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              // className="nav-link"
                              data-bs-toggle="tab"
                              href="#Ongoing"
                              role="tab"
                            >
                              <span>Rejected</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            //  onClick={() => handleTabChange("Resubmitted")}
                            onClick={() => {
                              setCurrentTab("Resubmitted");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Resubmitted"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              // className="nav-link"
                              data-bs-toggle="tab"
                              href="#ReSubmitted"
                              role="tab"
                            >
                              <span>Re-Submitted</span>
                            </a>
                          </li>
                        </ul>
                      </div>
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
                        currentTab === "Pending"
                          ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      // className="tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                      id="to-Be-Reviewed"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th className="w-30">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>
                              <th>Content Type</th>
                              <th>Submitted Date</th>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>
                                        <td>{ele?.author_name}</td>
                                        <td>{ele?.course_type}</td>

                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.Pending?.replace(
                                              "/:id",
                                              ""
                                            )}/${ele?.courseedition_id}`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
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
                        currentTab === "Published"
                          ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      // className="tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th className="w-25">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>
                              <th>Content Type</th>
                              <th>Moderator</th>
                              <th>Feedbacks</th>
                              <th>Published Date</th>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>
                                        <td>{ele?.author_name}</td>
                                        <td>{ele?.course_type}</td>
                                        <td>{ele?.createdByName || "--"}</td>
                                        <td>
                                          <b>20</b>
                                        </td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.Published?.replace(
                                              "/:id",
                                              ""
                                            )}/${
                                              ele?.courseedition_id ||
                                              ele?.course_id
                                            }`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
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
                        currentTab === "Rejected"
                          ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      // className="tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      id="Ongoing"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th className="w-25">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>
                              <th>Content Type</th>
                              <th>Moderator</th>
                              <th>Rejected Date</th>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>
                                        <td>{ele?.author_name}</td>
                                        <td>{ele?.course_type}</td>
                                        <td>{ele?.createdByName || "--"}</td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.Rejected?.replace(
                                              "/:id",
                                              ""
                                            )}/${ele?.courseedition_id}`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
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
                        currentTab === "Resubmitted"
                          ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      //  className="tab-pane main-card  p-3 mb-0 box-shadow-bottom-none"
                      id="ReSubmitted"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th className="w-30">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>
                              <th>Content Type</th>

                              <th>Re-Submitted Date</th>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>
                                        <td>{ele?.author_name}</td>
                                        <td>{ele?.course_type}</td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.ReSubmitted?.replace(
                                              "/:id",
                                              ""
                                            )}/${ele?.courseedition_id}`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
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
          {/* <div className="main-card p-3 ">
              <div className="row card-footer">
                <div className="col-6 card-footer-left">
                  <span className="text-muted">
                    <span className="pagination__desc d-flex align-items-center">
                      Items Per Page
                      <select
                        className="form-select form-select-sm w-auto mx-2"
                        aria-label="Per"
                      >
                        <option value="" aria-labelledby="">
                          3
                        </option>
                        <option value="" aria-labelledby="">
                          5
                        </option>
                        <option value="" aria-labelledby="">
                          10
                        </option>
                      </select>
                    </span>
                  </span>
                </div>
                <div className="col-6 card-footer-right">
                  <nav aria-label="payments">
                    <ul className="pagination m-0">
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          // tabIndex={-1}
                          aria-disabled="true"
                          aria-label="null page"
                          // onClick={() => setCurrentPage(1)}
                        >
                          <svg
                            width="15.398"
                            height="17.4"
                            viewBox="0 0 15.398 17.4"
                          >
                            <g
                              id="Icon_feather-skip-back"
                              data-name="Icon feather-skip-back"
                              transform="translate(-6.801 -5.3)"
                            >
                              <path
                                id="Path_12430"
                                data-name="Path 12430"
                                d="M23.5,22l-10-8,10-8Z"
                                transform="translate(-2)"
                              />
                              <path
                                id="Path_12431"
                                data-name="Path 12431"
                                d="M7.5,21.5V7.5"
                                transform="translate(0 -0.5)"
                              />
                            </g>
                          </svg>
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          // tabIndex={-1}
                          aria-disabled="true"
                          aria-label="First Page"
                          // onClick={handlePrevPage}
                        >
                          <svg
                            width="11.4"
                            height="17.4"
                            viewBox="0 0 11.4 17.4"
                            className="me-2"
                          >
                            <g
                              id="Icon_feather-skip-back"
                              data-name="Icon feather-skip-back"
                              transform="translate(-10.8 -5.3)"
                            >
                              <path
                                id="Path_12430"
                                data-name="Path 12430"
                                d="M23.5,22l-10-8,10-8Z"
                                transform="translate(-2)"
                              />
                            </g>
                          </svg>
                          Previous
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link py-0"
                          aria-label="2 page"
                        >
                          <input
                            className="border-radius-5 p-1 border"
                            type="number"
                            min="1"
                            style={{ width: "40px" }}
                          />
                          &nbsp;Of
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="... Page"
                          // onClick={handleNextPage}
                        >
                          Next
                          <svg
                            width="11.4"
                            height="17.4"
                            viewBox="0 0 11.4 17.4"
                            className="ms-2"
                          >
                            <path
                              id="Path_12430"
                              data-name="Path 12430"
                              d="M13.5,22l10-8-10-8Z"
                              transform="translate(-12.8 -5.3)"
                            />
                          </svg>
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="null page"
                          // onClick={() => setCurrentPage(totalPages)}
                        >
                          <svg
                            width="15.4"
                            height="17.4"
                            viewBox="0 0 15.4 17.4"
                          >
                            <g
                              id="Icon_feather-skip-back"
                              data-name="Icon feather-skip-back"
                              transform="translate(0.7 0.7)"
                            >
                              <path
                                id="Path_12430"
                                data-name="Path 12430"
                                d="M13.5,22l10-8-10-8Z"
                                transform="translate(-13.5 -6)"
                              />
                              <path
                                id="Path_12431"
                                data-name="Path 12431"
                                d="M7.5,21.5V7.5"
                                transform="translate(6.5 -6.5)"
                              />
                            </g>
                          </svg>
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div> */}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Submitted;
