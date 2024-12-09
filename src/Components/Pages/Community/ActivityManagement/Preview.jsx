/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import AdminRoute from "../../../../Route/RouteDetails";
import MultiCircularProgressBar from "../../../Common/MultiCircularProgressBar";
import moment from "moment";
import * as XLSX from "xlsx";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Preview = () => {
  const { type, id, commu_id } = useParams();
  const [activityDetails, setActivityDetails] = useState("");
  const [community_id, setCommunity_id] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [analyticsDetails, setAnalyticsDetails] = useState("");

  const [showFullDescription, setShowFullDescription] = useState(false);

  // console.log(id, commu_id);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [values, setValues] = useState([
    // { label: "Progress 1", value: "20", percent: 20, color: "#3E98C7" },
    // { label: "Progress 2", value: "30", percent: 30, color: "#F69256" },
    // { label: "Progress 3", value: "50", percent: 50, color: "#67C7D3" },
    // Add more values as needed
  ]);

  const initialState = (() => {
    if (type === "Challenge") {
      return [
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctanswer: "",
          type: type,
          community_id: community_id,
          activity_id: id,
          is_deleted: false,
          _id: "",
          activityType_id: null,
        },
      ];
    } else if (type === "Quest") {
      return [
        {
          quest_title: "",
          description: "",
          community_id: community_id,
          activity_id: id,
          is_deleted: false,
          _id: "",
          type: type,
          activityType_id: null,
        },
      ];
    } else if (type === "Poll") {
      return {
        poll_title: "",
        description: "",
        option1: "",
        option2: "",
        community_id: community_id,
        activity_id: id,
        activityType_id: null,
        is_deleted: false,
        _id: "",
        type: type,
      };
    }
  })();

  // For Challenge
  const [challenge, setChallenge] = useState(initialState);

  // Api call for get Activity details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          activity_id: parseInt(id),
          activity_type: type,
        },
        agent: "activity",
        function: "activityDetails",
      }).then((response) => {
        console.log("Activity details data ", response?.data?.data?.data);
        setActivityDetails(response?.data?.data?.data);
        setCommunity_id(response?.data?.data?.data?.community_id);

        // setcommunityId(response?.data?.data?.data?.community?.community_id);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const option1UserCount = analyticsDetails?.option_1_user_count || 0;
  const option2UserCount = analyticsDetails?.option_2_user_count || 0;

  const option1Percentage = analyticsDetails?.option_1_per || 0;
  const option2Percentage = analyticsDetails?.option_2_per || 0;

  // Api call for get Analytics details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          activity_id: parseInt(id),
          activity_type: type,
        },
        agent: "activity",
        function: "activity_analytics_view_Detail",
      }).then((response) => {
        console.log(
          "Activity Analytics details data ",
          response?.data?.data?.data
        );
        setAnalyticsDetails(response?.data?.data?.data);
        setValues([
          {
            label: "Attempted",
            value: response?.data?.data?.data?.total_user_attemp || 0,
            percent: response?.data?.data?.data?.total_user_attemp_per || 0,
            color: "#3E98C7",
          },
          {
            label: "Non Attempted",
            value: response?.data?.data?.data?.total_user_not_attempt || 0,
            percent:
              response?.data?.data?.data?.total_user_not_attempt_per || 0,
            color: "#F69256",
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api for Get Challenge || Poll || Quest Details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          activity_id: parseInt(id),
          activity_type: type,
        },

        agent: "activity",
        function: "listActivityType",
      }).then((response) => {
        console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          const responseData =
            type !== "Poll"
              ? response?.data?.data?.data
              : response?.data?.data?.data[0];
          console.log("responseData", responseData);
          if (response?.data?.data?.data?.length) {
            if (type === "Challenge") {
              setChallenge(
                responseData.map((item) => ({
                  question: item.question,
                  option1: item.option1,
                  option2: item.option2,
                  option3: item.option3,
                  option4: item.option4,
                  correctanswer: item.correctanswer,
                  activityType_id: item?.activityType_id,
                  _id: item._id,
                  is_deleted: item?.is_deleted,
                }))
              );
            } else if (type === "Quest") {
              setChallenge(
                responseData.map((item) => ({
                  quest_title: item?.quest_title,
                  description: item?.description,
                  activityType_id: item?.activityType_id,
                  _id: item._id,
                  is_deleted: item?.is_deleted,
                }))
              );
            } else if (type === "Poll") {
              setChallenge({
                ...challenge,
                poll_title: responseData?.poll_title,
                description: responseData?.description,
                option1: responseData?.option1,
                option2: responseData?.option2,
                activityType_id: responseData?.activityType_id,
                _id: responseData._id,
                is_deleted: responseData?.is_deleted,
              });
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Function for Download Detail List

  // const handleClickDownloadDetails = () => {
  //   // console.log("handleClickDownloadDetails");
  //   try {
  //     API?.CommanApiCall({
  //       agent: "activity",
  //       function: "activity_analytics_export_Detail",
  //       data: {
  //         activity_type: "Poll",
  //         activity_id: parseInt(64),
  //       },
  //     })
  //       .then((response) => {
  //         if (response?.data?.data?.status === 200) {
  //           const excelUrl = response.data.data.data;
  //           console.log("Excel URL:", excelUrl);

  //           // Check if URL is valid
  //           if (excelUrl) {
  //             // Use file-saver to initiate download
  //             saveAs(excelUrl, "exported_data.csv"); // Make sure to use .csv extension
  //           } else {
  //             console.error("Invalid Excel URL:", excelUrl);
  //           }
  //         } else {
  //           console.error("API returned status:", response?.data?.data?.status);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("API call failed:", error);
  //       });
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //   }
  // };

  // const handleClickDownloadDetails = () => {
  //   // console.log("handleClickDownloadDetails");
  //   try {
  //     API?.CommanApiCall({
  //       agent: "activity",
  //       function: "activity_analytics_export_Detail",
  //       data: {
  //         activity_type: type,
  //         activity_id: parseInt(78),
  //       },
  //     })
  //       .then((response) => {
  //         if (response?.data?.data?.status === 200) {
  //           const excelUrl = response.data.data.data;
  //           console.log("Excel URL:", excelUrl);

  //           // Check if URL is valid
  //           if (excelUrl) {
  //             // Assuming excelUrl contains CSV data directly
  //             const csvData = excelUrl;

  //             // Parse CSV data
  //             const attendCsv = csvData.attend_user_csv;
  //             const notAttendCsv = csvData.not_attend_user_csv;

  //             // Convert CSV strings into Blob objects
  //             const attendBlob = new Blob([attendCsv], { type: "text/csv" });
  //             const notAttendBlob = new Blob([notAttendCsv], {
  //               type: "text/csv",
  //             });

  //             // Use file-saver to initiate download
  //             saveAs(attendBlob, "attend_user_data.csv");
  //             saveAs(notAttendBlob, "not_attend_user_data.csv");
  //           } else {
  //             console.error("Invalid Excel URL:", excelUrl);
  //           }
  //         } else {
  //           console.error("API returned status:", response?.data?.data?.status);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("API call failed:", error);
  //       });
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //   }
  // };

  const handleClickDownloadDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "activity",
        function: "activity_analytics_export_Detail",
        data: {
          activity_type: type,
          activity_id: parseInt(id),
        },
      })
        .then((response) => {
          if (response?.data?.data?.status === 200) {
            const excelUrl = response.data.data.data;
            console.log("Excel URL:", excelUrl);

            // Check if URL is valid
            if (excelUrl) {
              // Assuming excelUrl contains CSV data directly
              const csvData = excelUrl;

              // Parse CSV data
              const attendCsv = csvData.attend_user_csv;
              const notAttendCsv = csvData.not_attend_user_csv;

              // Convert CSV strings into arrays
              const attendArray = attendCsv
                .split("\n")
                .map((row) => row.split(","));
              const notAttendArray = notAttendCsv
                .split("\n")
                .map((row) => row.split(","));

              // Create a new workbook
              const workbook = XLSX.utils.book_new();

              // Add worksheets
              const attendSheet = XLSX.utils.aoa_to_sheet(attendArray);
              const notAttendSheet = XLSX.utils.aoa_to_sheet(notAttendArray);
              XLSX.utils.book_append_sheet(
                workbook,
                attendSheet,
                "Attend Users"
              );
              XLSX.utils.book_append_sheet(
                workbook,
                notAttendSheet,
                "Not Attend Users"
              );

              // Save the workbook
              XLSX.writeFile(workbook, "user_data.xlsx");
            } else {
              console.error("Invalid Excel URL:", excelUrl);
            }
          } else {
            console.error("API returned status:", response?.data?.data?.status);
          }
        })
        .catch((error) => {
          console.error("API call failed:", error);
        });
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          {/* <DateAndTimeLayout /> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Community &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    {activityDetails && activityDetails?.community_name}
                  </span>
                </div>
                <span className="mx-2 lightGrey ">|</span>
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Category &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    {activityDetails && activityDetails?.content_type}
                  </span>
                </div>
                <span className="mx-2 lightGrey">|</span>
                <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                  <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                    Title &nbsp;&nbsp;{" "}
                  </span>
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    {activityDetails && activityDetails?.content_title}
                  </span>
                </div>
                <span className="mx-2 lightGrey">|</span>
                {type === "Challenge" ? (
                  <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Time per question &nbsp;&nbsp;{" "}
                    </span>
                    <span className="fw-normal d-flex align-items-center font-size-10">
                      {activityDetails && activityDetails?.provided_timer}
                    </span>
                  </div>
                ) : null}

                <span className="mx-2 lightGrey">|</span>
                <h4 className="page-title mb-0 font-size-18 fw-normal text-end">
                  <span className="fw-normal d-flex align-items-center font-size-10">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Duration &nbsp;&nbsp;{" "}
                    </span>
                    {moment(
                      activityDetails && activityDetails?.start_date
                    ).format("DD-MM-YYYY")}
                    <span className="mx-2 font-size-10">to</span>
                    <span className="font-size-10">
                      {moment(
                        activityDetails && activityDetails?.end_date
                      ).format("DD-MM-YYYY")}
                    </span>
                  </span>
                </h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to={`../${AdminRoute?.Community?.ActivityManagement?.ActivityDetails?.replace(
                  ":id",
                  commu_id
                )}`}
                state={{
                  Preview_Tab: type,
                }}
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Preview
                </h4>
              </NavLink>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card bg-white p-3">
                <div className="d-flex">
                  <h5 className="mb-0 fw-bold">
                    {activityDetails && activityDetails?.content_title}
                  </h5>
                </div>
                <hr className="borderHr my-3"></hr>
                <div className="row">
                  <div className="col-12">
                    <p className="textBlack">
                      {/* {activityDetails && activityDetails?.description} */}

                      {activityDetails?.description && (
                        <>
                          {showFullDescription
                            ? activityDetails.description
                            : activityDetails.description.slice(0, 200)}
                          {activityDetails.description.length > 200 && (
                            <NavLink onClick={toggleDescription}>
                              {showFullDescription ? "Show less" : "Show more"}
                            </NavLink>
                          )}
                        </>
                      )}
                    </p>
                    <div className="accordion" id="accordionExample">
                      {/* // Preview For Challenge */}
                      {type === "Challenge" && (
                        <>
                          {challenge &&
                            challenge?.map((ele, index) => {
                              const isAccordionActive =
                                index === activeAccordion;
                              return (
                                <div
                                  key={index}
                                  className={
                                    index < 1
                                      ? "accordion-item border-0"
                                      : "accordion-item border-0 mt-3"
                                  }
                                >
                                  <h2
                                    className="accordion-header"
                                    id={`heading${index + 1}`}
                                  >
                                    <button
                                      className={`accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none ${
                                        isAccordionActive ? "" : "collapsed"
                                      }`}
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#collapse${index + 1}`}
                                      aria-expanded="true"
                                      aria-controls={`collapse${index + 1}`}
                                    >
                                      <div className="d-flex align-items-center">
                                        <div className="bgCheckIcon rounded-circle me-2">
                                          <i className="fa fa-light fa-check"></i>
                                        </div>
                                        <p className="mb-0 fw-bold">
                                          {type} {index + 1}
                                        </p>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id={`collapse${index + 1}`}
                                    className={`accordion-collapse collapse ${
                                      isAccordionActive ? "show" : ""
                                    }`}
                                    aria-labelledby={`heading${index + 1}`}
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="verseText d-flex">
                                        <div className="accordion-body p-0">
                                          <p className="darkGrey">
                                            {ele?.question}
                                          </p>
                                          <div className="form-check mb-1">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              value="1"
                                              name={`correctanswer${index}`}
                                              checked={
                                                ele?.correctanswer == "1"
                                              }
                                            />
                                            <label
                                              className="form-check-label greyLight"
                                              htmlFor="exampleRadios1"
                                            >
                                              {ele?.option1}
                                            </label>
                                          </div>
                                          <div className="form-check mb-1">
                                            <input
                                              className="form-check-input"
                                              name={`correctanswer${index}`}
                                              type="radio"
                                              value="2"
                                              checked={
                                                ele?.correctanswer == "2"
                                              }
                                            />
                                            <label
                                              className="form-check-label greyLight"
                                              htmlFor="exampleRadios2"
                                            >
                                              {ele?.option2}
                                            </label>
                                          </div>
                                          <div className="form-check mb-1">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name={`correctanswer${index}`}
                                              value="3"
                                              checked={
                                                ele?.correctanswer == "3"
                                              }
                                            />
                                            <label
                                              className="form-check-label greyLight"
                                              htmlFor="exampleRadios3"
                                            >
                                              {ele?.option3}
                                            </label>
                                          </div>
                                          <div className="form-check mb-1">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name={`correctanswer${index}`}
                                              value="4"
                                              checked={
                                                ele?.correctanswer == "4"
                                              }
                                            />
                                            <label
                                              className="form-check-label greyLight"
                                              htmlFor="exampleRadios4"
                                            >
                                              {ele?.option4}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}{" "}
                        </>
                      )}
                      {/* // Preview For Challenge */}
                      {type === "Quest" && (
                        <>
                          {challenge &&
                            challenge?.map((ele, index) => {
                              const isAccordionActive =
                                index === activeAccordion;
                              return (
                                <div
                                  key={index}
                                  className={
                                    index < 1
                                      ? "accordion-item border-0"
                                      : "accordion-item border-0 mt-3"
                                  }
                                >
                                  <h2
                                    className="accordion-header"
                                    id={`heading${index + 1}`}
                                  >
                                    <button
                                      className={`accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none ${
                                        isAccordionActive ? "" : "collapsed"
                                      }`}
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#collapse${index + 1}`}
                                      aria-expanded="true"
                                      aria-controls={`collapse${index + 1}`}
                                    >
                                      <div className="d-flex align-items-center">
                                        <div className="bgCheckIcon rounded-circle me-2">
                                          <i className="fa fa-light fa-check"></i>
                                        </div>
                                        <p className="mb-0 fw-bold">
                                          {type} {index + 1}
                                        </p>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id={`collapse${index + 1}`}
                                    className={`accordion-collapse collapse ${
                                      isAccordionActive ? "show" : ""
                                    }`}
                                    aria-labelledby={`heading${index + 1}`}
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="verseText d-flex">
                                        <div className="accordion-body p-0">
                                          <p className="darkGrey">
                                            {ele?.quest_title}
                                          </p>
                                          <div className="form-check mb-1">
                                            {ele?.description}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}{" "}
                        </>
                      )}
                      {/* // Preview For Poll */}
                      {type === "Poll" && (
                        // <div className="col-6">
                        //   <p className="fw-bold textBlack">
                        //     {challenge?.poll_title}
                        //   </p>
                        //   <p className="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eius tempor incididuntut labore et dolore magna aliqua">
                        //     {challenge?.description}
                        //   </p>
                        //   <div
                        //     className="progress position-relative mb-3"
                        //     style={{
                        //       height: "2rem",
                        //       borderRadius: "10px 0px 0px 10px",
                        //     }}
                        //   >
                        //     <div className="count fw-bold">
                        //       {(analyticsDetails &&
                        //         analyticsDetails?.option_1_user_count) ||
                        //         0}
                        //     </div>
                        //     <div
                        //       className="progress-bar"
                        //       role="progressbar"
                        //       style={{
                        //         width: "90",
                        //         // width:
                        //         //   (analyticsDetails &&
                        //         //     analyticsDetails?.option_1_user_count) ||
                        //         //   0,
                        //         backgroundColor: "#2C2F3A",
                        //       }}
                        //       // aria-valuenow={70}
                        //       aria-valuenow={0}
                        //       aria-valuemin={0}
                        //       aria-valuemax={100}
                        //     >
                        //       {challenge?.option1}
                        //     </div>
                        //   </div>
                        //   <div
                        //     className="progress position-relative mb-3"
                        //     style={{
                        //       height: "2rem",
                        //       borderRadius: "10px 0px 0px 10px",
                        //     }}
                        //   >
                        //     <div className="count fw-bold">
                        //       {(analyticsDetails &&
                        //         analyticsDetails?.option_2_user_count) ||
                        //         0}
                        //     </div>
                        //     <div
                        //       className="progress-bar"
                        //       role="progressbar"
                        //       style={{
                        //         // width: "90%",
                        //         width:
                        //           (analyticsDetails &&
                        //             analyticsDetails?.option_1_user_count) ||
                        //           0,
                        //         backgroundColor: "red",
                        //       }}
                        //       // aria-valuenow={30}
                        //       aria-valuenow={0}
                        //       aria-valuemin={0}
                        //       aria-valuemax={100}
                        //     >
                        //       {challenge?.option2}
                        //     </div>
                        //   </div>
                        // </div>
                        <div className="col-12 col-md-6">
                          <p className="fw-bold textBlack">
                            {challenge?.poll_title}
                          </p>
                          <p className="text-muted">{challenge?.description}</p>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold">
                                {option1UserCount}
                              </span>
                              <span className="fw-bold">
                                {challenge?.option1}
                              </span>
                            </div>
                            <ProgressBar
                              now={option1Percentage}
                              variant="dark"
                              style={{
                                height: "2rem",
                                borderRadius: "10px 0 0 10px",
                              }}
                            />
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold">
                                {option2UserCount}
                              </span>
                              <span className="fw-bold">
                                {challenge?.option2}
                              </span>
                            </div>
                            <ProgressBar
                              now={option2Percentage}
                              variant="dark"
                              style={{
                                height: "2rem",
                                borderRadius: "10px 0 0 10px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="accordion" id="accordionExample">
                      {/* <div className="accordion-item border-0">
                            <h2 className="accordion-header" id="headingOne">
                              <button
                                className="accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                <div className="d-flex align-items-center">
                                  <div className="bgCheckIcon rounded-circle me-2">
                                    <i className="fa fa-light fa-check"></i>
                                  </div>
                                  <p className="mb-0 fw-bold">Challenge 1</p>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p className="darkGrey">
                                  What is the marketing mix often referred to
                                  as?
                                </p>
                                <div className="form-check mb-1">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios1"
                                    defaultValue="option1"
                                    defaultChecked=""
                                  />
                                  <label
                                    className="form-check-label greyLight"
                                    htmlFor="exampleRadios1"
                                  >
                                    Option 1
                                  </label>
                                </div>
                                <div className="form-check mb-1">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios2"
                                    defaultValue="option2"
                                  />
                                  <label
                                    className="form-check-label greyLight"
                                    htmlFor="exampleRadios2"
                                  >
                                    Option 2
                                  </label>
                                </div>
                                <div className="form-check mb-1">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios3"
                                    defaultValue="option3"
                                  />
                                  <label
                                    className="form-check-label greyLight"
                                    htmlFor="exampleRadios3"
                                  >
                                    Option 3
                                  </label>
                                </div>
                                <div className="form-check mb-1">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios4"
                                    defaultValue="option4"
                                  />
                                  <label
                                    className="form-check-label greyLight"
                                    htmlFor="exampleRadios4"
                                  >
                                    Option 4
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div> */}
                      {/* <div className="accordion-item border-0 mt-3">
                                       <h2 className="accordion-header" id="headingTwo">
                                          <button
                                             className="accordion-button collapsed  orangrBg border-radius-2 py-2 px-3"
                                             type="button"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#collapseTwo"
                                             aria-expanded="false"
                                             aria-controls="collapseTwo"
                                          >
                                             <div className="d-flex align-items-center">
                                                <div className="bgCheckIcon rounded-circle me-2">
                                                   <i className="fa fa-light fa-check"></i>
                                                </div>
                                                <p className="mb-0 fw-bold">Quest 1</p>
                                             </div>
                                          </button>
                                       </h2>
                                       <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                       >
                                          <div className="accordion-body">
                                             <p className="darkGrey">What is the marketing mix often referred to as</p>
                                             <p className="darkGrey">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                             </p>
                                          </div>
                                       </div>
                                    </div> */}
                      {/* <div className="accordion-item border-0 mt-3">
                                       <h2 className="accordion-header" id="headingTwo">
                                          <button
                                             className="accordion-button collapsed  orangrBg border-radius-2 py-2 px-3"
                                             type="button"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#collapseThree"
                                             aria-expanded="false"
                                             aria-controls="collapseThree"
                                          >
                                             <div className="d-flex align-items-center">
                                                <div className="bgCheckIcon rounded-circle me-2">
                                                   <i className="fa fa-light fa-check"></i>
                                                </div>
                                                <p className="mb-0 fw-bold">Poll 1</p>
                                             </div>
                                          </button>
                                       </h2>
                                       <div
                                          id="collapseThree"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                       >
                                          <div className="accordion-body">
                                             <div className="row">
                                                <div className="col-6">
                                                   <p className="fw-bold textBlack">
                                                      Which of the following design tool is better?
                                                   </p>
                                                   <p className="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eius tempor incididuntut labore et dolore magna aliqua">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eius tempor
                                                      incididuntut labore et dolore magna aliqua
                                                   </p>
                                                   <div
                                                      className="progress position-relative mb-3"
                                                      style={{
                                                         height: "2rem",
                                                         borderRadius: "10px 0px 0px 10px",
                                                      }}
                                                   >
                                                      <div className="count fw-bold">70%</div>
                                                      <div
                                                         className="progress-bar"
                                                         role="progressbar"
                                                         style={{
                                                            width: "70%",
                                                            backgroundColor: "#2C2F3A",
                                                         }}
                                                         aria-valuenow={70}
                                                         aria-valuemin={0}
                                                         aria-valuemax={100}
                                                      >
                                                         Adobe XD
                                                      </div>
                                                   </div>
                                                   <div
                                                      className="progress position-relative mb-3"
                                                      style={{
                                                         height: "2rem",
                                                         borderRadius: "10px 0px 0px 10px",
                                                      }}
                                                   >
                                                      <div className="count fw-bold">30%</div>
                                                      <div
                                                         className="progress-bar"
                                                         role="progressbar"
                                                         style={{
                                                            width: "30%",
                                                            backgroundColor: "#2C2F3A",
                                                         }}
                                                         aria-valuenow={30}
                                                         aria-valuemin={0}
                                                         aria-valuemax={100}
                                                      >
                                                         Figma
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div> */}
                    </div>
                    <hr className="mt-4" />
                    <div className="row pt-2">
                      <div className="col-xl-12 mb-5">
                        <div className="pe-4">
                          <h4 className="textBlack fw-bold">
                            {type}s Analytics
                          </h4>
                          <div className="row">
                            <div className="col-4 text-center">
                              <MultiCircularProgressBar values={values} />
                              <NavLink
                                onClick={(e) => {
                                  handleClickDownloadDetails(e);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-download"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                </svg>{" "}
                                {"  "} Download Detail List
                              </NavLink>
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

export default Preview;
