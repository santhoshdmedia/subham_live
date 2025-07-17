/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Menu, Input, Spin } from "antd";
import { Link, useNavigate, useHref } from "react-router-dom";
import { IMAGE_HELPER } from "../helper/Imagehelper";
import { CHECK_PATH, MENU_ITEMS } from "../helper/sidenavbarItem";
import _ from "lodash";
import { checkLoginStatus } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { assignRole } from "../redux/role_slice";
import { adminToken } from "../helper/admin/notification_helper";

const { SubMenu } = Menu;

const SideNavbar = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const roles = useSelector((data) => data);

  const navigate = useNavigate();
  const path = useHref();

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const [filterMenu, setFilterMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const prepareMenu = () => {
    try {
      setLoading(true);

      setFilterMenu(
        MENU_ITEMS.filter((res) => {
          return res.for.includes(_.get(roles, "role.value.role", ""));
        })
      );
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    prepareMenu();
  }, [_.get(roles, "role.value.role", "")]);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const result = await checkLoginStatus();

      if (_.isEmpty(_.get(result, "data.data", [])) || _.get(result, "data.data.role", []) === "customer") {
        if (_.get(result, "data.data.role", []) === "customer") {
          return navigate("/");
        }

        localStorage.removeItem(adminToken);
        return navigate("/login");
      }
      const { email, name, role, work_district, _id } = _.get(result, "data.data", []);
      let preparedData = {
        email: email,
        name: name,
        role: role,
        work_district: work_district,
        _id: _id,
      };
      dispatch(assignRole(preparedData));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (search) {
      setFilterMenu(
        MENU_ITEMS.filter((res) => {
          return String(res.name).toLocaleLowerCase().includes(search?.toLocaleLowerCase()) && res.for.includes(_.get(roles, "role.value.role", ""));
        })
      );
    } else {
      setFilterMenu(
        MENU_ITEMS.filter((res) => {
          return res.for.includes(_.get(roles, "role.value.role", ""));
        })
      );
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="h-screen w-full overflow-scroll pb-20  gap-y-4 flex flex-col bg-secondary">
        <Link to="/admin-packages" className="!pl-2 !pt-4 !pb-2 ">
          <img src={IMAGE_HELPER.SubhamWhiteLogo} alt="Logo" className="h-6   w-auto mt-4" />
        </Link>

        <div className="w-full  bottom-0 pt-2">
          <Input
            onChange={(e) => {
              setSearch(e?.target?.value);
            }}
            placeholder="Search menu..."
            className="h-[35px]  rounded-none border-white  placeholder:!text-secondary placeholder:font-primary_font  focus:!outline-none hover:border-black"
          />
        </div>
        <Menu className="w-full !border-none !bg-secondary" mode="vertical" openKeys={openKeys} onOpenChange={onOpenChange}>
          <div className="flex flex-col">
            {filterMenu.map((item) => {
              if (item.Submenu) {
                return (
                  <SubMenu key={item.id} icon={item.icon} title={<span className={`!text-white !font-primary_font`}>{item.name}</span>} className={`${CHECK_PATH(item.fill, path) ? "!bg-primary" : "!bg-secondary"} !rounded-none`}>
                    {item.Submenu.map((subItem) => (
                      <Menu.Item key={subItem.id} className={`${subItem.to === path ? "!bg-primary" : "!bg-white"}`}>
                        <Link to={subItem.to || "#"} className={`${subItem.to === path ? "!text-white" : "!text-secondary"} !font-primary_font`}>
                          {subItem.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item key={item.id} icon={item.icon} className={`border-b !h-[60px] ${CHECK_PATH(item.fill, path) ? "!bg-primary" : "!bg-secondary"} !rounded-none`}>
                  <Link to={item.to || "#"} className="!font-primary_font  !text-white pt-2.5">
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            })}
          </div>
        </Menu>
      </div>
    </Spin>
  );
};

export default SideNavbar;
