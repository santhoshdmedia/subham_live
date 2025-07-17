// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import TitleHelper from "../../../component/TitleHelper";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { changePassword } from "../../../api";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import { formValidation } from "../../../helper/formValidation";

const Changepassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const { oldPassword, newPassword } = values;
      const result = await changePassword(oldPassword, newPassword);
      console.log(result);
      form.resetFields();
      SUCCESS_NOTIFICATION(result);
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-[580px] w-full bg-gray-100">
      <TitleHelper title={"Change Password"} />
      <DefaultHeader pageName={"Change Password"} icon={<ICON_HELPER.PASSWORD_ICON />} search={false} add={false} />
      <div className="w-[93%] pt-6">
        <div className="flex gap-x-10 flex-wrap gap-y-6">
          <Form onFinish={handleFinish} layout="vertical" form={form} className="flex items-center gap-x-4 flex-wrap">
            <Form.Item rules={[formValidation("Enter Valid old Password")]} name="oldPassword" label={<h1 className="!font-primary_font text-black">Old Password</h1>}>
              <Input.Password placeholder="Enter Old Password" className="antd_input !w-[400px]" />
            </Form.Item>
            <Form.Item rules={[formValidation("Enter Valid New Password")]} name="newPassword" label={<h1 className="!font-primary_font text-black">New Password</h1>} className="w-full">
              <Input.Password placeholder="Enter New Password" className="antd_input !w-[400px]" />
            </Form.Item>
            <Form.Item className="w-full">
              <Button className="!w-[400px] primary_button !h-[50px] !px-10" htmlType="submit" loading={loading}>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
