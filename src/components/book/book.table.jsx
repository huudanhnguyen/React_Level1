import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import UpdateBookModal from "./update.book";
import ViewBookDetail from "./view.book.detail";

const BookTable = ({ triggerReload, newBook }) => {
  const [dataBooks, setDataBooks] = useState([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res?.data?.result) {
      setDataBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  useEffect(() => {
    if (triggerReload > 0) loadBook();
  }, [triggerReload]);

  useEffect(() => {
    if (newBook) {
      setDataBooks((prev) => [newBook, ...prev]);
    }
  }, [newBook]);

  const handleDeleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete Book",
        description: "Book deleted successfully",
      });
      await loadBook();
    } else {
      notification.error({
        message: "Delete Book Error",
        description: JSON.stringify(res.message),
      });
    }
  };

  const onChange = (pagination) => {
    if (pagination?.current) setCurrent(pagination.current);
    if (pagination?.pageSize) setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "#",
      render: (_, __, index) => index + 1 + (current - 1) * pageSize,
      width: 60,
      fixed: "left",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "ID",
      dataIndex: "_id",
      width: 180,
      render: (_, record) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setDataDetail(record);
            setIsDetailOpen(true);
          }}
        >
          {record._id}
        </a>
      ),
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      width: 90,
      render: (thumbnail) => {
        const imgUrl = thumbnail
          ? `${import.meta.env.VITE_BACKEND_URL}/images/book/${thumbnail}`
          : "https://via.placeholder.com/60x80?text=No+Image";
        return (
          <img
            src={imgUrl}
            alt="book thumbnail"
            style={{
              width: 50,
              height: 70,
              objectFit: "cover",
              borderRadius: 4,
              border: "1px solid #eee",
            }}
          />
        );
      },
      responsive: ["md", "lg"],
    },
    {
      title: "Name",
      dataIndex: "mainText",
      width: 200,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Author",
      dataIndex: "author",
      width: 150,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 120,
      render: (price) =>
        price
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)
          : "-",
      responsive: ["xs", "sm", "md", "lg"],
    },
    { title: "Sold", dataIndex: "sold", width: 80, responsive: ["md", "lg"] },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 100,
      responsive: ["lg"],
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 120,
      responsive: ["md", "lg"],
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ color: "#1677ff", cursor: "pointer" }}
          />
          <Popconfirm
            title="Delete Book"
            description="Are you sure you want to delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  return (
    <div style={{ overflowX: "auto", padding: "10px" }}>
      <Table
        columns={columns}
        dataSource={dataBooks}
        rowKey="_id"
        scroll={{ x: "max-content" }} // ✅ Cho phép cuộn ngang nếu màn hình nhỏ
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        onChange={onChange}
      />

      {/* Modal cập nhật */}
      <UpdateBookModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        onBookUpdated={loadBook}
      />

      {/* Modal xem chi tiết */}
      <ViewBookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </div>
  );
};

export default BookTable;
