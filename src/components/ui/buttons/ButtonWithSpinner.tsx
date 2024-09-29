import { CgSpinner } from "react-icons/cg";
import { NavLink } from "react-router-dom";
const ButtonWithSpinner = ({isLoading=false, className='', text, btnType=null, url}:any) => {
  return (
    <NavLink
      type={btnType === 'submit' ? 'submit':undefined}
      className={`${
        isLoading && "disabled:opacity-80"
      } ${className} cursor-pointer flex justify-center items-center gap-2 py-3 px-4 mt-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-dark`}
      disabled={isLoading ? true : false}
      to={url}
    >
      {text}
      {isLoading && (
        <CgSpinner className="animate-spin text-xl" />
      )}
      
    </NavLink>
  );
};

export default ButtonWithSpinner;