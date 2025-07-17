import React, { useEffect, useState } from "react";
import { Form, Input, Button, Collapse, Radio, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import UploadHelper from "../../../helper/UploadHelper";
import ShowImages from "../../../helper/ShowImages";
import { addPackages, editPackages } from "../../../api";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";

const { Panel } = Collapse;

const AddPackage = (props) => {
  const { form, addStatus, setAddStatus, id, packageData, setId, setLoading, fetchData } = props;

  const [packageImagePath, setPackageImagePath] = useState(null);
  const [topAttractions, setTopAttractions] = useState([]);
  const [includedExcluded, setIncludedExcluded] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [country, setCountry] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!addStatus) {
      form.resetFields();
      setPackageImagePath(null);
      setTopAttractions([]);
      setIncludedExcluded([]);
      setItinerary([]);
      setCountry(null);
      setDescription("");
      setId(null);
    }
  }, [addStatus]);

  useEffect(() => {
    if (id) {
      const data = packageData.find((item) => item._id === id._id);
      if (data) {
        form.setFieldsValue({
          name: data.name,
          original_price: data.original_price,
          discount_price: data.discount_price,
          duration: data.duration,
          location: data.location,
          contact: data.contact,
          message_description: data.message_description,
          description: data.description,
        });
        setPackageImagePath(data.image || null);
        setTopAttractions(data.top_attractions || []);
        setIncludedExcluded(data.included_excluded || []);
        setItinerary(Array.isArray(data.itinerary) ? data.itinerary : []);
        setCountry(data.country || null);
        setDescription(data.description || "");
      }
    }
  }, [id, packageData, form]);

  const addTopAttraction = () => {
    setTopAttractions([...topAttractions, { name: "", image: "", description: "" }]);
  };

  const removeTopAttraction = (index) => {
    const updated = [...topAttractions];
    updated.splice(index, 1);
    setTopAttractions(updated);
  };

  const addIncludedExcluded = () => {
    setIncludedExcluded([...includedExcluded, { type: "included", description: "" }]);
  };

  const removeIncludedExcluded = (index) => {
    const updated = [...includedExcluded];
    updated.splice(index, 1);
    setIncludedExcluded(updated);
  };

  const addItinerary = () => {
    setItinerary([...itinerary, { time: "", title: "", description: "" }]);
  };

  const removeItinerary = (index) => {
    const updated = [...itinerary];
    updated.splice(index, 1);
    setItinerary(updated);
  };

  const onFinish = async (values) => {
    try {
      if (!country) return message.warning("Please select a country");
      if (!packageImagePath) return message.warning("Please upload a package image");

      const validAttractions = topAttractions.every((item) => item.name && item.image && item.description);
      if (!validAttractions) return message.error("Please fill all fields in Top Attractions");

      const validIE = includedExcluded.every((item) => item.type && item.description);
      if (!validIE) return message.error("Please fill all fields in Included/Excluded");

      const validItinerary = itinerary.every((item) => item.time && item.title && item.description);
      if (!validItinerary) return message.error("Please fill all fields in Itinerary");

      const payload = {
        ...values,
        image: packageImagePath,
        top_attractions: topAttractions,
        included_excluded: includedExcluded,
        itinerary,
        country,
      };

      let result;
      setLoading(true);
      if (id) {
        result = await editPackages(payload, id._id);
      } else {
        result = await addPackages(payload);
      }

      SUCCESS_NOTIFICATION(result);
      setAddStatus(false);
      fetchData();
    } catch (err) {
      console.error(err);
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg w-full mx-auto">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Package Details" key="1">
            <h1 className="font-bold mb-2 mt-2">Image</h1>
            {packageImagePath ? <ShowImages path={packageImagePath} setImage={setPackageImagePath} /> : <UploadHelper setImagepath={setPackageImagePath} />}

            <div className="grid grid-cols-3 pt-3 gap-4">
              <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
                <Input className="antd_input" />
              </Form.Item>
              <Form.Item name="original_price" label="Original Price" rules={[{ required: true }]}>
                <Input type="number" className="antd_input" />
              </Form.Item>
              <Form.Item name="discount_price" label="Discount Price" rules={[{ required: true }]}>
                <Input type="number" className="antd_input" />
              </Form.Item>
              <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
                <Input placeholder="e.g. 2 Nights / 3 Days" className="antd_input" />
              </Form.Item>
              <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                <Input className="antd_input" />
              </Form.Item>
              <Form.Item name="contact" label="Contact Number" rules={[{ required: true }]}>
                <Input className="antd_input" />
              </Form.Item>
            </div>

            <Form.Item name="message_description" label="Message" rules={[{ required: true }]}>
              <Input.TextArea placeholder="Your Message" className="antd_input" />
            </Form.Item>

            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </Form.Item>
          </Panel>

          <Panel header="Top Attractions" key="2">
            <div className="grid grid-cols-2 gap-4">
              {topAttractions.map((item, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Attraction {index + 1}</h4>
                    <Button danger icon={<DeleteOutlined />} onClick={() => removeTopAttraction(index)} />
                  </div>
                  <Form.Item label="Name">
                    <Input
                      className="antd_input"
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...topAttractions];
                        updated[index].name = e.target.value;
                        setTopAttractions(updated);
                      }}
                    />
                  </Form.Item>
                  <div className="h-[100px] mb-3">
                    {item.image ? (
                      <ShowImages
                        path={item.image}
                        setImage={(path) => {
                          const updated = [...topAttractions];
                          updated[index].image = path;
                          setTopAttractions(updated);
                        }}
                      />
                    ) : (
                      <UploadHelper
                        setImagepath={(path) => {
                          const updated = [...topAttractions];
                          updated[index].image = path;
                          setTopAttractions(updated);
                        }}
                      />
                    )}
                  </div>
                  <Form.Item label="Description">
                    <Input.TextArea
                      rows={3}
                      className="antd_input"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...topAttractions];
                        updated[index].description = e.target.value;
                        setTopAttractions(updated);
                      }}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
            <Button icon={<PlusOutlined />} className="bg-secondary text-white py-4 " onClick={addTopAttraction}>
              Add Attraction
            </Button>
          </Panel>

          <Panel header="Included and Excluded" key="3">
            <div className="grid grid-cols-2 gap-4">
              {includedExcluded.map((item, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Item {index + 1}</h4>
                    <Button danger icon={<DeleteOutlined />} onClick={() => removeIncludedExcluded(index)} />
                  </div>
                  <Form.Item label="Type">
                    <Radio.Group
                      value={item.type}
                      onChange={(e) => {
                        const updated = [...includedExcluded];
                        updated[index].type = e.target.value;
                        setIncludedExcluded(updated);
                      }}
                    >
                      <Radio value="included">Included</Radio>
                      <Radio value="excluded">Excluded</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input
                      className="antd_input"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...includedExcluded];
                        updated[index].description = e.target.value;
                        setIncludedExcluded(updated);
                      }}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
            <Button icon={<PlusOutlined />} onClick={addIncludedExcluded} className=" bg-secondary text-white py-4 ">
              Add Item
            </Button>
          </Panel>

          <Panel header="Itinerary" key="4">
            <div className="grid grid-cols-2 gap-4">
              {itinerary.map((item, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <div className="flex justify-end items-end mb-2">
                    <Button danger icon={<DeleteOutlined />} onClick={() => removeItinerary(index)} />
                  </div>
                  <Form.Item label="Day Title">
                    <Input
                      className="antd_input"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...itinerary];
                        updated[index].title = e.target.value;
                        setItinerary(updated);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Time">
                    <Input
                      placeholder="e.g. 2:00 PM - 4:00 PM"
                      className="antd_input"
                      value={item.time}
                      onChange={(e) => {
                        const updated = [...itinerary];
                        updated[index].time = e.target.value;
                        setItinerary(updated);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input.TextArea
                      rows={4}
                      className="antd_input"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...itinerary];
                        updated[index].description = e.target.value;
                        setItinerary(updated);
                      }}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
            <Button icon={<PlusOutlined />} onClick={addItinerary} className=" bg-secondary text-white py-4 ">
              Add Day
            </Button>
          </Panel>
        </Collapse>

        <div className="mt-6 flex space-x-4">
          <Button type={country === "india" ? "primary" : "default"} onClick={() => setCountry("india")}>
            India
          </Button>
          <Button type={country === "srilanka" ? "primary" : "default"} onClick={() => setCountry("srilanka")}>
            Sri Lanka
          </Button>
        </div>

        <Form.Item className="mt-6 w-[50%] m-auto">
          <Button type="primary" htmlType="submit" className="w-full bg-secondary text-white py-4 rounded-md transition-all duration-300 antd_input">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPackage;
