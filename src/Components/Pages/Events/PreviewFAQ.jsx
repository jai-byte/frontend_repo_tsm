/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import AdminRoute from "../../../Route/RouteDetails";
import MultiCircularProgressBar from "../../Common/MultiCircularProgressBar";

const PreviewFAQ = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* <div className="row">
                     <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                           <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                              <span className="fw-normal d-flex align-items-center lightGrey font-size-10">Community</span>
                              <span className="fw-normal d-flex align-items-center font-size-10">dvv</span>
                           </div>
                           <span className="mx-2 lightGrey ">|</span>
                           <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                              <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                                 Category &nbsp;&nbsp;{" "}
                              </span>
                              <span className="fw-normal d-flex align-items-center font-size-10">dsvsvsv</span>
                           </div>
                           <span className="mx-2 lightGrey">|</span>
                           <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                              <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                                 Title &nbsp;&nbsp;{" "}
                              </span>
                              <span className="fw-normal d-flex align-items-center font-size-10">dvvs</span>
                           </div>
                           <span className="mx-2 lightGrey">|</span>

                           <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                              <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                                 Time per question &nbsp;&nbsp;{" "}
                              </span>
                              <span className="fw-normal d-flex align-items-center font-size-10">dsvs</span>
                           </div>

                           <span className="mx-2 lightGrey">|</span>
                           <h4 className="page-title mb-0 font-size-18 fw-normal text-end">
                              <span className="fw-normal d-flex align-items-center font-size-10">
                                 <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                                    Duration &nbsp;&nbsp;{" "}
                                 </span>
                                 sdsvsvs
                                 <span className="mx-2 font-size-10">to</span>
                                 <span className="font-size-10">dsvv</span>
                              </span>
                           </h4>
                        </div>
                     </div>
                  </div> */}
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to="/create-FAQ"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  FAQ Preview
                </h4>
              </NavLink>
            </div>
            <div className="col-6">
              <NavLink
                className="btn bgBlack text-white border-radius-2 px-4 float-end"
                to=""
              >
                Submit
              </NavLink>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card bg-white p-3">
                {/* <div className="d-flex">
                              <h5 className="mb-0 fw-bold">scvv</h5>
                           </div> */}
                {/* <hr className="borderHr my-3"></hr> */}
                <div className="row">
                  <div className="col-12">
                    {/* <p className="textBlack">dvsvsvs</p> */}
                    {/* <div className="accordion" id="accordionExample">
                                    {type === "Challenge" && (
                                       <>
                                          {challenge &&
                                             challenge?.map((ele, index) => {
                                                const isAccordionActive = index === activeAccordion;
                                                return (
                                                   <div
                                                      key={index}
                                                      className={
                                                         index < 1 ? "accordion-item border-0" : "accordion-item border-0 mt-3"
                                                      }
                                                   >
                                                      <h2 className="accordion-header" id={`heading${index + 1}`}>
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
                                                                  <p className="darkGrey">{ele?.question}</p>
                                                                  <div className="form-check mb-1">
                                                                     <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        value="1"
                                                                        name={`correctanswer${index}`}
                                                                        checked={ele?.correctanswer == "1"}
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
                                                                        checked={ele?.correctanswer == "2"}
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
                                                                        checked={ele?.correctanswer == "3"}
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
                                                                        checked={ele?.correctanswer == "4"}
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

                                    {type === "Quest" && (
                                       <>
                                          {challenge &&
                                             challenge?.map((ele, index) => {
                                                const isAccordionActive = index === activeAccordion;
                                                return (
                                                   <div
                                                      key={index}
                                                      className={
                                                         index < 1 ? "accordion-item border-0" : "accordion-item border-0 mt-3"
                                                      }
                                                   >
                                                      <h2 className="accordion-header" id={`heading${index + 1}`}>
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
                                                                  <p className="darkGrey">{ele?.quest_title}</p>
                                                                  <div className="form-check mb-1">{ele?.description}</div>
                                                               </div>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                );
                                             })}{" "}
                                       </>
                                    )}

                                    {type === "Poll" && (
                                       <div className="col-6">
                                          <p className="fw-bold textBlack">{challenge?.poll_title}</p>
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
                                                aria-valuenow={0}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                             >
                                                {challenge?.option2}
                                             </div>
                                          </div>
                                       </div>
                                    )}
                                 </div> */}
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item border-0">
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
                              <p className="mb-0 fw-bold">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </p>
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
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item border-0 mt-3">
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
                              <p className="mb-0 fw-bold">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </p>
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
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row pt-2">
                                    <div className="col-xl-12 mb-5">
                                       <div className="pe-4">
                                          <h4 className="textBlack fw-bold">Analytics</h4>
                                          <div className="row">
                                             <div className="col-4 text-center">
                                                <MultiCircularProgressBar />
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
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default PreviewFAQ;
