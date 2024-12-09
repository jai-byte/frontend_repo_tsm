/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import moment from "moment";
import FilterSearch from "../../Common/FilterSearch";
import Pagination from "../../Common/Pagination";
import AdminRoute from "../../../Route/RouteDetails";
import { ToastContainer, toast } from "react-toastify";

const TicketSoldEventDetails = () => {
  const { eventType, eventScheduled, status, id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadingOnButton, setloadingOnButton] = useState(false);

  const [currentTab, setCurrentTab] = useState(
    // state?.PastOnlineEventDetails_Tab
    //   ? state?.PastOnlineEventDetails_Tab
    //   :
    "attended"
  );

  const [totalUser, setTotalUser] = useState("");

  const [listingData, setListingData] = useState([]);
  const [selectedUserForRefund, setSelectedUserForRefund] = useState("");

  useEffect(() => {
    console.log("selectedUserForRefund", selectedUserForRefund);
  }, [selectedUserForRefund]);

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

  const handleClickYesForRefund = () => {
    //console.log(selectedUserForRefund);
    setloadingOnButton(true);
    try {
      API?.CommanApiCall({
        agent: "event",
        function: "event_attendance_add",
        data: {
          user_register_event_id: parseInt(selectedUserForRefund),
          refund_status: true,
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log("delete activity response", response?.data?.data?.data);
          toast?.success(response?.data?.data?.message);
          setloadingOnButton(false);
          window.$("#exampleModal1").modal("hide");
          MyTeamTabList(currentTab);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
          <div className="row mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to={`../${AdminRoute?.Events?.LiveEventDetails?.replace(
                  ":eventType",
                  eventType
                )
                  .replace(":eventScheduled", eventScheduled)
                  .replace(":status", status)
                  .replace(":id", id)}`}
                //to="/events/scheduled-event-details"
                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </NavLink>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Scheduled Event Details
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
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Paid</span>
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
                              data-bs-toggle="tab"
                              href="#Re-Sent"
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
                              <th>Unique ID</th>
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
                                        <td>{ele?.event_booking_id || "-"}</td>
                                        <td>Rs. {ele?.result?.amount}</td>
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
                            {/* <tr>
                                <td className="fw-bold">Ajay Kumar</td>
                                <td>loremipsum@gmail.com</td>
                                <td>04-04-2023</td>
                                <div>04-04-2023</div>
                                <td>TQ013001</td>
                                <td>Rs. 3000</td>
                              </tr> */}
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
                              <th>Unique ID</th>
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
                                        <td>{ele?.event_booking_id || "-"}</td>
                                        {ele?.refund_status ? (
                                          <td>
                                            <NavLink
                                              aria-current="page"
                                              className="btn btn-sm btnRefund"
                                            >
                                              Refunded
                                            </NavLink>
                                          </td>
                                        ) : (
                                          <td>
                                            <div className="cancelBtn">
                                              <button
                                                type="button"
                                                className="btn btn-sm btnViewOrange px-4"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1"
                                                onClick={() => {
                                                  setSelectedUserForRefund(
                                                    ele?.user_register_event_id
                                                  );
                                                }}
                                              >
                                                <span className="">
                                                  {" "}
                                                  Refund
                                                </span>
                                              </button>
                                            </div>
                                          </td>
                                        )}
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
                            {/* <tr>
                                <td className="fw-bold">Ajay Kumar</td>
                                <td>loremipsum@gmail.com</td>
                                <td>04-04-2023</td>
                                <div>04-04-2023</div>
                                <td>TQ013001</td>
                                <td>
                                  <NavLink
                                    aria-current="page"
                                    className="btn btn-sm btnRefund"
                                  >
                                    Refunded
                                  </NavLink>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Ajay Kumar</td>
                                <td>loremipsum@gmail.com</td>
                                <td>04-04-2023</td>
                                <div>04-04-2023</div>
                                <td>TQ013001</td>
                                <td>
                                  <div className="cancelBtn">
                                    <button
                                      type="button"
                                      className="btn btn-sm btnViewOrange px-4"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal1"
                                    >
                                      <span className=""> Refund</span>
                                    </button>
                                  </div>
                                </td>
                              </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModal1"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-5 border-radius-5 border-top-model-black">
                          <div className="modal-body text-center">
                            <h3 className="fw-bold">
                              Is the refund made to the user?
                            </h3>

                            <div className="col-12 mt-4">
                              <div className="d-flex justify-content-center">
                                <div className="cancelBtn">
                                  <button
                                    disabled={loadingOnButton}
                                    onClick={() => {
                                      window.$("#exampleModal1").modal("hide");
                                    }}
                                    className="btn btn-reject me-3 px-4 border-radius-5"
                                  >
                                    <span className="">No</span>
                                  </button>
                                </div>

                                <div className="saveBtn ms-2">
                                  <button
                                    disabled={loadingOnButton}
                                    onClick={() => {
                                      handleClickYesForRefund();
                                    }}
                                    className="btn bgBlack text-white border-radius-5 px-4 float-end"
                                  >
                                    <span>
                                      {loadingOnButton && (
                                        <span
                                          className="spinner-border spinner-border-sm me-2"
                                          role="status"
                                          aria-hidden="true"
                                        ></span>
                                      )}
                                      Yes
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default TicketSoldEventDetails;
