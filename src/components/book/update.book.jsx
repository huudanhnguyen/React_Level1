import { useEffect, useState } from "react";
import { Button, Input, Modal, Upload, Image, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { updateUserAPI, uploadFileAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    onUserCreated,
  } = props;

  // ✅ Khi mở modal, tự động load dữ liệu book
  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id || "");
      setMainText(dataUpdate.mainText || "");
      setAuthor(dataUpdate.author || "");
      setPrice(dataUpdate.price || "");
      setSold(dataUpdate.sold || "");
      setQuantity(dataUpdate.quantity || "");
      setCategory(dataUpdate.category || "");

      // ✅ Hiển thị avatar cũ nếu có (ghép URL đầy đủ)
      // if (dataUpdate.avatar) {
      //   setPreviewUrl(
      //     `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
      //       dataUpdate.avatar
      //     }`
      //   );
      // } else {
      //   setPreviewUrl("");
      // }
    }
  }, [dataUpdate]);

  // const handleBeforeUpload = (file) => {
  //   setAvatarFile(file);
  //   setPreviewUrl(URL.createObjectURL(file)); // ✅ Preview ngay ảnh mới
  //   return false; // Ngăn AntD upload tự động
  // };

  const handleUpdateBook = async () => {
    if (!id) {
      notification.warning({
        message: "Lỗi dữ liệu",
        description: "Không xác định được người dùng để cập nhật.",
      });
      return;
    }

    setLoading(true);
    try {
      // let avatarName = dataUpdate?.avatar || "";

      // 🧩 Upload file mới nếu có
      // if (avatarFile) {
      //   const resUpload = await uploadFileAPI(avatarFile);
      //   if (resUpload?.data?.fileUploaded) {
      //     avatarName = resUpload.data.fileUploaded;
      //   }
      // }

      // 🧩 Gửi request cập nhật
      const res = await updateBookAPI(
        id,
        thumbnail,
        mainText,
        author,
        price,
        sold,
        quantity,
        category
      );

      if (res?.data) {
        notification.success({
          message: "Cập nhật thành công",
          description: "Thông tin người dùng đã được cập nhật.",
        });

        if (onUserCreated) onUserCreated(res.data);

        // ✅ Reset state & đóng modal
        setIsModalUpdateOpen(false);
        setId("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setSold("");
        setQuantity("");
        setDataUpdate(null);
      } else {
        notification.error({
          message: "Cập nhật thất bại",
          description: JSON.stringify(res?.message),
        });
      }
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Lỗi server",
        description: "Không thể cập nhật người dùng.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Modal
        title="Edit Book"
        open={isModalUpdateOpen}
        onOk={handleUpdateBook}
        onCancel={() => setIsModalUpdateOpen(false)}
        maskClosable={false}
        okText="Save"
        confirmLoading={loading}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div>
            <span>ID</span>
            <Input value={id} disabled />
          </div>

          <div>
            <span>Full Name</span>
            <Input
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
            />
          </div>

          <div>
            <span>Author</span>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>

          <div>
            <span>Price</span>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div>
            <span>Sold</span>
            <Input value={sold} onChange={(e) => setSold(e.target.value)} />
          </div>

          <div>
            <span>Quantity</span>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <span>Category</span>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* <div>
            <span>Avatar</span>
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
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBookModal;
