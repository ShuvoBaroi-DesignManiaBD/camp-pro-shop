import { CgArrowLongRight } from "react-icons/cg";
import CarouselCTA from "@/components/ui/callToActions/CarouselCTA";
import ThemeConfig from "@/configs/ThemeConfig";
import { Button, Card, Carousel, Collapse, Layout } from "antd";
import ProductTopCategory from "./ProductTopCategory";
import SiteMeta from "@/components/seo/SiteMeta";
import { useFilterProductsQuery } from "@/redux/features/productFilters/productFiltersApi";
import ProductCard from "@/components/ui/cards/ProductCard";
import { TProduct } from "@/types";
import ButtonWithSpinner from "@/components/ui/buttons/ButtonWithSpinner";
import { Navigate, NavLink } from "react-router-dom";
import CustomContainer from "@/components/layouts/CustomContainer";
import { CaretRightOutlined } from "@ant-design/icons";
import { UserOutlined, LeftOutlined, RightOutlined, QuoteLeftOutlined  } from "@ant-design/icons";
import { FaQuoteLeft } from 'react-icons/fa'
const { Panel } = Collapse;

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all our products. If you're not satisfied, you can return the item within 30 days of purchase for a full refund.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You will receive a tracking number via email once your order has shipped. You can use it to track your order on our website or on the courier's website.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 100 countries worldwide. Shipping fees and delivery times will vary depending on your location.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "Absolutely! We offer customization options for certain products. Contact our support team to discuss your specific requirements.",
  },
  {
    question: "How do I make a bulk purchase?",
    answer:
      "For bulk purchases, please reach out to our sales team at sales@example.com to discuss pricing and availability.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for large orders. Please select your preferred payment method at checkout.",
  },
];

const testimonials = [
  {
    name: "John Doe",
    review:
      "The service was exceptional and the team went above and beyond to make sure I was satisfied.",
    avatar: <UserOutlined style={{ fontSize: "40px", color: "#1890ff" }} />,
  },
  {
    name: "Jane Smith",
    review:
      "Great quality and fantastic customer support. I highly recommend this company!",
    avatar: <UserOutlined style={{ fontSize: "40px", color: "#faad14" }} />,
  },
  {
    name: "Michael Johnson",
    review:
      "A truly professional team that delivers on their promises. I’m impressed with the results.",
    avatar: <UserOutlined style={{ fontSize: "40px", color: "#52c41a" }} />,
  },
  {
    name: "Sarah Brown",
    review:
      "The products exceeded my expectations and the delivery was quick and seamless.",
    avatar: <UserOutlined style={{ fontSize: "40px", color: "#f5222d" }} />,
  },
  {
    name: "Emma Wilson",
    review:
      "Their attention to detail and customer service is second to none. I would definitely work with them again.",
    avatar: <UserOutlined style={{ fontSize: "40px", color: "#722ed1" }} />,
  },
];

const customArrowStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: '#ba986a',
  padding: '12px',
  border: "5px solid #ba986a",
  borderRadius: "50px",
  textAlign: "center"
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <span
      className={className}
      style={{ ...style, ...customArrowStyle, right: "-30px", fontWeight: "700" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <span
      className={className}
      style={{ ...style, ...customArrowStyle, left: "-30px" }}
      onClick={onClick}
    />
  );
};

