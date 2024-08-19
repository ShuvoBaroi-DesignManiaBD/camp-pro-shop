import { NavLink } from "react-router-dom";

const dropdownItems = [
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
];

export default dropdownItems;
