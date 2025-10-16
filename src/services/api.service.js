import axios from "./axios.customize";

// 🧩 Upload file kèm log kiểm tra
const uploadFileAPI = async (file,folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
let config = {
  headers: {
    "upload-type": folder,
    "Content-Type": "multipart/form-data",
  },
};
  const formData = new FormData();
  formData.append("fileImg", file);
  return axios.post(URL_BACKEND,formData,config);
};

// 🧩 API tạo user
const createUserAPI = (data) => {
  console.log("📦 Dữ liệu gửi lên backend:", data);
  return axios.post("/api/v1/user", data);
};

// 🧩 API cập nhật user
const updateUserAPI = (_id, fullName, phone, avatar) => {
  const data = { _id, fullName, phone, avatar };
  console.log("📦 Dữ liệu update gửi lên backend:", data);
  return axios.put("/api/v1/user", data);
};

// 🧩 API lấy tất cả user
const fetchAllUserAPI = (current,pageSize) => axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`);

// 🧩 API xóa user
const deleteUserAPI = (id) => axios.delete(`/api/v1/user/${id}`);

export {
  createUserAPI,
  updateUserAPI,
  fetchAllUserAPI,
  deleteUserAPI,
  uploadFileAPI,
};
