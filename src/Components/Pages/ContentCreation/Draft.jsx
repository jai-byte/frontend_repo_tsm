/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import Dropdown from "react-bootstrap/Dropdown";
import API from "../../../Api/Api";
import moment from "moment";
import AdminRoute from "../../../Route/RouteDetails";
import Pagination from "../../Common/Pagination";
import FilterSearch from "../../Common/FilterSearch";
import TooltipCustom from "../../Common/TooltipCustom";

// import AdminRoute from '../../../Route/RouteDetails';

const Draft = () => {
  const [draftList, setDraftList] = useState([]);
  const [loading, setLoading] = useState(true);

  // For Pagination
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);

  // Functionality for Filter and search
  const FilterOptions = [
    // { label: "All", value: "all" },
    { label: "Title", value: "course_title" },
    { label: "Author", value: "author_name" },
    { label: "Course Type", value: "course_type" },
    { label: "Date", value: "createdAt" },
  ];

  const [filterselect, setFilterSelect] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      var payload = {
        agent: "course",
        function: "getCourseList",
        flag: "Draft",
        page_no: currentPage,
        limit: itemsPerPage,
        // createdAt: -1,
      };

      if (filterselect === "" || search === "") {
        payload.filter = {};
      } else {
        payload.filter = {
          [filterselect]: search,
        };
      }

      API?.CommanApiCall(payload).then((response) => {
        console.log("Draft list", response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setDraftList(response?.data?.data?.data);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, itemsPerPage, filterselect, search]);

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          <DateAndTimeLayout />
          <div className="row mb-4" id="consumers">
            <div className="col-6">
              <h3 className="headText mt-2 mb-2 fw-bold">Draft</h3>
            </div>
            <FilterSearch
              FilterOptions={FilterOptions}
              search={search}
              setSearch={setSearch}
              filterselect={filterselect}
              setFilterSelect={setFilterSelect}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-3 mb-0 box-shadow-bottom-none">
                <div className="table-responsive">
                  <table className="table mb-0 tablesWrap">
                    <thead>
                      <tr>
                        <th className="w-30">Content Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Content Type</th>
                        <th>Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6}>
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {draftList && draftList?.length ? (
                            draftList &&
                            draftList?.map((ele, index) => {
                              return (
                                <tr key={index}>
                                  <td>{TooltipCustom(ele?.course_title)}</td>
                                  <td>{ele?.categoryName}</td>
                                  <td>{ele?.author_name}</td>
                                  <td>{ele?.course_type}</td>
                                  <td>
                                    {moment(ele?.createdAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <NavLink
                                      to={`../${AdminRoute?.ContentCreation?.CreateContent.replace(
                                        "/:id",
                                        ""
                                      )}/${ele?.courseedition_id}`}
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

export default Draft;
