/* eslint-disable */
import React, { useEffect, useState } from "react";
import bookTitle from "../../assets/images/Notific.png";
import API from "../../Api/Api";
import { useDispatch } from "react-redux";
import { courseDetails } from "../../Redux/slice";

export default function HeaderContent(props) {
  const dispatch = useDispatch();
  const { id, status, headerApiStatus } = props;
  const [userDetails, setUserDetails] = useState("");

  // Api call for get user details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          flag: headerApiStatus,
        },
        agent: "course",
        function: "getCourseDetails",
      }).then((response) => {
        // console.log("User details data ", response?.data?.data?.data);
        setUserDetails(response?.data?.data?.data);
        dispatch(courseDetails(response?.data?.data?.data));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ColorAccordingToStatus = (status) => {
    switch (status) {
      case "Pending":
        return "fw-bold ms-2 TextYellow";
        break;
      case "Resubmitted":
        return "fw-bold ms-2 TextYellow";
        break;
      case "Published":
        return "fw-bold ms-2 textGreen";
        break;
      case "Rejected":
        return "fw-bold ms-2 textDanger";
        break;
      case "Approved":
        return "fw-bold ms-2 textGreen";
        break;
      default:
        null;
    }
  };

  return (
    <div className="col-12">
      <div className="page-title-box titleInfo">
        <h4 className="page-title mb-0 font-size-18 fw-normal lh-lg pt-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="colSelf ">
              <div className="d-flex align-items-center justify-content-center">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={userDetails && userDetails?.cover_img}
                    className="img-fluid bookTitle"
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span style={{ display: "inline-block", margin: 0 }}>
                    <span>Title</span>
                    {userDetails && userDetails?.course_title?.length > 15 ? (
                      <span
                        className="fw-bold ms-2"
                        data-toggle="tooltip"
                        title={userDetails && userDetails?.course_title}
                      >
                        {userDetails &&
                          userDetails?.course_title?.substring(0, 15)}
                        ...
                      </span>
                    ) : (
                      <span className="fw-bold ms-2">
                        {userDetails && userDetails?.course_title}
                      </span>
                    )}
                    {/* <span className="ms-2 fw-bold">
                      {userDetails && userDetails?.course_title}
                    </span> */}
                  </span>
                </div>
              </div>
            </div>
            <div className="colSelf border-right-grey height"></div>
            <div className="colSelf ">
              <small>Category</small>
              <small className="fw-bold ms-2">
                {userDetails && userDetails?.categoryName}
              </small>
            </div>
            <div className="colSelf border-right-grey height"></div>
            <div className="colSelf ">
              <small>Author</small>
              <small className="fw-bold ms-2">
                {userDetails && userDetails?.author_name}
              </small>
            </div>
            <div className="colSelf border-right-grey height"></div>
            <div className="colSelf">
              <small>Status :</small>
              <small className={ColorAccordingToStatus(status)}>{status}</small>
            </div>
          </div>
        </h4>
      </div>
    </div>
  );
}
