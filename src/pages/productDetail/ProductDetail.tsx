import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Ensure this is imported
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import CustomContainer from "@/components/layouts/CustomContainer";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import { Swiper as SwiperCore, Swiper as SwiperType } from "swiper/types";
import { ProductData } from "@/types";
import { useGetAProductQuery } from "@/redux/features/products/productApi";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Extracting the product ID from the URL params
  const { data, isLoading } = useGetAProductQuery(productId ? productId : ""); // Fetching product data using the product ID
  const productData: ProductData | undefined = data?.data; // Accessing the actual product data from the response

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null); // State to manage the thumbnail swiper
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Initial index is set to 0

  const images: string[] = productData?.images?.map((image) => image.url) || []; // Mapping product images to an array of URLs

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!productData) {
    return <p>Product not found.</p>;
  }

  const handleThumbnailClick = (index: number) => {
    if (thumbsSwiper) {
      // Loop back to the first thumbnail if the index is out of bounds
      setCurrentIndex(index);
      thumbsSwiper.slideTo(index);
    }
  };

  return (
    <CustomContainer className="py-8 w-full md:py-16 dark:bg-gray-900 antialiased">
      <div className="px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="container">
            <Swiper
              loop={true}
              spaceBetween={10}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
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

            {/* Thumbnail */}
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
                    {/* Black Overlay for Inactive Thumbnails */}
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
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {productData?.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {`$${productData?.price}`}
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  (5.0)
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  345 Reviews
                </a>
              </div>
            </div>
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to favorites
              </a>
              <a
                href="#"
                title=""
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 10h16M4 6h16M4 14h16M4 18h16"
                  />
                </svg>
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </CustomContainer>
  );
};

export default ProductDetail;
