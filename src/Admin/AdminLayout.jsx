import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex w-screen h-screen admin  bg-white">
      <div className="w-[180px] fixed border-r-4">
        <SideNavbar />
      </div>
      <div className="flex flex-col pl-[180px] w-full">
        <TopNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
