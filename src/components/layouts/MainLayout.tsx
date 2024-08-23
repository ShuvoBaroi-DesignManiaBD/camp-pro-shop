import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Outlet, useNavigation } from "react-router-dom";
import { Layout, Skeleton, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import Header from "@/pages/shared/header/Header";
import Footer from "@/pages/shared/footer/Footer";
import { LoadingOutlined } from "@ant-design/icons";
import ThemeConfig from "@/configs/ThemeConfig";
import CartDrawer from "../ui/drawers/CartDrawer";

const customStyles = {
  backgroundColor: "rgb(236 221 213 / 0.2)",
};

const MainLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <Layout style={customStyles}>
      <Header />
      <Content className="bg-[url('https://i.ibb.co/YdfcdG6/pattern.webp')] bg-center bg-repeat">
        {isLoading ? (
          <>
            <div className="h-[60vh] mx-auto py-20 flex justify-center items-center">
              <Spin
                size="large"
                tip="Loading"
                className="text-secondary"
              />
            </div>
          </>
        ) : (
          <>
          <CartDrawer></CartDrawer>
          <Outlet />
          </>
        )}
      </Content>
      <Footer className="bg-secondary text-text text" />
    </Layout>
  );
};

export default MainLayout;
