import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { NavLink } from "react-router-dom";

  const items = [
    {
      key: 1,
      label: (
        <NavLink rel="dshboard" to="dashboard">
          Dashboard
        </NavLink>
      ),
    },
    {
      key: 2,
      label: (
        <NavLink rel="profile" to="profile">
          Profile
        </NavLink>
      ),
    },
    {
      key: 3,
      label: (
        <NavLink rel="orders" to="orders">
          Orders
        </NavLink>
      ),
    },
    {
      key: 4,
      label: (
        <a rel="logout" >
          Logout
        </a>
      ),
    }
  ];

export default items;

