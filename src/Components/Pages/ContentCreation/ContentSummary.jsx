import React from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import bookTitle from "../../../assets/images/Notific.png";
// import AdminRoute from '../../../Route/RouteDetails';

const ContentSummary = () => {
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box titleInfo">
                <h4 className="page-title mb-0 font-size-18 fw-normal lh-lg pt-4">
                  <div className="row align-items-center justify-content-center">
                    <div className="col border-right-grey">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          src={bookTitle}
                          className="img-fluid bookTitle me-2"
                        ></img>
                        <small>Title</small>
                        <small className="fw-bold ms-2">Ramas Journey</small>
                      </div>
                    </div>
                    <div className="col border-right-grey">
                      <div className="d-flex justify-content-center">
                        <small>Category</small>
                        <small className="fw-bold ms-2">Itihasa</small>
                      </div>
                    </div>
                    <div className="col border-right-grey">
                      <div className="d-flex justify-content-center">
                        <small>Sub Category</small>
                        <small className="fw-bold ms-2">Ramayana</small>
                      </div>
                    </div>
                    <div className="col border-right-grey">
                      <div className="d-flex justify-content-center">
                        <small>Author</small>
                        <small className="fw-bold ms-2">Anshuman K.</small>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex justify-content-center align-items-center">
                        <small>Format</small>
                        <small className="fw-bold ms-2">Video</small>
                      </div>
                    </div>
                  </div>
                </h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-3">
            <div className="col-6">
              <h3 className="headText mt-2 mb-2 fw-bold">Summary</h3>
            </div>
          </div>
          <div className="row h-100">
            <div className="col-8">
              <div className="main-card bg-white p-3">
                <h4 className="fw-bold">Preview</h4>
                <hr className="borderHr my-3"></hr>
                <div className="row">
                  <div className="col-12">
                    <div className="orangrBg border-radius-2 p-2">
                      <div className="d-flex align-items-center">
                        <div className="bgCheckIcon rounded-circle me-2">
                          <i className="fa fa-light fa-check"></i>
                        </div>
                        <p className="mb-0">
                          Chapter 1 -
                          <span className="fw-bold"> Bal Kandam</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="orangrBg border-radius-2 p-2">
                      <div className="d-flex align-items-center">
                        <div className="bgCheckIcon rounded-circle me-2">
                          <i className="fa fa-light fa-check"></i>
                        </div>
                        <p className="mb-0">
                          Chapter 2 -
                          <span className="fw-bold"> Uttara Kandam</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-card bg-white p-3 mt-4">
                <div className="d-flex">
                  <NavLink to="" className="textBlack">
                    <i className="fa fa-solid fa-chevron-left me-2"></i>
                  </NavLink>
                  <p className="mb-0">
                    Chapter 1 -<span className="fw-bold"> Bal Kandam</span>
                  </p>
                </div>
                <hr className="borderHr my-3"></hr>
                <div className="row">
                  <div className="col-12">
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
                              <p className="mb-0 fw-bold">Verse 1</p>
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
                            <h5 className="fw-bold">Introduction</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut eget diam in odio faucibus accumsan vitae
                              hendrerit nisl. Fusce nec tincidunt augue Vivamus
                              justo urna, maximus in ipsum a, accumsan iaculis
                              lacus. Maecenas condimentum sollicitudin tempus.
                              Pellentesque viverra sodales libero. Morbi ac urna
                              ut ex vulputate egestas.
                            </p>
                            <h5 className="fw-bold pt-2">Verse</h5>
                            <p>
                              धृतराष्ट्र उवाच | <br />
                              धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
                              <br /> मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||1||
                            </p>
                            <h5 className="fw-bold pt-2">Transliteration</h5>
                            <p>
                              dhṛitarāśhtra uvācha
                              <br /> dharma-kṣhetre kuru-kṣhetre samavetā <br />{" "}
                              māmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya
                            </p>
                            <h5 className="fw-bold pt-2">Word Meaning</h5>
                            <p>
                              dhṛitarāśhtraḥ uvācha—Dhritarashtra said;
                              dharma-kṣhetre—the land of dharma; kuru-kṣhetre—at
                              Kurukshetra; samavetāḥ—having gathered;
                              yuyutsavaḥ—desiring to fight; māmakāḥ—my sons;
                              pāṇḍavāḥ—the sons of Pandu; cha—and;
                              eva—certainly; kim—what; akurvata—did they do;
                              sañjaya—Sanjay
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
                              <p className="mb-0 fw-bold">Verse 2</p>
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
                            <h5 className="fw-bold">Introduction</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut eget diam in odio faucibus accumsan vitae
                              hendrerit nisl. Fusce nec tincidunt augue Vivamus
                              justo urna, maximus in ipsum a, accumsan iaculis
                              lacus. Maecenas condimentum sollicitudin tempus.
                              Pellentesque viverra sodales libero. Morbi ac urna
                              ut ex vulputate egestas.
                            </p>
                            <h5 className="fw-bold pt-2">Verse</h5>
                            <p>
                              धृतराष्ट्र उवाच | <br />
                              धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
                              <br /> मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||1||
                            </p>
                            <h5 className="fw-bold pt-2">Transliteration</h5>
                            <p>
                              dhṛitarāśhtra uvācha
                              <br /> dharma-kṣhetre kuru-kṣhetre samavetā <br />{" "}
                              māmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya
                            </p>
                            <h5 className="fw-bold pt-2">Word Meaning</h5>
                            <p>
                              dhṛitarāśhtraḥ uvācha—Dhritarashtra said;
                              dharma-kṣhetre—the land of dharma; kuru-kṣhetre—at
                              Kurukshetra; samavetāḥ—having gathered;
                              yuyutsavaḥ—desiring to fight; māmakāḥ—my sons;
                              pāṇḍavāḥ—the sons of Pandu; cha—and;
                              eva—certainly; kim—what; akurvata—did they do;
                              sañjaya—Sanjay
                            </p>
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

export default ContentSummary;
