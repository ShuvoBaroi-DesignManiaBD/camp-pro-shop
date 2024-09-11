import {
  AiOutlineLeft,
  AiOutlineLeftCircle,
  AiOutlineRight,
  AiOutlineRightCircle,
} from "react-icons/ai";
import SideBar from "@/pages/dashboards/customer/SideBar";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/ui/sidebars/DashboardSidebar";
import customerSidebarItems from "@/pages/dashboards/customer/sitebarItems";
import DashboardHeader from "@/pages/dashboards/Header";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarHide, setIsSidebarHide] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);
  console.log(isSidebarHide);
  
  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1023);
  };
  window.addEventListener("resize", handleResize);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth > 1023);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup function to remove the event listener
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  const headerStyle: React.CSSProperties = {
    height: 76,
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100vw",
    maxWidth: "100vw",
    height: "100vh",
  };
  return (
    <Layout style={layoutStyle}>
      <Sider
        // width={collapsed ? "16%" : "128px"}
        style={{ height: '100%', top: '0', left: '0' }}
        // width={collapsed && isDesktop ? "16%" : isSidebarHide && !isDesktop ? 0 : (!isDesktop?"100vw": '16%')}
        width={
          isDesktop 
            ? (!collapsed ? "16%" : "128px") 
            : isSidebarHide 
            ? 0 
            : "100vw"
        }
        
        // breakpoint="lg"
        // collapsedWidth={0}
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
        className={`border-r !bg-gray-50 w-auto min-w-max relative ${
          !collapsed && window.innerWidth <= 500 && "!absolute h-full"
        } ${!isDesktop && '[&&_ul]:px-4'}`}
      >
        {isDesktop && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 absolute -right-6 top-16 z-20"
          >
            {collapsed ? (
              <AiOutlineLeft className="text-4xl bg-white p-1.5 shadow-md rounded-full text-primary/40" />
            ) : (
              <AiOutlineRight className="text-4xl shadow-md rounded-full p-1.5 bg-white text-primary/40" />
            )}
          </button>
        )}
        <div className="px-8 h-[76px] flex gap-4 justify-start items-center border-b text-xl">
          <Logo className="h-14 min-w-16"></Logo>
          <p
    className={`font-bold text-primary transition-opacity duration-300 ${
      !collapsed && isDesktop ? 'opacity-100' : 'opacity-0 w-0'
    }`}
  >CampProShop</p>
          {/* {(!collapsed && isDesktop) ? (
            <p className="font-bold text-primary">CampProShop</p>
          ) : null} */}
        </div>
        <DashboardSidebar
          collapsed={collapsed}
          items={customerSidebarItems}
        ></DashboardSidebar>
      </Sider>
      <Layout>
        <Header style={headerStyle} className="border-b bg-white shadow-sm px-4 md:px-8 content-center z-10">
          <DashboardHeader isCollapsed={collapsed} setIsSidebarHide={setIsSidebarHide} isSidebarHide={isSidebarHide}></DashboardHeader>
        </Header>
        <Content className="min-h-[120px] overflow-y-scroll p-10">
          <Outlet></Outlet>
        </Content>
        <Footer className="border-t text-center bg-white">
          Camp Pro Shop ©{new Date().getFullYear()} Created by Design Mania BD
        </Footer>
      </Layout>
    </Layout>
  );``
};

export default Dashboard;
