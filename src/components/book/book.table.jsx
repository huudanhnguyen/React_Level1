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

  // 🧩 Load danh sách book từ API
  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res?.data?.result) {
      setDataBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  // 🧩 Lần đầu load
  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  // 🧩 Reload khi tạo mới
  useEffect(() => {
    if (triggerReload > 0) loadBook();
  }, [triggerReload]);

  // 🧩 Khi có newBook → thêm vào đầu danh sách
  useEffect(() => {
    if (newBook) {
      setDataBooks((prev) => [newBook, ...prev]);
    }
  }, [newBook]);

  // 🧩 Xoá book
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

  // 🧩 Xử lý thay đổi phân trang
  const onChange = (pagination) => {
    if (pagination?.current) setCurrent(pagination.current);
    if (pagination?.pageSize) setPageSize(pagination.pageSize);
  };

  // 🧩 Cột hiển thị
  const columns = [
    {
      title: "Serial",
      render: (_, __, index) => index + 1 + (current - 1) * pageSize,
    },
    {
      title: "ID",
      dataIndex: "_id",
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
      render: (price) =>
        price
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)
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
          current,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        onChange={onChange}
      />

      {/* ✅ Modal cập nhật */}
      <UpdateBookModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        onBookUpdated={loadBook} // ✅ Gọi lại loadBook() sau khi cập nhật
      />

      {/* ✅ Modal xem chi tiết */}
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
