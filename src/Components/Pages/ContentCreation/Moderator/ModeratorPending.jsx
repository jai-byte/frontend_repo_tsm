/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import bookTitle from "../../../../assets/images/Notific.png";
import HeaderContent from "../../../Common/HeaderContent";
import PreviewDetails from "../../../Common/PreviewDetails";
import TimeLine from "../../../Common/TimeLine";
import AdminRoute from "../../../../Route/RouteDetails";
import API from "../../../../Api/Api";
import RouteName from "../../../../Route/RouteDetails";
import { useRef } from "react";
import Vimeo from "@vimeo/player";

const ModeratorPending = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rejectmode, setRejectMode] = useState(false);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [showContentDetails, setShowContentDetails] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSelectedIndex, setPreviewSelectedIndex] = useState("");
  const [previewSelectedChapterName, setPreviewSelectedChapterName] =
    useState("");
  const [chapterId, setChapterId] = useState("");

  const [userDetails, setUserDetails] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [loading, setLoading] = useState(false);
  // Functionality for add remark

  const initialvaluesForReark = {
    course_id: id,
    chapterEdition_id: null,
    status: 2,
    action: "Rejected",
    remark: "",
  };
  const [remarkValues, setRemarkValues] = useState([initialvaluesForReark]);
  const [remarkindex, setRemarkIndex] = useState(0);
  const [remarkChapterName, setRemarkChapterName] = useState("");

  const memoizedRemarkValues = useMemo(() => remarkValues, [remarkValues]);
  const memoizedRemarkIndex = useMemo(() => remarkindex, [remarkindex]);

  // Function For remark the comment
  const handleRemarkChange = useCallback(
    (event) => {
      event.preventDefault();
      setRemarkValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[memoizedRemarkIndex].remark = event.target.value;
        return updatedValues;
      });
    },
    [memoizedRemarkIndex, setRemarkValues]
  );

  // Api for Get remark of chapter
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          chapterEdition_id: chapterId,
        },
        agent: "course",
        function: "remark_data",
      }).then((response) => {
        console.log("remark ", response?.data?.data);
        if (response?.data?.data?.status === 200) {
          // console.log(
          //   "response?.data?.data?.data?.remark",
          //   response?.data?.data?.data?.remark
          // );
          setRemarkValues((prevValues) => {
            const updatedValues = [...prevValues]; // Copying the array
            updatedValues[remarkindex] = {
              ...updatedValues[remarkindex],
              remark: response?.data?.data?.data?.remark,
            };
            return updatedValues;
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [chapterId, remarkindex]);

  // Api call for get user details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
        },
        agent: "course",
        function: "getCourseDetails",
      }).then((response) => {
        // console.log("User details data ", response?.data?.data?.data);
        // console.log(
        //   "User details data ",
        //   response?.data?.data?.data?.community?.community_id
        // );
        setUserDetails(response?.data?.data?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickBack = (e) => {
    e.preventDefault();
    setShowPreview(false);
    setPreviewSelectedIndex("");
    setPreviewSelectedChapterName("");
    setChapterId("");
  };

  // Api for get chapter details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          // course_id: 6,
        },
        agent: "course",
        function: "getChapterList",
      }).then((response) => {
        // console.log("ChapterList ", response?.data?.data?.data);
        if (response?.data?.data?.data?.length) {
          setShowContentDetails(response?.data?.data?.data);
          const updatedValues = response?.data?.data?.data.map((chapter) => ({
            chapterEdition_id: chapter.chapterEdition_id,
            course_id: chapter.course_id,
            status: 2,
            action: "Rejected",
            remark: "",
          }));

          setRemarkValues(updatedValues);
          setRemarkChapterName(response?.data?.data?.data[0]?.chapter_title);
          setChapterId(response?.data?.data?.data[0]?.chapterEdition_id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Preview Modal
  const ShowPreviewDetails = useCallback(
    ({
      // data,
      previewSelectedIndex,
      previewSelectedChapterName,
      handleClickBack,
      chapter_id,
    }) => {
      // console.log("chapter_id", chapter_id);
      const [moduleList, setModuleList] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        try {
          API?.CommanApiCall({
            data: {
              chapter_id: chapter_id,
            },
            agent: "course",
            function: "getModuleList",
          }).then((response) => {
            // console.log("Module Details ", response?.data?.data?.data);
            setModuleList(response?.data?.data?.data);
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
      }, [chapter_id]);

      // Vimeo Player Components
      // const VimeoPlayer = useCallback(({ videoId }) => {
      //   const playerRef = useRef(null);

      //   useEffect(() => {
      //     const player = new Vimeo("vimeoPlayer", {
      //       id: videoId,
      //     });

      //     // Optional: Add event listeners
      //     player.on("play", () => {
      //       // console.log("Video is playing");
      //     });

      //     player.on("pause", () => {
      //       // console.log("Video is paused");
      //     });

      //     player.on("ended", () => {
      //       // console.log("Video has ended");
      //     });

      //     // Save the player instance to the ref for later use (e.g., to pause, play, etc.)
      //     playerRef.current = player;

      //     // Clean up the player when the component unmounts
      //     return () => {
      //       player.unload();
      //     };
      //   }, [videoId]);

      //   return (
      //     <div>
      //       <div id="vimeoPlayer"></div>
      //     </div>
      //   );
      // }, []);

      // const VimeoPlayerComponent = useCallback(
      //   (id) => {
      //     var regex = /vimeo\.com\/(?:.*\/)?(\d+)/;
      //     var match = id?.VimeoUrlIdLink?.match(regex);

      //     if (match && match[1]) {
      //       //return match[1];
      //       <div>
      //         <VimeoPlayer videoId={match[1]} />
      //       </div>;
      //     } else {
      //       // console.error("Invalid Vimeo URL");
      //       // return null;
      //     }

      //     // console.log("id", id?.VimeoUrlIdLink);
      //     //const vimeoUrlForId = id?.VimeoUrlIdLink;
      //     const vimeoUrlForId = "https://vimeo.com/manage/videos/837110972";

      //     const videoId = vimeoUrlForId?.split("/")?.pop();
      //     // console.log("videoId", videoId);

      //     return (
      //       <div>
      //         <VimeoPlayer videoId={videoId} />
      //       </div>
      //     );
      //   },
      //   [id]
      // );

      const VimeoPlayer = useCallback(({ videoId }) => {
        if (videoId) {
          var regex = /vimeo\.com\/(?:.*\/)?(\d+)/;
          var match = videoId.match(regex);

          if (match) {
            const videoIdNumber = match[1];

            const playerRef = useRef(null);

            useEffect(() => {
              // Initialize the Vimeo player when the component mounts
              const player = new Vimeo(playerRef.current, {
                id: videoIdNumber,
              });

              return () => {
                // Clean up when the component unmounts
                player.destroy();
              };
            }, [videoIdNumber]);

            return <div ref={playerRef} />;
          } else {
            return null; // Return null if no match found
          }
        } else {
          return null; // Return null if videoId is null or undefined
        }
      }, []);

      return (
        <div className="main-card bg-white p-3 mt-4">
          <div className="d-flex">
            <span
              onClick={(e) => {
                handleClickBack(e);
              }}
              className="textBlack"
            >
              <i className="fa fa-solid fa-chevron-left me-2"></i>
            </span>

            <p className="mb-0">
              Chapter {previewSelectedIndex + 1} -
              <span className="fw-bold"> {previewSelectedChapterName}</span>
            </p>
          </div>
          <hr className="borderHr my-3"></hr>
          <div className="row">
            <div className="col-12">
              <div className="accordion" id="accordionExample">
                {loading ? (
                  // <tr>
                  //   <td colSpan={12}>
                  //     <div className="d-flex justify-content-center">
                  //       <div className="spinner-border" role="status">
                  //         <span className="visually-hidden">Loading...</span>
                  //       </div>
                  //     </div>
                  //   </td>
                  // </tr>
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {moduleList &&
                      moduleList?.map((ele, index) => {
                        const isAccordionActive = index === activeAccordion;
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
                                className="accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none"
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
                                    Module {index + 1}- {ele?.module_header}
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
                                <div className="verseText">
                                  <div>
                                    {ele?.module_link ? (
                                      <div>
                                        <VimeoPlayer
                                          videoId={ele?.module_link}
                                        />
                                      </div>
                                    ) : null}
                                  </div>

                                  <p className="textBlack mb-0 mt-2">
                                    {ele?.module_description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}{" "}
                  </>
                )}

                {/* <div className="accordion-item border-0 mt-3">
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
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control main-card px-3 py-2  border-0"
                        placeholder="Enter Chapter Name"
                        name="audio"
                      />
                      <div className="forword-icon px-2 ms-1 pt-2">
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                    <div className="verseText d-flex">
                      <iframe
                        src="https://www.youtube.com/embed/hGtmRwoCMvE"
                        allowfullscreen
                        className="me-2"
                      ></iframe>

                      <div>
                        <p className="textBlack mb-0">Ramas Journey</p>

                        <small className="defaultGrey">Size : 35 MB</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      );
    },
    [memoizedRemarkIndex, setRemarkValues]
  );

  // Click on Reject button
  const handleClickReject = () => {
    setRejectMode(true);
  };

  // click on No for Modal Approved button
  const handleApproveModalClose = () => {
    window.$("#exampleModal").modal("hide");
  };

  // Click on yes for modal Approval
  const handleClickApprovedYes = () => {
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          status: 4,
          community_id: userDetails?.community?.community_id,
          flag: "moderator",
        },
        agent: "course",
        function: "updateCourseStatus",
      }).then((response) => {
        //  console.log("updateCourseStatus ", response?.data?.data);
        if (response?.data?.data?.status === 200) {
          window.$("#exampleModal").modal("hide");
          window.$("#exampleModal1").modal("show");
          setTimeout(() => {
            setLoading(false);
            window.$("#exampleModal1").modal("hide");
            navigate(`/${RouteName.ContentCreation.Moderator.Moderator}`);
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDoneForReject = (e) => {
    e.preventDefault();
    window.$("#exampleModalR").modal("show");
  };

  const handleClickYesForReject = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          status: 2,
          reject_data: remarkValues,
        },
        agent: "course",
        function: "updateCourseStatus",
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          window.$("#exampleModalR").modal("hide");
          window.$("#exampleModalR1").modal("show");
          setTimeout(() => {
            setLoading(true);
            window.$("#exampleModalR1").modal("hide");
            navigate(`/${RouteName.ContentCreation.Moderator.Moderator}`);
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
    }
    // window.$("#exampleModalR").modal("hide");
    // window.$("#exampleModalR1").modal("show");
    // navigate(`/${RouteName.ContentCreation.Moderator.Moderator}`);
  };

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content pe-0 h-100">
          {/* start page title */}
          <div className="row">
            <HeaderContent id={id} status="Pending" headerApiStatus={null} />
          </div>
          {/* end page title */}
          <div className="row position-relative mb-3 mt-3">
            <div className="col-6 d-flex align-items-center">
              <NavLink
                to="/moderator"
                state={{
                  moderator_previousTab: "Moderator_pending",
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
            <div className="col-6">
              <div className="d-flex justify-content-end">
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
                  <div className="rejectBtn">
                    {!rejectmode ? (
                      <>
                        <button
                          className="btn btn-reject me-3 px-4"
                          onClick={() => {
                            handleClickReject();
                          }}
                          // data-bs-toggle="modal"
                          // data-bs-target="#exampleModalR"
                        >
                          <span className="">Reject</span>
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="btn bgBlack text-white px-4"
                        >
                          <span className="">Approve</span>
                        </button>
                      </>
                    ) : (
                      <button
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModalR"

                        className="btn btnDanger me-3 px-4"
                        onClick={(e) => {
                          handleClickDoneForReject(e);
                        }}
                      >
                        <span className="">Done</span>
                      </button>
                    )}

                    <div
                      className="modal fade"
                      id="exampleModalR"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-5 border-radius-5 border-top-model-red">
                          <div className="modal-body text-center">
                            <h3 className="fw-bold">
                              Are you sure you want to Reject these Content?
                            </h3>
                            <div className="col-12 d-flex justify-content-center mt-4">
                              <div className="cancelBtn">
                                <button
                                  onClick={() => {
                                    window.$("#exampleModalR").modal("hide");
                                  }}
                                  disabled={loading}
                                  className="btn btn-reject border-radius-5 me-3 px-4"
                                >
                                  <span className="">No</span>
                                </button>
                              </div>
                              <div className="saveBtn">
                                <button
                                  disabled={loading}
                                  onClick={(e) => {
                                    handleClickYesForReject(e);
                                  }}
                                  className="btn bgBlack text-white px-4"
                                >
                                  <span className="">
                                    {loading && (
                                      <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                    )}
                                    Yes
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Reject Modal Confirm */}
                    <div
                      className="modal fade"
                      id="exampleModalR1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-radius-5 border-top-model-red  position-relative">
                          <div className="checkModal1">
                            <i className="fa fa-solid fa-xmark"></i>
                          </div>
                          <div className="modal-body text-center p-5 pt-3">
                            <h3 className="fw-bold">Content Rejected</h3>
                            <p className="greyLight">
                              Unfortunately content has been rejected.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {/* 1st Modal */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-5 border-radius-5 border-top-model">
                      <div className="modal-body text-center">
                        <h3 className="fw-bold">
                          Are you sure you want to Approve these Content?
                        </h3>
                        <div className="col-12 d-flex justify-content-center mt-4">
                          <div className="cancelBtn">
                            <button
                              onClick={() => handleApproveModalClose()}
                              disabled={loading}
                              className="btn btn-reject border-radius-5 me-3 px-4"
                            >
                              <span className="">No</span>
                            </button>
                          </div>
                          <div className="saveBtn">
                            <button
                              onClick={() => handleClickApprovedYes()}
                              disabled={loading}
                              className="btn bgBlack text-white px-4"
                            >
                              <span className="">
                                {loading && (
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                )}
                                Yes
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="exampleModal1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-5 border-radius-5 border-top-model">
                    <div className="modal-body text-center p-5">
                      <div className="checkModal">
                        <svg width="87" height="87" viewBox="0 0 87 87">
                          <g
                            id="Group_18145"
                            data-name="Group 18145"
                            transform="translate(-999 -439.563)"
                          >
                            <circle
                              id="Ellipse_729"
                              data-name="Ellipse 729"
                              cx="43.5"
                              cy="43.5"
                              r="43.5"
                              transform="translate(999 439.563)"
                              fill="#52c844"
                            />
                            <path
                              id="Path_12219"
                              data-name="Path 12219"
                              d="M0,5.694,11.057,22.67,43.875,0"
                              transform="translate(1018.472 476.383) rotate(-9)"
                              fill="none"
                              stroke="#fff"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className="modal-body text-center p-5">
                        <h3 className="fw-bold">Content Approved</h3>
                        <p className="greyLight">
                          Content Successfully approved. Now, You&rsquo;ll need
                          to wait for publisher assessment and feedback on your
                          content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
                  className="modal fade"
                  id="exampleModal1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-content border-radius-5 border-top-model  position-relative">
                    <div className="checkModal">
                      <svg width="87" height="87" viewBox="0 0 87 87">
                        <g
                          id="Group_18145"
                          data-name="Group 18145"
                          transform="translate(-999 -439.563)"
                        >
                          <circle
                            id="Ellipse_729"
                            data-name="Ellipse 729"
                            cx="43.5"
                            cy="43.5"
                            r="43.5"
                            transform="translate(999 439.563)"
                            fill="#52c844"
                          />
                          <path
                            id="Path_12219"
                            data-name="Path 12219"
                            d="M0,5.694,11.057,22.67,43.875,0"
                            transform="translate(1018.472 476.383) rotate(-9)"
                            fill="none"
                            stroke="#fff"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="modal-body text-center p-5">
                      <h3 className="fw-bold">Content Approved</h3>
                      <p className="greyLight">
                        Content Successfully approved. Now, You&rsquo;ll need to
                        wait for publisher assessment and feedback on your
                        content.
                      </p>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
          <div className="row h-100">
            {/* div For Preview Details */}
            <div className={rejectmode ? "col-6" : "col-9"}>
              <div className="main-card bg-white p-3">
                {!showPreview ? (
                  <>
                    {showContentDetails &&
                      showContentDetails?.map((ele, index) => {
                        return (
                          <div
                            key={index}
                            className={index < 1 ? "col-12" : "col-12 mt-3"}
                          >
                            <div
                              className="orangrBg border-radius-2 p-2"
                              onClick={() => {
                                setShowPreview(true);
                                setPreviewSelectedIndex(index);
                                setRemarkIndex(index);

                                setPreviewSelectedChapterName(
                                  ele?.chapter_title
                                );
                                setRemarkChapterName(ele?.chapter_title);
                                setChapterId(ele?.chapterEdition_id);
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <div className="bgCheckIcon rounded-circle me-2">
                                  <i className="fa fa-light fa-check"></i>
                                </div>
                                <p className="mb-0">
                                  Chapter {index + 1} -
                                  <span className="fw-bold">
                                    {ele?.chapter_title}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <ShowPreviewDetails
                    // data={showContentDetails}
                    previewSelectedIndex={previewSelectedIndex}
                    previewSelectedChapterName={previewSelectedChapterName}
                    handleClickBack={handleClickBack}
                    chapter_id={chapterId}
                  />
                )}
              </div>
            </div>
            {/* <div className={rejectmode ? "col-6" : "col-9"}>
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
                              <div className="d-flex">
                                <input
                                  type="text"
                                  className="form-control main-card px-3 py-2  border-0"
                                  placeholder="Enter Chapter Name"
                                  name="audio"
                                />
                                <div className="forword-icon px-2 ms-1 pt-2">
                                  <i className="fa-solid fa-chevron-right"></i>
                                </div>
                              </div>
                              <div className="verseText d-flex">
                                <iframe
                                  src="https://www.youtube.com/embed/hGtmRwoCMvE"
                                  allowfullscreen
                                  className="me-2"
                                ></iframe>

                                <div>
                                  <p className="textBlack mb-0">
                                    Ramas Journey
                                  </p>

                                  <small className="defaultGrey">
                                    Size : 35 MB
                                  </small>
                                </div>
                              </div>
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
                              <div className="d-flex">
                                <input
                                  type="text"
                                  className="form-control main-card px-3 py-2  border-0"
                                  placeholder="Enter Chapter Name"
                                  name="audio"
                                />
                                <div className="forword-icon px-2 ms-1 pt-2">
                                  <i className="fa-solid fa-chevron-right"></i>
                                </div>
                              </div>
                              <div className="verseText d-flex">
                                <iframe
                                  src="https://www.youtube.com/embed/hGtmRwoCMvE"
                                  allowfullscreen
                                  className="me-2"
                                ></iframe>

                                <div>
                                  <p className="textBlack mb-0">
                                    Ramas Journey
                                  </p>

                                  <small className="defaultGrey">
                                    Size : 35 MB
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* div For Remark */}
            {rejectmode ? (
              <div className="col-3">
                <div className="main-card bg-white p-3" id="list">
                  <h4 className="fw-bold">Remark</h4>
                  <hr className="borderHr my-3"></hr>

                  <p className="fw-bold">
                    Chapter {remarkindex + 1} &nbsp; &gt; &nbsp;{" "}
                    {remarkChapterName}
                  </p>

                  <hr className="borderHr my-4"></hr>

                  <textarea
                    className="form-control mt-4"
                    placeholder="Make a comment"
                    value={memoizedRemarkValues[memoizedRemarkIndex]?.remark}
                    onChange={handleRemarkChange}
                    // value={remarkValues[remarkindex]?.remark}
                    // onChange={(e) => {
                    //   handleRemarkChange(e);
                    // }}
                    // onChange={handleRemarkChange}
                    rows="5"
                  ></textarea>
                </div>
              </div>
            ) : null}
            {/* <div className="col-3">
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
                        <span className="fw-bold textBlack">
                          Send for Review
                        </span>
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
                        <span className="fw-bold defaultGrey">
                          Under Review
                        </span>
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
              </div> */}
            <TimeLine id={id} flag="Pending" />
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default ModeratorPending;
