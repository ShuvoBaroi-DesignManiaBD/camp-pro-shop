import { NavLink } from "react-router-dom";

type className = {
  className: string;
};

const Logo = ({ className }: className) => {
  return (
    <NavLink to="/">
      <img
        src="https://i.ibb.co/T4G3q9Z/camp-pro-shop-logo.webp"
        alt="logo"
        className={`${className}`}
      />
    </NavLink>
  );
};

export default Logo;
