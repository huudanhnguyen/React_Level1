import React, { useState } from "react";

import { Button, Drawer } from "antd";
const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const showDrawer = () => {
    setIsDetailOpen(true);
  };

  const onClose = () => {
    setDataDetail(null);
    setIsDetailOpen(false);
  };
  return (
    <>
      <Drawer
        title="Thông tin chi tiết"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={isDetailOpen}
      >
        {dataDetail ? (
          <>
            <p>ID:{dataDetail._id}</p>
            <p>Full Name:{dataDetail.fullName}</p>
            <p>Email:{dataDetail.email}</p>
            <p>Phone Number:{dataDetail.phone}</p>
          </>
        ) : (
          <>
            <p>Không có dữ liệu</p>
          </>
        )}
      </Drawer>
    </>
  );
};
export default ViewUserDetail;
