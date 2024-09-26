import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "../mainNav/MainNavItems";
import { useState } from "react";
import { Avatar, Button, Drawer } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types";
import { CgMenuRight } from "react-icons/cg";
import { selectUserMenuDrawer, setShowUserMenuDrawer } from "@/redux/features/ui/userMenuDrawer/userMenuDrawerSlice";
import { useDispatch } from "react-redux";
import MobileUserDropdown from "./MobileUserDropdown";
import { CloseOutlined } from "@ant-design/icons";
import Logo from "@/components/ui/Logo";
import { selectDeviceType } from "@/redux/features/ui/deviceType/deviceTypeSlice";

type TSidebarHide = {
  setIsSidebarHide?: CallableFunction | undefined;
  isSidebarHide?: boolean;
};

const MobileNav = ({ setIsSidebarHide, isSidebarHide }: TSidebarHide) => {
  const dispatch = useDispatch();
  const currentUser: Partial<TUser | null> = useAppSelector(selectCurrentUser);
  const userMenuDrawer: boolean = useAppSelector(selectUserMenuDrawer);
  const isDesktop = useAppSelector(selectDeviceType);
  
  const toggleDrawer = () => {
    setIsSidebarHide(!isSidebarHide);
  };

  return (
    <div className="flex items-center gap-4">
      <Button className="p-0 border-0" onClick={toggleDrawer}>
        <CgMenuRight size={24} />
      </Button>
      {currentUser ? <span onClick={() => dispatch(setShowUserMenuDrawer())}>
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            fontSize: "26px",
            verticalAlign: "middle",
          }}
          className="size-9 sm:size-12"
          src={currentUser?.photo?.replace("https:/", "https://") || undefined}
          alt={`Profile photo of ${currentUser?.name || "User"}`}
        >
          {!currentUser?.photo && currentUser?.name?.trim()[0]}
        </Avatar>
      </span>: <NavLink className='primaryButtonSm px-3 py-1.5' to="/login">Login</NavLink>}
       <Drawer
        closable={false} // Disable default close button
        width="100vw" // Full width for mobile
        destroyOnClose
        title={
          <div className="flex justify-between items-center">
            <div className="max-w-content flex gap-2 justify-start items-center text-xl">
            <Logo className="min-h-10 min-w-10 max-w-10" />
            <p
              className={`font-bold text-primary transition-opacity duration-300"
              }`}
            >
              CampProShop
            </p>
          </div>
            <Button
              type="text"
              icon={<CloseOutlined style={{ fontSize: "20px" }} />}
              onClick={toggleDrawer}
              style={{ marginRight: 0 }} // Adjust to place it at the edge
            />
          </div>
        }
        placement="right"
        open={isSidebarHide}
        onClose={toggleDrawer}
        className="z-50"
        bodyStyle={{ padding: "0" }} // Remove extra padding inside the drawer
        headerStyle={{ padding: "0.5rem 1rem" }} // Adjust header padding
        contentWrapperStyle={{
          width: "100vw", // Ensure the Drawer covers the full width
          maxWidth: "100vw", // Override internal maxWidth limits
          position: "absolute", // Use absolute positioning to cover the screen
          left: 0, // Ensure alignment to the left
        }}
      >
        <ul id="mainNav" className="flex pt-20 flex-col justify-start items-center gap-5 p-4 text-lg">
          {MainNavItems.map((menu) => (
            <li key={menu.url} className="hover:text-primary">
              <NavLink to={menu.url}>{menu.label}</NavLink>
            </li>
          ))}
          <div className="flex gap-4 mt-4">
            <li>
              <RxMagnifyingGlass size={24} />
            </li>
            <li>
              <MdOutlineFavoriteBorder size={22} />
            </li>
            <li>
              <BiShoppingBag size={22} />
            </li>
          </div>
        </ul>
      </Drawer>
      {!isDesktop && userMenuDrawer && <MobileUserDropdown />}
    </div>
  );
};

export default MobileNav;
