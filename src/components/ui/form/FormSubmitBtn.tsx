
import { CgSpinner } from "react-icons/cg";
const FormSubmitBtn = ({isLoading, className='', text}:any) => {
  return (
    <button
      type="submit"
      className={`${
        isLoading && "disabled:opacity-80"
      } ${className} w-full flex justify-center items-center gap-2 py-3 px-4 mt-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-dark`}
      disabled={isLoading ? true : false}
    >
      {text}
      {isLoading && (
        <CgSpinner className="animate-spin text-xl" />
      )}
    </button>
  );
};

export default FormSubmitBtn;
