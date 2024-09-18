// MainNav.tsx
import { RxMagnifyingGlass } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MainNavItems from "./MainNavItems";
import UniqueIdGenerator from "@/utils/UniqueIdGenerator";
import { Badge } from "antd";
import NavigationItems from "./dropdownItems";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import UserSettingsDropdown from "@/components/ui/dropdown/UserSettingsDropdown";
import { selectNumberOfProducts } from "@/redux/features/cart/cartSlice";
import { setShowHideCartDrawer } from "@/redux/features/ui/drawerShowHideSlice";

const MainNav = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const numberOfProducts = useAppSelector(selectNumberOfProducts);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Call the function to get the array of navigation items
  const items = NavigationItems();

  // Modify the items as needed
  const updatedItems = items.map((item: any) => {
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
      className="flex justify-between items-center gap-8 textSemiLg"
    >
      {MainNavItems.map((menu) => (
        <li key={UniqueIdGenerator()} className="hover:text-primary">
          <NavLink to={menu.url}>{menu.label}</NavLink>
        </li>
      ))}

      <div className="flex gap-4 ml-4">
        <RxMagnifyingGlass size={24} />
        <MdOutlineFavoriteBorder size={22} />
        <Badge count={numberOfProducts}>
          <BiShoppingBag
            size={22}
            onClick={() => dispatch(setShowHideCartDrawer())}
            className="cursor-pointer"
          />
        </Badge>
      </div>
      {!currentUser ? (
        <NavLink className="primaryButton text-sm px-4" to="/login">
          Login / Register
        </NavLink>
      ) : (
        <li>
          <UserSettingsDropdown
            items={updatedItems}
            currentUser={currentUser}
          ></UserSettingsDropdown>
        </li>
      )}
    </ul>
  );
};

export default MainNav;
