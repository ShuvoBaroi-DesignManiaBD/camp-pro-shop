import Logo from "@/components/ui/Logo";
import { Flex } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import MainNav from "./MainNav/MainNav";
import MobileNav from "./MainNav/MobileNav";
import { useEffect, useState } from "react";
const Header = () => {
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
      className="bg-white flex items-center justify-between h-[120px] px-[16px] sm:p-0"
      style={{}}
    >
      <Flex className="container mx-auto h-full flex justify-between items-center">
        <Logo className="w-[125px]"></Logo>
        {isDesktop ? <MainNav /> : <MobileNav />}
      </Flex>
    </AntHeader>
  );
};

export default Header;
