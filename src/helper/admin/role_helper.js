import _ from "lodash";

/* eslint-disable no-empty */
export const ALLROLES = [
  {
    id: 1,
    name: "super Admin",
    as: "super_admin",
    redirect: "/admin-packages",
    hide: [""],
    color: "#65a30d",
  },
  {
    id: 2,
    name: "Area Admin",
    as: "area_admin",
    redirect: "/admin-packages",
    hide: ["super_admin"],
    color: "#eab308",
  },
  {
    id: 3,
    name: "Agent",
    as: "agent",
    redirect: "/admin-packages",
    hide: ["super_admin", "area_admin"],
    color: "#3F83F8",
  },
  {
    id: 4,
    name: "Area Staffs",
    as: "area_staffs",
    redirect: "/admin-packages",
    hide: ["super_admin", "area_admin"],
    color: "#D61F69",
  },
  {
    id: 4,
    name: "customer",
    as: "customer",
    redirect: "/",
    hide: [""],
    color: "#78716c",
  },
  {
    id: 5,
    name: "Ferry Staff",
    as: "ferry_staff",
    redirect: "/admin-packages",
    hide: ["super_admin"],
    color: "#7E3AF2",
  },
];

export const GET_COLOR = (value) => {
  try {
    let result = ALLROLES.find((role) => role.as === value);

    return {
      color: result.color,
      role_name: result.name,
    };
  } catch {}
};

export const GET_ROLE_NAME = (value) => {
  try {
    let result = ALLROLES.find((role) => {
      return role.as === value;
    });
    return _.get(result, "name", "");
  } catch {}
};
