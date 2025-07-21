// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useParams, Link, useHref } from "react-router-dom";
import { IMAGE_HELPER } from "../../../../helper/Imagehelper";
import { ICON_HELPER } from "../../../../helper/IconHelper";
import { Spin, Collapse, theme } from "antd";
import { getSinglepackage } from "../../../../api";
import { TravelpackagesData } from "../../../../helper/customer/data-helper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CaretRightOutlined } from "@ant-design/icons";
import axios from "axios";
import Mail from "../mail/Mail";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;

const Vaibhamvam = () => {
  const { id } = useParams();
  const location = useHref();
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data = _.get(location?.split("/"), "[2]", "");
    const result = TravelpackagesData.filter((res) => res._id === Number(data));
    if (result.length) {
      setDestination(result[0]);
    }
  }, [location]);
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/new-register"); // Redirect to login if no token found
    }
  }, [navigate]);

  useEffect(() => {
    // console.log(id);

    const fetchDestinationDetails = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://subham-backend-2.onrender.com/api/auth/package/${id}`
        );
        const datas = _.get(result, "data.data", {});

        setDestination(datas);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  const getItems = (panelStyle) => {
    const groupedByDay = _.groupBy(destination.itinerary || [], "title");

    return Object.entries(groupedByDay).map(([day, activities], index) => ({
      key: String(index + 1),
      label: `${day}`,
      children: (
        <div>
          <ul className="list-disc pl-6 space-y-3 text-base text-gray-700">
            {activities.map((activity, idx) => (
              <li key={idx} className="font-semibold">
                <span className="text-primary">{activity.time} : </span>{" "}
                {activity.description}
              </li>
            ))}
          </ul>
        </div>
      ),
      style: panelStyle,
    }));
  };

  const details = [
    {
      icon: <ICON_HELPER.TIMELINE_ICON className="text-primary mr-1" />,
      label: "Duration",
      value: destination.duration,
    },
    {
      icon: <ICON_HELPER.LOCATION_ICON className="text-primary mr-1" />,
      label: "Location",
      value: destination.location,
    },
    {
      icon: <ICON_HELPER.CALL_ICON className="text-primary mr-1" />,
      label: "Contact",
      value: destination.contact,
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="w-full font-primary_font">
        {/* Banner Section */}
        <div className="relative w-full h-[600px] md:h-[400px]">
          <img
            src={IMAGE_HELPER.BannerBgImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center px-4 md:px-8 space-y-2">
              <p className="font-pri_para text-white flex justify-center gap-2">
                {/* <Link to="/" className="hover:text-primary">
                  Home
                </Link>
                <ICON_HELPER.RIGHT_ARROW /> */}
                <span className="font-title text-sky-500">
                  {destination.name || ""}
                </span>
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white font-pri_head tracking-wide">
                {destination.name || ""}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-primary font-pri_para">
                Book Your Travel Package!
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-10 md:px-[6vw]">
          <div className="w-full mb-5">
            <img
              src={destination.image || IMAGE_HELPER.DefaultPackageImage}
              alt="Destination"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full space-y-6 text-gray-800">
              {/* Price & Details */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-[80%] text-xl font-semibold text-primary">
                    <div className="">
                      {destination.country === "india" ? "LKR" : "INR"}{" "}
                      {Number(destination.discount_price || 0).toFixed(2)}
                      <span className="line-through ml-2 text-gray-400 text-base">
                        {destination.country === "india" ? "LKR" : "INR"}{" "}
                        {Number(destination.original_price || 0).toFixed(2)}
                      </span>
                      <span className="ml-2 text-black text-base font-normal">
                        / Per Person
                      </span>
                    </div>
                    <div className="">
                      <button
                        onClick={showModal}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4">
                          <h3 className="text-lg font-semibold">
                            Book Your Package
                          </h3>
                          <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <ICON_HELPER.CLOSE_ICON />
                          </button>
                        </div>
                        <div className="p-4">
                          <Mail packageName={destination.name} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-4 mt-3">
                    {details.map((detail, index) => (
                      <div
                        className="flex items-center font-pri_head"
                        key={index}
                      >
                        {detail.icon}
                        <span className="flex items-center text-base ml-1">
                          {detail.label}
                          <ICON_HELPER.FIND_ICON className="mx-1" />
                          {detail.value || "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="font-pri_para text-gray-700  text-base font-normal">
                  {destination.description}
                </div>
              </div>

              {/* Attractions */}
              <div className="space-y-3">
                <h3 className="text-lg font-pri_head font-semibold text-primary">
                  Top Attractions
                </h3>
                <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2">
                  {(destination.top_attractions || []).map(
                    (attraction, index) => (
                      <li
                        key={index}
                        className="lg:flex lg:items-start items-center  gap-4"
                      >
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-[150px] h-[100px] object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold">
                            <ICON_HELPER.STAR_ICON className="text-yellow-500" />
                            {attraction.name}
                          </h4>
                          <p className="font-pri_para text-gray-700  text-base font-normal lg:w-[400px]">
                            {attraction.description}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Included & Excluded */}
              <div className="space-y-3">
                <h3 className="text-lg font-pri_head font-semibold text-primary">
                  Included and Excluded
                </h3>
                <div className="flex flex-col lg:flex-row gap-6 font-pri_para text-gray-700  text-base font-normal">
                  <ul className="space-y-2 w-full lg:w-1/2">
                    {(destination.included_excluded || [])
                      .filter((res) => res.type === "included")
                      .map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ICON_HELPER.CHECK_ICON className="text-green-500" />
                          <span>{item.description}</span>
                        </li>
                      ))}
                  </ul>

                  <ul className="space-y-2 w-full lg:w-1/2">
                    {(destination.included_excluded || [])
                      .filter((res) => res.type === "excluded")
                      .map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ICON_HELPER.CLOSE_ICON className="text-red-500" />
                          <span>{item.description}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-3">
                <h3 className="text-lg font-pri_head font-semibold text-primary">
                  Itinerary
                </h3>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{
                    background: token.colorBgContainer,
                  }}
                  items={getItems({ backgroundColor: "#f9f9f9" })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Vaibhamvam;
