import { FaBars } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "../mainNav/MainNavItems";
import { useState } from "react";
import { Button, Drawer } from "antd";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";

const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
  };
  return (
    <>
      <Button className="p-0 border-0" onClick={showLoading}>
        <FaBars className="hover:text-secondary text-primary" size={24} />
      </Button>
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
    </>
  );
};

export default MobileNav;
