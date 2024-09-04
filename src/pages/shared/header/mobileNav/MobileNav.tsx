import { FaBars } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "../mainNav/MainNavItems";
import { useState } from "react";
import { Avatar, Button, Drawer } from "antd";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types";
import { CgMenuRight } from "react-icons/cg";

type isSidebarHide = {
  setIsSidebarHide?: CallableFunction;
  isSidebarHide?: boolean;
};

const MobileNav = ({ setIsSidebarHide, isSidebarHide }: isSidebarHide) => {
  console.log(setIsSidebarHide);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser: Partial<TUser | null> = useAppSelector(selectCurrentUser);

  const showLoading = () => {
    setOpen(true);
  };
  return (
    <div className="flex items-center gap-4">
      <Button className="p-0 border-0" onClick={showLoading}>
        <CgMenuRight size={24} />
      </Button>
      <span
        onClick={() => setIsSidebarHide && setIsSidebarHide(!isSidebarHide)}
      >
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            fontSize: "24px",
            verticalAlign: "middle",
            // width: "40px",
            // height: "40px",
          }}
          className="size-9 sm:size-12"
          // onClick={()=>setIsSidebarHide(!isSidebarHide)}
        >
          {currentUser?.photo || currentUser?.name?.trim()[0]}
        </Avatar>
      </span>
      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ul
          id="mainNav"
          className="flex justify-between items-center gap-8 textSemiLg hover:text-primary"
        >
          {MainNavItems.map((menu) => (
            <li key={UniqueIdGenerator()} className="hover:text-primary">
              <NavLink to={menu.url}>{menu.label}</NavLink>
            </li>
          ))}
          <div className="flex gap-4 ml-4">
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
    </div>
  );
};

export default MobileNav;
