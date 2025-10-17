import React, { useEffect, useState } from "react";
import { Table, Space, message, Popconfirm, Button, notification, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { deleteUserAPI, fetchAllUserAPI } from "../../services/api.service";
import UpdateUserModal from "./update.user";
import ViewUserDetail from "./view.user.detail";

const UserTable = ({ triggerReload, newUser, onUserCreated }) => {
  const [dataUsers, setDataUsers] = useState([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [isDetailOpen, setIsDetailOpen] = useState();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // Load all users
  const loadUser = async () => {
    const res = await fetchAllUserAPI(current, pageSize);
    if (res?.data.result) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  useEffect(() => {
    if (triggerReload > 0) loadUser();
  }, [triggerReload]);

  useEffect(() => {
    if (newUser) {
      setDataUsers((prev) => [newUser, ...prev]);
    }
  }, [newUser]);

  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete User",
        description: "User deleted successfully",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Delete User Error",
        description: JSON.stringify(res.message),
      });
    }
  };

  const onChange = (pagination) => {
    if (pagination?.current && pagination.current !== +current) {
      setCurrent(+pagination.current);
    }
    if (pagination?.pageSize && pagination.pageSize !== +pageSize) {
      setPageSize(+pagination.pageSize);
    }
  };

  const columns = [
    {
      title: "Serial",
      render: (_, record, index) => index + 1 + (current - 1) * pageSize,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar, record) => {
        const avatarUrl = avatar
          ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`
          : null;
        return (
          <Avatar
            size={48}
            src={avatarUrl}
            icon={!avatarUrl && <UserOutlined />}
            style={{ border: "1px solid #ddd" }}
          />
        );
      },
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
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
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
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
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
        dataSource={dataUsers}
        rowKey="_id"
        pagination={{
          current,
          pageSize,
          showSizeChanger: true,
          total,
          showTotal: (total, range) => (
            <div>
              {range[0]}-{range[1]} on {total} rows
            </div>
          ),
        }}
        onChange={onChange}
      />

      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        onUserCreated={onUserCreated}
      />

      <ViewUserDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
};

export default UserTable;
