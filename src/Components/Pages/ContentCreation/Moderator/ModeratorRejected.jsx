/* eslint-disable */
import React from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
//import bookTitle from "../../../../assets/images/Notific.png";
import HeaderContent from "../../../Common/HeaderContent";
import PreviewDetails from "../../../Common/PreviewDetails";
import TimeLine from "../../../Common/TimeLine";
// import AdminRoute from "../../../../Route/RouteDetails";

const ModeratorRejected = () => {
  const { id } = useParams();
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <HeaderContent id={id} status="Rejected" />
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-3">
            <div className="col-6 d-flex align-items-center">
              <NavLink
                to="/moderator"
                state={{
                  moderator_previousTab: "Rejected",
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
                  Rejected
                </h4>
              </NavLink>
            </div>
            {/* <div className="col-6">
                <div className="saveBtn">
                  <NavLink
                    className="btn bgBlack text-white border-radius-10 px-4 float-end"
                    to={`../${AdminRoute?.ContentCreation?.CreateContent.replace(
                      "/:id",
                      ""
                    )}/${id}`}
                  >
                    <span>Edit Content</span>
                  </NavLink>
                </div>
              </div> */}
          </div>
          <div className="row h-100">
            <PreviewDetails id={id} />
            {/* */}
            <TimeLine id={id} flag="Rejected" />
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default ModeratorRejected;
