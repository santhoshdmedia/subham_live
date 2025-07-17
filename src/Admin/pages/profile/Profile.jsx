// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import TitleHelper from "../../../component/TitleHelper";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { ICON_HELPER } from "../../../helper/IconHelper";
import _ from "lodash";
import { getSingleUser, getEmployee } from "../../../api";
import moment from "moment";
import { Avatar, Descriptions, Card, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [employee, setEmployee] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await getSingleUser(id);
      setEmployee(result);
      setRole(_.get(result, "data.data.role",""));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      const result = await getEmployee();
      setEmployeeDetails(_.get(result, "data.data",[]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEmployeeDetails();
  }, [id]);

  const me = [
    {
      key: "1",
      label: "Joining Date",
      children: moment(_.get(employee, "data.data.createdAt","")).format("ll"),
    },
    {
      key: "2",
      label: "Position",
      children: _.get(employee, "data.data.role",""),
    },
    {
      key: "3",
      label: "Name",
      children: _.get(employee, "data.data.name",""),
    },
    {
      key: "4",
      label: "Email",
      children: _.get(employee, "data.data.email",""),
    },
  ];

  if (role !== "super_admin") {
    me.push(
      {
        key: "5",
        label: "Mobile Number",
        children: _.get(employee, "data.data.mobile_number",""),
      },
      {
        key: "6",
        label: "Alternate Number",
        children: _.get(employee, "data.data.alternate_number",""),
      },
      {
        key: "7",
        label: "Address",
        children: _.get(employee, "data.data.address",""),
      }
    );
  }

  const workedplace = [
    {
      key: "8",
      label: "District",
      children: _.get(employee, "data.data.work_district",""),
    },
    {
      key: "9",
      label: "City",
      children: _.get(employee, "data.data.city",""),
    },
    {
      key: "10",
      label: "Pincode",
      children: _.get(employee, "data.data.pincode",""),
    },
    {
      key: "11",
      label: "State",
      children: _.get(employee, "data.data.state",""),
    },
    {
      key: "12",
      label: "Country",
      children: _.get(employee, "data.data.country",""),
    },
  ];

  const UserInfo = () => (
    <div className="center_div gap-x-4 justify-start">
      <Avatar>{_.get(employee, "data.data.name","")?.split("")[0]}</Avatar>
      <h1>{_.get(employee, "data.data.name","")}</h1>
    </div>
  );

  return (
    <div className="p-6 h-auto w-full bg-gray-100">
      <TitleHelper title={"Profile"} />
      <DefaultHeader
        pageName={"Profile"}
        icon={<ICON_HELPER.USER_PROFILE />}
        search={false}
        add={false}
      />

      <div className="bg-white w-full h-auto shadow-md rounded-lg px-10 py-10">
        <div className="flex flex-col md:flex-row justify-center pb-5">
          <Descriptions title={<UserInfo />} items={me} />
        </div>

        <div>
          {role !== "super_admin" && (
            <>
              <div className="pb-5">
                <h1 className="font-semibold pb-3">Worked Place</h1>
                <Descriptions items={workedplace} />
              </div>
            </>
          )}
        </div>
      </div>

      {(role === "super_admin" || role === "area_admin") && (
        <div className="py-5">
          <div>
            {role === "super_admin" && (
              <>
                <h1 className="font-semibold px-4 py-1 rounded-lg bg-yellow-500 text-white w-fit my-3">
                  Area admin
                </h1>
                <Row gutter={16}>
                  {employeeDetails
                    .filter((res) => res.role === "area_admin")
                    .map((res) => (
                      <Col span={8} key={res.id}>
                        <Card style={{ minWidth: 300, marginBottom: "15px" }}>
                          <Card.Meta
                            title={res.name}
                            description={
                              <>
                                <div className="pb-2">
                                  <p className="flex gap-1">
                                    <div className="flex justify-center items-center">
                                      <ICON_HELPER.EMAIL_ICON />
                                    </div>{" "}
                                    {res.email}
                                  </p>
                                  <p className="flex gap-1">
                                    <div className="flex justify-center items-center">
                                      <ICON_HELPER.PHONE_ICON />
                                    </div>{" "}
                                    {res.mobile_number}
                                  </p>
                                  <p className="flex gap-1">
                                    <div className="flex justify-center items-center gap-1">
                                      <ICON_HELPER.USER_ADDED_ICON />
                                      added :
                                    </div>
                                    <span className="text-black">
                                      {res.added_by[0]?.name}
                                    </span>
                                  </p>
                                </div>

                                <div className="flex justify-start">
                                  <button
                                    className="text-white bg-black rounded-lg py-1 px-4 "
                                    onClick={() =>
                                      navigate(`/user_details/${res._id}`)
                                    }
                                  >
                                    More
                                  </button>
                                </div>
                              </>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                </Row>
              </>
            )}
          </div>

          <div>
            <h1 className="font-semibold px-4 py-1 rounded-lg bg-pink-700 text-white w-fit my-3">
              Area Staffs
            </h1>
            <Row gutter={16}>
              {employeeDetails
                .filter((res) => res.role === "area_staffs")
                .map((res) => (
                  <Col span={8} key={res.id}>
                    <Card style={{ minWidth: 300, marginBottom: "15px" }}>
                      <Card.Meta
                        title={res.name}
                        description={
                          <>
                            <div className="pb-2">
                              <p className="flex gap-1">
                                <div className="flex justify-center items-center">
                                  <ICON_HELPER.EMAIL_ICON />
                                </div>
                                {res.email}
                              </p>
                              <p className="flex gap-1">
                                <div className="flex justify-center items-center">
                                  <ICON_HELPER.PHONE_ICON />
                                </div>
                                {res.mobile_number}
                              </p>
                              <p className="flex gap-1">
                                <div className="flex justify-center items-center gap-1">
                                  <ICON_HELPER.USER_ADDED_ICON />
                                  added :
                                </div>
                                <span className="text-black">
                                  {res.added_by[0]?.name}
                                </span>
                              </p>
                            </div>
                            <div className="flex justify-start">
                              <button
                                className="text-white bg-black rounded-lg py-1 px-4"
                                onClick={() =>
                                  navigate(`/user_details/${res._id}`)
                                }
                              >
                                More
                              </button>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
            </Row>

            <div>
              <h1 className="font-semibold px-4 py-1 rounded-lg bg-sky-600 text-white w-fit my-3">
                Agents
              </h1>
              <Row gutter={16}>
                {employeeDetails
                  .filter((res) => res.role === "agent")
                  .map((res) => (
                    <Col span={8} key={res.id}>
                      <Card style={{ minWidth: 300, marginBottom: "15px" }}>
                        <Card.Meta
                          title={res.name}
                          description={
                            <>
                              <div className="pb-2">
                                <p className="flex gap-1">
                                  <div className="flex justify-center items-center">
                                    <ICON_HELPER.EMAIL_ICON />
                                  </div>
                                  {res.email}
                                </p>
                                <p className="flex gap-1">
                                  <div className="flex justify-center items-center">
                                    <ICON_HELPER.PHONE_ICON />
                                  </div>
                                  {res.mobile_number}
                                </p>
                                <p className="flex gap-1">
                                  <div className="flex justify-center items-center gap-1">
                                    <ICON_HELPER.USER_ADDED_ICON />
                                    added :
                                  </div>
                                  <span className="text-black">
                                    {res.added_by[0]?.name}
                                  </span>
                                </p>
                              </div>
                              <div className="flex justify-start">
                                <button
                                  className="text-white bg-black rounded-lg py-1 px-4"
                                  onClick={() =>
                                    navigate(`/user_details/${res._id}`)
                                  }
                                >
                                  More
                                </button>
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>

          <div>
            {role === "super_admin" && (
              <>
                <h1 className="font-semibold px-4 py-1 rounded-lg bg-purple-900 text-white w-fit my-3">
                  Ferry staff
                </h1>
                <Row gutter={16}>
                  {employeeDetails
                    .filter((res) => res.role === "ferry_staff")
                    .map((res) => (
                      <Col span={8} key={res.id}>
                        <Card style={{ minWidth: 300, marginBottom: "15px" }}>
                          <Card.Meta
                            title={res.name}
                            description={
                              <>
                                <div className="pb-2">
                                  <p className="flex gap-1">
                                    <div className="flex justify-center items-center">
                                      <ICON_HELPER.EMAIL_ICON />
                                    </div>{" "}
                                    {res.email}
                                  </p>
                                  <p className="flex gap-1">
                                    <div className="flex justify-center items-center">
                                      <ICON_HELPER.PHONE_ICON />
                                    </div>{" "}
                                    {res.mobile_number}
                                  </p>
                                  <p className="flex gap-1">
                                    <div className="flex justify-center items-center gap-1">
                                      <ICON_HELPER.USER_ADDED_ICON />
                                      added you :
                                    </div>
                                    <span className="text-black">
                                      {res.added_by[0]?.name}
                                    </span>
                                  </p>
                                </div>

                                <div className="flex justify-start">
                                  <button
                                    className="text-white bg-black rounded-lg py-1 px-4 "
                                    onClick={() =>
                                      navigate(`/user_details/${res._id}`)
                                    }
                                  >
                                    More
                                  </button>
                                </div>
                              </>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                </Row>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
