import React from "react";
import { Drawer, Descriptions, Image, Tag, Empty, Divider } from "antd";
import {
  DollarOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const ViewBookDetail = ({ dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen }) => {
  const onClose = () => {
    setDataDetail(null);
    setIsDetailOpen(false);
  };

  const bookImg = dataDetail?.thumbnail
    ? `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`
    : null;

  // ✅ Format giá tiền theo chuẩn Việt Nam Đồng
  const formatPriceVND = (price) => {
    if (!price || isNaN(price)) return "Không xác định";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Drawer
      title={<span style={{ fontSize: "18px" }}>📘 Book Details</span>}
      width={480}
      onClose={onClose}
      open={isDetailOpen}
      styles={{
        body: {
          backgroundColor: "#f8f9fb",
          paddingBottom: 24,
        },
      }}
    >
      {dataDetail ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Ảnh sách */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              width={180}
              height={260}
              src={bookImg}
              fallback="https://via.placeholder.com/180x260?text=No+Image"
              style={{
                borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Tiêu đề + tác giả */}
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: 4 }}>
              {dataDetail.mainText || "Untitled"}
            </h2>
            <Tag color="blue" style={{ fontSize: "14px" }}>
              <UserOutlined /> {dataDetail.author || "Unknown Author"}
            </Tag>
          </div>

          <Divider />

          {/* Thông tin chi tiết */}
          <Descriptions
            bordered
            size="middle"
            column={1}
            labelStyle={{ fontWeight: 600, width: "140px" }}
            contentStyle={{ background: "#fff" }}
          >
            <Descriptions.Item
              label={
                <>
                  <DollarOutlined /> Price
                </>
              }
            >
              <Tag color="green" style={{ fontSize: "15px" }}>
                {formatPriceVND(dataDetail.price)}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <ShoppingOutlined /> Sold
                </>
              }
            >
              {dataDetail.sold || 0}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <AppstoreOutlined /> Quantity
                </>
              }
            >
              {dataDetail.quantity || "0"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <AppstoreOutlined /> Category
                </>
              }
            >
              <Tag color="purple">{dataDetail.category || "N/A"}</Tag>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <IdcardOutlined /> Book ID
                </>
              }
            >
              <code style={{ fontSize: "12px" }}>{dataDetail._id}</code>
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <Empty
          description={<span>No book data available</span>}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 100 }}
        />
      )}
    </Drawer>
  );
};

export default ViewBookDetail;
