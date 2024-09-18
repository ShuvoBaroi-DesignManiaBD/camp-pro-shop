import { BsBookmarkHeart } from "react-icons/bs"; 
import { BiShoppingBag } from "react-icons/bi"; 
import { CgProfile } from "react-icons/cg";
import { AiOutlineDashboard } from "react-icons/ai";
import { sidebarMenuItem } from "@/types/menu.type";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import { NavLink } from "react-router-dom";
const customerSidebarItems: sidebarMenuItem[] = [
  {
    key: "1",
    label: <NavLink to="dashboard">Dashboard</NavLink>,
    icon: <AiOutlineDashboard size={20} />,
    url: "customer/dashboard",
  },
  {
    key: UniqueIdGenerator(),
    label: <NavLink to="profile">Profile</NavLink>,
    icon: <CgProfile size={20} />,
    url: "customer/profile",
  },
  {
    key: UniqueIdGenerator(),
    label: <NavLink to="orders">My Orders</NavLink>,
    icon: <BiShoppingBag size={20}/>,
    url: "customer/orders",
  },
  {
    key: UniqueIdGenerator(),
    label: <NavLink to="wishlist">My Wishlist</NavLink>,
    icon: <BsBookmarkHeart size={18}/>,
    url: "customer/wishlist",
  },
  // {
  //   key: UniqueIdGenerator(),
  //   label: <NavLink to="profile">Profile</NavLink>,
  //   url: "/profile",
  //   children: [
  //     {
  //       key: UniqueIdGenerator(),
  //       label: "Profile",
  //       url: "/dashboard/profile",
  //     },
  //   ],
  // },
];

export default customerSidebarItems;

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
