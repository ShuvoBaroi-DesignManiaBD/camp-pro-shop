import { useState } from "react";
import Logo from "../Components/Shared/Logo";
import { useAuth } from "../Hooks/useAuth";
import { Link, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SocialLogin from "../Components/Shared/AuthElements/SocialLogin";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInWithEmail, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
} = useForm();
  console.log(state);
  const navigate = useNavigate();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await signInWithEmail(email, password)
  }
  const togglePass = () => {
    setShowPassword(!showPassword);
  }

  const submitForm = (formData:any) => {
    console.log(formData);
    const user = {email: 'x@example.com', password: '123456789'}

    const found = formData.email === user.email && formData.password === user.password;

    if (!found) {
        setError("root.random", {
            message: `User with email '${formData.email}' is not found`,
            type: "random"
        })
    }

  {
    if (user) {
      return state ? navigate(state || '/foods') :
        <div className="min-h-screen flex flex-col items-center justify-center gap-10">
          <p className='text-center text-2xl font-normal text-textColor col-span-4'>
            You are logged in already!
          </p>
          <NavLink to="/" className="primaryBtn py-1.5">Back to home</NavLink>
        </div>

    } else {
      return (
        <main className="w-[100vw] h-[100vh] bg-[#291e0b] flex items-center justify-center mx-auto my-auto p-6">
          <div className="w-[450px] mt-7 bg-[#131509] border rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center text-white">
                <Logo className='w-[180px] mx-auto'></Logo>
                <h1 className="block text-2xl mt-10 font-bold dark:text-white text-white">
                  Sign in
                </h1>
                <p className="mt-2 text-sm text-white dark:text-gray-400">
                  Don't have an account yet?
                  <Link
                    className="text-primary font-semibold decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    to="/register"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
              <div className="mt-5">
                <SocialLogin url={state}></SocialLogin>

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  Or
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="grid gap-y-4">
                    {/* Form Group */}
                    <div className="text-white">
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-2 focus:outline-primary border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required=""
                          aria-describedby="email-error"
                        />

                      </div>

                    </div>
                    {/* End Form Group */}
                    {/* Form Group */}
                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white text-white"
                        >
                          Password
                        </label>
                        <a
                          className="text-sm text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="../examples/html/recover-account.html"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        {showPassword ? <FiEye className="absolute bottom-3 right-3" onClick={togglePass}></FiEye> : <FiEyeOff className="absolute bottom-4 right-3" onClick={togglePass}></FiEyeOff>}
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          minLength="6"
                          id="password"
                          placeholder="Enter password"
                          className="py-3 px-4 block w-full border-2 focus:outline-primary border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required=""
                        />
                      </div>

                    </div>
                    {/* End Form Group */}
                    {/* Checkbox */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 focus:ring-primary-600 ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium text-white"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    {/* End Checkbox */}
                    <button
                      type="submit"
                      className="w-full primaryBtn font-semibold"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
        </main>

      );
    }
  }
};

export default Login;