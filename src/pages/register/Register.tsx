import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import FieldSet from "@/components/ui/form/FieldSet";
import Field from "@/components/ui/form/Field";
import Logo from "@/components/ui/Logo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./register.css";
import toast from "react-hot-toast";
import { TUser } from "@/types";
import FormSubmitBtn from "@/components/ui/form/FormSubmitBtn";
import { useRegisterCustomerMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerCustomer, { data, status }]: any =
    useRegisterCustomerMutation();

  const currentUser = useAppSelector(selectCurrentUser);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TUser>({ mode: "onTouched" });
  const navigate = useNavigate();
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (formData: TUser) => {
    try {
      console.log(formData);
      const user: Partial<TUser> = {}; // Using Partial to allow gradual construction of the object

      // Copying the form data
      user.name = formData.name;
      user.email = formData.email;
      user.phone = formData.phone;
      user.password = formData.password;
      user.address =
        {
          street: formData.address?.street,
          city: formData.address?.city,
          state: formData.address?.state,
          zipCode: formData.address?.zipCode,
        } || {};
      user.isDeleted = false;

      // Make the API call
      const result = await registerCustomer(user as any).unwrap();
      if (result!) {
        toast.success("Registration successful!");
        reset(); // Reset the form on successful submission
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error: any) {
      console.error(error);
      if (
        error?.data?.message.includes("email") &&
        error?.data?.message.includes("duplicate")
      )
        toast.error("An user with this email already exists!");
    }
  };

  // Watch the password field to compare with confirmPassword
  const password = watch("password");
  const handlePhoneChange = (value: string) => {
    setValue("phone", value); // Set the phone number value in the form
  };

  if (currentUser) {
    return Navigate({ to: "/" });
  } else {
    return (
      <main className="w-[100vw] h-[100vh] bg-[length:48vw] bg-no-repeat bg-right-bottom bg-[url('https://i.ibb.co/BZwTPQs/full-shot-man-playing-guitar-23-2149517904.webp')] flex items-center justify-start mx-auto my-auto p-6">
        <div className="container mx-auto">
          <div className="h-full mt-7 w-[38vw] rounded-xl dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center text-text space-y-4">
                <Logo className="w-[120px] mx-auto"></Logo>
                <h1 className="block text-2xl mt-6 font-bold dark:text-white text-primary">
                  Sign up
                </h1>
              </div>
              <div className="mt-5">
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
                  <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-2">
                    {/* ======== Name =========== */}
                    <FieldSet>
                      <Field label="Full Name" error={errors.name}>
                        <input
                          {...register("name", {
                            required: "Name is required.",
                          })}
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          className={`py-3 px-4 block w-full border-2 ${
                            errors?.name
                              ? "outline-red-500 border-red-300"
                              : "border-gray-200"
                          } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                          aria-describedby="name-error"
                        />
                      </Field>
                    </FieldSet>
                    {/* ======== Name =========== */}

                    {/* ======== Email =========== */}
                    <FieldSet>
                      <Field label="Email" error={errors.email}>
                        <input
                          {...register("email", {
                            required: "Email is required.",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Please enter a valid email address.",
                            },
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

                    {/* ======== Phone =========== */}

                    <FieldSet>
                      <Field label="Phone" error={errors.phone}>
                        <PhoneInput
                          {...register("phone", {
                            required: "Phone number is required.",
                            // pattern: {
                            //   value: /^[0-9]{10}$/,
                            //   message: "Please enter a valid phone number.",
                            // },
                          })}
                          value={watch("phone")}
                          placeholder="Your phone number"
                          country={"bd"}
                          enableSearch={true}
                          onChange={handlePhoneChange} // Update the form value on change
                          className={`flex justify-between items-center py-1 w-full border-2 ${
                            errors?.phone
                              ? "outline-red-500 border-red-300"
                              : "border-gray-200"
                          } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                          aria-describedby="phone-error"
                        />
                      </Field>
                    </FieldSet>
                    {/* ======== Phone =========== */}

                    {/* ======== Address =========== */}
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(23%,_1fr))] gap-2 w-full col-span-full">
                      <FieldSet>
                        <Field label="Street" error={errors.address?.street}>
                          <input
                            {...register("address.street", {
                              required: "Street address is required.",
                            })}
                            type="text"
                            id="address.street"
                            name="address.street"
                            placeholder="Your street address"
                            className={`py-3 px-4 block w-full border-2 ${
                              errors.address?.street
                                ? "outline-red-500 border-red-300"
                                : "border-gray-200"
                            } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                            aria-describedby="street-error"
                          />
                        </Field>
                      </FieldSet>
                      <FieldSet>
                        <Field label="City" error={errors.address?.city}>
                          <input
                            {...register("address.city", {
                              required: "City is required.",
                            })}
                            type="text"
                            id="address.city"
                            name="address.city"
                            placeholder="Your city"
                            className={`py-3 px-4 block w-full border-2 ${
                              errors.address?.city
                                ? "outline-red-500 border-red-300"
                                : "border-gray-200"
                            } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                            aria-describedby="city-error"
                          />
                        </Field>
                      </FieldSet>
                      <FieldSet>
                        <Field label="State" error={errors.address?.state}>
                          <input
                            {...register("address.state", {
                              required: "State is required.",
                            })}
                            type="text"
                            id="address.state"
                            name="address.state"
                            placeholder="Your state"
                            className={`py-3 px-4 block w-full border-2 ${
                              errors.address?.state
                                ? "outline-red-500 border-red-300"
                                : "border-gray-200"
                            } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                            aria-describedby="state-error"
                          />
                        </Field>
                      </FieldSet>
                      <FieldSet>
                        <Field label="Zip Code" error={errors.address?.zipCode}>
                          <input
                            {...register("address.zipCode", {
                              required: "Zip Code is required.",
                              pattern: {
                                value: /^[0-9]{5}$/,
                                message: "Please enter a valid zip code.",
                              },
                            })}
                            type="text"
                            id="address.zipCode"
                            name="address.zipCode"
                            placeholder="Your zip code"
                            className={`py-3 px-4 block w-full border-2 ${
                              errors.address?.zipCode
                                ? "outline-red-500 border-red-300"
                                : "border-gray-200"
                            } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                            aria-describedby="zipCode-error"
                          />
                        </Field>
                      </FieldSet>
                    </div>
                    {/* ======== Address =========== */}

                    <div className="w-full col-span-full grid grid-cols-[repeat(auto-fit,_minmax(48%,_1fr))] gap-2">
                      {/* ======== Password =========== */}
                      <FieldSet>
                        <Field label="Password" error={errors.password}>
                          <div className="relative w-full">
                            <input
                              {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password must be at least 8 characters.",
                                },
                              })}
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="Your password"
                              className={`py-3 px-4 block !w-full border-2 ${
                                errors?.password
                                  ? "outline-red-500 border-red-300"
                                  : "border-gray-200"
                              } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                            `}
                              aria-describedby="password-error"
                            />
                            <div
                              onClick={togglePass}
                              className="cursor-pointer absolute top-3 end-3"
                            >
                              {showPassword ? (
                                <FiEyeOff size={20} />
                              ) : (
                                <FiEye size={20} />
                              )}
                            </div>
                          </div>
                        </Field>
                      </FieldSet>
                      {/* ======== Password =========== */}

                      {/* ======== Confirm Password =========== */}
                      <FieldSet>
                        <Field
                          label="Confirm Password"
                          error={
                            errors.confirmPassword && {
                              message:
                                password !== watch("confirmPassword")
                                  ? "Passwords do not match."
                                  : undefined,
                            }
                          }
                        >
                          <div className="relative w-full">
                            <input
                              {...register("confirmPassword", {
                                required: "Please confirm your password.",
                                validate: (value) =>
                                  value === password ||
                                  "Passwords do not match.",
                              })}
                              type={showPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="Your password"
                              className={`py-3 px-4 block !w-full border-2 ${
                                errors?.confirmPassword
                                  ? "outline-red-500 border-red-300"
                                  : "border-gray-200"
                              } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                            
                            `}
                              aria-describedby="confirmPassword-error"
                            />
                            <div
                              onClick={togglePass}
                              className="cursor-pointer absolute top-3 end-3"
                            >
                              {showPassword ? (
                                <FiEyeOff size={20} />
                              ) : (
                                <FiEye size={20} />
                              )}
                            </div>
                          </div>
                        </Field>
                      </FieldSet>
                      {/* ======== Confirm Password =========== */}
                    </div>
                  </div>
                  {/* End Grid */}
                  <FormSubmitBtn
                    text="Sign up"
                    isLoading={status === "pending" ? true : false}
                    className="align-middle"
                  />

                  <p className="mt-6 text-base font-medium text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      className="font-medium text-primary dark:text-primary-light"
                    >
                      Login
                    </NavLink>
                  </p>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
        </div>
        {/* <Toaster></Toaster> */}
        {/* <img src="https://i.ibb.co/BZwTPQs/full-shot-man-playing-guitar-23-2149517904.webp" alt="camp-pro-shop-signup" /> */}
      </main>
    );
  }
};

export default Register;
