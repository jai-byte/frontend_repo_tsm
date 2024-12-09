/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate } from "react-router-dom";
import myProfileImg from "../../../assets/images/profile.png";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import { useFormik } from "formik";
import API from "../../../Api/Api";

const MyProfileEdit = () => {
   const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
   const adminToken = JSON.parse(localStorage.getItem("TajurbaAdminToken"));

   const adminRoleObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
   const navigate = useNavigate();
   // const [selectedFile, setSelectedFile] = useState(adminObject?.profile_pic);
   const [roleListing, setRoleisting] = useState([]);
   console.log("rolePrevilege", adminObject);
   useEffect(() => {
      try {
         API?.Role?.RoleList({
            data: { page: 1, limit: 100 },
         }).then((response) => {
            setRoleisting(response?.data?.data);
         });
      } catch (error) {
         console.log(error);
      }
   }, []);
   const validate = (values) => {
      console.log(values, "value");
      const errors = {};
      if (!values.first_name) {
         errors.first_name = "Please enter first name";
      } else if (!/^[A-Za-z\s.'-]+$/.test(values.first_name)) {
         errors.first_name = "Please enter valid name";
      }

      if (!values.last_name) {
         errors.last_name = "Please enter last name";
      } else if (!/^[A-Za-z\s.'-]+$/.test(values.last_name)) {
         errors.last_name = "Please enter valid name";
      }

      // if (!values.email) {
      //   errors.email = "Required";
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      // ) {
      //   errors.email = "Invalid email address";
      // }

      if (!values.mobile_number) {
         errors.mobile_number = "Please enter mobile no.";
      } else if (!/^[0-9]{10}$/.test(values.mobile_number)) {
         errors.mobile_number = "Invalid mobile no.";
      }

      // if (!values.user_designation) {
      //   errors.user_designation = "Please select designation";
      // }
      if (!values.profile_pic) {
         errors.profile_pic = "Please select Profile";
      }

      if (values.profile_pic) {
         try {
            // Call the uploadImage function with the selected image file
            console.log(values, "values");
            uploadImage(values);
         } catch (error) {
            // Handle errors
            errors.profile_pic = error.message;
         }
      } else {
         errors.profile_pic = "Please select Profile";
      }
      return errors;
   };
   const formik = useFormik({
      initialValues: {
         first_name: adminObject?.first_name,
         last_name: adminObject?.last_name,
         mobile_number: adminObject?.mobile_number,
         email: adminObject?.email,
         // user_designation: adminObject?.user_designation,
         profile_pic: adminObject?.profile_pic,
         // is_active: adminObject?.is_active,
      },
      onSubmit: () => {
         editProfile();
      },
      validate,
   });
   const uploadImage = (values) => {
      console.log(values.profile_pic, "values.profile_pic");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${adminToken}`);

      var formdata = new FormData();
      formdata.append("image", values.profile_pic);

      var requestOptions = {
         method: "POST",
         headers: myHeaders,
         body: formdata,
         redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_BASE_URL}fileUpload/user-image`, requestOptions)
         .then((response) => response.json())
         .then((result) => {
            formik.setFieldValue("profile_pic", `${process.env.REACT_APP_BASE_URL}${result.data.newFileName}`);
         })
         .catch((error) => console.log("error", error));
   };
   const editProfile = () => {
      API.Auth.UpdateProfileAPI({
         data: {
            UserId: adminObject._id,
            email: adminObject.email,
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            mobile_number: formik.values.mobile_number,
            is_admin: 1,
            role: 2,
            // is_active: formik.values.is_active,
            is_verified: true,
            profile_pic: formik.values.profile_pic,
            user_designation: formik.values.user_designation,
            rolePrevilege: adminRoleObject.rolePrevilege,
         },
      })
         .then((response) => {
            if (response?.data?.status == 200) {
               localStorage.setItem("TajurbaAdminUser", JSON.stringify(response.data.data));
               navigate("/my-profile");
            } else {
               console.log(response?.data?.message);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <>
         {/* <AppLayout> */}
         <div className="main-content">
            <form onSubmit={formik.handleSubmit}>
               <div className="page-content">
                  {/* start page title */}
                  <DateAndTimeLayout />
                  {/* end page title */}
                  <div className="row d-flex align-items-center mb-3">
                     <div className="col-6 row d-flex align-items-center">
                        <NavLink to="/my-profile" className="w-auto float-start pe-1 textBlack">
                           <div className="backArrow">
                              <i className="fa fa-solid fa-chevron-left"></i>
                           </div>
                        </NavLink>

                        <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">Profile</h4>
                     </div>
                     <div className="col-6">
                        <div className="d-flex justify-content-end">
                           <div className="cancelBtn">
                              <NavLink to={-1} className="btn btn-reject border-radius-5 me-3 px-4">
                                 <span className="">Close</span>
                              </NavLink>
                           </div>
                           <div className="saveBtn">
                              <button
                                 // to="/my-profile"
                                 className="btn profileBtn text-white border-radius-5 px-4 float-end"
                              >
                                 <span className="">Save</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-12">
                        <div className="main-card p-0">
                           <div className="custum-orange-bgbox"></div>
                           <div className="px-4">
                              <div className="pofileInfo">
                                 <div className="row d-flex align-items-center">
                                    <div className="col-8">
                                       <div className="d-flex align-items-center">
                                          <img
                                             crossOrigin="Anonymous"
                                             src={myProfileImg}
                                             alt=""
                                             className="rounded-0 profile"
                                             id="profile-picture-custome"
                                          />

                                          {/* <div className="consumerProfileText ms-3 d-flex align-items-center">
                                <div className="contentBg">
                                  <i className="fa fa-light fa-pen"></i>
                                </div>
                                <p className="ms-2 mb-0">
                                  Change Profile Image
                                </p>
                              </div> */}
                                          <div className="file-upload-container ms-3 d-flex align-items-center">
                                             <div className="contentBg">
                                                <i className="fa fa-light fa-pen text-white"></i>
                                             </div>

                                             <input id="file-input" type="file" name="profile_pic" />
                                             <label htmlFor="file-input" className="ms-2 mb-0">
                                                Change Profile Image
                                             </label>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                       <div className="button b2" id="button-13">
                                          <input type="checkbox" name="is_active" className="checkbox" />
                                          <div className="knobs">
                                             <span>|||</span>
                                          </div>
                                          <div className="layer"></div>
                                       </div>

                                       <p className="mt-1 ms-3">Active</p>
                                    </div>
                                 </div>
                              </div>

                              <div className="row">
                                 <div className="col-8">
                                    <div className="my-4">
                                       <p>Personal Details</p>
                                       <hr className="borderHr" />
                                       <div className="row">
                                          <div className="row">
                                             <div className="col-6">
                                                <label className="form-label">First Name</label>
                                                <input
                                                   type="text"
                                                   className="form-control"
                                                   placeholder="Enter first name"
                                                   name="first_name"
                                                />
                                             </div>
                                             <div className="col-6">
                                                <label className="form-label">Last Name</label>
                                                <input
                                                   type="text"
                                                   className="form-control"
                                                   placeholder="Enter last name"
                                                   name="last_name"
                                                />
                                             </div>
                                          </div>
                                          <div className="row  mb-3">
                                             <div className="col-6"></div>
                                             <div className="col-6"></div>
                                          </div>
                                          <div className="col-12 mb-3">
                                             <div className="row">
                                                <div className="col-6">
                                                   <label className="form-label">Email</label>
                                                   <input
                                                      type="email"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                      name="email"
                                                   />
                                                </div>
                                                <div className="col-6">
                                                   <label className="form-label">Mobile No.</label>
                                                   <input
                                                      type="tel"
                                                      className="form-control"
                                                      placeholder="Enter Mobile No."
                                                      name="mobile_number"
                                                   />
                                                </div>
                                             </div>
                                             <div className="row">
                                                <div className="col-6"></div>
                                                <div className="col-6"></div>
                                             </div>

                                             <div className="row">
                                                <div className="col-6 mt-4">
                                                   <label className="form-label">Designation</label>

                                                   <select className="form-select" aria-label="Default select example">
                                                      <option selected>Select</option>
                                                      <option value="Super Admin">Super Admin</option>
                                                      <option value="Admin">Admin</option>
                                                      <option value="Content Creator">Content Creator</option>
                                                   </select>
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
            </form>
         </div>
         {/* </AppLayout> */}
      </>
   );
};

export default MyProfileEdit;
