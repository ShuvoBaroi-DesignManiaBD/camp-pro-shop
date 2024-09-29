import { BsCashCoin } from "react-icons/bs"; 
import { BsCash } from "react-icons/bs"; 
import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Empty, Radio, Typography } from "antd";
import Field from "@/components/ui/form/Field";
import FieldSet from "@/components/ui/form/FieldSet";
import { useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
  selectCartItems,
  selectCurrentDeliveryCharge,
  selectCurrentTax,
  selectFinalTotalPrice,
  selectNumberOfProducts,
  selectOriginalTotalPrice,
} from "@/redux/features/cart/cartSlice";
// import { selectShowHideCartDrawer } from "@/redux/features/ui/drawerShowHideSlice";
import { CartItem } from "@/types/cart.type";
import { useDispatch } from "react-redux";
import CustomContainer from "@/components/layouts/CustomContainer";
import Select from "react-select";
import countryList from "react-select-country-list";
import FormSubmitBtn from "@/components/ui/form/FormSubmitBtn";
import {
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import Paypal from "@/components/ui/icons/Paypal";
import Visa from "@/components/ui/icons/Visa";
import MasterCard from "@/components/ui/icons/MasterCard";
import Bkash from "@/components/ui/icons/Bkash";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [createOrder, { data, status }]: any = useCreateOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "onTouched" });
  const dispatch = useDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalOriginalPrice = useAppSelector(selectOriginalTotalPrice);
  const totalFinalPrice = useAppSelector(selectFinalTotalPrice);
  const numberOfProducts = useAppSelector(selectNumberOfProducts);
  const currentUser = useAppSelector(selectCurrentUser);
  const deliveryCost = useAppSelector(selectCurrentDeliveryCharge);
  const tax = useAppSelector(selectCurrentTax);
  const countries = countryList().getData(); // Get the country list data

  const handleCountryChange = (selectedOption: any) => {
    // console.log(selectedOption);

    setValue("country", selectedOption); // Set the country value in the form
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseItemQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseItemQuantity(id));
  };

  // console.log(currentUser);
  const onSubmit = async (formData: any) => {
    let order: any = {
      userId: currentUser?._id,
      email: currentUser?.email,
      quantity: numberOfProducts,
      totalPrice: totalFinalPrice,
      gateWay: paymentMethod,
      currency: "USD",
    };
    console.log(order);

    if (cartItems.length !== 0) {
      let products: any[] = [];
      cartItems.map((item) =>
        products.push({
          id: item._id,
          quantity: item.quantity,
          totalPrice: item.total,
        })
      );
      console.log(products);

      order.products = products;
      order.address = {
        country: formData?.country?.label,
        city: formData?.city,
        street: formData?.streetAddress,
        zip: formData?.zip,
      };
    }

    if (!order.products || order.products.length === 0) {
      return toast.error("Please select at least a product!");
    }
    const redirectUrl = await createOrder(order)?.unwrap();
    redirectUrl?.length > 0 && dispatch(clearCart());
    console.log(data && data, order, window.location.href, redirectUrl);
    window.location.href = redirectUrl !== "undefined" && redirectUrl?.data;
    reset();
  };

  const handlePaymentChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  // useEffect(() => {
  //   // Extract the number from the span element's text
  //   const taxValue = taxRef.current ? Number(taxRef.current.innerText) : 0;
  //   setTotal(Number(Number(totalPrice + taxValue + deliveryCost).toFixed(2)));
  // }, [totalPrice, deliveryCost]);

  if (cartItems.length === 0) {
    return (
      <CustomContainer className="text-center flex items-center justify-center">
        <Empty
          className="flex flex-col gap-5 justify-between mx-auto [&&_svg]:size-[200px] [&&_.ant-empty-image]:h-auto"
          description={
            <Typography.Title level={4} type="secondary">
              Cart is empty! Please add a product.
            </Typography.Title>
          }
        />
      </CustomContainer>
    );
  }

  return (
    <CustomContainer className="!py-4">
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 items-start md:gap-6 md:grid-cols-5"
        >
          {/* Left Column */}
          <div className="col-span-3 flex flex-col gap-6 bg-white p-6 rounded-lg">
            <section className="mb-8 grid grid-cols-2 gap-x-4">
              <h2 className="text-xl font-bold mb-4 !col-span-full">
                Shipping Address
              </h2>

              {/* Country Field */}
              <FieldSet>
                <Field label="Country" error={errors.country}>
                  <>
                    <Select
                      options={countries}
                      {...register("country", {
                        required: "Country is required",
                      })}
                      name="country"
                      id="country"
                      onChange={handleCountryChange}
                      classNamePrefix="react-select"
                      placeholder="Select your country"
                      aria-describedby="country-error"
                      className="w-full py-2 [&>.react-select__control]:py-2"
                    />
                    {/* <input
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    hidden
                  /> */}
                  </>
                </Field>
              </FieldSet>

              {/* City Field */}
              <FieldSet>
                <Field label="City" error={errors.city}>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    className={`py-3 px-4 block w-full border-2 ${
                      errors?.city
                        ? "outline-red-500 border-red-300"
                        : "border-gray-200"
                    } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                    aria-describedby="city-error"
                  />
                </Field>
              </FieldSet>

              {/* Street Address Field */}
              <FieldSet>
                <Field label="Street Address" error={errors.streetAddress}>
                  <input
                    {...register("streetAddress", {
                      required: "Street Address is required",
                    })}
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Street Address"
                    className={`py-3 px-4 block w-full border-2 ${
                      errors?.streetAddress
                        ? "outline-red-500 border-red-300"
                        : "border-gray-200"
                    } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                    aria-describedby="streetAddress-error"
                  />
                </Field>
              </FieldSet>

              {/* Zip Code Field */}
              <FieldSet>
                <Field label="Zip Code" error={errors.zip}>
                  <input
                    {...register("zip", { required: "Zip Code is required" })}
                    type="text"
                    id="zip"
                    name="zip"
                    placeholder="Zip Code"
                    className={`py-3 px-4 block w-full border-2 ${
                      errors?.zip
                        ? "outline-red-500 border-red-300"
                        : "border-gray-200"
                    } focus:outline-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`}
                    aria-describedby="zip-error"
                  />
                </Field>
              </FieldSet>
            </section>

            {/* Order Note Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">Order Note</h2>
              <textarea
                {...register("orderNote")}
                name="orderNote"
                placeholder="Add a note to your order"
                rows={4}
                className="w-full p-2 border rounded-md"
              />
            </section>
          </div>

          {/* Right Column */}
          <div className="col-span-full md:col-span-2 flex flex-col gap-8 mt-6">
            <section className="w-full bg-white shadow-sm p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Your Order</h2>
              {/* Display order summary here, e.g., items, total price, etc. */}
              <div className="p-4 rounded-lg max-h-[30vh] overflow-y-auto">
                {cartItems?.map((item: CartItem) => (
                  <div
                    key={item._id}
                    className="mb-4 &:not(:last-child)]:border-b border-sky-500"
                  >
                    <div className="flex flex-col justify-between items-start gap-2.5">
                      <div className="flex gap-2">
                        <img
                          src={item?.images[0]?.url as any}
                          alt={item?.images[0]?.alt}
                          className="size-10"
                        />
                        <div className="flex-grow space-y-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total: ${item.total.toFixed(2)}
                          </div>
                          <div className="flex items-center">
                            <Button
                              onClick={() => handleDecreaseQuantity(item._id)}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item?.quantity}</span>
                            <Button
                              onClick={() => handleIncreaseQuantity(item._id)}
                            >
                              +
                            </Button>
                            <Button
                              danger
                              onClick={() => handleRemoveItem(item._id)}
                              className="ml-2"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {totalOriginalPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Delivery charge
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${deliveryCost}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $<span>{tax}</span>
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${totalFinalPrice}
                    </dd>
                  </dl>
                </div>
              </div>
            </section>

            <section className="bg-white shadow-sm p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div className="mb-4">
                <FieldSet>
                  <Field error={errors?.paymentMethod}>
                    <div className="flex flex-col gap-4">
                      <Radio
                        value="paypal"
                        onChange={handlePaymentChange}
                        checked={paymentMethod === "paypal" ? true : false}
                        className={`${
                          paymentMethod === "paypal" ? "bg-primaryLight/40" : ""
                        } p-3 border rounded-lg`}
                      >
                        <div className="text-sm flex gap-4 ml-2 items-center">
                          <div className="flex flex-col gap-1.5 ml-2">
                            <span className="text-base font-semibold">
                              Paypal
                            </span>
                            <span>
                              You will be redirected to PayPal website to
                              complete your purchase securely.
                            </span>
                          </div>
                          <Paypal size="40px"></Paypal>
                        </div>
                      </Radio>

                      <Radio
                        value="sslcommerz"
                        onChange={handlePaymentChange}
                        checked={paymentMethod === "sslcommerz" ? true : false}
                        className={`${
                          paymentMethod === "sslcommerz"
                            ? "bg-primaryLight/40"
                            : ""
                        } p-3 border rounded-lg`}
                      >
                        <div className="flex flex-row gap-2">
                          <div className="text-[12px] flex flex-col gap-1 ml-2">
                            <span className="text-base font-semibold line-clamp-1">
                              Credit/Debit Card/Mobile-NetBanking
                            </span>
                            <span
                              className={`${
                                paymentMethod === "sslcommerz"
                                  ? ""
                                  : "line-clamp-1"
                              }`}
                            >
                              Supports{" "}
                              <strong>
                                credit/debit/Mobile-NetBanking/Bkash/Rocket
                              </strong>{" "}
                              etc. Hosted & Powered by{" "}
                              <strong>SSLCommerz</strong>
                            </span>
                          </div>
                          <div className="w-1/4 flex gap-1.5 items-center">
                            <Visa size="18px"></Visa>
                            <MasterCard></MasterCard>
                            <Bkash></Bkash>
                          </div>
                        </div>
                      </Radio>
                      <Radio
                        value="cash"
                        onChange={handlePaymentChange}
                        checked={paymentMethod === "cash" ? true : false}
                        className={`${
                          paymentMethod === "cash"
                            ? "bg-primaryLight/40"
                            : ""
                        } p-3 border rounded-lg`}
                      >
                        <div className="flex flex-row gap-8 justify-between items-center">
                          <div className="text-[12px] flex flex-col gap-1 ml-2">
                            <span className="text-base font-semibold line-clamp-1">
                              Cash on delivery
                            </span>
                            <span
                              className={`${
                                paymentMethod === "sslcommerz"
                                  ? ""
                                  : "line-clamp-1"
                              }`}
                            >
                              You can pay by{" "}
                              <strong>
                                Cash
                              </strong>{" "}
                              at the time of receiving the product{" "}
                              {/* <strong>SSLCommerz</strong> */}
                            </span>
                          </div>
                          <div className="flex gap-1.5 items-center">
                            <BsCashCoin size={24}/>
                          </div>
                        </div>
                      </Radio>

                      {/* <input
                      {...register("paymentMethod", {
                        required: "Please select a payment method",
                      })}
                      type="text"
                    /> */}
                    </div>
                  </Field>
                </FieldSet>
              </div>
            </section>

            <FormSubmitBtn
              text="Place order"
              isLoading={status === "pending" ? true : false}
              className="align-middle text-lg !mt-0"
            />
          </div>
        </form>
      </div>
    </CustomContainer>
    // <CustomContainer>
    // </CustomContainer>
  );
};

export default CheckoutPage;
