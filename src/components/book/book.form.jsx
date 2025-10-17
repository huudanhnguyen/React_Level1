import { Button, Input, Modal, notification, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";

const BookForm = ({ onBookCreated }) => {
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

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
  const handleCreateBook = async () => {
    if (!mainText || !author || !price || !sold || !quantity || !category) {
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
        const resUpload = await uploadFileAPI(avatarFile, "thumbnail");

        // kiểm tra chính xác chỗ chứa tên file
        const uploadedFile =
          resUpload?.data?.data?.fileUploaded ||
          resUpload?.data?.fileUploaded ||
          resUpload?.fileUploaded;

        if (uploadedFile) {
          avatarFilename = uploadedFile;
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
      const newBook = {
        mainText,
        author,
        price,
        sold,
        quantity,
        category,
        thumbnail: avatarFilename,
      };

      const res = await createBookAPI(newBook);

      if (res?.data) {
        notification.success({
          message: "Tạo Book thành công",
          description: `${mainText} đã được thêm.`,
        });

        if (onBookCreated) onBookCreated(res.data);

        // ✅ Reset form
        setIsModalUpdateOpen(false);
        setId("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setSold("");
        setQuantity("");
      } else {
        notification.error({
          message: "Tạo book thất bại",
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
        title="Create Book"
        open={isModalOpen}
        onOk={handleCreateBook}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        okText="Create"
        confirmLoading={loading}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div>
            <span>Name</span>
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
        <h3>Book Table</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Book
        </Button>
      </div>
    </div>
  );
};

export default BookForm;
