import React from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
//import bookTitle from "../../../assets/images/Notific.png";
import TimeLine from "../../Common/TimeLine";
import PreviewDetails from "../../Common/PreviewDetails";
import HeaderContent from "../../Common/HeaderContent";
// import AdminRoute from '../../../Route/RouteDetails';

const Pending = () => {
  const { id } = useParams();
  // console.log(id);
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <HeaderContent id={id} status="Pending" />
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-3">
            <div className="col-6 d-flex align-items-center">
              <NavLink
                to="/submitted"
                state={{
                  creator_previousTab: "Pending",
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
                  Pending
                </h4>
              </NavLink>
            </div>
          </div>
          <div className="row h-100">
            <PreviewDetails id={id} flagForChapter={null} />
            {/* */}
            <TimeLine id={id} flag="Pending" />
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Pending;
