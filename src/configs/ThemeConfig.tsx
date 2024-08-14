import { ConfigProvider } from "antd";

const ThemeConfig = ({children}: any) => {
  return <>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              arrowSize: 24,
            },
            Button: {
              colorPrimary: "#482f21",
              algorithm: true,
              colorFillSecondary: "#ba986a",
              colorBorderSecondary: "#ba986a", // Enable algorithm
            },
            Spin: {
              colorPrimary: "#482f21",
              dotSizeLG: 44,
            },
            Pagination: {
              colorPrimary: "#482f21",
              colorPrimaryHover: "#482f21",
              colorPrimaryActive: "#482f21",
              colorPrimaryBorderHover: "#482f21",
              colorLinkHover: "#ba986a",
            }
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
};

export default ThemeConfig;
