// /* eslint-disable */
// import React, { useEffect, useState } from "react";
// // import AppLayout from "../../Loyout/App";
// // import { NavLink } from "react-router-dom";
// import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
// // import API from "../../../Api/Api";
// // import moment from "moment";
// // import AdminRoute from '../../../Route/RouteDetails';
// import Dropdown from "react-bootstrap/Dropdown";
// import API from "../../../Api/Api";
// import moment from "moment";
// import Pagination from "../../Common/Pagination";
// import FilterSearch from "../../Common/FilterSearch";
// import TooltipCustom from "../../Common/TooltipCustom";

// const AllTransactions = () => {
//    const [transationDetails, setTransationDetails] = useState([]);

//    const [loading, setLoading] = useState(true);

//    // For Pagination
//    const [totalPagess, setTotalPage] = useState();
//    const [totalItems, setTotalItems] = useState();
//    const [currentPage, setCurrentPage] = useState(1);
//    const [itemsPerPage, setItemsPerPage] = useState(10);
//    const [goToPage, setGoToPage] = useState(1);

//    // Functionality for Filter and search
//    const FilterOptions = [
//       { label: "All", value: "all" },
//       { label: "Course Name", value: "course_name" },
//       { label: "Consumer Name", value: "author_name" },
//       { label: "Amount", value: "amount" },
//       //  { label: "Date", value: "createdAt" },
//       { label: "Invoice No.", value: "invoice_no" },
//    ];

//    const [filterselect, setFilterSelect] = useState("all");
//    const [search, setSearch] = useState("");

//    // Api call for Draft Listing
//    useEffect(() => {
//       try {
//          var payload = {
//             agent: "payment_gateway",
//             function: "transaction_list",
//             page_no: currentPage,
//             limit: itemsPerPage,
//             //filter: {},
//             // createdAt: -1,
//          };
//          if (filterselect === "" || search === "") {
//             payload.filter = {};
//          } else {
//             payload.filter = {
//                [filterselect]: search,
//             };
//          }
//          API?.CommanApiCall(payload).then((response) => {
//             //console.log(`${flagForList} list`, response?.data?.data?.data);
//             console.log("Transation Api Details", response?.data?.data?.data);
//             if (response?.data?.data?.status === 200) {
//                setTransationDetails(response?.data?.data?.data);
//                setTotalPage(response?.data?.data?.total_pages);
//                setTotalItems(response?.data?.data?.total_data);
//                setLoading(false);
//             }
//          });
//       } catch (error) {
//          console.log(error);
//       }
//    }, [currentPage, itemsPerPage, filterselect, search]);

//    return (
//       <>
//          {/* <AppLayout> */}
//          <div className="main-content">
//             <div className="page-content">
//                <DateAndTimeLayout />

//                <div className="row mb-4" id="consumers">
//                   <div className="col-6">
//                      <h3 className="headText mt-2 mb-2 fw-bold">All Transactions</h3>
//                   </div>
//                   <div className="col-6 d-flex align-items-center justify-content-end">
//                      <FilterSearch
//                         FilterOptions={FilterOptions}
//                         search={search}
//                         setSearch={setSearch}
//                         filterselect={filterselect}
//                         setFilterSelect={setFilterSelect}
//                      />
//                   </div>
//                </div>
//                <div className="row">
//                   <div className="col-12">
//                      <div className="main-card p-3 mb-0 box-shadow-bottom-none">
//                         <div className="table-responsive">
//                            <table className="table mb-0 tablesWrap text-center">
//                               <thead>
//                                  <tr className="">
//                                     <th className="text-start">Name</th>
//                                     <th className="">Type</th>
//                                     <th>Consumer Name</th>
//                                     <th>Amount</th>
//                                     <th>Date</th>
//                                     <th>Time</th>
//                                     <th>Invoice No.</th>
//                                  </tr>
//                               </thead>
//                               <tbody>
//                                  {loading ? (
//                                     <tr>
//                                        <td colSpan={6}>
//                                           <div className="d-flex justify-content-center">
//                                              <div className="spinner-border" role="status">
//                                                 <span className="visually-hidden">Loading...</span>
//                                              </div>
//                                           </div>
//                                        </td>
//                                     </tr>
//                                  ) : (
//                                     <>
//                                        {transationDetails && transationDetails?.length ? (
//                                           transationDetails &&
//                                           transationDetails?.map((ele, index) => {
//                                              return (
//                                                 <tr key={index} className="">
//                                                    <td className="fw-bold textBlack text-start">
//                                                       {TooltipCustom(
//                                                          ele?.type === "Subscription"
//                                                             ? ele?.name
//                                                             : ele?.type === "Event"
//                                                             ? ele?.event_name
//                                                             : ele?.course_name
//                                                       )}
//                                                    </td>
//                                                    <td>{ele?.type}</td>
//                                                    <td>{ele?.user_name}</td>
//                                                    <td className="self-font-family">₹ {ele?.paid_amount}</td>
//                                                    <td className="fw-bold textBlack">
//                                                       {moment(ele?.createdAt).format("DD-MM-YYYY")}
//                                                    </td>
//                                                    <td className="fw-bold textBlack">{moment(ele?.createdAt).format("H:mm ")}</td>
//                                                    <td>{ele?.invoice_no}</td>
//                                                 </tr>
//                                              );
//                                           })
//                                        ) : (
//                                           <>
//                                              <tr>
//                                                 <td colSpan={6} className="text-center">
//                                                    No data Found
//                                                 </td>
//                                              </tr>
//                                           </>
//                                        )}
//                                     </>
//                                  )}
//                               </tbody>
//                               {/* <tbody>
//                         <tr>
//                           <td>Announcing sales, discounts, or promotions</td>
//                           <td>Neeta Malik</td>
//                           <td>₹ 3000</td>
//                           <td>21-06-2023</td>
//                           <td>13:00</td>
//                           <td>FAFKC146347</td>
//                         </tr>
//                       </tbody> */}
//                            </table>
//                         </div>
//                      </div>
//                   </div>
//                </div>

//                <Pagination
//                   totalPagess={totalPagess}
//                   setTotalPage={setTotalPage}
//                   totalItems={totalItems}
//                   setTotalItems={setTotalItems}
//                   currentPage={currentPage}
//                   setCurrentPage={setCurrentPage}
//                   itemsPerPage={itemsPerPage}
//                   setItemsPerPage={setItemsPerPage}
//                />
//             </div>
//          </div>
//          {/* </AppLayout> */}
//       </>
//    );
// };

// export default AllTransactions;
