/* eslint-disable */
import React, { useEffect, useState } from "react";
import API from "../../Api/Api";
import moment from "moment/moment";
// import { useParams } from "react-router-dom";
// import bookTitle from "../../assets/images/Notific.png";

export default function TimeLine(props) {
  // Api for getting timeline details
  const [timlineData, setTimelineData] = useState([]);
  console.log(props);

  useEffect(() => {
    getTimeLine();
  }, []);
  const getTimeLine = async () => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(props.id),
          flag: props?.flag,
        },
        function: "courseTimeLine",
        agent: "course",
      }).then((response) => {
        console.log("TimeLine Data", response?.data?.data?.data);
        setTimelineData(response?.data?.data?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-3">
      <div className="main-card bg-white p-3" id="list">
        <h4 className="fw-bold">Timeline</h4>
        <hr className="borderHr my-3"></hr>
        <ul className="sessions">
          {timlineData &&
            timlineData?.map((ele, index) => {
              return (
                <li key={index} className="bgtimeline">
                  <div className="row ">
                    <span className="fw-bold textBlack">{ele?.action}</span>
                    <small className="greyLight">
                      {moment(ele?.createdAt).format("DD-MM-YYYY")}
                    </small>
                  </div>
                </li>
              );
            })}
          {/* <li>
            <div className="row">
              <span className="fw-bold defaultGrey">Publisher Received</span>
            </div>
          </li>
          <li>
            <div className="row">
              <span className="fw-bold defaultGrey">Published</span>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
