/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../assets/images/cunsumerProfileImg.png";
import cunsumergallerImg from "../../../assets/images/FkUcbGSVQAAfFVc.png";
import cunsumergallerImg1 from "../../../assets/images/vsgvsgg.png";
import noProfile from "../../../assets/images/Create User.png";

// import API from "../../../../Api/Api";
// import moment from "moment";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
// import AdminRoute from '../../../Route/RouteDetails';

const ConsumerActivityProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState("");
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  //  console.log("TajurbaAdmin_priviledge_data", TajurbaAdmin_priviledge_data);
  const [loading, setLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({
    description: "",
    images: "",
    post_id: "",
  });

  useEffect(() => {
    GetDetails();
  }, [id]);

  // Api for Get User Detils
  const GetDetails = () => {
    try {
      API?.CommanApiCall({
        //   agent: "view_user_post_admin",
        agent: "feed",
        function: "view_user_post_admin",
        data: {
          user_id: parseInt(id),
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          setUserDetails(response?.data?.data?.data);
          console.log("Get user Feed details api", response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickModal = (activity) => {
    console.log("activity", activity);
    setSelectedActivity({
      ...selectedActivity,
      description: activity?.description,
      post_id: activity?.post_id,
      images: activity?.images,
    });
  };

  const handleClickDelete = () => {
    //console.log("selectedActivity?.post_id", selectedActivity?.post_id);
    setLoading(true);
    try {
      API?.CommanApiCall({
        agent: "feed",
        function: "delete_user_post_admin",
        data: {
          post_id: parseInt(selectedActivity?.post_id),
          is_deleted: true,
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log("delete activity response", response?.data?.data?.data);
          toast?.success(response?.data?.data?.message);
          setLoading(false);
          GetDetails();
          setTimeout(() => {
            window.$("#exampleModal").modal("hide");
          }, 1000);
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
          <div className="row">
            <div className="col-12">
              <div className="row d-flex align-items-center mb-3">
                <NavLink
                  // to="/feed"
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
                >
                  <div className="backArrow me-3">
                    <i className="fa fa-solid fa-chevron-left"></i>
                  </div>

                  <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                    Consumer Activity Profile
                  </h4>
                </NavLink>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-0">
                <div className="custum-orange-bgboxC"></div>
                <div className="px-5 pb-5">
                  <div className="pofileInfo">
                    <div className="row d-flex align-items-center">
                      <div className="col-5">
                        <div className="d-flex align-items-center">
                          <img
                            src={userDetails?.image || noProfile}
                            className="rounded-circle img-fluid consProfileImg"
                          />
                          <div className="consumerProfileText ms-3 mt-4">
                            <h3 className="fw-bold letter-spacing-6">
                              {userDetails?.first_name}
                            </h3>
                            {/* <p className="gray">Business Owner | @AjayKR</p> */}
                            <p className="gray">
                              {userDetails?.user_prof_role}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="row">
                          <div className="col-4 mt-3">
                            <span className="form-label">Email</span>
                            <p className="fw-bold letter-spacing-6">
                              {userDetails?.email}
                            </p>
                          </div>
                          <div className="col-4 mt-3">
                            <span className="form-label">City</span>
                            <p className="fw-bold letter-spacing-6">
                              {userDetails?.city}
                            </p>
                          </div>
                          <div className="col-4 mt-3">
                            <span className="form-label">
                              Registration Date
                            </span>
                            <p className="fw-bold letter-spacing-6">
                              {moment(userDetails?.createdAt)?.format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="borderHr" />
                  <div className="row">
                    <div className="col-12">
                      <p>Activities</p>
                      <div className="row">
                        {userDetails &&
                          userDetails?.post_data?.map((ele, index) => {
                            return (
                              <div
                                className="col-xxl-2 col-xl-3 col-4 mb-3"
                                key={index}
                              >
                                {/* <a className="me-2"> */}
                                <button
                                  type="button"
                                  className="btn p-0 border-0"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  <div
                                    class=""
                                    style={{
                                      borderRadius: "0px 0px 2px 2px",
                                    }}
                                  >
                                    <div
                                      className="position-relative"
                                      onClick={() => {
                                        handleClickModal(ele);
                                      }}
                                    >
                                      <img
                                        src={ele?.images[0]}
                                        className="galleryCustomWidth img-fluid"
                                        style={{
                                          borderRadius: "0px 0px 2px 2px",
                                        }}
                                      />
                                      <div class="centered">
                                        <div class="text-block ms-3">
                                          <i className="fas fa-regular fa-triangle-exclamation me-2"></i>
                                          {ele?.images?.length}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </button>
                                <div
                                  className="modal fade"
                                  id="exampleModal"
                                  tabIndex={-1}
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-centered bg-transparent">
                                    <div className="modal-content p-2 border-0">
                                      <div className="modal-body text-center">
                                        <img
                                          src={selectedActivity?.images[0]}
                                          className="img-fluid"
                                          style={{ height: "300px" }}
                                        />
                                        <div
                                          className="scroll__y"
                                          style={{ maxHeight: "50vh" }}
                                        >
                                          <h4 className="px-xl-5 mt-3">
                                            {selectedActivity?.description}
                                          </h4>
                                        </div>
                                      </div>
                                      <div className="modal-footer justify-content-center border-0">
                                        <div className="cancelBtn">
                                          <button
                                            disabled={loading}
                                            onClick={() => {
                                              window
                                                .$("#exampleModal")
                                                .modal("hide");
                                            }}
                                            className="btn btn-reject me-3 px-4"
                                          >
                                            <span className="">Cancel</span>
                                          </button>
                                        </div>
                                        {TajurbaAdmin_priviledge_data &&
                                        TajurbaAdmin_priviledge_data.some(
                                          (ele) =>
                                            ele.title === "Feed" &&
                                            ele.is_edit === true
                                        ) ? (
                                          <div className="saveBtn">
                                            <button
                                              disabled={loading}
                                              onClick={() => {
                                                handleClickDelete();
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
                                                Delete
                                              </span>
                                            </button>
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* </a> */}
                              </div>
                            );
                          })}
                      </div>
                      {/* <div className="galleryTable">
                                       {userDetails &&
                                          userDetails?.post_data?.map((ele, index) => {
                                             return (
                                                <a className="me-2 mb-2" key={index}>
                                                   <button
                                                      type="button"
                                                      className="btn p-0"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#exampleModal"
                                                   >
                                                      <div class="" style={{ borderRadius: "0px 0px 2px 2px" }}>
                                                         <span
                                                            className="position-relative"
                                                            onClick={() => {
                                                               handleClickModal(ele);
                                                            }}
                                                         >
                                                            <img
                                                               src={ele?.images[0]}
                                                               className="galleryCustomWidth"
                                                               style={{
                                                                  borderRadius: "0px 0px 2px 2px",
                                                               }}
                                                            />
                                                            <div class="centered">
                                                               <div class="text-block ms-3">
                                                                  <i className="fas fa-regular fa-triangle-exclamation me-2"></i>
                                                                  {ele?.images?.length}
                                                               </div>
                                                            </div>
                                                         </span>
                                                      </div>
                                                   </button>

                                                   <div
                                                      className="modal fade"
                                                      id="exampleModal"
                                                      tabIndex={-1}
                                                      aria-labelledby="exampleModalLabel"
                                                      aria-hidden="true"
                                                   >
                                                      <div className="modal-dialog modal-dialog-centered bg-transparent">
                                                         <div className="modal-content p-2 border-0">
                                                            <div className="modal-body text-center">
                                                               <img
                                                                  src={selectedActivity?.images[0]}
                                                                  className="img-fluid"
                                                                  style={{ height: "300px" }}
                                                               />
                                                               <h4 className="px-xl-5 mt-3">{selectedActivity?.description}</h4>
                                                            </div>
                                                            <div className="modal-footer justify-content-center border-0">
                                                               <div className="cancelBtn">
                                                                  <button
                                                                     disabled={loading}
                                                                     onClick={() => {
                                                                        window.$("#exampleModal").modal("hide");
                                                                     }}
                                                                     className="btn btn-reject me-3 px-4"
                                                                  >
                                                                     <span className="">Cancel</span>
                                                                  </button>
                                                               </div>
                                                               <div className="saveBtn">
                                                                  <button
                                                                     disabled={loading}
                                                                     onClick={() => {
                                                                        handleClickDelete();
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
                                                                        Delete
                                                                     </span>
                                                                  </button>
                                                               </div>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </a>
                                             );
                                          })}
                                    </div> */}
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

export default ConsumerActivityProfile;
