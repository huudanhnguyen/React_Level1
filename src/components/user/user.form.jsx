import Input from "antd/es/input/Input";
import { Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = ({ onUserCreated }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickBtn = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res?.data) {
      notification.success({
        message: "Create User",
        description: "User created successfully",
      });

      // ✅ Trigger callback to add the new user to the list
      if (onUserCreated) onUserCreated(res.data);

      setIsModalOpen(false);
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } else {
      notification.error({
        message: "Create User Error",
        description: JSON.stringify(res?.message),
      });
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleClickBtn}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        okText="Create"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <span>Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <span>Phone Number</span>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>User Table</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create User
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
