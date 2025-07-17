import React, { useEffect, useState } from "react";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { Drawer, Spin, Card, Button, Tabs, Form } from "antd";
import AddPackage from "./AddPackage";
import { deletePackages, get_india_packages, get_srilanka_packages } from "../../../api";
import _ from "lodash";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { useForm } from "antd/es/form/Form";

const { TabPane } = Tabs;

const Package = () => {
  const [addStatus, setAddStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [packageData, setPackageData] = useState([]);
  const [srilanksData, setSrilanksPackageData] = useState([]);
  const [id, setId] = useState("");
  const [activeTab, setActiveTab] = useState("india");
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await get_india_packages(search);
      const packages = _.get(result, "data.data", []);
      setPackageData(packages);
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSrilankaData = async () => {
    try {
      setLoading(true);
      const result = await get_srilanka_packages(search);
      const packages = _.get(result, "data.data", []);
      setSrilanksPackageData(packages);
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId) => {
    try {
      const result = await deletePackages(packageId);
      SUCCESS_NOTIFICATION(result);
      activeTab === "india" ? fetchData() : fetchSrilankaData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const handleUpdate = (pkg) => {
    setId(pkg);
    setAddStatus(true);
    activeTab === "india" ? fetchData() : fetchSrilankaData();
  };

  const handleCancel = () => {
    form.resetFields();
    setAddStatus(false);
    setId(null);
  };

  useEffect(() => {
    fetchData();
    fetchSrilankaData();
  }, [search]);

  const renderPackageCards = (data) =>
    data.map((pkg) => (
      <Card key={pkg._id} className="shadow-md rounded-xl border border-gray-200 overflow-hidden flex flex-col justify-between" hoverable cover={<img alt={pkg.name} src={pkg.image || "/default-package.jpg"} className="h-[200px] w-full object-cover" onError={(e) => (e.target.src = "/default-package.jpg")} />}>
        <div className="px-1 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{pkg.location}</p>
            <p className="text-sm text-gray-600">{pkg.duration}</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
          <p className="line-clamp-2">{pkg.description}</p>
        </div>
        <div className="flex justify-between items-center gap-2 mt-4 px-1 pb-1">
          <Button size="small" type="primary" className="text-xs bg-white border border-blue-500 text-blue-600 font-medium rounded" onClick={() => handleUpdate(pkg)}>
            Edit
          </Button>
          <Button size="small" danger className="text-xs font-medium" onClick={() => handleDelete(pkg._id)}>
            Delete
          </Button>
        </div>
      </Card>
    ));

  return (
    <Spin spinning={loading}>
      <div className="p-6">
        <DefaultHeader pageName="Package" icon={<ICON_HELPER.PACKAGE_ICON />} add={true} setAddStatus={setAddStatus} model={true} text="Add Package" setSearch={setSearch} search={false} />
      </div>

      <div className="px-4">
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
          <TabPane tab="India Packages" key="india">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">{renderPackageCards(packageData)}</div>
          </TabPane>
          <TabPane tab="Sri Lanka Packages" key="srilanka">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">{renderPackageCards(srilanksData)}</div>
          </TabPane>
        </Tabs>
      </div>

      <Drawer width={"100%"} open={addStatus} title={`${id ? "Update" : "Add"} Package`} onClose={handleCancel}>
        <AddPackage form={form} addStatus={addStatus} setAddStatus={setAddStatus} setLoading={setLoading} fetchData={activeTab === "india" ? fetchData : fetchSrilankaData} id={id} packageData={activeTab === "india" ? packageData : srilanksData} setId={setId} />
      </Drawer>
    </Spin>
  );
};

export default Package;
