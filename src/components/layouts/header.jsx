import React, { useContext, useState } from "react";
import { UserOutlined, ProductOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
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
];
const Header = () => {
  const [current, setCurrent] = useState("");
  const { user } = useContext(AuthContext);
  console.log(user);
  const onClick = (e) => {
    console.log("click ", e);
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
