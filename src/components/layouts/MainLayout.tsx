import { Outlet } from "react-router-dom";
import { Flex, Layout, Menu } from "antd";
import { Content} from "antd/es/layout/layout";
import Header from "@/pages/shared/header/Header";
import Footer from "@/pages/shared/footer/Footer";

const customStyles = {
  backgroundColor: "rgb(236 221 213 / 0.2)",
};

const MainLayout = () => {
  return (
    <>
      <Layout style={customStyles}>
        <Header></Header>
        <Content className="bg-[url('https://i.ibb.co/YdfcdG6/pattern.webp')] bg-center bg-repeat">
            <Outlet></Outlet>
        </Content>
        <Footer className="bg-secondary text-text text"/>
      </Layout>
    </>
  );
};

export default MainLayout;
