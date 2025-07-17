import { Dropdown } from "antd";
import { ICON_HELPER } from "../helper/IconHelper";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { adminToken } from "../helper/admin/notification_helper";
import { assignRole } from "../redux/role_slice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GET_ROLE_NAME } from "../helper/admin/role_helper";

const TopNavbar = () => {
  let items = [
    {
      key: "2",
      label: "My Profile",
      path: "/profile",
    },
    {
      key: "3",
      label: "Change Password",
      path: "/change-password",
    },
  ];

  const navigate = useNavigate();

  const role = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.removeItem(adminToken);
      dispatch(assignRole({}));
      navigate("/agent-login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const menuItems = items.map((item) => ({
    key: item.key,
    label: (
      <div onClick={() => handleMenuClick(item.path)} className="cursor-pointer">
        {item.label}
      </div>
    ),
  }));

  return (
    <div className="bg-secondary  h-[50px] w-full py-4 font-primary_font px-4 gap-x-6 text-white flex items-center  justify-end  top-0 left-[200px]">
      {/* <Dropdown menu={{ items: menuItems }} placement="bottomLeft" className="center_div gap-x-2 cursor-pointer">
        <div className="capitalize">
          {GET_ROLE_NAME(_.get(role, "role.value.role", ""))} <ICON_HELPER.DOWN_ARROW />
        </div>
      </Dropdown> */}

      <Link to={"/"} target="" className="cursor-pointer center_div gap-x-2 text-primary">
        Visit Site <ICON_HELPER.BROWSER_ICON className="animate-pulse" />
      </Link>

      <div onClick={handleLogout} className="bg-primary center_div font-primary_font rounded text-sm px-3 py-1 text-white gap-x-2 cursor-pointer">
        Logout
        <ICON_HELPER.LOGOUT_ICON className="!text-white" />
      </div>
    </div>
  );
};

export default TopNavbar;
