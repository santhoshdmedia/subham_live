/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import TitleHelper from "../../../component/TitleHelper";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { getAllCustomers } from "../../../api";
import { Table } from "antd";
import _ from "lodash";
import { ICON_HELPER } from "../../../helper/IconHelper";

const Customers = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [search,setSearch]=useState("")

  const fetchData = async () => {
    try {
      let searchData={
        search:search,
      }
      const result = await getAllCustomers (JSON.stringify(searchData));
      setEmployeeDetails(_.get(result, "data.data", []));
    } catch {}  
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      align: "center",
      width: 100,
      render: (s, a, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (data) => {
        return <span className="capitalize">{data}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
    },

    // {
    //   title: "Action",
    //   align: "center",
    //   render: (data) => {
    //     return (
    //       <div className="center_div gap-x-3">
    //         <Tooltip title="Update">
    //           <Link to={`/edit-employee/${data._id}`}>
    //             <ICON_HELPER.EDIT_ICON className="!text-lg hover:text-primary cursor-pointer text-green-500" />
    //           </Link>
    //         </Tooltip>
    //         <Tooltip title="Delete">
    //           <ICON_HELPER.DELETE_ICON className="!text-lg hover:text-primary cursor-pointer text-red-500" />{" "}
    //         </Tooltip>
    //         <Tooltip title="Invitation">
    //           <ICON_HELPER.MAIL_INVITAION className="!text-lg hover:text-primary cursor-pointer text-orange-500" />
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="section_start">
      <TitleHelper title={"Customer Details"} />
      <DefaultHeader 
       pageName={"Customer Details"} 
        add={false}
        setSearch={setSearch}
        model={true}
        icon={<ICON_HELPER.CUSTOMER_ICON/>}
      />
      <div className="pt-4">
        <Table size="small" bordered columns={columns} dataSource={employeeDetails} />
      </div>
    </div>
  );
};

export default Customers;
