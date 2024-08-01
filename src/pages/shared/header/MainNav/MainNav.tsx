import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "./MainNavItems";

const MainNav = () => {
  return (
    <ul
      id="mainNav"
      className="flex justify-between items-center gap-8 textSemiLg hover:text-primary"
    >
      {MainNavItems.map((menu) => (
        <li className="hover:text-primary">
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
  );
};

export default MainNav;
