import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { useEffect, useState } from "react";
import { resetPassword, VerifyResetLink } from "../../api";
import _ from "lodash";
import {
  ERROR_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../../helper/admin/notification_helper";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await VerifyResetLink(id);

      if (!_.get(result, "data.data.result", false)) {
        navigate("/not-found");
      }
      
    } catch (error) {
      console.error("Error verifying reset link:", error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const result = await resetPassword({ ...values, reset_url: id });
      SUCCESS_NOTIFICATION(result, "Password reset successfully");
      form.resetFields();
      navigate("/login");
    } catch (err) {
      console.error("Error resetting password:", err);

      if (err.response && err.response.data) {
        ERROR_NOTIFICATION(
          err.response.data.message ||
            "An error occurred while resetting the password."
        );
      } else {
        ERROR_NOTIFICATION("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <img
        src={IMAGE_HELPER.ShipImage}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <img
            src={IMAGE_HELPER.SubhamWhiteLogo}
            alt="Company Logo"
            className="w-40"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="border border-gray-300 p-8 rounded-lg w-full max-w-md shadow-lg">
            <Form
              form={form}
              name="reset_password"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                name="newPassword"
                label={
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-semibold mb-2 text-white"
                  >
                    New Password
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters.",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  className="w-80 h-12"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold mb-2 text-white"
                  >
                    Re-Enter New Password
                  </label>
                }
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  className="w-80 h-12"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  className="w-full h-12 rounded-md uppercase font-semibold text-white bg-[#DF7500] hover:bg-[#e65c00]"
                >
                  Submit
                </Button>
              </Form.Item>

              <p className="text-center mt-4">
                <Link
                  to="/admin"
                  className="text-[#DF7500] hover:text-[#e65c00]"
                >
                  Back to Login
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
