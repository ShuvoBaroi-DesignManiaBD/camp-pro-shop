import { CgProfile } from "react-icons/cg"; 
import { AiOutlineDashboard } from "react-icons/ai"; 
import { sidebarMenuItem } from "@/types/menu.type";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const sidebarItems: sidebarMenuItem[] = [
  {
    key: '1',
    label: <NavLink to="/dashboard">Dashboard</NavLink>,
    icon: <AiOutlineDashboard size={20}/>,
    url: "/dashboard",
  },
  {
    key: UniqueIdGenerator(),
    label: <NavLink to="profile">Profile</NavLink>,
    icon: <CgProfile size={20}/>,
    url: "/profile",
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

export default sidebarItems;

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
