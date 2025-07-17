/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiTextAlignRightThin, PiPhoneCallThin } from "react-icons/pi";
import { IMAGE_HELPER } from "../helper/Imagehelper";
import { FaFacebookF, FaYoutube, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { Avatar, Button, Divider, Drawer, Form, Input, Modal } from "antd";
import { ICON_HELPER } from "../helper/IconHelper";

import _ from "lodash";

const Navbar = () => {
  const [after, setAfter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setuser] = useState("");

  const [active, setActive] = useState("");

  // const fetchData = async () => {
  //   try {
  //     const result = await checkLoginStatus();
  //     const userData = _.get(result, "data.data", []);
  //     setuser(userData);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // const token = localStorage.getItem(adminToken);
    // setIsLoggedIn(!!token);

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
      validPaths: ["destination", "destination-explore"],
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
    { id: 4, name: "Blogs", path: "/blogs" },
    {
      id: 4,
      name: "Policy",
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

    const currentPath = path.split("/")[1];
    return validPaths.includes(currentPath);
  };

  const AUTH_VIEW = [
    {
      id: 1,
      name: "Login",
      path: "/select-role",
      icon: <ICON_HELPER.LOGIN_ICON />,
      children: [
        {
          id: 1,
          name: "Log In as Customer",
          path: "login",
          same: true,
        },
        {
          id: 2,
          name: "Log In as Agent",
          path: "/agent-login",
        },
      ],
    },
    {
      id: 2,
      name: "Register",
      path: "/select-role",
      icon: <ICON_HELPER.REGISTER_ICON />,
      children: [
        {
          id: 1,
          name: "Register As Customer",
          path: "register",
          same: true,
        },
        {
          id: 2,
          name: "Register As Agent",
          path: "/create-agent-account",
        },
      ],
    },
  ];

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
      <div className={`h-[60px]  center_div flex-col md:flex-row md:gap-3 gap-y-5 mt-20 md:mt-0 ${gap ? "gap-x-3" : "gap-x-2 lg:gap-x-5 xl:gap-x-10"}  relative `}>
        {items?.map((link) => (
          <div key={link.id} className={`flex items-center ${mobile_view ? "flex-col" : ""} relative  group h-full`}>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              to={link.path}
              className={`font-pri_head !capitalize group-hover:text-primary ${new_path(link.validPaths, location.pathname) ? "text-primary" : "text-black"} ${location.pathname === link.path ? "text-primary" : "text-black"}`}
            >
              {link.name}
            </Link>{" "}
            {!_.isEmpty(link?.children) && (
              <Link to={_.get(link, "children[0].path")}>
                <ICON_HELPER.DROP_DOWNICON className={`!text-lg ${mobile_view && "hidden"} group-hover:text-primary  ${new_path(link.validPaths, location.pathname) ? "text-primary" : "text-black"} ${location.pathname === link.path ? "text-primary" : "text-black"}`} />
              </Link>
            )}
            {!_.isEmpty(link?.children) && (
              <div className={` ${mobile_view ? "hidden" : "hidden absolute border-t group-hover:flex"}   ${gap ? "right-0" : ""}  bg-white  flex-col  top-[60px] z-50 min-w-[250px]`}>
                {link?.children?.map((res, index) => {
                  return (
                    <div
                      onClick={() => {
                        handleCLick(res);
                        setOpen(false);
                      }}
                      key={index}
                      className={` ${mobile_view ? "h-[35px] juc" : "h-[50px] border-b"}  w-full capitalize group/raw gap-x-2 cursor-pointer font-medium  hover:bg-primary hover:text-white  center_div justify-start px-4`}
                    >
                      <ICON_HELPER.RIGHTARROW_HORIZONTALEND className="invisible group-hover/raw:visible !text-lg" /> {res.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[60px] w-screen text-sm bg-white center_div justify-between sticky top-0 !z-50 px-5 md:px-10 lg:px-20">
      <Link to="/">
        <img src={IMAGE_HELPER.SubhamLogo} alt="logo" className="w-[100px] md:w-[140px]" />
      </Link>

      <div className="hidden md:block">
        <DisplayCustomDropDown items={NavbarLinks} />
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

      <div className="flex items-center gap-5">
        <div>
          <Link to={"https://booking.sailsubham.com"} className="bg-primary text-white rounded px-3 py-1">
            Login
          </Link>
        </div>
        <div className="hidden lg:block">
          <Link to={"https://booking.sailsubham.com/register"} className="bg-primary text-white rounded px-3 py-1">
            Sign Up
          </Link>
        </div>
        <div
          className="block md:hidden cursor-pointer"
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
