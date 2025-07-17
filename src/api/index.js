import axios from "axios";
import { adminToken } from "../helper/admin/notification_helper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOAD_BASE_URL = import.meta.env.VITE_API_UPLOAD_BASE_URL;
const MAIL_HELPER = import.meta.env.VITE_API_MAIL_URL;
console.log(MAIL_HELPER, "mknbcxzx");

let searchData = (value) => {
  return value || null;
};

//Admin
//authntication without token
export const login = async (formData) => await axios.post(`${BASE_URL}/auth/login`, formData);
export const register = async (formData) => await axios.post(`${BASE_URL}/customers/register_user`, formData);

const custom_request = axios.create();

custom_request.interceptors.request.use((config) => {
  const token = localStorage.getItem(adminToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// password
export const changePassword = async (oldPassword, newPassword) =>
  await custom_request.post(`${BASE_URL}/auth/change_password`, {
    oldPassword,
    newPassword,
  });

// upload image
export const uploadImage = async (formData) => await custom_request.post(`${UPLOAD_BASE_URL}/upload_images`, formData);

// authntication
export const checkLoginStatus = async () => await custom_request.get(`${BASE_URL}/auth/check-login`);
export const editUser = async (formData, id) => await custom_request.put(`${BASE_URL}/user/edit_user/${id}`, formData);
export const forgotPassword = async (formData) => await axios.post(`${BASE_URL}/auth/forgot_password`, formData);
export const resetPassword = async (formData) => await axios.post(`${BASE_URL}/auth/reset-password`, formData);
export const VerifyResetLink = async (id) => await axios.get(`${BASE_URL}/auth/verifyreset_link/${id}`);

// blogs
export const addblogs = async (formData) => {
  return await custom_request.post(`${BASE_URL}/blogs/add_blogs`, formData);
};
export const getblogs = async (serach) => await custom_request.get(`${BASE_URL}/blogs/get_blogs/${searchData(serach)}`);

export const deleteblogs = async (id) => await custom_request.delete(`${BASE_URL}/blogs/delete_blogs/${id}`);
export const editblogs = async (formData, id) => await custom_request.put(`${BASE_URL}/blogs/update_blogs/${id}`, formData);

// employee
export const addEmployee = async (formData) => await custom_request.post(`${BASE_URL}/user/add_user`, formData);
export const getEmployee = async (search) => await custom_request.get(`${BASE_URL}/user/get_users/${searchData(search)}`);
export const getAllAreaAdmins = async () => await custom_request.get(`${BASE_URL}/user/get_area_admin`);
export const getSingleUser = async (id) => await custom_request.get(`${BASE_URL}/user/get_single_user/${id || null}`);
export const editEmployee = async (formData, id) => await custom_request.put(`${BASE_URL}/user/edit_user_details/${id}`, formData);

// customers
export const getAllCustomers = async (id) => await custom_request.get(`${BASE_URL}/user/getall_customers/${id}`);

// dashboard counts
export const getAllDashboardCounts = async () => await custom_request.get(`${BASE_URL}/dashboard/getall_dashboard_counts`);

// client side
export const getAllblogs = async () => await axios.get(`${BASE_URL}/Client/getAll_blogs`);
export const getAllpackages = async () => await axios.get(`${BASE_URL}/Client/getAll_packages`);
export const getSinglepackage = async (id) => await axios.get(`${BASE_URL}/Client/getSingle_package/${id}`);
export const getSingletour = async (id) => await axios.get(`${BASE_URL}/Client/getSingle_tour/${id}`);
export const booking = async (formData) => await custom_request.post(`${BASE_URL}/Client/booking`, formData);
export const getSingle_booking = async () => await custom_request.get(`${BASE_URL}/Client/getSingle_booking`);
export const subscribe = async (formData) => await axios.post(`${BASE_URL}/Client/subscribe`, formData);

// dashboard recent five useers
export const getFiveUsers = async () => await custom_request.get(`${BASE_URL}/dashboard/get_recent_five`);
export const getFiveBooking = async () => await custom_request.get(`${BASE_URL}/dashboard/get_five_booking`);

//package
export const addPackages = async (formData) => await custom_request.post(`${BASE_URL}/package/add_package`, formData);
export const getPackages = async (search) => await custom_request.get(`${BASE_URL}/package/get_package/${searchData(search)}`);
export const deletePackages = async (id) => await custom_request.delete(`${BASE_URL}/package/delete_package/${id}`);
export const editPackages = async (formData, id) => await custom_request.put(`${BASE_URL}/package/edit_package/${id}`, formData);
export const get_india_packages = async () => await custom_request.get(`${BASE_URL}/package/get_india_package`);
export const get_srilanka_packages = async () => await custom_request.get(`${BASE_URL}/package/get_srilanka_package`);

//toure
export const addTour = async (formData) => await custom_request.post(`${BASE_URL}/tour/add_tour`, formData);
export const getTour = async (search) => await custom_request.get(`${BASE_URL}/tour/get_tour/${searchData(search)}`);
export const deleteTour = async (id) => await custom_request.delete(`${BASE_URL}/tour/delete_tour/${id}`);
export const editTour = async (formData, id) => await custom_request.put(`${BASE_URL}/tour/edit_tour/${id}`, formData);

// client Tour
export const searchTour = async (formData) => {
  return await custom_request.get(`${BASE_URL}/tour/search_tour/${formData}`);
};
export const getSingleTour = async (id) => {
  return await custom_request.get(`${BASE_URL}/tour/get_single_tour/${id}`);
};

//task
export const addTask = async (formData) => {
  return await custom_request.post(`${BASE_URL}/task/add_task`, formData);
};
export const getTask = async () => await custom_request.get(`${BASE_URL}/task/get_task`);
export const editTask = async (formData, id) => {
  return await custom_request.put(`${BASE_URL}/task/edit_task/${id}`, formData);
};
export const deleteTask = async (id) => await custom_request.delete(`${BASE_URL}/task/delete_task/${id}`);
export const getSingleTask = async (id) => await custom_request.get(`${BASE_URL}/task/get_single_task/${id}`);

//admin side booking get
export const getAllBookings = async () => await custom_request.get(`${BASE_URL}/dashboard/get_all_booking`);
export const adminTask = async () => await custom_request.get(`${BASE_URL}/task/admin_task`);

export const resetdays = async (formData) => await custom_request.put(`${BASE_URL}/days/update_days`, formData);

// resetdays
export const getresetdays = async () => await custom_request.get(`${BASE_URL}/days/get_reset_days`);

// conatct
export const conatctForm = async (formdata) => await custom_request.post(`${BASE_URL}/contact/form_contact`, formdata);

//MAIL
export const mailform = async (data) => await axios.post(`${MAIL_HELPER}/submit_form`, data);

export const add_background_image = async (formdata) => await axios.post(`${BASE_URL}/hero/add_background_image`, formdata);
export const get_background_image = async () => await axios.get(`${BASE_URL}/hero/get_background_image`);
export const delete_background_image = async (id) => await axios.delete(`${BASE_URL}/hero/delete_background_image/${id}`);

export const add_pop_message = async (formdata) => await axios.post(`${BASE_URL}/hero/add_pop_message`, formdata);
export const get_pop_message = async () => await axios.get(`${BASE_URL}/hero/get_pop_message`);
export const delete_pop_message = async (id) => await axios.delete(`${BASE_URL}/hero/delete_pop_message/${id}`);
export const update_pop_status = async (id, pop_status) => await axios.put(`${BASE_URL}/hero/change_pop_message/${id}`, { pop_status });
