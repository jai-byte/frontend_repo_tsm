/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../assets/images/cunsumerProfileImg.png";
import CreateUserImg from "../../../assets/images/profileu.png";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import AdminRoute from "../../../Route/RouteDetails";

const CreateFAQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faq, setFaq] = useState([
    {
      question: "",
      answer: "",
      is_deleted: false,
      event_id: id,
      eventFAQ_id: "",
      _id: "",
    },
  ]);

  const [faqIndex, setFaqIndex] = useState(0);
  const [faqFieldErrors, setFaqFieldErrors] = useState([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const allFaqHaveId = faq?.every((ass) => ass._id !== "");

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          event_id: parseInt(id),
        },
        agent: "event",
        function: "getEventFAQ",
      }).then((response) => {
        console.log("response from get api for faq ques", response?.data?.data);
        if (response?.data?.data?.status === 200) {
          const responseData = response?.data?.data?.data;

          if (response?.data?.data?.data?.length) {
            setFaq(
              responseData.map((item) => ({
                question: item.question,
                answer: item.answer,
                event_id: item.event_id,
                eventFAQ_id: item.eventFAQ_id,
                _id: item._id,
              }))
            );
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addFaq = (e) => {
    e.preventDefault();
    console.log(allFaqHaveId);

    if (allFaqHaveId) {
      const newFaq = {
        question: "",
        answer: "",
        event_id: id,
        eventFAQ_id: "",
        is_deleted: false,
        _id: "",
      };
      const updatedFaq = [...faq, newFaq];
      setFaq(updatedFaq);
      setFaqIndex(faq?.length);

      //// if you want to  switch newly created assement

      // Set the AssessmentIndex to the index of the new assessment
      // const newIndex = updatedAssessment.length - 1;
      // setAssessmentIndex(newIndex);
    } else {
      window.$("#SaveAssesmentWarning").modal("show");
    }
  };

  // Function For Close  Add Assessment Warning the Modal
  const onClickOkayFaqModal = (e) => {
    e.preventDefault();
    window.$("#SaveAssesmentWarning").modal("hide");
  };

  const handleChangeFaqContent = (field, value) => {
    const updatedFaq = [...faq];
    const currentFaq = { ...updatedFaq[faqIndex] };
    currentFaq[field] = value;
    updatedFaq[faqIndex] = currentFaq;
    setFaq(updatedFaq);
  };

  const handleClickFaq = (event, index) => {
    event.preventDefault();
    setFaqIndex(index);
    // You can now access the current assessment using assessment[index]
    const currentFaq = faq[index];
    // Example: Set some default values for the clicked assessment
    const updatedFaq = {
      ...currentFaq,
    };
    // Update the state with the modified assessment
    const newFaqArray = [...faq];
    newFaqArray[index] = updatedFaq;
    setFaq(newFaqArray);
  };

  // Function for delete the assessment
  const handleDeleteFaq = (e, index, faq_id) => {
    e.preventDefault();

    const updatedFaq = [...faq];

    if (faq_id) {
      updatedFaq[index].is_deleted = true;
      try {
        API?.CommanApiCall({
          data: {
            faq: updatedFaq[index],
          },
          agent: "event",
          function: "addFaq",
        }).then((response) => {
          // console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            //toast.success(response?.data?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
      }

      updatedFaq.splice(index, 1);
      setFaq(updatedFaq);
      const previousIndex = Math.max(0, index - 1); // Ensure it doesn't go below 0
      setFaqIndex(previousIndex);
    } else {
      updatedFaq.splice(index, 1);
      setFaq(updatedFaq);
      const previousIndex = Math.max(0, index - 1); // Ensure it doesn't go below 0
      setFaqIndex(previousIndex);
    }
  };

  // Function for Save Assessment
  const handleClickSaveFaq = (e) => {
    e.preventDefault();

    // Validate the current assessment values
    const currentFaq = faq[faqIndex];
    const errors = validateFaqValues(currentFaq);
    console.log(currentFaq);

    // If there are errors, update the errors state
    if (Object.keys(errors).length > 0) {
      setFaqFieldErrors({
        ...faqFieldErrors,
        [faqIndex]: errors,
      });
    } else {
      // If no errors, clear the errors for the current index
      setFaqLoading(true);
      const updatedErrors = { ...faqFieldErrors };
      delete updatedErrors[faqIndex];
      setFaqFieldErrors(updatedErrors);
      //console.log("Assesment", currentAssessment);

      try {
        API?.CommanApiCall({
          data: {
            faq: currentFaq,
          },
          agent: "event",
          function: "addFaq",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            setFaqLoading(false);

            // Update assessment object at specific index
            const updatedFaq = [...faq]; // Create a new array
            updatedFaq[faqIndex] = {
              ...updatedFaq[faqIndex], // Copy the existing object
              _id: response?.data?.data?.data?._id,
              eventFAQ_id: response?.data?.data?.data?.eventFAQ_id,
            };
            setFaq((prevFaq) => updatedFaq);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateFaqValues = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.question) {
      errors.question = "Please enter question";
    } else if (values.question.trim() === "") {
      errors.question = "Question can not be blank";
    }

    if (!values.answer) {
      errors.answer = "Please enter answer";
    } else if (values.answer.trim() === "") {
      errors.answer = "Answer can not be blank";
    }

    console.log("Erroes", errors);
    return errors;
  };

  // **********// Functionality for  Preview //*************************** */
  const [previewMode, SetPreviewMode] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const handleClickPreview = () => {
    if (allFaqHaveId) {
      SetPreviewMode(true);
    } else {
      toast.error("Please Save All Faq");
    }
  };

  //function for submit FAQ
  const handleClickSubmit = () => {
    navigate(`../${AdminRoute?.Events?.Events}`);
    //  try {
    //    API?.CommanApiCall({
    //      data: {
    //        event_id_id: parseInt(id),
    //      },
    //      agent: "course",
    //      function: "getAssessmentList",
    //    }).then((response) => {
    //      //console.log(response?.data?.data);
    //      if (response?.data?.data?.status === 200) {
    //      }
    //    });
    //  } catch (error) {
    //    console.log(error);
    //  }
  };

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Community &nbsp;&nbsp;{" "}
                    </span>
                    <span className="fw-normal d-flex align-items-center font-size-10">
                      Sales and Marketing
                    </span>
                  </div>
                  <span className="mx-2 lightGrey ">|</span>
                  <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Category &nbsp;&nbsp;{" "}
                    </span>
                    <span className="fw-normal d-flex align-items-center font-size-10">
                      Marketing
                    </span>
                  </div>
                  <span className="mx-2 lightGrey">|</span>
                  <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Title &nbsp;&nbsp;{" "}
                    </span>
                    <span className="fw-normal d-flex align-items-center font-size-10">
                      Marketing Strategy
                    </span>
                  </div>
                  <span className="mx-2 lightGrey">|</span>
                  <div className="page-title mb-0 font-size-18 fw-normal text-end d-flex">
                    <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                      Time per question &nbsp;&nbsp;{" "}
                    </span>
                    <span className="fw-normal d-flex align-items-center font-size-10">
                      30 sec
                    </span>
                  </div>{" "}
                  <span className="mx-2 lightGrey">|</span>
                  <h4 className="page-title mb-0 font-size-18 fw-normal text-end">
                    <span className="fw-normal d-flex align-items-center font-size-10">
                      <span className="fw-normal d-flex align-items-center lightGrey font-size-10">
                        Duration &nbsp;&nbsp;{" "}
                      </span>
                      15-12-2024
                      <span className="mx-2 font-size-10">to</span>
                      <span className="font-size-10"> 15-12-2024</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        className="ms-2"
                      >
                        <g
                          id="Group_17126"
                          data-name="Group 17126"
                          transform="translate(-1805 -135)"
                        >
                          <rect
                            id="Rectangle_6668"
                            data-name="Rectangle 6668"
                            width="40"
                            height="40"
                            rx="20"
                            transform="translate(1805 135)"
                            fill="#2d3450"
                          />
                          <g
                            id="Group_17125"
                            data-name="Group 17125"
                            transform="translate(247 -247)"
                          >
                            <path
                              id="Path_11169"
                              data-name="Path 11169"
                              d="M10.388,6H4.642A1.642,1.642,0,0,0,3,7.642V19.135a1.642,1.642,0,0,0,1.642,1.642H16.135a1.642,1.642,0,0,0,1.642-1.642V13.388"
                              transform="translate(1567 389.223)"
                              fill="none"
                              stroke="#fff"
                            />
                            <path
                              id="Path_11170"
                              data-name="Path 11170"
                              d="M19.909,3.286a1.6,1.6,0,0,1,2.26,2.26L15.013,12.7,12,13.455l.753-3.013Z"
                              transform="translate(1563.363 391.182)"
                              fill="none"
                              stroke="#fff"
                            />
                          </g>
                        </g>
                      </svg>
                    </span>
                  </h4>
                </div>
              </div>
            </div> */}
          {/* end page title */}
          <div className="row d-flex align-items-center justify-content-between mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                onClick={() => {
                  if (previewMode) {
                    SetPreviewMode(false);
                  } else {
                  }
                }}
                //  to="/events/create-events/:eventType"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  {previewMode ? (
                    <i className="fa fa-solid fa-chevron-left"></i>
                  ) : null}
                </div>
                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  {previewMode ? "FAQ Preview" : "Create FAQ"}
                </h4>
              </NavLink>
            </div>

            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                <div className="saveBtn">
                  <button
                    //  to="/preview-FAQ"
                    onClick={() => {
                      if (previewMode) {
                        handleClickSubmit();
                      } else {
                        handleClickPreview();
                      }
                    }}
                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                  >
                    <span className="">
                      {previewMode ? "Submit" : "Preview"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* whole div for shoprofileImgw details */}
          {!previewMode ? (
            <div className="row">
              <div className="col-3">
                <div className="main-card bg-white">
                  <div className="scroll__y ">
                    <div className="slide">
                      {faq &&
                        faq?.map((ele, index) => {
                          return (
                            <ul key={index} className="mb-0 ps-0">
                              <li>
                                <div className="row d-flex align-items-center mb-2">
                                  <div className="col-11">
                                    <button
                                      onClick={(event) =>
                                        handleClickFaq(event, index)
                                      }
                                      className="btn rouded-0 btn-main-light-orange w-100 text-center py-2"
                                    >
                                      <span>Faq {index + 1}</span>
                                    </button>
                                  </div>
                                  <div className="col-1 g-0">
                                    {faq?.length > 1 ? (
                                      <div className="col-1 g-0">
                                        <div className="dropdown">
                                          <button
                                            type="button"
                                            className="btn dropdown-toggle p-0 dayFilter h-auto w-auto"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fas fa-ellipsis-vertical defaultGrey"></i>
                                          </button>
                                          <ul className="dropdown-menu dropdown-menu-end">
                                            <li
                                              onClick={(e) => {
                                                handleDeleteFaq(
                                                  e,
                                                  index,
                                                  ele?.eventFAQ_id
                                                );
                                              }}
                                            >
                                              <a className="dropdown-item font-size-12">
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    ) : null}

                                    {/* Modal */}
                                    <div
                                      className="modal fade"
                                      id="exampleModal12"
                                      tabIndex={-1}
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog modal-dialog-centered bg-transparent">
                                        <div className="modal-content border_top p-5  border-0">
                                          <div className="modal-body text-start text-center">
                                            <h3 className="textGrey fw-bold">
                                              You need to have at least 1
                                              Assessment in the course
                                            </h3>
                                            <button
                                              className="btn bgBlack text-white border-radius-5 px-4 mt-3"
                                              type="submit"
                                            >
                                              <span>Okay</span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          );
                        })}
                    </div>
                  </div>

                  <div className="parent-container">
                    <NavLink
                      onClick={(e) => {
                        addFaq(e);
                      }}
                      className="btn bgOrange text-white px-4 w-100 mb-2"
                    >
                      <span className="">+ &nbsp; New FAQ</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="col-9">
                <div className="main-card bg-white h-100">
                  <div className="row">
                    <div className="col-9 mb-0 shadow-none">
                      <h3 className="textBlack fw-bold letter-spacing-4">
                        FAQ {faqIndex + 1}
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <button
                        className="btn  bgSave text-white border-radius-2 px-3 mt-2 me-2"
                        onClick={(e) => {
                          handleClickSaveFaq(e);
                        }}
                        disabled={faqLoading}
                      >
                        {/* <i className="fa fa-light fa-check me-1"></i>{" "} */}
                        <span>
                          {faqLoading && (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Save
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Enter Question
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ask Question..."
                        id="Title"
                        name="question"
                        value={faq[faqIndex]?.question}
                        onChange={(e) =>
                          handleChangeFaqContent("question", e.target.value)
                        }
                      />
                    </div>
                    <div className="text-danger">
                      {faqFieldErrors[faqIndex]?.question}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <label className="form-label">
                        {" "}
                        <span className="mandatory-star me-1">*</span>Answer in
                        detail
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        maxLength={100}
                        placeholder="Use max 100 words ....."
                        name="answer"
                        value={faq[faqIndex]?.answer}
                        onChange={(e) =>
                          handleChangeFaqContent("answer", e.target.value)
                        }
                      />
                    </div>
                    <div className="text-danger">
                      {faqFieldErrors[faqIndex]?.answer}
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="SaveAssesmentWarning"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content p-5 border-radius-5 border-top-model-black">
                        <div className="modal-body text-center">
                          <h3 className="fw-bold">
                            To add new Assessment you need to save Faq first.
                          </h3>
                          <div className="col-12 d-flex justify-content-center mt-4">
                            <div className="saveBtn">
                              <button
                                className="btn bgBlack text-white px-4"
                                onClick={(e) => {
                                  onClickOkayFaqModal(e);
                                }}
                              >
                                <span className="">Okay</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="main-card bg-white p-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="accordion" id="accordionExample">
                        <>
                          {faq &&
                            faq?.map((ele, index) => {
                              const isAccordionActive =
                                index === activeAccordion;
                              return (
                                <div
                                  key={index}
                                  className={
                                    index < 1
                                      ? "accordion-item border-0"
                                      : "accordion-item border-0 mt-3"
                                  }
                                >
                                  <h2
                                    className="accordion-header"
                                    id={`heading${index + 1}`}
                                  >
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
                                          {index + 1}. {ele?.question}
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
                                          <p className="darkGrey">
                                            {ele?.answer}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}{" "}
                        </>

                        {/* <div className="col-6">
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
                              </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default CreateFAQ;
