import { BsBoxes } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineDashboard } from "react-icons/ai";
import { sidebarMenuItem } from "@/types/menu.type";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import { NavLink } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import LabelWithLink from "../LabelWithLink";
const adminSidebarItems: sidebarMenuItem[] = [
  {
    key: "1",
    label: <LabelWithLink url="dashboard" role={true}>Dashboard</LabelWithLink>,
    icon: <AiOutlineDashboard size={20} />,
    url: "admin/dashboard",
  },
  {
    key: "2",
    label: <LabelWithLink url="profile" role={true}>Profile</LabelWithLink>,
    icon: <CgProfile size={20} />,
    url: "admin/profile",
  },
  {
    key: "3",
    label: <LabelWithLink url="products" role={true}>Products</LabelWithLink>,
    icon: <BsBoxes size={20} />,
    url: "admin/products",
  },
  {
    key: "4",
    label: <LabelWithLink url="orders" role={true}>Orders</LabelWithLink>,
    icon: <BiShoppingBag size={20} />,
    url: "admin/orders",
  },
  {
    key: "5",
    label: <LabelWithLink url="manage-users" role={true}>Manage Users</LabelWithLink>,
    icon: <CgProfile size={20} />,
    url: "admin/manage-users",
  },
];

export default adminSidebarItems;

//   const items: MenuItem[] = [
//     {
//       key: "1",
//       icon: <MailOutlined />,
//       label: "Navigation One",
//     },
//     {
//       key: "2",
//       icon: <CalendarOutlined />,
//       label: "Navigation Two",
//     },
//     {
//       key: "sub1",
//       label: "Navigation Two",
//       icon: <AppstoreOutlined />,
//       children: [
//         { key: "3", label: "Option 3" },
//         { key: "4", label: "Option 4" },
//         {
//           key: "sub1-2",
//           label: "Submenu",
//           children: [
//             { key: "5", label: "Option 5" },
//             { key: "6", label: "Option 6" },
//           ],
//         },
//       ],
//     },
//     {
//       key: "sub2",
//       label: "Navigation Three",
//       icon: <SettingOutlined />,
//       children: [
//         { key: "7", label: "Option 7" },
//         { key: "8", label: "Option 8" },
//         { key: "9", label: "Option 9" },
//         { key: "10", label: "Option 10" },
//       ],
//     },
//     {
//       key: "link",
//       icon: <LinkOutlined />,
//       label: (
//         <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//           Ant Design
//         </a>
//       ),
//     },
//   ];
