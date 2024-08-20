import { AiOutlineLeft, AiOutlineLeftCircle, AiOutlineRight, AiOutlineRightCircle } from "react-icons/ai"; 
import SideBar from "@/pages/dashboards/customer/SideBar";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import DashboardSidebar from "../ui/sidebars/DashboardSidebar";
import sidebarItems from "@/pages/dashboards/customer/sitebarItems";
import DashboardHeader from "@/pages/dashboards/DashboardHeader";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
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
  const headerStyle: React.CSSProperties = {
    height: 64,
    paddingInline: 48,
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
        width={collapsed? "16%": "128px" }
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className={`border-r !bg-gray-50 w-auto min-w-max relative ${(!collapsed && window.innerWidth <= 500)  && '!absolute h-full'}`}
      >
        {
          isDesktop &&
        <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-1.5 absolute -right-6 top-16">
        {collapsed ? <AiOutlineLeft  className="text-4xl bg-white p-1.5 shadow-md rounded-full text-primary/40"/> : <AiOutlineRight className="text-4xl shadow-md rounded-full p-1.5 bg-white text-primary/40"/>}
        </button>
        }
        <div className="px-8 h-[64px] flex gap-4 justify-start items-center border-b text-xl">
          <Logo className="w-[48px]"></Logo>
          {collapsed ? <p className="font-bold text-primary">CampProShop</p>:null}
          
        </div>
        <DashboardSidebar collapsed={collapsed} items={sidebarItems}></DashboardSidebar>
      </Sider>
      <Layout>
        <Header style={headerStyle} className="border-b bg-white">
          <DashboardHeader></DashboardHeader>
        </Header>
        <Content className="min-h-[120px] p-4 m-8">
          <Outlet></Outlet>
        </Content>
        <Footer className="border-t text-center bg-white">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
