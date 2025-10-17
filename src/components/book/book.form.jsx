import {
  Button,
  Input,
  Modal,
  notification,
  Upload,
  Image,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";
import { InputNumber } from "antd";

// 🧩 Danh sách category cố định
const CATEGORY_OPTIONS = [
  { value: "Arts", label: "Arts" },
  { value: "Business", label: "Business" },
  { value: "Comics", label: "Comics" },
  { value: "Cooking", label: "Cooking" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "History", label: "History" },
  { value: "Music", label: "Music" },
  { value: "Sports", label: "Sports" },
  { value: "Teen", label: "Teen" },
  { value: "Travel", label: "Travel" },
];

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

  // ✅ Xử lý tạo book
  const handleCreateBook = async () => {
    if (!mainText || !author || !price || !quantity || !category) {
      notification.warning({
        message: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ thông tin sách.",
      });
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(quantity))) {
      notification.warning({
        message: "Thông tin không hợp lệ",
        description: "Price, Quantity phải là số.",
      });
      return;
    }

    setLoading(true);
    try {
      let avatarFilename = "";

      // Upload ảnh nếu có
      if (avatarFile) {
        // ✅ truyền file và folder đúng cách cho backend
        const resUpload = await uploadFileAPI(avatarFile, "book");

        // ✅ backend của bạn trả về dạng { data: { fileUploaded: "xxx.jpg" } }
        const uploadedFile =
          resUpload?.data?.data?.fileUploaded ||
          resUpload?.data?.fileUploaded ||
          resUpload?.fileUploaded;

        if (uploadedFile) {
          avatarFilename = uploadedFile;
        } else {
          notification.error({
            message: "Upload ảnh thất bại",
            description:
              "Không tìm thấy thông tin file trong phản hồi server: " +
              JSON.stringify(resUpload?.data || {}),
          });
          setLoading(false);
          return;
        }
      }

      // ✅ Gửi dữ liệu tạo book đúng định dạng backend yêu cầu
      const newBook = {
        thumbnail: avatarFilename,
        mainText,
        author,
        price: Number(price),
        sold: Number(sold) || 0,
        quantity: Number(quantity),
        category,
      };

      const res = await createBookAPI(newBook);

      const createdBook = res?.data?.data || res?.data || null;

      if (createdBook) {
        notification.success({
          message: "Tạo book thành công",
          description: `${mainText} đã được thêm.`,
        });
        onBookCreated?.(createdBook);

        // reset form
        setMainText("");
        setAuthor("");
        setPrice("");
        setSold("");
        setQuantity("");
        setCategory("");
        setAvatarFile(null);
        setPreviewUrl("");
        setIsModalOpen(false);
      } else {
        notification.error({
          message: "Tạo book thất bại",
          description: "Phản hồi server không hợp lệ.",
        });
      }
    } catch (error) {
      console.error("Error creating book:", error);
      notification.error({
        message: "Lỗi server",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Không thể tạo book, vui lòng thử lại.",
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
            <InputNumber
              value={price}
              onChange={(value) => setPrice(value)}
              formatter={(value) =>
                value
                  ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
                  : ""
              }
              parser={(value) => (value ? value.replace(/\D/g, "") : "")}
              placeholder="Nhập giá tiền"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <span>Quantity</span>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Nhập số"
            />
          </div>

          <div>
            <span>Category</span>
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn category"
              value={category}
              onChange={(val) => setCategory(val)}
              options={CATEGORY_OPTIONS}
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
                  borderRadius: 8,
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
