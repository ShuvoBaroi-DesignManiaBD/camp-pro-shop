import Logo from "@/components/ui/Logo";
import { Flex } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import MainNav from "../shared/header/mainNav/MainNav";
import MobileNav from "../shared/header/mobileNav/MobileNav";
import { useAppSelector } from "@/redux/hooks";
import { selectDeviceType } from "@/redux/features/ui/deviceType/deviceTypeSlice";

type collapsed = {
  isCollapsed: boolean,
  setIsSidebarHide?: CallableFunction,
  isSidebarHide?: boolean
}
const DashboardHeader = ({isCollapsed, setIsSidebarHide, isSidebarHide}:collapsed) => {
  // const [screenWidth, setScreenWidth] = useState(window.screen.width)
  console.log(setIsSidebarHide);
  console.log(window.screen.width);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);
  const isMobile = useAppSelector(selectDeviceType);
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
      className="w-full bg-white flex items-center justify-between sm:px-0 sm:py-6"
      style={{paddingInline: 0}}
    >
      <Flex className="w-full mx-auto h-full flex gap-1.5 lg:justify-end justify-between items-center">
        {!isMobile &&  <div className="px-0 sm:px-8 h-16 flex gap-2 items-center text-xl">
          <Logo className="max-h-8"></Logo>
          {(isCollapsed || !isDesktop) ? (
            <p className="font-bold text-lg">CampProShop</p>
          ) : null}
        </div>}
      
        {isMobile ? <MainNav /> : <MobileNav setIsSidebarHide={setIsSidebarHide as CallableFunction} isSidebarHide={isSidebarHide as boolean}/>}
      </Flex>
    </AntHeader>
  );
};

export default DashboardHeader;
