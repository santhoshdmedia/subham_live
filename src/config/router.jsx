import { createBrowserRouter } from "react-router-dom";
import CustomerLayout from "../Customer/CustomerLayout";
import Home from "../Customer/pages/home/Home";
import About from "../Customer/pages/about/About";
import Destination from "../Customer/pages/destination/Destination";
import DestinationDetails from "../Customer/pages/destination/DestinationDetails";
import Contact from "../Customer/pages/contact/Contact";
import Blogs from "../Customer/pages/blogs/Blogs";
import BlogDetails from "../Customer/pages/blogs/BlogDetails";
import ClientTour from "../Customer/pages/clienttour/ClientTour";
import Termsandconditions from "../Customer/pages/details/Termsandconditions";
import Userprofile from "../Customer/pages/profile/Userprofile";
import Privacypolicy from "../Customer/pages/details/Privacypolicy";
import Travelpolicy from "../Customer/pages/details/Travelpolicy";
import Destination_india from "../Customer/pages/destination/Destination_india";
import Login from "../component/auth/Login";
import Dashboard from "../Admin/pages/dashboard/Dashboard";
import AdminLayout from "../Admin/AdminLayout";
import Package from "../Admin/pages/package/Package";
import Settings from "../Admin/pages/settings/Settings";
import HeroPage from "../Admin/pages/Hero/HeroPage";
import Vasan from "../Customer/surprice/Vasan";
import Register from "../Customer/pages/Surprice/Login/Register";
import { LoginPage } from "../Customer/pages/Surprice/Login/Register";
import Mail from "../Customer/pages/Surprice/mail/Mail";
import Enquiry from "../Customer/pages/Surprice/enquirey/Enquirey";
import Vaibhamvam from "../Customer/pages/Surprice/destination/Vaibhamvam";

// landing page
let client_routes = [
  {
    path: "/",
    element: <CustomerLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/Userprofile",
    element: <CustomerLayout />,
    children: [{ path: "/Userprofile", element: <Userprofile /> }],
  },
  {
    path: "/aboutus",
    element: <CustomerLayout />,
    children: [{ path: "/aboutus", element: <About /> }],
  },
  {
    path: "/destination",
    element: <CustomerLayout />,
    children: [{ path: "/destination", element: <Destination /> }],
  },
  {
    path: "/destination-india",
    element: <CustomerLayout />,
    children: [{ path: "/destination-india", element: <Destination_india /> }],
  },
  {
    path: "/destination-explore/:id",
    element: <CustomerLayout />,
    children: [{ path: "/destination-explore/:id", element: <DestinationDetails /> }],
  },
  {
    path: "/contact",
    element: <CustomerLayout />,
    children: [{ path: "/contact", element: <Contact /> }],
  },
  {
    path: "/blogs",
    element: <CustomerLayout />,
    children: [{ path: "/blogs", element: <Blogs /> }],
  },
  {
    path: "/privacypolicy",
    element: <CustomerLayout />,
    children: [{ path: "/privacypolicy", element: <Privacypolicy /> }],
  },
  {
    path: "/travelpolicy",
    element: <CustomerLayout />,
    children: [{ path: "/travelpolicy", element: <Travelpolicy /> }],
  },
  {
    path: "/termsandconditions",
    element: <CustomerLayout />,
    children: [{ path: "/termsandconditions", element: <Termsandconditions /> }],
  },
  {
    path: "/explore-blogs/:id",
    element: <CustomerLayout />,
    children: [{ path: "/explore-blogs/:id", element: <BlogDetails /> }],
  },
  {
    path: "/client-tour",
    element: <CustomerLayout />,
    children: [{ path: "/client-tour", element: <ClientTour /> }],
  },
  {
    path: "/influencer-page",
    element: <CustomerLayout />,
    children: [{ path: "/influencer-page", element: <Vasan /> }],
  },
  {
    path: "/new-register",
    element: <CustomerLayout />,
    children: [{ path: "/new-register", element: <Register /> }],
  },
  {
    path: "/new-login",
    element: <CustomerLayout />,
    children: [{ path: "/new-login", element: <LoginPage /> }],
  },
  {
    path: "/Enquirey",
    element: <CustomerLayout />,
    children: [{ path: "/Enquirey", element: <Mail /> }],
  },
  {
    path: "/Enquirey-view",
    element: <CustomerLayout />,
    children: [{ path: "/Enquirey-view", element: <Enquiry /> }],
  },
  {
    path: "/vaibhavam/:id",
    element: <CustomerLayout />,
    children: [{ path: "/vaibhavam/:id", element: <Vaibhamvam /> }],
  },
];

