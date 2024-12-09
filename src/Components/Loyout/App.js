/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AdminRoute from "./../../Route/RouteDetails";
import profilePhoto from "../../assets/images/profile.png";
import logo from "./../../assets/images/icons/logo.svg";
import Dropdown from "react-bootstrap/Dropdown";
import myProfileImg from "../../assets/images/dummy-profile1.jpg";
import {
  AppstoreOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  FileExcelOutlined,
  IdcardOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const AppLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("TajurbaAdminToken");
    localStorage.removeItem("TajurbaAdminUser");
    localStorage.removeItem("TajurbaAdmin_priviledge_data");
    localStorage.removeItem("userLocation");
    localStorage.removeItem("attendanceStatus");
    navigate(`../${AdminRoute?.Auth?.Login}`);
  };

  const items = [
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Dashboard" && ele?.is_active
        ).map((ele, index) => ({
          key: "1",
          icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
          path: "/dashboard",
          label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Leave Management" && ele?.is_active
        ).map((ele, index) => ({
          key: "2",
          className: "navLi",
          icon: <CalendarOutlined style={{ fontSize: "20px" }} />,
          label: "Leave Management",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Create Leave" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "21",
                    // label: "Moderator",
                    className: "subUlModerator",
                    path: "/create-leave",
                    label: (
                      <NavLink style={{ display: "block" }} to="/create-leave">
                        Create Leave
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Leave Credits" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "22",
                    // label: "Moderator",
                    className: "subUlModerator",
                    path: "/leave-credit-create",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/leave-credit-create"}
                      >
                        Leave Credits
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),

    ////

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Community" && ele?.is_active
        ).map((ele, index) => ({
          key: "3",
          icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
          label: "Community",

          className: "navLi",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Community" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "31",
                    className: "subUlModerator",
                    path: "/community",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/community"}>
                        Community
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Activity Management" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "32",
                    // label: "Activity Management",
                    className: "subUlModerator",
                    path: "/activity-management",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/activity-management"}
                      >
                        Activity Management
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Leave" && ele?.is_active
        ).map((ele, index) => ({
          key: "4",
          icon: <ScheduleOutlined style={{ fontSize: "20px" }} />,
          className: "navLi",
          label: "Leave and Notifications",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Apply Leave" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "41",
                    // label: "Consumer",
                    className: "subUlModerator",
                    path: "/leave-apply",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/leave-apply"}>
                        Apply Leave
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Notification" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "42",
                    // label: "My Team",
                    path: "/notification",
                    className: "subUlModerator",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/notification"}
                      >
                        Notification
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "User Management" && ele?.is_active
        ).map((ele, index) => ({
          key: "5",
          icon: <IdcardOutlined style={{ fontSize: "20px" }} />,
          className: "navLi",
          label: "User Management",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Consumer" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "51",
                    // label: "Consumer",
                    className: "subUlModerator",
                    path: "/consumers",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/consumers"}>
                        Consumer
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "My Team" && submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "52",
                    // label: "My Team",
                    path: "/my-team",
                    className: "subUlModerator",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/my-team"}>
                        Create User
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Roles" && submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "53",
                    // label: "Roles",
                    path: "/roles",
                    className: "subUlModerator",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/roles"}>
                        Roles
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Holiday" && ele?.is_active
        ).map((ele, index) => ({
          key: "6",
          icon: <CalculatorOutlined style={{ fontSize: "20px" }} />,
          className: "navLi",
          label: "Holiday Management",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Create Holiday" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "60",
                    // label: "Consumer",
                    className: "subUlModerator",
                    path: "/create-holiday",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/create-holiday"}
                      >
                        Create Holiday
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Events" && ele?.is_active
        ).map((ele, index) => ({
          key: "7",
          icon: <AppstoreOutlined />,
          // label: "Events",
          path: "/events",
          label: <NavLink to={"/events"}>Events</NavLink>,
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "All Transactions" && ele?.is_active
        ).map((ele, index) => ({
          key: "8",
          icon: <AppstoreOutlined />,
          // label: "All Transactions",
          path: "/all-transactions",
          label: <NavLink to={"/all-transactions"}>All Transactions</NavLink>,
        }))
      : []),
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Report" && ele?.is_active
        ).map((ele, index) => ({
          key: "9",
          icon: <FileExcelOutlined style={{ fontSize: "20px" }} />,
          className: "navLi",
          label: "Report",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Attendance Report" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "90",
                    // label: "Consumer",
                    className: "subUlModerator",
                    path: "/attendance-report",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/attendance-report"}
                      >
                        Attendance Report
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Task Management" && ele?.is_active
        ).map((ele, index) => ({
          key: "10",
          icon: <IdcardOutlined style={{ fontSize: "20px" }} />,
          className: "navLi",
          label: "Task Management",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Task Planner" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "102",
                    // label: "My Team",
                    path: "/task-planner",
                    className: "subUlModerator",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/task-planner"}
                      >
                        Task Planner
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Task Logs" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "103",
                    // label: "Roles",
                    path: "/task-logs",
                    className: "subUlModerator",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/task-logs"}>
                        Task Logs
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),
  ];
  console.log(items);

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  function searchItemByPath(items, path) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = searchItemByPath(item.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  const searchTerm = "/" + location.pathname.split("/")?.[1];
  const result = searchItemByPath(items, searchTerm);

  function getMenuKeys(key) {
    let group = key.slice(0, -1);
    let resultForMenus = [];
    do {
      resultForMenus.push(group);
      group = group.slice(0, -1);
    } while (group != "");
    return resultForMenus;
  }

  const openKey = result ? getMenuKeys(result?.key?.toString()) : [""];
  const defaultSelectedKeys = [result?.key?.toString()];

  const ShowMenubar = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState([
      localStorage.getItem("stateOpenKeys"),
    ]);
    const [selectedMenu, setSelectedMenu] = useState(
      localStorage.getItem("selectedMenu")
    );

    useEffect(() => {
      localStorage.setItem("selectedMenu", selectedMenu);
    }, [selectedMenu]);

    useEffect(() => {
      localStorage.setItem("stateOpenKeys", stateOpenKeys);
    }, [stateOpenKeys]);

    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => stateOpenKeys.indexOf(key) === -1
      );
      if (latestOpenKey) {
        const keys = stateOpenKeys.concat(latestOpenKey);
        setStateOpenKeys(keys);
        localStorage.setItem("stateOpenKeys", keys);
      } else {
        setStateOpenKeys([]);
      }
    };

    return (
      <Menu
        mode="inline"
        defaultOpenKeys={openKey}
        defaultSelectedKeys={defaultSelectedKeys}
        items={items}
        onOpenChange={onOpenChange}
      ></Menu>
    );
  };
  const closeDropdown = () => {
    // Simulate a click on the toggle to close the dropdown
    document.getElementById("dropdown-basic").click();
  };

  return (
    <>
      <body data-layout="detached" data-topbar="colored">
        <div className="container-fluid">
          <div id="layout-wrapper">
            <header id="page-topbar">
              <div className="navbar-header">
                <div className="container-fluid">
                  <div className="float-end">
                    <div className="dropdown d-inline-block d-lg-none ms-2">
                      <button
                        type="button"
                        className="btn header-item noti-icon waves-effect"
                        id="page-header-search-dropdown"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="mdi mdi-magnify" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-search-dropdown"
                      >
                        <form className="p-3">
                          <div className="m-0">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search ..."
                                aria-label="Recipient's username"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  <i className="mdi mdi-magnify" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* <div className="dropdown d-inline-block notificatiDropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          className="btn header-item noti-icon me-2"
                        >
                          {/* <i className="fa fa-solid fa-bell notificationBellIcon"></i> 
                        </Dropdown.Toggle>
                      </Dropdown>
                    </div> */}

                    <div className="dropdown d-inline-block">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          className="p-0 border-0"
                        >
                          <img
                            className="rounded-circle header-profile-user"
                            src={myProfileImg}
                            alt="Header Avatar"
                          />
                          <span className="d-none d-xl-inline-block ms-1 profileBg">
                            My Profile
                            <i className="fa fa-thin fa-chevron-down d-none d-xl-inline-block ms-2"></i>
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="px-5 py-3">
                          <div className="avtarProfile text-center">
                            <img
                              src={myProfileImg}
                              alt=""
                              className="avatar-md mx-auto rounded-circle"
                            />
                            <h5 className="mb-0 mt-4 textBlack fw-bold">
                              {adminObject?.first_name}
                            </h5>
                            {/* <small className="greyLight">
                              {adminObject?.role_details?.name}
                            </small> */}
                            <br />
                            <NavLink
                              // to="/my-profile"
                              to={`../${AdminRoute?.MyProfile?.MyProfile?.replace(
                                ":id",
                                adminObject?.user_id
                              )}`}
                              onClick={closeDropdown}
                              className="btn profileBtn rounded-pill mt-4 font-size-12"
                              style={{
                                display: "flex",
                                backgroundColor: "#62a6dc",
                                borderRadius: "20px",
                              }}
                            >
                              View Profile
                            </NavLink>
                          </div>
                          <span
                            onClick={() => {
                              handleClickLogout();
                            }}
                            className="mt-3 text-center text-white p-2"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              backgroundColor: "#62a6dc",
                              borderRadius: "20px",
                            }}
                          >
                            <svg
                              width="15.534"
                              height="15.476"
                              viewBox="0 0 15.534 15.476"
                              className="me-2"
                            >
                              <g
                                id="Group_14167"
                                data-name="Group 14167"
                                transform="translate(7637.795 -13948)"
                              >
                                <path
                                  id="Path_10393"
                                  data-name="Path 10393"
                                  d="M0,1.672C.024,1.581.047,1.49.073,1.4A1.907,1.907,0,0,1,1.859.008C3.815,0,5.771,0,7.727,0a.628.628,0,0,1,.655.616.637.637,0,0,1-.6.666,2.009,2.009,0,0,1-.212.008q-2.744,0-5.489,0a1.259,1.259,0,0,0-.343.038.6.6,0,0,0-.433.559c0,.055,0,.111,0,.167q0,5.679,0,11.357a1.091,1.091,0,0,0,.036.328.586.586,0,0,0,.531.428,2.133,2.133,0,0,0,.227.009H7.581a1.519,1.519,0,0,1,.316.024.643.643,0,0,1-.11,1.264c-.025,0-.05,0-.076,0-1.956,0-3.912,0-5.868-.007A1.913,1.913,0,0,1,.032,13.9.689.689,0,0,0,0,13.8V1.672"
                                  transform="translate(-7637.795 13948)"
                                  fill="white"
                                />
                                <path
                                  id="Path_10394"
                                  data-name="Path 10394"
                                  d="M143.908,88.675a1,1,0,0,1-.136-.1q-1.3-1.276-2.591-2.555a.666.666,0,0,1-.22-.7.643.643,0,0,1,.975-.358,1.352,1.352,0,0,1,.183.158l3.755,3.707a.666.666,0,0,1-.005,1.085c-1.248,1.232-2.5,2.459-3.741,3.7a.662.662,0,1,1-.912-.933c.866-.835,1.715-1.687,2.571-2.532.035-.034.067-.071.127-.135h-7.351a1.359,1.359,0,0,1-.3-.02.646.646,0,0,1-.484-.681.639.639,0,0,1,.6-.582c.075-.005.151-.006.227-.006h7.274l.034-.056"
                                  transform="translate(-7768.412 13866.363)"
                                  fill="white"
                                />
                              </g>
                            </svg>
                            Log out
                          </span>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* LOGO */}
                    <div
                      className="navbar-brand-box me-0"
                      style={{ width: "fit-content" }}
                    >
                      <NavLink to="/dashboard" className="logo logo-light">
                        <span className="log">
                          {/* <img
                            src={logo}
                            style={{ width: "60px" }}
                            alt="Mentify Logo"
                          /> */}
                        </span>
                      </NavLink>
                    </div>
                    <h4
                      className="text-white mb-0"
                      style={{ fontWeight: "600", marginTop: "12px" }}
                    >
                      TSM HRMS
                    </h4>
                  </div>
                </div>
              </div>
            </header>
            <div className="vertical-menu">
              <div className="">
                <div className="mt-4" id="sidebar">
                  <ShowMenubar />
                </div>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </body>

      {/* Modal 1 */}
      {/* Model 1 ends */}
      {/* <Outlet /> */}
    </>
  );
};

export default AppLayout;
