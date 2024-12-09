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

const ScheduledEventFeedbacksDetail = () => {
  const { eventType, eventScheduled, status, id, feedBack_id } = useParams();
  const [feedBackDetails, setFeedBackDetails] = useState("");

  // Api call for get Feedback/Queries from user
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          event_feedback_id: parseInt(feedBack_id),
        },
        agent: "event_feedback",
        function: "view_eventfeedback",
      }).then((response) => {
        console.log(
          "response from Feedback details api ",
          response?.data?.data?.data
        );
        if (response?.data?.data?.status === 200) {
          setFeedBackDetails(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
                to={`../${AdminRoute?.Events?.ScheduledEventFeedbacks?.replace(
                  ":eventType",
                  eventType
                )
                  .replace(":eventScheduled", eventScheduled)
                  .replace(":eventType", eventType)
                  .replace(":status", status)
                  .replace(":id", id)}`}
                //to="/events/scheduled-event-feedbacks"
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
              <div className="main-card p-4 mb-0 box-shadow-bottom-none">
                <div className="row mb-3">
                  <div class="col-12">
                    <label className="form-label">
                      Feedback/Queries from user
                    </label>
                    <textarea
                      type="text"
                      className="form-control border-0 py-3"
                      id="Title"
                      value={feedBackDetails?.message}
                    ></textarea>
                  </div>
                </div>
                <hr />
                {/* <div className="row mb-3">
                    <div class="col-12">
                      <label className="form-label">Your responses</label>
                      <textarea
                        type="text"
                        className="form-control border-0 py-3"
                        id="Title"
                        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu"
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center my-3">
                    <a href="#" className="textlightBlue">
                      Close Responses
                    </a>
                  </div>{" "}
                  <div className="row mb-3">
                    <div class="col-12">
                      <label className="form-label">Your response</label>
                      <textarea
                        type="text"
                        className="form-control border-0"
                        id="Title"
                        placeholder="Enter your response to the query"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <NavLink className="btn btn-sm btnView">Send</NavLink>
                  </div> */}
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

export default ScheduledEventFeedbacksDetail;
