/* eslint-disable react/prop-types */
import { Form, Input, Button, message } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { formValidation } from "../../../helper/formValidation";
import { addblogs, editblogs } from "../../../api";
import { SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import UploadHelper from "../../../helper/UploadHelper";
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ShowImages from "../../../helper/ShowImages";
import JoditEditor from "jodit-react";

const AddBlogs = (props) => {
  const { setLoading, setAddStatus, fetchData, id } = props;
  const [image_path, setImagepath] = useState("");
  const [form] = Form.useForm();
  const [blogdescription, setBlogDescription] = useState("");

  const editor = useRef(null);

  const handleFinish = async (values) => {
    try {
      if (!image_path) {
        return message.warning("Please provide a blog image");
      }

      values.blog_image = image_path;
      // values.blog_description = blogdescription;
      let result = "";
      if (id) {
        result = await editblogs(values, id?._id);
      } else {
        result = await addblogs(values);
      }

      SUCCESS_NOTIFICATION(result);
      setAddStatus(false);
      form.resetFields();
      setImagepath("");
      setBlogDescription("");
    } catch (error) {
      message.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  useEffect(() => {
    if (!_.isEmpty(id)) {
      form.setFieldsValue(id);
      setImagepath(id?.blog_image);
      setBlogDescription(id?.blog_description);
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white shadow-lg p-6 rounded-lg w-full  ">
      <div className=" w-[80%]">
        <Form
          form={form}
          layout="vertical"
          name="add_blog"
          initialValues={{
            remember: true,
          }}
          onFinish={handleFinish}
        >
          <Form.Item className="w-full " name={"blog_image"} label="Blog Image">
            {image_path ? <ShowImages path={image_path} setImage={setImagepath} /> : <UploadHelper setImagepath={setImagepath} />}
          </Form.Item>

          <Form.Item name="blog_author_name" label="Author Name" rules={[formValidation("Enter Author Name")]}>
            <Input placeholder="Enter Author Name" className="h-[50px] w-full rounded-md !bg-white text-gray-800 px-4 focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg" />
          </Form.Item>

          <Form.Item name="blog_name" label="Blog Name" rules={[formValidation("Enter Blog Name")]}>
            <Input placeholder="Enter Blog Name" className="h-[50px] w-full rounded-md  !bg-white text-gray-800 px-4 focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg" />
          </Form.Item>

          <Form.Item name="blog_short_description" label="Short Description" rules={[formValidation("Enter Blog Short Description")]}>
            <Input placeholder="Enter Short Description" className="h-[50px] w-full rounded-md !bg-white text-gray-800 px-4 focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg" />
          </Form.Item>
          <Form.Item name="blog_description" label="Blog Description" rules={[formValidation("Enter Blog Description")]}>
            <JoditEditor ref={editor} className="" />
          </Form.Item>

          <Form.Item>
            <Button type="submit" htmlType="submit" className="w-full bg-secondary text-white py-6 rounded-md hover:bg-secondary-dark transition-all duration-300">
              {id ? "Edit Blog" : "Add Blog"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddBlogs;
