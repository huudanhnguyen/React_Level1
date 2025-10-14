import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchAllUserAPI } from "../../services/api.service";
import UpdateUserModal from "./update.user";
import ViewUserDetail from "./view.user.detail";

const UserTable = ({ triggerReload, newUser, onUserCreated }) => {
  const [dataUsers, setDataUsers] = useState([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [isDetailOpen, setIsDetailOpen] = useState();

  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    if (res?.data) {
      setDataUsers(res.data);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Nếu có triggerReload (biến đếm) → reload lại
  useEffect(() => {
    if (triggerReload > 0) loadUser();
  }, [triggerReload]);

  // Nếu có user mới → thêm lên đầu
  useEffect(() => {
    if (newUser) {
      setDataUsers((prev) => [newUser, ...prev]);
    }
  }, [newUser]);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href=""
            onClick={(e) => {
              e.preventDefault(); // 🔥 Ngăn reload lại trang
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <EditOutlined
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
            />
            <DeleteOutlined />
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey="_id" />
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
