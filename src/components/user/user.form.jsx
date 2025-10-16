import { Button, Input, Modal, notification, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { createUserAPI, uploadFileAPI } from "../../services/api.service";

const UserForm = ({ onUserCreated }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Preview ảnh trước khi upload
  const handleBeforeUpload = (file) => {
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    return false; // chặn upload tự động của AntD
  };

  // ✅ Xử lý tạo user
  const handleCreateUser = async () => {
    if (!fullName || !email || !password) {
      notification.warning({
        message: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.",
      });
      return;
    }

    setLoading(true);
    try {
      let avatarFilename = "";

      // 🧩 Upload ảnh trước (nếu có)
      if (avatarFile) {
        const resUpload = await uploadFileAPI(avatarFile, "avatar");
        console.log("🔍 Response upload ảnh:", resUpload);

        // kiểm tra chính xác chỗ chứa tên file
        const uploadedFile =
          resUpload?.data?.data?.fileUploaded ||
          resUpload?.data?.fileUploaded ||
          resUpload?.fileUploaded;

        if (uploadedFile) {
          avatarFilename = uploadedFile;
          console.log("🖼 Ảnh upload thành công:", avatarFilename);
        } else {
          notification.error({
            message: "Upload ảnh thất bại",
            description: JSON.stringify(resUpload?.data || resUpload),
          });
          setLoading(false);
          return;
        }
      }

      // 🧩 Gửi request tạo user
      const newUser = {
        fullName,
        email,
        password,
        phone,
        avatar: avatarFilename,
      };

      console.log("📦 Dữ liệu gửi lên backend:", newUser);

      const res = await createUserAPI(newUser);
      console.log(res.data);

      if (res?.data) {
        notification.success({
          message: "Tạo user thành công",
          description: `${fullName} đã được thêm.`,
        });

        if (onUserCreated) onUserCreated(res.data);

        // ✅ Reset form
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAvatarFile(null);
        setPreviewUrl("");
        setIsModalOpen(false);
      } else {
        notification.error({
          message: "Tạo user thất bại",
          description: JSON.stringify(res?.message),
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Lỗi server",
        description: "Không thể tạo user, vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleCreateUser}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        okText="Create"
        confirmLoading={loading}
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

          <div>
            <Upload
              beforeUpload={handleBeforeUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
            </Upload>

            {previewUrl && (
              <Image
                src={previewUrl}
                alt="avatar preview"
                style={{
                  marginTop: 10,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />
            )}
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
