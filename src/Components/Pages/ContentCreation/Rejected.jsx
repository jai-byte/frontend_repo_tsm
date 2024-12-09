/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
// import bookTitle from "../../../assets/images/Notific.png";
import HeaderContent from "../../Common/HeaderContent";
import API from "../../../Api/Api";
import AdminRoute from "../../../Route/RouteDetails";
import { useRef } from "react";
import Vimeo from "@vimeo/player";
import TimeLine from "../../Common/TimeLine";

const Rejected = () => {
  const { id } = useParams();
  //const navigate = useNavigate();

  const [showContentDetails, setShowContentDetails] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSelectedIndex, setPreviewSelectedIndex] = useState("");
  const [previewSelectedChapterName, setPreviewSelectedChapterName] =
    useState("");
  const [chapterId, setChapterId] = useState("");
  const [remarkindex, setRemarkIndex] = useState(0);
  const [remarkChapterName, setRemarkChapterName] = useState("");
  const [remark, setRemark] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(0);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

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
          setRemarkChapterName(response?.data?.data?.data[0]?.chapter_title);
          setChapterId(
            response?.data?.data?.data[0]?.chapter_id ||
              response?.data?.data?.data[0]?.chapterEdition_id
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          setRemark(response?.data?.data?.data?.remark);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [chapterId, remark]);

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
      //       console.error("Invalid Vimeo URL");
      //       return null;
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

      const VimeoPlayer = ({ videoId }) => {
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
      };

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
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
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
    []
  );

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
                to="/submitted"
                state={{
                  creator_previousTab: "Rejected",
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
            {TajurbaAdmin_priviledge_data &&
            TajurbaAdmin_priviledge_data.some(
              (ele) =>
                ele.title === "Content Creation" &&
                ele.is_active === true &&
                ele?.submenu &&
                ele?.submenu.some(
                  (sub) =>
                    sub.title === "Creator" &&
                    sub.is_active === true &&
                    sub?.submenuChild.some(
                      (subMenuChild) =>
                        subMenuChild.title === "Submitted" &&
                        subMenuChild.is_active === true &&
                        subMenuChild.is_edit === true
                    )
                )
            ) ? (
              <div className="col-6">
                <NavLink
                  to={`../${AdminRoute?.ContentCreation?.CreateContent.replace(
                    "/:id",
                    ""
                  )}/${id}`}
                  state={{
                    UpdateRejectedContent: parseInt(3),
                  }}
                  className=" ms-2 btn bgBlack text-white border-0 px-4 float-end w-auto"
                >
                  <span>Update Content</span>
                </NavLink>
              </div>
            ) : null}
          </div>
          <div className="row h-100">
            <div className="col-xl-6">
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
                                setChapterId(
                                  ele?.chapter_id || ele?.chapterEdition_id
                                );
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
                  value={remark || "No remark added for this Chapter..."}
                  disabled
                  rows="5"
                ></textarea>
              </div>
            </div>

            <TimeLine id={id} flag="Rejected" />
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Rejected;
