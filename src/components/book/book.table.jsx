import React, { useEffect, useState } from "react";
import { Table, Space, message, Popconfirm, Button, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import UpdateBookModal from "./update.book";
import ViewBookDetail from "./view.book.detail";

const BookTable = ({ triggerReload, newBook, onUserCreated }) => {
  const [dataBooks, setdataBooks] = useState([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [isDetailOpen, setIsDetailOpen] = useState();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // Load all users
  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res?.data.result) {
      setdataBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  // Initial load
  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  // Reload when triggerReload changes
  useEffect(() => {
    if (triggerReload > 0) loadBook();
  }, [triggerReload]);

  // If a new user is created → prepend to the table
  useEffect(() => {
    if (newBook) {
      setdataBooks((prev) => [newBook, ...prev]);
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
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

const columns = [
  {
    title: "Serial column",
    render: (_, record, index) => {
      return <>{index + 1 + (current - 1) * pageSize}</>;
    },
  },
  {
    title: "ID",
    dataIndex: "_id",
    render: (_, record) => (
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          setDataDetail(record);
          setIsDetailOpen(true);
        }}
      >
        {record._id}
      </a>
    ),
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    render: (thumbnail) => {
      const imgUrl = thumbnail
        ? `${import.meta.env.VITE_BACKEND_URL}/images/book/${thumbnail}`
        : "https://via.placeholder.com/60x80?text=No+Image";
      return (
        <img
          src={imgUrl}
          alt="book thumbnail"
          style={{
            width: 60,
            height: 80,
            objectFit: "cover",
            borderRadius: 6,
            border: "1px solid #eee",
          }}
        />
      );
    },
  },
  { title: "Name", dataIndex: "mainText" },
  { title: "Author", dataIndex: "author" },
  {
    title: "Price",
    dataIndex: "price",
    render: (text) =>
      text
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)
        : "-",
  },
  { title: "Sold", dataIndex: "sold" },
  { title: "Quantity", dataIndex: "quantity" },
  { title: "Category", dataIndex: "category" },
  {
    title: "Action",
    key: "action",
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
  },
];


  return (
    <>
      <Table
        columns={columns}
        dataSource={dataBooks}
        rowKey="_id"
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} on {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      <UpdateBookModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        onUserCreated={onUserCreated}
      />

      <ViewBookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
};

export default BookTable;
