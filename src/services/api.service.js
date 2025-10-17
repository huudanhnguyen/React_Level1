import Password from "antd/es/input/Password";
import axios from "./axios.customize";

// 🧩 Upload file kèm log kiểm tra
const uploadFileAPI = async (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("fileImg", file);
  return axios.post(URL_BACKEND, formData, config);
};

// 🧩 API tạo user
const createUserAPI = (data) => {
  return axios.post("/api/v1/user", data);
};

// 🧩 API cập nhật user
const updateUserAPI = (_id, fullName, phone, avatar) => {
  const data = { _id, fullName, phone, avatar };
  return axios.put("/api/v1/user", data);
};

// 🧩 API lấy tất cả user
const fetchAllUserAPI = (current, pageSize) =>
  axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`);

// 🧩 API xóa user
const deleteUserAPI = (id) => axios.delete(`/api/v1/user/${id}`);

const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const loginAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 2000,
  };
  return axios.post(URL_BACKEND, data);
};
const getAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};
const logoutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

// Book
const createBookAPI = (data) => {
  return axios.post("/api/v1/book", data);
};

const updateBookAPI = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  const data = {
    _id,
    thumbnail,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  };
  return axios.put("/api/v1/book", data);
};

const fetchAllBookAPI = (current, pageSize) =>
  axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}`);

const deleteBookAPI = (id) => axios.delete(`/api/v1/book/${id}`);

export {
  createUserAPI,
  updateUserAPI,
  fetchAllUserAPI,
  deleteUserAPI,
  uploadFileAPI,
  registerUserAPI,
  loginAPI,
  getAccountAPI,
  logoutAPI,
  createBookAPI,
  updateBookAPI,
  fetchAllBookAPI,
  deleteBookAPI,
};
