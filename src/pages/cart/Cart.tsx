import CartCard from "@/components/ui/cards/CartCard";
import ProductCard from "@/components/ui/cards/ProductCard";
import {
  selectCartItems,
  selectTotalAmount,
} from "@/redux/features/cart/cartSlice";
import { selectCurrentProducts } from "@/redux/features/product/productSlice";
import { useFilterProductsQuery } from "@/redux/features/productFilters/productFiltersApi";
import {
  selectPage,
  selectPageSize,
} from "@/redux/features/productFilters/productFiltersSlice";
import { useAppSelector } from "@/redux/hooks";
import { Card, Empty, Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const currentPage = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  // const products = useAppSelector(selectCurrentProducts);
  const cartItems = useAppSelector(selectCartItems);
  const originalPrice = useAppSelector(selectTotalAmount);
  const deliveryCost = 5;
  let taxRef = useRef<HTMLSpanElement>(null);
  console.log(originalPrice, taxRef.current);

  const { data, isLoading, isFetching, error, refetch } =
    useFilterProductsQuery({
      queries: null,
      page: currentPage,
      limit: 3,
    });
    const products = data?.data;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Extract the number from the span element's text
    const taxValue = taxRef.current ? Number(taxRef.current.innerText) : 0;
    setTotal(Number(Number(originalPrice + taxValue + deliveryCost).toFixed(2)));
  }, [originalPrice]);
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6 h-[50vh] overflow-y-scroll pr-4 scroll-smooth resize-y">
              {cartItems?.map((item) => (
                <CartCard key={item?._id} product={item}></CartCard>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 items-start mt-10">
              <h3 className="text-2xl font-bold">People also bought</h3>
              <div className="mb-4 grid justify-center gap-4 grid-cols-[repeat(autofit,_minmax(280px,_1fr))] sm:grid-cols-[repeat(3,_minmax(280px,_1fr))] sm:col-span-3 md:mb-8">
                {isLoading || isFetching ? (
                  [...Array(pageSize)].map((_, index) => (
                    <Card
                      key={index}
                      style={{ width: "100%" }}
                      cover={
                        <Skeleton.Image active={true} className="!w-full" />
                      }
                    >
                      <Skeleton active className="col-span-4" />
                    </Card>
                  ))
                ) : products.length === 0 ? (
                  <div className="h-[60vh] flex items-center justify-center col-span-full">
                    <Empty
                      imageStyle={{ width: "240px", height: "200px" }}
                      className=""
                    />
                  </div>
                ) : (
                  products?.map((product) => (
                    <ProductCard
                      key={product?._id}
                      product={product}
                      className=""
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {originalPrice.toFixed(2)}
                    </dd>
                  </dl>
                  {/* <div className="flex flex-nowrap items-center justify-between gap-4">
                    <p className="w-[75%] text-base font-normal text-gray-500 dark:text-gray-400">
                      Delivery charge
                    </p>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $799
                    </dd>
                  </div> */}
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
                      $<span ref={taxRef as any}>{Number(((originalPrice / 100) * 5).toFixed(2))}</span>
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${total}
                  </dd>
                </dl>
              </div>
              <NavLink
                to="/checkout"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium primaryButton text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Checkout
              </NavLink>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {" "}
                  or{" "}
                </span>
                <NavLink
                  to="/products"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline hover:text-secondary dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Do you have a voucher or gift card?{" "}
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="primaryButton flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Apply Code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
