import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import ShowImages from "../../../helper/ShowImages";
import UploadHelper from "../../../helper/UploadHelper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import "react-quill/dist/quill.snow.css";

import { add_background_image, add_pop_message } from "../../../api";
import ReactQuill from "react-quill";
import _ from "lodash";

const AddHero = (props) => {
  const { setLoading, setAddStatus, fetchCallback, id, packageData } = props;
  const [image_path, setImagepath] = useState("");
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setImagepath("");
    setAddStatus(false);
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      if (packageData?.type === "image") {
        if (!image_path) return message.warning("Please upload an image");
        const result = await add_background_image({ background_image: image_path });
        SUCCESS_NOTIFICATION(result);
      }

      if (packageData?.type === "pop") {
        if (!values.pop_message) return message.warning("Please enter a message");
        const result = await add_pop_message({ pop_message: values.pop_message, pop_status: _.get(packageData, "pop_status", "") });
        SUCCESS_NOTIFICATION(result);
      }
      setAddStatus(false);
      form.resetFields();
      setImagepath("");

      if (fetchCallback) fetchCallback();
    } catch (error) {
      console.log(error);
      ERROR_NOTIFICATION(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish} initialValues={{ pop_message: packageData?.message || "" }}>
      {packageData?.type === "image" && <Form.Item label="Background Image">{image_path ? <ShowImages path={image_path} setImage={setImagepath} /> : <UploadHelper setImagepath={setImagepath} />}</Form.Item>}

      {packageData?.type === "pop" && (
        <Form.Item label="Pop Description" name="pop_message" rules={[{ required: true, message: "Please enter a message" }]}>
          <ReactQuill theme="snow" placeholder="Enter Pop Message" className="w-full bg-white !h-[500px] text-gray-800 p-4 shadow-lg" />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full bg-secondary text-white py-6 rounded-md hover:bg-secondary-dark transition-all duration-300">
          Submit
        </Button>
        <Button onClick={handleCancel} className="w-full mt-2 text-gray-800 py-6 rounded-md border hover:bg-gray-100">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddHero;