const Home = () => {
  const { data, isLoading, isFetching, refetch } = useFilterProductsQuery({
    queries: null,
    page: 1,
    limit: 4,
  });
  const { data: bestProducts, isFetching: status } = useFilterProductsQuery({
    queries: { rating: 5 },
    page: 1,
    limit: 4,
  });
  console.log(isFetching);

  return (
    <Layout className="w-full bg-[url('https://i.ibb.co/YdfcdG6/pattern.webp')] bg-center bg-repeat">
      <SiteMeta tagLine="Elevate Your Campaigns"></SiteMeta>
      <ThemeConfig>
        <Carousel
          arrows
          className="custom-carousel [&&_button.slick-arrow.slick-next]:text-primary"
          infinite={false}
          adaptiveHeight={true}
          style={{ color: "red" }}
        >
          {/* Slide 1 */}
          <CarouselCTA
            className="bg-[url('https://i.ibb.co.com/bH06B87/slcamp-3.webp')] pb-[100px] md:pb-[200px] text-white text-center h-[85vh] bg-cover bg-center"
            subHeading="Elevate Your Campaigns"
            subHeadingStyle="font-semibold uppercase"
            HeadingText="Unleash the Power of "
            headingStyle="primaryHeading text-2xl md:text-4xl uppercase leading-[120%]"
            headingSecondaryColor="secondary"
            headingColoredText="Creative Design"
            text="Transform your ideas into reality with our premium campaign elements. From eye-catching visuals to compelling messaging, we have everything you need to make your campaign stand out."
            textStyle="text-white mb-5 font-normal md:font-medium"
            btnType="secondaryButton"
            btnText="Shop Now"
            btnURL="products"
            innerContentStyle="max-w-[90vw] md:max-w-[40vw] mx-auto flex flex-col justify-center items-center gap-3"
          />
          {/* Slide 2 */}
          <CarouselCTA
            className="bg-[url('https://i.ibb.co/SwdZWht/slide-camp-2.webp')] h-[80vh] text-white bg-center"
            subHeading="Boost Engagement"
            subHeadingStyle="font-semibold uppercase"
            HeadingText="Captivating "
            headingStyle="primaryHeading text-3xl md:text-4xl uppercase leading-[120%]"
            headingColoredText="Campaign Essentials"
            headingSecondaryColor="secondary"
            text="Discover a wide range of products designed to grab attention and drive results. Whether it’s banners, posters, or digital assets, find the perfect tools to elevate your campaign."
            textStyle="mb-5 text-white"
            btnType="secondaryButton"
            btnText="Explore Collection"
            btnURL="products"
            innerContentStyle="flex flex-col gap-2 justify-start items-start mx-auto max-w-[90vw] md:max-w-screen-xl pr-[5vw] md:pr-[40vw]"
          />
          {/* Slide 3 */}
          <CarouselCTA
            className="bg-[url('https://i.ibb.co/g9yGXTR/slide-camp-3.webp')] h-[80vh] text-white bg-center"
            subHeading="Custom Solutions"
            subHeadingStyle="font-semibold uppercase"
            HeadingText="Tailored Campaign Elements for Every Need"
            headingStyle="primaryHeading text-3xl md:text-4xl uppercase leading-[120%]"
            text="Get personalized campaign elements that align with your brand and objectives. Our custom solutions ensure your campaign’s success from start to finish."
            textStyle="mb-5 text-white"
            btnType="secondaryButton"
            btnText="Get Started"
            btnURL="products"
            innerContentStyle="flex flex-col gap-2 justify-start items-start mx-auto max-w-[90vw] md:max-w-screen-xl pr-[5vw] md:pr-[40vw]"
          />
        </Carousel>

        {/* Product Categories */}
        <Layout className="w-full p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <Card
            loading={isFetching}
            styles={{
              body: !isFetching ? { padding: 0 } : { padding: "24px" },
            }}
          >
            <ProductTopCategory
              bgImage="https://i.ibb.co/FswJxvC/camp-h52.webp"
              subHeadingText="Outdoor Adventure"
              headingText="Tents Collection"
              button={
                <NavLink
                  to="/products"
                  className="primaryButton flex items-center gap-2 py-2 px-4"
                >
                  Shop Tents
                  <CgArrowLongRight />
                </NavLink>
              }
            />
          </Card>
          <Card
            loading={isFetching}
            styles={{
              body: !isFetching ? { padding: 0 } : { padding: "24px" },
            }}
          >
            <ProductTopCategory
              bgImage="https://i.ibb.co/FYW9Gmh/camp-h53.webp"
              subHeadingText="Travel Ready"
              headingText="Bags Collection"
              button={
                <NavLink
                  to="/products"
                  className="primaryButton flex items-center gap-2 py-2 px-4"
                >
                  Shop Bags
                  <CgArrowLongRight />
                </NavLink>
              }
            />
          </Card>
          <Card
            loading={isFetching}
            styles={{
              body: !isFetching ? { padding: 0 } : { padding: "24px" },
            }}
          >
            <ProductTopCategory
              bgImage="https://i.ibb.co/x3Dp2SF/camp-h54.webp"
              subHeadingText="Step Forward"
              headingText="Boots Collection"
              button={
                <NavLink
                  to="/products"
                  className="primaryButton flex items-center gap-2 py-2 px-4"
                >
                  Shop Boots
                  <CgArrowLongRight />
                </NavLink>
              }
            />
          </Card>
          <Card
            loading={isFetching}
            styles={{
              body: !isFetching ? { padding: 0 } : { padding: "24px" },
            }}
          >
            <ProductTopCategory
              bgImage="https://i.ibb.co/RP9ZQwL/camp-h51.webp"
              subHeadingText="Gear Up"
              headingText="Equipments Collection"
              button={
                <NavLink
                  to="/products"
                  className="primaryButton flex items-center gap-2 py-2 px-4"
                >
                  Shop Equipments
                  <CgArrowLongRight />
                </NavLink>
              }
            />
          </Card>
        </Layout>

        {/* Best Products */}
        <CustomContainer className="text-gray-600 body-font">
          <div className="flex flex-col container px-5 mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-20">
              <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Best Selling Products
              </h2>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                Explore our handpicked collection of top-selling products,
                chosen for their quality and exceptional value. From trendy
                apparel to high-performance gear, find items that are perfect
                for your next adventure or as thoughtful gifts.
              </p>
              <div className="flex mt-6 justify-center">
                <span className="w-16 h-1 rounded-full bg-secondary inline-flex" />
              </div>
            </div>

            {/* Product Cards */}
            <div className="flex flex-wrap gap-5 justify-center items-center -mx-4 mb-10 -mt-4 md:space-y-0 px-4 md:px-0">
              {bestProducts?.data?.map((product: TProduct) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isLoading={isFetching}
                  className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] flex-grow"
                />
              ))}
            </div>

            {/* View More Button */}
            <ButtonWithSpinner
              text="View more"
              className="mx-auto hover:text-white"
              url="/products"
            />
          </div>
        </CustomContainer>
        {/* Featured Products */}
        <CustomContainer className="!py-0 text-gray-600 body-font">
          <div className="flex flex-col container px-5 mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-20">
              <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                Discover our top picks! Explore a curated selection of our
                finest products, chosen for their quality, innovation, and
                style. Elevate your experience with these standout items.
              </p>
              <div className="flex mt-6 justify-center">
                <span className="w-16 h-1 rounded-full bg-secondary inline-flex" />
              </div>
            </div>

            {/* Product Cards */}
            <div className="flex flex-wrap gap-5 justify-center items-center -mx-4 mb-10 -mt-4 md:space-y-0 px-4 md:px-0">
              {data?.data?.map((product: TProduct) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isLoading={isFetching}
                  className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] flex-grow"
                />
              ))}
            </div>

            {/* View More Button */}
            {/* <ButtonWithSpinner
              text="View more"
              className="mx-auto hover:text-white"
              url="/products"
            /> */}
          </div>
        </CustomContainer>

        {/* FAQ Content */}
        <CustomContainer className="!py-12 md:!py-20 text-gray-600 body-font">
          <div className="flex flex-col container px-5 mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-16">
              <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                Have questions? We've got answers. Explore our FAQ section to
                find solutions to common inquiries about our products, services,
                and policies.
              </p>
              <div className="flex mt-6 justify-center">
                <span className="w-16 h-1 rounded-full bg-secondary inline-flex" />
              </div>
            </div>

            {/* FAQ Content */}
            <div className="w-full flex gap-5 justify-between -mx-4 mb-10 -mt-4 md:space-y-0 px-4 md:px-0">
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined
                    rotate={isActive ? 90 : 0}
                    className="text-secondary"
                  />
                )}
                style={{ width: "100%", padding: 0, margin: 0 }}
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 bg-none"
                accordion
              >
                {faqData.map((faq, index) => (
                  <Panel
                    header={faq.question}
                    key={index}
                    className="custom-panel self-start"
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  >
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </CustomContainer>

        {/* Testimonials Section */}
        <section className="pb-12 md:py-0 md:pb-20 bg-gray-100 text-gray-600 body-font">
          <div className="container mx-auto px-5">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                Hear from our satisfied customers and see why we are trusted by
                clients worldwide. Your satisfaction is our top priority.
              </p>
              <div className="flex justify-center mt-6">
                <span className="w-16 h-1 rounded-full bg-secondary inline-flex"></span>
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative max-w-6xl mx-auto px-5">
              <Carousel
                autoplay
                dots={{ className: "custom-dots" }}
                slidesToShow={3}
                responsive={[
                  { breakpoint: 768, settings: { slidesToShow: 1 } },
                  { breakpoint: 1024, settings: { slidesToShow: 2 } },
                  { breakpoint: 1440, settings: { slidesToShow: 3 } },
                ]}
                arrows
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="px-4">
                    <Card
                      hoverable
                      bordered={false}
                      className="text-center"
                      // cover={
                      //   <div className="flex justify-center py-5">
                      //     {testimonial.avatar}
                      //   </div>
                      // }
                    >
                      <div className="text-gray-500 mb-2">
                        <FaQuoteLeft
                          style={{
                            fontSize: "24px",
                            marginBottom: "-20px",
                            color: "#ba986a",
                            // margin: "auto"
                          }}
                        />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">
                        {testimonial.name}
                      </h4>
                      <p className="leading-relaxed italic">
                        {testimonial.review}
                      </p>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      </ThemeConfig>
    </Layout>
  );
};

export default Home;
