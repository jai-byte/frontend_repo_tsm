/* eslint-disable */
import React, { useState, useEffect } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
//import bookTitle from "../../../../assets/images/Notific.png";
import HeaderContent from "../../../Common/HeaderContent";
import PreviewDetails from "../../../Common/PreviewDetails";
import TimeLine from "../../../Common/TimeLine";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import API from "../../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
// import { courseDetails } from "../../../../Redux/slice";

//import AdminRoute from "../../../../Route/RouteDetails";

const ModeratorApproved = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const courseDetails = useSelector((state) => state.counter.courseDetails);

  // console.log("course details from Redux", courseDetails);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  // functionality for active deactive content
  const [isChecked, setIsChecked] = useState();

  useEffect(() => {
    setIsChecked(courseDetails?.is_active);
  }, [courseDetails]);

  const handleToggle = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    console.log(newIsChecked);
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          status: 4,
          flag: "moderator",
          is_active: newIsChecked,
        },

        agent: "course",
        function: "updateCourseStatus",
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          //console.log("active inactive response ", response?.data?.data?.data);
          const updatedCourseDetails = {
            ...courseDetails,
            is_active: newIsChecked,
          };
          if (newIsChecked === true) {
            toast.success("Course active successfully", {
              autoClose: 2000,
              closeOnClick: true,
            });
          } else {
            toast.warning("Course Inactive successfully", {
              autoClose: 2000,
              closeOnClick: true,
            });
          }

          //dispatch(courseDetails(updatedCourseDetails));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   //console.log(isChecked);
  //   try {
  //     API?.CommanApiCall({
  //       data: {
  //         course_id: parseInt(id),
  //         status: 4,
  //         flag: "moderator",
  //         is_active: isChecked,
  //       },

  //       agent: "course",
  //       function: "updateCourseStatus",
  //     }).then((response) => {
  //       if (response?.data?.data?.status === 200) {
  //         console.log("active inactive response ", response?.data?.data?.data);
  //         const updatedCourseDetails = {
  //           ...courseDetails,
  //           is_active: isChecked,
  //         };

  //         dispatch(courseDetails(updatedCourseDetails));
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [isChecked]);

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <HeaderContent
              id={id}
              status="Approved"
              headerApiStatus="Approved"
            />
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-3">
            <div className="col-6 d-flex align-items-center">
              <NavLink
                to="/moderator"
                state={{
                  moderator_previousTab: "Approved",
                }}
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4
                  className="headText ms-2 mt-2 mb-2 fw-bold 
                w-auto textBlack"
                >
                  Approved
                </h4>
              </NavLink>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              {TajurbaAdmin_priviledge_data &&
              TajurbaAdmin_priviledge_data.some(
                (ele) =>
                  ele.title === "Content Creation" &&
                  ele.is_active === true &&
                  ele?.submenu &&
                  ele?.submenu.some(
                    (sub) =>
                      sub.title === "Moderator" &&
                      sub.is_active === true &&
                      sub.is_edit === true
                  )
              ) ? (
                <>
                  <label className="button b2 me-2" id="button-13">
                    <input
                      type="checkbox"
                      className="ms-3"
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                    <span className="slider round">
                      <div className="knobs"></div>
                    </span>
                    <div
                      style={{ backgroundColor: "transparent" }}
                      className="layer"
                    ></div>
                  </label>
                  <span className={isChecked ? "activelabel" : "inactivelabel"}>
                    {isChecked ? "Active" : "Inactive"}
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <div className="row h-100">
            <PreviewDetails
              id={id}
              flagForChapter="Published"
              ratingFlag="Approved"
            />
            <TimeLine id={id} flag="Approved" />
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default ModeratorApproved;
