import { Spin } from "antd";
const FormSubmitBtn = ({isLoading, icon, className='', text}:any) => {
  return (
    <button
      type="submit"
      className={`${
        isLoading && "disabled:opacity-20"
      } ${className} w-full py-3 px-4 mt-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-dark`}
      disabled={isLoading ? true : false}
    >
      {text}
      {isLoading && (
        <Spin
          indicator={
            icon
          }
          size="default"
        />
      )}
    </button>
  );
};

export default FormSubmitBtn;
