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
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
};

export default ThemeConfig;