// dashboard
let admin_routes = [
  {
    path: "/agent-login",
    element: <Login />,
  },

  //   {
  //     path: "/create-agent-account",
  //     element: <Register />,
  //   },
  //   {
  //     path: "/forgot-password",
  //     element: <ForgotPassword />,
  //   },
  //   {
  //     path: "/reset-password/:id",
  //     element: <ResetPassword />,
  //   },
  //   {
  //     path: "/select-role",
  //     element: <SelectRole />,
  //   },
  // {
  //   path: "/dashboard",
  //   element: <AdminLayout />,
  //   children: [{ path: "/dashboard", element: <Dashboard /> }],
  // },
  //   {
  //     path: "/mybooking",
  //     element: <AdminLayout />,
  //     children: [{ path: "/mybooking", element: <Mybooking /> }],
  //   },
  //   {
  //     path: "/add-employee",
  //     element: <AdminLayout />,
  //     children: [{ path: "/add-employee", element: <AddEmployee /> }],
  //   },
  //   {
  //     path: "/employee-details",
  //     element: <AdminLayout />,
  //     children: [{ path: "/employee-details", element: <EmployeeDetails /> }],
  //   },
  //   {
  //     path: "/customers",
  //     element: <AdminLayout />,
  //     children: [{ path: "/customers", element: <Customers /> }],
  //   },
  //   {
  //     path: "/edit-employee/:id",
  //     element: <AdminLayout />,
  //     children: [{ path: "/edit-employee/:id", element: <AddEmployee /> }],
  //   },
  //   {
  //     path: "/admin-blogs",
  //     element: <AdminLayout />,
  //     children: [{ path: "/admin-blogs", element: <AdminBlogs /> }],
  //   },
  {
    path: "/admin-packages",
    element: <AdminLayout />,
    children: [{ path: "/admin-packages", element: <Package /> }],
  },
  {
    path: "/hero-page",
    element: <AdminLayout />,
    children: [{ path: "/hero-page", element: <HeroPage /> }],
  },
  //   {
  //     path: "/admin-tour",
  //     element: <AdminLayout />,
  //     children: [{ path: "/admin-tour", element: <Tour /> }],
  //   },
  //   {
  //     path: "/profile",
  //     element: <AdminLayout />,
  //     children: [{ path: "/profile", element: <Profile /> }],
  //   },
  //   {
  //     path: "/user_details/:id",
  //     element: <AdminLayout />,
  //     children: [{ path: "/user_details/:id", element: <Profile /> }],
  //   },
  //   {
  //     path: "/change-password",
  //     element: <AdminLayout />,
  //     children: [{ path: "/change-password", element: <Changepassword /> }],
  //   },
  //   {
  //     path: "/tour-details/:id",
  //     element: <AdminLayout />,
  //     children: [{ path: "/tour-details/:id", element: <TourDetails /> }],
  //   },
  //   {
  //     path: "/task-details",
  //     element: <AdminLayout />,
  //     children: [{ path: "/task-details", element: <Task /> }],
  //   },
  {
    path: "/settings",
    element: <AdminLayout />,
    children: [{ path: "/settings", element: <Settings /> }],
  },
];

const router = createBrowserRouter([...client_routes, ...admin_routes]);

export default router;
