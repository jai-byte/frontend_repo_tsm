/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import AdminRoute from "../../../Route/RouteDetails";
import API from "../../../Api/Api";
import moment from "moment";
import FilterSearch from "../../Common/FilterSearch";
import Pagination from "../../Common/Pagination";
import TooltipCustom from "../../Common/TooltipCustom";

const Events = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(
    state?.event_previousTab ? state?.event_previousTab : "schedule_event"
  );
  const [listingData, setListingData] = useState([]);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  // For Pagination
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);

  // Functionality for Filter and search
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "Name", value: "name" },
    { label: "Type", value: "type" },
    { label: "status", value: "status" },
  ];
  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const EventsTabList = (flagForList) => {
    try {
      var payload = {
        agent: "event",
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
        console.log(response);
        console.log(
          "Response from events listing api ",
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
    EventsTabList(currentTab);
  }, [currentTab, currentPage, itemsPerPage, filterselect, search]);

  //function for create new event
  const [selectedEvent, setSelectedEvent] = useState("Online");

  const handleRadioChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  // Function for onClick Create Event Button

  const handleClickSubmit = () => {
    window.$("#exampleModal").modal("hide");
    navigate(
      `../${AdminRoute?.Events?.CreateEvents?.replace(
        "/:eventType",
        ""
      )}/${selectedEvent}`
    );
  };

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
                  <h3 className="headText mt-2 mb-2 fw-bold">Events</h3>
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
                      <div className="col-xl-5">
                        <ul
                          className="nav nav-tabs nav-tabs-custom"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("schedule_event");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "schedule_event"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              //   className="nav-link "
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Scheduled Event</span>
                            </a>
                          </li>
                          <li
                            className="nav-item "
                            onClick={() => {
                              setCurrentTab("past_event");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "past_event"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              // className="nav-link active"
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Past Events</span>
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
                        <div>
                          {/* Button trigger modal */}
                          {TajurbaAdmin_priviledge_data &&
                          TajurbaAdmin_priviledge_data.some(
                            (ele) =>
                              ele.title === "Events" && ele.is_edit === true
                          ) ? (
                            <button
                              type="button"
                              className="btn bgDarkBlack text-white px-4 float-end ms-3"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              <i className="fa-regular fa-plus"></i>
                              <span className="ms-2">Create</span>
                            </button>
                          ) : null}
                          {/* Modal */}
                          <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content border-radius-5 border-top-model-black">
                                <div className="modal-header border-0">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body text-center p-5">
                                  <h3 className="fw-bold">
                                    Select the type of event you want to create
                                  </h3>
                                  <div className="text-center mt-4">
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="inlineRadio1"
                                        value="Online"
                                        checked={selectedEvent === "Online"}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="inlineRadio1"
                                      >
                                        Online Event
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="inlineRadio2"
                                        value="Offline"
                                        checked={selectedEvent === "Offline"}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="inlineRadio2"
                                      >
                                        Offline Event
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-12 d-flex justify-content-center mt-4">
                                    <div className="saveBtn">
                                      <button
                                        onClick={() => {
                                          handleClickSubmit();
                                        }}
                                        className="btn bgOrange text-white px-4 border-radius-5"
                                      >
                                        <span className="">Submit</span>
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
                    <div
                      className={
                        currentTab === "schedule_event"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      //  className="tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      id="to-Be-Reviewed"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th>Event Name</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Event Type</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                                <td className="fw-bold">Delhi Conference</td>
                                <td>04-04-2023</td>
                                <td>04-04-2023</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className="fa fa-solid fa-circle textRed font-size-10 me-2"></i>
                                    Online
                                  </div>
                                </td>
                                <td>Rs. 3000</td>
                                <td className="textGreen">LIVE</td>

                                <td>
                                  <NavLink
                                    to="/live-event-details"
                                    className="btn btn-sm waves-effect waves-light btnView"
                                  >
                                    View More
                                  </NavLink>
                                </td>
                              </tr> */}
                            {/* <tr>
                                <td className="fw-bold">Self Confidence</td>
                                <td>04-04-2023</td>
                                <td>04-04-2023</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className="fa fa-solid fa-circle font-size-10 me-2"></i>
                                    Offline
                                  </div>
                                </td>
                                <td>Rs. 3000</td>
                                <td>20-12-2023</td>

                                <td>
                                  <NavLink
                                    to="/live-event-details"
                                    className="btn btn-sm waves-effect waves-light btnView"
                                  >
                                    View More
                                  </NavLink>
                                </td>
                              </tr> */}
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
                                          {moment(ele?.start_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          {moment(ele?.end_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <div className="d-flex align-items-center">
                                          <i
                                            className={
                                              ele?.type === "Online"
                                                ? "fa fa-solid fa-circle textRed font-size-10 me-2"
                                                : "fa fa-solid fa-circle font-size-10 me-2"
                                            }
                                          ></i>
                                          <td>{ele?.type}</td>
                                        </div>
                                        <td>Rs. {ele?.amount}</td>
                                        {/* <td className="textGreen">{ele?.status}</td> */}
                                        <td
                                          className={
                                            ele?.status === "Live"
                                              ? "textGreen"
                                              : "TextYellow"
                                          }
                                        >
                                          {ele?.status}
                                        </td>
                                        <td>
                                          <NavLink
                                            // to={`../${AdminRoute?.Events?.LiveEventDetails}`}
                                            to={`../${AdminRoute?.Events?.LiveEventDetails?.replace(
                                              ":eventType",
                                              ele?.type
                                            )
                                              .replace(
                                                ":eventScheduled",
                                                "schedule_event"
                                              )
                                              .replace(":status", ele?.status)
                                              .replace(":id", ele?.event_id)}`}
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
                        currentTab === "past_event"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      //className="tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th>Event Name</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Event Type</th>
                              <th>Price</th>
                              {/* <th>Status</th> */}
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                                <td className="fw-bold">Delhi Conference</td>
                                <td>04-04-2023</td>
                                <td>04-04-2023</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className="fa fa-solid fa-circle textRed font-size-10 me-2"></i>
                                    Online
                                  </div>
                                </td>
                                <td>Rs. 3000</td>
                                <td>20-12-2023</td>

                                <td>
                                  <NavLink
                                    to="/past-event-details"
                                    className="btn btn-sm waves-effect waves-light btnView"
                                  >
                                    View More
                                  </NavLink>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Self Confidence</td>
                                <td>04-04-2023</td>
                                <td>04-04-2023</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className="fa fa-solid fa-circle font-size-10 me-2"></i>
                                    Offline
                                  </div>
                                </td>
                                <td>Rs. 3000</td>
                                <td>20-12-2023</td>

                                <td>
                                  <NavLink
                                    to="/past-event-details"
                                    className="btn btn-sm waves-effect waves-light btnView"
                                  >
                                    View More
                                  </NavLink>
                                </td>
                              </tr> */}

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
                                        <td>{TooltipCustom(ele?.name)}</td>
                                        <td>
                                          {moment(ele?.start_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          {moment(ele?.end_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <div className="d-flex align-items-center">
                                          <i
                                            className={
                                              ele?.type === "Online"
                                                ? "fa fa-solid fa-circle textRed font-size-10 me-2"
                                                : "fa fa-solid fa-circle font-size-10 me-2"
                                            }
                                          ></i>
                                          <td>{ele?.type}</td>
                                        </div>
                                        <td>Rs. {ele?.amount}</td>
                                        {/* <td
                                          className={
                                            ele?.status === "Online"
                                              ? "textGreen"
                                              : "textRed"
                                          }
                                        >
                                          {ele?.status}
                                        </td> */}
                                        <td>
                                          <NavLink
                                            // to={`../${AdminRoute?.Events?.PastEventDetails}`}
                                            to={`../${AdminRoute?.Events?.PastEventDetails?.replace(
                                              ":eventType",
                                              ele?.type
                                            )
                                              .replace(
                                                ":eventScheduled",
                                                "past_event"
                                              )
                                              .replace(":status", ele?.status)
                                              .replace(":id", ele?.event_id)}`}
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
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Events;
