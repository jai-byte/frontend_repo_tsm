/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate } from "react-router-dom";
import downloadIcon from "../../../../assets/images/CA/Svg/g2165.svg";
// import API from "../../../../Api/Api";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import API from "../../../../Api/Api";
import moment from "moment";
import AdminRoute from "../../../../Route/RouteDetails";
import Pagination from "../../../Common/Pagination";
import FilterSearch from "../../../Common/FilterSearch";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";
import TooltipCustom from "../../../Common/TooltipCustom";
import { Placeholder } from "react-bootstrap";

const Consumers = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [listingData, setListingData] = useState([]);

   // For Pagination
   const [totalPagess, setTotalPage] = useState();
   const [totalItems, setTotalItems] = useState();
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const [goToPage, setGoToPage] = useState(1);
   const [totalConsumer, setTotalConsumer] = useState("");

   const DurationOptionsForCsv = [
      { label: "This Month", value: "monthly" },
      { label: "Quarterly", value: "quarterly" },
      { label: "Half Yearly", value: "half-yearly" },
      { label: "Yearly", value: "yearly" },
   ];

   const [selectedDuration, setSelectedDuration] = useState("");

   // Functionality for Filter and search
   const FilterOptions = [
      { label: "All", value: "all" },
      { label: "Name", value: "first_name" },
      { label: "Email", value: "email" },
      { label: "City", value: "city" },
      { label: "Subscription", value: "is_subscribe" },
   ];

   const [filterselect, setFilterSelect] = useState("all");
   const [search, setSearch] = useState("");

   const MyTeamTabList = () => {
      try {
         var payload = {
            agent: "mobile_user_list",
            page_no: currentPage,
            limit: itemsPerPage,
         };
         if (filterselect === "" || search === "") {
            payload.filter = {};
         } else {
            payload.filter = {
               [filterselect]: search,
            };
         }
         API?.CommanApiCall(payload).then((response) => {
            console.log("Response from Consumer listing api ", response?.data?.data);
            if (response?.data?.data?.status === 200) {
               setListingData(response?.data?.data?.data);
               setTotalConsumer(response?.data?.data?.total_mobile_user);
               setTotalPage(response?.data?.data?.total_pages);
               setTotalItems(response?.data?.data?.total_data);
               setLoading(false);
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      MyTeamTabList();
   }, [currentPage, itemsPerPage, filterselect, search]);

   // function for Export CSV

   const handleClickExportCsv = () => {
      if (selectedDuration) {
         try {
            API?.CommanApiCall({
               agent: "createAdminUser",
               function: "exportToCsv",
               data: {
                  exporttocsv: true,
                  timeFilter: selectedDuration,
               },
            }).then((response) => {
               if (response?.data?.data?.status === 200) {
                  console.log(response.data.data.data);
                  const excelUrl = response.data.data.data;

                  // Use file-saver to initiate download
                  saveAs(excelUrl, "exported_data.xlsx");
               }
            });
         } catch (error) {
            console.log(error);
         }
      } else {
         toast.warning("Please select duration");
      }
   };

   return (
      <>
         {/* <AppLayout> */}
         <ToastContainer />
         <div className="main-content">
            <div className="page-content">
               {/* start page title */}
               <DateAndTimeLayout />
               {/* end page title */}
               <div className="row">
                  <div className="col-12">
                     <div className="row position-relative mb-3">
                        <div>
                           <h3 className="headText mt-2 mb-2 fw-bold">Consumer</h3>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="row" id="consumers">
                  <div className="col-xl-7">
                     <div className="row align-items-center mb-3">
                        <div className="col-5">
                           <div className="main-card orangeLeftB mb-0">
                              <div className="row align-items-center">
                                 <div className="col-9">
                                    <h5 className="darkGrey fw-bold consumerHeading">Total Consumers</h5>
                                 </div>
                                 <div className="col-3">
                                    <h3 className="textlightBlue text-end fw-bold">{totalConsumer}</h3>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-5">
                           <select
                              className="form-select me-3 bg-white border-0 border-radius-5 py-2"
                              aria-label="Default select example"
                              onChange={(e) => {
                                 setSelectedDuration(e.target?.value);
                              }}
                           >
                              <option disabled value="" selected className="textBlack">
                                 Select duration
                              </option>
                              {DurationOptionsForCsv?.map((ele, index) => {
                                 return (
                                    <option key={index} value={ele?.value}>
                                       {ele?.label}
                                    </option>
                                 );
                              })}
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-5 mb-4">
                     <div className="d-flex justify-content-xl-end">
                        <FilterSearch
                           FilterOptions={FilterOptions}
                           search={search}
                           setSearch={setSearch}
                           filterselect={filterselect}
                           setFilterSelect={setFilterSelect}
                        />
                        <NavLink
                           className="btn bgDarkBlack text-white border-radius-2 px-4 float-end ms-2 py-2"
                           to=""
                           onClick={(e) => {
                              handleClickExportCsv();
                           }}
                        >
                           <span>
                              Export Data in .csv
                              <img src={downloadIcon} className="ms-1" />
                              {/* <i className="fa fa-solid fa-plus ms-1 text-white"></i> */}
                           </span>
                        </NavLink>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <div className="main-card p-3 mb-0 box-shadow-bottom-none">
                        <div className="table-responsive">
                           <table className="table mb-0 tablesWrap">
                              <thead>
                                 <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="text-center">Subscription</th>
                                    <th className="text-center">Registration Date</th>
                                    <th className="text-center">City</th>
                                    <th></th>
                                 </tr>
                              </thead>
                              <tbody>
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
                                       {listingData && listingData?.length ? (
                                          listingData?.map((ele, index) => {
                                             return (
                                                <tr key={index}>
                                                   <td>{index + 1}.</td>
                                                   <td className="fw-bold">{TooltipCustom(ele?.first_name)}</td>
                                                   <td>{ele?.email}</td>
                                                   <td className="fw-bold text-center">{ele?.subscription}</td>
                                                   <td className="text-center">{moment(ele?.createdAt).format("DD/MM/YYYY")}</td>
                                                   <td className="text-center">{ele?.city}</td>
                                                   <td className="text-center">
                                                      <NavLink
                                                         to={`../${AdminRoute?.UserManagement?.Consumers?.ConsumerProfile?.replace(
                                                            ":id",
                                                            ele?.user_id
                                                         )}`}
                                                         className="btn btn-sm waves-effect waves-light btnViewOrange"
                                                      >
                                                         View More
                                                      </NavLink>
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
               <Pagination
                  totalPagess={totalPagess}
                  setTotalPage={setTotalPage}
                  totalItems={totalItems}
                  setTotalItems={setTotalItems}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
               />
            </div>
         </div>
         {/* </AppLayout> */}
      </>
   );
};

export default Consumers;
