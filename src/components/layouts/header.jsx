import React, { Children, useContext, useState } from "react";
import {
  UserOutlined,
  ProductOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("");
  const { user } = useContext(AuthContext);
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <ProductOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(user.id
      ? [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: "Logout",
                key: "logout",
                icon: <LogoutOutlined />,
              },
            ],
          },
        ]
      : []),
  ];
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
