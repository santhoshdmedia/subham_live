/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Row,
  Col,
  Card,
  Input,
  Divider,
  Spin,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { getPackages, searchTour } from "../../../api";
import _ from "lodash";
import moment from "moment";
import dayjs from "dayjs";
import News from "../../newsLetter/News";

const { Option } = Select;

const ClientTour = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateFormat = "DD-MM-YYYY";

  const location = useLocation();
  const { adultCount, childrenCount, checkOutDate, checkInDate, packageId } =
    location.state;
  const [tourData, setTourData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const prepareForm = () => {
    try {
      let default_value = { packageId: packageId };

      if (checkInDate) {
        default_value.checkInDate = dayjs(
          moment(checkInDate).format("DD-MM-YYYY"),
          dateFormat
        );
      }
      if (checkOutDate) {
        default_value.checkOutDate = dayjs(
          moment(checkOutDate).format("DD-MM-YYYY"),
          dateFormat
        );
      }
      form.setFieldsValue(default_value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    prepareForm();
  }, [checkOutDate, checkInDate, packageId]);

  const fetchPackageData = async () => {
    try {
      const result = await getPackages();
      setPackageData(_.get(result, "data.data", []));
    } catch (err) {
      setError("Failed to fetch package data.", err);
    }
  };

  const fetchData = async (formData) => {
    setLoading(true);
    try {
      const result = await searchTour(JSON.stringify(formData));
      setTourData(_.get(result, "data.data", []));
    } catch (err) {
      setError("Failed to fetch tour data.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, []);

  const formData = {
    location: packageId,
    from: checkInDate ? moment(checkInDate).format("DD-MM-YYYY") : "",
    to: checkOutDate ? moment(checkOutDate).format("DD-MM-YYYY") : " ",
  };

  useEffect(() => {
    fetchData(formData);
  }, []);

  const onFinish = (values) => {
    const formData = {
      location: values.packageId || " ",
      from: values.checkInDate ? moment(checkInDate).format("DD-MM-YYYY") : " ",
      to: values.checkOutDate ? moment(checkOutDate).format("DD-MM-YYYY") : " ",
    };
    fetchData(formData);
  };

  return (
    <>
      <div className="mb-48">
        <Spin spinning={loading}>
          <div className="P-4 mt-5">
            <div className="px-[6vw] py-[4vw]">
              <div className="custom_filter_form w-full border border-primary  p-6 rounded-lg lg:rounded-full shadow-lg flex items-center lg:h-[60px]">
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                  className="flex flex-col lg:flex-row w-full items-center justify-between"
                >
                 <div className="!w-full md:!w-[50%]">
                    <Form.Item
                      name="packageId"
                      rules={[{ message: "Please select a destination" }]}
                      className="w-full "
                    >
                      <Select
                        className="font-pri_head text-para uppercase w-full h-[50px] mt-5 focus-within:outline-transparent"
                        placeholder="Select a destination"
                      >
                        {packageData.length > 0 &&
                          packageData.map((pkg) => (
                            <Option key={pkg._id} value={pkg._id}>
                              {pkg.package_name}, {pkg.days} Days, {pkg.night}{" "}
                              Nights
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <Divider
                    type="vertical"
                    className="!bg-gray-300 hidden lg:block"
                  />

                  <div className="!w-full md:!w-[50%]">
                    <Form.Item
                      name="checkInDate"
                      rules={[{ required: true, message: "Select From Date" }]}
                      className="!w-full  lg:mt-5"
                    >
                      <DatePicker
                        className="antd_date_picker !w-full"
                        format="DD-MM-YYYY"
                      />
                    </Form.Item>
                  </div>

                  <Divider
                    type="vertical"
                    className="!bg-gray-300 hidden lg:block"
                  />

                  <div className="!w-full md:!w-[50%]">
                    <Form.Item
                      name="checkOutDate"
                      rules={[{ required: true, message: "Select To Date" }]}
                      className="w-full  lg:mt-5"
                    >
                      <DatePicker
                        className="antd_date_picker !w-full"
                        format="DD-MM-YYYY"
                      />
                    </Form.Item>
                  </div>

                  <Divider
                    type="vertical"
                    className="!bg-gray-300 hidden lg:block"
                  />

                  <div>
                    <Form.Item className="w-full lg:mt-5">
                      <button
                        type="submit"
                        className="bg-secondary text-white font-bold rounded-lg lg:rounded-full min-w-[100px] px-3 py-2"
                      >
                        Search
                      </button>
                    </Form.Item>
                  </div>

                </Form>
              </div>
            </div>

            <div className="mt-0 px-[6vw] w-full items-center justify-center flex flex-wrap mb-10">
              <h1 className="text-2xl sm:text-3xl text-center font-pri_head font-semibold">
                Your Search <span className="text-primary"> Tours</span>
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-10">
                {!_.isEmpty(tourData) &&
                  tourData.map((tour) => (
                    <div key={tour._id} className="group">
                      <div className="flex flex-col w-full relative rounded-xl group-hover:shadow-md border bg-white">
                        <div className="p-4">
                          <div className="w-full h-[250px] rounded-lg overflow-hidden">
                            <img
                              src={_.get(
                                tour,
                                "package_details[0].package_image"
                              )}
                              alt={_.get(
                                tour,
                                "package_details[0].package_name"
                              )}
                              className="w-full h-full group-hover:scale-110 duration-300 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="absolute top-5 left-0">
                          <span className="bg-black font-pri_para px-4 py-1 text-white">
                            {_.get(tour, "package_details[0].night")} Nights /{" "}
                            {_.get(tour, "package_details[0].days")} Days
                          </span>
                        </div>
                        <div className="absolute transform translate-y-14">
                          <span className="bg-white font-pri_para px-4 py-1 border text-black">
                            Sri Lanka
                          </span>
                        </div>
                        <div className="px-3 pb-3">
                          <h1 className="font-pri_head line-clamp-2">
                            {_.get(tour, "package_details[0].package_address")}
                          </h1>
                          <hr />
                          <div className="flex justify-between pt-3">
                            <div>
                              <p className="font-pri_para">
                                From{" "}
                                <span className="text-black font-pri_para font-bold">
                                  {moment(tour.from_date).format("DD-MM-YYYY")}
                                </span>
                              </p>
                              <p className="font-pri_para">
                                To{" "}
                                <span className="text-black font-pri_para font-bold">
                                  {moment(tour.to_date).format("DD-MM-YYYY")}
                                </span>
                              </p>
                            </div>
                            <div className="pt-1">
                              <Link
                                to={`/destination-explore/${tour._id}`}
                                className="bg-black text-primary font-pri_para font-semibold px-3 py-2 rounded"
                                aria-label={`View more details about ${tour.package_details[0]?.package_name}`}
                              >
                                View More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Spin>
      </div>
      <News />
    </>
  );
};

export default ClientTour;
