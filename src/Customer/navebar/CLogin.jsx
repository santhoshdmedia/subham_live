/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd";
import { EmailValidation, PasswordValidation } from "../../helper/formValidation";

const CLogin = ({ active }) => {
  return (
    <div>
      <Form className={`w-full flex  flex-col gap-x-2`} layout="vertical">
        <Form.Item name="email" rules={EmailValidation("Enter Email")} label="Email">
          <Input placeholder="Email" className="w-full antd_input" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[PasswordValidation("Enter Email")]}>
          <Input placeholder="Password" className="w-full antd_input" />
        </Form.Item>
        <Form.Item>
          <Button className="w-full antd_input !uppercase !font-pri_head !bg-secondary !text-white hover:bg-secondary hover:!text-white">{active}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CLogin;
