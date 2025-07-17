/* eslint-disable no-empty */
import { Form, Input, Button, Select } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import { useEffect, useState } from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { adminToken, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../helper/admin/notification_helper";
import { EmailValidation, formValidation, PasswordValidation } from "../../helper/formValidation";
import { login } from "../../api";
import BorderAnimation from "../BorderAnimation";
import { LabelHelper } from "../LabelHelper";
import CustomBackground from "../CustomBackground";
import TitleHelper from "../TitleHelper";
import { CgClose } from "react-icons/cg";
import { PiBagSimpleBold, PiBagSimpleFill } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { FaRegUser, FaUser } from "react-icons/fa6";

const Login = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const href = useLocation();

  const { content, path } = _.get(href, "state.flag", "");

  useEffect(() => {
    if (!(content && path)) {
      navigation("/");
    }
  }, [content, path]);

  const handleClick = ({ role }) => {
    try {
      navigation(`${path}`, { state: { content: role } });
    } catch (err) {}
  };

  const ROLE_DATA = [
    {
      id: 1,
      icons: <FaUser />,
      role: "Customer",
      content: "Book Your Ticket",
    },
    {
      id: 2,
      icons: <PiBagSimpleFill />,
      role: "Agent",
      content: "Join Now",
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <TitleHelper title={"Select Role"} />
      {/* <CustomBackground /> */}
      <div className="rounded-lg  group  w-[800px] min-h-[300px] flex-col gap-y-2 justify-start center_div shadow-2xl pt-10 pb-2 max-w-md  relative">
        <Link to={"/"} className="  w-full center_div ">
          <img src={IMAGE_HELPER.SubhamLogo} alt="Company Logo" className="w-40" />
        </Link>
        <div className="flex flex-col gap-y-4 pt-4 !w-[80%]  !mx-[10%]">
          <h1 className="text-center">Select Your Role To {content} Your Account</h1>
          <Form className="!w-full" onFinish={handleClick}>
            <Form.Item name="role" className="!w-full" rules={[formValidation("Please Select Your Role")]}>
              <Select className="!w-full h-[50px]" placeholder={`Select Your Role`}>
                {ROLE_DATA.map((res, index) => {
                  return (
                    <Option key={index} value={res.role}>
                      {res.role}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button block htmlType="submit" className="!h-[50px] !bg-primary !text-white">
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
