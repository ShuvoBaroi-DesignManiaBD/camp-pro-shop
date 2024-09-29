import { AiOutlinePlus } from "react-icons/ai";
import { BsDash } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetAProductQuery } from "@/redux/features/product/productApi";
import {
  addItemToCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { Button, Rate } from "antd";
import CustomContainer from "@/components/layouts/CustomContainer";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Swiper as SwiperCore, Swiper as SwiperType } from "swiper/types";
import { ProductImage } from "@/types";
import ThemeConfig from "@/configs/ThemeConfig";
import { useAppSelector } from "@/redux/hooks";
import { setShowHideCartDrawer } from "@/redux/features/ui/cartDrawer/drawerShowHideSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ProductFeatures from "@/components/ui/lists/ProductFeatures";
import LoadingSpin from "@/components/ui/spinners/LoadingSpin";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isFetching } = useGetAProductQuery(productId || "");
  const { register, watch, setValue } = useForm({
    defaultValues: {
      amount: 1,
    },
  });
  const amount = watch("amount");
  useEffect(() => {
    if (amount < 1) {
      setValue("amount", 1);
    } else if (
      amount === productData?.stockQuantity ||
      amount > productData?.stockQuantity
    ) {
      setValue("amount", productData?.stockQuantity);
    }
  }, [amount, setValue]);

  const productData = data?.data;

  const increaseAmount = () => {
    if (amount < productData?.stockQuantity) {
      setValue("amount", amount + 1);
    }
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setValue("amount", amount - 1);
    }
  };
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images: string[] =
    productData?.images?.map((image: ProductImage) => image.url) || [];

  const dispatch = useDispatch();
  // const cartDrawerState = useAppSelector(selectShowHideCartDrawer);
  const cartItems = useAppSelector(selectCartItems);
  const handleAddToCart = () => {
    const cartQuantity =
      Number(
        cartItems.find((item) => item?._id === productData?._id)?.quantity
      ) || 0;
    const newCartQuantity = Number(amount);
    console.log(cartQuantity, amount);

    if (
      newCartQuantity > productData?.stockQuantity ||
      cartQuantity + newCartQuantity > productData?.stockQuantity
    ) {
      return toast.error(
        `"Sorry, only ${productData?.stockQuantity} items are available in stock."`
      );
    }
    if (productData) {
      const cartItem = { ...productData };
      cartItem.quantity = newCartQuantity;
      cartItem.totalPrice = newCartQuantity * cartItem.price;
      dispatch(addItemToCart(cartItem));
      // dispatch(calculateTotalAsync());
      dispatch(setShowHideCartDrawer());
    }
  };

  if (isLoading || isFetching) {
    return <LoadingSpin></LoadingSpin>;
  }

  if (!productData) {
    return <p>Product not found.</p>;
  }

  const handleThumbnailClick = (index: number) => {
    if (thumbsSwiper) {
      setCurrentIndex(index);
      thumbsSwiper.slideTo(index);
    }
  };

  return (
    <CustomContainer className="py-12 w-full md:py-16 dark:bg-gray-900 antialiased">
      <ThemeConfig>
        <div className="px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="container">
              <Swiper
                loop={true}
                spaceBetween={10}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-[65vh] bg-primaryLight/50 shadow-md w-full rounded-lg"
                onSlideChange={(swiper: SwiperType) =>
                  setCurrentIndex(swiper.activeIndex)
                }
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageMagnifier
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs mt-3 h-20 w-full rounded-lg"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button
                      className="relative flex h-full w-full items-center justify-center"
                      onClick={() => handleThumbnailClick(index)}
                    >
                      {currentIndex !== index && (
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                      )}
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="block h-full w-full object-cover"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-10 md:mt-6 sm:mt-8 lg:mt-0">
              <div className="border-b pb-6">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {productData.name}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    {`$${productData.price.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-4">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={productData?.ratings}
                    className="text-yellow-500"
                  />
                  <p className="text-sm font-medium leading-none text-secondary dark:text-white">
                    ({productData.ratings} Reviews)
                  </p>
                </div>
                <div className="mt-4 text-base text-gray-500 dark:text-gray-300">
                  <span className="text-lg font-semibold">
                    Product Information:
                  </span>{" "}
                  {productData.description}
                </div>
              </div>
              <div className="mt-6 gap-6 flex justify-start sm:items-center">
                <div className="flex items-center space-x-4 bg-white border-2 text-lg h-full">
                  <Button
                    onClick={decreaseAmount}
                    className="p-0 text-2xl !border-r-2 border-0 rounded-none !hover:bg-secondary hover:border-r-0 h-11"
                  >
                    <BsDash className="p-1.5 hover:bg-secondary hover:text-white  w-full h-full" />
                  </Button>
                  <input
                    {...register("amount")}
                    defaultValue={amount}
                    min="1"
                    max={productData?.stockQuantity}
                    className="w-8 text-center font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                  />
                  <Button
                    onClick={increaseAmount}
                    className="h-11 p-0 !border-l-2 border-0 rounded-none hover:border-r-0"
                  >
                    <AiOutlinePlus className="p-2.5 hover:bg-secondary hover:text-white w-full h-full" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  type="primary"
                  className="text-lg py-5 px-6 space-x-2"
                >
                  <FaCartPlus />
                  Add to cart
                </Button>
              </div>
              <div className="mt-4 text-base space-y-2 text-gray-500 dark:text-gray-300">
                <p className="text-base font-semibold ">
                  Category:
                  <span className="text-secondary">
                    {" "}
                    {productData.category}
                  </span>
                </p>
                <p className="text-base font-semibold ">
                  Stock:
                  <span className="text-secondary">
                    {" "}
                    {productData.stockQuantity}
                  </span>
                </p>
              </div>
              <fieldset
                className="[&>span>svg]:size-12 text-base font-semibold flex justify-center items-center border flex-wrap text-center gap-3 &svg:w-20 my-6 py-4"
                data-color="default"
              >
                <legend>Guaranteed Safe Checkout</legend>
                <span className="ct-icon-container">
                  <svg
                    className="ct-icon"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  >
                    <path
                      fill="var(--theme-icon-color, #F2F0EB)"
                      d="M2.92,5.83h29.17c1.61,0,2.92,1.31,2.92,2.92v17.5c0,1.61-1.31,2.92-2.92,2.92H2.92C1.31,29.17,0,27.86,0,26.25V8.75C0,7.14,1.31,5.83,2.92,5.83z"
                    ></path>
                    <path
                      fill="var(--theme-icon-color-2, #E82128)"
                      d="M15.18,17.5c-0.01-1.89,0.85-3.68,2.33-4.85c-2.54-1.99-6.17-1.7-8.36,0.66s-2.19,6.02,0,8.39s5.83,2.65,8.36,0.66C16.02,21.18,15.17,19.39,15.18,17.5z"
                    ></path>
                    <path
                      fill="var(--theme-icon-color-2, #F49D20)"
                      d="M27.5,17.5c0,2.36-1.35,4.52-3.48,5.55c-2.13,1.04-4.66,0.76-6.52-0.7c2.68-2.11,3.14-5.99,1.04-8.67c0,0,0,0,0,0c-0.3-0.39-0.65-0.74-1.04-1.05c1.86-1.46,4.39-1.73,6.52-0.7S27.5,15.13,27.5,17.5z"
                    ></path>
                    <path
                      fill="var(--theme-icon-color-2, #F16223)"
                      d="M18.54,13.68c-0.3-0.39-0.65-0.74-1.04-1.05c-1.48,1.17-2.34,2.96-2.33,4.85c-0.01,1.89,0.85,3.68,2.33,4.85C20.18,20.24,20.65,16.36,18.54,13.68z"
                      stroke="var(--theme-icon-color, transparent)"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </span>
                <span className="ct-icon-container">
                  <svg
                    className="ct-icon"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  >
                    <path
                      fill="var(--theme-icon-color, #2A2C6B)"
                      d="M2.92 5.83h29.17c1.61 0 2.92 1.31 2.92 2.92v17.5c0 1.61-1.31 2.92-2.92 2.92H2.92C1.31 29.17 0 27.86 0 26.25V8.75c0-1.61 1.31-2.92 2.92-2.92z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="m17.4 14.14-1.46 6.74h-1.75l1.46-6.74h1.75zm7.33 4.37.92-2.53.53 2.53h-1.45zm1.95 2.4h1.62l-1.41-6.74h-1.46c-.32 0-.61.2-.73.5l-2.62 6.25h1.84l.36-1.01h2.19l.21 1zm-4.55-2.19c.01-1.82-2.44-1.95-2.44-2.68 0-.24.23-.5.73-.56.59-.06 1.18.04 1.72.3l.31-1.46c-.52-.2-1.08-.3-1.63-.3-1.72 0-2.92.92-2.92 2.23 0 .97.87 1.51 1.52 1.83.66.32.91.55.9.84 0 .45-.54.66-1.04.66-.62.01-1.23-.14-1.78-.44l-.31 1.46c.62.24 1.28.36 1.94.36 1.83 0 3.03-.9 3.04-2.3m-7.23-4.54-2.83 6.74h-1.9l-1.39-5.39a.707.707 0 0 0-.42-.59 7.55 7.55 0 0 0-1.72-.57l.04-.2h2.97c.4 0 .74.29.81.69l.73 3.9 1.82-4.59h1.89z"
                    ></path>
                  </svg>
                </span>
                <span className="ct-icon-container">
                  <svg
                    className="ct-icon"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  >
                    <path
                      fill="var(--theme-icon-color, #1F72CD)"
                      d="M2.92 5.83h29.17c1.61 0 2.92 1.31 2.92 2.92v17.5c0 1.61-1.31 2.92-2.92 2.92H2.92C1.31 29.17 0 27.86 0 26.25V8.75c0-1.61 1.31-2.92 2.92-2.92z"
                    ></path>
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      d="m6.5 13.9-3.2 7.2h3.8l.5-1.2h1.1l.5 1.2h4.2v-.9l.4.9H16l.4-.9v.9h8.7l1.1-1.1 1 1.1h4.5l-3.2-3.6 3.2-3.6h-4.4l-1 1.1-1-1.1h-9.5l-1 1.9-.8-1.9h-3.8v.9l-.5-.9H6.5zm13 1h5l1.5 1.7 1.6-1.7h1.5l-2.3 2.6 2.3 2.6h-1.6L26 18.4l-1.6 1.7h-4.9v-5.2zm1.2 2.1v-.9h3.1l1.4 1.5-1.4 1.4h-3.1v-1h2.7v-1.1h-2.7v.1zM7.2 14.9h1.9l2.1 4.9v-4.9h2l1.6 3.5 1.5-3.5h2v5.2h-1.2V16l-1.8 4.1h-1.1L12.4 16v4.1H9.9l-.5-1.2H6.8l-.5 1.2H5l2.2-5.2zm.1 3 .9-2.1.8 2.1H7.3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="ct-icon-container">
                  <svg
                    className="ct-icon"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  >
                    <path
                      fill="var(--theme-icon-color, #4D4D4D)"
                      d="M35 8.75v17.5c0 1.61-1.31 2.92-2.92 2.92H2.92c-.34 0-.67-.06-.99-.18A2.912 2.912 0 0 1 0 26.25V8.75c0-1.61 1.31-2.92 2.92-2.92h29.17c1.6 0 2.91 1.31 2.91 2.92z"
                    ></path>
                    <path
                      fill="var(--theme-icon-color-2, #FD6020)"
                      d="M35 17.5v8.72c0 1.63-1.3 2.94-2.91 2.94H2.99c-.34.01-.67-.04-.99-.16 2.44-.35 4.8-.8 7.12-1.3.61-.12 1.21-.26 1.8-.4 9.62-2.22 17.94-5.49 22.63-8.69.52-.37 1.01-.74 1.45-1.11zm-14.15-1.58c0-1.37-1.11-2.48-2.49-2.49a2.49 2.49 0 1 0 2.49 2.49z"
                    ></path>
                    <path
                      fill="var(--theme-icon-color, #FD6020)"
                      d="m11.19 28.76-.55.12c-.42.1-.86.2-1.3.28h-.15 22.9c1.61 0 2.92-1.31 2.92-2.92v-6.78c-.19.15-.41.29-.63.45-4.97 3.35-13.63 6.66-23.19 8.85z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M4.24 13.56v.03H2.92v4.64h1.33c.6.03 1.2-.15 1.68-.52.78-.65 1.05-1.74.67-2.68a2.374 2.374 0 0 0-2.36-1.47zm1.08 3.53c-.35.3-.8.45-1.25.41h-.23v-3.12h.23c.45-.05.9.09 1.25.38.33.3.52.72.51 1.17.01.44-.18.86-.51 1.16zm1.86-3.51h.91v4.68h-.91v-4.68zm4.49 3.26c.01.42-.16.83-.46 1.12-.31.29-.72.44-1.14.41-.68.04-1.32-.31-1.66-.89l.59-.57c.18.39.57.63.99.63.19.02.37-.05.51-.17s.22-.3.22-.49c0-.2-.11-.38-.28-.48-.2-.11-.42-.2-.63-.27-.85-.31-1.14-.63-1.14-1.28.01-.37.17-.73.44-.98.28-.25.64-.38 1.02-.36.51 0 1 .18 1.37.52l-.47.62a.948.948 0 0 0-.73-.38c-.39 0-.68.26-.68.52s.18.39.73.59c1.02.38 1.32.72 1.32 1.46zm2.79-3.37c.39 0 .78.1 1.12.29v1.07c-.29-.33-.71-.52-1.14-.52-.42.01-.81.18-1.1.48-.29.3-.44.71-.43 1.12-.02.43.13.85.43 1.15s.71.48 1.14.47c.42 0 .83-.19 1.1-.51v1.07c-.35.18-.75.27-1.14.27a2.427 2.427 0 0 1-2.47-2.44c0-.66.27-1.28.74-1.74.46-.46 1.09-.71 1.75-.71zm9.62.11h.99l-2.03 4.8h-.49l-1.98-4.8h.99l1.25 3.14 1.27-3.14zm1.4 0h2.6v.79H26.4v1.04h1.62v.79H26.4v1.26h1.68v.79h-2.6v-4.67zm5.14 2.72c.65-.1 1.11-.69 1.06-1.34 0-.88-.6-1.37-1.66-1.37h-1.34v4.64h.92v-1.85h.1l1.27 1.85h1.11l-1.46-1.93zm-.72-.56h-.3v-1.41h.29c.55 0 .86.23.86.73.01.49-.31.68-.85.68z"
                    ></path>
                  </svg>
                </span>
              </fieldset>
              <ProductFeatures></ProductFeatures>
            </div>
          </div>
        </div>
      </ThemeConfig>
    </CustomContainer>
  );
};

export default ProductDetail;
