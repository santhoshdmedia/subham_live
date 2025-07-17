import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { IMAGE_HELPER } from "../../../helper/Imagehelper";
import { ICON_HELPER } from "../../../helper/IconHelper";
import News from "../../newsLetter/News";
import { useEffect, useState } from "react";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import axios from "axios";
import { mailform } from "../../../api";
const BASE_URL = import.meta.env.MAIL_URL;

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();

  const [loading, setloading] = useState(false);

  // const contactForm = async (data) => {
  //   console.log(data)
  //   try {
  //     const response = await axios.post(
  //       BASE_URL,
  //       data
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error)
  //     throw error.response?.data?.message || "An error occurred while sending the form data.";
  //   }
  // };

  const onFinish = async (values) => {
    try {
      setloading(true);
      const result = await mailform(values);
      SUCCESS_NOTIFICATION(result);
      form.resetFields();
    } catch (err) {
      ERROR_NOTIFICATION(err || "Failed to send the message.");
    } finally {
      setloading(false);
    }
  };

  const contactInfo = [
    {
      id: 1,
      legend: "Tour contact",
      icon: <ICON_HELPER.PHONE_ICON className="text-5xl text-white p-3 rounded-full bg-primary" />,
      content: [{ type: "phone", value: "+91 9087143535" }],
    },
    {
      id: 2,
      legend: "Customer Support",
      icon: <ICON_HELPER.PHONE_ICON className="text-5xl text-white p-3 rounded-full bg-primary" />,
      content: [{ type: "phone", value: "+91 7448893535" }],
    },
    {
      id: 3,
      legend: "Email Now",
      icon: <ICON_HELPER.EMAIL_ICON className="text-5xl text-white p-3 rounded-full bg-primary" />,
      content: [{ type: "email", value: "info@sailsubham.com" }],
    },
    {
      id: 4,
      legend: "Location",
      icon: <ICON_HELPER.LOCATION_ICON className="text-5xl text-white p-3 rounded-full bg-primary" />,
      content: [
        {
          type: "location",
          value: "No: 35, Kumutham Salai, Annamalai Nagar Main Road, Annamalai Nagar, Trichy - 620018, Tamil Nadu, India.",
        },
      ],
    },
    {
      id: 5,
      legend: "Opening Time",
      icon: <ICON_HELPER.TIMING_ICON className="text-5xl text-white p-3 rounded-full bg-primary" />,
      content: [{ type: "time", value: "10:00 AM - 7:00 PM,  Sunday Closed" }],
    },
  ];

  return (
    <div>
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img src={IMAGE_HELPER.ContactBgImage} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="text-center space-y-2 px-4 md:px-8">
            <p className="flex items-center gap-2 font-pri_para text-white justify-start">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ICON_HELPER.RIGHT_ARROW />
              <span className="font-title text-sky-500">Contact</span>
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-left text-white font-bold font-pri_head">Contact</h1>
            <p className="text-sm text-left sm:text-base md:text-lg text-primary font-pri_para">Discover how we can help you!</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:py-10 lg:px-[6vw]">
        <div className="lg:w-1/2 min-h-screen px-4">
          {contactInfo.map((info, index) => (
            <div className="pt-6" key={index}>
              <fieldset className="border border-gray-300 rounded-lg p-5">
                <legend className="text-sm font-primary_font font-semibold pl-2 pr-2 text-gray-700">{info.legend}</legend>
                <div className="flex items-center gap-3 mt-2">
                  {info.icon}
                  <div className="flex flex-col items-start">
                    {info.content.map((item, idx) => (
                      <span key={idx} className="text-lg font-pri_para font-bold hover:text-primary">
                        {item.type === "phone" ? <Link to={`tel:${item.value}`}>{item.value}</Link> : item.type === "email" ? <Link to={`mailto:${item.value}`}>{item.value}</Link> : <p>{item.value}</p>}
                      </span>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>
          ))}
        </div>

        <div className="lg:w-1/2 min-h-screen px-4">
          <div className="lg:pt-10 lg:px-10 bg-gray-200 p-4 shadow-lg min-h-[97vh] rounded-lg">
            <h1 className="text-2xl md:text-3xl font-pri_head font-semibold">Reach Us Anytime</h1>
            <Form form={form} onFinish={onFinish} className="mt-10" layout="vertical">
              <Form.Item name="name" label={<label className="font-pri_para font-bold text-gray-700">Name</label>} rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Danial Scoot" className="placeholder-gray" />
              </Form.Item>
              <div className="lg:flex gap-6">
                <Form.Item className="lg:w-80" name="phone" label={<label className="font-pri_para font-bold text-gray-700">Phone</label>} rules={[{ required: true, message: "Please enter your phone number" }]}>
                  <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item className="lg:w-80" name="email" label={<label className="font-pri_para font-bold text-gray-700">Email</label>} rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                  <Input type="email" placeholder="Email Us...." />
                </Form.Item>
              </div>
              <Form.Item name="message" label={<label className="font-pri_para font-bold text-gray-700">Message</label>} rules={[{ required: true, message: "Please enter your message" }]}>
                <Input.TextArea placeholder="What's on your mind" className="placeholder-gray" />
              </Form.Item>
              <Form.Item>
                <Button className="bg-primary py-5 text-[16px] font-pri_head font-semibold text-white" type="bg-primary" htmlType="submit" loading={loading}>
                  Submit Now
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047240.6119203004!2d78.06274030107667!3d7.854881217482215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sin!4v1726722297347!5m2!1sen!2sin" className="w-full h-[400px]" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

export default Contact;
