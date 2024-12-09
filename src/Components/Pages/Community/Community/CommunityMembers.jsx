/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
// import API from "../../../../Api/Api";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import Pagination from "../../../Common/Pagination";
import { ToastContainer, toast } from "react-toastify";
import FilterSearch from "../../../Common/FilterSearch";
import AdminRoute from "../../../../Route/RouteDetails";
import API from "../../../../Api/Api";
import moment from "moment";

const CommunityMembers = () => {
  const { id, type } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);
  // Functionality for Filter and search
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "User Name", value: "first_name" },
    { label: "Email", value: "email" },
  ];

  const [addUsersDetails, setAddUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const CommunityMemberList = () => {
    try {
      var payload = {
        agent: "community",
        function: "community_member_list",
        data: {
          community_id: parseInt(id),
        },
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
        console.log(
          "Response from My Team listing api ",
          response?.data?.data?.data
        );
        if (response?.data?.data?.status === 200) {
          setListingData(response?.data?.data?.data);
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
    CommunityMemberList();
  }, [currentPage, itemsPerPage, filterselect, search]);

  // Function for remove user
  const handleRemoveUser = (event, user_id, community_id) => {
    // console.log(user_id, community_id);
    event.preventDefault();
    try {
      API?.CommanApiCall({
        data: {
          community_id: parseInt(community_id),
          user_id: parseInt(user_id),
        },
        agent: "community",
        function: "remove_user_from_community_admin",
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log(
            "remove_user_from_community_admin response  ",
            response?.data?.data?.data
          );
          toast.success(response?.data?.data?.message);
          CommunityMemberList();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Api for get user Detail for add more user
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          community_id: parseInt(id),
        },
        agent: "community",
        function: "mobile_user_list",
      }).then((response) => {
        console.log("response from get user data", response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          setAddUserDetails(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Function for cick on new user profile
  const handleClickAddUser = (e) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        API?.CommanApiCall({
          data: {
            community_id: parseInt(id),
          },
          agent: "community",
          function: "add_user_in_community_from_admin",
          user_id: parseInt(selectedUser),
        }).then((response) => {
          console.log(
            "response from get user data",
            response?.data?.data?.data
          );
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            window.$("#exampleModal").modal("hide");
            CommunityMemberList();
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("Please select user");
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
          <div className="row mb-3">
            <div className="col-6">
              <NavLink
                // to="/community/community-detail/:type/:id"
                to={`../${AdminRoute?.Community?.Community?.CommunityDetail?.replace(
                  ":type",
                  type
                ).replace(":id", id)}`}
                className="w-auto float-start pe-1 textBlack text-decoration-none d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <div className="backArrow">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText ms-2 mt-2 mb-2 fw-bold w-auto textBlack">
                  Community Members ({location?.state?.community_name})
                </h4>
              </NavLink>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              <FilterSearch
                FilterOptions={FilterOptions}
                search={search}
                setSearch={setSearch}
                filterselect={filterselect}
                setFilterSelect={setFilterSelect}
              />

              <div className="">
                <button
                  type="button"
                  className="btn btn-sm btnViewOrange ms-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-regular fa-plus"></i>
                  <span className="ms-2">Add User</span>
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered bg-transparent">
                    <div className="modal-content p-2 border-0">
                      <div className="modal-body">
                        <h4 className="mt-3 mb-4 textBlack fw-bold">
                          Add New Profile
                        </h4>
                        <div className="row mb-3">
                          <div className="col-12">
                            <label className="form-label textBlack">
                              User Name
                            </label>
                            <select
                              className="form-select border-radius-2"
                              aria-label="Default select example"
                              name="course_level"
                              onChange={(e) => {
                                setSelectedUser(e.target.value);
                              }}
                            >
                              <option selected="" value="">
                                Select the course level
                              </option>
                              {addUsersDetails &&
                                addUsersDetails?.map((ele, index) => {
                                  return (
                                    <option key={index} value={ele?.user_id}>
                                      {ele?.first_name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12">
                            <label className="form-label textBlack">
                              User Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter user email address"
                              value={
                                (addUsersDetails &&
                                  addUsersDetails?.find(
                                    (user) => user.user_id == selectedUser // Loose comparison here
                                  )?.email) ||
                                ""
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer justify-content-between border-0">
                        <div className="cancelBtn">
                          <button
                            onClick={() => {
                              window.$("#exampleModal").modal("hide");
                              setAddUserDetails("");
                            }}
                            className="btn btn-reject me-3 px-4"
                          >
                            <span className="">Cancel</span>
                          </button>
                        </div>
                        <div className="saveBtn">
                          <button
                            onClick={(e) => {
                              handleClickAddUser(e);
                            }}
                            className="btn bgBlack text-white border-radius-2 px-4 float-end"
                          >
                            <span className="">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Registered Date</th>
                        <th>Action</th>
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
                          {listingData && listingData?.length ? (
                            listingData?.map((ele, index) => {
                              return (
                                <tr key={index}>
                                  <td className="fw-bold">{ele?.first_name}</td>
                                  <td>{ele?.email}</td>

                                  <td>
                                    {moment(ele?.createdAt)?.format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>

                                  <td>
                                    <NavLink
                                      // to="/community-members"
                                      onClick={(e) => {
                                        handleRemoveUser(
                                          e,
                                          ele?.user_id,
                                          ele?.community_id
                                        );
                                      }}
                                      className="textlightBlue border-0 rounded-0 text-decoration-underline"
                                    >
                                      Remove
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

export default CommunityMembers;
