import { Card, Progress, Spin, Table } from "antd";
import TitleHelper from "../../../component/TitleHelper";
import { useEffect, useState } from "react";
import { ERROR_NOTIFICATION } from "../../../helper/admin/notification_helper";
import { getAllDashboardCounts, getFiveBooking, getFiveUsers } from "../../../api";
import _ from "lodash";
import { GET_COLOR } from "../../../helper/admin/role_helper";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { ICON_HELPER } from "../../../helper/IconHelper";

const Dashboard = () => {
  const [userCounts, setAllUserCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book,setBook]=useState([])

  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllDashboardCounts();
      setAllUserCounts(_.get(result, "data.data", []));

      const userResult = await getFiveUsers();
      setTableData(_.get(userResult, "data.data", []));
       
      const bookingResult= await getFiveBooking()
      setBook(_.get(bookingResult, "data.data", []))
 
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


const getBookColumns= [
  {
    title: "S.No",
    dataIndex: "_id",
    align: "center",
    render: (s, a, index) => <span>{index + 1}</span>,
  },
       {
        title:"Name",
        dataIndex: "user_details",
        render: (text) => _.get(text, "[0].name", "N/A"), 
       },
       {
        title:"Email",
        dataIndex: "user_details",
        render: (text) => _.get(text, "[0].email", "N/A"),
       },
       {
        title:"Package ",
        dataIndex: "packges_details",
        render: (text) => _.get(text, "[0].package_name", "N/A"), 
       },
       {
        title:" Members",
        dataIndex:"total_count"

       }

]


  const getRelatedColumns = (role_name) => {
    switch (role_name) {
      case "area_staffs":
        return [
          {
            title: "S.No",
            dataIndex: "sn",
            key: "sn",
            width: 50,
            render: (first, all, index) => {
              return index + 1;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "user_email",
          },
          {
            title: "Work distric",
            dataIndex: "work_district",
            key: "work_district",
          },
          {
            title: "Number",
            dataIndex: "mobile_number",
            key: "mobile_number",
          },
        ];
      case "customer":
        return [
          {
            title: "S.No",
            dataIndex: "sn",
            key: "sn",
            width: 50,
            render: (first, all, index) => {
              return index + 1;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "user_email",
          },
          {
            title: " Number",
            dataIndex: "mobile_number",
            key: "mobile",
          },
        ];
      case "area_admin":
        return [
          {
            title: "S.No",
            dataIndex: "sn",
            key: "sn",
            width: 50,
            render: (first, all, index) => {
              return index + 1;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "user_email",
          },
          {
            title: "Work District",
            dataIndex: "work_district",
            key: "work_district",
          },
          {
            title: "Number",
            dataIndex: "mobile_number",
            key: "mobile_number",
          },
        ];
      case "ferry_staff":
        return [
          {
            title: "S.No",
            dataIndex: "sn",
            key: "sn",
            width: 50,
            render: (first, all, index) => {
              return index + 1;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "user_email",
          },
          {
            title: " Number",
            dataIndex: "mobile_number",
            key: "mobile_number",
          },
        ];
      case "agent":
        return [
          {
            title: "S.No",
            dataIndex: "sn",
            key: "sn",
            width: 50,
            render: (first, all, index) => {
              return index + 1;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "user_email",
          },
          {
            title: "Work District",
            dataIndex: "work_district",
            key: "role",
          },
        ];
    }
  };

  // const { token } = theme.useToken();
  // const calendarWrapperStyle = {
  //   width: 250,
  //   border: `1px solid ${token.colorBorderSecondary}`,
  //   borderRadius: token.borderRadiusLG,
  //   padding: "10px",
  //   marginLeft: "auto",
  // };

  return (
    <div className="section_start font-primary_font">
  <Spin spinning={loading}>
    <TitleHelper title={"Dashboard"} />
    <DefaultHeader
      pageName={"Dashboard"}
      icon={<ICON_HELPER.DASHBOARD_ICON />}
      search={false}
      add={false}
    />

    <div className="flex flex-wrap gap-x-3 w-full">
      <div className="flex flex-wrap gap-x-3 w-full justify-between">
        {userCounts.map((res, index) => {
          return (
            <Card
              hoverable
              key={index}
              className={`shadow-lg relative group w-[200px] h-[210px] rounded-lg center_div flex flex-col gap-y-2`}
            >
              <Progress
                percent={_.get(res, "totalUsers", "")}
                percentPosition={false}
                format={(f) => f}
                strokeColor={GET_COLOR(_.get(res, "_id", ""))?.color}
                type="dashboard"
                status="active"
              />
              <h1 className="text-sm text-center font-medium font-primary_font pt-3">
                Total {GET_COLOR(_.get(res, "_id", ""))?.role_name}
              </h1>
              <div
                style={{
                  background: GET_COLOR(_.get(res, "_id", ""))?.color,
                }}
                className="absolute size-full rounded-lg bottom-0 left-0 h-1 group-hover:h-full transition-all duration-700 opacity-25"
              ></div>
            </Card>
          );
        })}
      </div>
    </div>

    <div className="flex flex-wrap !w-full gap-4 mt-5 justify-between">
      {tableData.map((res, index) => {
        return (
          <div
            key={index}
            className="w-[49%] shadow-lg rounded-lg p-4"
            style={{ minWidth: "500px" }}
          >
            <h1 className="text-start font-bold mb-2">
              Recent Five {GET_COLOR(res._id)?.role_name}
            </h1>
            <Table
              columns={getRelatedColumns(res._id)}
              scroll={{ x: 100 }}
              dataSource={_.get(res, "users", "")}
              pagination={false}
              className="text-sm font-sans font-normal !w-full"
            />
          </div>
        );
      })}

       <div className="w-[49%] shadow-lg rounded-lg p-4" style={{ minWidth: "500px" }}>
        <h1 className="text-start font-bold mb-2">Recent Five Bookings</h1>
        <Table
          columns={getBookColumns}
          scroll={{ x: 100 }}
          dataSource={book}  
          pagination={false}
          className="text-sm font-sans font-normal !w-full "
        />
      </div>
    </div>
  </Spin>
</div>

  );
};

export default Dashboard;
