/* eslint-disable no-empty */
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { EmailValidation, formValidation, PasswordValidation } from "../../helper/formValidation";
import BorderAnimation from "../BorderAnimation";
import { LabelHelper } from "../LabelHelper";
import { ICON_HELPER } from "../../helper/IconHelper";
import CustomBackground from "../CustomBackground";
import TitleHelper from "../TitleHelper";
import { register } from "../../api";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../helper/admin/notification_helper";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import _ from "lodash";

const Register = () => {
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);

  const href = useLocation();

  const { content } = _.get(href, "state", {}) || {};

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let formData = {
        ...values,
        role: "customer",
      };
      const result = await register(formData);
      SUCCESS_NOTIFICATION(result);
      navigation("/login");
    } catch (err) {
      console.log(err);

      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex register items-center justify-center relative">
      <TitleHelper title={"Create New Account"} />
      <CustomBackground />
      <div className="rounded-lg absolute  !w-full z-50 top-0 h-full  flex-wrap center_div  shadow-2xl ">
        <div className="w-[80%] min-h-[200px] center_div flex-wrap relative py-14 group">
          <div className="absolute top-5 right-5">
            <Link to={"/"}>
              <CgClose className="text-[30px] text-white" />
            </Link>
          </div>
          <Link to={"/"} className="mb-10 w-full center_div">
            <img src={IMAGE_HELPER.SubhamWhiteLogo} alt="Company Logo" className="w-40" />
          </Link>
          <Form name="login" onFinish={onFinish} layout="vertical" className="flex flex-wrap gap-x-10 w-full justify-center">
            <Form.Item className="w-[38%]" name="name" label={<LabelHelper white={true} title="Username" />} rules={[formValidation("Enter username")]}>
              <Input prefix={<ICON_HELPER.USER_ICON />} placeholder="Enter your username" className="!w-full antd_input" />
            </Form.Item>
            <Form.Item className="w-[38%]" name="email" label={<LabelHelper white={true} title="Email" />} rules={EmailValidation("Enter email")}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" className="!w-full antd_input" />
            </Form.Item>

            <Form.Item className="w-[38%]" name="password" label={<LabelHelper white={true} title="Password" />} rules={[PasswordValidation()]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" className="!w-full antd_input" />
            </Form.Item>

            <Form.Item className="w-[38%]" name="mobile_number" label={<LabelHelper white={true} title="Mobile Number" />} rules={[formValidation("Enter mobile Number")]}>
              <Input type="number" prefix={<ICON_HELPER.CALL_ICON />} placeholder="Enter your Mobile Number" className="!w-full antd_input" />
            </Form.Item>
            <div className="center_div justify-between w-[80%]">
              <Link to="/login" className="sub_heading !text-white hover:text-white pb-4 cursor-default block text-center">
                Already have accout? <span className="text-primary underline cursor-pointer  hover:text-white">Login</span> now.
              </Link>
              <Form.Item>
                <Button loading={loading} type="bg-primary" htmlType="submit" className="primary_button !mt-3 !h-[46px] !w-full">
                  Create New {content} Account
                </Button>
              </Form.Item>
            </div>
          </Form>
          <BorderAnimation />
        </div>
      </div>
    </div>
  );
};

export default Register;
