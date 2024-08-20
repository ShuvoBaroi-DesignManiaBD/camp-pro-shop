import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "./MainNavItems";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import { Avatar, Dropdown } from "antd";
import { useState } from "react";
import items from "./dropdownItems";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import UserSettingsDropdown from "@/components/ui/dropdown/UserSettingsDropdown";

const MainNav = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const updatedItems = items.map((item) => {
    if (item.key === 4) {
      return {
        ...item,
        label: (
          <a rel="logout" onClick={handleLogout}>
            Logout
          </a>
        ),
      };
    }
    return item;
  });

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
      {!currentUser ? (
        <NavLink className="primaryButton text-sm px-4" to="/login">
          Login / Register
        </NavLink>
      ) : (
        <li>
          <UserSettingsDropdown items={updatedItems} currentUser={currentUser}></UserSettingsDropdown>
        </li>
      )}
    </ul>
  );
};

export default MainNav;
