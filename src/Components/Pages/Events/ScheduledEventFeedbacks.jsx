/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
// import API from "../../../../Api/Api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import Pagination from "../../Common/Pagination";
import { ToastContainer, toast } from "react-toastify";
import AdminRoute from "../../../Route/RouteDetails";
import API from "../../../Api/Api";
import moment from "moment";

const ScheduledEventFeedbacks = () => {
  const { eventType, eventScheduled, status, id } = useParams();
  const navigate = useNavigate();

  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);
  // Functionality for Filter and search
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "Role", value: "name" },
    { label: "Status", value: "status" },
  ];

  const CommunityMemberList = () => {
    try {
      var payload = {
        agent: "event_feedback",
        function: "get_list",
        data: {
          event_id: parseInt(id),
        },
        page_no: currentPage,
        limit: itemsPerPage,
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
          "Response from Event Feedbacks api ",
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
    CommunityMemberList();
  }, [currentPage, itemsPerPage, filterselect, search]);

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
                // to="/scheduled-event-eetails"
                className="w-auto float-start pe-1 textBlack"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>
              </NavLink>

              <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                Scheduled Event Feedbacks
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-3 mb-0 box-shadow-bottom-none">
                <div className="table-responsive">
                  <table className="table mb-0 tablesWrap">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        {/* <th>Unique ID</th> */}
                        <th>Paid Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6}>
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border" role="status">
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
                                    {ele?.user_data?.first_name}
                                  </td>
                                  <td>{ele?.user_data?.email}</td>
                                  <td>
                                    {moment(ele?.user_data?.createdAt)?.format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  {/* <td>TQ013001</td> */}
                                  <td>Rs. {ele?.event_data?.amount}</td>
                                  <td>
                                    <NavLink
                                      // to="/events/scheduled-event-feedbacks-detail/:eventScheduled/:status/:id/:feedBack_id"
                                      to={`../${AdminRoute?.Events?.ScheduledEventFeedbacksDetail?.replace(
                                        ":eventType",
                                        eventType
                                      )
                                        .replace(
                                          ":eventScheduled",
                                          eventScheduled
                                        )
                                        .replace(":status", status)
                                        .replace(":id", id)
                                        .replace(
                                          ":feedBack_id",
                                          ele?.event_feedback_id
                                        )}`}
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
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <Pagination
                     totalPagess={totalPagess}
                     setTotalPage={setTotalPage}
                     totalItems={totalItems}
                     setTotalItems={setTotalItems}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                     itemsPerPage={itemsPerPage}
                     setItemsPerPage={setItemsPerPage}
                  /> */}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default ScheduledEventFeedbacks;
