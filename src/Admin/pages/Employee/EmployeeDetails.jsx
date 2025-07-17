/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import TitleHelper from "../../../component/TitleHelper";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { getEmployee } from "../../../api";
import { Table, Tag, Tooltip } from "antd";
import _ from "lodash";
import { GET_COLOR } from "../../../helper/admin/role_helper";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { Link, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const result = await getEmployee(search);
      setEmployeeDetails(_.get(result, "data.data", []));
     } catch {}
  };

  const generateUserId = (id) => {
    navigate(`/user_details/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      align: "center",
      render: (s, a, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name, all) => {
        return (
          <span className="capitalize cursor-pointer text-primary" onClick={() => generateUserId(all._id)}>
            {name}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      align: "center",
    },
    {
      title: "Working District",
      dataIndex: "work_district",
      render: (data) => {
        return <span>{data || "-"}</span>;
      },
    },
    {
      title: "Working Under",
      dataIndex: "area_admin",
      align: "center",
      render: (data) => {
        return (
          <span>
            {_.get(data, "[0].name", "") || (
              <span className="text-primary">Super Admin</span>
            )}
          </span>
        );
      },
    },
    {
      title: "Added By",
      dataIndex: "added_by",
      align: "center",
      render: (data) => {
        return (
          <Tag
            color={GET_COLOR(_.get(data, "[0].role", ""))?.color}
            className="!font-primary_font capitalize min-w-[100px] py-1 !text-center"
          >
            {_.get(data, "[0].name", "")}
          </Tag>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      render: (data) => {
        return (
          <Tag
            color={GET_COLOR(data)?.color}
            className="!font-primary_font min-w-[100px] py-1 !text-center"
          >
            {GET_COLOR(data)?.role_name}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      render: (data) => {
        return (
          <div className="center_div gap-x-3">
            <Tooltip title="Update">
              <Link to={`/edit-employee/${data._id}`}>
                <ICON_HELPER.EDIT_ICON className="!text-lg hover:text-primary cursor-pointer text-green-500" />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <ICON_HELPER.DELETE_ICON className="!text-lg hover:text-primary cursor-pointer text-red-500" />{" "}
            </Tooltip>
            <Tooltip title="Invitation">
              <ICON_HELPER.MAIL_INVITAION className="!text-lg hover:text-primary cursor-pointer text-orange-500" />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="section_start">
      <TitleHelper title={"Users Details"} />
      <DefaultHeader
        icon={<ICON_HELPER.EMPLOYEE_ICON />}
        pageName="Users Details"
        add={false}
        model={true}
        setSearch={setSearch}
      />
      <div className="pt-4">
        <Table
          pagination={{ pageSize: 10 }}
          size="small"
          className="rounded-2xl"
          bordered
          columns={columns}
          dataSource={employeeDetails}
        />
      </div>
    </div>
  );
};

export default EmployeeDetails;
