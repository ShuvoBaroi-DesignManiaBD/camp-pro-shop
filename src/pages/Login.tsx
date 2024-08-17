import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
// import Logo from "../Components/Shared/Logo";
// import { useAuth } from "../Hooks/useAuth";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
// import SocialLogin from "../Components/Shared/AuthElements/SocialLogin";
import { useForm } from "react-hook-form";
import FieldSet from "@/components/ui/form/FieldSet";
import Field from "@/components/ui/form/Field";
import Logo from "@/components/ui/Logo";
import { Button } from "antd";

const Login = () => {
  //   const { signInWithEmail, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  console.log(state);
  const navigate = useNavigate();
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (formData: any) => {
    console.log(formData);
    reset();
  };

  return (
    <main className="w-[100vw] h-[100vh] bg-[url('https://i.ibb.co/YdfcdG6/pattern.webp')] flex items-center justify-center mx-auto my-auto p-6">
      <div className="w-[480px] mt-7 bg-white border rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center text-text space-y-4">
            <Logo className="w-[120px] mx-auto"></Logo>
            <h1 className="block text-2xl mt-6 font-bold dark:text-white text-primary">
              Sign in
            </h1>
          </div>
          <div className="mt-5">
            {/* <SocialLogin url={state}></SocialLogin> */}
            <div className="flex justify-center gap-x-5 my-4">
              <FcGoogle size={48} className="border rounded py-3 w-20" />
              <BsFacebook
                size={48}
                className="w-20 border text-white bg-blue-600 rounded p-3"
              />
            </div>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="grid gap-y-1">
                {/* ======== Email =========== */}
                <FieldSet>
                  <Field label="Email" error={errors.email}>
                    <input
                      {...register("email", {
                        required: "Email is required.",
                      })}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email"
                      className={`py-3 px-4 block w-full border-2 ${
                        errors?.email
                          ? "outline-red-500 border-red-300"
                          : "border-gray-200"
                      } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                      aria-describedby="email-error"
                    />
                  </Field>
                </FieldSet>
                {/* ======== Email =========== */}

                {/* ======== Password ======== */}
                <FieldSet>
                  <Field label="Password" error={errors.password}>
                    <div className="w-full relative">
                      {showPassword ? (
                        <FiEye
                          className="absolute bottom-4 right-3"
                          onClick={togglePass}
                        ></FiEye>
                      ) : (
                        <FiEyeOff
                          className="absolute bottom-4 right-3"
                          onClick={togglePass}
                        ></FiEyeOff>
                      )}
                      <input
                        {...register("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 8,
                            message:
                              "Your password must be at least 8 characters.",
                          },
                        })}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Your password"
                        className={`py-3 px-4 block w-full border-2 ${
                          errors?.password
                            ? "outline-red-500 border-red-300"
                            : "border-gray-200"
                        } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                        aria-describedby="email-error"
                      />
                    </div>
                  </Field>
                </FieldSet>
                {/* ======== Password ======== */}

                {/* End Form Group */}

                <button
                  type="submit"
                  className="w-full primaryButton mt-4 font-semibold"
                >
                  Sign in
                </button>
                <div className="flex justify-between items-end textSm font-medium">
                  <div className="mt-2 text-text flex gap-2 space-x-1 justify-center items-center dark:text-gray-400">
                    <p>Not a memeber?</p>
                    <Link
                      className="text-secondary font-semibold decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      to="/register"
                    >
                      Sign up
                    </Link>
                  </div>
                  <NavLink
                    className="text-secondary decoration-2 hover:underline font-semibold dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    to="/forget-password"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
