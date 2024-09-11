// NavigationItems.tsx
import React from "react";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";

const NavigationItems = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Return the array of navigation items
  return [
    {
      key: 1,
      label: (
        <NavLink rel="dshboard" to={`${currentUser?.role}/dashboard`}>
          Dashboard
        </NavLink>
      ),
    },
    {
      key: 2,
      label: (
        <NavLink rel="profile" to={`${currentUser?.role}/profile`}>
          Profile
        </NavLink>
      ),
    },
    {
      key: 3,
      label: (
        <NavLink rel="orders" to={`${currentUser?.role}/orders`}>
          Orders
        </NavLink>
      ),
    },
    {
      key: 4,
      label: (
        <a rel="logout" onClick={handleLogout}>
          Logout
        </a>
      ),
    },
  ];
};

export default NavigationItems;
