/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import AdminRoute from "../../../Route/RouteDetails";
import API from "../../../Api/Api";
import moment from "moment";
import FilterSearch from "../../Common/FilterSearch";
import Pagination from "../../Common/Pagination";

const PastOnlineEventDetails = () => {
  const { eventType, eventScheduled, status, id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState(
    state?.PastOnlineEventDetails_Tab
      ? state?.PastOnlineEventDetails_Tab
      : "attended"
  );

  const [totalUser, setTotalUser] = useState("");

  const [listingData, setListingData] = useState([]);

  // For Pagination
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const MyTeamTabList = (flagForList) => {
    try {
      var payload = {
        agent: "event",
        function: "pastEventAttendanceList",
        flag: flagForList,
        page_no: currentPage,
        limit: itemsPerPage,
        data: {
          event_id: parseInt(id),
        },
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
        console.log("My Team listing api ", response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          if (currentTab === "attended") {
            setListingData(response?.data?.data?.data?.attend_event);
          } else if (currentTab === "unattended") {
            setListingData(response?.data?.data?.data?.unattended_event);
          } else if (currentTab === "refunded") {
            setListingData(response?.data?.data?.data?.refund_event);
          }
          setTotalUser(response?.data?.data?.data?.total_count);
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
          <div className="row mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to={`../${AdminRoute?.Events?.PastEventDetails?.replace(
                  ":eventType",
                  eventType
                )
                  .replace(":eventScheduled", eventScheduled)
                  .replace(":status", status)
                  .replace(":id", id)}`}
                // to="/past-event-details/:eventType/:eventScheduled/:status/:id"

                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </NavLink>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Past Online Event Details
              </h4>
            </div>
            <div className="col-6 pe-0"></div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tableCard">
                <div className="">
                  <div className="tab-content text-muted">
                    <div
                      className="row mb-4 d-flex align-items-center"
                      id="consumers"
                    >
                      <div className="col-md-6">
                        <ul
                          className="nav nav-tabs nav-tabs-custom"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("attended");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "attended"
                                  ? "schedule_event nav-link active nav-link"
                                  : "schedule_event nav-link nav-link"
                              }
                              //   className="nav-link "
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Attended</span>
                            </a>
                          </li>
                          <li
                            className="nav-item "
                            onClick={() => {
                              setCurrentTab("unattended");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "unattended"
                                  ? "schedule_event nav-link active nav-link"
                                  : "schedule_event nav-link nav-link"
                              }
                              // className="nav-link active"
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Not Attended</span>
                            </a>
                          </li>
                          <li
                            className="nav-item "
                            onClick={() => {
                              setCurrentTab("refunded");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "refunded"
                                  ? "schedule_event nav-link active nav-link"
                                  : "schedule_event nav-link nav-link"
                              }
                              // className="nav-link active"
                              data-bs-toggle="tab"
                              href="#Refund"
                              role="tab"
                            >
                              <span>Refund</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 d-flex align-items-center justify-content-md-end">
                        <div className=" w-70 main-card orangeLeftB mb-0">
                          <div className="row align-items-center">
                            <div className="col-8">
                              <h5 className="darkGrey fw-bold consumerHeading">
                                Total User
                              </h5>
                            </div>
                            <div className="col-4">
                              <h3 className="textlightBlue text-end fw-bold">
                                {totalUser}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        currentTab === "attended"
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
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              {/* <th>Unique ID</th> */}
                              <th>Paid Amount</th>
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
                                          {ele?.first_name}
                                        </td>
                                        <td>{ele?.email}</td>
                                        <td>
                                          {moment(
                                            ele?.result?.start_date
                                          ).format("DD-MM-YYYY")}
                                        </td>
                                        <td>
                                          {moment(ele?.result?.end_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>{ele?.result?.amount}</td>
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
                        currentTab === "unattended"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
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
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              {/* <th>Unique ID</th> */}
                              <th>Paid Amount</th>
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
                                          {ele?.first_name}
                                        </td>
                                        <td>{ele?.email}</td>
                                        <td>
                                          {moment(
                                            ele?.result?.start_date
                                          ).format("DD-MM-YYYY")}
                                        </td>
                                        <td>
                                          {moment(ele?.result?.end_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>{ele?.result?.amount}</td>
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
                                )}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      className={
                        currentTab === "refunded"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      //className="tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                      id="Refund"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              {/* <th>Unique ID</th> */}
                              {/* <th>Block ID</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="fw-bold">Ajay Kumar</td>
                              <td>loremipsum@gmail.com</td>
                              <td>04-04-2023</td>
                              <div>04-04-2023</div>
                              {/* <td>TQ013001</td> */}
                              <td>
                                {" "}
                                <NavLink className="btn btn-sm btnRefund">
                                  Refunded
                                </NavLink>
                              </td>
                            </tr>
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
                                          {ele?.first_name}
                                        </td>
                                        <td>{ele?.email}</td>
                                        <td>
                                          {moment(
                                            ele?.result?.start_date
                                          ).format("DD-MM-YYYY")}
                                        </td>
                                        <td>
                                          {moment(ele?.result?.end_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink className="btn btn-sm btnRefund">
                                            Refunded
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
                                )}
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

export default PastOnlineEventDetails;
