import { notification } from "antd";
import _ from "lodash";

export const SUCCESS_NOTIFICATION = (success_message) => {
  return notification.success({ message: _.get(success_message, "data.message", "") });
};

export const ERROR_NOTIFICATION = (err_message) => {
  return notification.warning({ message: _.get(err_message, "response.data.message", "") });
};

export const CUSTOM_ERROR_NOTIFICATION = (err_message) => {
  return notification.error({ message: err_message || "Something Went wrong" });
};

export const ADD_LOCAL_STORAGE = (key, value) => {
  localStorage.setItem(key, value);
};

// Names  

export const adminToken = "admin_token";
