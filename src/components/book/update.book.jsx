import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Upload,
  Image,
  notification,
  Select,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { updateBookAPI, uploadFileAPI } from "../../services/api.service";

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
    onBookUpdated, // ✅ callback từ BookTable để reload dữ liệu
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

      if (dataUpdate.thumbnail) {
        setPreviewUrl(
          `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataUpdate.thumbnail
          }`
        );
      } else {
        setPreviewUrl("");
      }
    }
  }, [dataUpdate]);

  const handleBeforeUpload = (file) => {
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    return false;
  };

  const handleUpdateBook = async () => {
    if (!id) {
      notification.warning({
        message: "Lỗi dữ liệu",
        description: "Không xác định được sách để cập nhật.",
      });
      return;
    }

    setLoading(true);
    try {
      let thumbnailName = dataUpdate?.thumbnail || "";

      if (avatarFile) {
        const resUpload = await uploadFileAPI(avatarFile, "book");
        const uploadedFile =
          resUpload?.data?.data?.fileUploaded ||
          resUpload?.data?.fileUploaded ||
          resUpload?.fileUploaded;

        if (uploadedFile) {
          thumbnailName = uploadedFile;
        } else {
          notification.error({
            message: "Upload ảnh thất bại",
            description: JSON.stringify(resUpload?.data || resUpload),
          });
          setLoading(false);
          return;
        }
      }

      const res = await updateBookAPI(
        id,
        thumbnailName,
        mainText,
        author,
        Number(price),
        Number(sold),
        Number(quantity),
        category
      );

      if (res?.data) {
        notification.success({
          message: "Cập nhật thành công",
          description: "Thông tin sách đã được cập nhật.",
        });

        // ✅ Gọi callback để reload dữ liệu trong bảng
        if (onBookUpdated) onBookUpdated(res.data);

        // ✅ Reset form & đóng modal
        setIsModalUpdateOpen(false);
        setId("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setSold("");
        setQuantity("");
        setCategory("");
        setAvatarFile(null);
        setPreviewUrl("");
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
        description: "Không thể cập nhật sách.",
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
            <span>Book Name</span>
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

          {/* <div>
            <span>Sold</span>
            <Input
              type="number"
              value={sold}
              onChange={(e) => setSold(e.target.value)}
            />
          </div> */}

          <div>
            <span>Quantity</span>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div>
            <span>Category</span>
            <Select
              value={category}
              onChange={(value) => setCategory(value)}
              style={{ width: "100%" }}
              placeholder="Chọn thể loại"
              options={[
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
              ]}
            />
          </div>

          <div>
            <Upload
              beforeUpload={handleBeforeUpload}
              showUploadList={false}
              accept="image/*"
              style={{ marginLeft: 10 }}
            >
              <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
            </Upload>

            {previewUrl && (
              <Image
                src={previewUrl}
                alt="thumbnail preview"
                style={{
                  marginTop: 10,
                  width: 120,
                  height: 120,
                  borderRadius: "10px",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBookModal;
