import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import { useEffect, useState } from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { adminToken, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../helper/admin/notification_helper";
import { EmailValidation, PasswordValidation } from "../../helper/formValidation";
import { login } from "../../api";
import BorderAnimation from "../BorderAnimation";
import { LabelHelper } from "../LabelHelper";
import CustomBackground from "../CustomBackground";
import TitleHelper from "../TitleHelper";
import { CgClose } from "react-icons/cg";

const Login = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const result = await login(values);
      if (_.isEmpty(_.get(result, "data.data.data", []))) {
        return ERROR_NOTIFICATION("Invalid credentials");
      }
      localStorage.setItem(adminToken, _.get(result, "data.data.token", ""));
      SUCCESS_NOTIFICATION(result);
      const role = _.get(result, "data.data.data.role", []);
      if (role === "customer") {
        navigation("/");
      } else {
        navigation("/admin-packages");
      }
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const checkUserLoginStatus = async () => {
    if (localStorage.getItem(adminToken)) {
      navigation("/admin-packages");
    }
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, [navigation]);

  return (
    <div className="w-full h-screen flex items-center justify-center relative p-4">
      <TitleHelper title={"Login"} />
      <CustomBackground />
      <div className="rounded-lg  group w-[400px] min-h-[200px] flex-wrap center_div pt-10 pb-2 max-w-md shadow-2xl relative">
        <div className="absolute top-5 right-5">
          <Link to={"/"}>
            <CgClose className="text-[30px] text-white" />
          </Link>
        </div>
        <Link to={"/"} className="mb-6 w-full center_div">
          <img src={IMAGE_HELPER.SubhamWhiteLogo} alt="Company Logo" className="w-40" />
        </Link>
        <Form name="login" onFinish={onFinish} layout="vertical" initialValues={{ remember: true }} className="w-full">
          <div className="flex justify-center items-center">
            <Form.Item name="email" label={<LabelHelper title="Email" white={true} />} rules={[EmailValidation()]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" className="antd_input" />
            </Form.Item>
          </div>

          <div className="flex justify-center items-center ">
            <Form.Item name="password" label={<LabelHelper title="Password" white={true} />} rules={[PasswordValidation()]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" className="antd_input" />
            </Form.Item>
          </div>
          <Link to="/forgot-password" className="sub_heading text-white pb-4 block text-end pr-10">
            Forgot Password?
          </Link>

          <div className="px-10">
            <Form.Item>
              <Button loading={loading} htmlType="submit" className="primary_button !h-[46px] !w-full">
                Login
              </Button>
            </Form.Item>
            <Link to="/select-role" className="sub_heading !text-white hover:text-white pb-4 cursor-default block text-center">
              Don&apos;t have an account? <span className="text-primary dark:text-red-500 underline cursor-pointer hover:text-white">Register</span> now.
            </Link>
          </div>
        </Form>
        <BorderAnimation />
      </div>
    </div>
  );
};

export default Login;
