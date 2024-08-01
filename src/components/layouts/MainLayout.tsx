import { Outlet } from "react-router-dom";
import { Flex, Layout, Menu } from "antd";
import { Content} from "antd/es/layout/layout";
import Header from "@/pages/shared/header/Header";
import Footer from "@/pages/shared/footer/Footer";

const customStyles = {
  height: "100vh",
  backgroundColor: "rgb(236 221 213 / 0.2)",
};

const MainLayout = () => {
  return (
    <>
      <Layout style={customStyles}>
        <Header></Header>
        <Content className="">
          <div className="container mx-auto py-20">
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer className="bg-secondary text-text text"/>
      </Layout>
    </>
  );
};

export default MainLayout;
