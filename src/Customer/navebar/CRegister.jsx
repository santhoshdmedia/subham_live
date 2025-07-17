/* eslint-disable react/prop-types */
import { Button, Checkbox, Form, Input } from "antd";
import { EmailValidation } from "../../helper/formValidation";
import { Link } from "react-router-dom";
import { ICON_HELPER } from "../../helper/IconHelper";

const CRegister = ({ active }) => {
  return (
    <div>
      <Form className={`w-full flex flex-col flex-wrap `} layout="vertical">
        <div className="w-full grid grid-cols-2 gap-x-4">
          <Form.Item name="name" rules={EmailValidation("Enter Short Name")} label="Short Name">
            <Input placeholder="Short Name" className="w-full antd_input" />
          </Form.Item>
          <Form.Item name="name" rules={EmailValidation("Enter Short Name")} label="Contact Number">
            <Input placeholder="Contact Number" className="w-full antd_input" />
          </Form.Item>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-4">
          <Form.Item name="email" rules={EmailValidation("Enter Email")} label="Email">
            <Input placeholder="Email" className="w-full antd_input" />
          </Form.Item>
          <Form.Item name="email" rules={EmailValidation("Enter Email")} label="Confirm Email">
            <Input placeholder="Confirm Email" className="w-full antd_input" />
          </Form.Item>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-4">
          <Form.Item name="email" rules={EmailValidation("Enter Email")} label="Password">
            <Input placeholder="Password" className="w-full antd_input" />
          </Form.Item>
          <Form.Item name="email" rules={EmailValidation("Enter Email")} label="Confirm Password">
            <Input placeholder="Confirm Password" className="w-full antd_input" />
          </Form.Item>
        </div>
        <h1 className="pb-2 center_div gap-x-2 justify-start items-start">
          <ICON_HELPER.INFO_ICON className="!text-lg text-primary" /> Future ticket bookings will be sent to the email address you provide below. Please avoid using a temporary email address.
        </h1>
        <div className="flex items-center gap-x-2 pb-4 !font-medium">
          <Checkbox /> Accept
          <Link to={"#"}>
            <span className="text-blue-500">Terms & Conditions</span>
          </Link>
        </div>
        <Form.Item className="w-full">
          <Button htmlType="submit" className="w-full antd_input !uppercase !font-pri_head !bg-secondary !text-white hover:bg-secondary hover:!text-white">
            {active}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CRegister;
