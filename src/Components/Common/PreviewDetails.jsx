/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../../Api/Api";
import { useRef } from "react";
import Vimeo from "@vimeo/player";

export default function PreviewDetails(props) {
  const { id, flagForChapter, ratingFlag } = props;

  // console.log("flagForChapter", flagForChapter);

  const [showContentDetails, setShowContentDetails] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSelectedIndex, setPreviewSelectedIndex] = useState("");
  const [previewSelectedChapterName, setPreviewSelectedChapterName] =
    useState("");
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const [chapterId, setChapterId] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(0);

  const handleClickBack = (e) => {
    e.preventDefault();
    setShowPreview(false);
    setPreviewSelectedIndex("");
    setPreviewSelectedChapterName("");
    setChapterId("");
  };

  const [rating, setRating] = useState(0); // State to store the selected rating

  // Function to handle rating selection
  const handleRatingChange = useCallback((value) => {
    setRating(value);
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          dummy_rating: value,
        },
        // course_id: parseInt(id),
        agent: "rating",
        function: "rating",
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          // console.log("ChapterList ", response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
        },
        // course_id: id,
        agent: "rating",
        function: "get_list",
      }).then((response) => {
        // console.log("get apifor dummy rating ", response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          const fetchedDummyRating = response?.data?.data?.data?.dummy_rating;
          if (fetchedDummyRating !== rating) {
            setRating(fetchedDummyRating);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // Api for get chapter details
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
          flag: flagForChapter,
        },
        agent: "course",
        function: "getChapterList",
      }).then((response) => {
        // console.log("ChapterList ", response?.data?.data?.data);
        if (response?.data?.data?.data?.length) {
          setShowContentDetails(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Preview Modal
  const ShowPreviewDetails = useCallback(
    ({
      data,
      previewSelectedIndex,
      previewSelectedChapterName,
      handleClickBack,
      chapter_id,
    }) => {
      //console.log("chapter_id", chapter_id);
      const [moduleList, setModuleList] = useState([]);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        try {
          API?.CommanApiCall({
            data: {
              chapter_id: chapter_id,
              flag: flagForChapter,
            },
            agent: "course",
            function: "getModuleList",
          }).then((response) => {
            //console.log("Module Details ", response?.data?.data?.data);
            setModuleList(response?.data?.data?.data);
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
      }, [chapter_id]);

      // Vimeo Player Components
      // const VimeoPlayer = ({ videoId }) => {
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
      // };

      // const VimeoPlayerComponent = (id) => {
      //   var regex = /vimeo\.com\/(?:.*\/)?(\d+)/;
      //   var match = id?.VimeoUrlIdLink?.match(regex);

      //   if (match && match[1]) {
      //     //return match[1];
      //     <div>
      //       <VimeoPlayer videoId={match[1]} />
      //     </div>;
      //   } else {
      //     // console.error("Invalid Vimeo URL");
      //     // return null;
      //   }

      //   // console.log("id", id?.VimeoUrlIdLink);
      //   //const vimeoUrlForId = id?.VimeoUrlIdLink;
      //   const vimeoUrlForId = "https://vimeo.com/manage/videos/837110972";

      //   const videoId = vimeoUrlForId?.split("/")?.pop();
      //   // console.log("videoId", videoId);

      //   return (
      //     <div>
      //       <VimeoPlayer videoId={videoId} />
      //     </div>
      //   );
      // };

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
        <div className="bg-white p-3">
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
                                className={`accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none ${
                                  isAccordionActive ? "" : "collapsed"
                                }`}
                                // className="accordion-button orangrBg border-radius-2 py-2 px-3 shadow-none"
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
                              // className="accordion-collapse collapse show"
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
    <div className="col-9">
      <div className="main-card bg-white p-3">
        <h4 className="fw-bold">Preview</h4>
        <hr className="borderHr my-3"></hr>
        <div className="row">
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
                          setPreviewSelectedChapterName(ele?.chapter_title);
                          setChapterId(
                            ele?.chapter_id || ele?.chapterEdition_id
                          );
                          // console.log(ele?.chapter_id);
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
              data={showContentDetails}
              previewSelectedIndex={previewSelectedIndex}
              previewSelectedChapterName={previewSelectedChapterName}
              handleClickBack={handleClickBack}
              chapter_id={chapterId}
            />
          )}
        </div>
      </div>
      {/* <div className="main-card bg-white p-3 mt-4">
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
                      <p className="mb-0 fw-bold">Lorem Ipsum 1</p>
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
                        <p className="textBlack mb-0">Ramas Journey</p>

                        <small className="defaultGrey">Size : 35 MB</small>
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
                      <p className="mb-0 fw-bold">Lorem Ipsum 2</p>
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
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {ratingFlag ? (
        <div className="main-card bg-white p-3">
          <div className="row mt-4">
            <div className="col-12">
              <h4 className="fw-bold mb-3">Provide Dummy Rating</h4>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    disabled={
                      TajurbaAdmin_priviledge_data &&
                      TajurbaAdmin_priviledge_data.some(
                        (ele) =>
                          ele.title === "Content Creation" &&
                          ele.is_active === true &&
                          ele?.submenu &&
                          ele?.submenu.some(
                            (sub) =>
                              sub.title === "Moderator" &&
                              sub.is_active === true &&
                              sub.is_edit !== true
                          )
                      )
                    }
                    checked={rating === 0}
                    onChange={() => handleRatingChange(0)}
                  />
                  <label
                    className="form-check-label greyLight"
                    htmlFor="inlineRadio1"
                  >
                    User Rating
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                    disabled={
                      TajurbaAdmin_priviledge_data &&
                      TajurbaAdmin_priviledge_data.some(
                        (ele) =>
                          ele.title === "Content Creation" &&
                          ele.is_active === true &&
                          ele?.submenu &&
                          ele?.submenu.some(
                            (sub) =>
                              sub.title === "Moderator" &&
                              sub.is_active === true &&
                              sub.is_edit !== true
                          )
                      )
                    }
                    checked={rating !== 0}
                    onChange={() => handleRatingChange(1)}
                  />
                  <label
                    className="form-check-label greyLight"
                    htmlFor="inlineRadio2"
                  >
                    Dummy Rating
                  </label>
                </div>
              </div>
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
                      sub.is_edit !== true
                  )
              ) ? null : (
                <div className="d-flex mt-2">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <i
                      key={index}
                      className={`fa fa-solid fa-star ${
                        index <= rating ? "consumerCard" : "lightGrey"
                      } me-1`}
                      onClick={() => handleRatingChange(index)}
                      // onClick={
                      //   TajurbaAdmin_priviledge_data &&
                      //   TajurbaAdmin_priviledge_data.some(
                      //     (ele) =>
                      //       ele.title === "Content Creation" &&
                      //       ele.is_active === true &&
                      //       ele?.submenu &&
                      //       ele?.submenu.some(
                      //         (sub) =>
                      //           sub.title === "Moderator" &&
                      //           sub.is_active === true &&
                      //           sub.is_edit !== true
                      //       )
                      //   )
                      //     ? () => handleRatingChange(index)
                      //     : undefined
                      // }
                    ></i>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
