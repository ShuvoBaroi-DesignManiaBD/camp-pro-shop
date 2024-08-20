import Logo from "@/components/ui/Logo";
import { Flex } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import MainNav from "../shared/header/mainNav/MainNav";
import MobileNav from "../shared/header/mobileNav/MobileNav";
const DashboardHeader = () => {
  // const [screenWidth, setScreenWidth] = useState(window.screen.width)
  console.log(window.screen.width);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1023);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AntHeader
      className="bg-white flex items-center justify-between px-[16px] sm:p-0"
      style={{}}
    >
      <Flex className="container max-w-screen-xl mx-auto h-full flex justify-end items-center">
        {isDesktop ? <MainNav /> : <MobileNav />}
      </Flex>
    </AntHeader>
  );
};

export default DashboardHeader;
