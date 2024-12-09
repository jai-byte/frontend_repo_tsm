/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
// import bookTitle from "../../../assets/images/Notific.png";
import HeaderContent from "../../Common/HeaderContent";
// import TimeLine from "../../Common/TimeLine";
import PreviewDetails from "../../Common/PreviewDetails";
import AdminRoute from "../../../Route/RouteDetails";
import { useSelector } from "react-redux";
import API from "../../../Api/Api";
import moment from "moment";
import noProfile from "../../../assets/images/Create User.png";

const Pending = () => {
  const { id } = useParams();
  const courseDetails = useSelector((state) => state.counter.courseDetails);
  //console.log("courseDetails", courseDetails);

  const [timlineData, setTimelineData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [supportData, setSupportData] = useState([]);

  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  useEffect(() => {
    getTimeLine();
    getFeedBackAndSupport();
  }, []);
  const getTimeLine = async () => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          flag: "Published",
        },
        function: "courseTimeLine",
        agent: "course",
      }).then((response) => {
        // console.log("TimeLine Data", response?.data?.data?.data);
        setTimelineData(response?.data?.data?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFeedBackAndSupport = async () => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          // flag: "Published",
          page_no: 1,
          limit: 10,
          filter: null,
        },
        function: "get_list_for_admin",
        agent: "feedback",
      }).then((response) => {
        console.log("getFeedBackAndSupport Data", response?.data?.data);
        setFeedbackData(response?.data?.data?.feedback_record);
        setSupportData(response?.data?.data?.support_record);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const StarRating = ({ user_rating }) => {
    const totalStars = 5;
    const filledStars = Math.floor(user_rating || 0);
    const emptyStars = totalStars - filledStars;

    return (
      <div>
        {Array.from({ length: filledStars }, (_, index) => (
          <i key={index} className="fa fa-solid fa-star consumerCard me-1"></i>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <i
            key={index + filledStars}
            className="fa fa-solid fa-star lightGrey me-1"
          ></i>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <HeaderContent
              id={id}
              status="Published"
              headerApiStatus="Approved"
            />
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-3">
            <div className="col-6 d-flex align-items-center">
              <NavLink
                to="/submitted"
                state={{
                  creator_previousTab: "Published",
                }}
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                {/* <h4
                    className="headText ms-2 mt-2 mb-2 fw-bold 
                w-auto textBlack"
                  >
                    Pending
                  </h4> */}
                <h4
                  className="headText ms-2 mt-2 mb-2 fw-bold 
                w-auto textBlack"
                >
                  Published
                </h4>
              </NavLink>
            </div>
            <div className="col-6">
              {TajurbaAdmin_priviledge_data &&
              TajurbaAdmin_priviledge_data.some(
                (ele) =>
                  ele.title === "Content Creation" &&
                  ele.is_active === true &&
                  ele?.submenu &&
                  ele?.submenu.some(
                    (sub) =>
                      sub.title === "Creator" &&
                      sub.is_active === true &&
                      sub?.submenuChild.some(
                        (subMenuChild) =>
                          subMenuChild.title === "Submitted" &&
                          subMenuChild.is_active === true &&
                          subMenuChild.is_edit === true
                      )
                  )
              ) ? (
                <div className="saveBtn">
                  <NavLink
                    className="btn bgBlack text-white border-radius-5 px-4 float-end"
                    to={`../${AdminRoute?.ContentCreation?.CreateContent.replace(
                      "/:id",
                      ""
                    )}/${courseDetails?.courseedition_id}`}
                  >
                    <span>Update Content</span>
                  </NavLink>
                </div>
              ) : null}
            </div>
          </div>
          <div className="row h-100">
            <PreviewDetails id={id} flagForChapter="Published" />
            {/* <TimeLine /> */}
            <div className="col-3">
              <div className="main-card bg-white p-3" id="list">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button
                        className="accordion-button fw-bold collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Timeline
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul className="sessions mt-0">
                          {timlineData &&
                            timlineData?.map((ele, index) => {
                              return (
                                <li key={index} className="bgtimeline">
                                  <div className="row ">
                                    <span className="fw-bold textBlack">
                                      {ele?.action}
                                    </span>
                                    <small className="greyLight">
                                      {moment(ele?.createdAt).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </small>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button
                        className="accordion-button fw-bold collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Support
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {supportData &&
                          supportData?.map((ele, index) => {
                            return (
                              <div key={index}>
                                <div className="d-flex">
                                  <img
                                    src={ele?.user_data?.image || noProfile}
                                    className="img-fluid bookTitle me-2 rounded-circle"
                                  ></img>
                                  <div>
                                    <p className="mb-0">
                                      {ele?.user_data?.first_name}
                                    </p>
                                    <small>
                                      {ele?.user_data?.user_prof_role} |{" "}
                                      {ele?.user_data?.email}
                                    </small>
                                  </div>
                                </div>
                                <p className="mt-2">{ele?.description}</p>
                              </div>
                            );
                          })}
                        {/* <div>
                          <div className="d-flex">
                            <img
                              src={bookTitle}
                              className="img-fluid bookTitle me-2 rounded-circle"
                            ></img>
                            <div>
                              <p className="mb-0">Neeta Malik</p>
                              <small>
                                Business Owner | NeetaMalik@gmail.com
                              </small>
                            </div>
                          </div>
                          <p className="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla placerat eu diam at egestas. Cras
                            placerat efficitur suscipit. Suspendisse in dolor
                            non eros eleifend venenatis in ut ex. Aliquam ac
                            consectetur lectus.
                          </p>
                        </div> */}
                        {/* <div>
                          <div className="d-flex">
                            <img
                              src={bookTitle}
                              className="img-fluid bookTitle me-2 rounded-circle"
                            ></img>
                            <div>
                              <p className="mb-0">Neeta Malik</p>
                              <small>
                                Business Owner | NeetaMalik@gmail.com
                              </small>
                            </div>
                          </div>
                          <p className="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla placerat eu diam at egestas. Cras
                            placerat efficitur suscipit. Suspendisse in dolor
                            non eros eleifend venenatis in ut ex. Aliquam ac
                            consectetur lectus.
                          </p>
                        </div> */}
                        {/* <div>
                          <div className="d-flex">
                            <img
                              src={bookTitle}
                              className="img-fluid bookTitle me-2 rounded-circle"
                            ></img>
                            <div>
                              <p className="mb-0">Neeta Malik</p>
                              <small>
                                Business Owner | NeetaMalik@gmail.com
                              </small>
                            </div>
                          </div>
                          <p className="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla placerat eu diam at egestas. Cras
                            placerat efficitur suscipit. Suspendisse in dolor
                            non eros eleifend venenatis in ut ex. Aliquam ac
                            consectetur lectus.
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button
                        className="accordion-button fw-bold collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        Feedback
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {feedbackData &&
                          feedbackData?.map((ele, index) => {
                            return (
                              <div key={index} className="mb-4">
                                <div className="d-flex">
                                  <img
                                    src={ele?.user_data?.image || noProfile}
                                    className="img-fluid bookTitle me-2 rounded-circle"
                                  ></img>
                                  <div>
                                    <p className="mb-0">
                                      {ele?.user_data?.first_name}
                                    </p>
                                    <small>
                                      {ele?.user_data?.user_prof_role} |{" "}
                                      {ele?.user_data?.email}
                                    </small>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center my-2">
                                  <span className="fw-bold mb-0 me-2 mt-1"></span>

                                  {/* <i className="fa fa-solid fa-star consumerCard me-1"></i>
                                  <i className="fa fa-solid fa-star consumerCard me-1"></i>
                                  <i className="fa fa-solid fa-star consumerCard me-1"></i>
                                  <i className="fa fa-solid fa-star consumerCard me-1"></i>
                                  <i className="fa fa-solid fa-star lightGrey me-1"></i> */}

                                  <StarRating user_rating={ele?.user_rating} />
                                </div>
                                <p>{ele?.description}</p>
                              </div>
                            );
                          })}
                        {/* <div className="mb-4">
                          <div className="d-flex">
                            <img
                              src={bookTitle}
                              className="img-fluid bookTitle me-2 rounded-circle"
                            ></img>
                            <div>
                              <p className="mb-0">Neeta Malik</p>
                              <small>
                                Business Owner | NeetaMalik@gmail.com
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center my-2">
                            <span className="fw-bold mb-0 me-2 mt-1">4.0</span>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star lightGrey me-1"></i>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla placerat eu diam at egestas. Cras
                            placerat efficitur suscipit. Suspendisse in dolor
                            non eros eleifend venenatis in ut ex. Aliquam ac
                            consectetur lectus.
                          </p>
                        </div> */}
                        {/* <div className="mb-4">
                          <div className="d-flex">
                            <img
                              src={bookTitle}
                              className="img-fluid bookTitle me-2 rounded-circle"
                            ></img>
                            <div>
                              <p className="mb-0">Neeta Malik</p>
                              <small>
                                Business Owner | NeetaMalik@gmail.com
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center my-2">
                            <span className="fw-bold mb-0 me-2 mt-1">4.0</span>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star lightGrey me-1"></i>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla placerat eu diam at egestas. Cras
                            placerat efficitur suscipit. Suspendisse in dolor
                            non eros eleifend venenatis in ut ex. Aliquam ac
                            consectetur lectus.
                          </p>
                        </div> */}
                        {/* <div className="mb-4">
                          <div className="d-flex">
                            <img
                              src={bookTitle}
                              className="img-fluid bookTitle me-2 rounded-circle"
                            ></img>
                            <div>
                              <p className="mb-0">Neeta Malik</p>
                              <small>
                                Business Owner | NeetaMalik@gmail.com
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center my-2">
                            <span className="fw-bold mb-0 me-2 mt-1">4.0</span>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star consumerCard me-1"></i>
                            <i className="fa fa-solid fa-star lightGrey me-1"></i>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla placerat eu diam at egestas. Cras
                            placerat efficitur suscipit. Suspendisse in dolor
                            non eros eleifend venenatis in ut ex. Aliquam ac
                            consectetur lectus.
                          </p>
                        </div> */}
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

export default Pending;
