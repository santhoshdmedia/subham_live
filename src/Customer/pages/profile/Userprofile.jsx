// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Image, Input, message, Tabs } from "antd";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { IMAGE_HELPER } from "../../../helper/Imagehelper";
import { checkLoginStatus, editUser, getSingle_booking } from "../../../api";
import { adminToken } from "../../../helper/admin/notification_helper";
import UploadHelper from "../../../helper/UploadHelper";
import ShowImages from "../../../helper/ShowImages";
import _ from "lodash";
import News from "../../newsLetter/News";

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [bookingdata, setbookingdata] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const fetchUserData = async () => {
    try {
      // const result = await checkLoginStatus();
      const userData = _.get(result, "data.data", {});
      setUser(userData);
      setImgPath(userData.user_img || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingData = async () => {
    try {
      const result = await getSingle_booking();
      const bookingDatas = _.get(result, "data.data");
      setbookingdata(bookingDatas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBookingData();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      form.setFieldsValue({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
        mobile_number: user.mobile_number,
        emergency_contact: user.emergency_contact,
      });
    }
  }, [loading, user, form]);

  const handleSave = async (values) => {
    try {
      const updatedData = { ...values, user_img: imgPath };
      const result = await editUser(updatedData, user._id);

      if (result.status === 200) {
        message.success("Profile updated successfully!");
        setUser({ ...user, ...updatedData });
      } else {
        message.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while saving.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(adminToken);
    navigate("/login");
  };

  const tabItems = [
    {
      key: "1",
      label: "Profile",
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="space-y-4"
        >
          <Form.Item label="Profile Image">
            {imgPath ? (
              <ShowImages path={imgPath} setImage={setImgPath} />
            ) : (
              <UploadHelper setImagepath={setImgPath} />
            )}
          </Form.Item>

          <Form.Item
            label="First Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name">
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobile_number"
            rules={[
              { required: true, message: "Please enter your mobile number!" },
            ]}
          >
            <Input placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your Address" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label="Emergency Mobile Number"
            name="emergency_contact"
            rules={[
              {
                required: true,
                message: "Please enter your emergency contact number!",
              },
            ]}
          >
            <Input placeholder="Enter Emergency Mobile Number" />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button type="primary" htmlType="submit" className="rounded-lg">
              Update <ICON_HELPER.UPDATE_ICON />
            </Button>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: "My Orders",
      children: (
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border border-gray-300 p-4">Booking Date</th>
                <th className="border border-gray-300 p-4">Package Name</th>
                <th className="border border-gray-300 p-4">Duration</th>
                <th className="border border-gray-300 p-4">Package Address</th>
                <th className="border border-gray-300 p-4">Total Travelers</th>
                <th className="border border-gray-300 p-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookingdata.map((res, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 p-4">
                    {new Date(_.get(res, "createdAt", "")).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {_.get(res, "packges_details[0].package_name", "")}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {_.get(res, "packges_details[0].night", 0)} Night /{" "}
                    {_.get(res, "packges_details[0].days", 0)} Days
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="line-clamp-2 ">
                      {_.get(res, "packges_details[0].package_address", "")}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    {_.get(res, "total_count", 0)}
                  </td>
                  <td className="border border-gray-300 p-4">
                    ₹{(_.get(res, "total_price", 0) || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 pl-8 pr-8 pt-8 lg:pt-14 pb-48">
        <div className="bg-white shadow-sm p-4 rounded-md">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-5 px-5">
            <div className="text-gray-600 text-xl font-bold flex justify-center items-center gap-2">
              <div>
                <Link to="/" className="font-bold">
                  Home
                </Link>
              </div>
             <div className="flex justify-center items-center">
             <ICON_HELPER.FIND_ICON className=""/>
             </div>
              <div className="text-xl text-primary">My Account</div>
            </div>

            <Button onClick={handleLogout} className="bg-primary text-white">
              Logout <ICON_HELPER.LOGOUT_ICON className="ml-2" />
            </Button>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="sm:ml-5 relative">
                <Image
                  src={imgPath || IMAGE_HELPER.DefaultProfileImage}
                  alt="Profile"
                  className="!rounded-full !w-[80px] !h-[80px] !lg:w-[100px] !lg:h-[100] !object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{`${user.name} ${user.last_name}`}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow p-6 rounded-md">
          <Tabs items={tabItems} centered />
        </div>
      </div>
      <News />
    </>
  );
};

export default UserProfile;
