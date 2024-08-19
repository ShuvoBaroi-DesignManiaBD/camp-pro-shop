import { CgArrowLongRight } from "react-icons/cg";
import { BiHorizontalRight } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import CarouselCTA from "@/components/ui/callToActions/CarouselCTA";
import ThemeConfig from "@/configs/ThemeConfig";
import { Button, Carousel, Layout } from "antd";
import ProductTopCategory from "./ProductTopCategory";
import SiteMeta from "@/components/seo/SiteMeta";

const Home = () => {

  return (
    <Layout className="w-full bg-[url('https://i.ibb.co/YdfcdG6/pattern.webp')] bg-center bg-repeat">
      <SiteMeta tagLine="Elevate Your Campaigns"></SiteMeta>
      <ThemeConfig>
        <Carousel
          arrows
          className="custom-carousel"
          infinite={false}
          adaptiveHeight={true}
        >
          <CarouselCTA
            className="bg-[url('https://i.ibb.co/Y2yVPN9/slide-camp-1.webp')] text-white text-center h-[70vh] bg-cover"
            subHeading="Elevate Your Campaigns"
            subHeadingStyle="font-semibold uppercase"
            HeadingText="Unleash the Power of "
            headingStyle="primaryHeading uppercase leading-[120%]"
            headingSecondaryColor="secondary"
            headingColoredText="Creative Design"
            text="Transform your ideas into reality with our premium campaign elements. From eye-catching visuals to compelling messaging, we have everything you need to make your campaign stand out."
            textStyle="text-white mb-5"
            btnType="secondaryButton"
            btnText="Shop Now"
            btnURL="shop"
            innerContentStyle="max-w-[700px] mx-auto flex flex-col justify-center items-center gap-3"
          />
          <CarouselCTA
            className="bg-[url('https://i.ibb.co/SwdZWht/slide-camp-2.webp')] h-[70vh] text-white bg-center"
            subHeading="Boost Engagement"
            subHeadingStyle="font-semibold uppercase"
            HeadingText="Captivating "
            headingStyle="primaryHeading uppercase leading-[120%]"
            headingColoredText="Campaign Essentials"
            headingSecondaryColor="secondary"
            text="Discover a wide range of products designed to grab attention and drive results. Whether it’s banners, posters, or digital assets, find the perfect tools to elevate your campaign."
            textStyle="mb-5 text-white"
            btnType="secondaryButton"
            btnText="Explore Collection"
            btnURL="shop"
            innerContentStyle="flex flex-col gap-2 justify-center items-start max-w-[700px]"
          />
          <CarouselCTA
            className="bg-[url('https://i.ibb.co/g9yGXTR/slide-camp-3.webp')] h-[70vh] text-white bg-center"
            subHeading="Custom Solutions"
            subHeadingStyle="font-semibold uppercase"
            HeadingText="Tailored Campaign Elements for Every Need"
            headingStyle="primaryHeading uppercase leading-[120%]"
            text="Get personalized campaign elements that align with your brand and objectives. Our custom solutions ensure your campaign’s success from start to finish."
            textStyle="mb-5 text-white"
            btnType="secondaryButton"
            btnText="Get Started"
            btnURL="shop"
            innerContentStyle="flex flex-col gap-2 justify-center items-start max-w-[700px]"
          />
        </Carousel>
        {/* ============== Product Categories ============= */}
        <Layout className="w-full p-8 grid grid-cols-4 gap-8">
          <ProductTopCategory
            bgImage="https://i.ibb.co/FswJxvC/camp-h52.webp"
            subHeadingText="Outdoor Adventure"
            headingText="Tents Collection"
            button={
              <Button
                type="primary"
                size="large"
                icon={<CgArrowLongRight />}
                iconPosition="end"
              >
                Shop Tents
              </Button>
            }
          />
          <ProductTopCategory
            bgImage="https://i.ibb.co/FYW9Gmh/camp-h53.webp"
            subHeadingText="Travel Ready"
            headingText="Bags Collection"
            button={
              <Button
                type="primary"
                size="large"
                icon={<CgArrowLongRight />}
                iconPosition="end"
              >
                Shop Bags
              </Button>
            }
          />
          <ProductTopCategory
            bgImage="https://i.ibb.co/x3Dp2SF/camp-h54.webp"
            subHeadingText="Step Forward"
            headingText="Boots Collection"
            button={
              <Button
                type="primary"
                size="large"
                icon={<CgArrowLongRight />}
                iconPosition="end"
              >
                Shop Boots
              </Button>
            }
          />
          <ProductTopCategory
            bgImage="https://i.ibb.co/RP9ZQwL/camp-h51.webp"
            subHeadingText="Gear Up"
            headingText="Equipments Collection"
            button={
              <Button
                type="primary"
                size="large"
                icon={<CgArrowLongRight />}
                iconPosition="end"
              >
                Shop Equipments
              </Button>
            }
          />
        </Layout>
      </ThemeConfig>
    </Layout>
  );
};

export default Home;
