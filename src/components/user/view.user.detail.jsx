import React from "react";
import { Drawer, Descriptions, Avatar, Divider, Empty } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

  const onClose = () => {
    setDataDetail(null);
    setIsDetailOpen(false);
  };

  return (
    <Drawer
      title="👤 Thông tin chi tiết người dùng"
      width={420}
      onClose={onClose}
      open={isDetailOpen}
      styles={{
        body: { backgroundColor: "#fafafa", paddingBottom: "24px" },
      }}
    >
      {dataDetail ? (
        <div className="flex flex-col items-center text-center">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1677ff", marginBottom: 16 }}
          />
          <h2 className="text-lg font-semibold mb-1">{dataDetail.fullName}</h2>
          <p className="text-gray-500 mb-4">ID: {dataDetail._id}</p>

          <Divider />

          <Descriptions
            column={1}
            bordered
            size="small"
            labelStyle={{ fontWeight: "600", width: "120px" }}
            contentStyle={{ background: "#fff" }}
          >
            <Descriptions.Item
              label={
                <>
                  <MailOutlined /> Email
                </>
              }
            >
              {dataDetail.email || "Không có"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined /> Số điện thoại
                </>
              }
            >
              {dataDetail.phone || "Không có"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <IdcardOutlined /> ID
                </>
              }
            >
              {dataDetail._id}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <Empty
          description={<span>Không có dữ liệu người dùng</span>}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Drawer>
  );
};

export default ViewUserDetail;
