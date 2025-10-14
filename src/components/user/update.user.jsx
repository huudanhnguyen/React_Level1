import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { Button, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    onUserCreated,
  } = props;

  // When the modal opens, automatically load the user's data for editing
  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id || "");
      setFullName(dataUpdate.fullName || "");
      setPhone(dataUpdate.phone || "");
    }
  }, [dataUpdate]);

  const handleClickBtn = async () => {
    const res = await updateUserAPI(id, fullName, phone);

    if (res?.data) {
      notification.success({
        message: "Edit User",
        description: "User updated successfully",
      });

      // Callback to refresh user list
      if (onUserCreated) onUserCreated(res.data);

      // ✅ Close the modal
      setIsModalUpdateOpen(false);

      // Reset form
      setId("");
      setFullName("");
      setPhone("");
      setDataUpdate(null);
    } else {
      notification.error({
        message: "Edit User Error",
        description: JSON.stringify(res?.message),
      });
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Modal
        title="Edit User"
        open={isModalUpdateOpen}
        onOk={handleClickBtn}
        onCancel={() => setIsModalUpdateOpen(false)}
        maskClosable={false}
        okText="Save"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div>
            <span>ID</span>
            <Input value={id} disabled />
          </div>

          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <span>Phone Number</span>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
