import React from "react";
import { Card, Col, Row, Tooltip } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import CustomContainer from "@/components/layouts/CustomContainer";
import SiteMeta from "@/components/seo/SiteMeta";
import { RocketOutlined, HeartOutlined, TeamOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { Meta } = Card;

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Shuvo Baroi",
      position: "Founder & CEO",
      image: "https://i.ibb.co.com/4JRDX8Z/profile-pic-4.webp",
      bio: "Shuvo is a Well known Full Stack Developer expertise in React JS, Next JS, SQL, MongoDB, WordPress & UI/UX.",
    },
    {
      name: "Jane Smith",
      position: "Head of Marketing",
      image: "https://via.placeholder.com/150",
      bio: "Jane is a digital marketing expert who drives all our successful campaigns.",
    },
    {
      name: "Sam Wilson",
      position: "Lead Designer",
      image: "https://via.placeholder.com/150",
      bio: "Sam's creativity and attention to detail ensure our designs are top-notch.",
    },
  ];

  return (
    <>
      <div>
        <SiteMeta tagLine="About"></SiteMeta>
      </div>
      {/* Hero Section */}
      <section
        className="relative w-full h-64 md:h-[50vh] bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/g9yGXTR/slide-camp-3.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Learn more about our mission, meet the dedicated team, and discover
            what drives us forward.
          </p>
        </div>
      </section>
        <CustomContainer className="flex flex-col px-5 md:px-0 mx-auto gap-20">
          {/* Mission Statement */}
          <section className="our-mission-section text-gray-600 body-font">
            <div className="container mx-auto text-center mb-16">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Our Mission
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                At our core, we strive to create a positive impact through our
                dedication and values. Here are our core missions that define
                who we are.
              </p>
              <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-secondary inline-flex" />
              </div>
            </div>
            <div className="container mx-auto">
              <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    cover={
                      <RocketOutlined
                        style={{
                          fontSize: "40px",
                          color: "#ba986a",
                          padding: "20px",
                        }}
                      />
                    }
                    bordered={false}
                    className="mission-card text-center py-3"
                  >
                    <div className="space-y-2 -mt-4">
                      <h4 className="text-xl font-semibold">
                        Driving Innovation
                      </h4>
                      <p>
                        We continuously push the boundaries of technology and
                        creativity, providing solutions that inspire progress
                        and change the way industries operate.
                      </p>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    cover={
                      <HeartOutlined
                        style={{
                          fontSize: "40px",
                          color: "#ba986a",
                          padding: "20px",
                        }}
                      />
                    }
                    bordered={false}
                    className="mission-card text-center py-3"
                  >
                    <div className="space-y-2 -mt-4">
                      <h4 className="text-xl font-semibold">
                        Building Compassion
                      </h4>
                      <p>
                        We put people first, ensuring our services and actions
                        are guided by empathy and a genuine desire to make a
                        difference in the communities we serve.
                      </p>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    cover={
                      <TeamOutlined
                        style={{
                          fontSize: "40px",
                          color: "#ba986a",
                          padding: "20px",
                        }}
                      />
                    }
                    bordered={false}
                    className="mission-card text-center py-3"
                  >
                    <div className="space-y-2 -mt-4">
                      <h4 className="text-xl font-semibold">
                        Fostering Collaboration
                      </h4>
                      <p>
                        Collaboration is key to our success. We work closely
                        with partners and clients to achieve shared goals,
                        promoting a culture of teamwork and mutual growth.
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </section>

          {/* Contact Information & Map */}
          <section className="flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap gap-10 justify-center items-stretch">
            {/* Contact Info */}
            <div className="w-full md:w-2/6 space-y-5 flex-grow bg-primary text-white rounded-md p-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Contact Information
              </h3>
              <div className="flex items-center">
                <PhoneOutlined className="text-lg text-secondaryLight mr-2" />
                <span className="text-base">+1 234 567 890</span>
              </div>
              <div className="flex items-center">
                <MailOutlined className="text-lg text-secondaryLight mr-2" />
                <span className="text-base">info@example.com</span>
              </div>
              <div className="flex items-center">
                <EnvironmentOutlined className="text-lg text-secondaryLight mr-2" />
                <span className="text-base">
                  123 Main Street, Cityville, USA
                </span>
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-4 pt-10">
                <Tooltip title="Twitter">
                <NavLink to="https://twitter.com"><TwitterOutlined className="text-2xl text-secondary hover:text-secondaryLight cursor-pointer" /></NavLink>
                </Tooltip>
                <Tooltip title="Facebook">
                <NavLink to="https://facebook.com"><FacebookOutlined className="text-2xl text-secondary hover:text-secondaryLight cursor-pointer" /></NavLink>
                </Tooltip>
                <Tooltip title="LinkedIn">
                  <NavLink to="https://linkedin.com"><LinkedinOutlined className="text-2xl text-secondary hover:text-secondaryLight cursor-pointer" href="https://linkedin.com" /></NavLink>
                </Tooltip>
              </div>
            </div>

            {/* Map */}
            <div className="w-full md:w-4/6 flex-grow">
              <iframe
                title="location-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58377.12978369251!2d90.22020857163918!3d23.869376660334947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd3d6df9569%3A0x277b3819d4da3e91!2sSavar%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1727510033323!5m2!1sen!2sus"
                width="100%"
                // height="500"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="rounded-md shadow-md h-[300px] md:h-[500px]"
              ></iframe>
            </div>
          </section>

          {/* Team Members Section */}
          <section className="text-center">
            <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
              Our dedicated team works tirelessly to bring you the best products
              and services.
            </p>
            <div className="flex mt-6 justify-center">
              <span className="w-16 h-1 rounded-full bg-secondary inline-flex" />
            </div>

            {/* Team Members Cards */}
            <div className="flex flex-wrap justify-center gap-10 mt-10">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt={member.name}
                      src={member.image}
                      className="h-48 object-contain bg-gray-500"
                    />
                  }
                  className="shadow-md hover:shadow-lg transition-shadow"
                >
                  <Meta
                    title={
                      <span className="text-xl font-medium">{member.name}</span>
                    }
                    description={
                      <>
                        <span className="text-secondary text-base">
                          {member.position}
                        </span>
                        <p className="text-base mt-2 text-gray-600">
                          {member.bio}
                        </p>
                      </>
                    }
                  />
                </Card>
              ))}
            </div>
          </section>
        </CustomContainer>
    </>
  );
};

export default AboutUs;
