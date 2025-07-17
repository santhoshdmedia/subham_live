import { Button, Form, Input, message, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { addTour, editTour, getEmployee, getPackages } from "../../../api";
import _ from "lodash";
import moment from "moment"; 
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";

const AddTour = (props) => {
  const { setLoading, setAddStatus, fetchData, id ,tour} = props;
  const [form] = Form.useForm();
  const [employee, setEmployee] = useState([]);
  const [packages, setPackages] = useState([]);

  const handleFinish = async (values) => {
    try {
      let result = "";
      if (id) {
        result = await editTour(values, id?._id);
       } else {
        result = await addTour(values);
      }
      SUCCESS_NOTIFICATION(result);
      setAddStatus(false);
      form.resetFields();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  useEffect(() => {
    if (id) {
      form.setFieldsValue({ ...id ,   from_date: moment(id.from_date, "YYYY-MM-DD"),  
        to_date: moment(id.to_date, "YYYY-MM-DD"), }); 
    } else {
      form.resetFields();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const result = await getEmployee();
      const employees = _.get(result, "data.data", []);

      const ferryStaffs = employees.filter((employee) => employee.role === "ferry_staff");
      setEmployee(ferryStaffs);
    } catch (err) {
      message.error("Failed to fetch employees");
    }
  };

  const fetchPackages = async () => {
    try {
      const result = await getPackages();
      const packagesList = _.get(result, "data.data", []);
      setPackages(packagesList);
    } catch (err) {
      message.error("Failed to fetch packages");
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchPackages();
  }, []);

  return (
    <>
   <div className="bg-white shadow-md p-8 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Tour</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
         <Form.Item
          label="From Date"
          name="from_date"
          rules={[{ required: true, message: "Please enter from date" }]}
        >
          <DatePicker
            placeholder="Select From Date"
            className="w-full antd_input"
          />
        </Form.Item>

         <Form.Item
          label="To Date"
          name="to_date"
          rules={[{ required: true, message: "Please enter to date" }]}
        >
          <DatePicker placeholder="Select To Date" className="w-full antd_input" />
        </Form.Item>

         <Form.Item
          label="Select Packages"
          name="select_packages"
          rules={[{ required: true, message: "Please select a package" }]}
        >
          <Select
            placeholder="Select Your Package"
            className="w-full antd_input"
          >
            {packages.map((pkg) => (
              <Select.Option key={pkg._id} value={pkg._id}>
                {pkg.package_name},{pkg.days}d/{pkg.night}n
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

         <Form.Item
          label="Select Employees"
          name="select_employees"
          rules={[{ required: true, message: "Please select employees" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select Ferry Staff"
            className="w-full antd_input"
          >
            {employee.map((staff) => (
              <Select.Option key={staff._id} value={staff._id}>
                {staff.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

         <div className="md:col-span-2 flex justify-center">
          <Form.Item>
            <Button
              type="submit"
              htmlType="submit"
              className=" submit_button bg-primary text-white"
            >
             {id ? "Edit Tour" : "Add Tour"}  
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
    </>
  );
};

export default AddTour;
