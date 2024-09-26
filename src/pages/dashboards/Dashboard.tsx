import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/ui/sidebars/DashboardSidebar";
import customerSidebarItems from "@/pages/dashboards/customer/sitebarItems";
import DashboardHeader from "@/pages/dashboards/Header";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import adminSidebarItems from "./admin/sitebarItems";
import { selectUserMenuDrawer } from "@/redux/features/ui/userMenuDrawer/userMenuDrawerSlice";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarHide, setIsSidebarHide] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);
  const currentUser = useAppSelector(selectCurrentUser);
  const userMenuDrawer: boolean = useAppSelector(selectUserMenuDrawer);
  // Handle window resize to detect desktop or mobile/tablet
  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1023);
  };

  // Add event listener to handle resizing
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Styles for the header
  const headerStyle: React.CSSProperties = {
    height: 76,
  };

  // Layout styles for full viewport height and fixed position for desktop sidebar
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100vw",
    maxWidth: "100vw",
    height: "100vh",
  };

  return (
    <Layout style={layoutStyle}>
      {/* Header */}
      <Header
        style={headerStyle}
        className="border-b bg-white shadow-sm px-4 md:px-8 content-center z-10"
      >
        <DashboardHeader
          isCollapsed={collapsed}
          setIsSidebarHide={setIsSidebarHide}
          isSidebarHide={isSidebarHide}
        />
      </Header>

      <Layout className="max-w-100vw">
        {/* Sider (Sidebar) */}
        {
          isDesktop &&  
        <Sider
          style={{
            height: "100vh", // Fixed height
            position: isDesktop ? "fixed" : "absolute", // Fixed on desktop, absolute on mobile
            top: 0,
            left: 0,
            zIndex: 10, // Ensure the sidebar appears above the content
            backgroundColor: "#f0f2f5", // Gray background
          }}
          width={
            isDesktop
              ? !collapsed
                ? "16%"
                : "128px"
              : isSidebarHide
              ? 0
              : "100vw"
          }
          className={`${
            isDesktop ? "transition-all duration-300" : "absolute"
          } !bg-gray-50 w-auto min-w-max`}
        >
          {/* Collapse Button for Desktop */}
          {isDesktop && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 absolute -right-6 top-16 z-20"
            >
              {!collapsed ? (
                <AiOutlineLeft className="text-4xl bg-white p-1.5 shadow-md rounded-full text-primary/40" />
              ) : (
                <AiOutlineRight className="text-4xl shadow-md rounded-full p-1.5 bg-white text-primary/40" />
              )}
            </button>
          )}

          {/* Sidebar Logo */}
          <div className="max-w-content px-10 h-[76px] flex gap-2 justify-start items-center border-b text-xl">
            <Logo className="min-h-10 min-w-10 max-w-10" />
            <p
              className={`font-bold text-primary transition-opacity duration-300 ${
                !collapsed && isDesktop ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              CampProShop
            </p>
          </div>

          {/* Sidebar Content */}
          <DashboardSidebar
            collapsed={!collapsed || !userMenuDrawer}
            items={
              (currentUser?.role === "customer" && customerSidebarItems) ||
              (currentUser?.role === "admin" && adminSidebarItems)
            }
          />
        </Sider>
        }

        {/* Content */}
        <Content
          className="min-h-[120px] overflow-y-scroll p-5 sm:p-10 md:flex max-w-full overflow-x-hidden"
          style={{
            marginLeft: isDesktop ? (!collapsed ? "16%" : "128px") : 0,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        <Footer className="text-center pt-10 py-4 block md:hidden">
        Camp Pro Shop ©{new Date().getFullYear()} Created by Design Mania BD
      </Footer>
        </Content>
      </Layout>

      {/* Footer */}
      <Footer className="border-t text-center bg-white py-3 hidden md:block">
        Camp Pro Shop ©{new Date().getFullYear()} Created by Design Mania BD
      </Footer>
    </Layout>
  );
};

export default Dashboard;
