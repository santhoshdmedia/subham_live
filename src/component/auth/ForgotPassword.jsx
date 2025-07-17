import { Button, Form, Input, message } from "antd";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom"; 
import { MailOutlined } from "@ant-design/icons";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { forgotPassword } from "../../api";
import { useState } from "react";

const ForgotPassword = () => {
  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false); 

  const onFinish = async (values) => {
    setLoading(true); 
    try {
      const response = await forgotPassword({ email: values.email });
      message.success('Password reset link sent to your email! ' + response.data.message);
      form.resetFields(); 
    } catch (error) {
      message.error(error.response?.data?.message || 'Error sending password reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative p-4">
      <img src={IMAGE_HELPER.ShipImage} alt="Background" className="absolute w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <img src={IMAGE_HELPER.SubhamWhiteLogo} alt="Company Logo" className="w-40" />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="border border-gray-300 p-8 rounded-lg w-full max-w-md shadow-lg">
            <Form
              name="email_form"
              onFinish={onFinish}
              layout="vertical"
              form={form}
            >
              <Form.Item
                name="email"
                label={
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white">
                    Email
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Enter your email" 
                  className="custom-placeholder w-full h-12 rounded-md" 
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full h-12 rounded-md mx-auto block uppercase font-semibold text-white bg-primary tracking-wider hover:bg-primary"
                  loading={loading} 
                  disabled={loading} 
                >
                  {loading ? 'Sending...' : 'Proceed'} 
                </Button>
              </Form.Item>
              <p className="text-center mt-4 text-white">
                <MdKeyboardDoubleArrowLeft className="inline-block align-middle text-lg -mt-1" />
                <Link to="/login" className="text-white hover:text-white"> 
                  Back
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
