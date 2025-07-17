/* eslint-disable no-empty */
export const MENU_ITEMS = [
  // {
  //   id: 1,
  //   name: "Dashboard",
  //   to: "/dashboard",
  //   fill: ["dashboard"],
  //   for: ["super_admin", "ferry_staff", "agent", "area_admin"],
  // },

  // {
  //   id: 2,
  //   name: "Add  Users",
  //   to: "/add-employee",
  //   fill: ["add-employee"],
  //   for: ["super_admin", "area_admin"],
  // },
  // {
  //   id: 3,
  //   name: "Users",
  //   fill: ["employee-details", "edit-employee"],
  // Submenu: [
  //   {
  //     id: "3.1",
  //     name: "Area Admin",
  //     to: "/area-admin",
  //   },
  //   {
  //     id: "3.2",
  //     name: "Area Staffs",
  //     to: "/area-staffs",
  //   },
  //   {
  //     id: "3.3",
  //     name: "Agent",
  //     to: "/agent",
  //   },
  //   {
  //     id: "3.4",
  //     name: "Ferry Staff",
  //     to: "/ferry-staff",
  //   },
  // ],
  //   for: ["super_admin", "area_admin"],
  //   to: "/employee-details",
  // },
  // {
  //   id: 4,
  //   name: "Customers",
  //   to: "/customers",
  //   fill: ["customers"],
  //   for: ["super_admin"],
  // },
  // {
  //   id: 5,
  //   name: "Blogs",
  //   to: "/admin-blogs",
  //   fill: ["admin-blogs"],
  //   for: ["super_admin"],
  // },
  {
    id: 6,
    name: "Packages",
    to: "/admin-packages",
    fill: ["admin-packages"],
    for: ["super_admin"],
  },
  {
    id: 4,
    name: "Hero",
    to: "/hero-page",
    fill: ["hero-page"],
    for: ["super_admin"],
  },
  // {
  //   id:7,
  //   name:"Tour",
  //   to:"/admin-tour",
  //   fill:["admin-tour"],
  //   for:["super_admin","area_admin"]
  // },
  // {
  //   id:8,
  //   name:"Task",
  //   to:"/task-details",
  //   fill:["task-details"],
  //   for:["ferry_staff"]

  // },
  // {
  //   id:9,
  //   name:"My Booking",
  //   to:"/mybooking",
  //   fill:["mybooking"],
  //   for:["agent"]
  // },
  // {
  //   id: 10,
  //   name: "Settings",
  //   to: "/settings",
  //   fill: ["settings"],
  //   for: ["super_admin"],
  // },
];

export const CHECK_PATH = (fill, path) => {
  try {
    return fill.includes(path?.split("/")[1]);
  } catch {}
};
