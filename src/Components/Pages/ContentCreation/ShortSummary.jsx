import React from "react";
// import AppLayout from "../../Loyout/App";
// import { NavLink } from "react-router-dom";
import soulImg from "../../../assets/images/Souls.png";
// import AdminRoute from '../../../Route/RouteDetails';

const ShortSummary = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h4 className="page-title mb-0 font-size-18 fw-normal lh-lg pt-4"></h4>
              </div>
            </div>
            11
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-4">
            <div className="col-6 d-flex align-items-center">
              <h3
                className="headText ms-2 mt-2 mb-2 fw-bold 
                w-auto textBlack"
              >
                Summary
              </h3>
            </div>
          </div>
          <div className="row h-100">
            <div className="col-8">
              <div className="main-card bg-white p-3">
                <h4 className="fw-bold">Preview</h4>
                <hr className="borderHr my-3"></hr>
                <div className="row">
                  <div className="col-6">
                    <p className="lightGrey mb-2">Title :</p>
                    <p className="textBlack fw-bold">
                      Uplifting Souls Through Divine Reflections
                    </p>
                    <p className="lightGrey mb-2 mt-5">Thumbnail</p>
                    <img src={soulImg} className="h-50 img-fluid" />
                  </div>
                  <div className="col-6">
                    <div className="position-relative">
                      <img src={soulImg} className="img-fluid" />
                      <div className="previewText p-3 h-100">
                        <p className="text-white">Preview</p>
                        <div className="row h-100 d-flex align-items-end pb-5">
                          <div className="col-8">
                            <p className="text-white mb-0">
                              Uplifting souls through divine reflections
                            </p>
                          </div>
                          <div className="col-4 d-flex justify-content-end">
                            <div className="buttonPreview text-center">
                              <div className="likeBtn">
                                <svg
                                  width="21.806"
                                  height="20.407"
                                  viewBox="0 0 21.806 20.407"
                                  className="mb-1"
                                >
                                  <path
                                    id="Path_11010"
                                    data-name="Path 11010"
                                    d="M7.1,79.714c1.04-.557,2.08-1.106,3.112-1.67a3.286,3.286,0,0,0,1.605-2.308c.177-.777.335-1.558.489-2.34.137-.7.448-.931,1.152-.837a3.7,3.7,0,0,1,3.216,4.249,11.332,11.332,0,0,1-.9,2.768c-.036.087-.071.175-.116.285h2.354c.517,0,1.033,0,1.55,0a2.108,2.108,0,0,1,2.021,1.246,2.081,2.081,0,0,1-.236,2.257c-.028.038-.054.078-.085.123a2.225,2.225,0,0,1,0,2.913A2.207,2.207,0,0,1,20.2,89.963a2.228,2.228,0,0,1,.047,1.432,2.133,2.133,0,0,1-1.99,1.534c-2.252.016-4.505.031-6.757-.009a15.823,15.823,0,0,1-4.4-.738.414.414,0,0,0-.5.126,2.01,2.01,0,0,1-1.5.628q-2.167,0-4.335,0A.716.716,0,0,1,0,92.17q0-6.491,0-12.981a.72.72,0,0,1,.785-.78c1.4,0,2.793,0,4.19,0A2.17,2.17,0,0,1,7.04,79.628c.015.028.036.053.058.086m.165,10.978a1.015,1.015,0,0,0,.118.053,16.193,16.193,0,0,0,4.4.725c2.106.027,4.213.015,6.32.014a.741.741,0,0,0,.788-.716.75.75,0,0,0-.745-.737.726.726,0,1,1,.052-1.451c.444,0,.888,0,1.332,0a.731.731,0,1,0,0-1.453c-.444,0-.888,0-1.332,0a.725.725,0,1,1,0-1.45c.444,0,.888,0,1.332,0a.731.731,0,1,0,0-1.453c-.436,0-.872,0-1.308,0a.727.727,0,1,1,0-1.45c.452,0,.9.007,1.356,0a.727.727,0,0,0,.721-.972.774.774,0,0,0-.814-.48q-3.184,0-6.369,0a.726.726,0,1,1-.006-1.45c.274,0,.549.008.823-.007a.26.26,0,0,0,.19-.126c.3-.713.607-1.423.866-2.15a3.156,3.156,0,0,0,.179-1.965,2.175,2.175,0,0,0-1.5-1.491c-.133.6-.271,1.208-.4,1.815a4.885,4.885,0,0,1-2.638,3.556c-1.061.543-2.1,1.133-3.151,1.692a.361.361,0,0,0-.218.375q.01,4.444,0,8.887v.243m-5.8.794H1.7q1.623,0,3.245,0a.766.766,0,0,0,.87-.88q0-4.928,0-9.856c0-.612-.277-.889-.885-.889H1.706c-.078,0-.157.007-.244.01Z"
                                    transform="translate(0 -72.539)"
                                    fill="#fff"
                                  />
                                </svg>
                                <br />
                              </div>
                              <small className="text-white">Like</small>
                              <div className="likeBtn mt-2">
                                <svg
                                  width="21.806"
                                  height="20.407"
                                  viewBox="0 0 21.806 20.407"
                                  className="selfRotate"
                                >
                                  <path
                                    id="Path_11010"
                                    data-name="Path 11010"
                                    d="M7.1,79.714c1.04-.557,2.08-1.106,3.112-1.67a3.286,3.286,0,0,0,1.605-2.308c.177-.777.335-1.558.489-2.34.137-.7.448-.931,1.152-.837a3.7,3.7,0,0,1,3.216,4.249,11.332,11.332,0,0,1-.9,2.768c-.036.087-.071.175-.116.285h2.354c.517,0,1.033,0,1.55,0a2.108,2.108,0,0,1,2.021,1.246,2.081,2.081,0,0,1-.236,2.257c-.028.038-.054.078-.085.123a2.225,2.225,0,0,1,0,2.913A2.207,2.207,0,0,1,20.2,89.963a2.228,2.228,0,0,1,.047,1.432,2.133,2.133,0,0,1-1.99,1.534c-2.252.016-4.505.031-6.757-.009a15.823,15.823,0,0,1-4.4-.738.414.414,0,0,0-.5.126,2.01,2.01,0,0,1-1.5.628q-2.167,0-4.335,0A.716.716,0,0,1,0,92.17q0-6.491,0-12.981a.72.72,0,0,1,.785-.78c1.4,0,2.793,0,4.19,0A2.17,2.17,0,0,1,7.04,79.628c.015.028.036.053.058.086m.165,10.978a1.015,1.015,0,0,0,.118.053,16.193,16.193,0,0,0,4.4.725c2.106.027,4.213.015,6.32.014a.741.741,0,0,0,.788-.716.75.75,0,0,0-.745-.737.726.726,0,1,1,.052-1.451c.444,0,.888,0,1.332,0a.731.731,0,1,0,0-1.453c-.444,0-.888,0-1.332,0a.725.725,0,1,1,0-1.45c.444,0,.888,0,1.332,0a.731.731,0,1,0,0-1.453c-.436,0-.872,0-1.308,0a.727.727,0,1,1,0-1.45c.452,0,.9.007,1.356,0a.727.727,0,0,0,.721-.972.774.774,0,0,0-.814-.48q-3.184,0-6.369,0a.726.726,0,1,1-.006-1.45c.274,0,.549.008.823-.007a.26.26,0,0,0,.19-.126c.3-.713.607-1.423.866-2.15a3.156,3.156,0,0,0,.179-1.965,2.175,2.175,0,0,0-1.5-1.491c-.133.6-.271,1.208-.4,1.815a4.885,4.885,0,0,1-2.638,3.556c-1.061.543-2.1,1.133-3.151,1.692a.361.361,0,0,0-.218.375q.01,4.444,0,8.887v.243m-5.8.794H1.7q1.623,0,3.245,0a.766.766,0,0,0,.87-.88q0-4.928,0-9.856c0-.612-.277-.889-.885-.889H1.706c-.078,0-.157.007-.244.01Z"
                                    transform="translate(0 -72.539)"
                                    fill="#fff"
                                  />
                                </svg>
                                <br />
                              </div>
                              <small className="text-white">Dislike</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="main-card bg-white p-3" id="list">
                <h4 className="fw-bold">Timeline</h4>
                <hr className="borderHr my-3"></hr>
                <ul className="sessions">
                  <li className="bgtimeline">
                    <div className="row border-left-greyline">
                      <span className="fw-bold textBlack">Created</span>
                      <small className="greyLight">10-06-2023</small>
                    </div>
                  </li>
                  <li className="bgtimeline">
                    <div className="row border-left-greyline">
                      <span className="fw-bold textBlack">Send for Review</span>
                      <small className="greyLight">11-06-2023</small>
                    </div>
                  </li>
                  <li>
                    <div className="row border-left-greyline">
                      <span className="fw-bold defaultGrey">
                        Assign to Abhinav S.
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="row border-left-greyline">
                      <span className="fw-bold defaultGrey">Under Review</span>
                    </div>
                  </li>
                  <li>
                    <div className="row border-left-greyline">
                      <span className="fw-bold defaultGrey">Approved</span>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <span className="fw-bold defaultGrey">
                        Publisher Received
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <span className="fw-bold defaultGrey">Published</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default ShortSummary;
