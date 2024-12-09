/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import { useSelector } from "react-redux";
import API from "../../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import AdminRoute from "../../../../Route/RouteDetails";
import moment from "moment";

export default function CreateNewActivity() {
  const navigate = useNavigate();
  // console.log("activityDetails", activityDetails);
  const { type, id } = useParams();
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  // console.log(type, id);

  const initialValues = {
    community_id: "",
    content_type: "",
    content_title: "",
    description: "",
    start_date: "",
    end_date: "",
    provided_timer: "",
  };
  const [formValues, setFormValues] = useState();
  const [community_id, setCommunity_id] = useState("");

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

  const [ChallengeIndex, setChallengeIndex] = useState(0);
  const [challengeFieldErrors, setChallengeFieldErrors] = useState([]);
  const [challengeLoading, setChallengeLoading] = useState(false);

  const [previewMode, setPreviewMode] = useState(false);
  const allChallengeHaveId =
    type !== "Poll"
      ? challenge?.every((chall) => chall?._id !== "")
      : challenge?._id !== "";

  const [activityDetails, setActivityDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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
        setFormValues((prevDetails) => ({
          ...prevDetails,
          content_title: response?.data?.data?.data?.content_title,
          provided_timer: response?.data?.data?.data?.provided_timer,
          end_date: response?.data?.data?.data?.end_date,
          start_date: response?.data?.data?.data?.start_date,
          community_id: response?.data?.data?.data?.community_id,
          content_type: response?.data?.data?.data?.community_id,
          description: response?.data?.data?.data?.description,
        }));
        // setcommunityId(response?.data?.data?.data?.community?.community_id);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // Api for Get Challenge Details
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

  const addChallenge = (e) => {
    e.preventDefault();
    if (type === "Challenge") {
      if (allChallengeHaveId) {
        const newChallenge = {
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
        };
        const updatedChallenge = [...challenge, newChallenge];
        setChallenge(updatedChallenge);

        //// if you want to  switch newly created assement

        // Set the AssessmentIndex to the index of the new assessment
        const newIndex = updatedChallenge.length - 1;
        setChallengeIndex(newIndex);
      } else {
        window.$("#SaveAssesmentWarning").modal("show");
      }
    } else if (type === "Quest") {
      if (allChallengeHaveId) {
        const newChallenge = {
          quest_title: "",
          description: "",
          community_id: community_id,
          activity_id: id,
          is_deleted: false,
          _id: "",
          type: type,
          activityType_id: null,
        };
        const updatedChallenge = [...challenge, newChallenge];
        setChallenge(updatedChallenge);

        //// if you want to  switch newly created assement

        // Set the AssessmentIndex to the index of the new assessment
        const newIndex = updatedChallenge.length - 1;
        setChallengeIndex(newIndex);
      } else {
        window.$("#SaveAssesmentWarning").modal("show");
      }
    } else if (type === "Poll") {
      console.log("Poll Add challengw");
    }
  };

  const handleChangeChallengeContent = (field, value) => {
    if (type !== "Poll") {
      const updatedChallenge = [...challenge];
      const currentChallenge = { ...updatedChallenge[ChallengeIndex] };
      currentChallenge[field] = value;
      updatedChallenge[ChallengeIndex] = currentChallenge;
      setChallenge(updatedChallenge);
    } else {
      setChallenge({ ...challenge, [field]: value });
    }
  };

  const handleClickChallenge = (event, index) => {
    event.preventDefault();
    setChallengeIndex(index);
    // You can now access the current assessment using assessment[index]
    const currentChallenge = challenge[index];
    // Example: Set some default values for the clicked assessment
    const updatedChallenge = {
      ...currentChallenge,
    };
    // Update the state with the modified assessment
    const newChallengeArray = [...challenge];
    newChallengeArray[index] = updatedChallenge;
    setChallenge(newChallengeArray);
  };

  // Function for delete the challenge
  const handleDeleteChallenge = (e, index, challenge_id) => {
    e.preventDefault();

    const updatedChallenge = [...challenge];

    if (challenge_id) {
      updatedChallenge[index].is_deleted = true;
      try {
        API?.CommanApiCall({
          data: {
            type: type,
            [type]: updatedChallenge[index],
          },
          agent: "activity",
          function: "saveactivity_details",
        }).then((response) => {
          // console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            //toast.success(response?.data?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
      }

      updatedChallenge.splice(index, 1);
      setChallenge(updatedChallenge);
      const previousIndex = Math.max(0, index - 1); // Ensure it doesn't go below 0
      setChallengeIndex(previousIndex);
    } else {
      updatedChallenge.splice(index, 1);
      setChallenge(updatedChallenge);
      const previousIndex = Math.max(0, index - 1); // Ensure it doesn't go below 0
      setChallengeIndex(previousIndex);
    }
  };

  // Function for Save Challenge

  const handleClickSaveChallenge = (e) => {
    e.preventDefault();

    // Validate the current assessment values
    const currentChallenge =
      type !== "Poll" ? challenge[ChallengeIndex] : challenge;
    const errors = validateChallengeValues(currentChallenge);
    console.log(community_id);

    // If there are errors, update the errors state
    if (Object.keys(errors).length > 0) {
      if (type !== "Poll") {
        setChallengeFieldErrors({
          ...challengeFieldErrors,
          [ChallengeIndex]: errors,
        });
      } else {
        setChallengeFieldErrors(errors);
        // setChallengeFieldErrors({
        //   ...challengeFieldErrors,
        //   errors,
        // });
      }
    } else {
      // If no errors, clear the errors for the current index
      setChallengeLoading(true);
      const updatedErrors = { ...challengeFieldErrors };
      delete updatedErrors[ChallengeIndex];
      setChallengeFieldErrors(updatedErrors);
      console.log("Challenge", currentChallenge);

      try {
        API?.CommanApiCall({
          data: {
            type: type,
            [type]: currentChallenge,
          },
          agent: "activity",
          function: "saveactivity_details",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            setChallengeLoading(false);

            // Update assessment object at specific index
            if (type !== "Poll") {
              const updatedChallenge = [...challenge]; // Create a new array
              updatedChallenge[ChallengeIndex] = {
                ...updatedChallenge[ChallengeIndex], // Copy the existing object
                _id: response?.data?.data?.data?._id,
                activityType_id: response?.data?.data?.data?.activityType_id,
              };
              setChallenge((prevAssessment) => updatedChallenge);
            } else {
              setChallenge({
                ...challenge,
                _id: response?.data?.data?.data?._id,
                activityType_id: response?.data?.data?.data?.activityType_id,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateChallengeValues = (values) => {
    console.log("currentChallenge", challenge);
    console.log(values, "value");
    const errors = {};
    if (type === "Challenge") {
      if (!values.question) {
        errors.question = "Please enter question";
      } else if (values.question.trim() === "") {
        errors.question = "Question can not be blank";
      }
      if (!values.option1) {
        errors.option1 = "Please enter option 1";
      } else if (values.option1.trim() === "") {
        errors.option1 = "Option 1 can not be blank";
      }
      if (!values.option2) {
        errors.option2 = "Please enter option 2";
      } else if (values.option2.trim() === "") {
        errors.option2 = "Option 2 can not be blank";
      }
      if (!values.option3) {
        errors.option3 = "Please enter option 3";
      } else if (values.option3.trim() === "") {
        errors.option3 = "Option 3 can not be blank";
      }
      if (!values.option4) {
        errors.option4 = "Please enter option 4";
      } else if (values.option4.trim() === "") {
        errors.option4 = "Option 4 can not be blank";
      }
      if (!values.correctanswer) {
        errors.correctanswer = "Please select correct answer";
      }
    } else if (type === "Quest") {
      if (!values.quest_title) {
        errors.quest_title = "Please enter title";
      } else if (values.quest_title.trim() === "") {
        errors.quest_title = "Title can not be blank";
      }
      if (!values.description) {
        errors.description = "Please enter description";
      } else if (values.description.trim() === "") {
        errors.description = "Description can not be blank";
      }
    } else if (type === "Poll") {
      if (!values.poll_title) {
        errors.poll_title = "Please enter title";
      } else if (values.poll_title.trim() === "") {
        errors.poll_title = "Title can not be blank";
      }
      if (!values.description) {
        errors.description = "Please enter description";
      } else if (values.description.trim() === "") {
        errors.description = "Description can not be blank";
      }
      if (!values.option1) {
        errors.option1 = "Please enter option 1";
      } else if (values.option1.trim() === "") {
        errors.option1 = "Option 1 can not be blank";
      }
      if (!values.option2) {
        errors.option2 = "Please enter option 2";
      } else if (values.option2.trim() === "") {
        errors.option2 = "Option 2 can not be blank";
      }
    }

    console.log("Erroes", errors);
    return errors;
  };

  // Function For Close  Add Assessment Warning the Modal
  const onClickOkayChallengeModal = (e) => {
    e.preventDefault();
    window.$("#SaveAssesmentWarning").modal("hide");
  };

  // Function for preview mode
  const handleClickPreview = () => {
    const hasId =
      type !== "Poll"
        ? challenge.some((challengeItem) => challengeItem._id)
        : challenge?._id;
    if (hasId) {
      setPreviewMode(true);
    } else {
      toast.warning(
        type !== "Poll"
          ? `Atleast one ${type} need to save`
          : `Save ${type}  for preview`
      );
    }
  };

  const handleClickSubmit = () => {
    // SetErrorMessage("");
    setLoading(true);
    try {
      API?.CommanApiCall({
        agent: "activity",
        data: {
          activity_status: "Published",
          activity_id: parseInt(id),
        },
      }).then((response) => {
        console.log(response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          toast.success(response?.data?.data?.message);
          setTimeout(() => {
            setLoading(false);
            // dispatch(activityDetails(response?.data?.data?.data));

            navigate(
              `/${AdminRoute?.Community?.ActivityManagement?.ActivityManagement}`
            );
          }, 1000);
        } else if (response?.data?.data?.status === 201) {
          // SetErrorMessage(response?.data?.data?.message);

          setTimeout(() => {
            // SetErrorMessage("");
          }, 5000);
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
                      {activityDetails && activityDetails?.provided_timer} Sec
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
                    )?.format("DD-MM-YYYY")}
                    <span className="mx-2 font-size-10">to</span>
                    <span className="font-size-10">
                      {moment(
                        activityDetails && activityDetails?.end_date
                      )?.format("DD-MM-YYYY")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      className="ms-2"
                    >
                      <g
                        id="Group_17126"
                        data-name="Group 17126"
                        transform="translate(-1805 -135)"
                      >
                        <rect
                          id="Rectangle_6668"
                          data-name="Rectangle 6668"
                          width="40"
                          height="40"
                          rx="20"
                          transform="translate(1805 135)"
                          fill="#2d3450"
                        />
                        <g
                          id="Group_17125"
                          data-name="Group 17125"
                          transform="translate(247 -247)"
                        >
                          <path
                            id="Path_11169"
                            data-name="Path 11169"
                            d="M10.388,6H4.642A1.642,1.642,0,0,0,3,7.642V19.135a1.642,1.642,0,0,0,1.642,1.642H16.135a1.642,1.642,0,0,0,1.642-1.642V13.388"
                            transform="translate(1567 389.223)"
                            fill="none"
                            stroke="#fff"
                          />
                          <path
                            id="Path_11170"
                            data-name="Path 11170"
                            d="M19.909,3.286a1.6,1.6,0,0,1,2.26,2.26L15.013,12.7,12,13.455l.753-3.013Z"
                            transform="translate(1563.363 391.182)"
                            fill="none"
                            stroke="#fff"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                </h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                onClick={() => {
                  if (!previewMode) {
                    navigate(-1);
                  } else {
                    setPreviewMode(false);
                  }
                }}
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  {!previewMode ? `Create ${type}` : "Preview"}
                </h4>
              </NavLink>
            </div>

            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
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
                  <div className="saveBtn">
                    <NavLink
                      disabled={loading}
                      onClick={() => {
                        if (!previewMode) {
                          handleClickPreview();
                        } else {
                          handleClickSubmit();
                        }
                      }}
                      className="btn bgBlack text-white border-radius-2 px-4 float-end"
                    >
                      <span className="">
                        {loading && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {!previewMode ? "Preview" : "Submit"}
                      </span>
                    </NavLink>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* whole div for shoprofileImgw details */}
          {!previewMode ? (
            <div className="row">
              {type !== "Poll" ? (
                <>
                  <div className="col-3">
                    <div className="main-card bg-white">
                      <div className="scroll__y ">
                        <div className="slide">
                          {challenge &&
                            challenge?.map((ele, index) => {
                              return (
                                <ul key={index} className="mb-0 ps-0">
                                  <li>
                                    <div className="row d-flex align-items-center mb-2">
                                      <div className="col-11">
                                        <button
                                          onClick={(event) =>
                                            handleClickChallenge(event, index)
                                          }
                                          className="btn rouded-0 btn-main-light-orange w-100 text-center py-2"
                                        >
                                          <span>
                                            {type} {index + 1}
                                          </span>
                                        </button>
                                      </div>
                                      <div className="col-1 g-0">
                                        {challenge?.length > 1 ? (
                                          <div className="col-1 g-0">
                                            <div className="dropdown">
                                              <button
                                                type="button"
                                                className="btn dropdown-toggle p-0 dayFilter h-auto w-auto"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <i className="fas fa-ellipsis-vertical defaultGrey"></i>
                                              </button>
                                              <ul className="dropdown-menu dropdown-menu-end">
                                                <li
                                                  onClick={(e) => {
                                                    handleDeleteChallenge(
                                                      e,
                                                      index,
                                                      ele?.activityType_id
                                                    );
                                                  }}
                                                >
                                                  <a className="dropdown-item font-size-12">
                                                    Delete
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        ) : null}

                                        {/* Modal */}
                                        <div
                                          className="modal fade"
                                          id="exampleModal12"
                                          tabIndex={-1}
                                          aria-labelledby="exampleModalLabel"
                                          aria-hidden="true"
                                        >
                                          <div className="modal-dialog modal-dialog-centered bg-transparent">
                                            <div className="modal-content border_top p-5  border-0">
                                              <div className="modal-body text-start text-center">
                                                <h3 className="textGrey fw-bold">
                                                  You need to have at least 1
                                                  Assessment in the course
                                                </h3>
                                                <button
                                                  className="btn bgBlack text-white border-radius-5 px-4 mt-3"
                                                  type="submit"
                                                >
                                                  <span>Okay</span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              );
                            })}
                        </div>
                      </div>

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
                        <div className="parent-container">
                          <NavLink
                            onClick={(e) => {
                              addChallenge(e);
                            }}
                            className="btn bgOrange text-white px-4 w-100 mb-2"
                          >
                            <span className="">+ &nbsp; New {type}</span>
                          </NavLink>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="main-card bg-white h-100">
                      <div className="row">
                        <div className="col-9 mb-0 shadow-none">
                          <h3 className="textBlack fw-bold letter-spacing-4">
                            {type} {ChallengeIndex + 1}
                          </h3>
                        </div>
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
                          <div className="col-3 text-end">
                            <button
                              onClick={(e) => {
                                handleClickSaveChallenge(e);
                              }}
                              className="btn  bgSave text-white border-radius-2 px-3 mt-2 me-2"
                              disabled={challengeLoading}
                            >
                              {/* <i className="fa fa-light fa-check me-1"></i>{" "} */}
                              <span>
                                {challengeLoading && (
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                )}
                                Save
                              </span>
                            </button>
                          </div>
                        ) : null}
                      </div>
                      {type === "Challenge" ? (
                        <>
                          <div className="row">
                            <div className="col-10">
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Enter Question
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ask Question..."
                                    id="Title"
                                    name="question"
                                    value={challenge[ChallengeIndex]?.question}
                                    onChange={(e) =>
                                      handleChangeChallengeContent(
                                        "question",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.question
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6">
                              {/* content title */}

                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">Option 1</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Option 1"
                                    id="Title"
                                    name="option1"
                                    value={challenge[ChallengeIndex]?.option1}
                                    onChange={(e) =>
                                      handleChangeChallengeContent(
                                        "option1",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.option1
                                  }
                                </div>
                              </div>

                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">Option 2</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Option 2"
                                    name="option2"
                                    value={challenge[ChallengeIndex]?.option2}
                                    onChange={(e) =>
                                      handleChangeChallengeContent(
                                        "option2",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.option2
                                  }
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">Option 3</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Option 3"
                                    id="Title"
                                    name="option3"
                                    value={challenge[ChallengeIndex]?.option3}
                                    onChange={(e) =>
                                      handleChangeChallengeContent(
                                        "option3",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.option3
                                  }
                                </div>
                              </div>

                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">Option 4</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Option 4"
                                    name="option4"
                                    value={challenge[ChallengeIndex]?.option4}
                                    onChange={(e) =>
                                      handleChangeChallengeContent(
                                        "option4",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.option4
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12">
                              <label className="form-label">
                                <span className="mandatory-star me-1">*</span>
                                Choose the correct answer
                              </label>
                              <div className="ms-2">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="correctanswer"
                                    checked={
                                      challenge[ChallengeIndex]
                                        ?.correctanswer == "1"
                                    }
                                    value="1"
                                    onClick={(e) =>
                                      handleChangeChallengeContent(
                                        "correctanswer",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio1"
                                  >
                                    Option 1
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="correctanswer"
                                    value="2"
                                    checked={
                                      challenge[ChallengeIndex]
                                        ?.correctanswer == "2"
                                    }
                                    onClick={(e) =>
                                      handleChangeChallengeContent(
                                        "correctanswer",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio2"
                                  >
                                    Option 2
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="correctanswer"
                                    value="3"
                                    checked={
                                      challenge[ChallengeIndex]
                                        ?.correctanswer == "3"
                                    }
                                    onClick={(e) =>
                                      handleChangeChallengeContent(
                                        "correctanswer",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio3"
                                  >
                                    Option 3
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="correctanswer"
                                    value="4"
                                    checked={
                                      challenge[ChallengeIndex]
                                        ?.correctanswer == "4"
                                    }
                                    onClick={(e) =>
                                      handleChangeChallengeContent(
                                        "correctanswer",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio4"
                                  >
                                    Option 4
                                  </label>
                                </div>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.correctanswer
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-12">
                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">
                                  <span className="mandatory-star me-1">*</span>
                                  Enter title of the task
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Title"
                                  id="Title"
                                  name="quest_title"
                                  value={challenge[ChallengeIndex]?.quest_title}
                                  onChange={(e) =>
                                    handleChangeChallengeContent(
                                      "quest_title",
                                      e.target.value
                                    )
                                  }
                                />
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.quest_title
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">
                                  <span className="mandatory-star me-1">*</span>
                                  Describe the task in detail
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  placeholder="Use max 100 words to describe this task....."
                                  maxLength={100}
                                  rows="4"
                                  name="description"
                                  value={challenge[ChallengeIndex]?.description}
                                  onChange={(e) =>
                                    handleChangeChallengeContent(
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  spellcheck="false"
                                ></textarea>
                                <div className="text-danger">
                                  {
                                    challengeFieldErrors[ChallengeIndex]
                                      ?.description
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div
                        className="modal fade"
                        id="SaveAssesmentWarning"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content p-5 border-radius-5 border-top-model-black">
                            <div className="modal-body text-center">
                              <h3 className="fw-bold">
                                To add new {type} you need to save {type + " "}
                                first.
                              </h3>
                              <div className="col-12 d-flex justify-content-center mt-4">
                                <div className="saveBtn">
                                  <button
                                    onClick={(e) => {
                                      onClickOkayChallengeModal(e);
                                    }}
                                    className="btn bgBlack text-white px-4"
                                  >
                                    <span className="">Okay</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </>
              ) : (
                <div className="row">
                  <div className="col-12">
                    <div className="main-card bg-white h-100">
                      <div className="row mb-3">
                        <div className="col-9 mb-0 shadow-none">
                          <h3 className="textBlack fw-bold letter-spacing-4">
                            {type}
                          </h3>
                        </div>
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
                          <div className="col-3 text-end">
                            <button
                              onClick={(e) => {
                                handleClickSaveChallenge(e);
                              }}
                              className="btn  bgSave text-white border-radius-2 px-3 mt-2 me-2"
                              disabled={challengeLoading}
                            >
                              {/* <i className="fa fa-light fa-check me-1"></i>{" "} */}
                              <span>
                                {challengeLoading && (
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                )}
                                Save
                              </span>
                            </button>
                          </div>
                        ) : null}
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-3">
                            <div className="col-12">
                              <label className="form-label">
                                <span className="mandatory-star me-1">*</span>
                                Enter Poll Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                id="Title"
                                name="poll_title"
                                value={challenge?.poll_title}
                                onChange={(e) =>
                                  handleChangeChallengeContent(
                                    "poll_title",
                                    e.target.value
                                  )
                                }
                              />
                              <div className="text-danger">
                                {challengeFieldErrors?.poll_title}
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12">
                              <label className="form-label">
                                <span className="mandatory-star me-1">*</span>
                                Enter Description
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter Description"
                                rows="4"
                                name="description"
                                value={challenge?.description}
                                onChange={(e) =>
                                  handleChangeChallengeContent(
                                    "description",
                                    e.target.value
                                  )
                                }
                                spellcheck="false"
                              ></textarea>
                              <div className="text-danger">
                                {challengeFieldErrors?.description}
                              </div>
                            </div>
                          </div>
                          <div class="row mb-3">
                            <div class="col-5">
                              <label class="form-label">Option 1</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Option 1"
                                name="option1"
                                value={challenge?.option1}
                                onChange={(e) =>
                                  handleChangeChallengeContent(
                                    "option1",
                                    e.target.value
                                  )
                                }
                              />
                              <div className="text-danger">
                                {challengeFieldErrors?.option1}
                              </div>
                            </div>
                            <div class="col-5">
                              <label class="form-label">Option 2</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Option 2"
                                name="option2"
                                value={challenge?.option2}
                                onChange={(e) =>
                                  handleChangeChallengeContent(
                                    "option2",
                                    e.target.value
                                  )
                                }
                              />
                              <div className="text-danger">
                                {challengeFieldErrors?.option2}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
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
                        {showFullDescription
                          ? activityDetails?.description
                          : activityDetails?.description.slice(0, 200)}{" "}
                        {activityDetails?.description.length > 200 && (
                          <NavLink onClick={toggleDescription}>
                            {showFullDescription ? "Show less" : "Show more"}
                          </NavLink>
                        )}
                      </p>
                      {/* <p className="textBlack">
                          {activityDetails && activityDetails?.description}
                        </p> */}
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
                                          <div className="accordion-body">
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
                                          <div className="accordion-body">
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
                          <div className="col-6">
                            <p className="fw-bold textBlack">
                              {challenge?.poll_title}
                            </p>
                            <p className="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eius tempor incididuntut labore et dolore magna aliqua">
                              {challenge?.description}
                            </p>
                            <div
                              className="progress position-relative mb-3"
                              style={{
                                height: "2rem",
                                borderRadius: "10px 0px 0px 10px",
                              }}
                            >
                              <div className="count fw-bold">0%</div>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: "90%",
                                  backgroundColor: "#2C2F3A",
                                }}
                                // aria-valuenow={70}
                                aria-valuenow={0}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                {challenge?.option1}
                              </div>
                            </div>
                            <div
                              className="progress position-relative mb-3"
                              style={{
                                height: "2rem",
                                borderRadius: "10px 0px 0px 10px",
                              }}
                            >
                              <div className="count fw-bold">0%</div>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: "90%",
                                  backgroundColor: "#2C2F3A",
                                }}
                                // aria-valuenow={30}
                                aria-valuenow={0}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                {challenge?.option2}
                              </div>
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
                                <p className="darkGrey">
                                  What is the marketing mix often referred to as
                                </p>
                                <p className="darkGrey">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.
                                </p>
                              </div>
                            </div>
                          </div>*/}
                        {/*   <div className="accordion-item border-0 mt-3">
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
                                      Which of the following design tool is
                                      better?
                                    </p>
                                    <p className="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eius tempor incididuntut labore et dolore magna aliqua">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed d eius tempor
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
}
