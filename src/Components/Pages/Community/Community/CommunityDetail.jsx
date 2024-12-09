/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import moment from "moment";
import AdminRoute from "../../../../Route/RouteDetails";

const CommunityDetail = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [communityDetils, setCommunityDetails] = useState("");
  //   console.log(id, type);

  // Api call for get event details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          community_id: parseInt(id),
        },
        agent: "community",
        function: "view_details",
      }).then((response) => {
        console.log("Community Details ", response?.data?.data?.data[0]);
        setCommunityDetails(response?.data?.data?.data[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <span
                // to="/community"
                // to={{
                //   pathname: "/community",
                //   state: {
                //     community_previousTab: type,
                //   },
                // }}
                onClick={() => {
                  navigate("/community", {
                    state: { community_previousTab: type },
                  });
                }}
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Community Detail
                </h4>
              </span>
            </div>

            {/* <div className="col-6">
                <div className="col-12 d-flex justify-content-end">
                  <div className="saveBtn">
                    <NavLink
                      to="/edit-community"
                      className="btn bgBlack text-white border-radius-2 px-4 float-end"
                    >
                      <span className="">Edit</span>
                    </NavLink>
                  </div>
                </div>
              </div> */}
          </div>
          {/* whole div for shoprofileImgw details */}
          <div className="row">
            <div className="col-xl-12 mb-4">
              <div className="main-card p-4 h-100">
                <div className="row">
                  <div className="col-xl-6 col-6 mb-4">
                    <div className="d-flex align-items-center">
                      {/* <img
                                       className="rounded-circle img-fluid"
                                       style={{ height: "150px", width: "150px" }}
                                       crossorigin="anonymous"
                                       src={CreateUserImg}
                                    /> */}
                      <div className="consumerProfileText ms-3">
                        <label class="form-label greyLight mb-1">Name:</label>
                        <p className="textBlack fw-bold">
                          {communityDetils && communityDetils?.community_title}
                        </p>
                        <label class="form-label greyLight mb-1">
                          Description :
                        </label>
                        <p className="textBlack fw-bold">
                          {communityDetils &&
                            communityDetils?.community_description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-6">
                    <label class="form-label greyLight mb-1">
                      Total Members:
                    </label>
                    <p className="textBlack fw-bold">
                      {communityDetils &&
                        communityDetils?.purchase_community_data?.length}
                    </p>
                    <label class="form-label greyLight mb-1">
                      Community Type:
                    </label>
                    <p className="textBlack fw-bold">
                      {communityDetils && communityDetils?.community_type}
                    </p>
                  </div>
                  <div className="col-xl-2 col-6">
                    <label class="form-label greyLight mb-1">
                      Created Date:
                    </label>
                    <p className="textBlack fw-bold">
                      {moment(
                        communityDetils && communityDetils?.createdAt
                      ).format("DD/MMM/YYYY")}
                    </p>
                    {communityDetils &&
                    communityDetils?.community_type === "Paid" ? (
                      <>
                        <label class="form-label greyLight mb-1">Amount:</label>
                        <p className="textBlack fw-bold">
                          {communityDetils &&
                            communityDetils?.activity_courses_before_approve
                              ?.amount}
                          /-
                        </p>
                      </>
                    ) : null}
                  </div>
                  <div className="col-xl-2 col-6">
                    <label class="form-label greyLight mb-1">Status:</label>
                    <p className="textBlack fw-bold">
                      {" "}
                      <div className="d-flex">
                        <div className="button b2 me-xxl-3 me-2" id="button-13">
                          <input
                            type="checkbox"
                            className="checkbox"
                            disabled
                            checked={
                              communityDetils &&
                              communityDetils?.is_active === true
                                ? false
                                : true
                            }
                          />

                          <div className="knobs">
                            <span>|||</span>
                          </div>
                          <div className="layer"></div>
                        </div>

                        {/* <p className="mt-1">{communityDetils?.is_active === true ? "Active" : "Inactive"}</p> */}
                      </div>
                    </p>
                    {/* <label class="form-label greyLight mb-1">
                        Last active on:
                      </label>
                      <p className="textBlack fw-bold">
                        {moment(
                          communityDetils && communityDetils?.updatedAt
                        ).format("DD/MMM/YYYY")}
                      </p> */}
                  </div>
                </div>
                <hr />
                <div className="row pt-2">
                  <div className="col-xl-6 mb-5">
                    <div className="pe-4">
                      <h4 className="textBlack">Revenue till date</h4>
                      <p className="greyLight">
                        Total amount generated by this classroom
                      </p>
                      <h1 className="h2 fw-bold self-font-family">
                        ₹{" "}
                        {communityDetils &&
                          communityDetils?.total_paid_community_amount}
                      </h1>
                      <hr />
                      <h4 className="textBlack">Engagements till date</h4>
                      <p className="greyLight">
                        No. of activities of each engagement
                      </p>
                      <div className="row">
                        <div className="col-4">
                          <div className="community-card">
                            <div className="p-3">
                              <p className="greyLight mb-3">Challenges</p>
                              <h2 className="textBlack fw-bold text-center mb-0">
                                {communityDetils &&
                                  communityDetils?.total_challenges}
                              </h2>
                            </div>
                            <div className="community-btn text-center py-2">
                              <NavLink
                                className="textlightBlue text-decoration-none"
                                to={`../${AdminRoute?.Community?.Community?.CommunityViewDetails?.replace(
                                  ":type",
                                  type
                                )
                                  .replace(":id", id)
                                  .replace(":activityType", "Challenge")}`}
                                //  to="/activity-management/activity-details/:id"
                              >
                                View Details
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="community-card">
                            <div className="p-3">
                              <p className="greyLight mb-3">Quests</p>
                              <h2 className="textBlack fw-bold text-center mb-0">
                                {communityDetils &&
                                  communityDetils?.total_quests}
                              </h2>
                            </div>
                            <div className="community-btn text-center py-2">
                              <NavLink
                                className="textlightBlue text-decoration-none"
                                to={`../${AdminRoute?.Community?.Community?.CommunityViewDetails?.replace(
                                  ":type",
                                  type
                                )
                                  .replace(":id", id)
                                  .replace(":activityType", "Quest")}`}
                                // to="/activity-management/activity-details/:id"
                              >
                                View Details
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="community-card">
                            <div className="p-3">
                              <p className="greyLight mb-3">Polls</p>
                              <h2 className="textBlack fw-bold text-center mb-0">
                                {communityDetils &&
                                  communityDetils?.total_polls}
                              </h2>
                            </div>
                            <div className="community-btn text-center py-2">
                              <NavLink
                                className="textlightBlue text-decoration-none"
                                to={`../${AdminRoute?.Community?.Community?.CommunityViewDetails?.replace(
                                  ":type",
                                  type
                                )
                                  .replace(":id", id)
                                  .replace(":activityType", "Poll")}`}
                                // to="/activity-management/activity-details/:id"
                              >
                                View Details
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 border-left-grey">
                    <div className="ps-4">
                      {/* <h4 className="textBlack">Revenue till last active date</h4>
                                    <p className="greyLight">Total amount generated by this classroom</p>
                                    <h1 className="h2 fw-bold">
                                       {communityDetils && communityDetils?.total_paid_community_amount}
                                    </h1> */}
                      {/* <hr /> */}
                      <div className="d-flex justify-content-between mb-3">
                        <h4 className="textBlack">List of members</h4>
                        {/* <div className="cancelBtn">
                                          <NavLink to="/community-detail" className="btn btn-reject me-3 px-4">
                                             <span className="">Add User</span>
                                          </NavLink>
                                       </div> */}
                      </div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="fw-normal border-0 disable">
                              Member Name
                            </th>
                            <th className="fw-normal border-0 disable">
                              Email address
                            </th>
                            <th className="fw-normal border-0 disable">
                              Registration date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {communityDetils &&
                          communityDetils?.purchase_community_data.length ? (
                            communityDetils?.purchase_community_data?.map(
                              (ele, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="border-0">
                                      {ele?.user_data?.first_name}
                                    </td>
                                    <td className="border-0">
                                      {ele?.user_data?.email}
                                    </td>
                                    <td className="border-0">
                                      {" "}
                                      {moment(ele?.user_data?.createdAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          ) : (
                            <>
                              <tr>
                                <td colSpan={6} className="text-center">
                                  No data Found
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                      {communityDetils &&
                      communityDetils?.purchase_community_data.length ? (
                        <div className="text-center">
                          <NavLink
                            state={{
                              community_name:
                                communityDetils &&
                                communityDetils?.community_title,
                            }}
                            to={`../${AdminRoute?.Community?.Community?.CommunityMembers?.replace(
                              ":type",
                              type
                            ).replace(":id", id)}`}
                            //  to="/community-members"
                            className="textlightBlue border-0 rounded-0 text-decoration-underline"
                          >
                            View all
                          </NavLink>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default CommunityDetail;
