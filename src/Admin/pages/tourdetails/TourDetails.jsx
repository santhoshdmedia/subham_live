import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addTask, deleteTask, editTask, getAllBookings, getSingleTour } from "../../../api";
import _ from "lodash";
import moment from "moment";
import { Button, Modal, Input, Select, Form, Collapse, Descriptions, Tag, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import { formValidation } from "../../../helper/formValidation";
import { GET_COLOR } from "../../../helper/admin/role_helper";
 
const TourDetails = () => {
  const { id } = useParams();
  const [tourData, setTourData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [taskData, setTaskData] = useState([]);
  const [taskId, setTaskId] = useState(null); 
  const [bookData,setBookData]=useState("");

  const fetchTour = async () => {
    try {
      setLoading(true);
      const result = await getSingleTour(id);
      setTourData(_.get(result, "data.data", []));
     } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

   const fetchBook=async()=>{
    try{
          const result= await getAllBookings()
          setBookData(_.get(result,"data.data",[]))
           
    }catch(err){
         console.log(err)
    }
   }




  useEffect(()=>{
    fetchBook()
  },[])

  const handleOk = async (values) => {
    try {
      let result = "";
      if (taskId) {
        result = await editTask(values, taskId);
        setTaskId("");
      } else {
        values.tour_id = id;
        result = await addTask(values);
      }
       SUCCESS_NOTIFICATION(result);
      form.resetFields();
      setIsModalOpen(false);
      fetchTour();
    } catch (err) {
       ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const editTaskHandler = (task) => {
    setTaskId(task._id);
    form.setFieldsValue(task);
    setIsModalOpen(true);
  };

  const deleteTaskHandler = async (record) => {
    try {
      const result = await deleteTask(record._id);
      SUCCESS_NOTIFICATION(result);
      fetchTour();  
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

let textStyle = "font-medium text-md font-primary_font";

  const items = [
    {
      id: 1,
      label: <span className={`${textStyle}`}>Package Name</span>,
      children: <span className={`${textStyle}`}>{_.get(tourData, "[0].packages_details[0].package_name", "")}</span>,
    },
    {
      id: 2,
      label: <span className={`${textStyle}`}>From Date</span>,
      children: <span className={`${textStyle}`}>{moment(_.get(tourData, "[0].from_date", "")).format("MMMM Do, YYYY")}</span>,
    },
    {
      id: 3,
      label: <span className={`${textStyle}`}>To Date</span>,
      children: <span className={`${textStyle}`}>{moment(_.get(tourData, "[0].to_date", "")).format("MMMM Do, YYYY")}</span>,
    },
    {
      id: 4,
      label: <span className={`${textStyle}`}>Invoice Number</span>,
      children: <span className={`${textStyle}`}>{_.get(tourData, "[0].invoice_number", "")}</span>,
    },
    {
      id: 5,
      label: <span className={`${textStyle}`}>Package Places</span>,
      children: <span className={`${textStyle}`}>{_.get(tourData, "[0].packages_details[0].package_address", "")}</span>,
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      align: "center",
      render: (s, a, index) => <span>{index + 1}</span>,
    },
    {
      title: "Task",
      dataIndex: "task_name",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "employee_details",
      align: "center",
      render: (text, record) => {
        const assignedEmployeeIds = record.select_employees || [];
        const assignedEmployees = _.get(tourData, "[0].employee_details", []).filter((employee) => assignedEmployeeIds.includes(employee._id));

        return (
          <span>
            {assignedEmployees.map((employee) => (
              <p key={employee._id}>{employee.name}</p>
            ))}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "task_status",
      align: "center",
      render: (status) => {
        let color = "";
        if (status === "ASSIGNED") color = "gray";
        else if (status === "In Progress") color = "blue";
        else if (status === "Completed") color = "green";

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <div>
          <Tag className="bg-green-600 text-white">
            <button onClick={() => editTaskHandler(record)} style={{ marginRight: "8px" }}>
              Edit
            </button>
          </Tag>
          <Tag className="bg-red-600 text-white">
            <button onClick={() => deleteTaskHandler(record)}>Delete</button>
          </Tag>
        </div>
      ),
    },
  ];


  const BookColumns = [
    {
      title: "S.No",
      dataIndex: "_id",
      align: "center",
      render: (s, a, index) => <span>{index + 1}</span>,
    },
  
    {
      title: "Name",
      dataIndex: "user_details",
      render: (text) => _.get(text, "[0].name", "N/A"),  
    },
    {
      title: "Email",
      dataIndex: "user_details",
      render: (text) => _.get(text, "[0].email", "N/A"), 
    },
    {
      title: "Booking By",
      dataIndex: "user_details",
      render: (text) =>   {
        return (
          <Tag
            color={GET_COLOR(_.get( text, "[0].role", ""))?.color}
            className="!font-primary_font capitalize min-w-[100px] py-1 !text-center"
          >
            {_.get(text, "[0].role", "")}
          </Tag>
        );
      },  
    },
    {
      title: "Package Name",
      dataIndex: "packges_details",
      render: (text) => _.get(text, "[0].package_name", "N/A"),  
    },
    {
      title: "Total Members",
      dataIndex: "total_count",
      render: (count) => count || "0", 
    },
    {
      title: "Total Amount",
      dataIndex: "total_price",
      render: (price) => price || "0", 
    },
  ];
  

  return (
    <>
      <Collapse defaultActiveKey={["1"]} collapsible="icon">
        <Collapse.Panel key={"1"} header={<span className="font-medium text-lg font-primary_font">Package Details</span>}>
          <Descriptions items={items} />
        </Collapse.Panel>
        <Collapse.Panel
          extra={
            <button className="bg-primary rounded-lg py-1 px-3 font-bold text-white" onClick={showModal}>
              Add Task
            </button>
          }
          key={"2"}
          header={<span className="font-medium text-lg font-primary_font">Task Details</span>}
        >
          <div>
            <div className="center_div justify-start gap-x-10 ">
              <h1 className="text-[16px] uppercase text-primary">Available Employees:</h1>
              <div className="center_div gap-x-3 justify-start">
                {_.get(tourData, "[0].employee_details", []).map((res, index) => (
                  <Tag key={index}>{res.name}</Tag>
                ))}
              </div>
            </div>
            <div className="flex items-start pt-8">
              <Table pagination={{ pageSize: 8 }} size="small" className="rounded-2xl w-[90%]" bordered columns={columns} dataSource={_.get(tourData, "[0].task_details", [])} />
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel key={"3"} header={<span className="font-medium text-lg font-primary_font">Booking Details</span>}>
            <div>
            <div className="flex items-start pt-8">
              <Table pagination={{ pageSize: 8 }} size="small" className="rounded-2xl w-[90%]" bordered columns={BookColumns} dataSource={bookData} />
            </div>
            </div>
        
        </Collapse.Panel>
      </Collapse>

      <Modal destroyOnClose title="Add Task" open={isModalOpen} footer={false} confirmLoading={loading} onCancel={() => setIsModalOpen(false)}>
        <Form onFinish={handleOk} layout="vertical" form={form}>
          <Form.Item label="Task Name" name="task_name" rules={[formValidation("Please enter task name!")]}>
            <Input placeholder="Enter task name" className="antd_input !w-full" />
          </Form.Item>
          <Form.Item label="Select Employees" name="select_employees" rules={[formValidation("Please select employees!")]}>
            <Select mode="multiple" placeholder="Select employees" className="antd_input">
              {_.get(tourData, "[0].employee_details", []).map((employee) => (
                <Select.Option key={employee._id} value={employee._id}>
                  {employee.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Task Description" name="task_description" rules={[formValidation("Please add employee descriptions!")]}>
            <TextArea placeholder="Enter task description" className="antd_input !h-[150px] !w-full" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">{taskId ? "Update" : "Submit"}</Button>
          </Form.Item>
          -
        </Form>
      </Modal>
    </>
  );
};

export default TourDetails;
