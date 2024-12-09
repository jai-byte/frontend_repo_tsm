/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import cunsumerProfileImg from "../../../../assets/images/cunsumerProfileImg.png";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import moment from "moment";
import AdminRoute from "../../../../Route/RouteDetails";
import noProfile from "../../../../assets/images/Create User.png";

const ConsumerProfile = () => {
   const { id } = useParams();

   const [userDetails, setUserDetails] = useState("");
   const [commumityData, setCommunityData] = useState([]);
   const [subscriptionData, setSubscriptionData] = useState("");
   const [CosumptionDetails, setConsumptionDetails] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      GetDetails();
      GetConsumerConseptionDetails();
   }, [id]);

   // Api for Get User Detils
   const GetDetails = () => {
      try {
         API?.CommanApiCall({
            agent: "mobile_user_view",
            data: {
               user_id: parseInt(id),
            },
         }).then((response) => {
            if (response?.data?.data?.status === 200) {
               setUserDetails(response?.data?.data?.data);
               setCommunityData(response?.data?.data?.other_data?.community_data);
               setSubscriptionData(response?.data?.data?.other_data?.subscription_data);
               setLoading(false);
               console.log("response for Get User details api", response?.data?.data);
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   // Api for get consumer consumption details
   const GetConsumerConseptionDetails = () => {
      try {
         API?.CommanApiCall({
            agent: "course",
            function: "content_consumtion",
            data: {
               user_id: parseInt(id),
            },
         }).then((response) => {
            if (response?.data?.data?.status === 200) {
               setLoading(false);
               setConsumptionDetails(response?.data?.data?.data);

               console.log("response for Get Consumption details api", response?.data?.data?.data);
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {/* <AppLayout> */}
         <div className="main-content">
            <div className="page-content">
               {/* start page title */}
               <DateAndTimeLayout />
               {/* end page title */}
               <div className="row">
                  <div className="col-12">
                     <div className="row d-flex align-items-center mb-3">
                        <NavLink
                           to="/consumers"
                           className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
                        >
                           <div className="backArrow me-3">
                              <i className="fa fa-solid fa-chevron-left"></i>
                           </div>

                           <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">Consumer Profile</h4>
                        </NavLink>
                     </div>
                  </div>
               </div>

               <div className="row">
                  <div className="col-12">
                     <div className="main-card p-0">
                        <div className="custum-orange-bgboxC"></div>
                        <div className="px-xxl-5 px-4 pb-5">
                           <div className="pofileInfo">
                              <div className="row d-flex align-items-center">
                                 <div className="col-5">
                                    <div className="d-flex align-items-center">
                                       <img
                                          src={userDetails?.image || noProfile}
                                          className="rounded-circle img-fluid consProfileImg"
                                       />
                                       <div className="consumerProfileText ms-3 mt-4">
                                          <h3 className="fw-bold letter-spacing-6">{userDetails?.first_name}</h3>
                                          {/* <p className="gray">Business Owner | @AjayKR</p> */}
                                          <p className="gray">{userDetails?.user_prof_role}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-7">
                                    <div className="row">
                                       <div className="col-5 mt-3">
                                          <span className="form-label">Email</span>
                                          <p className="fw-bold letter-spacing-6">{userDetails?.email}</p>
                                       </div>
                                       <div className="col-3 mt-3">
                                          <span className="form-label">City</span>
                                          <p className="fw-bold letter-spacing-6">{userDetails?.city || "-"}</p>
                                       </div>

                                       <div className="col-4 mt-3">
                                          <span className="form-label">Registration Date</span>
                                          <p className="fw-bold letter-spacing-6">
                                             {moment(userDetails?.createdAt).format("DD-MM-YYYY")}
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <hr className="borderHr" />
                           <div className="mt-4">
                              <div className="row">
                                 <div className="col-xl-4 mb-5">
                                    <p>Subscription Model</p>
                                    <div className="freenow-page p-4">
                                       <div className="p-4">
                                          <h3 className="text-white fw-bold self-font-family">
                                             {subscriptionData && subscriptionData?.name}
                                          </h3>
                                          <p className="text-white">{subscriptionData && subscriptionData?.description}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-xl-8">
                                    <div className="border-left-grey h-100">
                                       <div className="ps-4">
                                          {" "}
                                          <p>Content Consumption</p>
                                          <div className="row ps-1">
                                             <table className="table scrollTable">
                                                <thead>
                                                   <tr>
                                                      <th scope="col" className="lightGrey border-0">
                                                         Content list
                                                      </th>
                                                      <th scope="col" className="lightGrey border-0">
                                                         Price
                                                      </th>
                                                   </tr>
                                                </thead>
                                                <tbody className="">
                                                   {loading ? (
                                                      <tr>
                                                         <td colSpan={6}>
                                                            <div className="d-flex justify-content-center">
                                                               <div className="spinner-border" role="status">
                                                                  <span className="visually-hidden">Loading...</span>
                                                               </div>
                                                            </div>
                                                         </td>
                                                      </tr>
                                                   ) : (
                                                      <>
                                                         {CosumptionDetails && CosumptionDetails?.length ? (
                                                            CosumptionDetails?.map((ele, index) => {
                                                               return (
                                                                  <tr key={index}>
                                                                     <td scope="row" className="darkGrey border-0">
                                                                        {ele.course_data?.course_title}
                                                                     </td>
                                                                     <td className="darkGrey border-0">{ele?.paid_amount}/-</td>
                                                                  </tr>
                                                               );
                                                            })
                                                         ) : (
                                                            <>
                                                               <tr>
                                                                  <td colSpan={2} className="text-center">
                                                                     No data Found
                                                                  </td>
                                                               </tr>
                                                            </>
                                                         )}
                                                      </>
                                                   )}
                                                </tbody>
                                             </table>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <hr className="borderHr mt-4" />
                           <div className="row mt-4">
                              <div className="col-12">
                                 <div className="RegistrationDate">
                                    <p>Communities List</p>
                                    {/* <h4 className="fw-bold">20-04-2023</h4> */}
                                 </div>
                                 <div className="row ps-1">
                                    <table className="table scrollTable">
                                       <thead>
                                          <tr>
                                             <th scope="col" className="lightGrey border-0">
                                                Community name
                                             </th>
                                             <th scope="col" className="lightGrey border-0">
                                                Free/Paid
                                             </th>
                                             <th scope="col" className="lightGrey border-0">
                                                Price
                                             </th>
                                             <th scope="col" className="lightGrey border-0">
                                                Payment Due Date
                                             </th>
                                          </tr>
                                       </thead>
                                       <tbody className="">
                                          {loading ? (
                                             <tr>
                                                <td colSpan={6}>
                                                   <div className="d-flex justify-content-center">
                                                      <div className="spinner-border" role="status">
                                                         <span className="visually-hidden">Loading...</span>
                                                      </div>
                                                   </div>
                                                </td>
                                             </tr>
                                          ) : (
                                             <>
                                                {commumityData && commumityData?.length ? (
                                                   commumityData?.map((ele, index) => {
                                                      return (
                                                         <tr key={index}>
                                                            <td scope="row" className="darkGrey border-0">
                                                               {ele?.community_data?.community_title}
                                                            </td>
                                                            <td
                                                               scope="row"
                                                               className={
                                                                  ele?.community_data?.community_type === "Free"
                                                                     ? "border-0 textGreen fw-bold"
                                                                     : "border-0 darkGrey"
                                                               }
                                                            >
                                                               {ele?.community_data?.community_type}
                                                            </td>

                                                            <td className="darkGrey border-0">
                                                               {/* 2500/- */}
                                                               {ele?.community_data?.community_type === "Paid"
                                                                  ? ele?.courseedition_data?.amount
                                                                  : "NA"}{" "}
                                                               {ele?.community_data?.community_type === "Paid" ? "/-" : null}
                                                            </td>
                                                            <td scope="row" className="darkGrey border-0">
                                                               {moment(ele?.community_data?.createdAt)?.format("DD MMM YYYY")}
                                                            </td>
                                                         </tr>
                                                      );
                                                   })
                                                ) : (
                                                   <>
                                                      <tr>
                                                         <td colSpan={6} className="text-center">
                                                            No data Found
                                                         </td>
                                                      </tr>
                                                   </>
                                                )}
                                             </>
                                          )}
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
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

export default ConsumerProfile;
