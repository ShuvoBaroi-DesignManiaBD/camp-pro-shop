type className = {
    className: string
}

const Logo = ({className}: className) => {
  return (
    <img
      src="https://i.ibb.co/T4G3q9Z/camp-pro-shop-logo.webp"
      alt="logo"
      className={className}
    />
  );
};

export default Logo;
