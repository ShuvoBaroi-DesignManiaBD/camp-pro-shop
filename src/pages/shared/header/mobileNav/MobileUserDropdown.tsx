import Logo from '@/components/ui/Logo';
import DashboardSidebar from '@/components/ui/sidebars/DashboardSidebar';
import adminSidebarItems from '@/pages/dashboards/admin/sitebarItems';
import customerSidebarItems from '@/pages/dashboards/customer/sitebarItems';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { selectUserMenuDrawer, setShowUserMenuDrawer } from '@/redux/features/ui/userMenuDrawer/userMenuDrawerSlice';
import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/types';
import { Button, Drawer } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons";

const MobileUserDropdown = () => {
  const dispatch = useDispatch();
  const currentUser: Partial<TUser | null> = useAppSelector(selectCurrentUser);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);
    const userMenuDrawer: boolean = useAppSelector(selectUserMenuDrawer);
    return (
        <Drawer
        closable={false}
        placement="right"
        className="z-50"
        bodyStyle={{ padding: "0" }} // Remove extra padding inside the drawer
        headerStyle={{ padding: "0.5rem 1rem" }} // Adjust header padding
        contentWrapperStyle={{
          width: "100vw", // Ensure the Drawer covers the full width
          maxWidth: "100vw", // Override internal maxWidth limits
          position: "absolute", // Use absolute positioning to cover the screen
          left: 0, // Ensure alignment to the left
        }}
        width="100vw"
          // style={{
          //   height: "100vh", // Fixed height
          //   position: isDesktop ? "fixed" : "absolute", // Fixed on desktop, absolute on mobile
          //   top: 0,
          //   left: 0,
          //   zIndex: 10, // Ensure the sidebar appears above the content
          //   backgroundColor: "#f0f2f5", // Gray background
          // }}
          // width={
          //   !userMenuDrawer
          //     ? "0%"
          //       : "100vw"
          // }
          title={
            <div className="flex justify-between items-center">
          <div className="max-w-content flex gap-2 justify-start items-center text-xl">
            <Logo className="min-h-10 min-w-10 max-w-10" />
            <p
              className={`font-bold text-primary transition-opacity duration-300"
              }`}
            >
              CampProShop
            </p>
          </div>
          <Button
              type="text"
              icon={<CloseOutlined style={{ fontSize: "20px" }} />}
              onClick={()=>dispatch(setShowUserMenuDrawer())}
              style={{ marginRight: 0 }} // Adjust to place it at the edge
            />
            </div>
        }
          className={`${
            isDesktop ? "transition-all duration-300" : "absolute"
          } !bg-gray-50 w-auto min-w-max`}
        destroyOnClose
        open={userMenuDrawer}
        onClose={() => dispatch(setShowUserMenuDrawer())}
          // trigger={null}
        >
          {/* Collapse Button for Desktop */}
          {isDesktop && (
            <button
              onClick={() => dispatch(setShowUserMenuDrawer())}
              className="p-1.5 absolute -right-6 top-16 z-20"
            >
              {!userMenuDrawer ? (
                <AiOutlineLeft className="text-4xl bg-white p-1.5 shadow-md rounded-full text-primary/40" />
              ) : (
                <AiOutlineRight className="text-4xl shadow-md rounded-full p-1.5 bg-white text-primary/40" />
              )}
            </button>
          )}

          {/* Sidebar Content */}
          <DashboardSidebar
            collapsed={true}
            items={
              (currentUser?.role === "customer" && customerSidebarItems) ||
              (currentUser?.role === "admin" && adminSidebarItems)
            }
          />
          
        </Drawer>
    );
};

export default MobileUserDropdown;