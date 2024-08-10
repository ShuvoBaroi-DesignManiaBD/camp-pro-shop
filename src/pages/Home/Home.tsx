import CarouselCTA from "@/components/ui/callToActions/CarouselCTA";
import { Carousel, ConfigProvider, Layout } from "antd";

const Home = () => {
  const style: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    // maxWidth: "1280px",
  };

  return (
    <Layout className="w-full">
      <ConfigProvider
  theme={{
    components: {
      Carousel: {
        arrowSize: 24,
        backgroundColor: "#364d79",
      },
    },
  }}
>
<Carousel arrows 
      className="custom-carousel" 
      infinite={false}
      adaptiveHeight={true}
      >
        <CarouselCTA
          className="bg-[url('https://i.ibb.co/Y2yVPN9/slide-camp-1.webp')] text-white text-center h-[70vh]"
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
          innerContentStyle="max-w-[55vw] mx-auto flex flex-col justify-center items-center gap-3"
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
          textStyle="mb-5"
          btnType="secondaryButton"
          btnText="Explore Collection"
          btnURL="shop"
          innerContentStyle="flex flex-col gap-2 justify-center items-start max-w-[55vw]"
        />
        <CarouselCTA
          className="bg-[url('https://i.ibb.co/g9yGXTR/slide-camp-3.webp')] h-[70vh] text-white bg-center"
          subHeading="Custom Solutions"
          subHeadingStyle="font-semibold uppercase"
          HeadingText="Tailored Campaign Elements for Every Need"
          headingStyle="primaryHeading uppercase leading-[120%]"
          text="Get personalized campaign elements that align with your brand and objectives. Our custom solutions ensure your campaign’s success from start to finish."
          textStyle="mb-5"
          btnType="secondaryButton"
          btnText="Get Started"
          btnURL="shop"
          innerContentStyle="flex flex-col gap-2 justify-center items-start max-w-[55vw]"
        />
      </Carousel>
      </ConfigProvider>
      
    </Layout>
  );
};

export default Home;
