/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import bookTitle from "../../../assets/images/Notific.png";
import IconGallery from "../../../assets/images/IconGallery.svg";
import AdminRoute from "../../../Route/RouteDetails";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation } from "react-router-dom";
import {
  SendForReviewSvg,
  SvgForEditLogo,
  PdfLogoSvg,
} from "../../Common/SVGForCreateContent";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../../../Api/config";
import { Document, Page, pdfjs } from "react-pdf";
import { useRef } from "react";
import Vimeo from "@vimeo/player";
import { useFormik } from "formik";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const CreateContent = () => {
  //********* */ Create Content 1 St form Part For Creating chapter and Modules *********************************************
  const { id } = useParams();
  const navigate = useNavigate();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const location = useLocation();
  const UpdateRejectedContent = location?.state?.UpdateRejectedContent;
  const [currentTab, setCurrentTab] = useState(
    location?.state?.CreateContentTab || "CreateContent-tab"
  );

  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
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
                subMenuChild.title === "Draft" &&
                subMenuChild.is_active === true &&
                subMenuChild.is_edit === true
            )
        )
    );

  const bottomRef = useRef(null);

  const [chapters, setChapters] = useState([
    {
      chapter_title: "",
      course_id: id,
      chapter_id: "",
      _id: "",
      is_deleted: false,
      // is_ChapterSave: false,
      module: [
        {
          course_id: id,
          module_id: "",
          _id: "",
          module_header: "",
          module_description: "",
          module_link: "",
          module_pdf: "",
          is_deleted: false,
        },
      ],
    },
  ]);

  //  useEffect(() => {
  //     // Scroll to the bottom whenever messages change
  //     console.log("bottomRef", bottomRef);
  //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //  }, [chapters]);

  const [chapterBasicIndex, setChapterBasicIndex] = useState(0);
  const [moduleBasicIndex, setModuleBasicIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);

  // For User Details
  const [userDetails, setuserDetails] = useState({
    course_title: "",
    author_name: "",
    categoryName: "",
    cover_img: "",
  });

  const [communityId, setcommunityId] = useState("");

  const allChaptersHaveId = chapters?.every((chapter) => chapter._id !== "");

  // Functionality for Update the Details
  const [CategoryList, setCategoryList] = useState();
  const [errorMessage, SetErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.category) {
      errors.category = "Please select category";
    }
    if (!values.name) {
      errors.name = "Please enter category title";
    } else if (values.name.trim() === "") {
      errors.name = "Title cannot be blank";
    }
    if (!values.description) {
      errors.description = "Please enter description";
    } else if (values.description.trim() === "") {
      errors.description = "Description cannot be blank";
    }
    if (!values.author_name) {
      errors.author_name = "Please select author name";
    } else if (values.author_name.trim() === "") {
      errors.author_name = "author name cannot be blank";
    }
    if (!values.course_level) {
      errors.course_level = "Please select category course level";
    }

    if (!values.type) {
      errors.type = "Please enter type";
    }
    if (values.type === "Paid") {
      if (!values.amount) {
        errors.amount = "Please enter amount";
      }
    }

    if (!values.uploadedFile) {
      errors.uploadedFile = "Please upload Image";
    }

    // if (!values.Community) {
    //   errors.Community = "Please enter Community";
    // }
    // if (!values.cover_image) {
    //   errors.cover_image = "Please enter cover_image";
    // }
    // if (!values.detail_desciption) {
    //   errors.detail_desciption = "Please enter detail_desciption";
    // }
    console.log("Erroes", errors);
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      name: "",
      author_name: "",
      description: "",
      course_level: "",
      type: "",
      amount: "",
      Community: "",
      uploadedFile: "",
      detail_desciption: "",
      discount_amount: "",
      discount_tenure: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const errors = validate(values);

      if (Object.keys(errors).length === 0) {
        // console.log("Run vaidation function no errors");
        handleSave();
      } else {
        // console.log("Run vaidation function if errors is present ");

        console.log("Validation errors:", errors);
      }

      setSubmitting(false);
    },
    validate,
  });

  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          course: {
            category_id: formik.values.category,
            course_title: formik.values.name,
            author_name: formik.values.author_name,
            description: formik.values.description,
            cover_img: formik.values.uploadedFile,
            course_type: formik.values.type,
            amount: formik.values.type === "Paid" ? formik.values.amount : null,
            discount_amount:
              formik.values.type === "Paid"
                ? formik.values.discount_amount
                : null,
            discount_tenure:
              formik.values.type === "Paid"
                ? formik.values.discount_tenure
                : null,
            course_level: formik.values.course_level,
            // status: 0,
            courseedition_id: id,
          },
        },
        agent: "course",
      }).then((response) => {
        console.log("course", response);
        console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          toast?.success(response?.data?.data?.message);
          setTimeout(() => {
            $("#staticBackdrop").modal("hide");
          }, 1000);
        } else if (response?.data?.data?.status === 201) {
          SetErrorMessage(response?.data?.data?.message);

          setTimeout(() => {
            SetErrorMessage("");
          }, 5000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Category List API
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          category: [],
        },
        agent: "categories",
      }).then((response) => {
        console.log(response.data?.data);
        // if (response?.data?.data?.status === 200) {
        setCategoryList(response.data?.data);

        // }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api for FIle Upload

  const UploadFile = (e) => {
    // console.log("e", e.target.value);
    const file = e?.target?.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allowedTypes?.includes(file?.type)) {
      var myHeaders = new Headers();

      myHeaders.append("x-access-token", adminObject);

      var formdata = new FormData();
      formdata.append(
        "file",
        e.target.files[0]
        // "Screenshot from 2023-01-05 12-20-01.png"
      );
      formdata.append("action", "formcommand");
      formdata.append("docType", "profile");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        baseApi?.baseurl,
        // "https://server.qodequay.com/tajurba/dev/api/api/apppipeline/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          formik.setFieldValue("uploadedFile", result?.data?.data?.Location);
          // setUploadedFile(result?.data?.data?.Location);
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("Only jpg or png should be allowed");
    }
  };

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
        console.log("User details data ", response?.data?.data);
        //   setuserDetails((prevUserDetails) => ({
        //     ...prevUserDetails,
        //     course_title: response?.data?.data?.data?.course_title,
        //     author_name: response?.data?.data?.data?.author_name,
        //     categoryName: response?.data?.data?.data?.categoryName,
        //     cover_img: response?.data?.data?.data?.cover_img,
        //   }));
        formik.setValues({
          ...formik.values,
          name: response?.data?.data?.data?.course_title,
          author_name: response?.data?.data?.data?.author_name,
          // categoryName: response?.data?.data?.data?.categoryName,
          uploadedFile: response?.data?.data?.data?.cover_img,
          category: response?.data?.data?.data?.category_id,
          description: response?.data?.data?.data?.description,
          course_level: response?.data?.data?.data?.course_level,
          type: response?.data?.data?.data?.course_type,
          amount: response?.data?.data?.data?.amount,
          discount_amount: response?.data?.data?.data?.discount_amount,
          discount_tenure: response?.data?.data?.data?.discount_tenure,

          // Update other fields as needed
        });
        setcommunityId(response?.data?.data?.data?.community?.community_id);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api call for get Chapters
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
        },
        agent: "course",
        function: "getChapterList",
      }).then((response) => {
        //console.log("ChapterList ", response?.data?.data?.data);
        if (response?.data?.data?.data?.length) {
          setChapters((prevChapters) => {
            return response?.data.data?.data.map((chapter) => {
              getModuleDetails(chapter.chapterEdition_id);
              return {
                ...prevChapters[0],
                chapter_title: chapter.chapter_title,
                chapter_id: chapter.chapterEdition_id,
                _id: chapter._id,
                // is_ChapterSave: chapter.is_ChapterSave,
              };
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api call for get Module Details
  const getModuleDetails = (Chapter_id) => {
    try {
      API?.CommanApiCall({
        data: {
          chapter_id: Chapter_id,
        },
        agent: "course",
        function: "getModuleList",
      }).then((response) => {
        // console.log("Module Details ", response?.data?.data?.data);
        setChapters((prevChapters) => {
          return prevChapters.map((chapter) => {
            if (chapter.chapter_id === Chapter_id) {
              return {
                ...chapter,
                module: response?.data?.data?.data.map((mod) => ({
                  course_id: id,
                  module_id: mod?.module_id,
                  _id: mod?._id,
                  module_header: mod?.module_header,
                  module_description: mod?.module_description,
                  module_link: mod?.module_link,
                  module_pdf: mod?.module_pdf,
                })),
              };
            }
            return chapter;
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function for click on the specific chapter and get the values

  const handleClickChapter = (event, index) => {
    //console.log("chapterBasicIndex", chapterBasicIndex, index);
    event.preventDefault();

    const clickedChapter = { ...chapters[index] };

    //console.log("Clicked Chapter:", clickedChapter);

    setChapters((prevChapters) =>
      prevChapters.map((chap, i) => (i === index ? clickedChapter : chap))
    );
    setChapterBasicIndex(index);
    setModuleBasicIndex(0);
  };

  // Function for click on the specific Module and get the values

  const handleClickModule = (event, moduleIndex, chapIndex) => {
    event.preventDefault();
    setChapterBasicIndex(chapIndex);
    // console.log("moduleBasicIndex", moduleBasicIndex);
    // console.log("chapterBasicIndex", chapterBasicIndex, chapIndex);
    // console.log("chapters", chapters);

    setModuleBasicIndex(moduleIndex);

    setChapters((prevChapters) =>
      prevChapters.map((chap, i) =>
        i === chapIndex
          ? {
              ...chap,
              module: chap.module.map((module, j) =>
                j === moduleIndex ? { ...module } : module
              ),
            }
          : chap
      )
    );
  };

  // Function for enter chapter name
  const handleChangeChapterName = (chapterTitle, index) => {
    setChapters((prevChapters) => {
      return prevChapters.map((chapter, i) =>
        i === index ? { ...chapter, chapter_title: chapterTitle } : chapter
      );
    });
  };

  // Function for adding New CHapter
  const addChapter = (e) => {
    e.preventDefault();
    if (bottomRef.current) {
      // bottomRef.current.scrollIntoView({ behavior: "smooth" });
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    } else {
      console.log("bottomRef.current is null");
    }

    if (allChaptersHaveId) {
      const newChapter = {
        course_id: id,
        _id: "",
        chapter_title: "",
        chapter_id: "",
        is_deleted: false,
        // is_ChapterSave: false,
        module: [
          {
            course_id: id,
            module_header: "",
            _id: "",
            module_description: "",
            module_link: "",
            module_pdf: "",
            is_deleted: false,
          },
        ],
      };

      setChapters([...chapters, newChapter]);
      setChapterBasicIndex(chapters.length);
      setModuleBasicIndex(0);
    } else {
      window.$("#SaveChapterWarning").modal("show");
      //toast.error("Please Save The Chapter First");
    }
  };

  // Function For Close  Add chapter Warning the Modal
  const onClickOkayChapterModal = (e) => {
    e.preventDefault();
    window.$("#SaveChapterWarning").modal("hide");
  };

  // Function For Close  Add chapter Warning the Modal
  const onClickOkaySubmitModal = (e, modal) => {
    e.preventDefault();
    window.$(modal).modal("hide");
  };

  // Function for adding New Module
  const addModule = (e, index) => {
    //console.log("chapterBasicIndex", index);
    e.preventDefault();
    const updatedChapters = [...chapters];
    const selectedChapter = updatedChapters[index];

    const newModule = {
      course_id: id,
      module_header: "",
      module_id: "",
      _id: "",
      module_description: "",
      module_link: "",
      module_pdf: "",
      is_deleted: false,
    };

    selectedChapter.module.push(newModule);
    setChapters(updatedChapters);
    const newIndex = selectedChapter.module.length - 1;

    setModuleBasicIndex(newIndex);
    // setModuleBasicIndex(selectedChapter.module.length - 1);
  };

  // Function For Save Chapter
  const handleClickSaveChapter = (e) => {
    e.preventDefault();

    if (chapters[chapterBasicIndex]?.chapter_title) {
      setLoading(true);
      try {
        API?.CommanApiCall({
          data: {
            chapter: chapters[chapterBasicIndex],
          },
          agent: "course",
          function: "createContentEdition",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            // console.log(
            //   "Response After Save Chapter",
            //   response?.data?.data?.data
            // );
            const updatedChapters = [...chapters];
            updatedChapters[chapterBasicIndex].chapter_id =
              response.data.data?.data?.chapterEdition_id;
            updatedChapters[chapterBasicIndex]._id =
              response.data.data?.data?._id;
            // updatedChapters[chapterBasicIndex].module =
            //   response.data.data?.data?.module;
            // updatedChapters[chapterBasicIndex].is_ChapterSave =
            //   response.data.data?.data?.is_ChapterSave;
            setChapters(updatedChapters);
            getModuleDetails(response?.data?.data?.data?.chapterEdition_id);
            setLoading(false);
            toast.success(response?.data?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Chapter name is required");
    }
  };

  // Function for Change Module Content
  const handleChangeModuleContent = (fieldName, value) => {
    if (fieldName === "module_pdf") {
      // console.log("module_pdf", value.target.files[0]);
      const file = value?.target?.files[0];
      if (file?.type === "application/pdf") {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", adminObject);

        var formdata = new FormData();
        formdata.append("file", value.target.files[0]);

        // formdata.append("file", e.target.files[0]);
        formdata.append("action", "formcommand");
        formdata.append("docType", "profile");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(baseApi?.baseurl, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setChapters((prevChapters) => {
              return prevChapters.map((chapter, i) => {
                if (i === chapterBasicIndex) {
                  return {
                    ...chapter,
                    module: chapter.module.map((module, j) => {
                      if (j === moduleBasicIndex) {
                        return {
                          ...module,
                          [fieldName]: result?.data?.data?.Location,
                        };
                      }
                      return module;
                    }),
                  };
                }
                return chapter;
              });
            });
          })
          .catch((error) => console.log("error", error));
      } else {
        toast.error("Upload only PDF file");
      }
    } else {
      setChapters((prevChapters) => {
        return prevChapters.map((chapter, i) => {
          if (i === chapterBasicIndex) {
            return {
              ...chapter,
              module: chapter.module.map((module, j) => {
                if (j === moduleBasicIndex) {
                  return { ...module, [fieldName]: value };
                }
                return module;
              }),
            };
          }
          return chapter;
        });
      });
    }
  };

  // Function for delete data from content
  const handleDeleteFieldData = (e, field) => {
    e.preventDefault();

    setChapters((prevChapters) =>
      prevChapters.map((chapter, i) => {
        if (i === chapterBasicIndex) {
          return {
            ...chapter,
            module: chapter.module.map((module, j) =>
              j === moduleBasicIndex ? { ...module, [field]: "" } : module
            ),
          };
        }
        return chapter;
      })
    );
  };

  // Function for delete Module
  const handleDeleteModule = (e, chapterIndex, moduleIndex, _id) => {
    e.preventDefault();

    const updatedModuleForDelete = {
      ...chapters[chapterIndex]?.module[moduleIndex],
      is_deleted: true,
    };
    // console.log("updatedModuleForDelete", updatedModuleForDelete);
    // console.log("_id", _id);
    // console.log("chapterIndex", chapterIndex);
    if (_id) {
      setChapters((prevChapters) =>
        prevChapters.map((chap, i) =>
          i === chapterIndex
            ? {
                ...chap,
                module: chap.module.filter((module, j) => j !== moduleIndex),
              }
            : chap
        )
      );
      try {
        API?.CommanApiCall({
          data: updatedModuleForDelete,
          agent: "course",
          function: "deleteModule",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            // toast.success(response?.data?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setChapters((prevChapters) =>
        prevChapters.map((chap, i) =>
          i === chapterIndex
            ? {
                ...chap,
                module: chap.module.filter((module, j) => j !== moduleIndex),
              }
            : chap
        )
      );
    }

    setModuleBasicIndex(moduleIndex - 1);
    // Reset moduleBasicIndex if the deleted module is the currently selected module
    // if (
    //   chapterIndex === chapterBasicIndex &&
    //   moduleIndex === moduleBasicIndex
    // ) {
    //   setModuleBasicIndex(0);
    // }
  };

  // Function For delete Chapter
  const handleDeleteChapter = (e, chapterIndex) => {
    e.preventDefault();

    const updatedChapterForDelete = {
      ...chapters[chapterIndex],
      is_deleted: true,
    };

    // console.log("updatedChapterForDelete ", updatedChapterForDelete);

    if (chapters[chapterIndex]?._id) {
      try {
        API?.CommanApiCall({
          data: {
            chapter: updatedChapterForDelete,
          },
          agent: "course",
          function: "createContentEdition",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            // toast.success(response?.data?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
      }

      setChapters((prevChapters) =>
        prevChapters.filter((chapter, index) => index !== chapterIndex)
      );

      // Reset chapterBasicIndex to the previous index
      setChapterBasicIndex((prevIndex) =>
        chapterBasicIndex === chapterIndex
          ? Math.max(0, prevIndex - 1)
          : prevIndex
      );
    } else {
      setChapters((prevChapters) =>
        prevChapters.filter((chapter, index) => index !== chapterIndex)
      );

      // Reset chapterBasicIndex to the previous index
      setChapterBasicIndex((prevIndex) =>
        chapterBasicIndex === chapterIndex
          ? Math.max(0, prevIndex - 1)
          : prevIndex
      );
    }
  };

  // Function for Copy Module
  const handleDuplicateModule = (e, chapterIndex, moduleIndex) => {
    e.preventDefault();

    setChapters((prevChapters) => {
      const updatedChapters = [...prevChapters];
      const selectedChapter = { ...updatedChapters[chapterIndex] };
      const selectedModule = { ...selectedChapter.module[moduleIndex] };

      // Duplicate the selected module
      const duplicatedModule = { ...selectedModule, _id: "" };
      // console.log("duplicatedModule", duplicatedModule);

      //console.log("duplicatedModule", duplicatedModule);

      // Create a new array with the duplicated module
      const updatedModules = [...selectedChapter.module];
      updatedModules.splice(moduleIndex + 1, 0, duplicatedModule);

      // Update the current chapter with the new array
      updatedChapters[chapterIndex] = {
        ...selectedChapter,
        module: updatedModules,
      };

      return updatedChapters;
    });
  };

  // Function for show PDf

  const openPdfInNewPage = (e, pdfLink) => {
    e.preventDefault();

    const pdfUrl = pdfLink;

    // Open the PDF in a new window or tab
    window.open(pdfUrl, "_blank");
  };

  //********* */ Create Content 2 St form Part For Creating Assessment *********************************************
  const [assessment, setAssessment] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctanswer: "",
      course_id: id,
      assignment_id: "",
      is_deleted: false,
      _id: "",
    },
  ]);

  const [AssessmentIndex, setAssessmentIndex] = useState(0);
  const [assesmentFieldErrors, setAssesmentFieldErrors] = useState([]);
  const [assesmentLoading, setAssesmentLoading] = useState(false);

  const allAssessmentHaveId = assessment?.every((ass) => ass._id !== "");

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          course_id: parseInt(id),
        },
        agent: "course",
        function: "getAssessmentList",
      }).then((response) => {
        //console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          const responseData = response?.data?.data?.data;
          // console.log(
          //   "get assessment api response",
          //   response?.data?.data?.data
          // );
          if (response?.data?.data?.data?.length) {
            setAssessment(
              responseData.map((item) => ({
                question: item.question,
                option1: item.option1,
                option2: item.option2,
                option3: item.option3,
                option4: item.option4,
                correctanswer: item.correctanswer,
                assignment_id: item.assignment_id,
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

  const addAssessment = (e) => {
    e.preventDefault();
    const allAssementHaveId = assessment?.every((ass) => ass._id !== "");

    if (allAssementHaveId) {
      const newAssessment = {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctanswer: null,
        course_id: id,
        assignment_id: "",
        is_deleted: false,
        _id: "",
      };
      const updatedAssessment = [...assessment, newAssessment];
      setAssessment(updatedAssessment);
      setAssessmentIndex(assessment?.length);

      //// if you want to  switch newly created assement

      // Set the AssessmentIndex to the index of the new assessment
      // const newIndex = updatedAssessment.length - 1;
      // setAssessmentIndex(newIndex);
    } else {
      window.$("#SaveAssesmentWarning").modal("show");
    }
  };

  // Function For Close  Add Assessment Warning the Modal
  const onClickOkayAssessmentModal = (e) => {
    e.preventDefault();
    window.$("#SaveAssesmentWarning").modal("hide");
  };

  const handleChangeAssesmentContent = (field, value) => {
    const updatedAssessment = [...assessment];
    const currentAssessment = { ...updatedAssessment[AssessmentIndex] };
    currentAssessment[field] = value;
    updatedAssessment[AssessmentIndex] = currentAssessment;
    setAssessment(updatedAssessment);
  };

  const handleClickAssessment = (event, index) => {
    event.preventDefault();
    setAssessmentIndex(index);
    // You can now access the current assessment using assessment[index]
    const currentAssessment = assessment[index];
    // Example: Set some default values for the clicked assessment
    const updatedAssessment = {
      ...currentAssessment,
    };
    // Update the state with the modified assessment
    const newAssessmentArray = [...assessment];
    newAssessmentArray[index] = updatedAssessment;
    setAssessment(newAssessmentArray);
  };

  // Function for delete the assessment
  const handleDeleteAssessment = (e, index, assignment_id) => {
    e.preventDefault();

    const updatedAssessment = [...assessment];

    if (assignment_id) {
      updatedAssessment[index].is_deleted = true;
      try {
        API?.CommanApiCall({
          data: {
            assignment: updatedAssessment[index],
          },
          agent: "course",
          function: "addCourseAssessment",
        }).then((response) => {
          // console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            //toast.success(response?.data?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
      }

      updatedAssessment.splice(index, 1);
      setAssessment(updatedAssessment);
      const previousIndex = Math.max(0, index - 1); // Ensure it doesn't go below 0
      setAssessmentIndex(previousIndex);
    } else {
      updatedAssessment.splice(index, 1);
      setAssessment(updatedAssessment);
      const previousIndex = Math.max(0, index - 1); // Ensure it doesn't go below 0
      setAssessmentIndex(previousIndex);
    }
  };

  // Function for Save Assessment

  const handleClickSaveAssessment = (e) => {
    e.preventDefault();

    // Validate the current assessment values
    const currentAssessment = assessment[AssessmentIndex];
    const errors = validateAssessmentValues(currentAssessment);

    // If there are errors, update the errors state
    if (Object.keys(errors).length > 0) {
      setAssesmentFieldErrors({
        ...assesmentFieldErrors,
        [AssessmentIndex]: errors,
      });
    } else {
      // If no errors, clear the errors for the current index
      setAssesmentLoading(true);
      const updatedErrors = { ...assesmentFieldErrors };
      delete updatedErrors[AssessmentIndex];
      setAssesmentFieldErrors(updatedErrors);
      //console.log("Assesment", currentAssessment);

      try {
        API?.CommanApiCall({
          data: {
            assignment: currentAssessment,
          },
          agent: "course",
          function: "addCourseAssessment",
        }).then((response) => {
          // console.log(response?.data?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            setAssesmentLoading(false);

            // Update assessment object at specific index
            const updatedAssessment = [...assessment]; // Create a new array
            updatedAssessment[AssessmentIndex] = {
              ...updatedAssessment[AssessmentIndex], // Copy the existing object
              _id: response?.data?.data?.data?._id,
              assignment_id: response?.data?.data?.data?.assignment_id,
            };
            setAssessment((prevAssessment) => updatedAssessment);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateAssessmentValues = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.question) {
      errors.question = "Please enter question";
    } else if (values.question.trim() === "") {
      errors.question = "Question can not be blank";
    }
    if (!values.option1) {
      errors.option1 = "Please enter option 1";
    } else if (values.option1.trim() === "") {
      errors.option1 = "Option 1 can not be blank";
    }
    if (!values.option2) {
      errors.option2 = "Please enter option 2";
    } else if (values.option2.trim() === "") {
      errors.option2 = "Option 2 can not be blank";
    }
    if (!values.option3) {
      errors.option3 = "Please enter option 3";
    } else if (values.option3.trim() === "") {
      errors.option3 = "Option 3 can not be blank";
    }
    if (!values.option4) {
      errors.option4 = "Please enter option 4";
    } else if (values.option4.trim() === "") {
      errors.option4 = "Option 4 can not be blank";
    }
    if (!values.correctanswer) {
      errors.correctanswer = "Please select correct answer";
    }

    console.log("Erroes", errors);
    return errors;
  };

  // useEffect(() => {
  //   console.log("assessment", assessment);
  // }, [assessment]);

  // **********// Functionality for  Preview //*************************** */

  const [showPreview, setShowPreview] = useState(false);
  const [previewSelectedIndex, setPreviewSelectedIndex] = useState("");
  const [previewSelectedChapterName, setPreviewSelectedChapterName] =
    useState("");

  const handleClickBack = (e) => {
    e.preventDefault();
    setShowPreview(false);
    setPreviewSelectedIndex("");
    setPreviewSelectedChapterName("");
  };

  // Preview Modal
  const ShowPreviewDetails = ({
    data,
    previewSelectedIndex,
    previewSelectedChapterName,
    handleClickBack,
  }) => {
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
    //   var match = id?.match(regex);
    //   console.log("id", match);

    //   if (match && match[1]) {
    //     //return match[1];
    //     <div>
    //       <VimeoPlayer videoId={match[1]} />
    //     </div>;
    //   } else {
    //     console.error("Invalid Vimeo URL");
    //     // return null;
    //   }

    //   return (
    //     <div>
    //       <VimeoPlayer videoId={match[1]} />
    //     </div>
    //   );
    // };

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
      <div className="main-card bg-white p-3 shadow-none">
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
              {data &&
                data[previewSelectedIndex]?.module?.map((ele, index) => {
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
                          <div className="verseText d-flex">
                            {ele?.module_link ? (
                              <div>
                                <VimeoPlayer videoId={ele?.module_link} />
                              </div>
                            ) : null}

                            <div>
                              <p className="ms-3 textBlack mb-0">
                                {ele?.module_description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

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
  };

  // ***************************** save or Draft  Functionality**************************

  const handleClickSaveOrDraft = (e, status, actiononClick) => {
    e.preventDefault();
    console.log("Chapters on Save Draft", chapters);
    if (actiononClick === "submit") {
      if (allChaptersHaveId && allAssessmentHaveId) {
        try {
          API?.CommanApiCall({
            data: {
              course_id: id,
              status: status,
              community_id: communityId,
            },
            agent: "course",
            function: "updateCourseStatus",
          }).then((response) => {
            console.log(response?.data?.data);
            if (response?.data?.data?.status === 200) {
              // toast.success(response?.data?.data?.message);
              if (status == 0) {
                navigate(`../${AdminRoute?.ContentCreation?.Draft}`, {
                  state: {},
                });
              } else {
                document.getElementById("exampleModal").style.display = "block";
                document.getElementById("exampleModal").classList.add("show");
                setTimeout(() => {
                  document.getElementById("exampleModal").style.display =
                    "none";
                  document
                    .getElementById("exampleModal")
                    .classList.remove("show");
                  navigate(`../${AdminRoute?.ContentCreation?.Submitted}`, {
                    state: {},
                  });
                }, "2000");
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // window.$("#SaveChapterWarningForSubmit").modal("show");
        // // toast.error("Save Atleast 1 Chapter");
        if (!allChaptersHaveId) {
          window.$("#SaveChapterWarningForSubmit").modal("show");
        } else if (!allAssessmentHaveId) {
          window.$("#SaveAssessmentWarningForSubmit").modal("show");
        }
        // toast.error("Save Atleast 1 Chapter");
      }
    } else {
      try {
        API?.CommanApiCall({
          data: {
            course_id: id,
            status: status,
            community_id: communityId,
          },
          agent: "course",
          function: "updateCourseStatus",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            // toast.success(response?.data?.data?.message);
            if (status == 0) {
              navigate(`../${AdminRoute?.ContentCreation?.Draft}`, {
                state: {},
              });
            } else {
              document.getElementById("exampleModal").style.display = "block";
              document.getElementById("exampleModal").classList.add("show");
              setTimeout(() => {
                document.getElementById("exampleModal").style.display = "none";
                document
                  .getElementById("exampleModal")
                  .classList.remove("show");
                navigate(`../${AdminRoute?.ContentCreation?.Submitted}`, {
                  state: {},
                });
              }, "2000");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content pb-3">
        <div className="page-content pe-0">
          {/* start page title */}
          <form>
            <div className="row">
              <div className="col-12">
                <div className="page-title-box titleInfo">
                  <h4 className="page-title mb-0 font-size-18 fw-normal lh-lg pt-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="colSelf ">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            src={formik?.values?.uploadedFile}
                            className="img-fluid bookTitle me-2"
                          ></img>
                          <small>Title</small>
                          {/* <small className="fw-bold ms-2">{formik?.values?.name}</small> */}
                          {formik?.values?.name?.length > 15 ? (
                            <small
                              className="fw-bold ms-2"
                              data-toggle="tooltip"
                              title={formik?.values?.name}
                            >
                              {formik?.values?.name?.substring(0, 15)}...
                            </small>
                          ) : (
                            <small className="fw-bold ms-2">
                              {formik?.values?.name}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="colSelf border-right-grey height"></div>
                      <div className="colSelf">
                        <div className="d-flex justify-content-center">
                          <small>Category</small>
                          <small className="fw-bold ms-2">
                            {CategoryList &&
                              CategoryList?.map((ele, index) => {
                                if (
                                  ele?.category_id == formik?.values?.category
                                ) {
                                  return ele?.category_name; // Return category_name if the condition is met
                                }
                                return null; // Return null if the condition is not met
                              })}
                          </small>
                        </div>
                      </div>
                      <div className="colSelf border-right-grey height"></div>
                      <div className="colSelf">
                        <div className="d-flex justify-content-center">
                          <small>Author</small>
                          <small className="fw-bold ms-2">
                            {formik?.values?.author_name}
                          </small>
                        </div>
                      </div>
                      <div className="colSelf border-right-grey height"></div>

                      <div className="colSelf d-flex justify-content-center align-items-center">
                        {/* Button trigger modal */}

                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          {SvgForEditLogo}
                        </button>
                        {/* Modal */}
                      </div>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
            {/* Modal For on Submit assesment tab */}
            <div
              className="modal fade"
              id="SaveAssessmentWarningForSubmit"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-5 border-radius-5 border-top-model-black">
                  <div className="modal-body text-center">
                    <h3 className="fw-bold">
                      {/* To Submit the content you need to save all created
                        chapters. */}
                      To Submit the content you need save atleast 1 assessment.
                    </h3>
                    <div className="col-12 d-flex justify-content-center mt-4">
                      <div className="saveBtn">
                        <button
                          onClick={(e) => {
                            onClickOkaySubmitModal(
                              e,
                              "#SaveAssessmentWarningForSubmit"
                            );
                          }}
                          className="btn bgBlack text-white px-4"
                        >
                          <span className="">Okay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="SaveChapterWarningForSubmit"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-5 border-radius-5 border-top-model-black">
                  <div className="modal-body text-center">
                    <h3 className="fw-bold">
                      To Submit the content you need to save all created
                      chapters.
                    </h3>
                    <div className="col-12 d-flex justify-content-center mt-4">
                      <div className="saveBtn">
                        <button
                          onClick={(e) => {
                            onClickOkaySubmitModal(
                              e,
                              "#SaveChapterWarningForSubmit"
                            );
                          }}
                          className="btn bgBlack text-white px-4"
                        >
                          <span className="">Okay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: "1000px" }}
              >
                <div className="modal-content main-card">
                  <div className="modal-header border-0">
                    <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                      Edit Cover Content
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {" "}
                    <div className="row" id="createContent">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row justify-content-between ">
                          <div className="col-xl-6 col-lg-6">
                            {errorMessage ? (
                              <span className="text-danger text-end">
                                {errorMessage}
                              </span>
                            ) : null}

                            <div className="me-xl-5">
                              {/* content title */}
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Category
                                  </label>
                                  <select
                                    className="form-select w-50 border-radius-2"
                                    aria-label="Default select example"
                                    name="category"
                                    disabled={!CheckAccess}
                                    value={formik?.values?.category}
                                    onChange={formik.handleChange}
                                  >
                                    <option selected="" value="">
                                      Select
                                    </option>
                                    {CategoryList &&
                                      CategoryList?.map((ele, index) => {
                                        return (
                                          <option
                                            selected=""
                                            value={ele?.category_id}
                                            key={index}
                                            //  checked={formik.values.category.includes(
                                            //    ele
                                            //  )}
                                            onChange={(e) => {
                                              const isChecked =
                                                e.target.checked;
                                              if (isChecked) {
                                                formik.setFieldValue(
                                                  "category",
                                                  [
                                                    ...formik.values.category,
                                                    item,
                                                  ],
                                                  true
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  "category",
                                                  formik.values.category.filter(
                                                    (selectedOption) =>
                                                      selectedOption !== item
                                                  ),
                                                  true
                                                );
                                              }
                                            }}
                                          >
                                            {ele?.category_name}
                                          </option>
                                        );
                                      })}
                                    {/* <option selected="">Select</option>
                          <option value="Marketing">Marketing</option> */}
                                  </select>
                                </div>
                                {formik.errors.category &&
                                formik.touched.category ? (
                                  <div className="text-danger">
                                    {formik.errors.category}
                                  </div>
                                ) : null}
                              </div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Course Title
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    id="Title"
                                    name="name"
                                    disabled={!CheckAccess}
                                    value={formik?.values?.name}
                                    onChange={formik.handleChange}
                                  />
                                </div>
                                {formik.errors.name && formik.touched.name ? (
                                  <div className="text-danger">
                                    {formik.errors.name}
                                  </div>
                                ) : null}
                              </div>
                              {/* author name */}
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Author Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter author name"
                                    name="author_name"
                                    disabled={!CheckAccess}
                                    value={formik?.values?.author_name}
                                    onChange={formik.handleChange}
                                  />
                                </div>
                                {formik.errors.author_name &&
                                formik.touched.author_name ? (
                                  <div className="text-danger">
                                    {formik.errors.author_name}
                                  </div>
                                ) : null}
                              </div>
                              {/* contengt decription */}
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    {" "}
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Give description
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Describe the topic in detail"
                                    id="Title"
                                    name="description"
                                    disabled={!CheckAccess}
                                    value={formik?.values?.description}
                                    onChange={formik.handleChange}
                                    rows={4}
                                    // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                                  />
                                </div>
                                {formik.errors.description &&
                                formik.touched.description ? (
                                  <div className="text-danger">
                                    {formik.errors.description}
                                  </div>
                                ) : null}
                              </div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Select the course level
                                  </label>
                                  <select
                                    className="form-select border-radius-2"
                                    aria-label="Default select example"
                                    name="course_level"
                                    disabled={!CheckAccess}
                                    value={formik?.values?.course_level}
                                    onChange={formik.handleChange}
                                  >
                                    <option selected="" value="">
                                      Select the course level
                                    </option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">
                                      Intermediate
                                    </option>
                                    <option value="Advanced">Advanced</option>
                                  </select>
                                </div>
                                {formik.errors.course_level &&
                                formik.touched.course_level ? (
                                  <div className="text-danger">
                                    {formik.errors.course_level}
                                  </div>
                                ) : null}
                              </div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Select the type of account
                                  </label>
                                  <div className="ms-2">
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="inlineRadio1"
                                        value="Free"
                                        disabled={!CheckAccess}
                                        checked={formik.values.type === "Free"}
                                        onChange={formik.handleChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="inlineRadio1"
                                      >
                                        Free
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="inlineRadio2"
                                        value="Paid"
                                        disabled={!CheckAccess}
                                        checked={formik.values.type === "Paid"}
                                        onChange={formik.handleChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="inlineRadio2"
                                      >
                                        Paid
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                {formik.errors.type && formik.touched.type ? (
                                  <div className="text-danger">
                                    {formik.errors.type}
                                  </div>
                                ) : null}
                              </div>
                              {formik.values.type === "Paid" ? (
                                <div className="row mb-3" id="rupees">
                                  <div className="col-12">
                                    <label className="form-label">
                                      <span className="mandatory-star me-1">
                                        *
                                      </span>
                                      Mention amount of your course along with
                                      one year tenure for community
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control w-70"
                                      placeholder="₹ 3500"
                                      name="amount"
                                      disabled={!CheckAccess}
                                      value={formik.values.amount}
                                      onChange={formik.handleChange}
                                    />
                                  </div>
                                  {formik.errors.amount &&
                                  formik.touched.amount ? (
                                    <div className="text-danger">
                                      {formik.errors.amount}
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                              {formik.values.type === "Paid" ? (
                                <div className="row mb-3" id="rupees">
                                  <div className="col-6">
                                    <label className="form-label">
                                      Mention the discounted amount
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="₹ 3500"
                                      name="discount_amount"
                                      disabled={!CheckAccess}
                                      value={formik.values.discount_amount}
                                      onChange={formik.handleChange}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label">
                                      Mention the tenure for discounted amount
                                      in days
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="5 days"
                                      name="discount_tenure"
                                      disabled={!CheckAccess}
                                      value={formik.values.discount_tenure}
                                      onChange={formik.handleChange}
                                    />
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6">
                            <div className="me-xl-5">
                              <label className="form-label">
                                <span className="mandatory-star me-1">*</span>
                                Course Cover Image{" "}
                                <span className="mandatory-star me-1">
                                  (Upload only jpg, jpeg ,png)
                                </span>
                              </label>

                              <div className="col-12 float-start mb-4 position-relative">
                                <p
                                  class="addUserPic p-0 w-70 mt-1 mb-1 d-flex justify-content-center align-items-center"
                                  style={{ height: "215px" }}
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <span class="text-center">
                                      {/* <img src={IconGallery} className="mb-2" /> */}

                                      {formik.values.uploadedFile ? (
                                        <img
                                          // crossOrigin="Anonymous"
                                          src={formik.values.uploadedFile}
                                          alt=""
                                          className="w-100"
                                          id="profile-picture-custome"
                                        />
                                      ) : (
                                        <img
                                          src={IconGallery}
                                          alt=""
                                          className=""
                                        />
                                      )}

                                      <br />
                                      {/* <a>Upload Image/Video</a> */}
                                    </span>
                                  </div>

                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="customFile"
                                    name="uploadedFile"
                                    //  multiple=""
                                    //  accept="image/*"
                                    disabled={!CheckAccess}
                                    accept="image/jpeg, image/png"
                                    onChange={(e) => {
                                      UploadFile(e);
                                    }}
                                  />
                                  <label
                                    class="custom-file-label mb-0"
                                    htmlForfor="customFile"
                                  ></label>
                                </p>
                                {formik.errors.uploadedFile &&
                                formik.touched.uploadedFile ? (
                                  <div className="text-danger">
                                    {formik.errors.uploadedFile}
                                  </div>
                                ) : null}
                              </div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Community Name
                                  </label>
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    placeholder="Enter Community Name"
                                    value={formik.values.name}
                                  />
                                </div>
                                {formik.errors.Community &&
                                formik.touched.Community ? (
                                  <div className="text-danger">
                                    {formik.errors.Community}
                                  </div>
                                ) : null}
                              </div>

                              {/* contengt decription */}
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    {" "}
                                    <span className="mandatory-star me-1">
                                      *
                                    </span>
                                    Give description
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Describe the topic in detail"
                                    rows="4"
                                    disabled
                                    value={formik.values.description}
                                    // id="Title"
                                    // name="detail_desciption"

                                    // onChange={formik.handleChange}
                                    // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                                  />
                                </div>
                                {formik.errors.detail_desciption &&
                                formik.touched.detail_desciption ? (
                                  <div className="text-danger">
                                    {formik.errors.detail_desciption}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {CheckAccess ? (
                            <div className="col-12">
                              <button
                                className="btn profileBtn border-radius-5 text-white border-radius-10 px-4 float-end"
                                onClick={formik.handleSubmit}
                                disabled={loading}
                                type="submit"
                              >
                                {loading && (
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                )}
                                Update
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="createNew">
              <div className="row position-relative mb-3 mt-2">
                <div className="col-9">
                  <ul
                    className="nav nav-tabs border-0 d-flex align-items-center"
                    id="myTab"
                    role="tablist"
                  >
                    <li>
                      <span
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        <div className="backArrow  me-3">
                          <i className="fa fa-solid fa-chevron-left text-dark"></i>
                        </div>
                      </span>
                    </li>
                    <li
                      onClick={() => {
                        setCurrentTab("CreateContent-tab");

                        navigate(
                          `../${AdminRoute?.ContentCreation?.CreateContent.replace(
                            "/:id",
                            ""
                          )}/${id}`,
                          {
                            state: { CreateContentTab: "CreateContent-tab" },
                          }
                        );
                      }}
                      className="nav-item px-1"
                      role="presentation"
                    >
                      <button
                        className={
                          currentTab === "CreateContent-tab"
                            ? "nav-link px-4 active"
                            : "nav-link px-4"
                        }
                        id="CreateContent-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Create Content
                      </button>
                    </li>
                    <li
                      onClick={() => {
                        setCurrentTab("Assessment-tab");
                        navigate(
                          `../${AdminRoute?.ContentCreation?.CreateContent.replace(
                            "/:id",
                            ""
                          )}/${id}`,
                          {
                            state: { CreateContentTab: "Assessment-tab" },
                          }
                        );
                      }}
                      className="nav-item px-1"
                      role="presentation"
                    >
                      <button
                        className={
                          currentTab === "Assessment-tab"
                            ? "nav-link px-4 active"
                            : "nav-link px-4"
                        }
                        // className="nav-link px-4"
                        id="Assessment-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Assessment
                      </button>
                    </li>
                    <li
                      onClick={() => {
                        setCurrentTab("Preview-tab");
                        navigate(
                          `../${AdminRoute?.ContentCreation?.CreateContent.replace(
                            "/:id",
                            ""
                          )}/${id}`,
                          {
                            state: { CreateContentTab: "Preview-tab" },
                          }
                        );
                      }}
                      className="nav-item px-1"
                      role="presentation"
                    >
                      <button
                        className={
                          currentTab === "Preview-tab"
                            ? "nav-link px-4 active"
                            : "nav-link px-4"
                        }
                        // className="nav-link px-4"
                        id="Preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Preview
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-3">
                  {CheckAccess ? (
                    <div className="d-flex justify-content-end">
                      <div className="cancelBtn">
                        <NavLink
                          onClick={(e) => {
                            handleClickSaveOrDraft(e, 0, "draft");
                          }}
                          className="btn btn-reject me-3 px-4 border-radius-5"
                        >
                          <span className="">Draft</span>
                        </NavLink>
                      </div>

                      <div className="saveBtn ms-2">
                        <button
                          className="btn bgBlack text-white border-radius-5 px-4 float-end"
                          //type="submit"
                          // data-bs-toggle="modal"
                          // data-bs-target="#exampleModal"
                          onClick={(e) => {
                            handleClickSaveOrDraft(
                              e,
                              UpdateRejectedContent ? UpdateRejectedContent : 1,
                              "submit"
                            );
                          }}
                        >
                          <span>Submit</span>
                        </button>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-5">
                              <div className="modal-body text-center">
                                {SendForReviewSvg}
                                <h2 className="textBlack fw-bold text-center my-4">
                                  Sent for Review
                                </h2>
                                <p className="greyLight">
                                  Your content has been successfully submitted
                                  to the assigned reviewers. Kindly await their
                                  assessment and feedback on your submission.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* end page title */}
              <div className="tab-content" id="myTabContent">
                <div
                  className={
                    currentTab === "CreateContent-tab"
                      ? "tab-pane fade show active"
                      : "tab-pane fade show "
                  }
                  // className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="CreateContent-tab"
                >
                  <div className="row">
                    <div className="col-3  p-2">
                      <div className="main-card bg-white mb-0">
                        <div className="scroll__y pb-5" ref={bottomRef}>
                          {chapters.map((chapter, index) => (
                            <div key={index} className="row mt-2">
                              {/* Chapter component */}
                              <div className="col-12">
                                <div className="slide">
                                  <ul className="mb-0">
                                    <li>
                                      <div className="row d-flex align-items-center">
                                        <div className="col-2 g-0">
                                          <button
                                            disabled={!CheckAccess}
                                            className="btn-main-light-orange px-3 d-flex justify-content-center align-items-center py-2"
                                            onClick={(e) => {
                                              addModule(e, index);
                                            }}
                                          >
                                            <span className="textBlack">+</span>
                                          </button>
                                        </div>
                                        <div className="col-9">
                                          <button
                                            className="btn rouded-0 btn-main-light-orange w-100 text-center py-2 border-radius-2"
                                            onClick={(event) =>
                                              handleClickChapter(event, index)
                                            }
                                          >
                                            <span> Chapter {index + 1}</span>
                                          </button>
                                        </div>
                                        {chapters?.length > 1 ? (
                                          <div className="col-1 g-0">
                                            <div className="dropdown">
                                              <button
                                                disabled={!CheckAccess}
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
                                                    handleDeleteChapter(
                                                      e,
                                                      index
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
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* Module */}
                              {chapter?.module?.map((module, moduleIndex) => {
                                return (
                                  <div key={moduleIndex} className="verseTitle">
                                    <div className="row d-flex align-items-center justify-content-end">
                                      <div className="col-8">
                                        <div className="d-flex">
                                          <div
                                            className={
                                              moduleIndex > 0
                                                ? "contentarrow2 contentarrowSelfHeight ms-2"
                                                : "contentarrow2 ms-2"
                                            }
                                          ></div>
                                          <div
                                            onClick={(event) =>
                                              handleClickModule(
                                                event,
                                                moduleIndex,
                                                index
                                              )
                                            }
                                            className="btn-main-light-orange text-center py-2 w-100 mt-2"
                                          >
                                            <span>
                                              Module {moduleIndex + 1}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-1 g-0">
                                        <div className="dropdown">
                                          <button
                                            type="button"
                                            disabled={!CheckAccess}
                                            className="btn dropdown-toggle p-0 dayFilter h-auto w-auto mt-2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="fas fa-ellipsis-vertical defaultGrey"></i>
                                          </button>
                                          <ul className="dropdown-menu dropdown-menu-end">
                                            <li
                                              onClick={(e) => {
                                                handleDuplicateModule(
                                                  e,
                                                  index,
                                                  moduleIndex
                                                );
                                              }}
                                            >
                                              <a className="dropdown-item font-size-12 ">
                                                Duplicate
                                              </a>
                                            </li>
                                            {chapter?.module.length > 1 ? (
                                              <li
                                                onClick={(e) => {
                                                  handleDeleteModule(
                                                    e,
                                                    index,
                                                    moduleIndex,
                                                    module?._id
                                                  );
                                                }}
                                              >
                                                <a className="dropdown-item font-size-12 ">
                                                  Delete
                                                </a>
                                              </li>
                                            ) : null}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                        <div className="">
                          {/* <div className="bottomSpan" /> */}
                          <button
                            className="btn bgOrange text-white w-100"
                            // fixedButton
                            disabled={!CheckAccess}
                            onClick={(e) => {
                              addChapter(e);
                            }}
                          >
                            <span className="">+ &nbsp; Create Chapter</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-2">
                          <p className="main-card px-3 py-2 me- border-0 subscriptionText mb-2">
                            Chapter {chapterBasicIndex + 1}
                          </p>
                        </div>
                        <div className="col-10 bg-white mb-0 shadow-none">
                          <div className="row">
                            <div className="col-10">
                              <input
                                placeholder="Enter Chapter Name"
                                disabled={!CheckAccess}
                                onChange={(e) =>
                                  handleChangeChapterName(
                                    e.target.value,
                                    chapterBasicIndex
                                  )
                                }
                                type="text"
                                className="form-control btn-main-light-orange w-100 mb-0 border-0 py-2 ps-2 mt-2"
                                value={
                                  chapters[chapterBasicIndex]?.chapter_title
                                }
                              />
                            </div>
                            {CheckAccess ? (
                              <div className="col-2 text-end">
                                <button
                                  className="btn bgSave text-white border-radius-2 px-3 mt-2 me-2"
                                  type="submit"
                                  disabled={loading}
                                  onClick={(e) => {
                                    handleClickSaveChapter(e);
                                  }}
                                >
                                  {" "}
                                  {loading && (
                                    <span
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  )}
                                  Save
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="main-card bg-white pb-5 h-93">
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-11 position-relative">
                                <div className="verseText">
                                  <input
                                    type="text"
                                    disabled={!CheckAccess}
                                    className="form-control btn-main-light-orange w-100 mb-0 border-0 py-2 ps-2"
                                    id="exampleInputEmail1"
                                    placeholder="Enter header"
                                    name="module_header"
                                    value={
                                      chapters[chapterBasicIndex]?.module[
                                        moduleBasicIndex
                                      ]?.module_header
                                    }
                                    onChange={(e) =>
                                      handleChangeModuleContent(
                                        "module_header",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>{" "}
                              {CheckAccess ? (
                                <div className="col-1 g-0 d-flex">
                                  <div
                                    onClick={(event) =>
                                      handleDeleteFieldData(
                                        event,

                                        "module_header"
                                      )
                                    }
                                    className="contentBggrey border-0"
                                  >
                                    <i className="fa-solid fa-trash-can darkGrey"></i>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            {/* <div className="row mt-2"></div> */}
                            <div className="row mt-3">
                              <div className="col-11 position-relative">
                                <div className="verseText">
                                  <textarea
                                    type="text"
                                    disabled={!CheckAccess}
                                    className="form-control border-0 btn-main-light-orange"
                                    placeholder="Enter description"
                                    rows="4"
                                    name="module_description"
                                    value={
                                      chapters[chapterBasicIndex]?.module[
                                        moduleBasicIndex
                                      ]?.module_description
                                    }
                                    onChange={(e) =>
                                      handleChangeModuleContent(
                                        "module_description",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              {CheckAccess ? (
                                <div className="col-1 g-0 d-flex">
                                  <div
                                    onClick={(event) =>
                                      handleDeleteFieldData(
                                        event,

                                        "module_description"
                                      )
                                    }
                                    className="contentBggrey border-0"
                                  >
                                    <i className="fa-solid fa-trash-can darkGrey"></i>
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            <div className="row mt-3">
                              <div className="col-11 position-relative">
                                <div className="verseText">
                                  <input
                                    type="text"
                                    disabled={!CheckAccess}
                                    className="form-control mb-1 btn-main-light-orange w-100 mb-0 border-0 py-2 ps-2"
                                    id="exampleInputEmail1"
                                    placeholder="Enter Vimeo link..."
                                    name="module_link"
                                    value={
                                      chapters[chapterBasicIndex]?.module[
                                        moduleBasicIndex
                                      ]?.module_link
                                    }
                                    onChange={(e) =>
                                      handleChangeModuleContent(
                                        "module_link",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>{" "}
                              {CheckAccess ? (
                                <div className="col-1 g-0 d-flex">
                                  <div
                                    onClick={(event) =>
                                      handleDeleteFieldData(
                                        event,
                                        "module_link"
                                      )
                                    }
                                    className="contentBggrey border-0"
                                  >
                                    <i className="fa-solid fa-trash-can darkGrey"></i>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="row mt-3">
                              <div className="col-11 position-relative">
                                <div className="verseText d-flex">
                                  {/* <iframe
                                      src="https://www.youtube.com/embed/hGtmRwoCMvE"
                                      allowfullscreen
                                      className="me-2"
                                    ></iframe> */}

                                  {/* <div>
                                      <p className="textBlack mb-0">
                                        Ramas Journey
                                      </p>

                                      <small className="defaultGrey">
                                        Size : 35 MB
                                      </small>
                                    </div> */}
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-11">
                                {!chapters[chapterBasicIndex]?.module[
                                  moduleBasicIndex
                                ]?.module_pdf ? (
                                  <button
                                    disabled={!CheckAccess}
                                    className="btn btn-upload border-radius-5 py-3  position-relative"
                                    id=""
                                    style={{ width: "300px" }}
                                  >
                                    <span className="ms-2">
                                      Upload transcript in pdf format
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden-input"
                                      name="module_pdf"
                                      multiple=""
                                      accept=".pdf"
                                      onChange={(e) =>
                                        handleChangeModuleContent(
                                          "module_pdf",
                                          e
                                        )
                                      }
                                    />
                                  </button>
                                ) : (
                                  <button
                                    className="border-0"
                                    onClick={(e) => {
                                      openPdfInNewPage(
                                        e,
                                        chapters[chapterBasicIndex]?.module[
                                          moduleBasicIndex
                                        ]?.module_pdf
                                      );
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="50"
                                      height="50"
                                      viewBox="0 0 24 27.429"
                                    >
                                      <path
                                        id="Path_16030"
                                        data-name="Path 16030"
                                        d="M24,7.714V24a3.429,3.429,0,0,1-3.429,3.429H18.857V25.714h1.714A1.714,1.714,0,0,0,22.286,24V7.714H18.857a2.571,2.571,0,0,1-2.571-2.571V1.714H6.857A1.714,1.714,0,0,0,5.143,3.429V18.857H3.429V3.429A3.429,3.429,0,0,1,6.857,0h9.429ZM2.743,20.314H0V27.17H1.356v-2.3H2.733a2.472,2.472,0,0,0,1.255-.3,2.01,2.01,0,0,0,.794-.813A2.434,2.434,0,0,0,5.057,22.6a2.47,2.47,0,0,0-.271-1.161A2.016,2.016,0,0,0,4,20.621,2.393,2.393,0,0,0,2.743,20.314ZM3.677,22.6a1.363,1.363,0,0,1-.146.651.984.984,0,0,1-.408.413,1.361,1.361,0,0,1-.643.141H1.351v-2.41H2.482a1.2,1.2,0,0,1,.878.31A1.205,1.205,0,0,1,3.677,22.6Zm2.086-2.285V27.17h2.5a3.3,3.3,0,0,0,1.711-.406A2.486,2.486,0,0,0,11,25.582a4.662,4.662,0,0,0,.336-1.858A4.549,4.549,0,0,0,11,21.881a2.445,2.445,0,0,0-1.01-1.166,3.346,3.346,0,0,0-1.723-.4ZM7.119,21.42h.965a1.9,1.9,0,0,1,1.044.261,1.526,1.526,0,0,1,.607.778,3.554,3.554,0,0,1,.2,1.291,3.943,3.943,0,0,1-.117,1.015,1.954,1.954,0,0,1-.336.723,1.371,1.371,0,0,1-.573.432,2.225,2.225,0,0,1-.828.141H7.119V21.42Zm6.417,3.022V27.17H12.182V20.314H16.55v1.119H13.536v1.915h2.753v1.094H13.536Z"
                                        fill="#ac1617"
                                        fillRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                )}
                                {/* {
                                    chapters[chapterBasicIndex]?.module[
                                      moduleBasicIndex
                                    ]?.module_pdf
                                  } */}

                                {/* <>
                                    <Document
                                      // file="https://serverqodequay.s3.ap-south-1.amazonaws.com/tajurba/profile/1706013101946_Times+COE+Home+Page.pdf"
                                      file={
                                        chapters[chapterBasicIndex]?.module[
                                          moduleBasicIndex
                                        ]?.module_pdf
                                      }
                                      onLoadSuccess={onDocumentLoadSuccess}
                                    >
                                      <Page pageNumber={pageNumber} />
                                    </Document>
                                  </> */}
                                {/* <>
                                    <button
                                      onClick={openPdfInNewPage(
                                        chapters[chapterBasicIndex]?.module[
                                          moduleBasicIndex
                                        ]?.module_pdf
                                      )}
                                    >
                                      Open PDF
                                    </button>
                                  </> */}

                                {/* Upload audio end */}
                              </div>{" "}
                              {CheckAccess ? (
                                <div className="col-1 g-0 d-flex">
                                  <div
                                    className="contentBggrey border-0"
                                    onClick={(event) =>
                                      handleDeleteFieldData(event, "module_pdf")
                                    }
                                  >
                                    <i className="fa-solid fa-trash-can darkGrey"></i>
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            {/* Modal For Create Chapter Warning */}
                            <div
                              className="modal fade"
                              id="SaveChapterWarning"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-5 border-radius-5 border-top-model-black">
                                  <div className="modal-body text-center">
                                    <h3 className="fw-bold">
                                      To add new chapter you need to save
                                      chapter first.
                                    </h3>
                                    <div className="col-12 d-flex justify-content-center mt-4">
                                      <div className="saveBtn">
                                        <button
                                          onClick={(e) => {
                                            onClickOkayChapterModal(e);
                                          }}
                                          className="btn bgBlack text-white px-4"
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
                    </div>
                  </div>
                </div>
                <div
                  className={
                    currentTab === "Assessment-tab"
                      ? "tab-pane fade show active"
                      : "tab-pane fade show "
                  }
                  // className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="Assessment-tab"
                >
                  <div className="row">
                    <div className="col-3 pt-2 ">
                      <div className="main-card bg-white">
                        <div className="scroll__y ">
                          <div className="slide">
                            {assessment &&
                              assessment?.map((ele, index) => {
                                return (
                                  <ul key={index} className="mb-0 ps-0">
                                    <li>
                                      <div className="row d-flex align-items-center mb-2">
                                        <div className="col-11">
                                          <button
                                            onClick={(event) =>
                                              handleClickAssessment(
                                                event,
                                                index
                                              )
                                            }
                                            className="btn rouded-0 btn-main-light-orange w-100 text-center py-2"
                                          >
                                            <span>Assessment {index + 1}</span>
                                          </button>
                                        </div>
                                        <div className="col-1 g-0">
                                          {assessment?.length > 1 ? (
                                            <div className="col-1 g-0">
                                              <div className="dropdown">
                                                <button
                                                  disabled={!CheckAccess}
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
                                                      handleDeleteAssessment(
                                                        e,
                                                        index,
                                                        ele?.assignment_id
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
                          <button
                            disabled={!CheckAccess}
                            className="btn bgOrange text-white px-4 w-100 mb-2"
                            onClick={(e) => {
                              addAssessment(e);
                            }}
                          >
                            <span className="">+ &nbsp; New Assessment</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-9">
                      <div className="main-card bg-white h-100">
                        <div className="row">
                          <div className="col-9 mb-0 shadow-none">
                            <h3 className="textBlack fw-bold letter-spacing-4">
                              Assessment {AssessmentIndex + 1}
                            </h3>
                          </div>
                          {CheckAccess ? (
                            <div className="col-3 text-end">
                              <button
                                onClick={(e) => {
                                  handleClickSaveAssessment(e);
                                }}
                                className="btn  bgSave text-white border-radius-2 px-3 mt-2 me-2"
                                disabled={assesmentLoading}
                              >
                                {/* <i className="fa fa-light fa-check me-1"></i>{" "} */}
                                <span>
                                  {assesmentLoading && (
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
                          ) : null}
                        </div>
                        <div className="row">
                          <div className="col-10">
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
                                  disabled={!CheckAccess}
                                  id="Title"
                                  name="question"
                                  value={assessment[AssessmentIndex]?.question}
                                  onChange={(e) =>
                                    handleChangeAssesmentContent(
                                      "question",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="text-danger">
                                {
                                  assesmentFieldErrors[AssessmentIndex]
                                    ?.question
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-lg-6">
                            {/* content title */}

                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">Option 1</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Option 1"
                                  disabled={!CheckAccess}
                                  id="Title"
                                  name="option1"
                                  value={assessment[AssessmentIndex]?.option1}
                                  onChange={(e) =>
                                    handleChangeAssesmentContent(
                                      "option1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="text-danger">
                                {assesmentFieldErrors[AssessmentIndex]?.option1}
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">Option 2</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Option 2"
                                  name="option2"
                                  disabled={!CheckAccess}
                                  value={assessment[AssessmentIndex]?.option2}
                                  onChange={(e) =>
                                    handleChangeAssesmentContent(
                                      "option2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="text-danger">
                                {assesmentFieldErrors[AssessmentIndex]?.option2}
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">Option 3</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Option 3"
                                  id="Title"
                                  name="option3"
                                  disabled={!CheckAccess}
                                  value={assessment[AssessmentIndex]?.option3}
                                  onChange={(e) =>
                                    handleChangeAssesmentContent(
                                      "option3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="text-danger">
                                {assesmentFieldErrors[AssessmentIndex]?.option3}
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-12">
                                <label className="form-label">Option 4</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Option 4"
                                  name="option4"
                                  disabled={!CheckAccess}
                                  value={assessment[AssessmentIndex]?.option4}
                                  onChange={(e) =>
                                    handleChangeAssesmentContent(
                                      "option4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="text-danger">
                                {assesmentFieldErrors[AssessmentIndex]?.option4}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-12">
                            <label className="form-label">
                              <span className="mandatory-star me-1">*</span>
                              Choose the correct answer
                            </label>
                            <div className="ms-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="correctanswer"
                                  disabled={!CheckAccess}
                                  checked={
                                    assessment[AssessmentIndex]
                                      ?.correctanswer == "1"
                                  }
                                  value="1"
                                  onClick={(e) =>
                                    handleChangeAssesmentContent(
                                      "correctanswer",
                                      e.target.value
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio1"
                                >
                                  Option 1
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="correctanswer"
                                  disabled={!CheckAccess}
                                  value="2"
                                  checked={
                                    assessment[AssessmentIndex]
                                      ?.correctanswer == "2"
                                  }
                                  onClick={(e) =>
                                    handleChangeAssesmentContent(
                                      "correctanswer",
                                      e.target.value
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio2"
                                >
                                  Option 2
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="correctanswer"
                                  disabled={!CheckAccess}
                                  value="3"
                                  checked={
                                    assessment[AssessmentIndex]
                                      ?.correctanswer == "3"
                                  }
                                  onClick={(e) =>
                                    handleChangeAssesmentContent(
                                      "correctanswer",
                                      e.target.value
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio3"
                                >
                                  Option 3
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="correctanswer"
                                  disabled={!CheckAccess}
                                  value="4"
                                  checked={
                                    assessment[AssessmentIndex]
                                      ?.correctanswer == "4"
                                  }
                                  onClick={(e) =>
                                    handleChangeAssesmentContent(
                                      "correctanswer",
                                      e.target.value
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio4"
                                >
                                  Option 4
                                </label>
                              </div>
                              <div className="text-danger">
                                {
                                  assesmentFieldErrors[AssessmentIndex]
                                    ?.correctanswer
                                }
                              </div>
                            </div>
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
                                  To add new Assessment you need to save chapter
                                  first.
                                </h3>
                                <div className="col-12 d-flex justify-content-center mt-4">
                                  <div className="saveBtn">
                                    <button
                                      onClick={(e) => {
                                        onClickOkayAssessmentModal(e);
                                      }}
                                      className="btn bgBlack text-white px-4"
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
                </div>
                <div
                  className={
                    currentTab === "Preview-tab"
                      ? "tab-pane fade show active"
                      : "tab-pane fade show "
                  }
                  // className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="Preview-tab"
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="main-card bg-white p-3">
                        <h4 className="fw-bold">Preview</h4>
                        <hr className="borderHr my-3"></hr>
                        {!showPreview ? (
                          <>
                            {chapters &&
                              chapters?.map((ele, index) => {
                                return (
                                  <div key={index} className="col-12 mt-3">
                                    <div className="row">
                                      <div className="col-12">
                                        <div
                                          onClick={() => {
                                            setShowPreview(true);
                                            setPreviewSelectedIndex(index);
                                            setPreviewSelectedChapterName(
                                              ele?.chapter_title
                                            );
                                          }}
                                          className="orangrBg border-radius-2 p-2"
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
                                    </div>
                                  </div>
                                );
                              })}
                          </>
                        ) : (
                          <ShowPreviewDetails
                            data={chapters}
                            previewSelectedIndex={previewSelectedIndex}
                            previewSelectedChapterName={
                              previewSelectedChapterName
                            }
                            handleClickBack={handleClickBack}
                          />
                        )}
                      </div>
                    </div>

                    {/* Timeline Functionality */}
                    {/* <div className="col-3">
                        <div className="main-card bg-white p-3" id="list">
                          <h4 className="fw-bold">Timeline</h4>
                          <hr className="borderHr my-3"></hr>
                          <ul className="sessions">
                            <li className="bgtimeline">
                              <div className="row border-left-greyline">
                                <span className="fw-bold textBlack">
                                  Created
                                </span>
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
                                <span className="fw-bold defaultGrey">
                                  Approved
                                </span>
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
                                <span className="fw-bold defaultGrey">
                                  Published
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default CreateContent;
