import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

const menuData = [
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Content Creation",
    childrens: [
      {
        title: "Creator",
        childrens: [
          {
            title: "Create New",
            path: "/create-new-content-creation",
          },
        ],
      },
      {
        title: "Moderator",
        path: "/moderator",
      },
    ],
  },
  {
    title: "Community",
    childrens: [
      {
        title: "Community",
        path: "/community",
      },
      {
        title: "Activity Management",
        path: "/activity-management",
      },
    ],
  },
  {
    title: "Subscription Plans",
    path: "/subscription-plans",
  },
  {
    title: "User Management",
    childrens: [
      {
        title: "Consumer",
        path: "/consumers",
      },
      {
        title: "My Team",
        path: "/my-team",
      },
      {
        title: "Roles",
        path: "/roles",
      },
    ],
  },
  {
    title: "Holiday",
    childrens: [
      {
        title: "Create Holiday",
        path: "/create-holiday",
      },
    ],
  },
  {
    title: "Events",
    path: "/events",
  },
  {
    title: "All Transactions",
    path: "/all-transactions",
  },
  {
    title: "Leave Management",
    path: "/leave-management",
  },
];

const generateMenuItems = (data) => {
  return data.map((item) => {
    const key = item.path;
    const icon = <AppstoreOutlined />; // You can set the icon accordingly
    const path = item.path;

    if (item.childrens) {
      return (
        <Menu.SubMenu key={key} title={item.title} icon={icon}>
          {generateMenuItems(item.childrens)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={key} icon={icon}>
          <NavLink
            to={path}
            // onClick={(e) => {
            //   e.preventDefault();
            // }}
          >
            {item.title}{" "}
          </NavLink>
        </Menu.Item>
      );
    }
  });
};

export default function MenuNavbar() {
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
      >
        {generateMenuItems(menuData)}
      </Menu>
    </div>
  );
}
