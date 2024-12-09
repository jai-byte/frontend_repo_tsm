/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../../assets/images/card_bg.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import moment from "moment";
import MultiCircularProgressBar from "../../../Common/MultiCircularProgressBar";
import AdminRoute from "../../../../Route/RouteDetails";

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
    <g id="Group_14954" data-name="Group 14954" transform="translate(9.5 0.5)">
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

const ActivityDetails = () => {
  // const { id } = useParams();
  const { state } = useLocation();
  const [activityDetails, setActivityDetails] = useState("");
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [currentTab, setCurrentTab] = useState(
    state?.Preview_Tab || "Challenge"
  );
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Api call for get event details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          community_id: parseInt(id),
        },
        agent: "activity",
        function: "activityViewMore",
      }).then((response) => {
        console.log("Activity Details ", response?.data?.data?.data);
        setActivityDetails(response?.data?.data?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api Call For Get listing data in tabs
  const MyTeamTabList = (flagForList) => {
    try {
      var payload = {
        agent: "activity",
        function: "activitiesPerCommunity",
        //  flag: flagForList,
        //  page_no: currentPage,
        //  limit: itemsPerPage,
        // filter: {},
        data: {
          community_id: parseInt(id),
          flag: currentTab,
        },
      };
      //   if (filterselect === "" || search === "") {
      //     payload.filter = {};
      //   } else {
      //     payload.filter = {
      //       [filterselect]: search,
      //     };
      //   }
      API?.CommanApiCall(payload).then((response) => {
        console.log(
          "Response from Click on type listing api ",
          response?.data?.data?.data
        );
        if (response?.data?.data?.status === 200) {
          setListingData(response?.data?.data?.data?.activities);
          // setActivityDetails(response?.data?.data?.data);
          // setTotalPage(response?.data?.data?.total_   pages);

          // setTotalItems(response?.data?.data?.total_data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MyTeamTabList(currentTab);
  }, [
    currentTab,
    // currentPage, itemsPerPage, filterselect, search
  ]);

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
              <NavLink
                to="/activity-management"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Activity Details
                </h4>
              </NavLink>
            </div>
          </div>
          {/* whole div for shoprofileImgw details */}

          <div className="row">
            <div className="col-xl-12 mb-4">
              <div className="main-card p-4 h-100">
                <div className="row">
                  <div className="col-xl-4 mb-4">
                    <div className="d-flex">
                      {/* <img
                                       className="img-fluid"
                                       style={{ height: "150px", width: "150px" }}
                                       crossorigin="anonymous"
                                       src={CreateUserImg}
                                    /> */}
                      <div className="consumerProfileText ms-3">
                        <label class="form-label greyLight mb-1">Name:</label>
                        <p className="textBlack fw-bold">
                          {activityDetails && activityDetails?.community_title}
                        </p>
                        {/* <label class="form-label greyLight mb-1">
                            Description:
                          </label>
                          <p className="textBlack fw-bold">
                            {activityDetails &&
                              activityDetails?.community_description}
                          </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-4">
                    <label class="form-label greyLight mb-1">
                      Total Members:
                    </label>
                    <p className="textBlack fw-bold">
                      {activityDetails && activityDetails?.total_member}
                    </p>
                  </div>
                  <div className="col-xl-2 col-4">
                    <label class="form-label greyLight mb-1">
                      Community Type:
                    </label>
                    <p className="textBlack fw-bold">
                      {activityDetails && activityDetails?.community_type}
                    </p>
                  </div>
                  {activityDetails &&
                  activityDetails?.community_type === "Paid" ? (
                    <div className="col-xl-1 col-4">
                      <label class="form-label greyLight mb-1">Amount:</label>
                      <p className="textBlack fw-bold">
                        {activityDetails && activityDetails?.amount} /-
                      </p>
                    </div>
                  ) : null}
                  <div className="col-xl-2 col-4">
                    <label class="form-label greyLight mb-1">
                      Created Date:
                    </label>
                    <p className="textBlack fw-bold">
                      {moment(
                        activityDetails && activityDetails?.createdAt
                      ).format("DD/MMMM/YYYY")}
                    </p>
                  </div>
                  <div className="col-xl-1 col-4">
                    <label class="form-label greyLight mb-1">Status:</label>
                    {/* <p className="textBlack fw-bold">
                        {" "}
                        <div className="d-flex">
                          <div
                            className="button b2 me-xxl-3 me-2"
                            id="button-13"
                          >
                            <input type="checkbox" className="checkbox" />

                            <div className="knobs">
                              <span>|||</span>
                            </div>
                            <div className="layer"></div>
                          </div>
                          <p className="mt-1"> Active</p>
                        </div>
                      </p> */}
                    <td>
                      {activityDetails && activityDetails?.is_deleted === false
                        ? ActiveStatusSvg
                        : InActiveStatusSvg}
                    </td>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12">
                    <div className="tableCard">
                      <div className="">
                        <div className="tab-content text-muted mt-3">
                          <div className="row mb-4" id="consumers">
                            <div className="col-xl-6 mb-4 mb-xl-0">
                              <ul
                                className="nav nav-tabs nav-tabs-custom mt-5 mt-xl-0"
                                role="tablist"
                              >
                                <li
                                  className="nav-item"
                                  onClick={() => {
                                    setCurrentTab("Challenge");
                                    navigate({
                                      state: {},
                                    });
                                  }}
                                >
                                  <a
                                    className={
                                      currentTab === "Challenge"
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    href="#to-Be-Reviewed"
                                    role="tab"
                                  >
                                    <span>Challenges</span>
                                  </a>
                                </li>
                                <li
                                  className="nav-item"
                                  onClick={() => {
                                    setCurrentTab("Quest");
                                    navigate({
                                      state: {},
                                    });
                                  }}
                                >
                                  <a
                                    className={
                                      currentTab === "Quest"
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    href="#Re-Sent"
                                    role="tab"
                                  >
                                    <span>Quests</span>
                                  </a>
                                </li>
                                <li
                                  className="nav-item"
                                  onClick={() => {
                                    setCurrentTab("Poll");
                                    navigate({
                                      state: {},
                                    });
                                  }}
                                >
                                  <a
                                    className={
                                      currentTab === "Poll"
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    href="#Ongoing"
                                    role="tab"
                                  >
                                    <span>Polls</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div
                            className={
                              currentTab === "Challenge"
                                ? "tab-pane main-card p-3 active mb-0 box-shadow-bottom-none scroll__y"
                                : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none scroll__y"
                            }
                            id="to-Be-Reviewed"
                            role="tabpanel"
                            style={{ backgroundColor: "#F9F9F9" }}
                          >
                            <div className="table-responsive">
                              <table className="table mb-0 tablesWrap scrollTable">
                                <thead>
                                  <tr>
                                    <th>Content Type</th>
                                    <th>Title</th>
                                    <th>No. of Challenges</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody style={{ height: "400px" }}>
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
                                                {ele?.content_type}
                                              </td>
                                              <td>{ele?.content_title}</td>

                                              <td className="ps-5">
                                                {ele?.counts}
                                              </td>
                                              <td>
                                                <NavLink
                                                  className="btn btn-sm waves-effect waves-light btnView"
                                                  to={`../${AdminRoute?.Community?.ActivityManagement?.Preview?.replace(
                                                    ":type",
                                                    ele?.type
                                                  )
                                                    .replace(":commu_id", id)
                                                    .replace(
                                                      ":id",
                                                      ele?.activity_id
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
                                            <td
                                              colSpan={6}
                                              className="text-center"
                                            >
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
                              currentTab === "Quest"
                                ? "tab-pane main-card p-3 active mb-0 box-shadow-bottom-none scroll__y"
                                : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none scroll__y"
                            }
                            id="Re-Sent"
                            role="tabpanel"
                          >
                            <div className="table-responsive">
                              <table className="table mb-0 tablesWrap scrollTable">
                                <thead>
                                  <tr>
                                    <th>Content Type</th>
                                    <th>Title</th>
                                    <th>No. of Quests</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody style={{ height: "400px" }}>
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
                                                {ele?.content_type}
                                              </td>
                                              <td>{ele?.content_title}</td>

                                              <td className="ps-5">
                                                {ele?.counts}
                                              </td>
                                              <td>
                                                <NavLink
                                                  className="btn btn-sm waves-effect waves-light btnView"
                                                  to={`../${AdminRoute?.Community?.ActivityManagement?.Preview?.replace(
                                                    ":type",
                                                    ele?.type
                                                  )
                                                    .replace(":commu_id", id)
                                                    .replace(
                                                      ":id",
                                                      ele?.activity_id
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
                                            <td
                                              colSpan={6}
                                              className="text-center"
                                            >
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
                              currentTab === "Poll"
                                ? "tab-pane main-card p-3 active mb-0 box-shadow-bottom-none scroll__y"
                                : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none scroll__y"
                            }
                            id="Ongoing"
                            role="tabpanel"
                          >
                            <div className="table-responsive">
                              <table className="table mb-0 tablesWrap scrollTable">
                                <thead>
                                  <tr>
                                    <th>Content Type</th>
                                    <th>Title</th>
                                    <th>No. of Polls</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody style={{ height: "400px" }}>
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
                                                {ele?.content_type}
                                              </td>
                                              <td>{ele?.content_title}</td>

                                              <td className="ps-5">
                                                {ele?.counts}
                                              </td>
                                              <td>
                                                <NavLink
                                                  className="btn btn-sm waves-effect waves-light btnView"
                                                  to={`../${AdminRoute?.Community?.ActivityManagement?.Preview?.replace(
                                                    ":type",
                                                    ele?.type
                                                  )
                                                    .replace(":commu_id", id)
                                                    .replace(
                                                      ":id",
                                                      ele?.activity_id
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
                                            <td
                                              colSpan={6}
                                              className="text-center"
                                            >
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default ActivityDetails;
