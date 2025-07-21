/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiTextAlignRightThin, PiPhoneCallThin } from "react-icons/pi";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { FaFacebookF, FaYoutube, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { Avatar, Button, Divider, Drawer, Form, Input, Menu, Modal } from "antd";
import { ICON_HELPER } from "../../helper/IconHelper";
import { adminToken } from "../../helper/admin/notification_helper";
import { checkLoginStatus } from "../../api";
import _ from "lodash";
import { HashLink } from "react-router-hash-link";
import { RiDropdownList, RiSearchLine } from "react-icons/ri";
import { HiArrowUturnRight } from "react-icons/hi2";
import { BiArrowToRight } from "react-icons/bi";
import { MdLocationSearching } from "react-icons/md";
import Login from "../../component/auth/Login";
import { AlignRightOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { LabelHelper } from "../../component/LabelHelper";
import { EmailValidation, PasswordValidation } from "../../helper/formValidation";
import CRegister from "./CRegister";
import CLogin from "./CLogin";

const Navbar = () => {
  const [after, setAfter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const fetchData = async () => {
    try {
      const result = await checkLoginStatus();
      const userData = _.get(result, "data.data", []);
      console.log(userData);
      setuser(userData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(adminToken);
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setAfter(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavbarLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About Us", path: "/aboutus" },
    {
      id: 3,
      name: "Tours",
      validPaths: ["/destination", "/destination-india"],
      children: [
        {
          id: 1,
          name: "Top Destination In Sri Lanka",
          path: "/destination",
        },
        {
          id: 2,
          name: "Top Destination In India",
          path: "/destination-india",
        },
      ],
    },
    {
      id: 4,
      name: "Policy",
      validPaths: ["/privacypolicy", "/travelpolicy", "/termsandconditions"],
      children: [
        {
          id: 1,
          name: "Privacy Policy",
          path: "/privacypolicy",
        },
        {
          id: 2,
          name: "Travel Policy",
          path: "/travelpolicy",
        },
        {
          id: 3,
          name: "Terms and Conditions",
          path: "/termsandconditions",
        },
      ],
    },
    { id: 4, name: "Contacts", path: "/contact" },
  ];

  const new_path = (validPaths, path) => {
    if (!validPaths || !path) return false;

    return validPaths.includes(path);
  };

  const navigation = useNavigate();

  const handleCLick = (res) => {
    if (res?.same) {
      setActive(res?.path);
    } else {
      navigation(res?.path);
    }
  };

  const DisplayCustomDropDown = ({ items, gap = false, mobile_view }) => {
    return (
      <Menu mode={mobile_view ? "inline" : "horizontal"} className={`${mobile_view ? "!w-full" : ""}`}>
        {NavbarLinks?.map((menuItem, menuIndex) => {
          if (!_.isEmpty(menuItem?.children)) {
            return (
              <Menu.SubMenu key={menuItem.name} title={<h1 className={`${new_path(menuItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>{menuItem.name}</h1>} className={`${location.pathname === menuItem.path || new_path(menuItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>
                {menuItem.children?.map((childItem, childIndex) => (
                  <Menu.Item key={`${menuItem.name}-${childIndex}`} onClick={() => handleChange(childItem)} className={`!h-[50px] ${location.pathname === childItem.path || new_path(childItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>
                    {childItem.name}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }

          return (
            <Menu.Item key={menuItem.name || menuIndex} onClick={() => handleChange(menuItem)} className={`!h-[50px] ${location.pathname === menuItem.path || new_path(menuItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>
              {menuItem.name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  const handleChange = (res) => {
    navigate(`${res.path}`);
    setOpen(false);
  };

  return (
    <div className="h-[60px] w-screen text-sm bg-white center_div justify-between  px-5 md:px-10 lg:px-20">
      <Link to="/" className="lg:w-[31%] flex justify-start items-start">
        <img src={IMAGE_HELPER.SubhamLogo} alt="logo" className="w-[100px] md:w-[140px]" />
      </Link>

      <div className="hidden lg:w-[38%] lg:block">
        <div className="flex items-center !w-full justify-center">
          <DisplayCustomDropDown items={NavbarLinks} />
        </div>
      </div>

      {/* <div className="h-full flex items-center gap-x-10 ">
     
        <DisplayCustomDropDown items={AUTH_VIEW} gap={true} />
 
        <div className="hidden md:block">
          <div className="center_div gap-x-2 bg-primary size-[30px] rounded-full cursor-pointer">
            <RiSearchLine className="text-lg rounded-full text-white" />
          </div>
        </div>
        <div className="lg:hidden border px-2 py-1" onClick={showDrawer}>
          <AlignRightOutlined />
        </div>
        <Drawer title="SUBHAM" onClose={onClose} open={open}>
          <ToggleDropDown items={NavbarLinks} />
          <Divider orientation="left">Let&apos;s Start</Divider>
          <ToggleDropDown items={AUTH_VIEW} />
        </Drawer>
      </div>
      <Modal
        open={active}
        footer={false}
        onCancel={() => {
          setActive("");
        }}
        className={`${active === "login" ? "!w-[400px]" : "!w-[700px]"}`}
      >
        <div className="flex flex-col gap-y-8  justify-center items-center">
          <img src={IMAGE_HELPER.SubhamLogo} alt="Company Logo" className="w-40 my-4" />
          <div className="w-full center_div justify-between gap-x-2 relative ">
            {["login", "register"].map((res, index) => {
              return (
                <div
                  onClick={() => {
                    setActive(res);
                  }}
                  key={index}
                  className={`w-[48%] h-[50px] !text-sm uppercase font-pri_head cursor-pointer font-medium ${active === res ? "text-primary" : "text-secondary"}  transition-all delay-200 center_div z-50`}
                >
                  Customer {res}
                </div>
              );
            })}
            <Button className={`absolute h-[50px] shadow-inner transition-all duration-500 border !rounded-none border-secondary ${active === "login" ? "translate-x-0" : "translate-x-full "} z-40 w-[50%]`}></Button>
          </div>
          <div className="!w-full">{active === "login" ? <CLogin active={active} /> : <CRegister active={active} />}</div>
        </div>
      </Modal> */}
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DisplayCustomDropDown items={NavbarLinks} mobile_view={true} />
      </Drawer>

      <div className="lg:w-[31%] flex items-center justify-end gap-5">
        <div>
          <Link to={"https://booking.sailsubham.com"} className="bg-primary text-white rounded px-3 py-1">
            Login
          </Link>
        </div>
        <div className="hidden xl:block">
          <Link to={"https://booking.sailsubham.com/register"} className="bg-primary text-white rounded px-3 py-1">
            Sign Up
          </Link>
        </div>
        {/* {isLoggedIn ? (
          <div className="hidden lg:flex items-center gap-2">
            <Button
              type="default"
              onClick={() => {
                localStorage.removeItem(adminToken);
                setIsLoggedIn(false);
                setuser(null);
                navigate("/admin-packages");
              }}
              className="bg-primary text-white "
            >
              Admin Live
            </Button>
          </div>
        ) : (
          <div className="hidden lg:block">
            <Link to={"/agent-login"} className="bg-primary text-white rounded px-3 py-1">
              Admin Login
            </Link>
          </div>
        )} */}
        <div
          className="block lg:hidden cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <ICON_HELPER.HAMBURGER_MENU_ICON />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const SurpriceNav=()=>{
  const [after, setAfter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const fetchData = async () => {
    try {
      const result = await checkLoginStatus();
      const userData = _.get(result, "data.data", []);
      console.log(userData);
      setuser(userData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(true);

    const handleScroll = () => {
      setAfter(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavbarLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About Us", path: "/aboutus" },
    {
      id: 3,
      name: "Tours",
      validPaths: ["/destination", "/destination-india"],
      children: [
        {
          id: 1,
          name: "Top Destination In Sri Lanka",
          path: "/destination",
        },
        {
          id: 2,
          name: "Top Destination In India",
          path: "/destination-india",
        },
      ],
    },
    {
      id: 4,
      name: "Policy",
      validPaths: ["/privacypolicy", "/travelpolicy", "/termsandconditions"],
      children: [
        {
          id: 1,
          name: "Privacy Policy",
          path: "/privacypolicy",
        },
        {
          id: 2,
          name: "Travel Policy",
          path: "/travelpolicy",
        },
        {
          id: 3,
          name: "Terms and Conditions",
          path: "/termsandconditions",
        },
      ],
    },
    { id: 4, name: "Contacts", path: "/contact" },
  ];

  const new_path = (validPaths, path) => {
    if (!validPaths || !path) return false;

    return validPaths.includes(path);
  };

  const navigation = useNavigate();

  const handleCLick = (res) => {
    if (res?.same) {
      setActive(res?.path);
    } else {
      navigation(res?.path);
    }
  };

  const DisplayCustomDropDown = ({ items, gap = false, mobile_view }) => {
    return (
      <Menu mode={mobile_view ? "inline" : "horizontal"} className={`${mobile_view ? "!w-full" : ""}`}>
        {NavbarLinks?.map((menuItem, menuIndex) => {
          if (!_.isEmpty(menuItem?.children)) {
            return (
              <Menu.SubMenu key={menuItem.name} title={<h1 className={`${new_path(menuItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>{menuItem.name}</h1>} className={`${location.pathname === menuItem.path || new_path(menuItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>
                {menuItem.children?.map((childItem, childIndex) => (
                  <Menu.Item key={`${menuItem.name}-${childIndex}`} onClick={() => handleChange(childItem)} className={`!h-[50px] ${location.pathname === childItem.path || new_path(childItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>
                    {childItem.name}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }

          return (
            <Menu.Item key={menuItem.name || menuIndex} onClick={() => handleChange(menuItem)} className={`!h-[50px] ${location.pathname === menuItem.path || new_path(menuItem.validPaths, location.pathname) ? "!text-primary" : "!text-black"}`}>
              {menuItem.name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  const handleChange = (res) => {
    navigate(`${res.path}`);
    setOpen(false);
  };
  const handleLogOut=()=>{
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    window.location.reload();
  }

  return (
    <div className="h-[60px] w-screen text-sm bg-[#ffffff85] center_div justify-between  px-5 md:px-10 lg:px-20 fixed">
      <Link to="/influencer-page" className="lg:w-[31%] flex justify-start items-start">
        <img src={IMAGE_HELPER.SubhamLogo} alt="logo" className="w-[100px] md:w-[140px]" />
      </Link>

      <div className="hidden lg:w-[38%] lg:block">
        <div className="flex items-center !w-full justify-center">
          {/* <DisplayCustomDropDown items={NavbarLinks} /> */}
        </div>
      </div>

      
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {/* <DisplayCustomDropDown items={NavbarLinks} mobile_view={true} /> */}
      </Drawer>

      <div className="lg:w-[31%] flex items-center justify-end gap-5">
         {isLoggedIn?
         <>
         <button className="bg-primary text-white rounded px-3 py-1"
         onClick={handleLogOut}
         >
          Logout
         </button>
         </>: <>
        <div>
         <Link to={"/new-login"} className="bg-primary text-white rounded px-3 py-1">
            Login
          </Link>
        </div>
        <div className="hidden xl:block">
          <Link to={"/new-register"} className="bg-primary text-white rounded px-3 py-1">
            Sign Up
          </Link>
        </div>
          </>}
        {/* {isLoggedIn ? (
          <div className="hidden lg:flex items-center gap-2">
            <Button
              type="default"
              onClick={() => {
                localStorage.removeItem(adminToken);
                setIsLoggedIn(false);
                setuser(null);
                navigate("/admin-packages");
              }}
              className="bg-primary text-white "
            >
              Admin Live
            </Button>
          </div>
        ) : (
          <div className="hidden lg:block">
            <Link to={"/agent-login"} className="bg-primary text-white rounded px-3 py-1">
              Admin Login
            </Link>
          </div>
        )} */}
        <div
          className="hidden cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <ICON_HELPER.HAMBURGER_MENU_ICON />
        </div>
      </div>
    </div>)
}
