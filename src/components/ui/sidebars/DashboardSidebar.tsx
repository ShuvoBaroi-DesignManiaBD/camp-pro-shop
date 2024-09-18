// import { useState } from "react";
import { Menu, } from "antd";
// import type { GetProp, MenuProps } from "antd";
import ThemeConfig from "@/configs/ThemeConfig";


const DashboardSidebar = ({collapsed, items}:any) => {
  // type MenuTheme = GetProp<MenuProps, "theme">;

  // const [mode, setMode] = useState<"vertical" | "inline">("inline");
  // const [theme, setTheme] = useState<MenuTheme>("light");
  // const [collapsed, setCollapsed] = useState(false);
  // const changeMode = (value: boolean) => {
  //   setMode(value ? "vertical" : "inline");
  // };

  // const changeTheme = (value: boolean) => {
  //   setTheme(value ? "dark" : "light");
  // };

  return (
    <>
      {/* <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br /> */}
      {/* <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <ThemeConfig>
        <Menu
          style={{
            backgroundColor: "transparent",
            fontSize: "15px",
            fontWeight: "500",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "start",
            alignItems: "start",
            textAlign: "start",
          }}
          inlineCollapsed={!collapsed}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          inlineIndent={16}
          mode={`inline`}
          theme={`light`}
          items={items}
          className="w-full sm:p-8 [&&_li.ant-menu-item-selected]:bg-secondaryExtraLight [&&_li.ant-menu-item-selected]:text-primary"
        />
      </ThemeConfig>
    </>
  );
};

export default DashboardSidebar;
