/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Select, Spin } from "antd";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { ALLROLES } from "../../../helper/admin/role_helper";
import { LabelHelper } from "../../../component/LabelHelper";
import { useSelector } from "react-redux";
import _, { words } from "lodash";
import { useEffect, useState } from "react";
import { Country, City, State } from "country-state-city";
import { EmailValidation, formValidation } from "../../../helper/formValidation";
import { CUSTOM_ERROR_NOTIFICATION, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import { addEmployee, editEmployee, getAllAreaAdmins, getSingleUser } from "../../../api";
import TitleHelper from "../../../component/TitleHelper";
import { ALL_DISTRICTS } from "../../../helper/admin/admin_data_helper";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ICON_HELPER } from "../../../helper/IconHelper";

const Add = () => {
  const roles = useSelector((data) => data);
  const [form] = Form.useForm();

  const update_id = useParams();

  const navigate = useNavigate();

  const [roleItems, setRoleItems] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [country] = useState(Country.getAllCountries());
  const [filteredState, setAllStates] = useState([]);
  const [filteredCity, setAllFilteredCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allAreaAdmins, setAllAreaAdmins] = useState([]);
  const [search,setSearch]=useState("");

  const handleCountryChange = (value) => {
    const selectedCountry = country.find((c) => c.name === value);
    setAllStates(State.getStatesOfCountry(selectedCountry.isoCode));
  };

  const hnadleChnageState = (value) => {
    const selectedState = filteredState.find((s) => s.name === value);
    let letcity = City.getAllCities().filter((res) => {
      return res.stateCode === selectedState?.isoCode;
    });
    setAllFilteredCity(letcity);
  };

  const handleCancel = () => {
    form.resetFields();
    fetchAreaAdmins();
    setSelectedRole();
  };

  useEffect(() => {
    setRoleItems(
      ALLROLES?.filter((res) => {
        return res.hide.includes(_.get(roles, "role.value.role", ""));
      })
    );
    if (_.get(roles, "role.value.role", "") === "area_admin") {
      form.setFieldsValue({ selected_area_admin: _.get(roles, "role.value._id", "") });
      form.setFieldsValue({ work_district: _.get(roles, "role.value.work_district", "") });
    }
  }, [_.get(roles, "role.value.role", "")]);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      let result = "";
      if (_.get(update_id, "id", "")) {
        result = await editEmployee(values, _.get(update_id, "id", ""));
      } else {
        result = await addEmployee(values);
      }
      SUCCESS_NOTIFICATION(result);
      handleCancel();
      if (_.get(update_id, "id", "")) {
        navigate("/employee-details");
      }
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAreaAdmins = async () => {
    try {
      setLoading(true);
      const result = await getAllAreaAdmins();
      setAllAreaAdmins(_.get(result, "data.data", []));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreaAdmins();
  }, []);

  const handleAreaadminChnage = (value) => {
    try {
      let district_data = allAreaAdmins.find((res) => {
        return res._id === value;
      });
      form.setFieldsValue({ work_district: _.get(district_data, "work_district", "") });
    } catch {}
  };

  const handleRoleChange = (value) => {
    try {
      if (_.get(roles, "role.value.role", "") === "area_admin") {
        form.setFieldsValue({ selected_area_admin: _.get(roles, "role.value._id", "") });
        form.setFieldsValue({ work_district: _.get(roles, "role.value.work_district", "") });
      } else {
        form.setFieldsValue({ work_district: "" });
      }
      setSelectedRole(value);
    } catch {}
  };

  const fetchCurrentUser = async () => {
    try {
      const result = await getSingleUser(_.get(update_id, "id", ""));
      if (_.isEmpty(_.get(result, "data.data", []))) {
        navigate("/employee-details");
        CUSTOM_ERROR_NOTIFICATION();
      } else if (!_.isEmpty(_.get(result, "data.data", []))) {
        let adta = _.get(result, "data.data", []);
        form.setFieldsValue(adta);
        setSelectedRole(_.get(adta, "role", ""));
        handleCountryChange(_.get(adta, "country", ""));
        hnadleChnageState(_.get(adta, "state", ""));
      }
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  useEffect(() => {
    if (_.get(update_id, "id", "")) {
      fetchCurrentUser();
    } else {
      handleCancel();
    }
  }, [_.get(update_id, "id", "")]);

  return (
    <Spin spinning={loading}>
      <div className="section_start">
        <TitleHelper title={`${_.get(update_id, "id", "") ? "Update" : "Add"} Users Details`} />
        <DefaultHeader   pageName={`${_.get(update_id, "id", "") ? "Update" : "Add"} Users Details`} add={false}  search={false} icon={<ICON_HELPER.ADD_EMPLOYEE/>} />
        <div className="w-full min-h-[200px]  mt-4">
          <Form form={form} layout="vertical" className="flex flex-wrap gap-x-10 gap-y-2" onFinish={handleFinish}>
            <Form.Item className="w-[300px]" rules={[formValidation("Select Role")]} name="role" label={<LabelHelper title={"Select Role"} />}>
              <Select className="antd_input" placeholder="Select Role" onChange={handleRoleChange}>
                {roleItems.map((res, index) => {
                  return (
                    <Select.Option key={index} value={res.as}>
                      {res.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {["agent", "area_staffs"].includes(selectedRole) && (
              <Form.Item rules={[formValidation("Select Area Admin")]} className="w-[300px]" name="selected_area_admin" label={<LabelHelper title={"Select Area Admin"} />}>
                <Select disabled={_.get(roles, "role.value.role", "") === "area_admin"} showSearch className="antd_input" onChange={handleAreaadminChnage} placeholder="Select Area Admin">
                  {allAreaAdmins.map((res, index) => {
                    return (
                      <Select.Option key={index} value={res._id}>
                        {res.name} - <span className="text-primary">{res.work_district}</span>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}

            {selectedRole ? (
              <>
                <Form.Item name="name" rules={[formValidation("Enter Name")]} label={<LabelHelper title="Name" />}>
                  <Input placeholder="Name" className="!border antd_input " />
                </Form.Item>
                <Form.Item name="email" rules={EmailValidation("Enter Email")} label={<LabelHelper title="Email" />}>
                  <Input placeholder="Email" className="!border antd_input " />
                </Form.Item>
                {!_.get(update_id, "id", "") && (
                  <Form.Item name="password" rules={[formValidation("Enter Password")]} label={<LabelHelper title="Password" />}>
                    <Input.Password placeholder="Password" className="!border antd_input " />
                  </Form.Item>
                )}

                {["agent", "area_staffs", "area_admin"].includes(selectedRole) && (
                  <Form.Item rules={[formValidation("Select Work District")]} name="work_district" label={<LabelHelper title="Select Work District" />}>
                    <Select disabled={["area_staffs", "agent"].includes(selectedRole)} className="antd_input !w-[300px]" placeholder="Select Work District" showSearch>
                      {ALL_DISTRICTS.map((res, index) => {
                        return (
                          <Select.Option key={index} value={res.name}>
                            {res.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                )}

                <div className="w-full flex flex-wrap gap-x-10">
                  <h1 className="w-full font-primary_font font-medium pb-4 text-lg uppercase text-primary">Personal Info</h1>
                  <Form.Item name="mobile_number" rules={[formValidation("Enter Mobile Number")]} label={<LabelHelper title="Mobile Number" />}>
                    <Input type="number" placeholder="Mobile Number" className="!border antd_input " />
                  </Form.Item>
                  <Form.Item name="alternate_number" rules={[formValidation("Enter Alternate Mobile Number")]} label={<LabelHelper title="Alternate Mobile Number" />}>
                    <Input type="number" placeholder="Alternate Mobile Number" className="!border antd_input " />
                  </Form.Item>
                  <Form.Item rules={[formValidation("Select Country")]} name="country" label={<LabelHelper title="Select Country" />}>
                    <Select
                      className="antd_input !w-[300px]"
                      placeholder="Select Country"
                      onChange={(selected) => {
                        handleCountryChange(selected);
                      }}
                      showSearch
                    >
                      {country.map((res, index) => {
                        return (
                          <Select.Option key={index} value={res.name}>
                            {res.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  {!_.isEmpty(filteredState) && (
                    <Form.Item name="state" rules={[formValidation("Select State")]} label={<LabelHelper title="Select State" />}>
                      <Select
                        className="antd_input !w-[300px]"
                        placeholder="Select State"
                        onChange={(selected) => {
                          hnadleChnageState(selected);
                        }}
                        showSearch
                      >
                        {filteredState.map((res, index) => {
                          return (
                            <Select.Option key={index} value={res.name}>
                              {res.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  )}
                  {!_.isEmpty(filteredCity) && (
                    <Form.Item rules={[formValidation("Select City")]} name="city" label={<LabelHelper title="Select City" />}>
                      <Select className="antd_input !w-[300px]" placeholder="Select City" showSearch>
                        {filteredCity.map((res, index) => {
                          return (
                            <Select.Option key={index} value={res.name}>
                              {res.name}
                            </Select.Option>
                          );      
                        })}
                      </Select>
                    </Form.Item>
                  )}
                  <Form.Item name="pincode" rules={[formValidation("Enter Pincode")]} label={<LabelHelper title="Pincode" />}>
                    <Input type="number" placeholder="Pincode" className="!border antd_input " />
                  </Form.Item>
                  <Form.Item name="address" rules={[formValidation("Enter  Address")]} label={<LabelHelper title="Address" />}>
                    <Input.TextArea type="number" placeholder="Address" className="!border antd_input" />
                  </Form.Item>
                </div>
              </>
            ) : (
              ""
            )}
            <Form.Item className="w-full">
              <Button loading={loading} htmlType="submit" className="primary_button w-fit !h-[50px] !px-10">
                {_.get(update_id, "id", "") ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default Add;
