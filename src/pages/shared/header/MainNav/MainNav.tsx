import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "./MainNavItems";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { useState } from "react";
import items from "./dropdownItems";

// const items = [
//   {
//     key: "1",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.antgroup.com"
//       >
//         1st menu item
//       </a>
//     ),
//   },
//   {
//     key: "2",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.aliyun.com"
//       >
//         2nd menu item
//       </a>
//     ),
//   },
//   {
//     key: "3",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.luohanacademy.com"
//       >
//         3rd menu item
//       </a>
//     ),
//   },
// ];

const MainNav = () => {
  const UserList = ["U", "Lucy", "Tom", "Edward"];
  const [user, setUser] = useState(UserList[0]);

  return (
    <ul
      id="mainNav"
      className="flex justify-between items-center gap-8 textSemiLg hover:text-primary"
    >
      {MainNavItems.map((menu) => (
        <li key={UniqueIdGenerator()} className="hover:text-primary">
          <NavLink to={menu.url}>{menu.label}</NavLink>
        </li>
      ))}

      <li className="flex gap-4 ml-4">
        <RxMagnifyingGlass size={24} />
        <MdOutlineFavoriteBorder size={22} />
        <BiShoppingBag size={22} />
      </li>

      <li>
        <Dropdown
          menu={{items}}
          overlayClassName="w-[160px]"
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              fontSize: "24px",
              verticalAlign: "middle",
              width: "48px",
              height: "48px",
            }}
          >
            {user}
          </Avatar>
        </Dropdown>
      </li>
    </ul>
  );
};

export default MainNav;
