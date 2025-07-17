import { Table, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { adminTask, editTask } from '../../../api';
import _ from 'lodash';
import moment from 'moment';
import DefaultHeader from '../customComponents/DeafaultHeader';
import { ICON_HELPER } from '../../../helper/IconHelper';

const { Option } = Select; 

const TaskDetails = () => {
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await adminTask();
      setTaskData(_.get(result, "data.data", []));
     } catch {
     } finally {
      setLoading(false);
    }
  };
  const updateTaskStatus = async (newStatus, taskId) => { 
     try {
       setLoading(true);  
       const result = await editTask({ task_status: newStatus }, taskId); 
       SUCCESS_NOTIFICATION(result);
       fetchData();  
     } catch (err) {
       ERROR_NOTIFICATION(err);
     } finally {
       setLoading(false);  
     }
   };
   

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      align: "center",
      render: (s, a, index) => <span>{index + 1}</span>,
    },
    {
      title: "Task Name",
      dataIndex: "task_name",
    },
    {
      title: "Task Description",
      dataIndex: "task_description",
    },
    {
      title: "Start Date",
      dataIndex: "tour_details",
      render: (tourDetails) => {
        const fromDate = _.get(tourDetails, "[0].from_date");
        return fromDate ? moment(fromDate).format("YYYY-MM-DD") : "N/A";
      },
    },
    {
      title: "End Date",
      dataIndex: "tour_details",
      render: (tourDetails) => {
        const toDate = _.get(tourDetails, "[0].to_date");
        return toDate ? moment(toDate).format("YYYY-MM-DD") : "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "task_status",
      render: (status, record) => (
          <Select
            defaultValue={status}  
            style={{ width: 120 }}
            onChange={(value) => updateTaskStatus(value, record._id)}  
          >
            <Option value="In Progress" ><span className='text-blue-600'>In Progress</span></Option>
            <Option value="Completed" ><span className='text-green-600'>Completed</span></Option>
          </Select>
        ),
    },
  ];

  return (
    <div>
     <DefaultHeader pageName={"Your Task"} add={false} search={false}  icon={<ICON_HELPER.TASK_ICON/>}/>
      <Table dataSource={taskData} columns={columns} loading={loading} />
    </div>
  );
};

export default TaskDetails;
